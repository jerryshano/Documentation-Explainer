import { MainWorkspace } from "@/components/main-workspace";
import ExplainPage from "./explain/page";

export default function Home() {
  return (
    <div className="min-h-screen">
      <MainWorkspace>
        <ExplainPage />
      </MainWorkspace>
    </div>
  );
}
