export type Level = "tl:dr" | "beginner" | "intermediate" | "advanced";

export type ExplainRequest = {
  input?: string;
  mode?: "explain" | "followup";
  level?: Level;
  question?: string;
  result?: string;
  history?: HistoryMessage[];
};

export type HistoryMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type History = HistoryMessage[];

export type ExplainStatus = "idle" | "loading" | "success" | "error";

export type ExplainResponse = { result: string } | { error: string };

export type Mode = "explain" | "followup";
