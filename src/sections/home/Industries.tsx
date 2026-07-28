"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { industries, industryDecor } from "@/data/home";
import type { ApiIndustry } from "@/lib/api-types";
import { cn } from "@/lib/cn";

/* ---------------------------------------------------------------------------
   Corner motifs — three different details lifted from a fabrication drawing.
   One shared language keeps them a set: the object in hairline ink at 18%, the
   drawing annotations (centrelines, dimensions, pointers) in accent at 40%.
   Same stroke weight throughout, matching the section's hairline rules.
--------------------------------------------------------------------------- */

const INK = { stroke: "currentColor", strokeOpacity: 0.18, strokeWidth: 0.9 } as const;
const NOTE = {
  stroke: "var(--color-accent)",
  strokeOpacity: 0.4,
  strokeWidth: 0.9,
  strokeLinecap: "round",
} as const;

// Point on a circle, angle in degrees clockwise from 3 o'clock (SVG y grows down).
const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
};

// 1 — Nozzle flange, viewed on-face. Eight bolts on the pitch circle.
const BOLT_HOLES = Array.from({ length: 8 }, (_, i) => polar(50, 50, 34, i * 45));

function FlangeMotif() {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className="size-full">
      <g {...INK}>
        <circle cx="50" cy="50" r="47" />
        <circle cx="50" cy="50" r="17" />
        {BOLT_HOLES.map((h, i) => (
          <circle key={i} cx={h.x} cy={h.y} r="3.4" />
        ))}
      </g>
      <g {...NOTE}>
        <circle cx="50" cy="50" r="34" strokeDasharray="3 5" />
        <path d="M50 4v12M50 84v12M4 50h12M84 50h12" />
      </g>
    </svg>
  );
}

// 2 — Horizontal vessel in elevation: dished heads, a nozzle, saddle supports,
// with the centreline and an overall dimension called out.
function VesselMotif() {
  return (
    <svg viewBox="0 0 120 80" fill="none" aria-hidden className="size-full">
      <g {...INK}>
        {/* Shell with 2:1 dished ends */}
        <path d="M36 20 H84 C97 20 97 56 84 56 H36 C23 56 23 20 36 20 Z" />
        {/* Head-to-shell weld seams */}
        <path d="M36 20 V56 M84 20 V56" />
        {/* Top nozzle with flange */}
        <path d="M52 20 V11 M62 20 V11 M49 11 H65" />
        {/* Saddle supports on a foundation line */}
        <path d="M40 56 L36 65 H56 L52 56 M76 56 L72 65 H92 L88 56 M30 65 H98" />
      </g>
      <g {...NOTE}>
        <path d="M8 38 H112" strokeDasharray="8 4 2 4" />
        {/* Overall-length dimension, the way it's tagged on the drawing */}
        <path d="M23 72 H97 M23 68 v8 M97 68 v8" />
      </g>
    </svg>
  );
}

// 3 — Pressure gauge: 240° scale, needle live on the dial.
const GAUGE_TICKS = Array.from({ length: 9 }, (_, i) => {
  const deg = 150 + i * 30;
  const outer = polar(50, 50, 34, deg);
  const inner = polar(50, 50, i % 2 === 0 ? 26 : 29, deg);
  return `M${outer.x.toFixed(2)} ${outer.y.toFixed(2)} L${inner.x.toFixed(2)} ${inner.y.toFixed(2)}`;
}).join("");

function GaugeMotif({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden className="size-full">
      <g {...INK}>
        <circle cx="50" cy="50" r="47" />
        <circle cx="50" cy="50" r="40" />
        <path d={GAUGE_TICKS} />
      </g>
      <motion.g
        {...NOTE}
        // Pivot on the dial centre, in viewBox units.
        style={{ transformBox: "view-box", transformOrigin: "50px 50px" }}
        initial={{ rotate: -46 }}
        animate={animate ? { rotate: [-46, 34, -12, 46, -46] } : undefined}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
      >
        <path d="M50 50 V21" strokeWidth="1.4" />
      </motion.g>
      <circle cx="50" cy="50" r="3" fill="var(--color-accent)" fillOpacity="0.4" />
    </svg>
  );
}

const MOTIFS: Record<string, (props: { animate: boolean }) => React.ReactElement> = {
  flange: FlangeMotif,
  vessel: VesselMotif,
  gauge: GaugeMotif,
};

// Idle motion applied to the whole motif. The gauge is absent on purpose: its
// needle animates inside the SVG, so the dial itself must stay put.
const IDLE_MOTION: Record<
  string,
  { animate: TargetAndTransition; transition: Transition }
> = {
  flange: {
    animate: { rotate: 360 },
    transition: { duration: 110, ease: "linear", repeat: Infinity },
  },
  vessel: {
    animate: { y: [0, -5, 0] },
    transition: { duration: 9, ease: "easeInOut", repeat: Infinity },
  },
};

export function Industries({ items = [] }: { items?: ApiIndustry[] }) {
  const [activeKey, setActiveKey] = useState(items[0]?.key ?? "");
  const reduceMotion = useReducedMotion();
  const [headStart, accent, headEnd] = industries.heading;
  if (items.length === 0) return null;
  const active = items.find((i) => i.key === activeKey) ?? items[0];

  return (
    <section className="relative bg-[var(--color-bg-soft)] pt-16 lg:pt-20 pb-24 lg:pb-32 overflow-hidden">
      {industryDecor.map((d) => {
        const Motif = MOTIFS[d.motif] ?? FlangeMotif;
        const idle = IDLE_MOTION[d.motif];
        return (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE_OUT_SOFT }}
            className={cn(
              d.className,
              "pointer-events-none select-none text-[var(--color-ink)]",
            )}
            aria-hidden
          >
            {/* Each motif idles differently — the flange turns, the vessel
                drifts, the gauge holds still and lets its needle move. */}
            <motion.div
              className="size-full"
              animate={reduceMotion ? undefined : idle?.animate}
              transition={idle?.transition}
            >
              <Motif animate={!reduceMotion} />
            </motion.div>
          </motion.div>
        );
      })}

      <Container size="wide" className="relative z-10">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionTag>{industries.eyebrow}</SectionTag>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-[920px] text-[32px] leading-[1.08] tracking-[-0.02em] sm:text-[44px] lg:text-[64px] font-bold"
          >
            {headStart}
            <span className="text-[var(--color-accent)]">{accent}</span>
            {headEnd}
          </motion.h2>
        </motion.div>

        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-10 items-start">
          <ul className="lg:col-span-5 relative flex flex-col">
            <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-[var(--color-line)]" />
            {items.map((item) => {
              const isActive = item.key === activeKey;
              return (
                <li key={item.key} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveKey(item.key)}
                    className={cn(
                      "group flex w-full cursor-pointer items-center justify-between gap-6 py-3 lg:py-3 pl-6 lg:pl-8 pr-2 text-left text-[19px] leading-[1.3] transition-colors duration-300 sm:text-[22px] lg:text-[25px]",
                      isActive
                        ? "font-semibold text-[var(--color-ink)]"
                        : "font-medium text-[var(--color-ink)]/40 hover:text-[var(--color-ink)]/70",
                    )}
                  >
                    <span>{item.label}</span>
                  </button>
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute left-0 w-[3px] bg-[var(--color-accent)]"
                    initial={false}
                    animate={{
                      top: isActive ? "10%" : "50%",
                      height: isActive ? "80%" : "0%",
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
                  />
                </li>
              );
            })}
          </ul>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 rounded-[18px] border border-[var(--color-line)] bg-white p-5 sm:p-6 lg:p-7"
              >
                <div className="relative overflow-hidden rounded-[14px] aspect-[5/4] bg-[var(--color-bg-soft)]">
                  {active.cover ? (
                    <Image
                      src={active.cover}
                      alt={active.label}
                      fill
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col gap-4 justify-center">
                  <h3 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[1.15] tracking-[-0.01em]">
                    {active.label}
                  </h3>
                  <p className="text-[15px] sm:text-[18px] leading-[1.6] text-[var(--color-ink-soft)]">
                    {active.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
