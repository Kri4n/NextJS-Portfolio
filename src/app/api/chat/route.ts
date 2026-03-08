import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "@/lib/prompts/system-prompt";

/* ─────────────────────────────────────────────
   Rate Limiting (in-memory, per IP)
   Gemini free tier: 20 RPD, 5 RPM globally
   We limit each IP to 5 requests/day to protect
   the shared daily quota across all visitors.
───────────────────────────────────────────── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests per IP per day
const RATE_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  return false;
}

/* ─────────────────────────────────────────────
   Global daily request counter
   Tracks total requests across all IPs to stay
   within Gemini's 20 RPD free tier limit.
───────────────────────────────────────────── */
let globalDailyCount = 0;
let globalResetAt = Date.now() + 24 * 60 * 60 * 1000;
const GLOBAL_DAILY_LIMIT = 18; // keep 2 buffer below Gemini's 20 RPD

function isGlobalLimitReached(): boolean {
  const now = Date.now();
  if (now > globalResetAt) {
    globalDailyCount = 0;
    globalResetAt = now + 24 * 60 * 60 * 1000;
  }
  if (globalDailyCount >= GLOBAL_DAILY_LIMIT) return true;
  globalDailyCount++;
  return false;
}

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Message {
  role: "user" | "assistant";
  content: string;
}

/* ─────────────────────────────────────────────
   POST /api/chat
───────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    // Per-IP rate limit
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    // Global daily limit (protects Gemini free tier quota)
    if (isGlobalLimitReached()) {
      return NextResponse.json(
        { error: "Daily request limit reached. Please try again tomorrow." },
        { status: 429 },
      );
    }

    // Parse body
    const { messages }: { messages: Message[] } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    // Check API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured." },
        { status: 500 },
      );
    }

    // Build contents array for Gemini
    // Skip any leading assistant messages — Gemini requires contents to start with user
    const firstUserIndex = messages.findIndex((m) => m.role === "user");
    if (firstUserIndex === -1) {
      return NextResponse.json(
        { error: "No user message found." },
        { status: 400 },
      );
    }

    const contents = messages.slice(firstUserIndex).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Call Gemini
    const genAI = new GoogleGenAI({ apiKey });
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    // Log token usage for monitoring
    const usage = response.usageMetadata;
    console.log(
      `[Gemini Usage] tokens: ${usage?.totalTokenCount} | global requests today: ${globalDailyCount}/${GLOBAL_DAILY_LIMIT}`,
    );

    const text = response.text ?? "";
    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
