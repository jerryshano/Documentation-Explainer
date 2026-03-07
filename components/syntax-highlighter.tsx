import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  code: string;
  language?: string;
};

export default function SyntaxHighlight({
  code,
  language = "javascript",
}: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        borderRadius: "10px",
        padding: "16px",
        fontSize: "0.9rem",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
