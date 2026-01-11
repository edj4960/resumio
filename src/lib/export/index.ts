import type { Resume } from "@/lib/schema/resume";

export async function buildExportZip(_resume: Resume): Promise<Blob> {
  // TODO: generate a zipped portfolio bundle (HTML/CSS/assets).
  return new Blob([], { type: "application/zip" });
}

export function buildResumeJson(resume: Resume): Blob {
  const payload = JSON.stringify(resume, null, 2);
  return new Blob([payload], { type: "application/json" });
}
