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

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-line)] rounded-[18px] overflow-hidden border border-[var(--color-line)]">
          {strengths.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.05 + (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col gap-4 bg-white p-7 transition-colors duration-300 hover:bg-[var(--color-bg-soft)]"
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {s.number}
              </p>
              <h3 className="text-[20px] font-semibold leading-tight">{s.title}</h3>
              <p className="text-[14px] leading-[1.6] text-[var(--color-ink-soft)]">{s.body}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
