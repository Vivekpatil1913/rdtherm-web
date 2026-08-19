"use client";

import { useState } from "react";
import Image from "next/image";
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
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-start"
        >
          <motion.div variants={fadeUp} className="lg:col-span-12">
            <SectionTag>Machinery</SectionTag>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="lg:col-span-7 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[60px] font-bold"
          >
            The Right Tools for{" "}
            <span className="text-[var(--color-accent)]">Every Challenge</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[18px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[460px]"
          >
            Our facility is equipped with a comprehensive range of modern machinery — from precision cutting and rolling to advanced welding setups and testing equipment. Every machine is maintained to the highest standards, enabling us to handle complex fabrication requirements with accuracy, efficiency, and confidence.
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  className="group relative flex flex-col gap-5 rounded-[18px] border border-[var(--color-line)] bg-white p-5 lg:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)]"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[12px] bg-[var(--color-bg-soft)]">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                        {active.label} · {String(i + 1).padStart(2, "0")}
                      </p>
                    )}
                  </div>

                  <h3 className="text-[20px] font-semibold leading-tight">{m.name}</h3>

                  {m.specs.length ? (
                    <>
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
                    </>
                  ) : null}
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
