import type { Resume } from "@/lib/schema/resume";

export { buildExportZip } from "@/lib/export/exportZip";

export function buildResumeJson(resume: Resume): Blob {
  const payload = JSON.stringify(resume, null, 2);
  return new Blob([payload], { type: "application/json" });
}
