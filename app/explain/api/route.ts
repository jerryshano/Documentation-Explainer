import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { input, mode = "explain" } = await req.json();

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
    });
  } catch (err) {
    console.error("Explain API error:", err);

    return NextResponse.json(
      { error: "Failed to generate explanation" },
      { status: 500 }
    );
  }
}
