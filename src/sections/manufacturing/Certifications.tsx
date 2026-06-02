"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";
import { certifications } from "@/data/manufacturing";

export function Certifications() {
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
              <SectionTag>Certifications</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
            >
              Built to the codes <span className="text-[var(--color-accent)]">your market demands</span>.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[420px]"
          >
            Our equipment ships to customers in 20+ countries — designed and certified to the codes that matter for each destination.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
          {certifications.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.05 + (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 rounded-[12px] border border-[var(--color-line)] bg-white px-5 py-4"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-[8px] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <ShieldCheck className="size-5" strokeWidth={1.8} />
              </span>
              <p className="text-[14px] font-semibold leading-tight">{c}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
