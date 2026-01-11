"use client";

import SectionCard from "@/components/SectionCard";
import { useProfile } from "@/components/ProfileProvider";

export default function ExportPage() {
  const { resume, profileId } = useProfile();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Export</h1>
        <p className="text-base-content/70">
          Download your resume data or a ready-to-host portfolio bundle.
        </p>
      </div>

      <SectionCard
        title="Export options"
        description="Export features are stubbed, but the UI is ready."
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="btn btn-primary" type="button">
            Download bundle (.zip)
          </button>
          <button className="btn btn-outline" type="button">
            Download resume.json
          </button>
        </div>
      </SectionCard>

      <div className="alert alert-info">
        <span>
          The resume for {profileId} ({resume.basics.name}) is loaded and ready
          for export when the pipeline is implemented.
        </span>
      </div>
    </div>
  );
}
