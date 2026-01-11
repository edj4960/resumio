"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SectionCard from "@/components/SectionCard";
import { useProfile } from "@/components/ProfileProvider";

export default function EditPage() {
  const {
    resume,
    updateResume,
    saveActiveProfile,
    saving,
    lastSavedAt,
    resetProfile,
    deleteProfile,
    profileId,
    isValid,
    isReady,
  } = useProfile();
  const [resetting, setResetting] = useState(false);
  const initialLoad = useRef(true);

  const lastSavedLabel = useMemo(() => {
    if (!lastSavedAt) {
      return "Never";
    }
    return new Date(lastSavedAt).toLocaleTimeString();
  }, [lastSavedAt]);

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    const handle = window.setTimeout(() => {
      void saveActiveProfile();
    }, 500);
    return () => window.clearTimeout(handle);
  }, [isReady, resume, saveActiveProfile]);

  const handleChange = <K extends keyof typeof resume>(key: K, value: typeof resume[K]) => {
    updateResume({ ...resume, [key]: value });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">Edit Resume</h1>
        <p className="text-base-content/70">
          Update the fields below. Changes will eventually sync with the live
          preview and export tools.
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

      <form className="space-y-8">
        <SectionCard title="Basics" description="Core identity and summary.">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="form-control">
              <span className="label-text">Name</span>
              <input
                className="input input-bordered"
                value={resume.basics.name}
                onChange={(event) =>
                  handleChange("basics", {
                    ...resume.basics,
                    name: event.target.value,
                  })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">Title</span>
              <input
                className="input input-bordered"
                value={resume.basics.title}
                onChange={(event) =>
                  handleChange("basics", {
                    ...resume.basics,
                    title: event.target.value,
                  })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">Email</span>
              <input
                className="input input-bordered"
                value={resume.basics.email}
                onChange={(event) =>
                  handleChange("basics", {
                    ...resume.basics,
                    email: event.target.value,
                  })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">Location</span>
              <input
                className="input input-bordered"
                value={resume.basics.location}
                onChange={(event) =>
                  handleChange("basics", {
                    ...resume.basics,
                    location: event.target.value,
                  })
                }
              />
            </label>
          </div>
          <label className="form-control">
            <span className="label-text">Summary</span>
            <textarea
              className="textarea textarea-bordered min-h-32"
              value={resume.basics.summary}
              onChange={(event) =>
                handleChange("basics", {
                  ...resume.basics,
                  summary: event.target.value,
                })
              }
            />
          </label>
        </SectionCard>

        <SectionCard title="Links" description="Public profiles and website.">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="form-control">
              <span className="label-text">GitHub</span>
              <input
                className="input input-bordered"
                value={resume.links.github}
                onChange={(event) =>
                  handleChange("links", {
                    ...resume.links,
                    github: event.target.value,
                  })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">LinkedIn</span>
              <input
                className="input input-bordered"
                value={resume.links.linkedin}
                onChange={(event) =>
                  handleChange("links", {
                    ...resume.links,
                    linkedin: event.target.value,
                  })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">Website</span>
              <input
                className="input input-bordered"
                value={resume.links.website}
                onChange={(event) =>
                  handleChange("links", {
                    ...resume.links,
                    website: event.target.value,
                  })
                }
              />
            </label>
          </div>
        </SectionCard>

        <SectionCard title="Skills" description="Comma-separated list.">
          <textarea
            className="textarea textarea-bordered min-h-28"
            value={resume.skills.join(", ")}
            onChange={(event) =>
              handleChange(
                "skills",
                event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
          />
        </SectionCard>

        <SectionCard title="Experience" description="Recent roles and impact.">
          {resume.experience.map((role, index) => (
            <div key={`${role.company}-${index}`} className="grid gap-4 md:grid-cols-2">
              <label className="form-control">
                <span className="label-text">Company</span>
                <input
                  className="input input-bordered"
                  value={role.company}
                  onChange={(event) => {
                    const next = [...resume.experience];
                    next[index] = { ...next[index], company: event.target.value };
                    handleChange("experience", next);
                  }}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Role</span>
                <input
                  className="input input-bordered"
                  value={role.role}
                  onChange={(event) => {
                    const next = [...resume.experience];
                    next[index] = { ...next[index], role: event.target.value };
                    handleChange("experience", next);
                  }}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Start Date</span>
                <input
                  className="input input-bordered"
                  value={role.startDate}
                  onChange={(event) => {
                    const next = [...resume.experience];
                    next[index] = { ...next[index], startDate: event.target.value };
                    handleChange("experience", next);
                  }}
                />
              </label>
              <label className="form-control">
                <span className="label-text">End Date</span>
                <input
                  className="input input-bordered"
                  value={role.endDate}
                  onChange={(event) => {
                    const next = [...resume.experience];
                    next[index] = { ...next[index], endDate: event.target.value };
                    handleChange("experience", next);
                  }}
                />
              </label>
              <label className="form-control md:col-span-2">
                <span className="label-text">Highlights</span>
                <textarea
                  className="textarea textarea-bordered min-h-24"
                  value={role.bullets.join("\n")}
                  onChange={(event) => {
                    const next = [...resume.experience];
                    next[index] = {
                      ...next[index],
                      bullets: event.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    };
                    handleChange("experience", next);
                  }}
                />
              </label>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Projects" description="Side projects and launches.">
          {resume.projects.map((project, index) => (
            <div key={`${project.name}-${index}`} className="grid gap-4 md:grid-cols-2">
              <label className="form-control">
                <span className="label-text">Name</span>
                <input
                  className="input input-bordered"
                  value={project.name}
                  onChange={(event) => {
                    const next = [...resume.projects];
                    next[index] = { ...next[index], name: event.target.value };
                    handleChange("projects", next);
                  }}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Stack</span>
                <input
                  className="input input-bordered"
                  value={project.stack.join(", ")}
                  onChange={(event) => {
                    const next = [...resume.projects];
                    next[index] = {
                      ...next[index],
                      stack: event.target.value
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    };
                    handleChange("projects", next);
                  }}
                />
              </label>
              <label className="form-control md:col-span-2">
                <span className="label-text">Description</span>
                <textarea
                  className="textarea textarea-bordered min-h-20"
                  value={project.description}
                  onChange={(event) => {
                    const next = [...resume.projects];
                    next[index] = {
                      ...next[index],
                      description: event.target.value,
                    };
                    handleChange("projects", next);
                  }}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Repo URL</span>
                <input
                  className="input input-bordered"
                  value={project.repoUrl}
                  onChange={(event) => {
                    const next = [...resume.projects];
                    next[index] = {
                      ...next[index],
                      repoUrl: event.target.value,
                    };
                    handleChange("projects", next);
                  }}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Live URL</span>
                <input
                  className="input input-bordered"
                  value={project.liveUrl}
                  onChange={(event) => {
                    const next = [...resume.projects];
                    next[index] = {
                      ...next[index],
                      liveUrl: event.target.value,
                    };
                    handleChange("projects", next);
                  }}
                />
              </label>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Education" description="Programs and degrees.">
          {resume.education.map((item, index) => (
            <div key={`${item.school}-${index}`} className="grid gap-4 md:grid-cols-2">
              <label className="form-control">
                <span className="label-text">School</span>
                <input
                  className="input input-bordered"
                  value={item.school}
                  onChange={(event) => {
                    const next = [...resume.education];
                    next[index] = { ...next[index], school: event.target.value };
                    handleChange("education", next);
                  }}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Program</span>
                <input
                  className="input input-bordered"
                  value={item.program}
                  onChange={(event) => {
                    const next = [...resume.education];
                    next[index] = { ...next[index], program: event.target.value };
                    handleChange("education", next);
                  }}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Start Date</span>
                <input
                  className="input input-bordered"
                  value={item.startDate}
                  onChange={(event) => {
                    const next = [...resume.education];
                    next[index] = {
                      ...next[index],
                      startDate: event.target.value,
                    };
                    handleChange("education", next);
                  }}
                />
              </label>
              <label className="form-control">
                <span className="label-text">End Date</span>
                <input
                  className="input input-bordered"
                  value={item.endDate}
                  onChange={(event) => {
                    const next = [...resume.education];
                    next[index] = { ...next[index], endDate: event.target.value };
                    handleChange("education", next);
                  }}
                />
              </label>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Theme" description="Template and visual style.">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="form-control">
              <span className="label-text">Template</span>
              <select
                className="select select-bordered"
                value={resume.ui.template}
                onChange={(event) =>
                  handleChange("ui", {
                    ...resume.ui,
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
              <input
                className="input input-bordered"
                value={resume.ui.theme}
                onChange={(event) =>
                  handleChange("ui", {
                    ...resume.ui,
                    theme: event.target.value,
                  })
                }
              />
            </label>
          </div>
        </SectionCard>
      </form>
    </div>
  );
}
