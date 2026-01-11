const app = document.getElementById("app");
const printButton = document.getElementById("print-btn");
const target = document.body?.dataset.target || "portfolio";
const resumePath = document.body?.dataset.resumePath || "./resume.json";

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

const migrateResumeData = (raw) => {
  if (raw?.ui?.portfolio && raw?.ui?.resume) {
    return raw;
  }
  const legacyTheme = raw?.ui?.theme || "night";
  const legacyTemplate = raw?.ui?.template || "modern";
  return {
    ...raw,
    ui: {
      portfolio: {
        theme: legacyTheme,
        template: legacyTemplate,
        options: {},
      },
      resume: {
        theme: "light",
        template: "classic",
        options: {
          density: "comfortable",
          showIcons: false,
        },
      },
    },
  };
};

const setTheme = (theme) => {
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
};

const renderResumeClassic = (resume, density = "comfortable") => {
  const tight = density === "compact";
  return `
    <div class="preview-card rounded-xl border border-base-300 bg-base-100 p-8">
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

      <section class="${tight ? "mt-4" : "mt-6"} space-y-2">
        <p class="section-label text-xs uppercase text-base-content/60">Summary</p>
        <p class="text-base-content/80">${escapeHtml(resume.basics.summary)}</p>
      </section>

      <section class="${tight ? "mt-4" : "mt-6"} space-y-3">
        <p class="section-label text-xs uppercase text-base-content/60">Experience</p>
        ${
          resume.experience.length === 0
            ? `<p class="text-sm text-base-content/60">Add experience entries to highlight your roles and impact.</p>`
            : `<div class="${tight ? "space-y-4" : "space-y-5"}">
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
              </div>`
        }
      </section>

      <section class="${tight ? "mt-4" : "mt-6"} space-y-3">
        <p class="section-label text-xs uppercase text-base-content/60">Projects</p>
        ${
          resume.projects.length === 0
            ? `<p class="text-sm text-base-content/60">Add projects to showcase your portfolio work.</p>`
            : `<div class="${tight ? "space-y-3" : "space-y-4"}">
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
                            (tech) =>
                              `<span class="badge badge-outline">${escapeHtml(tech)}</span>`,
                          )
                          .join("")}
                      </div>
                    </div>
                  `,
                  )
                  .join("")}
              </div>`
        }
      </section>

      <section class="${tight ? "mt-4" : "mt-6"} space-y-3">
        <p class="section-label text-xs uppercase text-base-content/60">Skills</p>
        ${
          resume.skills.length === 0
            ? `<p class="text-sm text-base-content/60">List your core skills to round out the resume.</p>`
            : `<div class="flex flex-wrap gap-2">
                ${resume.skills
                  .map(
                    (skill) => `<span class="badge badge-outline">${escapeHtml(skill)}</span>`,
                  )
                  .join("")}
              </div>`
        }
      </section>

      <section class="${tight ? "mt-4" : "mt-6"} space-y-3">
        <p class="section-label text-xs uppercase text-base-content/60">Education</p>
        ${
          resume.education.length === 0
            ? `<p class="text-sm text-base-content/60">Add education entries for degrees or certifications.</p>`
            : `<div class="space-y-3">
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
              </div>`
        }
      </section>
    </div>
  `;
};

const renderResumeATS = (resume) => {
  return `
    <div class="preview-card rounded-md border border-base-300 bg-base-100 p-6">
      <header class="space-y-1 border-b border-base-200 pb-3">
        <h1 class="text-2xl font-semibold">${escapeHtml(resume.basics.name)}</h1>
        <p class="text-sm text-base-content/70">${escapeHtml(resume.basics.title)}</p>
        <p class="text-xs text-base-content/60">${escapeHtml(
          resume.basics.location,
        )} | ${escapeHtml(resume.basics.email)} | ${escapeHtml(resume.links.website)}</p>
      </header>
      <section class="mt-4">
        <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Summary</h2>
        <p class="mt-2 text-sm text-base-content/80">${escapeHtml(resume.basics.summary)}</p>
      </section>
      <section class="mt-4">
        <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Experience</h2>
        ${
          resume.experience.length === 0
            ? `<p class="mt-2 text-sm text-base-content/60">Add experience entries to highlight your roles and impact.</p>`
            : `<div class="mt-3 space-y-4">
                ${resume.experience
                  .map(
                    (role) => `
                    <div class="print-avoid-break">
                      <div class="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p class="text-sm font-semibold">${escapeHtml(role.role)}</p>
                          <p class="text-sm text-base-content/70">${escapeHtml(role.company)}</p>
                        </div>
                        <span class="text-xs text-base-content/60">${escapeHtml(
                          role.startDate,
                        )} - ${escapeHtml(role.endDate)}</span>
                      </div>
                      <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-base-content/80">
                        ${role.bullets
                          .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
                          .join("")}
                      </ul>
                    </div>
                  `,
                  )
                  .join("")}
              </div>`
        }
      </section>
      <section class="mt-4">
        <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Projects</h2>
        ${
          resume.projects.length === 0
            ? `<p class="mt-2 text-sm text-base-content/60">Add projects to showcase your portfolio work.</p>`
            : `<div class="mt-3 space-y-3">
                ${resume.projects
                  .map(
                    (project) => `
                    <div class="print-avoid-break">
                      <p class="text-sm font-semibold">${escapeHtml(project.name)}</p>
                      <p class="text-sm text-base-content/70">${escapeHtml(
                        project.description,
                      )}</p>
                      <p class="text-xs text-base-content/60">Stack: ${escapeHtml(
                        project.stack.join(", "),
                      )}</p>
                    </div>
                  `,
                  )
                  .join("")}
              </div>`
        }
      </section>
      <section class="mt-4">
        <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Skills</h2>
        ${
          resume.skills.length === 0
            ? `<p class="mt-2 text-sm text-base-content/60">List your core skills to round out the resume.</p>`
            : `<p class="mt-2 text-sm text-base-content/80">${escapeHtml(
                resume.skills.join(", "),
              )}</p>`
        }
      </section>
      <section class="mt-4">
        <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">Education</h2>
        ${
          resume.education.length === 0
            ? `<p class="mt-2 text-sm text-base-content/60">Add education entries for degrees or certifications.</p>`
            : `<div class="mt-3 space-y-2">
                ${resume.education
                  .map(
                    (item) => `
                    <div class="print-avoid-break">
                      <p class="text-sm font-semibold">${escapeHtml(item.school)}</p>
                      <p class="text-sm text-base-content/70">${escapeHtml(item.program)}</p>
                      <p class="text-xs text-base-content/60">${escapeHtml(
                        item.startDate,
                      )} - ${escapeHtml(item.endDate)}</p>
                    </div>
                  `,
                  )
                  .join("")}
              </div>`
        }
      </section>
    </div>
  `;
};

const renderPortfolioSidebar = (resume) => {
  return `
    <div class="grid gap-6 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)]">
      <aside class="preview-card rounded-3xl bg-base-100 p-6">
        <div class="space-y-3">
          <div>
            <p class="section-label text-xs uppercase text-base-content/50">Profile</p>
            <h1 class="text-3xl font-semibold">${escapeHtml(resume.basics.name)}</h1>
            <p class="text-base-content/70">${escapeHtml(resume.basics.title)}</p>
            <p class="text-sm text-base-content/60">${escapeHtml(resume.basics.location)}</p>
          </div>
          <div class="space-y-2 text-sm">
            <p class="section-label text-xs uppercase text-base-content/50">Contact</p>
            <p>${escapeHtml(resume.basics.email)}</p>
            <p>${escapeHtml(resume.links.website)}</p>
            <p>${escapeHtml(resume.links.github)}</p>
            <p>${escapeHtml(resume.links.linkedin)}</p>
          </div>
          <div>
            <p class="section-label text-xs uppercase text-base-content/50">Skills</p>
            ${
              resume.skills.length === 0
                ? `<p class="mt-2 text-sm text-base-content/60">Add skills to highlight your toolkit.</p>`
                : `<div class="mt-2 flex flex-wrap gap-2">
                    ${resume.skills
                      .map(
                        (skill) =>
                          `<span class="badge badge-outline">${escapeHtml(skill)}</span>`,
                      )
                      .join("")}
                  </div>`
            }
          </div>
        </div>
      </aside>
      <section class="space-y-6">
        <div class="preview-card card bg-base-100">
          <div class="card-body">
            <p class="section-label text-xs uppercase text-base-content/50">About</p>
            <p class="text-base-content/80">${escapeHtml(resume.basics.summary)}</p>
          </div>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Projects</h2>
            <span class="badge badge-outline">Portfolio</span>
          </div>
          ${
            resume.projects.length === 0
              ? `<div class="card bg-base-100 preview-card">
                  <div class="card-body">
                    <p class="text-sm text-base-content/60">Add projects to share your portfolio highlights.</p>
                  </div>
                </div>`
              : `<div class="grid gap-4">
                  ${resume.projects
                    .map(
                      (project) => `
                      <div class="card bg-base-100 preview-card print-avoid-break">
                        <div class="card-body gap-3">
                          <div class="flex items-center justify-between">
                            <h3 class="card-title text-lg">${escapeHtml(project.name)}</h3>
                            <span class="badge badge-ghost">Featured</span>
                          </div>
                          <p class="text-sm text-base-content/70">${escapeHtml(
                            project.description,
                          )}</p>
                          <div class="flex flex-wrap gap-2">
                            ${project.stack
                              .map(
                                (tech) =>
                                  `<span class="badge badge-outline">${escapeHtml(tech)}</span>`,
                              )
                              .join("")}
                          </div>
                          <div class="text-xs text-base-content/60">
                            <span>${escapeHtml(project.repoUrl)}</span>
                          </div>
                        </div>
                      </div>
                    `,
                    )
                    .join("")}
                </div>`
          }
        </div>
        <div class="preview-card card bg-base-100">
          <div class="card-body">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">Experience</h2>
              <span class="badge badge-outline">Resume</span>
            </div>
            ${
              resume.experience.length === 0
                ? `<p class="text-sm text-base-content/60">Add experience entries to share your impact.</p>`
                : `<div class="mt-4 space-y-4">
                    ${resume.experience
                      .map(
                        (role) => `
                        <div class="print-avoid-break">
                          <div class="flex items-start justify-between gap-3">
                            <div>
                              <p class="font-semibold">${escapeHtml(role.role)}</p>
                              <p class="text-sm text-base-content/70">${escapeHtml(
                                role.company,
                              )}</p>
                            </div>
                            <span class="text-xs text-base-content/60">${escapeHtml(
                              role.startDate,
                            )} - ${escapeHtml(role.endDate)}</span>
                          </div>
                          <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-base-content/80">
                            ${role.bullets
                              .map((bullet) => `<li>${escapeHtml(bullet)}</li>`)
                              .join("")}
                          </ul>
                        </div>
                      `,
                      )
                      .join("")}
                  </div>`
            }
          </div>
        </div>
      </section>
    </div>
  `;
};

const renderPortfolioModern = (resume) => {
  return `
    <div class="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <aside class="preview-card space-y-6 rounded-2xl bg-base-100 p-6">
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
          ${
            resume.skills.length === 0
              ? `<p class="mt-3 text-sm text-base-content/60">Add your strongest skills to stand out.</p>`
              : `<div class="mt-3 flex flex-wrap gap-2">
                  ${resume.skills
                    .map(
                      (skill) =>
                        `<span class="badge badge-outline">${escapeHtml(skill)}</span>`,
                    )
                    .join("")}
                </div>`
          }
        </div>
        <div>
          <p class="section-label text-xs uppercase text-base-content/50">Education</p>
          ${
            resume.education.length === 0
              ? `<p class="mt-3 text-sm text-base-content/60">Add education details or certifications here.</p>`
              : `<div class="mt-3 space-y-2 text-sm">
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
                </div>`
          }
        </div>
      </aside>

      <section class="space-y-6">
        <div class="preview-card card bg-base-100">
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
          ${
            resume.projects.length === 0
              ? `<div class="card bg-base-100 preview-card">
                  <div class="card-body">
                    <p class="text-sm text-base-content/60">Add projects to showcase recent launches and experiments.</p>
                  </div>
                </div>`
              : `<div class="grid gap-4 md:grid-cols-2">
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
                </div>`
          }
        </div>

        <div class="preview-card card bg-base-100">
          <div class="card-body gap-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">Experience</h2>
              <span class="badge badge-outline">Resume</span>
            </div>
            ${
              resume.experience.length === 0
                ? `<p class="text-sm text-base-content/60">Add experience entries to share your recent roles.</p>`
                : `<div class="space-y-5">
                    ${resume.experience
                      .map(
                        (role) => `
                        <div class="space-y-2 print-avoid-break">
                          <div class="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 class="text-base font-semibold">${escapeHtml(
                                role.role,
                              )}</h3>
                              <p class="text-base-content/70">${escapeHtml(
                                role.company,
                              )}</p>
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
                  </div>`
            }
          </div>
        </div>
      </section>
    </div>
  `;
};

const renderPortfolio = (resume) => {
  const template = resume.ui?.portfolio?.template || "modern";
  if (template === "sidebar") {
    return renderPortfolioSidebar(resume);
  }
  return renderPortfolioModern(resume);
};

const renderResume = (resume) => {
  const template = resume.ui?.resume?.template || "classic";
  if (template === "ats") {
    return renderResumeATS(resume);
  }
  if (template === "compact") {
    return renderResumeClassic(resume, "compact");
  }
  return renderResumeClassic(resume, "comfortable");
};

const render = (resume) => {
  if (!app) {
    return;
  }
  app.innerHTML = target === "resume" ? renderResume(resume) : renderPortfolio(resume);
};

const loadResume = async () => {
  try {
    const response = await fetch(resumePath, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("resume.json not found");
    }
    const resume = migrateResumeData(await response.json());
    const errorMessage = validateResume(resume);
    if (errorMessage) {
      app.innerHTML = `
        <div class="alert alert-error">
          <span>${escapeHtml(errorMessage)}</span>
        </div>
      `;
      return;
    }
    const theme =
      target === "resume" ? resume.ui.resume.theme : resume.ui.portfolio.theme;
    setTheme(theme || "light");
    render(resume);
  } catch (error) {
    if (!app) {
      return;
    }
    app.innerHTML = `
      <div class="alert alert-error">
        <span>Unable to load resume.json. Upload the JSON file next to index.html.</span>
      </div>
    `;
  }
};

if (printButton && target === "resume") {
  printButton.addEventListener("click", () => window.print());
}

loadResume();
