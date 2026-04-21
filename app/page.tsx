"use client";
import { useEffect, useState } from "react";

import { MainWorkspace } from "@/components/main-workspace";
import InputPanel from "@/components/input-panel";
import { OutputPanel } from "@/components/output-panel";
import { streamExplainAction } from "./api/actions";
import {
  ChatHistory,
  ExplainStatus,
  HistoryMessage,
  Level,
} from "./types";
import { AppSidebar } from "@/components/app-sidebar";
import MarkdownOutput from "@/components/markdown-output";

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
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem("chatHistory");
    if (stored) {
      const parsed = JSON.parse(stored) as ChatHistory[];
      setChatHistory(
        parsed.filter(
          (chat) =>
            typeof chat.id === "string" &&
            typeof chat.prompt === "string" &&
            typeof chat.response === "string"
        )
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

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
      const chatId = crypto.randomUUID();
      setExplanationNode(result.node);
      setChatHistory((prev) => [
        {
          id: chatId,
          prompt: input,
          response: result.text,
        },
        ...prev,
      ]);
      setActiveChatId(chatId);
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

  const handleSelectChat = (chat: ChatHistory) => {
    setActiveChatId(chat.id);
    setExplanationNode(<MarkdownOutput content={chat.response} />);
    setStatus("success");
    setFollowUpStatus("idle");
    setFollowUpNode(null);
  };

  return (
    <div className="min-h-0 flex-1 w-full max-w-full p-4 md:pb-4 pb-[max(3rem,env(safe-area-inset-bottom))] flex flex-col">
      <div className="flex min-h-0 flex-1 flex-col">
        <MainWorkspace>
          <div className="flex min-h-0 min-w-0 flex-col md:h-full">
            <AppSidebar
              chatHistory={chatHistory}
              onSelectChat={handleSelectChat}
              activeChatId={activeChatId}
            />
          </div>
          <div className="flex min-h-0 min-w-0 flex-col md:h-full">
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
      </div>
    </div>
  );
}
