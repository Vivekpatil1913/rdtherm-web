"use client";

import { motion } from "framer-motion";
import { Building2, Cog, Factory } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { facility } from "@/data/manufacturing";

const ICON_MAP = {
  "cs-shop": Factory,
  "ss-shop": Building2,
  "pv-shop": Cog,
} as const;

export function Facility() {
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
              <SectionTag>Our Shop Floor</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
            >
              Three bays. <span className="text-[var(--color-accent)]">One quality system.</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[460px]"
          >
            Over 1.1 lakh square feet of dedicated workshop area — segregated into bays so carbon steel work never crosses paths with stainless steel or sanitary equipment.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {facility.map((bay, i) => {
            const Icon = ICON_MAP[bay.id as keyof typeof ICON_MAP] ?? Factory;
            return (
              <motion.article
                key={bay.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: 0.05 + i * 0.08, ease: EASE_OUT_SOFT }}
                className="group relative flex flex-col gap-6 rounded-[20px] border border-[var(--color-line)] bg-white p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-30px_rgba(0,0,0,0.18)]"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-[12px] bg-[var(--color-accent-soft)] text-[var(--color-accent)] transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white">
                  <Icon className="size-6" strokeWidth={1.8} />
                </span>

                <h3 className="text-[24px] sm:text-[26px] font-semibold leading-tight">{bay.title}</h3>
                <p className="text-[14px] leading-[1.6] text-[var(--color-ink-soft)]">{bay.body}</p>

                <div className="grid grid-cols-2 gap-4 rounded-[12px] bg-[var(--color-bg-soft)] p-4">
                  {bay.bays.map((b) => (
                    <div key={b.label}>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">{b.label}</p>
                      <p className="mt-1 text-[16px] font-semibold leading-tight">{b.value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">Cranes</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {bay.cranes.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-[var(--color-bg)] px-3 py-1 text-[12px] font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
