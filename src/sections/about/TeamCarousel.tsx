"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { EASE_OUT_SOFT } from "@/animations/motion";
import { teamCarouselSection } from "@/data/about";
import type { ApiTeamMember } from "@/lib/api-types";

type Member = ApiTeamMember;

const BREAKPOINTS = {
  mobile: 0,
  tablet: 720,
  desktop: 1100,
} as const;

function useVisibleCount() {
  const [count, setCount] = useState(4);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= BREAKPOINTS.desktop) setCount(4);
      else if (w >= BREAKPOINTS.tablet) setCount(2);
      else setCount(1.2);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return count;
}

export function TeamCarousel({ members = [] }: { members?: ApiTeamMember[] }) {
  const [start, accent] = teamCarouselSection.heading;
  const visible = useVisibleCount();
  const total = members.length;
  const maxIndex = Math.max(0, Math.ceil(total - visible));

  const [rawIndex, setIndex] = useState(0);
  const index = Math.min(rawIndex, maxIndex);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 220, damping: 32, mass: 0.6 });

  const [slotWidth, setSlotWidth] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (!wrapRef.current) return;
      const w = wrapRef.current.clientWidth;
      setSlotWidth(w / visible);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visible]);

  // Center the active card when fewer than 2 cards fit (mobile peek view).
  // For 2+ visible cards, keep the track left-aligned.
  const centerOffset = visible < 2 ? (slotWidth * (visible - 1)) / 2 : 0;

  useEffect(() => {
    dragX.set(centerOffset - index * slotWidth);
  }, [index, slotWidth, centerOffset, dragX]);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(maxIndex, next));
      setIndex(clamped);
    },
    [maxIndex],
  );

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (slotWidth === 0) return;
      const threshold = slotWidth * 0.18;
      const velocity = info.velocity.x;
      const offset = info.offset.x;
      let next = index;
      if (offset < -threshold || velocity < -500) next = index + 1;
      else if (offset > threshold || velocity > 500) next = index - 1;
      goTo(next);
    },
    [index, slotWidth, goTo],
  );

  const dragConstraints = useMemo(() => {
    if (slotWidth === 0) return { left: 0, right: 0 };
    return {
      left: centerOffset - maxIndex * slotWidth,
      right: centerOffset,
    };
  }, [slotWidth, maxIndex, centerOffset]);

  const progress = maxIndex === 0 ? 1 : (index + 1) / (maxIndex + 1);
  const hasOverflow = maxIndex > 0;

  if (total === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white pt-4 pb-20 lg:pt-6 lg:pb-24">
      <Container size="wide" className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE_OUT_SOFT }}
          >
            <SectionTag>{teamCarouselSection.eyebrow}</SectionTag>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE_OUT_SOFT, delay: 0.05 }}
            className="mt-6 text-[32px] leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)] sm:text-[44px] lg:text-[56px] font-bold"
          >
            {start}
            <span className="text-[var(--color-accent)]">{accent}</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE_OUT_SOFT, delay: 0.12 }}
            className="mt-5 max-w-[640px] text-[14.5px] leading-[1.6] text-[var(--color-ink-soft)] sm:text-[16px]"
          >
            {teamCarouselSection.description}
          </motion.p>
        </div>

        <div className="relative mt-14 lg:mt-16">
          <div
            ref={wrapRef}
            className="relative overflow-visible select-none"
            style={{ touchAction: "pan-y" }}
          >
            <motion.div
              ref={trackRef}
              className="flex cursor-grab active:cursor-grabbing will-change-transform"
              style={{ x: reducedMotion ? dragX : springX }}
              drag="x"
              dragConstraints={dragConstraints}
              dragElastic={0.08}
              dragMomentum={false}
              onDragEnd={onDragEnd}
            >
              {members.map((m) => (
                <div
                  key={m.id}
                  className="shrink-0 px-2 sm:px-3 lg:px-3.5"
                  style={{ width: slotWidth || `${100 / visible}%` }}
                >
                  <TeamCard
                    member={m}
                    isHovered={hoverId === m.id}
                    onHoverStart={() => setHoverId(m.id)}
                    onHoverEnd={() => setHoverId(null)}
                  />
                </div>
              ))}
            </motion.div>
          </div>

        </div>

        {/* Controls — only when total members exceed visible slot count */}
        {hasOverflow && (
          <div className="mt-10 flex items-center justify-center gap-5 sm:mt-12 sm:gap-7">
            <ArrowButton
              ariaLabel="Previous"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
            >
              <ChevronLeft className="size-5" strokeWidth={1.6} />
            </ArrowButton>

            <ProgressBar progress={progress} />

            <ArrowButton
              ariaLabel="Next"
              disabled={index >= maxIndex}
              onClick={() => goTo(index + 1)}
            >
              <ChevronRight className="size-5" strokeWidth={1.6} />
            </ArrowButton>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

type TeamCardProps = {
  member: Member;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

function TeamCard({ member, isHovered, onHoverStart, onHoverEnd }: TeamCardProps) {
  const [tapped, setTapped] = useState(false);
  const active = isHovered || tapped;

  return (
    <motion.article
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onTap={(e) => {
        if ((e as PointerEvent).pointerType === "touch") {
          setTapped((v) => !v);
        }
      }}
      animate={{ y: active ? -8 : 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT_SOFT }}
      className="group relative aspect-[3/4.5] w-full will-change-transform"
      style={{ transformOrigin: "center bottom" }}
    >
      {/* Ambient outer glow — bloom intensifies on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-[3px] rounded-[27px]"
        animate={{ opacity: active ? 1 : 0.2 }}
        transition={{ duration: 0.8, ease: EASE_OUT_SOFT }}
        style={{
          background:
            "linear-gradient(140deg, var(--color-accent) 0%, var(--color-accent-hover) 50%, transparent 75%)",
          filter: "blur(20px)",
          opacity: 0.55,
        }}
      />

      {/* Card surface — animated shadow depth */}
      <motion.div
        className="relative h-full w-full overflow-hidden rounded-[24px]"
        animate={{
          boxShadow: active
            ? "0 38px 90px -32px var(--color-accent), 0 0 0 1px rgba(0,0,0,0.04)"
            : "0 20px 60px -32px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
        transition={{ duration: 0.8, ease: EASE_OUT_SOFT }}
        style={{ background: "var(--color-bg-dark)" }}
      >
        {/* Portrait — always sharp, no fade or wash */}
        <div className="absolute inset-0">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 720px) 80vw, (max-width: 1100px) 45vw, 25vw"
            className="object-cover object-top"
          />
          {/* Minimal bottom legibility shade — only behind the default footer */}
          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        </div>

        {/* Default footer (over image) — gracefully steps aside as overlay rises */}
        <motion.div
          className="absolute inset-x-0 bottom-0 p-5 sm:p-6 will-change-transform"
          animate={{ opacity: active ? 0 : 1, y: active ? -6 : 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
        >
          <h3 className="text-[19px] sm:text-[21px] font-medium leading-tight tracking-[-0.01em] text-white">
            {member.name}
          </h3>
          <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            {member.role}
          </p>
        </motion.div>

        {/* Rising liquid overlay — scaleY 0 → 1 from bottom origin */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-bottom will-change-transform"
          initial={false}
          animate={{ scaleY: active ? 1 : 0 }}
          transition={{ duration: 0.85, ease: EASE_OUT_SOFT }}
          style={{
            background:
              "linear-gradient(180deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
          }}
        />

        {/* Soft top highlight that climbs with the overlay — adds liquid feel */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-bottom will-change-transform"
          initial={false}
          animate={{ scaleY: active ? 1 : 0 }}
          transition={{ duration: 0.95, ease: EASE_OUT_SOFT }}
          style={{
            background:
              "radial-gradient(85% 55% at 50% 0%, rgba(255,255,255,0.18) 0%, transparent 60%), radial-gradient(70% 50% at 50% 105%, rgba(0,0,0,0.28) 0%, transparent 70%)",
          }}
        />

        {/* Slow reflective sheen — soft horizontal sweep while hovered */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 will-change-transform"
          initial={false}
          animate={{ opacity: active ? 0.35 : 0, x: active ? "15%" : "-25%" }}
          transition={{ duration: 1.4, ease: EASE_OUT_SOFT }}
          style={{
            background:
              "linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.18) 50%, transparent 62%)",
          }}
        />

        {/* Hover content — staggered upward reveal, synced with the rising overlay */}
        <AnimatePresence>
          {active && (
            <motion.div
              key="hover"
              className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col p-6 sm:p-7"
            >
              <motion.span
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.22 }}
                className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent-soft)]"
              >
                {member.role}
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.75, ease: EASE_OUT_SOFT, delay: 0.3 }}
                className="mt-2 text-[22px] sm:text-[24px] font-medium leading-tight tracking-[-0.01em] text-white"
              >
                {member.name}
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.65, ease: EASE_OUT_SOFT, delay: 0.38 }}
                className="mt-3 h-px w-10 origin-left bg-gradient-to-r from-white/85 to-transparent"
              />
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.8, ease: EASE_OUT_SOFT, delay: 0.46 }}
                className="mt-4 text-[13.5px] leading-[1.6] text-white/90 sm:text-[14px]"
              >
                {member.bio}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top hairline */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />
      </motion.div>
    </motion.article>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function ArrowButton({
  children,
  onClick,
  disabled,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className="group relative grid size-11 place-items-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink)] transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[var(--color-line)] disabled:hover:bg-white disabled:hover:text-[var(--color-ink)]"
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-disabled:opacity-0"
        style={{ boxShadow: "0 6px 24px -8px rgba(233,78,27,0.35)" }}
      />
      {children}
    </button>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  const mv = useMotionValue(progress);
  useEffect(() => {
    mv.set(progress);
  }, [progress, mv]);
  const smooth = useSpring(mv, { stiffness: 140, damping: 24, mass: 0.5 });
  const widthPct = useTransform(smooth, (v) => `${Math.max(8, Math.min(100, v * 100))}%`);

  return (
    <div className="relative h-px w-40 overflow-hidden rounded-full bg-[var(--color-line)] sm:w-56 lg:w-72">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: widthPct,
          background: "linear-gradient(to right, var(--color-accent), var(--color-accent-hover))",
        }}
      />
    </div>
  );
}

