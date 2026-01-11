import SectionCard from "@/components/SectionCard";
import { defaultResume } from "@/lib/schema/resume";

export default function EditPage() {
  const resume = defaultResume;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">Edit Resume</h1>
        <p className="text-base-content/70">
          Update the fields below. Changes will eventually sync with the live
          preview and export tools.
        </p>
      </div>

      <div className="alert alert-warning">
        <span>Storage is stubbed. Changes are not saved yet.</span>
      </div>

      <form className="space-y-8">
        <SectionCard title="Basics" description="Core identity and summary.">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="form-control">
              <span className="label-text">Name</span>
              <input
                className="input input-bordered"
                defaultValue={resume.basics.name}
              />
            </label>
            <label className="form-control">
              <span className="label-text">Title</span>
              <input
                className="input input-bordered"
                defaultValue={resume.basics.title}
              />
            </label>
            <label className="form-control">
              <span className="label-text">Email</span>
              <input
                className="input input-bordered"
                defaultValue={resume.basics.email}
              />
            </label>
            <label className="form-control">
              <span className="label-text">Location</span>
              <input
                className="input input-bordered"
                defaultValue={resume.basics.location}
              />
            </label>
          </div>
          <label className="form-control">
            <span className="label-text">Summary</span>
            <textarea
              className="textarea textarea-bordered min-h-32"
              defaultValue={resume.basics.summary}
            />
          </label>
        </SectionCard>

        <SectionCard title="Links" description="Public profiles and website.">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="form-control">
              <span className="label-text">GitHub</span>
              <input
                className="input input-bordered"
                defaultValue={resume.links.github}
              />
            </label>
            <label className="form-control">
              <span className="label-text">LinkedIn</span>
              <input
                className="input input-bordered"
                defaultValue={resume.links.linkedin}
              />
            </label>
            <label className="form-control">
              <span className="label-text">Website</span>
              <input
                className="input input-bordered"
                defaultValue={resume.links.website}
              />
            </label>
          </div>
        </SectionCard>

        <SectionCard title="Skills" description="Comma-separated list.">
          <textarea
            className="textarea textarea-bordered min-h-28"
            defaultValue={resume.skills.join(", ")}
          />
        </SectionCard>

        <SectionCard title="Experience" description="Recent roles and impact.">
          {resume.experience.map((role) => (
            <div key={role.company} className="grid gap-4 md:grid-cols-2">
              <label className="form-control">
                <span className="label-text">Company</span>
                <input
                  className="input input-bordered"
                  defaultValue={role.company}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Role</span>
                <input
                  className="input input-bordered"
                  defaultValue={role.role}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Start Date</span>
                <input
                  className="input input-bordered"
                  defaultValue={role.startDate}
                />
              </label>
              <label className="form-control">
                <span className="label-text">End Date</span>
                <input
                  className="input input-bordered"
                  defaultValue={role.endDate}
                />
              </label>
              <label className="form-control md:col-span-2">
                <span className="label-text">Highlights</span>
                <textarea
                  className="textarea textarea-bordered min-h-24"
                  defaultValue={role.bullets.join("\n")}
                />
              </label>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Projects" description="Side projects and launches.">
          {resume.projects.map((project) => (
            <div key={project.name} className="grid gap-4 md:grid-cols-2">
              <label className="form-control">
                <span className="label-text">Name</span>
                <input
                  className="input input-bordered"
                  defaultValue={project.name}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Stack</span>
                <input
                  className="input input-bordered"
                  defaultValue={project.stack.join(", ")}
                />
              </label>
              <label className="form-control md:col-span-2">
                <span className="label-text">Description</span>
                <textarea
                  className="textarea textarea-bordered min-h-20"
                  defaultValue={project.description}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Repo URL</span>
                <input
                  className="input input-bordered"
                  defaultValue={project.repoUrl}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Live URL</span>
                <input
                  className="input input-bordered"
                  defaultValue={project.liveUrl}
                />
              </label>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Education" description="Programs and degrees.">
          {resume.education.map((item) => (
            <div key={item.school} className="grid gap-4 md:grid-cols-2">
              <label className="form-control">
                <span className="label-text">School</span>
                <input
                  className="input input-bordered"
                  defaultValue={item.school}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Program</span>
                <input
                  className="input input-bordered"
                  defaultValue={item.program}
                />
              </label>
              <label className="form-control">
                <span className="label-text">Start Date</span>
                <input
                  className="input input-bordered"
                  defaultValue={item.startDate}
                />
              </label>
              <label className="form-control">
                <span className="label-text">End Date</span>
                <input
                  className="input input-bordered"
                  defaultValue={item.endDate}
                />
              </label>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Theme" description="Template and visual style.">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="form-control">
              <span className="label-text">Template</span>
              <select className="select select-bordered" defaultValue="modern">
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
              </select>
            </label>
            <label className="form-control">
              <span className="label-text">Theme</span>
              <input
                className="input input-bordered"
                defaultValue={resume.ui.theme}
              />
            </label>
          </div>
        </SectionCard>
      </form>
    </div>
  );
}
