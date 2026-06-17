import type { Metadata } from "next";
import { PageHero } from "@/sections/shared/PageHero";
import { CaseStudiesList } from "@/sections/case-studies/CaseStudiesList";
import { caseStudiesHero } from "@/data/case-studies";
import { getCaseStudies } from "@/services/content";

const TITLE = "Case Studies — Delivered Process Equipment Projects";
const DESCRIPTION =
  "Real fabrication projects from R&D Therm — distillation columns, pressure vessels, GMP-ready skids and more, delivered across chemical, pharmaceutical and process industries.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "process equipment case studies",
    "pressure vessel projects",
    "distillation column fabrication",
    "pharma process skid",
    "ASME PED IBR project delivery",
  ],
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/case-studies",
    type: "website",
  },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default async function CaseStudiesPage() {
  const [start, accent, end] = caseStudiesHero.heading;
  const items = await getCaseStudies();
  return (
    <>
      <PageHero
        eyebrow={caseStudiesHero.eyebrow}
        heading={
          <>
            {start}
            <span className="text-[var(--color-accent)]">{accent}</span>
            {end}
          </>
        }
        description={caseStudiesHero.description}
      />
      <CaseStudiesList items={items} />
    </>
  );
}
