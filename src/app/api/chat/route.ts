import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "@/lib/prompts/system-prompt";
import * as Sentry from "@sentry/nextjs";
import { FallbackResult, Message, ModelConfig, ModelUsage } from "@/types";

const MODELS: ModelConfig[] = [
  {
    id: "gemini-3-flash-preview",
    name: "Gemini 3 Flash",
    maxRPM: 5,
    maxRPD: 20,
    maxTPM: 250_000,
    priority: 1,
  },
  {
    id: "gemini-3.1-flash-lite-preview",
    name: "Gemini 3.1 Flash-Lite",
    maxRPM: 15,
    maxRPD: 500,
    maxTPM: 250_000,
    priority: 2,
  },
  {
    id: "gemini-2.5-flash-lite",
    name: "Gemini 2.5 Flash-Lite",
    maxRPM: 10,
    maxRPD: 20,
    maxTPM: 250_000,
    priority: 3,
  },
];
/* ─────────────────────────────────────────────
   Model Usage Tracker
   Tracks RPM + RPD per model globally
───────────────────────────────────────────── */

const modelUsage = new Map<string, ModelUsage>();

function getModelUsage(modelId: string): ModelUsage {
  if (!modelUsage.has(modelId)) {
    const now = Date.now();
    modelUsage.set(modelId, {
      rpm: 0,
      rpmWindowStart: now,
      rpd: 0,
      rpdWindowStart: now,
    });
  }
  return modelUsage.get(modelId)!;
}

function isModelAvailable(model: ModelConfig): boolean {
  const now = Date.now();
  const usage = getModelUsage(model.id);

  // Reset RPM window if 1 minute has passed
  if (now - usage.rpmWindowStart >= 60_000) {
    usage.rpm = 0;
    usage.rpmWindowStart = now;
  }

  // Reset RPD window if 24 hours have passed
  if (now - usage.rpdWindowStart >= 24 * 60 * 60 * 1000) {
    usage.rpd = 0;
    usage.rpdWindowStart = now;
  }

  // Leave a small buffer (10%) to avoid hitting hard limits
  const rpmBuffer = Math.floor(model.maxRPM * 0.9);
  const rpdBuffer = Math.floor(model.maxRPD * 0.9);

  return usage.rpm < rpmBuffer && usage.rpd < rpdBuffer;
}

function recordModelUsage(modelId: string): void {
  const usage = getModelUsage(modelId);
  usage.rpm++;
  usage.rpd++;
}

/* ─────────────────────────────────────────────
   Per-IP Rate Limiting
   Dynamically scales limit based on total
   available RPD across all models
───────────────────────────────────────────── */
const ipUsageMap = new Map<string, { count: number; resetAt: number }>();

function getTotalAvailableRPD(): number {
  return MODELS.reduce((sum, model) => {
    const usage = getModelUsage(model.id);
    const now = Date.now();
    const remaining =
      now - usage.rpdWindowStart >= 24 * 60 * 60 * 1000
        ? model.maxRPD
        : model.maxRPD - usage.rpd;
    return sum + Math.max(0, remaining);
  }, 0);
}

// Each IP gets up to 10% of total remaining capacity, min 5, max 25
function getIpLimit(): number {
  const total = getTotalAvailableRPD();
  const dynamic = Math.floor(total * 0.1);
  return Math.min(25, Math.max(5, dynamic));
}

function isIpRateLimited(ip: string): { limited: boolean; limit: number } {
  const now = Date.now();
  const limit = getIpLimit();
  const entry = ipUsageMap.get(ip);

  if (!entry || now > entry.resetAt) {
    ipUsageMap.set(ip, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 });
    return { limited: false, limit };
  }

  if (entry.count >= limit) return { limited: true, limit };
  entry.count++;
  return { limited: false, limit };
}

const GEMINI_TIMEOUT_MS = 8_000;

/* ─────────────────────────────────────────────
   Core: call one model with timeout + Sentry
───────────────────────────────────────────── */
async function callModel(
  model: ModelConfig,
  contents: object[],
  apiKey: string,
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    const genAI = new GoogleGenAI({ apiKey });
    const response = await genAI.models.generateContent({
      model: model.id,
      contents,
      config: { systemInstruction: SYSTEM_PROMPT },
    });

    recordModelUsage(model.id);

    const usage = response.usageMetadata;
    console.log(
      `[${model.name}] tokens: ${usage?.totalTokenCount} | rpm: ${getModelUsage(model.id).rpm}/${model.maxRPM} | rpd: ${getModelUsage(model.id).rpd}/${model.maxRPD}`,
    );

    return response.text ?? "";
  } finally {
    clearTimeout(timeoutId);
  }
}

/* ─────────────────────────────────────────────
   Core: try models in priority order
───────────────────────────────────────────── */

async function callWithFallback(
  contents: object[],
  apiKey: string,
  ip: string,
): Promise<FallbackResult> {
  const sorted = [...MODELS].sort((a, b) => a.priority - b.priority);
  const errors: string[] = [];

  for (const model of sorted) {
    if (!isModelAvailable(model)) {
      console.log(`[Fallback] Skipping ${model.name} — quota reached`);
      errors.push(`${model.name}: quota exhausted`);
      continue;
    }

    try {
      const text = await callModel(model, contents, apiKey);
      return { success: true, text, modelUsed: model.name };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      const name = err instanceof Error ? err.name : "";

      console.warn(`[Fallback] ${model.name} failed: ${message}`);
      errors.push(`${model.name}: ${message}`);

      // Timeout — mark model as degraded temporarily by burning its RPM
      if (name === "AbortError" || message.toLowerCase().includes("abort")) {
        const usage = getModelUsage(model.id);
        usage.rpm = model.maxRPM; // force skip on next attempt
        Sentry.captureException(err, {
          tags: { feature: "chatbot", errorType: "timeout", model: model.id },
          extra: { ip },
        });
        continue; // try next model
      }

      // 503 high demand — skip this model
      if (
        message.includes("503") ||
        message.toLowerCase().includes("unavailable") ||
        message.toLowerCase().includes("high demand")
      ) {
        Sentry.captureMessage(`${model.name} returned 503`, {
          level: "warning",
          tags: { feature: "chatbot", model: model.id },
          extra: { ip },
        });
        continue;
      }

      // 429 quota hit — mark RPD as exhausted
      if (message.includes("429") || message.toLowerCase().includes("quota")) {
        const usage = getModelUsage(model.id);
        usage.rpd = model.maxRPD;
        Sentry.captureException(err, {
          tags: { feature: "chatbot", errorType: "quota", model: model.id },
          extra: { ip },
        });
        continue;
      }

      // Headers timeout
      if (
        name === "HeadersTimeoutError" ||
        message.toLowerCase().includes("headers timeout")
      ) {
        Sentry.captureException(err, {
          tags: {
            feature: "chatbot",
            errorType: "headers_timeout",
            model: model.id,
          },
          extra: { ip },
        });
        continue;
      }

      // Unknown error on this model — try next
      Sentry.captureException(err, {
        tags: { feature: "chatbot", errorType: "unknown", model: model.id },
        extra: { ip, message },
      });
      continue;
    }
  }

  // All models exhausted
  Sentry.captureMessage("All Gemini models exhausted", {
    level: "error",
    tags: { feature: "chatbot" },
    extra: { ip, errors },
  });

  return {
    success: false,
    code: "ALL_MODELS_EXHAUSTED",
    error:
      "All AI models are currently unavailable. Please try again in a few minutes.",
  };
}

/* ─────────────────────────────────────────────
   POST /api/chat
───────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Per-IP rate limit (dynamic)
  const { limited, limit } = isIpRateLimited(ip);
  if (limited) {
    return NextResponse.json(
      {
        error: `You've reached your daily limit of ${limit} messages. Come back tomorrow! 🙂`,
        code: "RATE_LIMITED_IP",
      },
      { status: 429 },
    );
  }

  // Parse body
  const body = await req.json().catch(() => null);
  const messages: Message[] = body?.messages;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      {
        error: "Something looks off with your message. Please try again.",
        code: "INVALID_REQUEST",
      },
      { status: 400 },
    );
  }

  // Check API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    Sentry.captureMessage("GEMINI_API_KEY is missing", {
      level: "error",
      tags: { feature: "chatbot" },
    });
    return NextResponse.json(
      {
        error: "The chatbot isn't configured yet. Please check back later.",
        code: "NO_API_KEY",
      },
      { status: 500 },
    );
  }

  // Build Gemini contents
  const firstUserIndex = messages.findIndex((m) => m.role === "user");
  if (firstUserIndex === -1) {
    return NextResponse.json(
      {
        error: "Something looks off with your message. Please try again.",
        code: "INVALID_REQUEST",
      },
      { status: 400 },
    );
  }

  const contents = messages.slice(firstUserIndex).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  // Try models with fallback
  const result = await callWithFallback(contents, apiKey, ip);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error, code: result.code },
      { status: 503 },
    );
  }

  return NextResponse.json({
    reply: result.text,
    model: result.modelUsed, // optional: useful for debugging
  });
}
