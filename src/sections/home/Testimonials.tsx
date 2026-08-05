"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import type { ApiTestimonial } from "@/lib/api-types";
import { cn } from "@/lib/cn";

const TONES = [
  "from-[#f5b894] to-[#c97d4e]",
  "from-[#b8c4d6] to-[#5d6b85]",
  "from-[#dabc8a] to-[#7e5a36]",
  "from-[#e4c4d9] to-[#8c5070]",
  "from-[#a3b7a0] to-[#4d6447]",
  "from-[#f1c4a2] to-[#a86838]",
];

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 48;
const GAP_SM = 24; // gap-6
const GAP_LG = 28; // lg:gap-7

// The track has to be positioned before paint, otherwise the first frame shows the
// wrong copy of the looped list.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export function Testimonials({ items = [] }: { items?: ApiTestimonial[] }) {
  const total = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [metrics, setMetrics] = useState({ cardWidth: 0, gap: GAP_SM, perView: 1 });
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const controls = useAnimationControls();

  // Slide position in "virtual" space — it can drift outside [0, total) while an
  // animation is running so the track always travels in the clicked direction.
  // It is snapped back (without animating) once the slide settles.
  const slot = useRef(0);
  const stepRef = useRef(0);
  const perViewRef = useRef(1);
  const seq = useRef(0);

  // Middle copy of the tripled list — guarantees a neighbour on both sides.
  const base = total;
  const offsetFor = useCallback(
    (v: number) => base + v - (perViewRef.current >= 3 ? 1 : 0),
    [base],
  );

  // Measure one card so the track can be translated in exact pixels.
  useIsomorphicLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      const isLg = window.matchMedia("(min-width: 1024px)").matches;
      const perView = Math.min(isLg ? 3 : 1, Math.max(total, 1));
      const gap = isLg ? GAP_LG : GAP_SM;
      const cardWidth = (el.clientWidth - gap * (perView - 1)) / perView;
      perViewRef.current = perView;
      stepRef.current = cardWidth + gap;
      setMetrics({ cardWidth, gap, perView });
      controls.set({ x: -offsetFor(slot.current) * stepRef.current });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [controls, offsetFor, total]);

  const go = useCallback(
    async (dir: 1 | -1) => {
      if (total < 2) return;
      const target = slot.current + dir;
      slot.current = target;
      setIndex(((target % total) + total) % total);

      const token = ++seq.current;
      await controls.start({
        x: -offsetFor(target) * stepRef.current,
        transition: { duration: 0.6, ease: EASE_OUT_SOFT },
      });
      // Re-centre on the middle copy — visually identical, so the jump is unseen.
      if (token !== seq.current) return;
      const normalised = ((target % total) + total) % total;
      if (normalised !== target) {
        slot.current = normalised;
        controls.set({ x: -offsetFor(normalised) * stepRef.current });
      }
    },
    [controls, offsetFor, total],
  );

  // Autoplay — paused on hover/focus and when the user prefers reduced motion.
  useEffect(() => {
    if (paused || total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => void go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [go, paused, total]);

  if (total === 0) return null;

  // Three copies so the viewport always has a card to slide in from either side.
  const looped = [...items, ...items, ...items];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fdf9f6_100%)] py-10 lg:py-14">
      {/* Decorative arcs (top-left) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[220px] -top-[190px] size-[520px] rounded-full border border-[var(--color-accent)]/12 sm:size-[640px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[300px] -top-[300px] size-[700px] rounded-full border border-[var(--color-accent)]/[0.07] sm:size-[880px]"
      />
      {/* Decorative halftone (top-right) */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-6 hidden h-[170px] w-[260px] sm:block lg:h-[210px] lg:w-[340px]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(233,78,27,0.38) 1.7px, transparent 1.7px)",
          backgroundSize: "17px 17px",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))",
          maskImage: "linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))",
        }}
      />

      <Container size="wide" className="relative z-10">
        <motion.div
          variants={stagger(0.05, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionTag>Testimonials</SectionTag>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-4 max-w-[900px] text-[32px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px]"
          >
            What Our <span className="text-[var(--color-accent)]">Clients</span> Say
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-[620px] text-[15px] leading-[1.6] text-[var(--color-muted)] sm:text-[16px]"
          >
            Real stories from real partners who trust our expertise and deliver results
            together.
          </motion.p>
        </motion.div>

        <div
          className="relative mt-8 lg:mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            touchStartX.current = null;
            if (start == null) return;
            const delta = (e.changedTouches[0]?.clientX ?? start) - start;
            if (Math.abs(delta) < SWIPE_THRESHOLD) return;
            go(delta < 0 ? 1 : -1);
          }}
        >
          {total > 1 ? (
            <>
              <ArrowButton
                dir="prev"
                onClick={() => go(-1)}
                className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 lg:inline-flex"
              />
              <ArrowButton
                dir="next"
                onClick={() => go(1)}
                className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 lg:inline-flex"
              />
            </>
          ) : null}

          <div className="mx-auto lg:px-[88px] xl:px-[104px]">
            {/* -my-8/py-8 keeps the active card's glow from being clipped */}
            <div ref={viewportRef} className="-my-8 overflow-hidden py-8">
              <motion.div
                animate={controls}
                className="flex items-stretch will-change-transform"
                style={{ gap: metrics.gap }}
              >
                {looped.map((item, i) => (
                  <div
                    key={`${item.id}-${i}`}
                    className="shrink-0"
                    style={{ width: metrics.cardWidth || "100%" }}
                    aria-hidden={i < base || i >= base + total}
                  >
                    <TestimonialCard
                      item={item}
                      index={i % total}
                      isActive={i % total === index}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {total > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-5 lg:hidden">
            <ArrowButton dir="prev" onClick={() => go(-1)} className="lg:hidden" />
            <ArrowButton dir="next" onClick={() => go(1)} className="lg:hidden" />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function ArrowButton({
  dir,
  onClick,
  className,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  const Icon = dir === "prev" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-accent)] shadow-[0_10px_30px_-12px_rgba(17,17,17,0.28)] ring-1 ring-black/[0.04] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white hover:shadow-[0_14px_32px_-12px_rgba(233,78,27,0.55)] lg:size-14",
        className,
      )}
    >
      <Icon className="size-5" strokeWidth={2} />
    </button>
  );
}

function TestimonialCard({
  item,
  index,
  isActive = false,
  className,
}: {
  item: ApiTestimonial;
  index: number;
  isActive?: boolean;
  className?: string;
}) {
  const rating = Math.max(0, Math.min(5, Math.round(item.rating ?? 5)));

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[20px] p-5 sm:p-6 lg:min-h-[300px]",
        isActive
          ? "border-[1.5px] border-[var(--color-accent)] bg-white shadow-[0_24px_60px_-28px_rgba(233,78,27,0.45)]"
          : "border border-transparent bg-[#f7f7f6]",
        className,
      )}
    >
      {/* Fixed-height header keeps the quote text on the same line across all cards */}
      <div className="flex h-8 items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-[var(--color-accent)]">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="size-[18px]" fill="currentColor" strokeWidth={0} aria-hidden />
          ))}
          <span className="sr-only">{rating} out of 5 stars</span>
        </div>
        <span
          aria-hidden
          className={cn(
            "select-none font-serif text-[46px] leading-[0.55]",
            isActive ? "text-[var(--color-accent)]" : "text-[var(--color-accent)]/25",
          )}
        >
          &rdquo;
        </span>
      </div>

      <p
        className={cn(
          "mt-3.5 text-[15px] leading-[1.6] sm:text-[16px]",
          isActive ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]",
        )}
      >
        {item.body}
      </p>

      <div className="mt-auto pt-5">
        <div className="border-t border-[var(--color-line)]/70 pt-4">
          <div className="flex items-center gap-3.5">
            <span
              className={cn(
                "relative inline-flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br text-[15px] font-semibold text-white ring-2 ring-[var(--color-accent)]/70 ring-offset-2",
                isActive ? "ring-offset-white" : "ring-offset-[#f7f7f6]",
                TONES[index % TONES.length],
              )}
            >
              {item.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.avatarUrl}
                  alt={item.author}
                  className="size-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span aria-hidden>{initials(item.author)}</span>
              )}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[16px] font-semibold text-[var(--color-ink)]">
                {item.author}
              </p>
              <p className="mt-0.5 truncate text-[13.5px] text-[var(--color-muted)]">
                {item.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
