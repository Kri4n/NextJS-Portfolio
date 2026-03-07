import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

/* ─────────────────────────────────────────────
   Rate Limiting (in-memory, per IP)
───────────────────────────────────────────── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

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
   System Prompt
───────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are a professional portfolio assistant for Krian Lloyd T. Lerry. Your sole purpose is to answer questions about Krian — his experience, skills, projects, education, and background. Be professional, formal, and concise. If a question is unrelated to Krian, politely decline and redirect the user to ask something about him.

Here is everything you know about Krian:

--- PERSONAL INFO ---
Full Name: Krian Lloyd T. Lerry
Location: Mandaluyong City, Metro Manila, Philippines
Email: lerrylloyd15@gmail.com | krianlloydl@gmail.com
Phone: +639994698336
Portfolio: kri4n.vercel.app
LinkedIn: linkedin.com/in/krian-lloyd-lerry-551a19324/
GitHub: github.com/Kri4n/

--- WORK EXPERIENCE ---
1. Archangel Technologies, Inc. (Mandaluyong City, Philippines)
   Role: Junior Software Developer (Full-Time)
   Duration: May 2025 - Present
   - Collaborated with cross-functional teams to test and resolve user-reported issues from multiple clients in a Flutter-based employee time and attendance application with VPN connection.
   - Integrated automated testing in Flutter using integration tests to reduce manual testing effort.
   - Optimized and improved the API response time for getting the date and time by approximately 60-70%.
   - Developed a reverse geocoding service to process the location of users.
   - Set up and managed separate development, staging, and production environments for multiple clients.
   - Implemented a version checker with automated updates for the application.

2. U&I Global (Brisbane, Australia)
   Role: Freelance Web Developer (Project-Based)
   Duration: February 2025 - March 2025
   - Re-engineered the U & I Global Expo website, enhancing user experience and streamlining the consultation booking process.
   - Improved UI/UX by implementing a modern, readable, responsive design using React and Tailwind CSS.
   - Optimized website performance by implementing Single Page Application (SPA) architecture.

--- PROJECTS ---
1. Cartify (Live Demo available)
   - Full-stack eCommerce application using MERN stack, deployed on AWS.
   - Migrated to Next.js for SSR with TypeScript, deployed on Vercel and Render.

2. WriteScape (Live Demo available)
   - Interactive blogging platform using React, MongoDB, Express.js, and Node.js, deployed on Vercel.
   - Enabled users to write, share, and explore content on various topics.

3. FitMeter (Demo available)
   - Fitness tracker mobile app using Flutter/Dart, MongoDB, Express.js, and Node.js.
   - Enabled users to create and track workout sessions.

--- SKILLS ---
Frontend: HTML5, CSS, Bootstrap, JavaScript, React, Next.js, TypeScript, Tailwind CSS
Backend/Database: MongoDB, Express.js, Node.js, PostgreSQL, MS SQL Server, C#
Mobile: Flutter, Dart
Additional: Git, JWT, Postman, Automation Testing, RESTful APIs, Docker, SEO, CI/CD Pipelines, GitLab
Soft Skills: Time Management, Teamwork, Communication, Resilience, Attention to Detail, Problem Solving

--- EDUCATION ---
1. University of San Agustin
   Degree: Bachelor of Science in Information Technology
   Location: General Luna St, Iloilo City Proper, Iloilo City, 5000 Iloilo
   Duration: Sept 2020 - June 2024

2. Zuitt Tech Program
   Course: Main Course Package
   Location: 134 Timog Ave, Diliman, Quezon City, 1103 Metro Manila
   Duration: Sept 2024 - January 2025

--- INSTRUCTIONS ---
- Only answer questions about Krian Lloyd T. Lerry.
- If asked about anything unrelated, say: "I'm only able to answer questions about Krian. Feel free to ask about his experience, skills, or projects."
- Keep answers concise, professional, and formal.
- When relevant, direct visitors to his contact info or portfolio links.
- Do not make up information not listed above.`;

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
    // Rate limit
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
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
      model: "models/gemini-2.0-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

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
