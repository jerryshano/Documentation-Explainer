import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

export default function MarkdownOutput({ content }: { content: string }) {
  return (
    <div className="min-w-0 max-w-full wrap-break-word [&_pre]:max-w-full [&_pre]:overflow-x-hidden [&_pre]:overflow-y-visible [&_code]:wrap-break-word">
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
                  wrapLongLines
                  className="min-w-0 w-full max-w-full overflow-hidden"
                  customStyle={{
                    margin: 0,
                    maxWidth: "100%",
                    overflow: "hidden",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                  codeTagProps={{
                    style: {
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    },
                  }}
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
    </div>
  );
}
