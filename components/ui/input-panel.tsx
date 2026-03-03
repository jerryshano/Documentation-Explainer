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
    <Card className="w-full min-w-0 lg:max-w-3xl h-auto md:h-full">
      <CardHeader className="pb-2">
        <CardTitle className="md:text-4xl text-2xl font-bold tracking-tight">
          Prompt Panel
        </CardTitle>
        <CardDescription className="text-md md:text-2xl font-medium">
          Upload, paste, or enter a URL to get started
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onExplain();
        }}
      >
        <Separator />
        <CardContent className="space-y-3 md:space-y-6 py-5">
          <Input
            type="file"
            // value={file}
            // onChange={(e) => setFile(e.target.value)}
          />
          <Textarea
            className="min-h-[200px] md:min-h-[500px] mt-3"
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
          <div className="md:hidden w-full mt-3">
            <Select>
              <SelectTrigger className="w-full text-md">
                <SelectValue placeholder="Select a Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Levels</SelectLabel>
                  <SelectItem value="tl:dr" onClick={() => setLevel("tl:dr")}>
                    TL:DR
                  </SelectItem>
                  <SelectItem
                    value="beginner"
                    onClick={() => setLevel("beginner")}
                  >
                    Beginner
                  </SelectItem>
                  <SelectItem
                    value="intermediate"
                    onClick={() => setLevel("intermediate")}
                  >
                    Intermediate
                  </SelectItem>
                  <SelectItem
                    value="advanced"
                    onClick={() => setLevel("advanced")}
                  >
                    Advanced
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Tabs defaultValue="tl:dr" className="hidden md:block w-full mt-3">
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
                  Beginner
                </TabsTrigger>
                <TabsTrigger
                  className="text-md md:text-xl font-medium"
                  value="intermediate"
                  onClick={() => setLevel("intermediate")}
                >
                  Intermediate
                </TabsTrigger>
                <TabsTrigger
                  className="text-md md:text-xl font-medium"
                  value="advanced"
                  onClick={() => setLevel("advanced")}
                >
                  Advanced
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="mt-3">
          <Button
            type="submit"
            size="lg"
            className="w-full text-md md:text-xl font-medium"
          >
            {isLoading ? "Loading..." : "Explain Documentation"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
