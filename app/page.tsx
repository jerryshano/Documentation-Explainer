"use client";
import { MainWorkspace } from "@/components/main-workspace";
import InputPanel from "@/components/ui/input-panel";
import { OutputPanel } from "@/components/ui/output-panel";
import { useState } from "react";

type ExplainStatus = "idle" | "loading" | "success" | "error";
type FollowUp = {
  question: string;
  answer: string;
};
export default function Home() {
  const [status, setStatus] = useState<ExplainStatus>("idle");
  const [result, setResult] = useState<string>("");
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState<boolean>(false);
  const [mode, setMode] = useState("tl:dr");
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExplain = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({ input: input, level: mode }),
      });
      const data = await res.json();
      setResult(data.result ?? "");
      setStatus("success");
      console.log(data);
    } catch {
      setStatus("error");
    }
  };

  const handleFollowUp = (question: string) => {
    setIsFollowUpLoading(true);
    setTimeout(() => {
      setFollowUps((prev) => [
        ...prev,
        {
          question,
          answer: `### Follow-up explanation
          You asked:
          > ${question}
          Here is a more detailed explanation related
          to the original documentation.
          ## Key Concepts
          - OAuth-based authentication
          - Token expiration
          - Secure requests
        `,
        },
      ]);
      setIsFollowUpLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <MainWorkspace>
        {/* <ExplainPage /> */}
        <InputPanel
          onExplain={handleExplain}
          status={status}
          input={input}
          setInput={setInput}
          url={url}
          setUrl={setUrl}
          mode={mode}
          setMode={setMode}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <OutputPanel
          status={status}
          result={result}
          followUps={followUps}
          isFollowUpLoading={isFollowUpLoading}
          onFollowUp={handleFollowUp}
        />
      </MainWorkspace>
    </div>
  );
}
