import { useState } from "react";
import { MarkdownRenderer } from "../markdown-renderer";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { ScrollArea } from "./scroll-area";
import { Skeleton } from "./skeleton";
import { Textarea } from "./textarea";

interface FollowUp {
  question: string;
  answer: string;
}

interface OutputPanelProps {
  isFollowUpLoading: boolean;
  followUps: FollowUp[];
  onFollowUp: (question: string) => void;
  status: "idle" | "loading" | "success" | "error";
  result: string;
}

export function OutputPanel({
  status,
  result,
  followUps,
  isFollowUpLoading,
  onFollowUp,
}: OutputPanelProps) {
  const [question, setQuestion] = useState("");

  return (
    <Card className="w-full max-w-3xl h-full">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Output Panel</CardTitle>
        <Button className="text-xl mt-4" size="lg">
          Copy
        </Button>
        <CardDescription className="text-2xl mt-2">
          Documentation Explanation
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        {status === "idle" && (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Paste documentation to begin
            </p>
          </div>
        )}
        {status === "loading" && (
          <div className="flex flex-col h-[300px] space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        )}
        {status === "success" && (
          <div className="h-[300px]">
            <ScrollArea className="h-[300px] pr-4 bg-card">
              <MarkdownRenderer markdown={result} />
            </ScrollArea>
          </div>
        )}
        {status === "error" && (
          <div className="h-[300px]">
            <Alert variant="destructive">
              <AlertTitle>Unable to generate explanation</AlertTitle>
              <AlertDescription>
                Something went wrong while processing your documentation. Please
                try again in a moment.
              </AlertDescription>
            </Alert>
          </div>
        )}
        <div className="border-t pt-4 space-y-2">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={isFollowUpLoading}
            placeholder="Ask a follow-up question..."
            className="min-h-[80px]"
          />
          <Button
            size="lg"
            disabled={!question || isFollowUpLoading}
            onClick={() => onFollowUp(question)}
            className="w-full mt-3 text-xl"
          >
            {isFollowUpLoading ? "Loading..." : "Ask follow-up"}
          </Button>
        </div>
        <div className="flex-1 min-h-0 bg-card">
          <ScrollArea className="h-full mt-3 bg-card">
            {followUps.map((fu, index) => (
              <div
                key={index}
                className="rounded-md bg-card mt-3 p-3 break-words"
              >
                <p className="text-xs text-muted-foreground mb-1">You asked:</p>
                <p className="text-sm mb-2 font-medium">{fu.question}</p>
                <MarkdownRenderer markdown={fu.answer} />
              </div>
            ))}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
