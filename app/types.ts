export type ExplainRequest = {
  input: string;
  mode?: "explain" | "followup";
  level?: Level;
};

export type ExplainStatus = "idle" | "loading" | "success" | "error";

export type ExplainResponse = { result: string } | { error: string };

export type Level = "tl:dr" | "beginner" | "intermediate" | "advanced";

export type Mode = "explain" | "followup";
