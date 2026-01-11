const app = document.getElementById("app");
const printButton = document.getElementById("print-btn");

const setTheme = (theme) => {
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

const validateResume = (resume) => {
  if (!resume || typeof resume !== "object") {
    return "resume.json is not a valid object.";
  }
  if (!resume.basics || typeof resume.basics !== "object") {
    return "Missing basics section.";
  }
  if (!isNonEmptyString(resume.basics.name)) {
    return "Name is required.";
  }
  if (!isNonEmptyString(resume.basics.title)) {
    return "Title is required.";
  }
  if (!resume.links || typeof resume.links !== "object") {
    return "Missing links section.";
  }
  if (!Array.isArray(resume.skills)) {
    return "Skills must be an array.";
  }
  if (!Array.isArray(resume.experience)) {
    return "Experience must be an array.";
  }
  if (!Array.isArray(resume.projects)) {
    return "Projects must be an array.";
  }
  if (!Array.isArray(resume.education)) {
    return "Education must be an array.";
  }
  return null;
};

const renderClassic = (resume) => {
  return `
    <div class="rounded-xl border border-base-300 bg-base-100 p-8 preview-card">
      <header class="space-y-2 border-b border-base-200 pb-4">
        <h1 class="text-3xl font-semibold">${escapeHtml(resume.basics.name)}</h1>
        <p class="text-base-content/70">${escapeHtml(resume.basics.title)}</p>
        <div class="flex flex-wrap gap-3 text-sm text-base-content/70">
          <span>${escapeHtml(resume.basics.location)}</span>
          <span>•</span>
          <span>${escapeHtml(resume.basics.email)}</span>
          <span>•</span>
          <span>${escapeHtml(resume.links.website)}</span>
        </div>
      </header>

      <section class="mt-6 space-y-2">
        <p class="section-label text-xs uppercase text-base-content/60">Summary</p>
        <p class="text-base-content/80">${escapeHtml(resume.basics.summary)}</p>
      </section>

      <section class="mt-6 space-y-3">
        <p class="section-label text-xs uppercase text-base-content/60">Experience</p>
        <div class="space-y-5">
          ${resume.experience
            .map(
              (role) => `
              <div class="space-y-2 print-avoid-break">
                <div class="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 class="text-lg font-semibold">${escapeHtml(role.role)}</h2>
                    <p class="text-base-content/70">${escapeHtml(role.company)}</p>
                  </div>
                  <span class="text-sm text-base-content/60">${escapeHtml(
                    role.startDate,
                  )} - ${escapeHtml(role.endDate)}</span>
                </div>
                <ul class="list-disc space-y-1 pl-5 text-base-content/80">
                  ${role.bullets
                    .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
                    .join("")}
                </ul>
              </div>
            `,
            )
            .join("")}
        </div>
      </section>

      <section class="mt-6 space-y-3">
        <p class="section-label text-xs uppercase text-base-content/60">Projects</p>
        <div class="space-y-4">
          ${resume.projects
            .map(
              (project) => `
              <div class="space-y-1 print-avoid-break">
                <h3 class="text-base font-semibold">${escapeHtml(project.name)}</h3>
                <p class="text-sm text-base-content/70">${escapeHtml(
                  project.description,
                )}</p>
                <div class="flex flex-wrap gap-2 text-xs text-base-content/60">
                  ${project.stack
                    .map(
                      (tech) => `<span class="badge badge-outline">${escapeHtml(tech)}</span>`,
                    )
                    .join("")}
                </div>
              </div>
            `,
            )
            .join("")}
        </div>
      </section>

      <section class="mt-6 space-y-3">
        <p class="section-label text-xs uppercase text-base-content/60">Skills</p>
        <div class="flex flex-wrap gap-2">
          ${resume.skills
            .map((skill) => `<span class="badge badge-outline">${escapeHtml(skill)}</span>`)
            .join("")}
        </div>
      </section>

      <section class="mt-6 space-y-3">
        <p class="section-label text-xs uppercase text-base-content/60">Education</p>
        <div class="space-y-3">
          ${resume.education
            .map(
              (item) => `
              <div class="print-avoid-break">
                <div class="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 class="text-base font-semibold">${escapeHtml(item.school)}</h3>
                    <p class="text-sm text-base-content/70">${escapeHtml(item.program)}</p>
                  </div>
                  <span class="text-sm text-base-content/60">${escapeHtml(
                    item.startDate,
                  )} - ${escapeHtml(item.endDate)}</span>
                </div>
              </div>
            `,
            )
            .join("")}
        </div>
      </section>
    </div>
  `;
};

const renderModern = (resume) => {
  return `
    <div class="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <aside class="space-y-6 rounded-2xl bg-base-100 p-6 preview-card">
        <div class="space-y-2">
          <h1 class="text-3xl font-semibold">${escapeHtml(resume.basics.name)}</h1>
          <p class="text-base-content/70">${escapeHtml(resume.basics.title)}</p>
          <p class="text-sm text-base-content/60">${escapeHtml(resume.basics.location)}</p>
        </div>
        <div class="space-y-3 text-sm">
          <div>
            <p class="section-label text-xs uppercase text-base-content/50">Contact</p>
            <div class="mt-2 space-y-1">
              <p>${escapeHtml(resume.basics.email)}</p>
              <p>${escapeHtml(resume.links.website)}</p>
            </div>
          </div>
          <div>
            <p class="section-label text-xs uppercase text-base-content/50">Links</p>
            <div class="mt-2 space-y-1">
              <p>${escapeHtml(resume.links.github)}</p>
              <p>${escapeHtml(resume.links.linkedin)}</p>
            </div>
          </div>
        </div>
        <div>
          <p class="section-label text-xs uppercase text-base-content/50">Skills</p>
          <div class="mt-3 flex flex-wrap gap-2">
            ${resume.skills
              .map((skill) => `<span class="badge badge-outline">${escapeHtml(skill)}</span>`)
              .join("")}
          </div>
        </div>
        <div>
          <p class="section-label text-xs uppercase text-base-content/50">Education</p>
          <div class="mt-3 space-y-2 text-sm">
            ${resume.education
              .map(
                (item) => `
                <div class="print-avoid-break">
                  <p class="font-medium">${escapeHtml(item.school)}</p>
                  <p class="text-base-content/70">${escapeHtml(item.program)}</p>
                  <p class="text-xs text-base-content/60">${escapeHtml(
                    item.startDate,
                  )} - ${escapeHtml(item.endDate)}</p>
                </div>
              `,
              )
              .join("")}
          </div>
        </div>
      </aside>

      <section class="space-y-6">
        <div class="card bg-base-100 preview-card">
          <div class="card-body gap-4">
            <p class="section-label text-xs uppercase text-base-content/50">About</p>
            <p class="text-base-content/80">${escapeHtml(resume.basics.summary)}</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Featured Projects</h2>
            <span class="badge badge-outline">Portfolio</span>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            ${resume.projects
              .map(
                (project) => `
                <div class="card bg-base-100 preview-card print-avoid-break">
                  <div class="card-body gap-3">
                    <h3 class="card-title text-lg">${escapeHtml(project.name)}</h3>
                    <p class="text-sm text-base-content/70">${escapeHtml(
                      project.description,
                    )}</p>
                    <div class="flex flex-wrap gap-2">
                      ${project.stack
                        .map(
                          (tech) =>
                            `<span class="badge badge-ghost">${escapeHtml(tech)}</span>`,
                        )
                        .join("")}
                    </div>
                    <div class="card-actions justify-between text-sm text-base-content/70">
                      <span>${escapeHtml(project.repoUrl)}</span>
                      <span>${escapeHtml(project.liveUrl)}</span>
                    </div>
                  </div>
                </div>
              `,
              )
              .join("")}
          </div>
        </div>

        <div class="card bg-base-100 preview-card">
          <div class="card-body gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">Experience</h2>
              <span class="badge badge-outline">Resume</span>
            </div>
            <div class="space-y-5">
              ${resume.experience
                .map(
                  (role) => `
                  <div class="space-y-2 print-avoid-break">
                    <div class="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 class="text-base font-semibold">${escapeHtml(role.role)}</h3>
                        <p class="text-base-content/70">${escapeHtml(role.company)}</p>
                      </div>
                      <span class="text-sm text-base-content/60">${escapeHtml(
                        role.startDate,
                      )} - ${escapeHtml(role.endDate)}</span>
                    </div>
                    <ul class="list-disc space-y-1 pl-5 text-sm text-base-content/80">
                      ${role.bullets
                        .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
                        .join("")}
                    </ul>
                  </div>
                `,
                )
                .join("")}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
};

const render = (resume) => {
  const template = resume.ui?.template || "classic";
  app.innerHTML = template === "modern" ? renderModern(resume) : renderClassic(resume);
};

const loadResume = async () => {
  try {
    const response = await fetch("./resume.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("resume.json not found");
    }
    const resume = await response.json();
    const errorMessage = validateResume(resume);
    if (errorMessage) {
      app.innerHTML = `
        <div class="alert alert-error">
          <span>${escapeHtml(errorMessage)}</span>
        </div>
      `;
      return;
    }
    setTheme(resume.ui?.theme || "corporate");
    render(resume);
  } catch (error) {
    app.innerHTML = `
      <div class="alert alert-error">
        <span>Unable to load resume.json. Upload the JSON file next to index.html.</span>
      </div>
    `;
  }
};

if (printButton) {
  printButton.addEventListener("click", () => window.print());
}

loadResume();
