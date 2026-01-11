import Link from "next/link";
import { defaultResume } from "@/lib/schema/resume";
import SectionCard from "@/components/SectionCard";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="card bg-base-100 shadow-xl">
        <div className="card-body gap-6">
          <div className="badge badge-outline">Open Source • No DB</div>
          <h1 className="text-4xl font-semibold leading-tight">
            Build a polished resume and portfolio in minutes.
          </h1>
          <p className="text-lg text-base-content/70">
            A clean, offline-first builder powered by Next.js and DaisyUI.
            Design once, preview live, and export when you are ready.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link className="btn btn-primary" href="/edit">
              Start Editing
            </Link>
            <Link className="btn btn-outline" href="/preview">
              Preview
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <SectionCard
          title="Local-first editing"
          description="Draft your resume without accounts, servers, or lock-in."
        />
        <SectionCard
          title="Live preview"
          description="See your resume and portfolio as you edit with clean layouts."
        />
        <SectionCard
          title="Export ready"
          description="Download a bundle or JSON and host it anywhere."
        />
      </section>

      <section className="alert alert-info">
        <span>
          Default profile loaded for {defaultResume.basics.name}. Jump into the
          editor to customize every section.
        </span>
      </section>
    </div>
  );
}
