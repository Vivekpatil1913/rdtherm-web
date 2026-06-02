"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { flagshipMachine } from "@/data/manufacturing";

const FLAGSHIP_IMG =
  "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&q=80";

export function FlagshipMachine() {
  return (
    <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-12 items-center"
        >
          <motion.div
            variants={fadeUp}
            className="lg:col-span-6 relative aspect-[4/3] lg:aspect-[5/5] overflow-hidden rounded-[20px] bg-[var(--color-bg-dark)]"
          >
            <Image
              src={FLAGSHIP_IMG}
              alt={flagshipMachine.name}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(60%_50%_at_60%_40%,rgba(233,78,27,0.18),transparent_70%)]"
            />
            <div className="absolute left-5 top-5 z-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                {flagshipMachine.badge}
              </span>
            </div>
          </motion.div>

          <div className="lg:col-span-6">
            <motion.div variants={fadeUp}>
              <SectionTag>Featured Machine</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[36px] leading-[1.05] tracking-[-0.02em] sm:text-[48px] lg:text-[60px] font-bold"
            >
              {flagshipMachine.name}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-3 text-[14px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]"
            >
              {flagshipMachine.type}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-[16px] leading-[1.65] text-[var(--color-ink-soft)] max-w-[540px]"
            >
              {flagshipMachine.description}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 gap-px rounded-[14px] overflow-hidden bg-[var(--color-line)] border border-[var(--color-line)]">
              {flagshipMachine.specs.map((spec) => (
                <div key={spec.label} className="bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">{spec.label}</p>
                  <p className="mt-1.5 text-[16px] font-semibold leading-tight">{spec.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
