import type { Resume } from "@/lib/schema/resume";

type ExperienceEditorProps = {
  experience: Resume["experience"];
  onChange: (next: Resume["experience"]) => void;
};

const emptyExperience = {
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  bullets: [""],
};

export default function ExperienceEditor({
  experience,
  onChange,
}: ExperienceEditorProps) {
  const updateItem = (index: number, nextItem: Resume["experience"][number]) => {
    const next = [...experience];
    next[index] = nextItem;
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...experience, { ...emptyExperience }]);
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= experience.length) {
      return;
    }
    const next = [...experience];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    onChange(next);
  };

  const updateBullet = (itemIndex: number, bulletIndex: number, value: string) => {
    const item = experience[itemIndex];
    const bullets = [...item.bullets];
    bullets[bulletIndex] = value;
    updateItem(itemIndex, { ...item, bullets });
  };

  const addBullet = (itemIndex: number) => {
    const item = experience[itemIndex];
    updateItem(itemIndex, { ...item, bullets: [...item.bullets, ""] });
  };

  const removeBullet = (itemIndex: number, bulletIndex: number) => {
    const item = experience[itemIndex];
    const bullets = item.bullets.filter((_, i) => i !== bulletIndex);
    updateItem(itemIndex, { ...item, bullets });
  };

  return (
    <div className="space-y-6">
      {experience.length === 0 ? (
        <p className="text-sm text-base-content/70">No experience yet.</p>
      ) : null}
      {experience.map((role, index) => (
        <div key={`${role.company}-${index}`} className="space-y-3 rounded-lg border border-base-300 p-4">
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
              disabled={index === experience.length - 1}
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
          <div className="grid gap-4">
            <label className="form-control">
              <span className="label-text">Company</span>
              <input
                className="input input-bordered"
                value={role.company}
                onChange={(event) =>
                  updateItem(index, { ...role, company: event.target.value })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">Role</span>
              <input
                className="input input-bordered"
                value={role.role}
                onChange={(event) =>
                  updateItem(index, { ...role, role: event.target.value })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">Start Date</span>
              <input
                className="input input-bordered"
                value={role.startDate}
                onChange={(event) =>
                  updateItem(index, { ...role, startDate: event.target.value })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">End Date</span>
              <input
                className="input input-bordered"
                value={role.endDate}
                onChange={(event) =>
                  updateItem(index, { ...role, endDate: event.target.value })
                }
              />
            </label>
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Highlights</span>
            {role.bullets.map((bullet, bulletIndex) => (
              <div key={`${bullet}-${bulletIndex}`} className="flex flex-col gap-2 sm:flex-row">
                <input
                  className="input input-bordered flex-1"
                  value={bullet}
                  onChange={(event) =>
                    updateBullet(index, bulletIndex, event.target.value)
                  }
                  placeholder="Achievement"
                />
                <button
                  className="btn btn-ghost btn-sm"
                  type="button"
                  onClick={() => removeBullet(index, bulletIndex)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline btn-sm"
              type="button"
              onClick={() => addBullet(index)}
            >
              Add bullet
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-outline btn-sm" type="button" onClick={addItem}>
        Add experience
      </button>
    </div>
  );
}
