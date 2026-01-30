import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type ExplainRequest = {
  input: string;
  mode?: "explain" | "followup";
};

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, "1 m"),
});

type ExplainResponse = { result: string } | { error: string };

export async function POST(req: Request) {
  try {
    const identifier = "api";
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { input, mode = "explain" } = (await req.json()) as ExplainRequest;

    if (!input || typeof input !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const prompt =
      mode === "followup"
        ? `Answer this follow-up question based on the previous explanation:\n\n${input}`
        : `Explain the following documentation clearly and concisely:\n\n${input}`;

    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: prompt,
    });

    return NextResponse.json({
      result: response.output_text,
    } as ExplainResponse);
  } catch (err) {
    console.error("Explain API error:", err);

    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
}
