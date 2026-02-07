"use client";
import { MainWorkspace } from "@/components/main-workspace";
import InputPanel from "@/components/ui/input-panel";
import { OutputPanel } from "@/components/ui/output-panel";
import { useState } from "react";
import { ExplainRequest, ExplainStatus, Mode } from "./types";

export default function Home() {
  const [status, setStatus] = useState<ExplainStatus>("idle");
  const [result, setResult] = useState<string>("");
  const [followUps, setFollowUps] = useState<ExplainRequest["followUps"]>("");
  const [mode, setMode] = useState<Mode>("explain" as Mode);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<ExplainRequest["level"]>("tl:dr");
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
        body: JSON.stringify({
          input: input,
          level: level,
          mode: mode,
          followUps: followUps,
        }),
      });
      const data = await res.json();
      setResult(data.result ?? "");
      setStatus("success");
      console.log(data);
    } catch {
      setStatus("error");
    }
  };

  const handleFollowUp = async () => {
    setIsFollowUpLoading(true);
    try {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          input: input,
          level: level,
          mode: mode,
          followUps: followUps,
        }),
      });
      const data = await res.json();
      setResult(data.result ?? "");
      setStatus("success");
      console.log(data);
    } catch {
      setStatus("error");
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
          status={status}
          result={result}
          isFollowUpLoading={isFollowUpLoading}
          handleFollowUp={handleFollowUp}
        />
      </MainWorkspace>
    </div>
  );
}
