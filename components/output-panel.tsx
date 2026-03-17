"use client";

import { Suspense, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";

interface OutputPanelProps {
  question: string;
  setQuestion: (question: string) => void;
  isFollowUpLoading: boolean;
  onFollowUp: () => void;
  status: "idle" | "loading" | "success" | "error";
  explanationNode: React.ReactNode | null;
  followUpStatus: "idle" | "loading" | "success" | "error";
  followUpNode: React.ReactNode | null;
}

export function OutputPanel({
  question,
  setQuestion,
  status,
  explanationNode,
  followUpStatus,
  followUpNode,
  isFollowUpLoading,
  onFollowUp,
}: OutputPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!explanationNode) return;
    try {
      // Best-effort: copy the text content from the currently rendered explanation.
      const container = document.querySelector(
        "[data-explanation-root]"
      ) as HTMLElement | null;
      if (container) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(container);
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand("copy");
        selection?.removeAllRanges();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available or denied
    }
  };

  return (
    <Card className="w-full min-w-0 md:h-full md:flex md:flex-col md:min-h-0 bg-white/5 backdrop-blur-sm border border-border/50 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ">
      <CardHeader className="shrink-0 pb-3">
        <div className="flex flex-row justify-between items-center w-full gap-3">
          <CardTitle className="md:text-3xl lg:text-4xl text-2xl font-bold truncate min-w-0">
            Explanation Panel
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            disabled={status !== "success"}
            type="submit"
            className="shrink-0 lg:w-26 lg:text-lg text-sm"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <CardDescription className="text-md md:text-2xl font-medium">
          Your explanation will appear below
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col flex-1 min-h-0 space-y-9 py-2">
        {status === "idle" && (
          <div className="h-[280px] md:h-[310px] lg:h-[330px] shrink-0 rounded-lg border border-dashed border-border/60 bg-muted/30">
            <p className="text-lg mt-2 text-muted-foreground px-4">
              Paste documentation into the prompt panel to the Left to begin
            </p>
          </div>
        )}
        {status === "loading" && (
          <div className="flex flex-col h-[240px] md:h-[360px] lg:h-[400px] min-h-[240px] md:min-h-[360px] lg:min-h-[400px] shrink-0 overflow-hidden space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl shrink-0" />
            <div className="space-y-2 min-h-0 flex-1 overflow-hidden">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        )}
        {status === "success" && (
          <ScrollArea className="min-w-0 overflow-x-hidden h-[240px] md:h-[360px] lg:h-[400px] shrink-0 pr-4 bg-card whitespace-pre-wrap animate-fade-in">
            <div
              className="min-w-0 w-full wrap-break-word md:text-lg lg:text-xl"
              data-explanation-root
            >
              <Suspense
                fallback={<Skeleton className="h-4 w-full animate-pulse" />}
              >
                {explanationNode}
              </Suspense>
            </div>
          </ScrollArea>
        )}
        {status === "error" && (
          <div className="h-[240px] md:h-[360px] lg:h-[400px] shrink-0">
            <Alert variant="destructive">
              <AlertTitle>Unable to generate explanation</AlertTitle>
              <AlertDescription>
                Something went wrong while processing your documentation. Please
                try again in a moment.
              </AlertDescription>
            </Alert>
          </div>
        )}
        <form
          className="space-y-9 md:space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onFollowUp();
          }}
        >
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={followUpStatus !== "idle" || isFollowUpLoading}
            placeholder="Ask a follow-up question..."
            className="h-[100px] md:h-[120px] lg:h-[121px] text-md md:text-lg lg:text-xl overflow-y-auto"
          />
          <Button
            size="lg"
            disabled={!question || isFollowUpLoading}
            className="w-full md:text-xl text-md active:scale-95 active:brightness-90 active:translate-y-0.5 transition-all duration-100"
            type="submit"
          >
            {isFollowUpLoading ? "Loading..." : "Ask follow-up"}
          </Button>
        </form>
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-card max-h-[240px] md:max-h-[360px] lg:max-h-[400px]">
          {followUpStatus === "success" && (
            <ScrollArea className="h-full min-w-0 overflow-x-hidden bg-card whitespace-pre-wrap animate-fade-in max-h-[240px] md:max-h-[360px] lg:max-h-[400px]">
              <div className="min-w-0 w-full wrap-break-word md:text-lg lg:text-xl">
                <Suspense
                  fallback={<Skeleton className="h-4 w-full animate-pulse" />}
                >
                  {followUpNode}
                </Suspense>
              </div>
            </ScrollArea>
          )}
          {followUpStatus === "error" && (
            <Alert
              variant="destructive"
              className="flex-1 min-h-0 overflow-hidden"
            >
              <AlertTitle>Unable to generate follow-up explanation</AlertTitle>
              <AlertDescription>
                Something went wrong while processing your follow-up question.
                Please try again in a moment.
              </AlertDescription>
            </Alert>
          )}
          {followUpStatus === "loading" && (
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden space-y-3">
              <Skeleton className="h-7 w-full rounded-xl shrink-0" />
              <div className="space-y-2 min-h-0 flex-1 overflow-hidden">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          )}
          {followUpStatus === "idle" && (
            <div className="min-h-[280px] md:min-h-0 flex-1 overflow-hidden rounded-lg border border-dashed border-border/60 bg-muted/30">
              <p className="text-lg mt-2 text-muted-foreground px-4">
                Paste the explanation into the left panel to get started.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
