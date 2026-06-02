"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeUp, viewportOnce } from "@/animations/motion";
import { trustedLogos } from "@/data/home";

export function TrustedBy() {
  // Duplicate the list so the marquee loops seamlessly
  const marqueeLogos = [...trustedLogos, ...trustedLogos];

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

        <div
          className="marquee-track flex w-max items-center gap-4 lg:gap-5 px-4 lg:px-5"
          aria-label="Companies that trust R&D Therm"
        >
          {marqueeLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="marquee-item group/logo flex h-24 lg:h-28 w-[200px] sm:w-[220px] lg:w-[240px] shrink-0 items-center justify-center gap-2 rounded-[14px] bg-[var(--color-bg-soft)] px-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:ring-1 hover:ring-[var(--color-line)]"
            >
              {logo.glyph ? (
                <span className="text-[22px] lg:text-[26px] leading-none text-[var(--color-ink)]">
                  {logo.glyph}
                </span>
              ) : null}
              <span className="text-[18px] lg:text-[22px] font-semibold tracking-tight text-[var(--color-ink)]">
                {logo.name}
              </span>
            </div>
          ))}
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
        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
