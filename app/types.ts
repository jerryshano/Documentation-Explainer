export type ExplainRequest = {
  input: string;
  mode?: "explain" | "followup";
};

export type ExplainResponse = { result: string } | { error: string };
