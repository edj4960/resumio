import type { Resume } from "@/lib/schema/resume";

type EducationEditorProps = {
  education: Resume["education"];
  onChange: (next: Resume["education"]) => void;
};

const emptyEducation = {
  school: "",
  program: "",
  startDate: "",
  endDate: "",
};

export default function EducationEditor({ education, onChange }: EducationEditorProps) {
  const updateItem = (index: number, nextItem: Resume["education"][number]) => {
    const next = [...education];
    next[index] = nextItem;
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...education, { ...emptyEducation }]);
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= education.length) {
      return;
    }
    const next = [...education];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    onChange(next);
  };

  return (
    <div className="space-y-6">
      {education.length === 0 ? (
        <p className="text-sm text-base-content/70">No education yet.</p>
      ) : null}
      {education.map((item, index) => (
        <div key={`${item.school}-${index}`} className="space-y-3 rounded-lg border border-base-300 p-4">
          <div className="flex flex-wrap gap-2">
            <button
              className="btn btn-ghost btn-sm"
              type="button"
              onClick={() => moveItem(index, -1)}
              disabled={index === 0}
            >
              Move up
            </button>
            <button
              className="btn btn-ghost btn-sm"
              type="button"
              onClick={() => moveItem(index, 1)}
              disabled={index === education.length - 1}
            >
              Move down
            </button>
            <button
              className="btn btn-ghost btn-sm"
              type="button"
              onClick={() => removeItem(index)}
            >
              Remove
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="form-control">
              <span className="label-text">School</span>
              <input
                className="input input-bordered"
                value={item.school}
                onChange={(event) =>
                  updateItem(index, { ...item, school: event.target.value })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">Program</span>
              <input
                className="input input-bordered"
                value={item.program}
                onChange={(event) =>
                  updateItem(index, { ...item, program: event.target.value })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">Start Date</span>
              <input
                className="input input-bordered"
                value={item.startDate}
                onChange={(event) =>
                  updateItem(index, { ...item, startDate: event.target.value })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">End Date</span>
              <input
                className="input input-bordered"
                value={item.endDate}
                onChange={(event) =>
                  updateItem(index, { ...item, endDate: event.target.value })
                }
              />
            </label>
          </div>
        </div>
      ))}
      <button className="btn btn-outline btn-sm" type="button" onClick={addItem}>
        Add education
      </button>
    </div>
  );
}
