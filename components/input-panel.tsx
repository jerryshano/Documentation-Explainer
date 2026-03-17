import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Level } from "@/app/types";
import { Separator } from "./ui/separator";

interface InputPanelProps {
  onExplain: () => void;
  input: string;
  setInput: (input: string) => void;
  setLevel: (level: Level) => void;
  isLoading: boolean;
}

export default function InputPanel({
  onExplain,
  input,
  setInput,
  setLevel,
  isLoading,
}: InputPanelProps) {
  return (
    <Card className="w-full min-w-0 flex flex-col md:h-full md:min-h-0 bg-white/5 backdrop-blur-sm border border-border/50 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl ">
      <CardHeader className="pb-3">
        <CardTitle className="md:text-3xl lg:text-4xl text-2xl font-bold tracking-tight">
          Prompt Panel
        </CardTitle>
        <CardDescription className="text-md md:text-2xl font-medium">
          Paste documentation below to get started
        </CardDescription>
      </CardHeader>
      <form
        className="flex flex-col flex-1 min-h-0"
        onSubmit={(e) => {
          e.preventDefault();
          onExplain();
        }}
      >
        <Separator />
        <CardContent className="flex flex-col flex-1 min-h-0 overflow-auto space-y-9 py-8">
          <div className="flex-1 min-h-[45vh] md:min-h-0 overflow-hidden flex flex-col">
            <Textarea
              className="h-full min-h-[45vh] w-full resize-none text-md md:text-lg lg:text-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              placeholder="Paste your documentation here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Tabs defaultValue="tl:dr" className="w-full">
            <div className="overflow-x-auto -mx-1 px-1 w-full">
              <TabsList className="flex-nowrap w-full">
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
                  <span className="lg:hidden">Bginnr</span>
                  <span className="hidden lg:inline">Beginner</span>
                </TabsTrigger>
                <TabsTrigger
                  className="text-md md:text-xl font-medium"
                  value="intermediate"
                  onClick={() => setLevel("intermediate")}
                >
                  <span className="lg:hidden">Intrmed</span>
                  <span className="hidden lg:inline">Intermediate</span>
                </TabsTrigger>
                <TabsTrigger
                  className="text-md md:text-xl font-medium"
                  value="advanced"
                  onClick={() => setLevel("advanced")}
                >
                  <span className="lg:hidden">Advnced</span>
                  <span className="hidden lg:inline">Advanced</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="mt-3">
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
