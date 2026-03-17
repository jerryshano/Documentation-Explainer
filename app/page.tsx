"use client";
import { useState } from "react";

import { MainWorkspace } from "@/components/main-workspace";
import InputPanel from "@/components/input-panel";
import { OutputPanel } from "@/components/output-panel";
import { streamExplainAction } from "./api/actions";
import { ExplainStatus, HistoryMessage, Level } from "./types";

export default function Home() {
  const [status, setStatus] = useState<ExplainStatus>("idle");
  const [explanationNode, setExplanationNode] =
    useState<React.ReactNode | null>(null);

  const [question, setQuestion] = useState<string>("");
  const [followUpNode, setFollowUpNode] = useState<React.ReactNode | null>(
    null
  );
  const [followUpStatus, setFollowUpStatus] = useState<ExplainStatus>("idle");

  const [history, setHistory] = useState<HistoryMessage[]>([]);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState<boolean>(false);
  const [level, setLevel] = useState<Level>("tl:dr");
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleExplain = async () => {
    setIsLoading(true);
    setStatus("loading");
    try {
      const node = await streamExplainAction({
        input,
        level,
        mode: "explain",
        history,
      });

      setExplanationNode(node);
      setHistory([...history, { role: "user", content: input ?? "" }]);
      setStatus("success");
    } catch (error) {
      console.error("Error explaining (streamUI)", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUp = async () => {
    setIsFollowUpLoading(true);
    setFollowUpStatus("loading");
    try {
      const node = await streamExplainAction({
        input: question,
        level,
        mode: "followup",
        history,
      });

      setFollowUpNode(node);
      setHistory([...history, { role: "user", content: question ?? "" }]);
      setFollowUpStatus("success");
    } catch (error) {
      console.error("Error following up (streamUI)", error);
      setFollowUpStatus("error");
    } finally {
      setIsFollowUpLoading(false);
    }
  };

  return (
    <div className="min-h-0 flex-1 w-full max-w-full p-4 md:pb-4 pb-[max(3rem,env(safe-area-inset-bottom))] flex flex-col">
      <MainWorkspace>
        <div className="flex flex-col min-w-0 md:flex-1 md:min-h-0">
          <InputPanel
            onExplain={handleExplain}
            input={input}
            setInput={setInput}
            setLevel={setLevel}
            isLoading={isLoading}
          />
        </div>
        <div className="flex flex-col min-w-0 md:flex-1 md:minh-0">
          <OutputPanel
            question={question}
            setQuestion={setQuestion}
            status={status}
            explanationNode={explanationNode}
            followUpStatus={followUpStatus}
            followUpNode={followUpNode}
            isFollowUpLoading={isFollowUpLoading}
            onFollowUp={handleFollowUp}
          />
        </div>
      </MainWorkspace>
    </div>
  );
}
