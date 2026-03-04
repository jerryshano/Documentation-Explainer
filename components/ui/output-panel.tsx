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
    <Card className="w-full min-w-0 lg:max-w-3xl h-auto md:h-full min-h-[280px]">
      <CardHeader>
        <CardTitle className="md:text-4xl text-2xl font-bold">
          Explanation Panel
        </CardTitle>
        <Button className="md:text-xl text-md mt-4" size="lg">
          Copy
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        {status === "idle" && (
          <div className="h-[300px] flex items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Your answer will appear here...
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
              {/* <Skeleton className="h-4 w-5/6" /> */}
            </div>
          </div>
        )}
        {status === "success" && (
          <div className="h-[300px]">
            <ScrollArea className="h-[300px] pr-4 bg-card">
              <MarkdownRenderer markdown={result ?? ""} />
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
        <Separator />
        <div className="pt-4 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onFollowUp();
            }}
          >
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isFollowUpLoading}
              placeholder="Ask a follow-up question..."
              className="h-[80px] overflow-y-auto"
            />
            <Button
              size="lg"
              disabled={!question || isFollowUpLoading}
              className="w-full mt-3 md:text-xl text-md"
              type="submit"
            >
              {isFollowUpLoading ? "Loading..." : "Ask follow-up"}
            </Button>
          </form>
        </div>
        <div className="flex-1 min-h-0 bg-card">
          {followUpStatus === "success" && (
            <ScrollArea className="h-full mt-3 bg-card">
              <MarkdownRenderer markdown={followUpResult ?? ""} />
            </ScrollArea>
          )}
          {followUpStatus === "error" && (
            <Alert variant="destructive">
              <AlertTitle>Unable to generate follow-up explanation</AlertTitle>
              <AlertDescription>
                Something went wrong while processing your follow-up question.
                Please try again in a moment.
              </AlertDescription>
            </Alert>
          )}
          {followUpStatus === "loading" && (
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
              </div>
            </div>
          )}
          {followUpStatus === "idle" && (
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-md md:text-lg text-muted-foreground">
                Your follow-up answer will appear here...
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
