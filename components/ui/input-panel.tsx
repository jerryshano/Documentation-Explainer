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
import { Separator } from "./separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

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
    <Card className="w-full min-w-0 bg-white/5 backdrop-blur-sm border border-border/50 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl lg:max-w-3xl h-auto md:h-full">
      <CardHeader className="pb-2">
        <CardTitle className="md:text-4xl text-2xl font-bold tracking-tight">
          Prompt Panel
        </CardTitle>
        <CardDescription className="text-md md:text-2xl font-medium">
          Paste your text or enter a URL to get started
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onExplain();
        }}
      >
        <Separator />
        <CardContent className="space-y-3 md:space-y-6 py-3">
          <Textarea
            className="min-h-[250px] md:min-h-[500px] mt-3"
            placeholder="Paste your text here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Input
            type="url"
            className="mt-3 text-md md:text-lg"
            placeholder="Enter the URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Tabs defaultValue="tl:dr" className=" w-full mt-3">
            <div className="overflow-x-auto -mx-1 px-1">
              <TabsList className="flex-nowrap">
                <TabsTrigger
                  className="text-md md:text-xl font-medium"
                  value="tl:dr"
                  onClick={() => setLevel("tl:dr")}
                >
                  TL:DR
                </TabsTrigger>
                <TabsTrigger
                  className="text-md md:text-xl font-medium"
                  value="beginner"
                  onClick={() => setLevel("beginner")}
                >
                  <span className="md:hidden">Bginnr</span>
                  <span className="hidden md:inline">Beginner</span>
                </TabsTrigger>
                <TabsTrigger
                  className="text-md md:text-xl font-medium"
                  value="intermediate"
                  onClick={() => setLevel("intermediate")}
                >
                  <span className="md:hidden">Intrmdiate</span>
                  <span className="hidden md:inline">Intermediate</span>
                </TabsTrigger>
                <TabsTrigger
                  className="text-md md:text-xl font-medium"
                  value="advanced"
                  onClick={() => setLevel("advanced")}
                >
                  <span className="md:hidden">Advncd</span>
                  <span className="hidden md:inline">Advanced</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="">
          <Button
            type="submit"
            size="lg"
            className="w-full text-md md:text-xl font-medium active:scale-95 active:brightness-90 active:translate-y-0.5 transition-all duration-100 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? "Loading..." : "Explain Documentation"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
