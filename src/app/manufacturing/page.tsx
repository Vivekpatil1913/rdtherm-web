import type { Metadata } from "next";
import { PageHero } from "@/sections/shared/PageHero";
import { CapabilitiesStats } from "@/sections/manufacturing/CapabilitiesStats";
import { Facility } from "@/sections/manufacturing/Facility";
import { FlagshipMachine } from "@/sections/manufacturing/FlagshipMachine";
import { MachineShowcase } from "@/sections/manufacturing/MachineShowcase";
import { Materials } from "@/sections/manufacturing/Materials";
import { Strengths } from "@/sections/manufacturing/Strengths";
import { DesignSoftware } from "@/sections/manufacturing/DesignSoftware";
import { QualityMetrics } from "@/sections/manufacturing/QualityMetrics";
import { ProcessSteps } from "@/sections/manufacturing/ProcessSteps";
import { Certifications } from "@/sections/manufacturing/Certifications";
import { manufacturingHero } from "@/data/manufacturing";

const TITLE = "Manufacturing & Machinery";
const DESCRIPTION =
  "Complete shop-floor inventory: TruLaser cutting, CNC press brake, plate rolling, robotic welding, hydro-test bays, NDT lab and more — at R&D Therm's Nashik facility.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "manufacturing facility Nashik",
    "robotic welding cell",
    "plate rolling machine",
    "CNC press brake India",
    "TruLaser cutting",
    "NDT lab Nashik",
    "hydro-test bay",
    "PWHT furnace",
  ],
  alternates: { canonical: "/manufacturing" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/manufacturing",
    type: "website",
  },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default async function ManufacturingPage() {
  const [start, accent, end] = manufacturingHero.heading;
  return (
    <>
      <PageHero
        eyebrow={manufacturingHero.eyebrow}
        heading={
          <>
            {start}
            <span className="text-[var(--color-accent)]">{accent}</span>
            {end}
          </>
        }
        description={manufacturingHero.description}
      />
      <CapabilitiesStats />
      <Facility />
      <FlagshipMachine />
      <MachineShowcase />
      <Materials />
      <DesignSoftware />
      <Strengths />
      <QualityMetrics />
      <ProcessSteps />
      <Certifications />
    </>
  );
}
