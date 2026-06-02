"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { timeline } from "@/data/about";

// Small L-shaped engineering corner bracket
function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const map: Record<typeof position, string> = {
    tl: "top-2 left-2 border-t border-l",
    tr: "top-2 right-2 border-t border-r",
    bl: "bottom-2 left-2 border-b border-l",
    br: "bottom-2 right-2 border-b border-r",
  };
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute size-3 border-[var(--color-ink)]/25 transition-colors duration-500 group-hover:border-[var(--color-accent)] ${map[position]}`}
    />
  );
}

export function Timeline() {
  const railRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 65%", "end 60%"],
  });
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative bg-[var(--color-bg)] py-16 lg:py-20 overflow-hidden">
      {/* Subtle blueprint dots pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <Container size="wide" className="relative">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-end"
        >
          <div className="lg:col-span-7">
            <motion.div variants={fadeUp}>
              <SectionTag>Our Journey</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
            >
              From <span className="text-[var(--color-accent)]">1998 to 2026</span> — three decades of process equipment.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[460px]"
          >
            Key milestones in the R&D Therm story — from a 1,100 sq ft Nashik shop in 1998 to a global supplier of code-compliant process equipment.
          </motion.p>
        </motion.div>

        {/* Desktop alternating timeline with progress rail */}
        <div ref={railRef} className="relative mt-16 hidden lg:block">
          {/* Static dim rail */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--color-line)]"
          />
          {/* Scroll-driven accent rail */}
          <motion.span
            aria-hidden
            style={{ height: railHeight }}
            className="pointer-events-none absolute left-1/2 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent-hover)]"
          />

          <ul className="flex flex-col gap-14">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={item.year} className="relative grid grid-cols-2 gap-12">
                  {/* Dot on rail */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-7 z-10 inline-flex size-4 -translate-x-1/2 items-center justify-center rounded-full bg-[var(--color-bg)] ring-1 ring-[var(--color-line)]"
                  >
                    <span className="size-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_4px_rgba(233,78,27,0.18)]" />
                  </span>

                  {/* Connector from card edge to dot */}
                  <span
                    aria-hidden
                    className={
                      "pointer-events-none absolute top-8 h-px w-6 bg-[var(--color-line)] " +
                      (isLeft ? "right-1/2" : "left-1/2")
                    }
                  />

                  <motion.article
                    initial={{ opacity: 0, x: isLeft ? -28 : 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
                    className={
                      "group relative rounded-[14px] border border-[var(--color-line)] bg-white px-7 py-7 lg:px-8 lg:py-8 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-ink)]/30 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.18)] " +
                      (isLeft ? "text-right" : "col-start-2 text-left")
                    }
                  >
                    {/* Vertical accent bar on the rail-facing edge */}
                    <span
                      aria-hidden
                      className={
                        "absolute inset-y-6 w-[3px] rounded-full bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-hover)] to-[var(--color-bg-dark)] transition-all duration-500 group-hover:inset-y-3 " +
                        (isLeft ? "right-0" : "left-0")
                      }
                    />

                    {/* Engineering corner brackets */}
                    <CornerBracket position="tl" />
                    <CornerBracket position="tr" />
                    <CornerBracket position="bl" />
                    <CornerBracket position="br" />

                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                      Milestone
                    </p>

                    {/* Year with horizontal accent line */}
                    <div
                      className={
                        "mt-2 flex items-center gap-3 " +
                        (isLeft ? "flex-row-reverse" : "")
                      }
                    >
                      <span
                        aria-hidden
                        className="h-[3px] w-10 rounded-full bg-[var(--color-accent)] transition-all duration-500 group-hover:w-14"
                      />
                      <p className="text-[40px] lg:text-[48px] leading-none font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
                        {item.year}
                      </p>
                    </div>

                    <h3 className="mt-4 text-[20px] lg:text-[22px] font-semibold leading-tight tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[14.5px] leading-[1.6] text-[var(--color-ink-soft)]">
                      {item.body}
                    </p>
                  </motion.article>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile / tablet stacked timeline */}
        <div className="relative mt-12 lg:hidden">
          <span
            aria-hidden
            className="pointer-events-none absolute left-[15px] top-0 h-full w-px bg-[var(--color-line)]"
          />
          <ol className="flex flex-col gap-7">
            {timeline.map((item, i) => {
              return (
                <motion.li
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.55, delay: i * 0.04, ease: EASE_OUT_SOFT }}
                  className="relative pl-12"
                >
                  <span
                    aria-hidden
                    className="absolute left-[9px] top-4 inline-flex size-4 items-center justify-center rounded-full bg-[var(--color-bg)] ring-1 ring-[var(--color-line)]"
                  >
                    <span className="size-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_0_4px_rgba(233,78,27,0.18)]" />
                  </span>
                  <article className="group relative rounded-[14px] border border-[var(--color-line)] bg-white px-5 py-5 sm:px-6 sm:py-6 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.06)] transition-all duration-500 hover:border-[var(--color-ink)]/30 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.16)]">
                    {/* Vertical accent bar (left side, rail-facing) */}
                    <span
                      aria-hidden
                      className="absolute inset-y-5 left-0 w-[3px] rounded-full bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-hover)] to-[var(--color-bg-dark)]"
                    />
                    {/* Corner brackets */}
                    <CornerBracket position="tl" />
                    <CornerBracket position="tr" />
                    <CornerBracket position="bl" />
                    <CornerBracket position="br" />

                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                      Milestone
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <span aria-hidden className="h-[3px] w-8 rounded-full bg-[var(--color-accent)]" />
                      <p className="text-[30px] sm:text-[34px] leading-none font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
                        {item.year}
                      </p>
                    </div>

                    <h3 className="mt-3 text-[18px] sm:text-[20px] font-semibold leading-tight tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-ink-soft)]">
                      {item.body}
                    </p>
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
