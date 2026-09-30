"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { fadeUp, viewportOnce } from "@/animations/motion";
import type { ApiLogo } from "@/lib/api-types";

export function TrustedBy({ logos = [] }: { logos?: ApiLogo[] }) {
  if (logos.length === 0) return null;
  // Duplicate the list so the marquee loops seamlessly
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="bg-white py-14 lg:py-20">
      <Container size="wide">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center text-[28px] leading-tight tracking-[-0.01em] sm:text-[40px] lg:text-[56px] font-bold"
        >
          Companies Who{" "}
          <span className="text-[var(--color-accent)]">Trust Us</span>
        </motion.h2>
      </Container>

      <div className="marquee-wrap relative mt-10 lg:mt-14 overflow-hidden py-3">
        {/* Edge fades so logos taper into the section background instead of cutting hard */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
        />

        {/* items-start + fixed-height logo box keeps every name on the same
            baseline no matter how tall or short the logo art is. Names wrap
            onto as many lines as they need — the row is top-aligned, so a
            two-line name grows downward without shifting its neighbours. */}
        <div
          className="marquee-track flex w-max items-start gap-4 lg:gap-5 px-4 lg:px-5"
          aria-label="Companies that trust R&D Therm"
        >
          {marqueeLogos.map((logo, i) => {
            const href = logo.caseStudySlug ? `/case-studies/${logo.caseStudySlug}` : null;

            const tile = (
              <>
                <span className="relative flex h-20 lg:h-24 w-full items-center justify-center">
                  {logo.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo.imageUrl}
                      alt={logo.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-center text-[16px] lg:text-[18px] font-semibold leading-tight tracking-tight text-[var(--color-ink)]">
                      {logo.name}
                    </span>
                  )}
                  {/* Only a linked logo gets an affordance, so the marquee still
                      reads as a wall of trust marks rather than a row of buttons. */}
                  {href ? (
                    <span
                      aria-hidden
                      className="absolute -right-1 -top-1 inline-flex size-6 items-center justify-center rounded-full bg-[var(--color-accent)] text-white opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100"
                    >
                      <ArrowUpRight className="size-3.5" />
                    </span>
                  ) : null}
                </span>
                {logo.imageUrl ? (
                  <span
                    title={logo.name}
                    className={
                      "block w-full break-words text-center text-[13px] lg:text-[14px] font-semibold leading-snug tracking-tight transition-colors duration-300 " +
                      (href
                        ? "text-[var(--color-ink)] group-hover/logo:text-[var(--color-accent)]"
                        : "text-[var(--color-ink)]")
                    }
                  >
                    {logo.name}
                  </span>
                ) : null}
              </>
            );

            const className =
              "marquee-item group/logo flex w-32 lg:w-40 shrink-0 flex-col items-center gap-2 p-3 transition-transform duration-300 hover:-translate-y-1";

            // The list is duplicated to loop the marquee, so the clone is hidden
            // from assistive tech and taken out of the tab order.
            const isClone = i >= logos.length;

            return href ? (
              <Link
                key={`${logo.id}-${i}`}
                href={href}
                className={className + " rounded-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"}
                aria-label={`${logo.name} — read the case study`}
                aria-hidden={isClone || undefined}
                tabIndex={isClone ? -1 : undefined}
              >
                {tile}
              </Link>
            ) : (
              <div key={`${logo.id}-${i}`} className={className} aria-hidden={isClone || undefined}>
                {tile}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
          will-change: transform;
        }
        /* Hover pauses so a logo can be clicked; focus-within does the same
           for a keyboard user tabbing through the linked ones. */
        .marquee-wrap:hover .marquee-track,
        .marquee-wrap:focus-within .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
