export type ExplainRequest = {
  input?: string;
  mode?: "explain" | "followup";
  level?: "tl:dr" | "beginner" | "intermediate" | "advanced";
  question?: string;
  result?: string;
};

export type History = {
  result: ExplainRequest["result"];
  question?: ExplainRequest["question"];
};

export type ExplainStatus = "idle" | "loading" | "success" | "error";

export type ExplainResponse = { result: string } | { error: string };

export type Mode = "explain" | "followup";
