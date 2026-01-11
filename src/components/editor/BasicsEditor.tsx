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
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="form-control">
        <span className="label-text">Name</span>
        <input
          className={`input input-bordered ${errors.name ? "input-error" : ""}`}
          value={basics.name}
          onChange={(event) => onChange({ ...basics, name: event.target.value })}
        />
        {errors.name ? (
          <span className="text-sm text-error">{errors.name}</span>
        ) : null}
      </label>
      <label className="form-control">
        <span className="label-text">Title</span>
        <input
          className={`input input-bordered ${errors.title ? "input-error" : ""}`}
          value={basics.title}
          onChange={(event) => onChange({ ...basics, title: event.target.value })}
        />
        {errors.title ? (
          <span className="text-sm text-error">{errors.title}</span>
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
