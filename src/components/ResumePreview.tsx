import type { Resume } from "@/lib/schema/resume";
import PortfolioRenderer from "@/components/preview/PortfolioRenderer";
import ResumeRenderer from "@/components/preview/ResumeRenderer";

type ResumePreviewProps = {
  resume: Resume;
  target: "portfolio" | "resume";
};

export default function ResumePreview({ resume, target }: ResumePreviewProps) {
  if (target === "resume") {
    return <ResumeRenderer resume={resume} />;
  }
  return <PortfolioRenderer resume={resume} />;
}
