import { ExplainRequest } from "@/app/types";
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
import { Separator } from "./separator";
import MarkdownOutput from "../markdown-output";

interface OutputPanelProps {
  question: string;
  setQuestion: (question: string) => void;
  isFollowUpLoading: boolean;
  onFollowUp: () => void;
  status: "idle" | "loading" | "success" | "error";
  result: ExplainRequest["result"];
  followUpStatus: "idle" | "loading" | "success" | "error";
  followUpResult: ExplainRequest["result"];
}

export function OutputPanel({
  question,
  setQuestion,
  status,
  result,
  followUpStatus,
  followUpResult,
  isFollowUpLoading,
  onFollowUp,
}: OutputPanelProps) {
  return (
    <Card className="w-full min-w-0 md:h-full md:flex md:flex-col md:min-h-0 bg-white/5 backdrop-blur-sm border border-border/50 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ">
      <CardHeader className="shrink-0 pb-3">
        <div className="flex flex-row justify-between items-center w-full gap-3">
          <CardTitle className="md:text-3xl lg:text-4xl text-2xl font-bold truncate min-w-0">
            Explanation Panel
          </CardTitle>
          <Button
            disabled={status !== "success"}
            className="shrink-0 md:text-base text-sm active:scale-95 active:brightness-90 active:translate-y-0.5 transition-all duration-100 hover:scale-[1.02] active:scale-[0.98]"
            size="sm"
          >
            Copy
          </Button>
        </div>
        <CardDescription className="text-md md:text-2xl font-medium">
          Your explanation will appear below
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col flex-1 min-h-0 space-y-9 py-2">
        {status === "idle" && (
          <div className="h-[280px] md:h-[310px] lg:h-[390px] shrink-0 rounded-lg border border-dashed border-border/60 bg-muted/30">
            <p className="text-lg mt-2 text-muted-foreground px-4">
              Paste documentation into the prompt panel to the Left to begin
            </p>
          </div>
        )}
        {status === "loading" && (
          <div className="flex flex-col h-[240px] md:h-[360px] lg:h-[400px] shrink-0 space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        )}
        {status === "success" && (
          <div className="h-[240px] md:h-[360px] lg:h-[400px] shrink-0">
            <ScrollArea className="h-[240px] pr-4 bg-card whitespace-pre-wrap animate-fade-in">
              <MarkdownOutput content={result ?? ""} />
            </ScrollArea>
          </div>
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
        <Separator className="" />
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
            className="h-[100px] md:h-[120px] lg:h-[140px] text-md md:text-lg lg:text-xl overflow-y-auto"
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
        <div className="flex flex-col flex-1 min-h-0 bg-card">
          {followUpStatus === "success" && (
            <ScrollArea className="h-full mt-3 bg-card">
              <MarkdownRenderer markdown={followUpResult ?? ""} />
            </ScrollArea>
          )}
          {followUpStatus === "error" && (
            <Alert variant="destructive" className="flex-1 min-h-0">
              <AlertTitle>Unable to generate follow-up explanation</AlertTitle>
              <AlertDescription>
                Something went wrong while processing your follow-up question.
                Please try again in a moment.
              </AlertDescription>
            </Alert>
          )}
          {followUpStatus === "loading" && (
            <div className="flex flex-col flex-1 min-h-0 space-y-3">
              <Skeleton className="h-[125px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          )}
          {followUpStatus === "idle" && (
            <div className="min-h-[280px] md:min-h-0 flex-1 rounded-lg border border-dashed border-border/60 bg-muted/30">
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
