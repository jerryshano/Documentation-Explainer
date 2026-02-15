import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { Textarea } from "./textarea";
import { Input } from "./input";
import { Button } from "./button";
import { Level } from "@/app/types";

interface InputPanelProps {
  onExplain: () => void;
  input: string;
  setInput: (input: string) => void;
  url: string;
  setUrl: (url: string) => void;
  setLevel: (level: Level) => void;
  isLoading: boolean;
}

export default function InputPanel({
  onExplain,
  input,
  setInput,
  url,
  setUrl,
  setLevel,
  isLoading,
}: InputPanelProps) {
  return (
    <Card className="w-full max-w-3xl h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-4xl font-bold tracking-tight">
          Prompt Panel
        </CardTitle>
        <CardDescription className="text-2xl font-medium">
          Upload, paste, or enter a URL to get started
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onExplain();
        }}
      >
        <CardContent className="space-y-6 py-3">
          <Input
            type="file"
            // value={file}
            // onChange={(e) => setFile(e.target.value)}
          />
          <Textarea
            className="min-h-[500px] mt-3"
            placeholder="Paste your text here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Input
            type="url"
            className="mt-3 text-lg"
            placeholder="Enter the URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Tabs defaultValue="tl:dr" className="w-full mt-3">
            <TabsList>
              <TabsTrigger
                className="text-xl font-medium"
                value="tl:dr"
                onClick={() => setLevel("tl:dr")}
              >
                TL:DR
              </TabsTrigger>
              <TabsTrigger
                className="text-xl font-medium"
                value="beginner"
                onClick={() => setLevel("beginner")}
              >
                Beginner
              </TabsTrigger>
              <TabsTrigger
                className="text-xl font-medium"
                value="intermediate"
                onClick={() => setLevel("intermediate")}
              >
                Intermediate
              </TabsTrigger>
              <TabsTrigger
                className="text-xl font-medium"
                value="advanced"
                onClick={() => setLevel("advanced")}
              >
                Advanced
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
        <CardFooter className="mt-3">
          <Button
            type="submit"
            size="lg"
            className="w-full text-xl font-medium"
          >
            {isLoading ? "Loading..." : "Explain Documentation"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
