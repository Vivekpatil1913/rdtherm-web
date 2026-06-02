import type { Metadata } from "next";
import { PageHero } from "@/sections/shared/PageHero";
import { Benefits } from "@/sections/careers/Benefits";
import { JoinTeam } from "@/sections/careers/JoinTeam";
import { careersHero } from "@/data/careers";

const TITLE = "Careers — Build with R&D Therm";
const DESCRIPTION =
  "Engineers, welders, QC inspectors and project managers building the equipment that powers the world's process plants.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "careers R&D Therm",
    "process equipment jobs Nashik",
    "welder jobs India",
    "QC inspector jobs",
    "mechanical engineer jobs Nashik",
    "fabrication jobs",
  ],
  alternates: { canonical: "/careers" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/careers",
    type: "website",
  },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function CareersPage() {
  const [start, accent] = careersHero.heading;
  return (
    <>
      <PageHero
        eyebrow={careersHero.eyebrow}
        heading={
          <>
            {start}
            <span className="text-[var(--color-accent)]">{accent}</span>
          </>
        }
        description={careersHero.description}
      />
      <Benefits />
      <JoinTeam />
    </>
  );
}
