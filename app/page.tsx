"use client";
import { MainWorkspace } from "@/components/main-workspace";
import InputPanel from "@/components/ui/input-panel";
import { OutputPanel } from "@/components/ui/output-panel";
import { useState } from "react";
import { Level, ExplainStatus, Mode } from "./types";

type FollowUp = {
  question: string;
  answer: string;
};
export default function Home() {
  const [status, setStatus] = useState<ExplainStatus>("idle");
  const [result, setResult] = useState<string>("");
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [mode, setMode] = useState<Mode>("explain" as Mode);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<Level>("tl:dr");
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
        body: JSON.stringify({ input: input, level: level, mode: mode }),
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
    setMode("followup");
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
        <InputPanel
          onExplain={handleExplain}
          input={input}
          setInput={setInput}
          url={url}
          setUrl={setUrl}
          setLevel={setLevel}
          isLoading={isLoading}
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
