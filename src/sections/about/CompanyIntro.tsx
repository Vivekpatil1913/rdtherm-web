"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Factory, Users, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { aboutIntro } from "@/data/about";

const COMPANY_IMAGE = "/images/about/rd.jpg";

type Stat = {
  icon: LucideIcon;
  value?: string;
  suffix?: string;
  parts?: string[];
  label: string;
  tone: "accent" | "blue";
  /** Arc start angle, so no two rings sit the same way. */
  rotate: number;
};

const STATS: Stat[] = [
  { icon: CalendarDays, value: "1995", label: "Established", tone: "accent", rotate: 128 },
  {
    icon: Factory,
    value: "60,000",
    suffix: "sq.ft",
    label: "Manufacturing facility",
    tone: "blue",
    rotate: 206,
  },
  { icon: Users, value: "100+", label: "Skilled professionals", tone: "accent", rotate: 150 },
  {
    icon: ShieldCheck,
    parts: ["ASME", "IBR", "ISO"],
    label: "Certified",
    tone: "blue",
    rotate: 196,
  },
];

/**
 * Renders the `**bold**` markers `aboutIntro.body` carries. Odd-indexed pieces
 * of the split are the emphasised phrases; even ones are plain copy.
 */
function withEmphasis(text: string) {
  return text.split("**").map((piece, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[var(--color-ink)]">
        {piece}
      </strong>
    ) : (
      piece
    ),
  );
}

/* Blueprint linework wash behind the strip — faint technical grid. */
const BLUEPRINT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cg fill='none' stroke='%231b5fa8' stroke-width='1'%3E%3Cpath d='M0 45h180M0 90h180M0 135h180M45 0v180M90 0v180M135 0v180'/%3E%3Ccircle cx='90' cy='90' r='34'/%3E%3Ccircle cx='90' cy='90' r='18'/%3E%3Cpath d='M56 62h68v56H56z'/%3E%3C/g%3E%3C/svg%3E\")";

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
                <p key={i}>{withEmphasis(p)}</p>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Key facts strip */}
        <div className="relative mt-12 overflow-hidden rounded-[20px] lg:mt-16 lg:rounded-[26px]">
          {/* Base wash */}
          <span
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,#f7fafd_0%,#eef4fb_55%,#e9f0f9_100%)]"
          />
          {/* Blueprint linework */}
          <span
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: BLUEPRINT, backgroundSize: "180px 180px" }}
          />
          {/* Centre light, so the linework only reads at the edges */}
          <span
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_75%_at_50%_45%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.45)_55%,transparent_100%)]"
          />

          <motion.dl
            variants={stagger(0.07, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative grid grid-cols-2 lg:grid-cols-4"
          >
            {STATS.map((s, i) => {
              const isAccent = s.tone === "accent";
              const line = isAccent ? "#e94e1b" : "#1b5fa8";
              const Icon = s.icon;

              return (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="group relative flex flex-col items-center px-3 pb-7 pt-6 text-center sm:px-6 lg:px-8 lg:pb-8 lg:pt-7"
                >
                  {/* Column rules */}
                  <span
                    aria-hidden
                    className={`absolute right-0 top-1/2 h-[76%] w-px -translate-y-1/2 bg-[linear-gradient(180deg,transparent_0%,#c9d9ec_28%,#c9d9ec_72%,transparent_100%)] ${
                      i % 2 === 0 ? "block" : "hidden"
                    } ${i < STATS.length - 1 ? "lg:block" : "lg:hidden"}`}
                  />
                  <span
                    aria-hidden
                    className={`absolute inset-x-6 bottom-0 h-px bg-[linear-gradient(90deg,transparent_0%,#c9d9ec_30%,#c9d9ec_70%,transparent_100%)] lg:hidden ${
                      i < 2 ? "block" : "hidden"
                    }`}
                  />

                  {/* Icon medallion + gradient arc */}
                  <div className="relative size-[70px] shrink-0 lg:size-[86px]">
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute inset-0 size-full"
                      style={{ transform: `rotate(${s.rotate}deg)` }}
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id={`arc-${i}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={isAccent ? "#1b5fa8" : "#e94e1b"} />
                          <stop offset="42%" stopColor={isAccent ? "#3f7fbe" : "#ef7a4f"} />
                          <stop offset="100%" stopColor={line} />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        fill="none"
                        stroke={`url(#arc-${i})`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeDasharray="212 77"
                      />
                    </svg>

                    <div className="absolute inset-[8px] flex items-center justify-center rounded-full bg-white shadow-[0_12px_24px_-14px_rgba(20,52,92,0.42),0_2px_6px_-2px_rgba(20,52,92,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-white/70">
                      <Icon
                        strokeWidth={1.6}
                        className="size-[26px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] lg:size-[32px]"
                        style={{ stroke: `url(#icon-${s.tone})` }}
                      />
                    </div>
                  </div>

                  {/* Figure */}
                  <dt className="mt-3.5 flex min-h-[2.25rem] items-end justify-center lg:mt-4 lg:min-h-[2.75rem]">
                    {s.parts ? (
                      <span className="flex items-center gap-1.5 text-[15px] font-extrabold tracking-[-0.02em] text-[#1b5fa8] sm:gap-2 sm:text-[19px] lg:text-[23px]">
                        {s.parts.map((p, pi) => (
                          <span key={p} className="flex items-center gap-1.5 sm:gap-2">
                            {pi > 0 ? (
                              <span
                                aria-hidden
                                className="size-[5px] shrink-0 rounded-full bg-[var(--color-accent)]"
                              />
                            ) : null}
                            {p}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="flex items-baseline bg-[linear-gradient(180deg,#2e86d8_0%,#1b5fa8_100%)] bg-clip-text text-[30px] font-extrabold leading-none tracking-[-0.045em] text-transparent sm:text-[38px] lg:text-[46px]">
                        {s.value}
                        {s.suffix ? (
                          <span className="ml-0.5 text-[13px] font-bold tracking-[-0.02em] lg:text-[17px]">
                            {s.suffix}
                          </span>
                        ) : null}
                      </span>
                    )}
                  </dt>

                  <dd className="mt-2.5 text-[10px] font-semibold uppercase leading-[1.4] tracking-[0.16em] text-[#5c6b7c] sm:text-[11px]">
                    {s.label}
                  </dd>

                  {/* Underline rule with centre node */}
                  <div className="relative mt-4 flex w-full max-w-[190px] items-center justify-center lg:mt-5">
                    <span
                      aria-hidden
                      className="h-px w-full"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, ${line} 50%, transparent 100%)`,
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute size-[7px] rounded-full"
                      style={{ background: line, boxShadow: `0 0 0 3px rgba(255,255,255,0.9)` }}
                    />
                    <span
                      aria-hidden
                      className="absolute -bottom-4 h-8 w-32 rounded-full opacity-25 blur-2xl"
                      style={{ background: line }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.dl>

          {/* Shared icon gradients */}
          <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
            <defs>
              {/* userSpaceOnUse: lucide's straight lines/dots have zero-area bounding
                  boxes, which an objectBoundingBox gradient would fail to paint. */}
              <linearGradient
                id="icon-accent"
                gradientUnits="userSpaceOnUse"
                x1="3"
                y1="3"
                x2="21"
                y2="21"
              >
                <stop offset="0%" stopColor="#f2743f" />
                <stop offset="100%" stopColor="#e94e1b" />
              </linearGradient>
              <linearGradient
                id="icon-blue"
                gradientUnits="userSpaceOnUse"
                x1="3"
                y1="3"
                x2="21"
                y2="21"
              >
                <stop offset="0%" stopColor="#3b8ad9" />
                <stop offset="100%" stopColor="#1b5fa8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </Container>
    </section>
  );
}
