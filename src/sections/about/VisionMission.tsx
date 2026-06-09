"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";
import { visionMission } from "@/data/about";

export function VisionMission() {
  return (
    <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionTag>Where we&apos;re headed</SectionTag>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-[820px] text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
          >
            Vision & <span className="text-[var(--color-accent)]">Mission</span>
          </motion.h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <Card
            title={visionMission.vision.title}
            body={visionMission.vision.body}
            tone="dark"
          />
          <Card
            title={visionMission.mission.title}
            body={visionMission.mission.body}
            tone="accent"
          />
        </div>
      </Container>
    </section>
  );
}

type CardTone = "dark" | "accent";

const TONE_MAP: Record<CardTone, string> = {
  dark:
    "bg-[linear-gradient(140deg,#1f1f1f_0%,#101010_55%,#000000_100%)] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.65)]",
  accent:
    "bg-[linear-gradient(140deg,#f5612e_0%,#e94e1b_55%,#b8390f_100%)] shadow-[0_30px_80px_-40px_rgba(233,78,27,0.55)]",
};

const HIGHLIGHT_MAP: Record<CardTone, string> = {
  dark: "bg-[radial-gradient(120%_60%_at_20%_10%,rgba(233,78,27,0.18),transparent_55%)]",
  accent: "bg-[radial-gradient(120%_60%_at_20%_10%,rgba(255,255,255,0.22),transparent_55%)]",
};

function Card({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone: CardTone;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-[18px] p-8 lg:p-12 text-white ${TONE_MAP[tone]}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${HIGHLIGHT_MAP[tone]}`}
      />
      <h3 className="relative z-10 text-[28px] sm:text-[34px] lg:text-[40px] font-bold leading-tight">
        {title}
      </h3>
      <p className="relative z-10 mt-5 text-justify text-[15px] sm:text-[16px] leading-[1.6] text-white/90 max-w-[640px]">
        {body}
      </p>
    </motion.article>
  );
}
