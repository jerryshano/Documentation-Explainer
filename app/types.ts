export type ExplainRequest = {
  input: string;
  mode?: "explain" | "followup";
  level?: "tl:dr" | "beginner" | "intermediate" | "advanced";
  followUps?: string;
};

export type ExplainStatus = "idle" | "loading" | "success" | "error";

export type ExplainResponse = { result: string } | { error: string };

export type Mode = "explain" | "followup";
