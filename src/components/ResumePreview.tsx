import type { Resume } from "@/lib/schema/resume";
import SectionCard from "@/components/SectionCard";

type ResumePreviewProps = {
  resume: Resume;
};

export default function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="space-y-6">
      <section className="card bg-base-100 shadow">
        <div className="card-body gap-4">
          <div>
            <h2 className="text-3xl font-semibold">{resume.basics.name}</h2>
            <p className="text-base-content/70">{resume.basics.title}</p>
            <p className="text-base-content/60">{resume.basics.location}</p>
          </div>
          <p className="text-base-content/80">{resume.basics.summary}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a className="link link-primary" href={`mailto:${resume.basics.email}`}>
              {resume.basics.email}
            </a>
            <a className="link link-primary" href={resume.links.website}>
              {resume.links.website}
            </a>
            <a className="link link-primary" href={resume.links.github}>
              GitHub
            </a>
            <a className="link link-primary" href={resume.links.linkedin}>
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <SectionCard title="Skills">
        <div className="flex flex-wrap gap-2">
          {resume.skills.map((skill) => (
            <span key={skill} className="badge badge-outline">
              {skill}
            </span>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Experience">
        <div className="space-y-6">
          {resume.experience.map((role, index) => (
            <div key={`${role.company}-${index}`} className="space-y-2">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{role.role}</h3>
                  <p className="text-base-content/70">{role.company}</p>
                </div>
                <span className="text-sm text-base-content/60">
                  {role.startDate} — {role.endDate}
                </span>
              </div>
              <ul className="list-disc space-y-1 pl-4 text-base-content/80">
                {role.bullets.map((bullet, bulletIndex) => (
                  <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Projects">
        <div className="grid gap-4 md:grid-cols-2">
          {resume.projects.map((project, index) => (
            <div key={`${project.name}-${index}`} className="card bg-base-200">
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
                <div className="card-actions">
                  <a className="link link-primary" href={project.repoUrl}>
                    Repository
                  </a>
                  <a className="link link-primary" href={project.liveUrl}>
                    Live demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Education">
        <div className="space-y-3">
          {resume.education.map((item, index) => (
            <div key={`${item.school}-${index}`}>
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{item.school}</h3>
                  <p className="text-base-content/70">{item.program}</p>
                </div>
                <span className="text-sm text-base-content/60">
                  {item.startDate} — {item.endDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="alert alert-info">
        <span>
          Template: {resume.ui.template} • Theme: {resume.ui.theme}
        </span>
      </div>
    </div>
  );
}
