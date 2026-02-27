"use client";
import { MainWorkspace } from "@/components/main-workspace";
import InputPanel from "@/components/ui/input-panel";
import { OutputPanel } from "@/components/ui/output-panel";
import { useEffect, useState } from "react";
import { ExplainStatus, HistoryMessage, Level } from "./types";

export default function Home() {
  const [status, setStatus] = useState<ExplainStatus>("idle");
  const [result, setResult] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [followUpResult, setFollowUpResult] = useState<string>("");
  const [followUpStatus, setFollowUpStatus] = useState<ExplainStatus>("idle");
  const [history, setHistory] = useState<HistoryMessage[]>([]);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<Level>("tl:dr");
  const [input, setInput] = useState<string>("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExplain = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          input: input,

          level: level,
          mode: "explain",
        }),
      });
      const data = await res.json();
      setResult(data.result ?? "");
      setHistory([
        ...history,
        { role: "user", content: input ?? "" },
        { role: "assistant", content: data.result ?? "" },
      ]);
      setStatus("success");
      console.log("data", data);
    } catch (error) {
      console.error("Error explaining", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    console.log("history", history);
  }, [history]);

  const handleFollowUp = async () => {
    setIsFollowUpLoading(true);
    setFollowUpStatus("loading");
    try {
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          question: question,
          result: result,
          mode: "followup",
          history: history,
        }),
      });
      const data = await res.json();
      setFollowUpResult(data.result ?? "");
      setHistory([
        ...history,
        { role: "user", content: question ?? "" },
        { role: "assistant", content: data.result ?? "" },
      ]);
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
