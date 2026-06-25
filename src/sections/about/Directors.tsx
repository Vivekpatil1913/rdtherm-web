"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
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
  const [selected, setSelected] = useState<ApiTeamMember | null>(null);
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
            <DirectorCard key={d.id} member={d} index={i} onOpen={() => setSelected(d)} />
          ))}
        </div>
      </Container>

      <DirectorModal member={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

type DirectorCardProps = {
  member: ApiTeamMember;
  index: number;
  onOpen: () => void;
};

function DirectorCard({ member, index, onOpen }: DirectorCardProps) {
  const { name, role, bio, photo } = member;
  const [imgError, setImgError] = useState(false);
  // Show the toggle only when the bio is long enough to be clamped.
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
        {photo && !imgError ? (
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
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
        {/* Clamp + reserve height so every card stays the same height (aligned grid). */}
        <p className="mt-1 line-clamp-5 min-h-[6.6rem] text-[13.5px] leading-[1.55] text-[var(--color-ink-soft)]">
          {bio}
        </p>
        {/* Footer keeps a consistent height whether or not the toggle is shown. */}
        <div className="min-h-[1.25rem]">
          {isLong ? (
            <button
              type="button"
              onClick={onOpen}
              className="self-start pt-0.5 text-[12.5px] font-semibold text-[var(--color-accent)] transition-colors hover:underline underline-offset-4"
            >
              Read more
            </button>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function DirectorModal({ member, onClose }: { member: ApiTeamMember | null; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);

  // Reset the image fallback whenever a different member opens.
  useEffect(() => setImgError(false), [member]);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!member) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [member, onClose]);

  return (
    <AnimatePresence>
      {member && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${member.name} — ${member.role}`}
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.42, ease: EASE_OUT_SOFT }}
            className="relative z-10 grid w-full max-w-[880px] grid-cols-1 overflow-hidden rounded-[24px] bg-white shadow-[0_50px_120px_-40px_rgba(0,0,0,0.55)] sm:grid-cols-[300px_1fr]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-white/90 text-[var(--color-ink)] shadow-md backdrop-blur-sm transition-colors hover:bg-white hover:text-[var(--color-accent)]"
            >
              <X className="size-[18px]" strokeWidth={1.8} />
            </button>

            {/* Portrait */}
            <div className="relative aspect-[4/5] w-full bg-[var(--color-bg-soft)] sm:aspect-auto sm:h-full sm:min-h-[420px]">
              {member.photo && !imgError ? (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="object-cover object-top"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,#efefef_0%,var(--color-bg-soft)_100%)]">
                  <span className="text-[88px] font-bold tracking-tight text-[var(--color-ink)]/10">
                    {initialsOf(member.name)}
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex max-h-[82vh] flex-col overflow-y-auto p-7 sm:p-9">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                {member.role}
              </p>
              <h3 className="mt-2 text-[26px] font-semibold leading-tight tracking-[-0.01em] text-[var(--color-ink)] sm:text-[30px]">
                {member.name}
              </h3>
              <span className="mt-4 h-px w-12 bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
              <p className="mt-5 whitespace-pre-line text-[15px] leading-[1.75] text-[var(--color-ink-soft)]">
                {member.bio}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
