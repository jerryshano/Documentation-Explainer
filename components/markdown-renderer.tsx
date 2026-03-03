// components/MarkdownRenderer.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <div className="prose prose-neutral max-w-none break-words bg-card min-w-0 [&_pre]:overflow-x-auto">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
