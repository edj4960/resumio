import type { Resume } from "@/lib/schema/resume";
import ClassicTemplate from "@/components/preview/resume/ClassicTemplate";

type CompactTemplateProps = {
  resume: Resume;
};

export default function CompactTemplate({ resume }: CompactTemplateProps) {
  return <ClassicTemplate resume={resume} density="compact" />;
}
