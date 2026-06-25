"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Building2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { benefits } from "@/data/careers";

const ICONS: LucideIcon[] = [Briefcase, GraduationCap, Building2, ShieldCheck];

export function Benefits() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--color-line)] bg-white py-16 lg:py-20">
      {/* Soft accent glow in the top-right for depth */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(233,78,27,0.12),transparent_70%)]"
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
              <SectionTag>Why R&D Therm</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
            >
              A place to build a real{" "}
              <span className="text-[var(--color-accent)]">engineering career</span>.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 max-w-[440px] text-[16px] leading-[1.65] text-[var(--color-ink-soft)]"
          >
            We invest in people first. Real ownership, modern facilities and a
            safety-first culture you can feel the moment you walk in.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {benefits.map((b, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.article
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.65,
                  delay: 0.08 + (i % 4) * 0.08,
                  ease: EASE_OUT_SOFT,
                }}
                className="group relative flex flex-col gap-5 overflow-hidden rounded-[18px] border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-6 lg:p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)]/30 hover:shadow-[0_28px_70px_-30px_rgba(0,0,0,0.18)]"
              >
                {/* Subtle radial highlight on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-[radial-gradient(closest-side,rgba(233,78,27,0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <span className="relative inline-flex size-12 items-center justify-center rounded-[12px] bg-[var(--color-accent)]/10 text-[var(--color-accent)] transition-all duration-500 group-hover:scale-[1.08] group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:shadow-[0_12px_28px_-12px_rgba(233,78,27,0.55)]">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>

                <div className="relative flex flex-col gap-3">
                  <h3 className="text-[20px] font-semibold leading-tight tracking-[-0.01em] text-[var(--color-ink)]">
                    {b.title}
                  </h3>
                  <p className="text-[14.5px] leading-[1.6] text-[var(--color-ink-soft)]">
                    {b.body}
                  </p>
                </div>

                {/* Accent under-line — sweeps in on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
