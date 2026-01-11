"use client";

import ResumePreview from "@/components/ResumePreview";
import { useProfile } from "@/components/ProfileProvider";
import { daisyThemes } from "@/lib/ui/themes";

export default function PreviewPage() {
  const { resume, profileId, updateResume, saveActiveProfile } = useProfile();

  const updateUi = (updates: Partial<typeof resume.ui>) => {
    const nextResume = { ...resume, ui: { ...resume.ui, ...updates } };
    updateResume(nextResume);
    void saveActiveProfile(nextResume);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Live Preview</h1>
          <p className="text-base-content/70">
            A quick look at how your resume and portfolio will render for{" "}
            <span className="font-medium">{profileId}</span>.
          </p>
        </div>
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body grid gap-4 md:grid-cols-2">
            <label className="form-control">
              <span className="label-text">Template</span>
              <select
                className="select select-bordered"
                value={resume.ui.template}
                onChange={(event) =>
                  updateUi({
                    template: event.target.value as "classic" | "modern",
                  })
                }
              >
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
              </select>
            </label>
            <label className="form-control">
              <span className="label-text">Theme</span>
              <select
                className="select select-bordered"
                value={resume.ui.theme}
                onChange={(event) => updateUi({ theme: event.target.value })}
              >
                {daisyThemes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <ResumePreview resume={resume} />
    </div>
  );
}
