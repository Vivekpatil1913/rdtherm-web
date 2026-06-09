import type { Metadata } from "next";
import { PageHero } from "@/sections/shared/PageHero";
import { ContactSection } from "@/sections/contact/ContactSection";
import { getSettings } from "@/services/content";

const TITLE = "Contact — Talk to an Engineer";
const DESCRIPTION =
  "Talk to an R&D Therm engineer about pressure vessels, reactors, heat exchangers or process skids. 24-hour response guaranteed.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "contact R&D Therm",
    "process equipment enquiry",
    "pressure vessel quote",
    "heat exchanger quote",
    "manufacturer contact Nashik",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/contact",
    type: "website",
  },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Contact R&D Therm"
        heading={
          <>
            Let&apos;s build the next piece of <span className="text-[var(--color-accent)]">your plant</span>.
          </>
        }
        description="Send us your enquiry and we'll route it to the right engineer within one business day."
      />
      <ContactSection settings={settings} />
    </>
  );
}
