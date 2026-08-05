"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Handshake,
  Search,
  Users,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";
import { coreValues } from "@/data/about";
import { cn } from "@/lib/cn";

const ICON_MAP: Record<string, LucideIcon> = {
  growth: TrendingUp,
  handshake: Handshake,
  search: Search,
  respect: Users,
  heart: Heart,
};

// Tailwind only sees literal class names, so the offsets are looked up, not built.
const SM_COL_START = ["", "", "sm:col-start-2", "sm:col-start-3"];
const LG_COL_START = ["", "", "lg:col-start-2", "lg:col-start-3", "lg:col-start-4"];

// The grid runs at double the visible column count (cards span 2), so a leftover
// last row can be nudged half a card to sit centred under the full rows above.
// Only the first card of that row needs positioning — the rest auto-flow after it.
function centreStart(index: number, total: number, cols: number) {
  const remainder = total % cols;
  if (remainder === 0 || index !== total - remainder) return 0;
  return 1 + (cols - remainder);
}

export function CoreValues() {
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
            <SectionTag>Core Values</SectionTag>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="lg:col-span-7 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
          >
            The values that <span className="text-[var(--color-accent)]">guide</span> every project.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[18px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[420px]"
          >
            Five principles that shape how we engineer, fabricate, and partner with clients — from the engineering room to the shop floor.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-6">
          {coreValues.map((value, i) => {
            const Icon = ICON_MAP[value.icon] ?? TrendingUp;
            const smStart = centreStart(i, coreValues.length, 2);
            const lgStart = centreStart(i, coreValues.length, 3);
            return (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.6,
                  delay: 0.05 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group relative col-span-2 flex flex-col gap-5 overflow-hidden rounded-[18px] border border-[var(--color-line)] bg-white p-7 pt-8 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(233,78,27,0.35)]",
                  SM_COL_START[smStart],
                  // Reset at lg, otherwise the sm offset would leak into the 3-up layout.
                  LG_COL_START[lgStart] || (smStart ? "lg:col-start-auto" : ""),
                )}
              >
                {/* Gradient top accent bar */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[6px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent-hover)] to-[var(--color-bg-dark)]"
                />
                <span
                  className="relative inline-flex size-14 items-center justify-center rounded-[14px] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white shadow-[0_10px_24px_-10px_rgba(233,78,27,0.6)] transition-transform duration-300 group-hover:scale-105"
                >
                  <Icon className="size-7" strokeWidth={1.8} />
                </span>
                <h3 className="text-[22px] font-semibold leading-tight">{value.title}</h3>
                <p className="text-[18px] leading-[1.6] text-[var(--color-ink-soft)]">{value.body}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
