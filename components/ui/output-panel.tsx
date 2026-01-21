import { useState } from "react";
import { MarkdownRenderer } from "../markdown-renderer";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
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
    onFollowUp }: OutputPanelProps) {
  const [question, setQuestion] = useState("");

  return (
  <Card className="w-full max-w-3xl">
    <CardHeader>
      <CardTitle className="text-4xl font-bold">Output Panel</CardTitle>
      <Button className="text-xl mt-4" size="lg">Copy</Button>
      <CardDescription className="text-2xl mt-2">Documentation Explanation</CardDescription>
    </CardHeader>
    <CardContent>
      {status === "idle" && (
    <p className="text-sm text-muted-foreground">
      Paste documentation to begin
    </p>
  )}
  {status === "loading" && (
     <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )}

  {status === "success" && (
    <ScrollArea className="h-[400px] pr-4">
      <MarkdownRenderer markdown={result} />
    </ScrollArea>
  )}
  {status === "error" && (
    <Alert variant="destructive">
  <AlertTitle>Unable to generate explanation</AlertTitle>
  <AlertDescription>
    Something went wrong while processing your documentation.
    Please try again in a moment.
  </AlertDescription>
  </Alert>
  )}
    <div className="border-t pt-4 space-y-2">
    <Textarea
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    disabled={isFollowUpLoading}
      placeholder="Ask a follow-up question..."
      className="min-h-[80px]"
    />
    <Button size="sm" 
     disabled={!question || isFollowUpLoading} 
    onClick={() => onFollowUp(question)}>
      {isFollowUpLoading ? "Loading..." : "Ask follow-up"}
    </Button>
    </div>
    <div className="space-y-4">
  <MarkdownRenderer markdown={result} />

{followUps.map((fu, index) => (
  <div key={index} className="rounded-md bg-muted p-3">
    <p className="text-xs text-muted-foreground mb-1">
      You asked:
    </p>

    <p className="text-sm mb-2 font-medium">
      {fu.question}
    </p>

    <MarkdownRenderer markdown={fu.answer} />
  </div>
))}

</div>


   </CardContent>
  </Card>
  );
}