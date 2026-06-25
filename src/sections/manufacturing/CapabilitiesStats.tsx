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
            <motion.div key={stat.label} variants={fadeUp} className="flex h-full flex-col">
              <p className="text-[28px] font-semibold leading-[1.05] tracking-tight sm:text-[34px] lg:text-[42px]">
                {stat.value}
              </p>
              {/* mt-auto pins every label to the bottom so they align even when a
                  value (e.g. "1.1 Lakh sq ft") wraps to more lines than the others. */}
              <p className="mt-auto pt-3 text-[13px] uppercase tracking-[0.18em] text-white/65">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
