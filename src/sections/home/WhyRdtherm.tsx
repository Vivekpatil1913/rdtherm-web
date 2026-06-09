"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { ColumnTick } from "@/components/ui/SectionDivider";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";
import { whyRdtherm } from "@/data/home";
import { cn } from "@/lib/cn";

export function WhyRdtherm() {
  const features = whyRdtherm.features;
  const firstRow = features.slice(0, 3);
  const secondRow = features.slice(3, 6);

  return (
    <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12"
        >
          <div className="lg:col-span-7">
            <motion.div variants={fadeUp}>
              <SectionTag>{whyRdtherm.eyebrow}</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[46px] lg:text-[56px] font-bold"
            >
              {whyRdtherm.heading}
            </motion.h2>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-7 lg:pl-8">
            <motion.p
              variants={fadeUp}
              className="text-[16px] leading-[1.55] text-[var(--color-ink-soft)] max-w-[420px]"
            >
              {whyRdtherm.description}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button href={whyRdtherm.cta.href} variant="primary">
                {whyRdtherm.cta.label}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {firstRow.length > 0 ? (
          <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10 border-t border-[var(--color-line)] pt-12">
            {firstRow.map((feature, i) => (
              <FeatureCol key={feature.title} title={feature.title} body={feature.body} index={i} />
            ))}
          </div>
        ) : null}

        {secondRow.length > 0 ? (
          <div className="mt-12 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10 border-t border-[var(--color-line)] pt-12">
            {secondRow.map((feature, i) => (
              <FeatureCol key={feature.title} title={feature.title} body={feature.body} index={i + 3} />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function FeatureCol({
  title,
  body,
  index,
  className,
}: {
  title: string;
  body: string;
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay: 0.05 + (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex flex-col gap-3", className)}
    >
      <ColumnTick />
      <h3 className="mt-3 text-[20px] font-semibold leading-[1.25] text-[var(--color-ink)]">
        {title}
      </h3>
      <p className="text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">{body}</p>
    </motion.div>
  );
}
