"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2, ScrollText } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { viewportOnce } from "@/animations/motion";
import { certificateDocs } from "@/data/manufacturing";

// A4 portrait — the ratio every certificate scan arrives in, so the tile frames
// the document edge to edge with no crop and no letterbox.
const SHEET = "aspect-[1/1.414]";

export function Certifications() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!certificateDocs.length) return null;

  // Only documents that actually have a scan are viewable; the rest render as
  // placeholders, so the lightbox indexes this list rather than the full one.
  const viewable = certificateDocs.filter((d) => d.image);
  const slides = viewable.map((d) => ({ src: d.image, alt: d.alt, title: d.title, description: d.issuer }));

  const openAt = (image: string) => {
    const at = viewable.findIndex((d) => d.image === image);
    if (at < 0) return;
    setIndex(at);
    setOpen(true);
  };

  return (
    <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
      <Container size="wide">
        <SectionTag>Certificates</SectionTag>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {certificateDocs.map((doc, i) => {
            const hasScan = !!doc.image;
            return (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.55, delay: 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* A card with a scan is a button (opens the lightbox); one
                    without is inert — there is nothing to enlarge. */}
                <CardShell interactive={hasScan} onOpen={() => openAt(doc.image)} title={doc.title}>
                  <span className={`relative block overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-[var(--color-bg-soft)] ${SHEET}`}>
                    {hasScan ? (
                      <Image
                        src={doc.image}
                        alt={doc.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        // Contained, never cropped — a certificate that loses
                        // its border or seal stops being evidence.
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                        <span className="inline-flex size-11 items-center justify-center rounded-[12px] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                          <ScrollText className="size-5" strokeWidth={1.7} />
                        </span>
                        <span className="text-[13px] leading-snug text-[var(--color-muted)]">
                          Certificate scan coming soon
                        </span>
                      </span>
                    )}
                  </span>

                  <span className="mt-4 flex items-start justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold leading-tight text-[var(--color-ink)]">
                        {doc.title}
                      </span>
                      <span className="mt-1 block text-[13px] leading-snug text-[var(--color-muted)]">
                        {doc.issuer}
                      </span>
                    </span>
                    {hasScan ? (
                      <Maximize2
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        strokeWidth={2}
                      />
                    ) : null}
                  </span>
                </CardShell>
              </motion.div>
            );
          })}
        </div>
      </Container>

      {viewable.length ? (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Zoom, Fullscreen]}
          zoom={{ maxZoomPixelRatio: 4 }}
          // One certificate per card click; the arrows still step through the
          // rest of the wall.
          carousel={{ finite: true }}
          styles={{ container: { backgroundColor: "rgba(12,12,12,0.94)" } }}
        />
      ) : null}
    </section>
  );
}

/** Shared card chrome — a button when there is a scan to open, else a plain box. */
function CardShell({
  interactive,
  onOpen,
  title,
  children,
}: {
  interactive: boolean;
  onOpen: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const className =
    "group block w-full rounded-[18px] border border-[var(--color-line)] bg-white p-3 text-left shadow-[0_20px_50px_-30px_rgba(0,0,0,0.18)] transition-all duration-300 lg:p-4";
  const hover =
    " hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/20";

  return interactive ? (
    <button type="button" onClick={onOpen} aria-label={`View the ${title} certificate full size`} className={className + hover}>
      {children}
    </button>
  ) : (
    <div className={className}>{children}</div>
  );
}
