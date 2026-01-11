import type { Resume } from "@/lib/schema/resume";

type ATSTemplateProps = {
  resume: Resume;
};

export default function ATSTemplate({ resume }: ATSTemplateProps) {
  return (
    <div className="resume-root resume-surface preview-card rounded-md border border-base-300 bg-base-100 p-6 shadow-sm">
      <header className="space-y-1 border-b border-base-200 pb-3">
        <h1 className="resume-accent text-2xl font-semibold">
          {resume.basics.name}
        </h1>
        <p className="text-sm text-base-content/70">{resume.basics.title}</p>
        <p className="text-xs text-base-content/60">
          {resume.basics.location} | {resume.basics.email} | {resume.links.website}
        </p>
      </header>

      <section className="mt-4">
        <h2 className="resume-accent text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
          Summary
        </h2>
        <p className="mt-2 text-sm text-base-content/80">{resume.basics.summary}</p>
      </section>

      <section className="mt-4">
        <h2 className="resume-accent text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
          Experience
        </h2>
        {resume.experience.length === 0 ? (
          <p className="mt-2 text-sm text-base-content/60">
            Add experience entries to highlight your roles and impact.
          </p>
        ) : (
          <div className="mt-3 space-y-4">
            {resume.experience.map((role, index) => (
              <div key={`${role.company}-${index}`} className="print-avoid-break">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold">{role.role}</p>
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
      </section>

      <section className="mt-4">
        <h2 className="resume-accent text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
          Projects
        </h2>
        {resume.projects.length === 0 ? (
          <p className="mt-2 text-sm text-base-content/60">
            Add projects to showcase your portfolio work.
          </p>
        ) : (
          <div className="mt-3 space-y-3">
            {resume.projects.map((project, index) => (
              <div key={`${project.name}-${index}`} className="print-avoid-break">
                <p className="text-sm font-semibold">{project.name}</p>
                <p className="text-sm text-base-content/70">{project.description}</p>
                <p className="text-xs text-base-content/60">
                  Stack: {project.stack.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-4">
        <h2 className="resume-accent text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
          Skills
        </h2>
        {resume.skills.length === 0 ? (
          <p className="mt-2 text-sm text-base-content/60">
            List your core skills to round out the resume.
          </p>
        ) : (
          <p className="mt-2 text-sm text-base-content/80">
            {resume.skills.join(", ")}
          </p>
        )}
      </section>

      <section className="mt-4">
        <h2 className="resume-accent text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
          Education
        </h2>
        {resume.education.length === 0 ? (
          <p className="mt-2 text-sm text-base-content/60">
            Add education entries for degrees or certifications.
          </p>
        ) : (
          <div className="mt-3 space-y-2">
            {resume.education.map((item, index) => (
              <div key={`${item.school}-${index}`} className="print-avoid-break">
                <p className="text-sm font-semibold">{item.school}</p>
                <p className="text-sm text-base-content/70">{item.program}</p>
                <p className="text-xs text-base-content/60">
                  {item.startDate} - {item.endDate}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
