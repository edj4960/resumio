import type { Resume } from "@/lib/schema/resume";
import ClassicTemplate from "@/components/preview/ClassicTemplate";
import ModernTemplate from "@/components/preview/ModernTemplate";

type PreviewRendererProps = {
  resume: Resume;
};

export default function PreviewRenderer({ resume }: PreviewRendererProps) {
  if (resume.ui.template === "classic") {
    return <ClassicTemplate resume={resume} />;
  }

  return <ModernTemplate resume={resume} />;
}
