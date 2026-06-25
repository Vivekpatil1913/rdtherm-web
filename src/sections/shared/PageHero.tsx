"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";

type PageHeroProps = {
  eyebrow: string;
  heading: React.ReactNode;
  description?: string;
};

export function PageHero({ eyebrow, heading, description }: PageHeroProps) {
  return (
    <section className="pt-10 pb-16 lg:pt-16 lg:pb-24">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 lg:items-center"
        >
          <div className="lg:col-span-8">
            <motion.div variants={fadeUp}>
              <SectionTag>{eyebrow}</SectionTag>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-6 text-[40px] leading-[1.05] tracking-[-0.02em] sm:text-[56px] lg:text-[68px] font-bold"
            >
              {heading}
            </motion.h1>
          </div>
          {description ? (
            <motion.div variants={fadeUp} className="lg:col-span-4">
              <p className="text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[420px]">
                {description}
              </p>
            </motion.div>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}
