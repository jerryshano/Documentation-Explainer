"use client";
import { useEffect, useState } from "react";

import { MainWorkspace } from "@/components/main-workspace";
import InputPanel from "@/components/input-panel";
import { OutputPanel } from "@/components/output-panel";
import { streamExplainAction } from "./api/actions";
import { ExplainStatus, HistoryMessage, Level } from "./types";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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
  const [chatHistory, setChatHistory] = useState<
    { id: string; prompt: string; response: React.ReactNode }[]
  >([]);

  useEffect(() => {
    const stored = localStorage.getItem("chatHistory");
    if (stored) {
      setChatHistory(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  console.log("explanationNode", explanationNode);

  const handleExplain = async () => {
    setIsLoading(true);
    setStatus("loading");
    try {
      const result = await streamExplainAction({
        input,
        level,
        mode: "explain",
        history,
      });
      setExplanationNode(result.node);
      setChatHistory((prev) => [
        {
          id: crypto.randomUUID(),
          prompt: input,
          response: result.node,
        },
        ...prev,
      ]);
      setHistory([
        {
          id: crypto.randomUUID(),
          role: "user",
          content: input ?? "",
        },
        ...history,
      ]);
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
      const nextHistory: HistoryMessage[] = [
        ...history,
        { id: crypto.randomUUID(), role: "user", content: question ?? "" },
      ];
      const result = await streamExplainAction({
        input: question,
        level,
        mode: "followup",
        history: nextHistory,
      });

      setFollowUpNode(result.node);
      setHistory(nextHistory);
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
      <SidebarProvider className="flex min-h-0 flex-1 flex-col">
        <MainWorkspace>
          <div className="flex min-h-0 min-w-0 flex-col md:h-full">
            <AppSidebar />
          </div>
          <div className="flex min-h-0 min-w-0 flex-col md:h-full">
            <div className="flex shrink-0 pb-2 md:hidden">
              <SidebarTrigger />
            </div>
            <InputPanel
              onExplain={handleExplain}
              input={input}
              setInput={setInput}
              setLevel={setLevel}
              isLoading={isLoading}
            />
          </div>
          <div className="flex min-h-0 min-w-0 flex-col md:h-full md:min-h-0">
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
      </SidebarProvider>
    </div>
  );
}
