import type { Resume } from "@/lib/schema/resume";

export type BasicsErrors = {
  name?: string;
  title?: string;
};

type BasicsEditorProps = {
  basics: Resume["basics"];
  errors: BasicsErrors;
  onChange: (next: Resume["basics"]) => void;
};

export default function BasicsEditor({ basics, errors, onChange }: BasicsEditorProps) {
  const nameErrorId = errors.name ? "basics-name-error" : undefined;
  const titleErrorId = errors.title ? "basics-title-error" : undefined;

  return (
    <div className="grid gap-4">
      <label className="form-control">
        <span className="label-text">Name</span>
        <input
          id="basics-name"
          className={`input input-bordered ${errors.name ? "input-error" : ""}`}
          value={basics.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={nameErrorId}
          onChange={(event) => onChange({ ...basics, name: event.target.value })}
        />
        {errors.name ? (
          <span id={nameErrorId} className="text-sm text-error" role="alert">
            {errors.name}
          </span>
        ) : null}
      </label>
      <label className="form-control">
        <span className="label-text">Title</span>
        <input
          id="basics-title"
          className={`input input-bordered ${errors.title ? "input-error" : ""}`}
          value={basics.title}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={titleErrorId}
          onChange={(event) => onChange({ ...basics, title: event.target.value })}
        />
        {errors.title ? (
          <span id={titleErrorId} className="text-sm text-error" role="alert">
            {errors.title}
          </span>
        ) : null}
      </label>
      <label className="form-control">
        <span className="label-text">Email</span>
        <input
          className="input input-bordered"
          value={basics.email}
          onChange={(event) => onChange({ ...basics, email: event.target.value })}
        />
      </label>
      <label className="form-control">
        <span className="label-text">Location</span>
        <input
          className="input input-bordered"
          value={basics.location}
          onChange={(event) =>
            onChange({ ...basics, location: event.target.value })
          }
        />
      </label>
      <label className="form-control md:col-span-2">
        <span className="label-text">Summary</span>
        <textarea
          className="textarea textarea-bordered min-h-28"
          value={basics.summary}
          onChange={(event) =>
            onChange({ ...basics, summary: event.target.value })
          }
        />
      </label>
    </div>
  );
}
