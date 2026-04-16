"use server";

import { streamUI } from "@ai-sdk/rsc";
import { openai as aiOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

import MarkdownOutput from "@/components/markdown-output";
import { ExplainRequest, HistoryMessage, Level } from "../types";

const model = aiOpenAI("gpt-5-nano");

const levelInstruction: Record<Level, string> = {
  "tl:dr": "Explain this in a concise and easy to understand way.",
  beginner: "Explain this like I am new to programming.",
  intermediate: "Explain this with some technical depth.",
  advanced: "Explain this at an expert engineering level.",
};

function buildPrompt({
  input,
  level,
  mode,
  history,
}: {
  input: string;
  level: Level;
  mode: NonNullable<ExplainRequest["mode"]>;
  history?: HistoryMessage[];
}) {
  const instruction = levelInstruction[level] ?? "";

  if (mode === "followup") {
    // For followups, send prior context plus the latest question.
    // Also include the level instruction so followups keep the same depth.
    return [
      ...(instruction ? [{ role: "user" as const, content: instruction }] : []),
      ...(history ?? []),
      { role: "user" as const, content: input },
    ];
  }

  return `
${instruction}

user input:
${input}
`.trim();
}

const systemPrompt =
  "You are a senior software engineer and technical educator. Your job is to explain technical documentation clearly, accurately, and at the requested depth. Use examples when helpful. Avoid hallucinations. When showing code examples, always use proper markdown fenced code blocks with language identifiers (e.g., ```javascript const sayHello = () => { console.log('Hello, world!'); }; sayHello(); ```).";

export async function streamExplainAction(args: {
  input: string;
  level: Level;
  mode: NonNullable<ExplainRequest["mode"]>;
  history?: HistoryMessage[];
}) {
  const { input, level, mode, history } = args;

  const prompt = buildPrompt({
    input,
    level,
    mode,
    history,
  });
  // 1️⃣ STREAM UI (existing)
  const uiResult =
    mode === "followup" && Array.isArray(prompt)
      ? await streamUI({
          model,
          system: systemPrompt,
          messages: prompt.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          text: ({ content }) => <MarkdownOutput content={content} />,
        })
      : await streamUI({
          model,
          system: systemPrompt,
          prompt: typeof prompt === "string" ? prompt : "",
          text: ({ content }) => <MarkdownOutput content={content} />,
        });

  // 2️⃣ GET FULL TEXT (NEW)
  const textResult = await generateText({
    model,
    system: systemPrompt,
    prompt:
      typeof prompt === "string"
        ? prompt
        : prompt.map((m) => m.content).join("\n"),
  });

  return {
    node: uiResult.value,
    text: textResult.text,
  };
}
