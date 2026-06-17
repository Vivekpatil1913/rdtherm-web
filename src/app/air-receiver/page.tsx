import type { Metadata } from "next";
import { Configurator } from "@/sections/air-receiver/Configurator";
import { TechnicalSpecs } from "@/sections/air-receiver/TechnicalSpecs";
import { CustomBuilder } from "@/sections/air-receiver/CustomBuilder";
import { Trust } from "@/sections/air-receiver/Trust";
import { Faqs } from "@/sections/air-receiver/Faqs";
import { FinalCta } from "@/sections/air-receiver/FinalCta";
import { faqs, specRows } from "@/data/air-receiver";

// Dedicated, self-contained Air Receiver page reached from its own navbar item.
// It lives at the top level (/air-receiver) so it never collides with the
// API-driven Products listing or the dynamic /products/[slug] template.

const TITLE = "Air Receiver — Configure & Quote | R&D Therm";
const DESCRIPTION =
  "ASME U-Stamp certified air receivers, 0.25–90 m³, MS / SS304 / SS316. Configure volume, pressure, material, support and trim — see it live and request a quote in minutes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/air-receiver" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/air-receiver",
    type: "website",
  },
  twitter: { title: TITLE, description: DESCRIPTION },
};

// Structured data — Product + FAQ — for SEO / rich results.
function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "Air Receiver",
        category: "Pressure Vessel / Compressed Air Equipment",
        description: DESCRIPTION,
        brand: { "@type": "Brand", name: "R&D Therm" },
        material: ["Mild Steel", "SS304", "SS316"],
        additionalProperty: specRows.map((r) => ({
          "@type": "PropertyValue",
          name: `${r.volume} air receiver`,
          value: `${r.diameter} ⌀ × ${r.height} H, ${r.pressure}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function AirReceiverPage() {
  return (
    <>
      <JsonLd />
      <Configurator />
      <TechnicalSpecs />
      <CustomBuilder />
      <Trust />
      <Faqs />
      <FinalCta />
    </>
  );
}
