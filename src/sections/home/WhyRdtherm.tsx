"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Target,
  PencilRuler,
  Globe,
  Handshake,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";
import { whyRdtherm } from "@/data/home";
import { cn } from "@/lib/cn";

// Keyed by title rather than index so reordering the data can't shuffle the
// icons away from the copy they belong to.
const ICONS: Record<string, LucideIcon> = {
  "On-Time Delivery, Every Time": CalendarCheck,
  "First Time Right Fabrication": Target,
  "Design Optimization": PencilRuler,
  "Global Code Compliance": Globe,
  "Single-Source Accountability": Handshake,
  "Transparent Communication": MessagesSquare,
};
const FALLBACK_ICONS: LucideIcon[] = [
  CalendarCheck,
  Target,
  PencilRuler,
  Globe,
  Handshake,
  MessagesSquare,
];

// Inset the copy away from the column rules without letting the outer columns
// pull away from the container edge — so the rules stay flush with the heading
// above. Which cell is "first in its row" changes between the 2- and 3-column
// layouts, hence one set of classes per breakpoint.
function cellPadding(index: number) {
  const sm = index % 2 === 1 ? "sm:pl-8" : "sm:pr-8";
  const lgCol = index % 3;
  const lg =
    lgCol === 0 ? "lg:pl-0 lg:pr-10" : lgCol === 1 ? "lg:px-10" : "lg:pl-10 lg:pr-0";
  return `${sm} ${lg}`;
}

export function WhyRdtherm() {
  const features = whyRdtherm.features;

  return (
    <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-start"
        >
          <motion.div variants={fadeUp} className="lg:col-span-12">
            <SectionTag>{whyRdtherm.eyebrow}</SectionTag>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="lg:col-span-7 text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[46px] lg:text-[56px] font-bold"
          >
            {whyRdtherm.heading}
          </motion.h2>
          <div className="lg:col-span-5 flex flex-col gap-7 lg:pl-8">
            <motion.p
              variants={fadeUp}
              className="text-[18px] leading-[1.55] text-[var(--color-ink-soft)] max-w-[420px]"
            >
              {whyRdtherm.description}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button href={whyRdtherm.cta.href} variant="primary">
                {whyRdtherm.cta.label}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* One grid instead of two separate rows, so the hairlines between
            cells meet and read as a continuous rule. */}
        {features.length > 0 ? (
          <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <FeatureCol
                key={feature.title}
                title={feature.title}
                body={feature.body}
                index={i}
              />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function FeatureCol({
  title,
  body,
  index,
  className,
}: {
  title: string;
  body: string;
  index: number;
  className?: string;
}) {
  const Icon = ICONS[title] ?? FALLBACK_ICONS[index % FALLBACK_ICONS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay: 0.05 + (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group flex flex-col gap-3 py-10",
        cellPadding(index),
        // Row rule above every cell — reads as one continuous line across a row.
        "border-t border-[var(--color-line)]",
        // Column rule: only on cells that aren't first in their row, and the
        // "first in row" position differs between the 2- and 3-column layouts.
        index % 2 === 1 ? "sm:border-l" : "sm:border-l-0",
        index % 3 === 0 ? "lg:border-l-0" : "lg:border-l",
        className,
      )}
    >
      <span className="inline-flex size-11 items-center justify-center rounded-[12px] bg-[var(--color-accent)]/10 text-[var(--color-accent)] transition-all duration-500 group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:shadow-[0_12px_28px_-12px_rgba(233,78,27,0.55)]">
        <Icon className="size-5" strokeWidth={1.8} />
      </span>
      <h3 className="mt-3 text-[20px] font-semibold leading-[1.25] text-[var(--color-ink)]">
        {title}
      </h3>
      <p className="text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">{body}</p>
    </motion.div>
  );
}
