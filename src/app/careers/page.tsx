import type { Metadata } from "next";
import { CareersHero } from "@/sections/careers/CareersHero";
import { Benefits } from "@/sections/careers/Benefits";
import { Openings } from "@/sections/careers/Openings";
import { JoinTeam } from "@/sections/careers/JoinTeam";
import { getCareers } from "@/services/content";

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

export default async function CareersPage() {
  const roles = await getCareers();
  return (
    <>
      <CareersHero />
      <Benefits />
      <Openings roles={roles} />
      <JoinTeam />
    </>
  );
}
