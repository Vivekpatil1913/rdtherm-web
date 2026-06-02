"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";
import { capabilitiesStats } from "@/data/manufacturing";

export function CapabilitiesStats() {
  return (
    <section className="bg-[var(--color-bg-dark)] py-14 lg:py-20 text-white">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6"
        >
          {capabilitiesStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="flex flex-col gap-3">
              <p className="text-[42px] leading-none font-bold tracking-tight sm:text-[52px] lg:text-[64px]">
                {stat.value}
              </p>
              <p className="text-[14px] uppercase tracking-[0.18em] text-white/65">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
