"use client";

import ResumePreview from "@/components/ResumePreview";
import { useProfile } from "@/components/ProfileProvider";

export default function PreviewPage() {
  const { resume, profileId } = useProfile();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Live Preview</h1>
        <p className="text-base-content/70">
          A quick look at how your resume and portfolio will render for{" "}
          <span className="font-medium">{profileId}</span>.
        </p>
      </div>

      <ResumePreview resume={resume} />
    </div>
  );
}
