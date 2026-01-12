"use client";

import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import SectionCard from "@/components/SectionCard";
import ResumePreview from "@/components/ResumePreview";
import { useProfile } from "@/components/ProfileProvider";
import BasicsEditor, { type BasicsErrors } from "@/components/editor/BasicsEditor";
import LinksEditor, { type LinksErrors } from "@/components/editor/LinksEditor";
import SkillsEditor from "@/components/editor/SkillsEditor";
import ExperienceEditor from "@/components/editor/ExperienceEditor";
import ProjectsEditor from "@/components/editor/ProjectsEditor";
import EducationEditor from "@/components/editor/EducationEditor";
import { defaultResume, type Resume } from "@/lib/schema/resume";
import { daisyThemes } from "@/lib/ui/themes";

type ResumeAction =
  | { type: "set"; payload: Resume }
  | { type: "update"; updater: (resume: Resume) => Resume };

const resumeReducer = (state: Resume, action: ResumeAction) => {
  switch (action.type) {
    case "set":
      return action.payload;
    case "update":
      return action.updater(state);
    default:
      return state;
  }
};

type ValidationErrors = {
  basics: BasicsErrors;
  links: LinksErrors;
};

const isValidUrl = (value: string) => {
  if (!value.trim()) {
    return true;
  }
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const validateResume = (resume: Resume): ValidationErrors => {
  const basics: BasicsErrors = {};
  const links: LinksErrors = {};

  if (!resume.basics.name.trim()) {
    basics.name = "Name is required.";
  }
  if (!resume.basics.title.trim()) {
    basics.title = "Title is required.";
  }

  if (!isValidUrl(resume.links.github)) {
    links.github = "Enter a valid URL.";
  }
  if (!isValidUrl(resume.links.linkedin)) {
    links.linkedin = "Enter a valid URL.";
  }
  if (!isValidUrl(resume.links.website)) {
    links.website = "Enter a valid URL.";
  }

  return { basics, links };
};

export default function EditPage() {
  const {
    updateResume,
    saveActiveProfile,
    saving,
    lastSavedAt,
    resetProfile,
    deleteProfile,
    profileId,
    isValid,
    isReady,
    resume
  } = useProfile();
  const [localResume, dispatch] = useReducer(resumeReducer, resume);
  const [resetting, setResetting] = useState(false);
  const [target, setTarget] = useState<"portfolio" | "resume">("portfolio");
  const initialLoad = useRef(true);
  const lastProfileId = useRef(profileId);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (lastProfileId.current !== profileId) {
      lastProfileId.current = profileId;
      dispatch({ type: "set", payload: resume });
    }
  }, [isReady, profileId, resume]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    updateResume(localResume);
  }, [isReady, localResume, updateResume]);

  const lastSavedLabel = useMemo(() => {
    if (!lastSavedAt) {
      return "Never";
    }
    return new Date(lastSavedAt).toLocaleTimeString();
  }, [lastSavedAt]);

  const validation = useMemo(() => validateResume(localResume), [localResume]);
  const activeTheme = useMemo(() => {
    return target === "resume"
      ? localResume.ui.resume.theme
      : localResume.ui.portfolio.theme;
  }, [localResume.ui, target]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    const handle = window.setTimeout(() => {
      void saveActiveProfile(localResume);
    }, 500);
    return () => window.clearTimeout(handle);
  }, [isReady, localResume, saveActiveProfile]);

  const updateSection = (updater: (resume: Resume) => Resume) => {
    dispatch({ type: "update", updater });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">Edit Resume</h1>
        <p className="text-base-content/70">
          Update the fields below. Changes sync with the embedded preview and
          autosave to IndexedDB.
        </p>
      </div>

      {!isValid ? (
        <div className="alert alert-warning">
          <span>
            The stored profile data was invalid. We reset it to the default
            resume.
          </span>
        </div>
      ) : null}

      <div className="card bg-base-100 shadow">
        <div className="card-body flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Profile controls</h2>
            <p className="text-sm text-base-content/70">
              Active profile: <span className="font-medium">{profileId}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="btn btn-outline btn-sm"
              type="button"
              onClick={async () => {
                setResetting(true);
                await resetProfile();
                dispatch({ type: "set", payload: defaultResume });
                setResetting(false);
              }}
            >
              {resetting ? "Resetting..." : "Reset to default"}
            </button>
            <button
              className="btn btn-outline btn-sm"
              type="button"
              disabled={profileId === "default"}
              onClick={async () => {
                if (profileId === "default") {
                  return;
                }
                await deleteProfile(profileId);
              }}
            >
              Delete profile
            </button>
            {profileId === "default" ? (
              <span className="text-xs text-base-content/60">
                Default profile cannot be deleted.
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="alert alert-info">
        <span>
          {saving ? "Saving..." : "Saved"} • Last saved: {lastSavedLabel}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)]">
        <div className="space-y-8">
          <SectionCard title="Basics" description="Core identity and summary.">
            <BasicsEditor
              basics={localResume.basics}
              errors={validation.basics}
              onChange={(next) =>
                updateSection((resumeState) => ({
                  ...resumeState,
                  basics: next,
                }))
              }
            />
          </SectionCard>

          <SectionCard title="Links" description="Public profiles and website.">
            <LinksEditor
              links={localResume.links}
              errors={validation.links}
              onChange={(next) =>
                updateSection((resumeState) => ({
                  ...resumeState,
                  links: next,
                }))
              }
            />
          </SectionCard>

          <SectionCard title="Skills" description="Skills you want to highlight.">
            <SkillsEditor
              skills={localResume.skills}
              onChange={(next) =>
                updateSection((resumeState) => ({
                  ...resumeState,
                  skills: next,
                }))
              }
            />
          </SectionCard>

          <SectionCard title="Experience" description="Roles and impact.">
            <ExperienceEditor
              experience={localResume.experience}
              onChange={(next) =>
                updateSection((resumeState) => ({
                  ...resumeState,
                  experience: next,
                }))
              }
            />
          </SectionCard>

          <SectionCard title="Projects" description="Case studies and launches.">
            <ProjectsEditor
              projects={localResume.projects}
              onChange={(next) =>
                updateSection((resumeState) => ({
                  ...resumeState,
                  projects: next,
                }))
              }
            />
          </SectionCard>

          <SectionCard title="Education" description="Programs and degrees.">
            <EducationEditor
              education={localResume.education}
              onChange={(next) =>
                updateSection((resumeState) => ({
                  ...resumeState,
                  education: next,
                }))
              }
            />
          </SectionCard>

        </div>

        <div className="space-y-4">
          <div className="space-y-4 lg:sticky lg:top-6">
            <SectionCard title="Design" description="Portfolio and resume styling.">
              {target === "portfolio" ? (
                <div className="mt-3 space-y-3">
                  <div className="flex flex-wrap items-end gap-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className={`btn ${target === "portfolio" ? "btn-primary" : "btn-outline"}`}
                        type="button"
                        onClick={() => setTarget("portfolio")}
                      >
                        Portfolio
                      </button>
                      <button
                        className={`btn ${target === "resume" ? "btn-primary" : "btn-outline"}`}
                        type="button"
                        onClick={() => setTarget("resume")}
                      >
                        Resume
                      </button>
                    </div>
                    <label className="form-control min-w-[170px] flex-1">
                      <span className="label-text">Portfolio template</span>
                      <select
                        className="select select-bordered"
                        value={localResume.ui.portfolio.template}
                        onChange={(event) =>
                          updateSection((resumeState) => ({
                            ...resumeState,
                            ui: {
                              ...resumeState.ui,
                              portfolio: {
                                ...resumeState.ui.portfolio,
                                template: event.target.value as
                                  | "sidebar"
                                  | "landing"
                                  | "grid"
                                  | "modern"
                                  | "classic",
                              },
                            },
                          }))
                        }
                      >
                        <option value="sidebar">Sidebar</option>
                        <option value="modern">Modern</option>
                        <option value="landing">Landing</option>
                        <option value="grid">Grid</option>
                        <option value="classic">Classic</option>
                      </select>
                    </label>
                    <label className="form-control min-w-[170px] flex-1">
                      <span className="label-text">Portfolio theme</span>
                      <select
                        className="select select-bordered"
                        value={localResume.ui.portfolio.theme}
                        onChange={(event) =>
                          updateSection((resumeState) => ({
                            ...resumeState,
                            ui: {
                              ...resumeState.ui,
                              portfolio: {
                                ...resumeState.ui.portfolio,
                                theme: event.target.value,
                              },
                            },
                          }))
                        }
                      >
                        {daisyThemes.map((theme) => (
                          <option key={theme} value={theme}>
                            {theme}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="flex flex-wrap items-end gap-2">
                    <label className="form-control min-w-[170px] flex-1">
                      <span className="label-text">Layout</span>
                      <select
                        className="select select-bordered"
                        value={localResume.ui.portfolio.options?.layout ?? "leftNav"}
                        onChange={(event) =>
                          updateSection((resumeState) => ({
                            ...resumeState,
                            ui: {
                              ...resumeState.ui,
                              portfolio: {
                                ...resumeState.ui.portfolio,
                                options: {
                                  ...resumeState.ui.portfolio.options,
                                  layout: event.target.value as
                                    | "leftNav"
                                    | "topNav"
                                    | "none",
                                },
                              },
                            },
                          }))
                        }
                      >
                        <option value="leftNav">Left nav</option>
                        <option value="topNav">Top nav</option>
                        <option value="none">None</option>
                      </select>
                    </label>
                    <label className="form-control min-w-[170px] w-auto">
                      <span className="label-text">Show photo</span>
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={Boolean(localResume.ui.portfolio.options?.showPhoto)}
                        onChange={(event) =>
                          updateSection((resumeState) => ({
                            ...resumeState,
                            ui: {
                              ...resumeState.ui,
                              portfolio: {
                                ...resumeState.ui.portfolio,
                                options: {
                                  ...resumeState.ui.portfolio.options,
                                  showPhoto: event.target.checked,
                                },
                              },
                            },
                          }))
                        }
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="mt-3 space-y-3">
                  <div className="flex flex-wrap items-end gap-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        className={`btn ${target === "portfolio" ? "btn-primary" : "btn-outline"}`}
                        type="button"
                        onClick={() => setTarget("portfolio")}
                      >
                        Portfolio
                      </button>
                      <button
                        className={`btn ${target === "resume" ? "btn-primary" : "btn-outline"}`}
                        type="button"
                        onClick={() => setTarget("resume")}
                      >
                        Resume
                      </button>
                    </div>
                    <label className="form-control min-w-[170px] flex-1">
                      <span className="label-text">Resume template</span>
                      <select
                        className="select select-bordered"
                        value={localResume.ui.resume.template}
                        onChange={(event) =>
                          updateSection((resumeState) => ({
                            ...resumeState,
                            ui: {
                              ...resumeState.ui,
                              resume: {
                                ...resumeState.ui.resume,
                                template: event.target.value as
                                  | "classic"
                                  | "compact"
                                  | "ats",
                              },
                            },
                          }))
                        }
                      >
                        <option value="classic">Classic</option>
                        <option value="compact">Compact</option>
                        <option value="ats">ATS</option>
                      </select>
                    </label>
                    <label className="form-control min-w-[170px] flex-1">
                      <span className="label-text">Resume theme</span>
                      <select
                        className="select select-bordered"
                        value={localResume.ui.resume.theme}
                        onChange={(event) =>
                          updateSection((resumeState) => ({
                            ...resumeState,
                            ui: {
                              ...resumeState.ui,
                              resume: {
                                ...resumeState.ui.resume,
                                theme: event.target.value,
                              },
                            },
                          }))
                        }
                      >
                        {daisyThemes.map((theme) => (
                          <option key={theme} value={theme}>
                            {theme}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="flex flex-wrap items-end gap-2">
                    <label className="form-control min-w-[170px] flex-1">
                      <span className="label-text">Density</span>
                      <select
                        className="select select-bordered"
                        value={localResume.ui.resume.options?.density ?? "comfortable"}
                        onChange={(event) =>
                          updateSection((resumeState) => ({
                            ...resumeState,
                            ui: {
                              ...resumeState.ui,
                              resume: {
                                ...resumeState.ui.resume,
                                options: {
                                  ...resumeState.ui.resume.options,
                                  density: event.target.value as
                                    | "comfortable"
                                    | "compact",
                                },
                              },
                            },
                          }))
                        }
                      >
                        <option value="comfortable">Comfortable</option>
                        <option value="compact">Compact</option>
                      </select>
                    </label>
                    <label className="form-control min-w-[170px] w-auto">
                      <span className="label-text">Show icons</span>
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={Boolean(localResume.ui.resume.options?.showIcons)}
                        onChange={(event) =>
                          updateSection((resumeState) => ({
                            ...resumeState,
                            ui: {
                              ...resumeState.ui,
                              resume: {
                                ...resumeState.ui.resume,
                                options: {
                                  ...resumeState.ui.resume.options,
                                  showIcons: event.target.checked,
                                },
                              },
                            },
                          }))
                        }
                      />
                    </label>
                  </div>
                </div>
              )}
            </SectionCard>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Live preview</h2>
              <span className="badge badge-outline">
                {target === "resume" ? "Resume" : "Portfolio"}
              </span>
            </div>
            <div
              data-theme={activeTheme}
              className="print-preview-shell rounded-3xl bg-base-200 p-4"
            >
              <ResumePreview resume={localResume} target={target} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
