import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ExplainRequest, ExplainResponse } from "../types";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, "1 m"),
});

function buildPrompt({ input, level, mode, history }: ExplainRequest) {
  const levelInstruction = {
    "tl:dr": "Explain this in a concise and easy to understand way.",
    beginner: "Explain this like I am new to programming.",
    intermediate: "Explain this with some technical depth.",
    advanced: "Explain this at an expert engineering level.",
  };

  const instruction =
    levelInstruction[level as keyof typeof levelInstruction] ?? "";

  if (mode === "followup") {
    return history;
  }
  return `
      ${instruction}

      user input:
      ${input}
    `;
}

export async function POST(req: Request) {
  try {
    // rate limiting
    const identifier = req.headers.get("x-forwarded-for") || "unknown";
    console.log("identifier", identifier);
    if (!identifier) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    // get the request body
    const body = (await req.json()) as ExplainRequest & { result?: string };
    const { input, mode, level, question, history } = body;

    if (mode === "followup") {
      if (!question || typeof question !== "string") {
        console.error("Invalid question logged", question);
        return NextResponse.json<ExplainResponse>(
          { error: "Invalid question" },
          { status: 400 }
        );
      }
    } else {
      if (!input || typeof input !== "string") {
        console.error("Invalid input logged", input);
        return NextResponse.json<ExplainResponse>(
          { error: "Invalid input" },
          { status: 400 }
        );
      }
    }

    const prompt = buildPrompt({
      input,
      level,
      mode,
      history,
    });
    console.log("prompt", prompt);

    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: prompt,
    });

    return NextResponse.json<ExplainResponse>({
      result: response.output_text,
    });
  } catch (err) {
    console.error("Explain API error:", err);

    return NextResponse.json<ExplainResponse>(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
}
