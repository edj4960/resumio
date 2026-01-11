type SkillsEditorProps = {
  skills: string[];
  onChange: (next: string[]) => void;
};

export default function SkillsEditor({ skills, onChange }: SkillsEditorProps) {
  const updateSkill = (index: number, value: string) => {
    const next = [...skills];
    next[index] = value;
    onChange(next);
  };

  const addSkill = () => {
    onChange([...skills, ""]);
  };

  const removeSkill = (index: number) => {
    const next = skills.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {skills.length === 0 ? (
        <p className="text-sm text-base-content/70">No skills yet.</p>
      ) : null}
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={`${skill}-${index}`} className="flex flex-col gap-2 sm:flex-row">
            <input
              className="input input-bordered flex-1"
              value={skill}
              onChange={(event) => updateSkill(index, event.target.value)}
              placeholder="Skill"
            />
            <button
              className="btn btn-ghost btn-sm"
              type="button"
              onClick={() => removeSkill(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button className="btn btn-outline btn-sm" type="button" onClick={addSkill}>
        Add skill
      </button>
    </div>
  );
}
