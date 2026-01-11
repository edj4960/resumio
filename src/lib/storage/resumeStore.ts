import type { Resume } from "@/lib/schema/resume";

const STORAGE_KEY = "resume-builder:resume";

export async function loadResume(): Promise<Resume | null> {
  void STORAGE_KEY;
  // TODO: replace with IndexedDB persistence via the idb library.
  return null;
}

export async function saveResume(_resume: Resume): Promise<void> {
  // TODO: replace with IndexedDB persistence via the idb library.
}
