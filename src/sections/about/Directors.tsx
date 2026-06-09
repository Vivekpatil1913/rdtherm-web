"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { directorsSection } from "@/data/about";
import type { ApiTeamMember } from "@/lib/api-types";

export function Directors({ members = [] }: { members?: ApiTeamMember[] }) {
  const [start, accent] = directorsSection.heading;
  if (members.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 items-end gap-y-6 gap-x-12"
        >
          <div className="lg:col-span-7">
            <motion.div variants={fadeUp}>
              <SectionTag>{directorsSection.eyebrow}</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] lg:text-[56px] font-bold"
            >
              {start}
              <span className="text-[var(--color-accent)]">{accent}</span>.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 max-w-[460px] text-[15px] leading-[1.6] text-[var(--color-ink-soft)] sm:text-[16px]"
          >
            {directorsSection.description}
          </motion.p>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-start justify-center gap-6 lg:gap-7">
          {members.map((d, i) => (
            <DirectorCard key={d.id} name={d.name} role={d.role} bio={d.bio} photo={d.photo} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

type DirectorCardProps = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  index: number;
};

function DirectorCard({ name, role, bio, photo, index }: DirectorCardProps) {
  const [expanded, setExpanded] = useState(false);
  // Only show the toggle when the bio is long enough to be clamped.
  const isLong = bio.length > 180;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.08 + index * 0.08 }}
      className="group relative flex w-full flex-col overflow-hidden rounded-[16px] border border-[var(--color-line)] bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.22)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.3125rem)]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-soft)]">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent opacity-90"
        />
        <span
          aria-hidden
          className="absolute left-0 right-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-500 group-hover:scale-x-100"
        />
      </div>

      <div className="flex flex-col gap-2 p-5 lg:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
          {role}
        </p>
        <h3 className="text-[19px] sm:text-[20px] lg:text-[21px] font-semibold leading-tight tracking-[-0.01em] text-[var(--color-ink)]">
          {name}
        </h3>
        <p
          className={
            "mt-1 text-[13.5px] leading-[1.55] text-[var(--color-ink-soft)] " +
            (expanded ? "" : "line-clamp-5")
          }
        >
          {bio}
        </p>
        {isLong ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="self-start pt-0.5 text-[12.5px] font-semibold text-[var(--color-accent)] transition-colors hover:underline underline-offset-4"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        ) : null}
      </div>
    </motion.article>
  );
}
