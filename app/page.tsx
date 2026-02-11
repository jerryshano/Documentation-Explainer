"use client";
import { MainWorkspace } from "@/components/main-workspace";
import InputPanel from "@/components/ui/input-panel";
import { OutputPanel } from "@/components/ui/output-panel";
import { useState } from "react";
import { ExplainRequest, ExplainStatus, Mode } from "./types";

export default function Home() {
  const [status, setStatus] = useState<ExplainStatus>("idle");
  const [result, setResult] = useState<string>("");
  const [followUpResult, setFollowUpResult] = useState<string>("");
  const [followUpStatus, setFollowUpStatus] = useState<ExplainStatus>("idle");
  const [mode, setMode] = useState<Mode>("explain" as Mode);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<ExplainRequest["level"]>("tl:dr");
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExplain = async () => {
    setStatus("loading");
    setMode("explain");
    try {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          input: input,
          level: level,
          mode: mode,
        }),
      });
      const data = await res.json();
      setResult(data.result ?? "");
      setStatus("success");
      console.log(data);
    } catch (error) {
      console.error("Error explaining", error);
      setStatus("error");
    }
  };

  const handleFollowUp = async () => {
    setIsFollowUpLoading(true);
    setMode("followup");
    try {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          question: question,
          mode: mode,
        }),
      });
      const data = await res.json();
      setFollowUpResult(data.result ?? "");
      setFollowUpStatus("success");
      console.log(data);
    } catch (error) {
      console.error("Error following up", error);
      setFollowUpStatus("error");
    } finally {
      setIsFollowUpLoading(false);
    }
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
          question={question}
          setQuestion={setQuestion}
          status={status}
          result={result}
          followUpStatus={followUpStatus}
          followUpResult={followUpResult}
          isFollowUpLoading={isFollowUpLoading}
          onFollowUp={handleFollowUp}
        />
      </MainWorkspace>
    </div>
  );
}
