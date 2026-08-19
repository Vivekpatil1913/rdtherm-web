"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, Factory } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { facility } from "@/data/manufacturing";

const ICON_MAP = {
  "cs-shop": Factory,
  "ss-shop": Building2,
} as const;

type Bay = (typeof facility)[number];

/** "50,000 sq ft" → { figure: "50,000", unit: "sq ft" }; non-numeric values pass through. */
function splitValue(value: string) {
  const match = value.match(/^([\d.,]+)\s*(.*)$/);
  if (!match) return { figure: value, unit: "", numeric: false };
  return { figure: match[1], unit: match[2], numeric: true };
}

export function Facility() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-start"
        >
          <motion.div variants={fadeUp} className="lg:col-span-12">
            <SectionTag>Our Shop Floor</SectionTag>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="lg:col-span-7 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[40px] lg:text-[48px] font-bold"
          >
            Two dedicated bays.{" "}
            <span className="text-[var(--color-accent)]">One quality system.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-10 flex flex-col gap-6 lg:mt-12 lg:gap-8">
          {facility.map((bay, i) => (
            <BayRow key={bay.id} bay={bay} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function BayRow({ bay, index }: { bay: Bay; index: number }) {
  const Icon = ICON_MAP[bay.id as keyof typeof ICON_MAP] ?? Factory;
  const [imageOk, setImageOk] = useState(true);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, delay: 0.05, ease: EASE_OUT_SOFT }}
      className="group grid items-stretch gap-6 rounded-[24px] border border-[var(--color-line)] bg-white p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--color-accent)]/35 hover:shadow-[0_36px_80px_-42px_rgba(17,17,17,0.35)] sm:p-5 lg:grid-cols-12 lg:gap-10 lg:p-5"
    >
      {/* Copy — title with the description below it */}
      <div className="lg:col-span-7 lg:py-2 lg:pl-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-[13px] bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white">
            <Icon className="size-5.5" strokeWidth={1.8} />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Bay {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-4 text-[26px] font-bold leading-[1.12] tracking-[-0.02em] sm:text-[31px] lg:text-[34px]">
          {bay.title}
        </h3>
        <p className="mt-3 max-w-[520px] text-[15px] leading-[1.6] text-[var(--color-ink-soft)] sm:text-[16px]">
          {bay.body}
        </p>

        {/* Spec figures */}
        <div className="mt-5 flex flex-wrap items-stretch gap-x-8 gap-y-4">
          {bay.bays.map((spec) => {
            const { figure, unit, numeric } = splitValue(spec.value);
            return (
              <div key={spec.label} className="border-l-2 border-[var(--color-accent)] pl-4">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {spec.label}
                </p>
                <p className="mt-1.5 flex items-baseline gap-1.5 leading-none">
                  <span
                    className={
                      numeric
                        ? "text-[26px] font-bold tracking-[-0.02em] tabular-nums sm:text-[30px]"
                        : "text-[20px] font-bold tracking-[-0.01em] sm:text-[22px]"
                    }
                  >
                    {figure}
                  </span>
                  {unit ? (
                    <span className="text-[13px] font-medium text-[var(--color-muted)]">{unit}</span>
                  ) : null}
                </p>
              </div>
            );
          })}
        </div>

        {/* Cranes */}
        <div className="mt-5 border-t border-[var(--color-line)] pt-4">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Lifting capacity
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {bay.cranes.map((crane) => (
              <span
                key={crane}
                className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-[var(--color-bg-soft)] px-3 py-1 text-[12px] font-medium tabular-nums text-[var(--color-ink-soft)]"
              >
                {crane}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Image — sits to the right on desktop, below the copy on mobile */}
      {/* Image column — fixed, compact frame that centres against the copy */}
      <div className="lg:col-span-5 lg:self-center">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-[var(--color-bg-dark)] ring-1 ring-black/[0.06] sm:aspect-[16/9] lg:aspect-auto lg:h-[272px]">
          {/* Branded fallback, visible until a photo is dropped in */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-[radial-gradient(circle,rgba(233,78,27,0.4),transparent_70%)]"
          />
          <span className="absolute inset-0 flex items-center justify-center text-white/25">
            <Icon className="size-16" strokeWidth={1.2} />
          </span>

          {bay.image && imageOk ? (
            <Image
              src={bay.image}
              alt={`${bay.title} — R&D Therm shop floor`}
              fill
              sizes="(max-width: 1024px) 100vw, 620px"
              className="relative object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              onError={() => setImageOk(false)}
            />
          ) : null}

          {/* Tint + label overlay so the photo always carries the brand */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/75 via-[#0d0d0d]/10 to-transparent"
          />
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden />
            {bay.title}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
