"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { directorsSection } from "@/data/about";
import type { ApiTeamMember } from "@/lib/api-types";

/** Initials fallback so a missing/broken photo never renders an empty box. */
function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

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
          className="grid grid-cols-1 lg:grid-cols-12 items-start gap-y-6 gap-x-12"
        >
          <motion.h2
            variants={fadeUp}
            className="lg:col-span-7 text-[32px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] lg:text-[56px] font-bold"
          >
            {start}
            <span className="text-[var(--color-accent)]">{accent}</span>.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 max-w-[460px] text-[15px] leading-[1.6] text-[var(--color-ink-soft)] sm:text-[18px]"
          >
            {directorsSection.description}
          </motion.p>
        </motion.div>

        {/* Two per row (6/6). With justify-center a lone 3rd card centres below. */}
        <div className="mt-12 flex flex-wrap items-stretch justify-center gap-6 lg:gap-7">
          {members.map((d, i) => (
            <DirectorCard key={d.id} member={d} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function DirectorCard({ member, index }: { member: ApiTeamMember; index: number }) {
  const { name, role, bio, photo } = member;
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.08 + index * 0.08 }}
      className="group grid w-full grid-cols-1 overflow-hidden rounded-[16px] border border-[var(--color-line)] bg-white shadow-[0_2px_6px_-2px_rgba(16,24,40,0.06),0_14px_36px_-18px_rgba(16,24,40,0.14)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_4px_10px_-4px_rgba(16,24,40,0.08),0_28px_60px_-28px_rgba(16,24,40,0.24)] sm:grid-cols-[210px_1fr] lg:w-[calc(50%-0.875rem)]"
    >
      {/* Portrait — left on tablet+, on top on mobile */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--color-bg-soft)] sm:aspect-auto sm:h-full sm:min-h-[300px]">
        {photo && !imgError ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 210px"
            className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,#efefef_0%,var(--color-bg-soft)_100%)]">
            <span className="text-[64px] font-bold tracking-tight text-[var(--color-ink)]/10">
              {initialsOf(name)}
            </span>
          </div>
        )}
        <span
          aria-hidden
          className="absolute left-0 bottom-0 top-auto h-[3px] w-full origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-500 group-hover:scale-x-100 sm:top-0 sm:h-full sm:w-[3px] sm:origin-top sm:scale-x-100 sm:scale-y-0 sm:group-hover:scale-y-100"
        />
      </div>

      {/* Details — right on tablet+ */}
      <div className="flex flex-col p-6 lg:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
          {role}
        </p>
        <h3 className="mt-2 text-[22px] font-bold leading-tight tracking-[-0.01em] text-[var(--color-ink)] lg:text-[24px]">
          {name}
        </h3>
        <span aria-hidden className="mt-4 h-px w-12 bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
        <p className="mt-4 whitespace-pre-line text-[14px] leading-[1.65] text-[var(--color-ink-soft)]">
          {bio}
        </p>
      </div>
    </motion.article>
  );
}
