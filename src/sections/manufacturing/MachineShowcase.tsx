"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { ColumnTick } from "@/components/ui/SectionDivider";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { machineCategories } from "@/data/manufacturing";
import { cn } from "@/lib/cn";

export function MachineShowcase() {
  const [activeId, setActiveId] = useState(machineCategories[0].id);
  const active =
    machineCategories.find((c) => c.id === activeId) ?? machineCategories[0];

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
              <SectionTag>Machinery</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[60px] font-bold"
            >
              Every machine you&apos;d expect to find in a{" "}
              <span className="text-[var(--color-accent)]">code shop</span>.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[460px]"
          >
            From a 4 kW fibre laser to a 300-tonne press brake, hydro-test bays at 500 bar, and a 6-axis welding robot — explore the kit on our shop floor.
          </motion.p>
        </motion.div>

        {/* Category tab strip */}
        <div className="mt-12 lg:mt-16 overflow-x-auto no-scrollbar">
          <div role="tablist" className="flex min-w-max items-center gap-2 border-b border-[var(--color-line)]">
            {machineCategories.map((cat) => {
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(cat.id)}
                  className={cn(
                    "relative shrink-0 px-5 py-4 text-[15px] sm:text-[16px] font-semibold transition-colors duration-300",
                    isActive
                      ? "text-[var(--color-ink)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
                  )}
                >
                  {cat.label}
                  {isActive ? (
                    <motion.span
                      layoutId="tab-indicator"
                      className="absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-[var(--color-accent)]"
                      transition={{ duration: 0.35, ease: EASE_OUT_SOFT }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE_OUT_SOFT }}
            className="mt-10"
          >
            <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[600px]">
              {active.subtitle}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {active.machines.map((m, i) => (
                <motion.article
                  key={m.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05 + i * 0.06,
                    ease: EASE_OUT_SOFT,
                  }}
                  className="group relative flex flex-col gap-5 rounded-[18px] border border-[var(--color-line)] bg-white p-6 lg:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex h-28 items-center justify-center rounded-[12px] bg-[var(--color-bg-soft)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                      {active.label} · {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                      {m.type}
                    </p>
                    <h3 className="text-[20px] font-semibold leading-tight">{m.name}</h3>
                  </div>

                  <ColumnTick />

                  <ul className="flex flex-col gap-2 text-[13px] leading-[1.55] text-[var(--color-ink-soft)]">
                    {m.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2">
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block size-1 rounded-full bg-[var(--color-accent)]"
                        />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
