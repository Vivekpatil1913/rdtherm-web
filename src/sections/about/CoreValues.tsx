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

const ICON_MAP: Record<string, LucideIcon> = {
  growth: TrendingUp,
  handshake: Handshake,
  search: Search,
  respect: Users,
  heart: Heart,
};

export function CoreValues() {
  return (
    <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-end"
        >
          <div className="lg:col-span-7">
            <motion.div variants={fadeUp}>
              <SectionTag>Core Values</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
            >
              The values that <span className="text-[var(--color-accent)]">guide</span> every project.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[420px]"
          >
            Five principles that shape how we engineer, fabricate, and partner with clients — from the engineering room to the shop floor.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {coreValues.map((value, i) => {
            const Icon = ICON_MAP[value.icon] ?? TrendingUp;
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
                className="group relative flex flex-col gap-5 overflow-hidden rounded-[18px] border border-[var(--color-line)] bg-white p-7 pt-8 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(233,78,27,0.35)]"
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
                <p className="text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">{value.body}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
