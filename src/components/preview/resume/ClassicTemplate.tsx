import type { Resume } from "@/lib/schema/resume";

type ClassicTemplateProps = {
  resume: Resume;
  density?: "comfortable" | "compact";
};

const sectionTitleClass = "text-xs uppercase tracking-[0.2em] text-base-content/60";

export default function ClassicTemplate({ resume, density = "comfortable" }: ClassicTemplateProps) {
  const tight = density === "compact";

  return (
    <div className="preview-card rounded-xl border border-base-300 bg-base-100 p-8 shadow-sm">
      <header className="space-y-2 border-b border-base-200 pb-4">
        <h1 className="text-3xl font-semibold">{resume.basics.name}</h1>
        <p className="text-base-content/70">{resume.basics.title}</p>
        <div className="flex flex-wrap gap-3 text-sm text-base-content/70">
          <span>{resume.basics.location}</span>
          <span>•</span>
          <span>{resume.basics.email}</span>
          <span>•</span>
          <span>{resume.links.website}</span>
        </div>
      </header>

      <section className={tight ? "mt-4 space-y-2" : "mt-6 space-y-2"}>
        <p className={sectionTitleClass}>Summary</p>
        <p className="text-base-content/80">{resume.basics.summary}</p>
      </section>

      <section className={tight ? "mt-4 space-y-3" : "mt-6 space-y-3"}>
        <p className={sectionTitleClass}>Experience</p>
        {resume.experience.length === 0 ? (
          <p className="text-sm text-base-content/60">
            Add experience entries to highlight your roles and impact.
          </p>
        ) : (
          <div className={tight ? "space-y-4" : "space-y-5"}>
            {resume.experience.map((role, index) => (
              <div
                key={`${role.company}-${index}`}
                className="space-y-2 print-avoid-break"
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{role.role}</h2>
                    <p className="text-base-content/70">{role.company}</p>
                  </div>
                  <span className="text-sm text-base-content/60">
                    {role.startDate} - {role.endDate}
                  </span>
                </div>
                <ul className="list-disc space-y-1 pl-5 text-base-content/80">
                  {role.bullets.map((bullet, bulletIndex) => (
                    <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={tight ? "mt-4 space-y-3" : "mt-6 space-y-3"}>
        <p className={sectionTitleClass}>Projects</p>
        {resume.projects.length === 0 ? (
          <p className="text-sm text-base-content/60">
            Add projects to showcase your portfolio work.
          </p>
        ) : (
          <div className={tight ? "space-y-3" : "space-y-4"}>
            {resume.projects.map((project, index) => (
              <div
                key={`${project.name}-${index}`}
                className="space-y-1 print-avoid-break"
              >
                <h3 className="text-base font-semibold">{project.name}</h3>
                <p className="text-sm text-base-content/70">{project.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-base-content/60">
                  {project.stack.map((tech, techIndex) => (
                    <span key={`${tech}-${techIndex}`} className="badge badge-outline">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={tight ? "mt-4 space-y-3" : "mt-6 space-y-3"}>
        <p className={sectionTitleClass}>Skills</p>
        {resume.skills.length === 0 ? (
          <p className="text-sm text-base-content/60">
            List your core skills to round out the resume.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span key={`${skill}-${index}`} className="badge badge-outline">
                {skill}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className={tight ? "mt-4 space-y-3" : "mt-6 space-y-3"}>
        <p className={sectionTitleClass}>Education</p>
        {resume.education.length === 0 ? (
          <p className="text-sm text-base-content/60">
            Add education entries for degrees or certifications.
          </p>
        ) : (
          <div className="space-y-3">
            {resume.education.map((item, index) => (
              <div key={`${item.school}-${index}`} className="print-avoid-break">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-base font-semibold">{item.school}</h3>
                    <p className="text-sm text-base-content/70">{item.program}</p>
                  </div>
                  <span className="text-sm text-base-content/60">
                    {item.startDate} - {item.endDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
