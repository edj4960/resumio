"use client";

import { useMemo, useState } from "react";
import ResumePreview from "@/components/ResumePreview";
import { useProfile } from "@/components/ProfileProvider";
import { daisyThemes } from "@/lib/ui/themes";

export default function PreviewPage() {
  const { resume, profileId, updateResume, saveActiveProfile } = useProfile();
  const [target, setTarget] = useState<"portfolio" | "resume">("portfolio");

  const updateUi = (
    nextTarget: "portfolio" | "resume",
    updates: Partial<typeof resume.ui.portfolio> | Partial<typeof resume.ui.resume>,
  ) => {
    const nextResume = {
      ...resume,
      ui: {
        ...resume.ui,
        [nextTarget]: { ...resume.ui[nextTarget], ...updates },
      },
    };
    updateResume(nextResume);
    void saveActiveProfile(nextResume);
  };

  const activeTheme = useMemo(() => {
    return target === "resume" ? resume.ui.resume.theme : resume.ui.portfolio.theme;
  }, [resume.ui, target]);

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
        <div className="flex flex-wrap gap-2 print-hidden">
          <button
            className={`btn ${target === "portfolio" ? "btn-primary" : "btn-outline"}`}
            type="button"
            onClick={() => setTarget("portfolio")}
          >
            Portfolio Preview
          </button>
          <button
            className={`btn ${target === "resume" ? "btn-primary" : "btn-outline"}`}
            type="button"
            onClick={() => setTarget("resume")}
          >
            Resume Preview
          </button>
        </div>
        <div className="card bg-base-100 shadow-sm print-hidden">
          <div className="card-body grid gap-4 md:grid-cols-2">
            <label className="form-control">
              <span className="label-text">
                {target === "resume" ? "Resume template" : "Portfolio template"}
              </span>
              {target === "resume" ? (
                <select
                  className="select select-bordered"
                  value={resume.ui.resume.template}
                  onChange={(event) =>
                    updateUi("resume", {
                      template: event.target.value as "classic" | "compact" | "ats",
                    })
                  }
                >
                  <option value="classic">Classic</option>
                  <option value="compact">Compact</option>
                  <option value="ats">ATS</option>
                </select>
              ) : (
                <select
                  className="select select-bordered"
                  value={resume.ui.portfolio.template}
                  onChange={(event) =>
                    updateUi("portfolio", {
                      template: event.target.value as
                        | "sidebar"
                        | "landing"
                        | "grid"
                        | "modern"
                        | "classic",
                    })
                  }
                >
                  <option value="sidebar">Sidebar</option>
                  <option value="modern">Modern</option>
                  <option value="landing">Landing</option>
                  <option value="grid">Grid</option>
                  <option value="classic">Classic</option>
                </select>
              )}
            </label>
            <label className="form-control">
              <span className="label-text">
                {target === "resume" ? "Resume theme" : "Portfolio theme"}
              </span>
              <select
                className="select select-bordered"
                value={target === "resume" ? resume.ui.resume.theme : resume.ui.portfolio.theme}
                onChange={(event) => updateUi(target, { theme: event.target.value })}
              >
                {daisyThemes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-end">
              {target === "resume" ? (
                <button
                  className="btn btn-outline w-full md:w-auto"
                  type="button"
                  onClick={() => window.print()}
                >
                  Export PDF
                </button>
              ) : (
                <span className="text-xs text-base-content/60">
                  Switch to Resume preview to export PDF.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div data-theme={activeTheme} className="rounded-3xl bg-base-200 p-4">
        <ResumePreview resume={resume} target={target} />
      </div>
    </div>
  );
}
