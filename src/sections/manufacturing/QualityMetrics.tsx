"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { qualityMetrics, qualityMethods } from "@/data/manufacturing";

export function QualityMetrics() {
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
              <SectionTag>Quality & Excellence</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
            >
              We measure what we ship —{" "}
              <span className="text-[var(--color-accent)]">honestly</span>.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[460px]"
          >
            Numbers below are tracked monthly and audited every year. They&apos;re the same metrics our customers receive in their quarterly business reviews.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {qualityMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.05 + i * 0.08, ease: EASE_OUT_SOFT }}
              className="relative overflow-hidden rounded-[18px] border border-[var(--color-line)] bg-white p-6 lg:p-7"
            >
              <span
                aria-hidden
                className="absolute -right-6 -top-6 size-24 rounded-full bg-[radial-gradient(circle,rgba(233,78,27,0.12),transparent_70%)]"
              />
              <p className="text-[44px] sm:text-[56px] lg:text-[64px] font-extrabold leading-none tracking-[-0.02em] text-[var(--color-accent)]">
                {m.value}
              </p>
              <p className="mt-3 text-[15px] font-semibold leading-tight">{m.label}</p>
              <p className="mt-2 text-[13px] leading-[1.55] text-[var(--color-ink-soft)]">{m.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {qualityMethods.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE_OUT_SOFT }}
              className="flex flex-col gap-2 rounded-[14px] border border-[var(--color-line)] bg-white p-5 lg:p-6"
            >
              <p className="text-[16px] font-semibold leading-tight">{m.title}</p>
              <p className="text-[13px] leading-[1.55] text-[var(--color-ink-soft)]">{m.body}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
