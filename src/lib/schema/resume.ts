import { z } from "zod";

export const resumeSchema = z.object({
  basics: z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    email: z.string().email(),
    location: z.string().min(1),
    summary: z.string().min(1),
  }),
  links: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    website: z.string().url(),
  }),
  skills: z.array(z.string().min(1)),
  experience: z.array(
    z.object({
      company: z.string().min(1),
      role: z.string().min(1),
      startDate: z.string().min(1),
      endDate: z.string().min(1),
      bullets: z.array(z.string().min(1)),
    }),
  ),
  projects: z.array(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      stack: z.array(z.string().min(1)),
      repoUrl: z.string().url(),
      liveUrl: z.string().url(),
    }),
  ),
  education: z.array(
    z.object({
      school: z.string().min(1),
      program: z.string().min(1),
      startDate: z.string().min(1),
      endDate: z.string().min(1),
    }),
  ),
  ui: z.object({
    theme: z.string().min(1),
    template: z.enum(["classic", "modern"]),
  }),
});

export type Resume = z.infer<typeof resumeSchema>;

export const defaultResume: Resume = resumeSchema.parse({
  basics: {
    name: "Alex Rivera",
    title: "Product Designer & Front-End Developer",
    email: "alex.rivera@example.com",
    location: "Austin, TX",
    summary:
      "Designs and ships clean, accessible interfaces for SaaS teams. Focused on design systems, rapid prototyping, and thoughtful UX writing.",
  },
  links: {
    github: "https://github.com/alexrivera",
    linkedin: "https://www.linkedin.com/in/alexrivera",
    website: "https://alexrivera.design",
  },
  skills: [
    "Product design",
    "Design systems",
    "Figma",
    "Next.js",
    "TypeScript",
    "Accessibility",
  ],
  experience: [
    {
      company: "Nimbus Labs",
      role: "Senior Product Designer",
      startDate: "2021",
      endDate: "Present",
      bullets: [
        "Led a redesign of the billing flow, improving completion rate by 24%.",
        "Partnered with engineering to ship a reusable component library.",
        "Introduced content design guidelines across the product suite.",
      ],
    },
    {
      company: "Studio Harbor",
      role: "UX Designer",
      startDate: "2018",
      endDate: "2021",
      bullets: [
        "Designed responsive onboarding for a fintech app used by 50k customers.",
        "Facilitated user research and turned insights into product briefs.",
      ],
    },
  ],
  projects: [
    {
      name: "Resume Builder",
      description: "An open-source resume and portfolio generator.",
      stack: ["Next.js", "DaisyUI", "Zod"],
      repoUrl: "https://github.com/alexrivera/resume-builder",
      liveUrl: "https://resume-builder.example.com",
    },
    {
      name: "Portfolio Kit",
      description: "A lightweight site template for designers and founders.",
      stack: ["TypeScript", "Tailwind", "Vercel"],
      repoUrl: "https://github.com/alexrivera/portfolio-kit",
      liveUrl: "https://portfolio-kit.example.com",
    },
  ],
  education: [
    {
      school: "University of Texas",
      program: "BFA, Interaction Design",
      startDate: "2014",
      endDate: "2018",
    },
  ],
  ui: {
    theme: "corporate",
    template: "modern",
  },
});
