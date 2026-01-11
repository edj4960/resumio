"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SectionCard from "@/components/SectionCard";
import { useProfile } from "@/components/ProfileProvider";
import { resumeSchema } from "@/lib/schema/resume";

export default function ExportPage() {
  const { resume, profileId, saveActiveProfile, updateResume } = useProfile();
  const router = useRouter();
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const downloadJson = () => {
    const payload = JSON.stringify(resume, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${profileId}-resume.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setUploading(true);
    setError("");
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const parsed = resumeSchema.safeParse(json);
      if (!parsed.success) {
        setError("Invalid resume.json. Please upload a valid schema.");
        return;
      }
      updateResume(parsed.data);
      await saveActiveProfile(parsed.data);
      router.push("/edit");
    } catch (err) {
      setError("Upload failed. Ensure the file is valid JSON.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

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
          <button className="btn btn-outline" type="button" onClick={downloadJson}>
            Download resume.json
          </button>
          <label className="btn btn-ghost" htmlFor="resume-upload">
            {uploading ? "Uploading..." : "Upload resume.json"}
          </label>
          <input
            id="resume-upload"
            className="hidden"
            type="file"
            accept="application/json"
            onChange={handleUpload}
          />
        </div>
        {error ? (
          <div className="alert alert-error mt-4">
            <span>{error}</span>
          </div>
        ) : null}
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
