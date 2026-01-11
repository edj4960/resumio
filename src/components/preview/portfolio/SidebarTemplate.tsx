import type { Resume } from "@/lib/schema/resume";

type SidebarTemplateProps = {
  resume: Resume;
};

export default function SidebarTemplate({ resume }: SidebarTemplateProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)]">
      <aside className="preview-card rounded-3xl bg-base-100 p-6 shadow">
        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-base-content/50">
              Profile
            </p>
            <h1 className="text-3xl font-semibold">{resume.basics.name}</h1>
            <p className="text-base-content/70">{resume.basics.title}</p>
            <p className="text-sm text-base-content/60">{resume.basics.location}</p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-xs uppercase tracking-widest text-base-content/50">
              Contact
            </p>
            <p>{resume.basics.email}</p>
            <p>{resume.links.website}</p>
            <p>{resume.links.github}</p>
            <p>{resume.links.linkedin}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-base-content/50">
              Skills
            </p>
            {resume.skills.length === 0 ? (
              <p className="mt-2 text-sm text-base-content/60">
                Add skills to highlight your toolkit.
              </p>
            ) : (
              <div className="mt-2 flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <span key={`${skill}-${index}`} className="badge badge-outline">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>

      <section className="space-y-6">
        <div className="preview-card card bg-base-100 shadow">
          <div className="card-body">
            <p className="text-xs uppercase tracking-widest text-base-content/50">
              About
            </p>
            <p className="text-base-content/80">{resume.basics.summary}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Projects</h2>
          </div>
          {resume.projects.length === 0 ? (
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <p className="text-sm text-base-content/60">
                  Add projects to share your portfolio highlights.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {resume.projects.map((project, index) => (
                <div
                  key={`${project.name}-${index}`}
                  className="preview-card card bg-base-100 shadow print-avoid-break"
                >
                  <div className="card-body gap-3">
                    <div className="flex items-center justify-between">
                      <h3 className="card-title text-lg">{project.name}</h3>
                      <span className="badge badge-ghost">Featured</span>
                    </div>
                    <p className="text-sm text-base-content/70">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, techIndex) => (
                        <span key={`${tech}-${techIndex}`} className="badge badge-outline">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-base-content/60">
                      <span>{project.repoUrl}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="preview-card card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Experience</h2>
            </div>
            {resume.experience.length === 0 ? (
              <p className="text-sm text-base-content/60">
                Add experience entries to share your impact.
              </p>
            ) : (
              <div className="mt-4 space-y-4">
                {resume.experience.map((role, index) => (
                  <div key={`${role.company}-${index}`} className="print-avoid-break">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{role.role}</p>
                        <p className="text-sm text-base-content/70">{role.company}</p>
                      </div>
                      <span className="text-xs text-base-content/60">
                        {role.startDate} - {role.endDate}
                      </span>
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-base-content/80">
                      {role.bullets.map((bullet, bulletIndex) => (
                        <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
