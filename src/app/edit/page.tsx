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

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
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

          <SectionCard title="Theme" description="Template and visual style.">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="form-control">
                <span className="label-text">Template</span>
                <select
                  className="select select-bordered"
                  value={localResume.ui.template}
                  onChange={(event) =>
                    updateSection((resumeState) => ({
                      ...resumeState,
                      ui: {
                        ...resumeState.ui,
                        template: event.target.value as "classic" | "modern",
                      },
                    }))
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
                  value={localResume.ui.theme}
                  onChange={(event) =>
                    updateSection((resumeState) => ({
                      ...resumeState,
                      ui: { ...resumeState.ui, theme: event.target.value },
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
          </SectionCard>
        </div>

        <div className="space-y-4 lg:sticky lg:top-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Live preview</h2>
            <span className="badge badge-outline">Embedded</span>
          </div>
          <ResumePreview resume={localResume} />
        </div>
      </div>
    </div>
  );
}
