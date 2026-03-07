import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

export default function MarkdownOutput({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children, node, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const isInline =
            node?.position?.start.line === node?.position?.end.line && !match;

          if (!isInline) {
            return (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match?.[1] || "javascript"}
                PreTag="div"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          }

          return <code {...props}>{children}</code>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
