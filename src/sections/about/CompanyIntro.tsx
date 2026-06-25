"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { aboutIntro } from "@/data/about";

const COMPANY_IMAGE = "/images/about/rd.jpg";

const STATS = [
  { value: "1995", label: "Established" },
  { value: "60,000", suffix: " sq ft", label: "Facility area" },
  { value: "100+", label: "Professionals" },
  { value: "ASME · IBR · ISO", label: "Certified", small: true },
];

export function CompanyIntro() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container size="wide">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <motion.figure
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.85, ease: EASE_OUT_SOFT }}
            className="group relative lg:col-span-6 lg:sticky lg:top-28 lg:self-start overflow-hidden rounded-[18px] lg:rounded-[22px] shadow-[0_30px_70px_-40px_rgba(0,0,0,0.35)]"
          >
            <div className="relative aspect-[5/4] w-full">
              <Image
                src={COMPANY_IMAGE}
                alt="Aerial view of R&D Therm's manufacturing facility in MIDC Satpur, Nashik"
                fill
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
              />
            </div>

            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7 lg:p-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-[11px]">
                  Our facility
                </p>
                <p className="mt-1.5 text-[15px] font-medium leading-[1.3] tracking-[-0.01em] sm:text-[17px]">
                  Nashik, Maharashtra — since 1995.
                </p>
              </div>
              <span className="hidden items-center gap-2 self-end rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur sm:inline-flex">
                <span
                  className="size-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]"
                  aria-hidden
                />
                MIDC Satpur
              </span>
            </figcaption>
          </motion.figure>

          <motion.div
            variants={stagger(0.05, 0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-6 flex flex-col"
          >
            <motion.div variants={fadeUp}>
              <SectionTag>{aboutIntro.eyebrow}</SectionTag>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[28px] leading-[1.12] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[34px] lg:text-[40px] font-bold"
            >
              Engineering excellence, rooted in{" "}
              <span className="text-[var(--color-accent)]">three decades</span>.
            </motion.h2>

            <motion.span
              variants={fadeUp}
              className="mt-6 block h-px w-14 origin-left bg-gradient-to-r from-[var(--color-accent)] to-transparent"
              aria-hidden
            />

            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-col gap-4 text-[15.5px] leading-[1.65] text-[var(--color-ink-soft)] lg:text-[16.5px]"
            >
              {aboutIntro.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Key facts strip */}
        <motion.dl
          variants={stagger(0.06, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-[var(--color-line)] bg-[var(--color-line)] lg:mt-16 lg:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="flex flex-col items-center gap-1.5 bg-white p-6 text-center lg:p-8"
            >
              <dt
                className={
                  "font-bold tracking-[-0.02em] text-[var(--color-ink)] " +
                  (s.small
                    ? "text-[18px] sm:text-[20px] lg:text-[22px]"
                    : "text-[28px] sm:text-[34px] lg:text-[40px]")
                }
              >
                {s.value}
                {s.suffix ? (
                  <span className="text-[14px] font-semibold text-[var(--color-muted)] lg:text-[16px]">
                    {s.suffix}
                  </span>
                ) : null}
              </dt>
              <dd className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                {s.label}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
