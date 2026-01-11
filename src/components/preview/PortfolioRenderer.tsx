import type { Resume } from "@/lib/schema/resume";
import ModernTemplate from "@/components/preview/portfolio/ModernTemplate";
import SidebarTemplate from "@/components/preview/portfolio/SidebarTemplate";

const FALLBACK_TEMPLATE = "modern";

type PortfolioRendererProps = {
  resume: Resume;
};

export default function PortfolioRenderer({ resume }: PortfolioRendererProps) {
  const template = resume.ui.portfolio.template || FALLBACK_TEMPLATE;

  switch (template) {
    case "sidebar":
      return <SidebarTemplate resume={resume} />;
    case "classic":
    case "landing":
    case "grid":
    case "modern":
    default:
      return <ModernTemplate resume={resume} />;
  }
}
