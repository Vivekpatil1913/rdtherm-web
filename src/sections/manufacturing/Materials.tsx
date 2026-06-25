"use client";

import { motion } from "framer-motion";
import { Atom } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { qualifiedMaterials, weldingCerts } from "@/data/manufacturing";

export function Materials() {
  return (
    <section className="bg-[var(--color-bg-dark)] py-16 lg:py-20 text-white">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-12 items-center"
        >
          <div className="lg:col-span-5">
            <motion.div variants={fadeUp}>
              <SectionTag variant="dark">Materials We Weld</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[52px] font-bold"
            >
              CS, SS, duplex, exotic alloys —{" "}
              <span className="text-[var(--color-accent)]">qualified and ready</span>.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-[16px] leading-[1.65] text-white/65 max-w-[440px]"
            >
              200+ qualified WPS / PQR procedures cover almost every material you&apos;re likely to specify for process service. Every welder is qualified to ASME Section IX, with re-qualification audits every six months.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3">
              {weldingCerts.map((c) => (
                <div
                  key={c}
                  className="flex items-start gap-3 rounded-[12px] border border-white/10 bg-white/[0.04] p-4"
                >
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-white">
                    <Atom className="size-4" strokeWidth={2} />
                  </span>
                  <p className="text-[14px] font-medium leading-tight">{c}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {qualifiedMaterials.map((m, i) => (
                <motion.div
                  key={m}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, delay: 0.04 * i, ease: EASE_OUT_SOFT }}
                  className="group flex items-center gap-3 rounded-[12px] border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors duration-300 hover:border-[var(--color-accent)]/40 hover:bg-white/[0.06]"
                >
                  <span
                    aria-hidden
                    className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[10px] font-bold text-white"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[14px] font-medium leading-tight">{m}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
