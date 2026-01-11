import type { Resume } from "@/lib/schema/resume";

type ProjectsEditorProps = {
  projects: Resume["projects"];
  onChange: (next: Resume["projects"]) => void;
};

const emptyProject = {
  name: "",
  description: "",
  stack: [""],
  repoUrl: "",
  liveUrl: "",
};

export default function ProjectsEditor({ projects, onChange }: ProjectsEditorProps) {
  const updateItem = (index: number, nextItem: Resume["projects"][number]) => {
    const next = [...projects];
    next[index] = nextItem;
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const addItem = () => {
    onChange([...projects, { ...emptyProject }]);
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= projects.length) {
      return;
    }
    const next = [...projects];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    onChange(next);
  };

  const updateStack = (itemIndex: number, stackIndex: number, value: string) => {
    const item = projects[itemIndex];
    const stack = [...item.stack];
    stack[stackIndex] = value;
    updateItem(itemIndex, { ...item, stack });
  };

  const addStack = (itemIndex: number) => {
    const item = projects[itemIndex];
    updateItem(itemIndex, { ...item, stack: [...item.stack, ""] });
  };

  const removeStack = (itemIndex: number, stackIndex: number) => {
    const item = projects[itemIndex];
    const stack = item.stack.filter((_, i) => i !== stackIndex);
    updateItem(itemIndex, { ...item, stack });
  };

  return (
    <div className="space-y-6">
      {projects.length === 0 ? (
        <p className="text-sm text-base-content/70">No projects yet.</p>
      ) : null}
      {projects.map((project, index) => (
        <div key={`${project.name}-${index}`} className="space-y-3 rounded-lg border border-base-300 p-4">
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
              disabled={index === projects.length - 1}
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
              <span className="label-text">Name</span>
              <input
                className="input input-bordered"
                value={project.name}
                onChange={(event) =>
                  updateItem(index, { ...project, name: event.target.value })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">Repo URL</span>
              <input
                className="input input-bordered"
                value={project.repoUrl}
                onChange={(event) =>
                  updateItem(index, { ...project, repoUrl: event.target.value })
                }
              />
            </label>
            <label className="form-control">
              <span className="label-text">Live URL</span>
              <input
                className="input input-bordered"
                value={project.liveUrl}
                onChange={(event) =>
                  updateItem(index, { ...project, liveUrl: event.target.value })
                }
              />
            </label>
            <label className="form-control md:col-span-2">
              <span className="label-text">Description</span>
              <textarea
                className="textarea textarea-bordered min-h-20"
                value={project.description}
                onChange={(event) =>
                  updateItem(index, {
                    ...project,
                    description: event.target.value,
                  })
                }
              />
            </label>
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Stack</span>
            {project.stack.map((tag, tagIndex) => (
              <div key={`${tag}-${tagIndex}`} className="flex flex-col gap-2 sm:flex-row">
                <input
                  className="input input-bordered flex-1"
                  value={tag}
                  onChange={(event) =>
                    updateStack(index, tagIndex, event.target.value)
                  }
                />
                <button
                  className="btn btn-ghost btn-sm"
                  type="button"
                  onClick={() => removeStack(index, tagIndex)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="btn btn-outline btn-sm"
              type="button"
              onClick={() => addStack(index)}
            >
              Add stack tag
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-outline btn-sm" type="button" onClick={addItem}>
        Add project
      </button>
    </div>
  );
}
