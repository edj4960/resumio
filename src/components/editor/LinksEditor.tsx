import type { Resume } from "@/lib/schema/resume";

export type LinksErrors = {
  github?: string;
  linkedin?: string;
  website?: string;
};

type LinksEditorProps = {
  links: Resume["links"];
  errors: LinksErrors;
  onChange: (next: Resume["links"]) => void;
};

export default function LinksEditor({ links, errors, onChange }: LinksEditorProps) {
  const githubErrorId = errors.github ? "links-github-error" : undefined;
  const linkedinErrorId = errors.linkedin ? "links-linkedin-error" : undefined;
  const websiteErrorId = errors.website ? "links-website-error" : undefined;

  return (
    <div className="grid gap-4">
      <label className="form-control">
        <span className="label-text">GitHub</span>
        <input
          id="links-github"
          className={`input input-bordered ${errors.github ? "input-error" : ""}`}
          value={links.github}
          aria-invalid={Boolean(errors.github)}
          aria-describedby={githubErrorId}
          onChange={(event) => onChange({ ...links, github: event.target.value })}
        />
        {errors.github ? (
          <span id={githubErrorId} className="text-sm text-error" role="alert">
            {errors.github}
          </span>
        ) : null}
      </label>
      <label className="form-control">
        <span className="label-text">LinkedIn</span>
        <input
          id="links-linkedin"
          className={`input input-bordered ${errors.linkedin ? "input-error" : ""}`}
          value={links.linkedin}
          aria-invalid={Boolean(errors.linkedin)}
          aria-describedby={linkedinErrorId}
          onChange={(event) =>
            onChange({ ...links, linkedin: event.target.value })
          }
        />
        {errors.linkedin ? (
          <span id={linkedinErrorId} className="text-sm text-error" role="alert">
            {errors.linkedin}
          </span>
        ) : null}
      </label>
      <label className="form-control">
        <span className="label-text">Website</span>
        <input
          id="links-website"
          className={`input input-bordered ${errors.website ? "input-error" : ""}`}
          value={links.website}
          aria-invalid={Boolean(errors.website)}
          aria-describedby={websiteErrorId}
          onChange={(event) => onChange({ ...links, website: event.target.value })}
        />
        {errors.website ? (
          <span id={websiteErrorId} className="text-sm text-error" role="alert">
            {errors.website}
          </span>
        ) : null}
      </label>
    </div>
  );
}
