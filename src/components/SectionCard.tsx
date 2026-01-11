import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function SectionCard({
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body gap-4">
        <div>
          <h2 className="card-title text-xl">{title}</h2>
          {description ? (
            <p className="text-sm text-base-content/70">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
