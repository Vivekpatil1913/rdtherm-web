"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { industries, industryDecor } from "@/data/home";
import { cn } from "@/lib/cn";

const DECOR_TONES: Record<string, string> = {
  assembly:
    "bg-[linear-gradient(135deg,#d97b3a_0%,#b85a25_50%,#7d3b12_100%)]",
  ct:
    "bg-[linear-gradient(135deg,#dde4ee_0%,#aab5c6_50%,#6c7a8f_100%)]",
  engine:
    "bg-[linear-gradient(135deg,#5b6470_0%,#3a414b_50%,#1c2128_100%)]",
  discs:
    "bg-[linear-gradient(135deg,#c63a2a_0%,#8e2818_50%,#4f130a_100%)]",
  turbine:
    "bg-[linear-gradient(135deg,#dadcde_0%,#9aa0a8_50%,#5b6066_100%)]",
};

const COVER_TONES: Record<string, string> = {
  chemical:
    "bg-[linear-gradient(135deg,#5b5b5b_0%,#8a8a8a_50%,#3d3d3d_100%)]",
  pharma:
    "bg-[linear-gradient(135deg,#cfd4dc_0%,#9aa5b6_50%,#5d6776_100%)]",
  oilgas:
    "bg-[linear-gradient(135deg,#3a5b8a_0%,#5b86c4_50%,#1c3158_100%)]",
  food:
    "bg-[linear-gradient(135deg,#c89a6c_0%,#9b6e3c_50%,#5e421f_100%)]",
  power:
    "bg-[linear-gradient(135deg,#94a89c_0%,#5e7d6a_50%,#2b3f33_100%)]",
};

export function Industries() {
  const [activeKey, setActiveKey] = useState(industries.items[0].key);
  const active = industries.items.find((i) => i.key === activeKey) ?? industries.items[0];
  const [headStart, accent, headEnd] = industries.heading;

  return (
    <section className="relative bg-[var(--color-bg-soft)] pt-16 lg:pt-20 pb-24 lg:pb-32 overflow-hidden">
      {industryDecor.map((d) => (
        <motion.div
          key={d.id}
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE_OUT_SOFT }}
          className={cn(
            d.className,
            "overflow-hidden ring-1 ring-black/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)]",
          )}
          aria-hidden
        >
          <div className={cn("h-full w-full", DECOR_TONES[d.tone] ?? DECOR_TONES.assembly)}>
            <div className="h-full w-full bg-[radial-gradient(70%_70%_at_30%_30%,rgba(255,255,255,0.25),transparent_70%)]" />
          </div>
        </motion.div>
      ))}

      <Container size="wide" className="relative z-10">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionTag>{industries.eyebrow}</SectionTag>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-[920px] text-[32px] leading-[1.08] tracking-[-0.02em] sm:text-[44px] lg:text-[64px] font-bold"
          >
            {headStart}
            <span className="text-[var(--color-accent)]">{accent}</span>
            {headEnd}
          </motion.h2>
        </motion.div>

        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-10 items-start">
          <ul className="lg:col-span-5 relative flex flex-col">
            <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-[var(--color-line)]" />
            {industries.items.map((item) => {
              const isActive = item.key === activeKey;
              return (
                <li key={item.key} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveKey(item.key)}
                    className={cn(
                      "group flex w-full cursor-pointer items-center justify-between gap-6 py-3 lg:py-3 pl-6 lg:pl-8 pr-2 text-left text-[22px] leading-[1.2] font-semibold transition-colors duration-300 sm:text-[26px] lg:text-[30px]",
                      isActive
                        ? "text-[var(--color-ink)]"
                        : "text-[var(--color-ink)]/40 hover:text-[var(--color-ink)]/70",
                    )}
                  >
                    <span>{item.label}</span>
                  </button>
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute left-0 w-[3px] bg-[var(--color-accent)]"
                    initial={false}
                    animate={{
                      top: isActive ? "10%" : "50%",
                      height: isActive ? "80%" : "0%",
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
                  />
                </li>
              );
            })}
          </ul>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 rounded-[18px] border border-[var(--color-line)] bg-white p-5 sm:p-6 lg:p-7"
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[14px] aspect-[5/4]",
                    COVER_TONES[active.cover] ?? COVER_TONES.chemical,
                  )}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(80%_60%_at_30%_30%,rgba(255,255,255,0.18),transparent_70%)]"
                  />
                </div>
                <div className="flex flex-col gap-4 justify-center">
                  <h3 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-[1.15] tracking-[-0.01em]">
                    {active.label}
                  </h3>
                  <p className="text-[15px] sm:text-[16px] leading-[1.6] text-[var(--color-ink-soft)]">
                    {active.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
