"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { designSoftware } from "@/data/manufacturing";

export function DesignSoftware() {
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
              <SectionTag>Design & Engineering Tools</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
            >
              The software our engineers use{" "}
              <span className="text-[var(--color-accent)]">every day</span>.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[460px]"
          >
            Industry-standard tools for thermal design, pressure-vessel calculation, 3D modelling, FEA and pipe stress analysis — all in-house, all licensed, all current.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {designSoftware.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE_OUT_SOFT }}
              className="group flex items-start gap-4 rounded-[14px] border border-[var(--color-line)] bg-white p-5 lg:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/40"
            >
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white">
                <Cpu className="size-5" strokeWidth={1.8} />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-[16px] font-semibold leading-tight">{s.name}</p>
                <p className="text-[13px] leading-[1.5] text-[var(--color-ink-soft)]">{s.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
