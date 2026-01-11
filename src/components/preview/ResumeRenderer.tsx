import type { Resume } from "@/lib/schema/resume";
import ClassicTemplate from "@/components/preview/resume/ClassicTemplate";
import CompactTemplate from "@/components/preview/resume/CompactTemplate";
import ATSTemplate from "@/components/preview/resume/ATSTemplate";

type ResumeRendererProps = {
  resume: Resume;
};

export default function ResumeRenderer({ resume }: ResumeRendererProps) {
  const density = resume.ui.resume.options?.density ?? "comfortable";

  switch (resume.ui.resume.template) {
    case "compact":
      return <CompactTemplate resume={resume} />;
    case "ats":
      return <ATSTemplate resume={resume} />;
    case "classic":
    default:
      return <ClassicTemplate resume={resume} density={density} />;
  }
}
