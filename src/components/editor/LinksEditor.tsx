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
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <label className="form-control">
        <span className="label-text">GitHub</span>
        <input
          className={`input input-bordered ${errors.github ? "input-error" : ""}`}
          value={links.github}
          onChange={(event) => onChange({ ...links, github: event.target.value })}
        />
        {errors.github ? (
          <span className="text-sm text-error">{errors.github}</span>
        ) : null}
      </label>
      <label className="form-control">
        <span className="label-text">LinkedIn</span>
        <input
          className={`input input-bordered ${errors.linkedin ? "input-error" : ""}`}
          value={links.linkedin}
          onChange={(event) =>
            onChange({ ...links, linkedin: event.target.value })
          }
        />
        {errors.linkedin ? (
          <span className="text-sm text-error">{errors.linkedin}</span>
        ) : null}
      </label>
      <label className="form-control">
        <span className="label-text">Website</span>
        <input
          className={`input input-bordered ${errors.website ? "input-error" : ""}`}
          value={links.website}
          onChange={(event) => onChange({ ...links, website: event.target.value })}
        />
        {errors.website ? (
          <span className="text-sm text-error">{errors.website}</span>
        ) : null}
      </label>
    </div>
  );
}
