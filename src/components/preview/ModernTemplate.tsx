import type { Resume } from "@/lib/schema/resume";

export default function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <aside className="preview-card space-y-6 rounded-2xl bg-base-100 p-6 shadow">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">{resume.basics.name}</h1>
          <p className="text-base-content/70">{resume.basics.title}</p>
          <p className="text-sm text-base-content/60">{resume.basics.location}</p>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-xs uppercase tracking-widest text-base-content/50">
              Contact
            </p>
            <div className="mt-2 space-y-1">
              <p>{resume.basics.email}</p>
              <p>{resume.links.website}</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-base-content/50">
              Links
            </p>
            <div className="mt-2 space-y-1">
              <p>{resume.links.github}</p>
              <p>{resume.links.linkedin}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-base-content/50">
            Skills
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span key={`${skill}-${index}`} className="badge badge-outline">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-base-content/50">
            Education
          </p>
          <div className="mt-3 space-y-2 text-sm">
            {resume.education.map((item, index) => (
              <div key={`${item.school}-${index}`} className="print-avoid-break">
                <p className="font-medium">{item.school}</p>
                <p className="text-base-content/70">{item.program}</p>
                <p className="text-xs text-base-content/60">
                  {item.startDate} - {item.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <section className="space-y-6">
        <div className="preview-card card bg-base-100 shadow">
          <div className="card-body gap-4">
            <p className="text-xs uppercase tracking-widest text-base-content/50">
              About
            </p>
            <p className="text-base-content/80">{resume.basics.summary}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Featured Projects</h2>
            <span className="badge badge-outline">Portfolio</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {resume.projects.map((project, index) => (
              <div
                key={`${project.name}-${index}`}
                className="preview-card card bg-base-100 shadow print-avoid-break"
              >
                <div className="card-body gap-3">
                  <h3 className="card-title text-lg">{project.name}</h3>
                  <p className="text-sm text-base-content/70">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, techIndex) => (
                      <span key={`${tech}-${techIndex}`} className="badge badge-ghost">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="card-actions justify-between text-sm text-base-content/70">
                    <span>{project.repoUrl}</span>
                    <span>{project.liveUrl}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="preview-card card bg-base-100 shadow">
          <div className="card-body gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Experience</h2>
              <span className="badge badge-outline">Resume</span>
            </div>
            <div className="space-y-5">
              {resume.experience.map((role, index) => (
                <div
                  key={`${role.company}-${index}`}
                  className="space-y-2 print-avoid-break"
                >
                  <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-base font-semibold">{role.role}</h3>
                      <p className="text-base-content/70">{role.company}</p>
                    </div>
                    <span className="text-sm text-base-content/60">
                      {role.startDate} - {role.endDate}
                    </span>
                  </div>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
                    {role.bullets.map((bullet, bulletIndex) => (
                      <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
