"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";
import { strengths } from "@/data/manufacturing";

export function Strengths() {
  return (
    <section className="bg-white py-16 lg:py-20">
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
              <SectionTag>What Sets Us Apart</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
            >
              Eight strengths that show up in every <span className="text-[var(--color-accent)]">delivered</span> equipment.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[420px]"
          >
            Engineering depth and a real, working shop floor — the two pillars behind every R&D Therm project.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {strengths.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.05 + (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col gap-3 rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:bg-white hover:shadow-[0_20px_45px_-25px_rgba(0,0,0,0.18)]"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-[12px] bg-[var(--color-accent)]/10 text-[15px] font-bold text-[var(--color-accent)] transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white">
                {s.number}
              </span>
              <h3 className="mt-2 text-[18px] font-semibold leading-snug text-[var(--color-ink)]">{s.title}</h3>
              <p className="text-[14px] leading-[1.6] text-[var(--color-ink-soft)]">{s.body}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
