import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { ExplainRequest, ExplainResponse } from "../types";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, "1 m"),
});

export async function POST(req: Request) {
  try {
    const identifier = req.headers.get("x-forwarded-for") || "unknown";
    console.log("identifier", identifier);
    if (!identifier) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    const { input, mode = "explain" } = (await req.json()) as ExplainRequest;

    if (!input || typeof input !== "string") {
      return NextResponse.json<ExplainResponse>(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    const prompt =
      mode === "followup"
        ? `Answer this follow-up question based on the previous explanation:\n\n${input}`
        : `Explain the following documentation clearly and concisely:\n\n${input}`;

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
