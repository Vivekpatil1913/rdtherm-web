"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";
import { processSteps } from "@/data/manufacturing";

export function ProcessSteps() {
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
              <SectionTag>How We Deliver</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
            >
              From drawing to <span className="text-[var(--color-accent)]">dispatch</span> — six controlled stages.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[420px]"
          >
            Each stage has clear ownership, deliverables and inspection points — so your project is never a black box.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {processSteps.map((s, i) => (
            <motion.article
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, delay: 0.05 + (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col gap-4 rounded-[18px] border border-[var(--color-line)] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]"
            >
              <p className="text-[64px] leading-none font-extrabold tracking-tight text-[var(--color-bg-soft)]">
                {s.step}
              </p>
              <h3 className="text-[22px] font-semibold leading-tight">{s.title}</h3>
              <p className="text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">{s.body}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
