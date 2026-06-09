import type { Metadata } from "next";
import { PageHero } from "@/sections/shared/PageHero";
import { CompanyIntro } from "@/sections/about/CompanyIntro";
import { VisionMission } from "@/sections/about/VisionMission";
import { Directors } from "@/sections/about/Directors";
import { TeamCarousel } from "@/sections/about/TeamCarousel";
import { CoreValues } from "@/sections/about/CoreValues";
import { Timeline } from "@/sections/about/Timeline";
import { MilestonesInMotion } from "@/sections/about/MilestonesInMotion";
import { aboutIntro } from "@/data/about";
import { getTeamByGroup } from "@/services/content";

const TITLE = "About — Engineering Excellence Since 1993";
const DESCRIPTION =
  "Three decades of designing and manufacturing code-compliant process equipment for global Chemical, Pharma, Agro and Energy plants.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "about R&D Therm",
    "process equipment company India",
    "ASME certified fabricator Nashik",
    "Konark Global company",
    "engineering company since 1993",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
    type: "website",
  },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default async function AboutPage() {
  const [directors, team] = await Promise.all([
    getTeamByGroup("director"),
    getTeamByGroup("team"),
  ]);
  return (
    <>
      <PageHero
        eyebrow={aboutIntro.eyebrow}
        heading={
          <>
            Engineering and Fabrication excellence in{" "}
            <span className="text-[var(--color-accent)]">three decades</span> of process industry expertise.
          </>
        }
        description="Nashik-based, ASME-certified, and trusted by global EPCs across chemical, pharma, oil & gas and energy plants."
      />
      <CompanyIntro />
      <VisionMission />
      <Directors members={directors} />
      <TeamCarousel members={team} />
      <CoreValues />
      <Timeline />
      <MilestonesInMotion />
    </>
  );
}
