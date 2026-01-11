import type { Resume } from "@/lib/schema/resume";
import PreviewRenderer from "@/components/preview/PreviewRenderer";

type ResumePreviewProps = {
  resume: Resume;
};

export default function ResumePreview({ resume }: ResumePreviewProps) {
  return <PreviewRenderer resume={resume} />;
}
