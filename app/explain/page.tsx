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

export default function ExplainPage() {
  const [status, setStatus] = useState<ExplainStatus>("idle");
  const [result, setResult] = useState<string>("");
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [isFollowUpLoading, setIsFollowUpLoading] = useState<boolean>(false);

  const handleExplain = () => {
    setStatus("loading");
    setTimeout(() => {
      setResult(`
      ## What this documentation does
      This API allows you to authenticate users 
      and retrieve their profile data.
      ### Key Concepts
      - OAuth-based authentication
      - Token expiration
      - Secure requests
    `);
      setStatus("success");
    }, 2000);
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
    <div className="h-screen flex w-full">
      <div className="w-full h-full max-w-7xl mx-auto p-3">
        <MainWorkspace>
          <InputPanel onExplain={handleExplain} status={status} />
          <OutputPanel
            status={status}
            result={result}
            followUps={followUps}
            isFollowUpLoading={isFollowUpLoading}
            onFollowUp={handleFollowUp}
          />
        </MainWorkspace>
      </div>
    </div>
  );
}
