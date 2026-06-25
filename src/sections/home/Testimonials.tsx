"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import {
  fadeUp,
  stagger,
  viewportOnce,
  EASE_OUT_SOFT,
} from "@/animations/motion";
import { heroStats, supportCard } from "@/data/home";
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

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 1).map((w) => w[0]?.toUpperCase()).join("");
}

export function Testimonials({ items = [] }: { items?: ApiTestimonial[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  if (items.length === 0) return null;
  const active = items.find((t) => t.id === activeId) ?? items[0];

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionTag>Build on trust</SectionTag>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-6 max-w-[920px] text-[32px] leading-[1.08] tracking-[-0.02em] sm:text-[44px] lg:text-[64px] font-bold"
          >
            Trusted by <span className="text-[var(--color-accent)]">clients</span>, proven by results
          </motion.h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          <AvatarColumn
            items={items}
            activeId={activeId}
            onSelect={setActiveId}
          />

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col gap-6 rounded-[18px] bg-[var(--color-bg-soft)] p-6 sm:p-8 lg:p-10 min-h-[420px]"
          >
            <div className="flex items-center gap-1 text-[var(--color-accent)]">
              {Array.from({ length: active.rating }).map((_, i) => (
                <Star key={i} className="size-5 fill-current" strokeWidth={0} />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_OUT_SOFT }}
                className="flex flex-1 flex-col"
              >
                <p className="text-[16px] sm:text-[17px] leading-[1.55] text-[var(--color-ink-soft)]">
                  {active.body}
                </p>
                <div className="mt-auto pt-6">
                  <p className="text-[20px] font-semibold text-[var(--color-ink)]">{active.author}</p>
                  <p className="mt-1 text-[13px] text-[var(--color-muted)]">{active.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.15 }}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            <div className="relative overflow-hidden rounded-[18px] aspect-[16/10] min-h-[200px]">
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(135deg,#1f0a06_0%,#3f140c_30%,#7b1d12_55%,#400d08_80%,#1c0606_100%)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_60%,rgba(255,100,40,0.25),transparent_70%)]"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0303] to-transparent"
              />
              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7 text-white">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70">
                  // 2005-2K26 //
                </p>
                <p className="text-[36px] leading-none font-extrabold tracking-tight sm:text-[44px] lg:text-[52px]">
                  MANUFACT<span className="text-[var(--color-accent)]">®</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 rounded-[18px] bg-[var(--color-accent)] p-6 sm:p-7 text-white">
              <Stat value={heroStats.delivery.value} label={heroStats.delivery.label} />
              <Stat value={heroStats.professionals.value} label={heroStats.professionals.label} />
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE_OUT_SOFT, delay: 0.2 }}
            className="lg:col-span-3 relative overflow-hidden rounded-[18px] bg-[var(--color-bg-dark)] p-6 sm:p-8 text-white flex flex-col"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-[radial-gradient(circle,rgba(233,78,27,0.4),transparent_70%)]"
            />
            <ChatBubbleIcon className="relative z-10 size-12" />
            <h3 className="relative z-10 mt-5 text-[22px] sm:text-[24px] font-semibold leading-[1.2]">
              {supportCard.title}
            </h3>
            <p className="relative z-10 mt-3 text-[14px] leading-[1.55] text-white/65">
              {supportCard.body}
            </p>
            <div className="relative z-10 mt-auto pt-6">
              <Button href={supportCard.cta.href} variant="primary">
                {supportCard.cta.label}
              </Button>
            </div>
          </motion.aside>
        </div>
      </Container>
    </section>
  );
}

function AvatarColumn({
  items,
  activeId,
  onSelect,
}: {
  items: ApiTestimonial[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const slotRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const isVertical = window.matchMedia("(min-width: 1024px)").matches;
      if (isVertical) {
        setShowUp(el.scrollTop > 4);
        setShowDown(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
      } else {
        setShowUp(el.scrollLeft > 4);
        setShowDown(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
      }
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Scroll the active avatar fully into view whenever it changes.
  // This guarantees the active ring is never clipped by the scroll edge.
  useEffect(() => {
    const slot = slotRefs.current[activeId];
    if (slot) {
      slot.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  }, [activeId]);

  const scroll = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const isVertical = window.matchMedia("(min-width: 1024px)").matches;
    if (isVertical) {
      el.scrollBy({ top: 80 * dir, behavior: "smooth" });
    } else {
      el.scrollBy({ left: 80 * dir, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
      className="lg:col-span-1 relative rounded-[20px] bg-[var(--color-bg-dark)] p-3 sm:p-4 lg:min-h-[420px]"
    >
      {/* Fade masks — top/bottom (desktop) or left/right (mobile) */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-10 transition-opacity duration-300",
          "left-0 right-0 top-0 h-8 bg-gradient-to-b from-[var(--color-bg-dark)] to-transparent rounded-t-[20px]",
          "max-lg:hidden",
          showUp ? "opacity-100" : "opacity-0",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-10 transition-opacity duration-300",
          "left-0 right-0 bottom-0 h-8 bg-gradient-to-t from-[var(--color-bg-dark)] to-transparent rounded-b-[20px]",
          "max-lg:hidden",
          showDown ? "opacity-100" : "opacity-0",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-10 inset-y-0 left-0 w-6 bg-gradient-to-r from-[var(--color-bg-dark)] to-transparent rounded-l-[20px] transition-opacity duration-300 lg:hidden",
          showUp ? "opacity-100" : "opacity-0",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute z-10 inset-y-0 right-0 w-6 bg-gradient-to-l from-[var(--color-bg-dark)] to-transparent rounded-r-[20px] transition-opacity duration-300 lg:hidden",
          showDown ? "opacity-100" : "opacity-0",
        )}
      />

      {showUp ? (
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Scroll up"
          className="hidden lg:inline-flex absolute z-20 top-1.5 left-1/2 -translate-x-1/2 size-6 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <ChevronUp className="size-3.5" />
        </button>
      ) : null}
      {showDown ? (
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Scroll down"
          className="hidden lg:inline-flex absolute z-20 bottom-1.5 left-1/2 -translate-x-1/2 size-6 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <ChevronDown className="size-3.5" />
        </button>
      ) : null}
      {showUp ? (
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="lg:hidden inline-flex absolute z-20 left-1.5 top-1/2 -translate-y-1/2 size-7 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <ChevronLeft className="size-4" />
        </button>
      ) : null}
      {showDown ? (
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="lg:hidden inline-flex absolute z-20 right-1.5 top-1/2 -translate-y-1/2 size-7 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
        >
          <ChevronRight className="size-4" />
        </button>
      ) : null}

      <div
        ref={scrollRef}
        className="custom-scroll flex flex-row items-center lg:flex-col overflow-x-auto overflow-y-hidden lg:overflow-x-hidden lg:overflow-y-auto max-h-[380px] snap-x lg:snap-y snap-proximity scroll-py-2 scroll-px-2 max-lg:px-8 lg:py-8"
      >
        {items.map((t, i) => {
          const isActive = t.id === activeId;
          return (
            <div
              key={t.id}
              ref={(el) => {
                slotRefs.current[t.id] = el;
              }}
              className="snap-center shrink-0 px-5 py-2 lg:px-2"
            >
              <button
                type="button"
                onClick={() => onSelect(t.id)}
                aria-pressed={isActive}
                aria-label={`Show testimonial from ${t.author}`}
                className={cn(
                  "relative inline-flex items-center justify-center overflow-hidden rounded-full text-[15px] lg:text-[17px] font-semibold text-white transition-all duration-300",
                  "size-12 sm:size-14 lg:size-[3.2rem]",
                  "bg-gradient-to-br " + TONES[i % TONES.length],
                  isActive
                    ? "ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--color-bg-dark)] shadow-[0_8px_24px_-6px_rgba(233,78,27,0.5)]"
                    : "opacity-75 hover:opacity-100 hover:scale-105",
                )}
              >
                {t.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.avatarUrl} alt={t.author} className="size-full object-cover" />
                ) : (
                  <span aria-hidden>{initials(t.author)}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .custom-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .custom-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 61 51"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        fill="#fff"
        d="M45.615 24.253A15.357 15.357 0 0 1 26.32 39.092l-6.214 3.588a1.83 1.83 0 0 1-2.683-2.059l1.588-5.924a15.411 15.411 0 0 1-4.1-10.444c0-8.467 6.887-15.356 15.352-15.356s15.352 6.889 15.352 15.356Zm-19.62 0a1.83 1.83 0 0 0-1.83-1.83h-.003a1.83 1.83 0 1 0 1.833 1.83Zm6.099 0a1.733 1.733 0 0 0-.037-.358 2.122 2.122 0 0 0-.104-.343 1.753 1.753 0 0 0-.397-.593 1.822 1.822 0 0 0-.277-.228 1.764 1.764 0 0 0-.485-.228 1.602 1.602 0 0 0-.351-.07 1.717 1.717 0 0 0-.711.07 1.596 1.596 0 0 0-.331.137 1.986 1.986 0 0 0-.298.197 1.842 1.842 0 0 0-.661 1.596 1.76 1.76 0 0 0 .07.352 1.8 1.8 0 0 0 .137.33 1.948 1.948 0 0 0 .32.433 1.804 1.804 0 0 0 .432.32 2.017 2.017 0 0 0 .505.18 1.841 1.841 0 0 0 1.97-.932 1.972 1.972 0 0 0 .137-.331 1.732 1.732 0 0 0 .08-.532Zm6.101 0a1.83 1.83 0 0 0-1.83-1.83h-.004a1.831 1.831 0 1 0 1.834 1.83Z"
      />
      <path
        fill="url(#chat-bubble-grad)"
        d="M60.498 28.091a8.718 8.718 0 0 1-10.553 8.886 23.48 23.48 0 0 1-15.872 10.4 5.075 5.075 0 1 1-.162-3.686 19.712 19.712 0 0 0 16.127-19.438c0-10.904-8.871-19.775-19.775-19.775-10.904 0-19.775 8.871-19.775 19.775 0 3.372.861 6.688 2.504 9.632.055.098.097.202.124.31A1.826 1.826 0 0 1 12.1 36.5a8.62 8.62 0 0 1-3.751.665 8.717 8.717 0 0 1-8.32-9.074 35.4 35.4 0 0 0-.004-2.533c-.02-.747-.04-1.52-.007-2.325a8.725 8.725 0 0 1 8.76-8.333C12.396 6.619 20.664.817 30.263.817S48.13 6.62 51.75 14.9a8.719 8.719 0 0 1 8.759 8.331c.034.808.014 1.58-.006 2.327-.021.793-.043 1.614-.004 2.534Z"
      />
      <defs>
        <linearGradient
          id="chat-bubble-grad"
          x1="2.647"
          x2="47.201"
          y1="1.444"
          y2="57.342"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F66234" />
          <stop offset="1" stopColor="#C8370B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Splits a stat string into prefix / numeric target / suffix.
 * "98%" → { prefix: "", target: 98, suffix: "%" }
 * "50+" → { prefix: "", target: 50, suffix: "+" }
 * "$1.2K" → { prefix: "$", target: 1.2, suffix: "K" }
 */
function parseStatValue(value: string) {
  const match = value.match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  return {
    prefix: match?.[1] ?? "",
    target: parseFloat(match?.[2] ?? "0"),
    suffix: match?.[3] ?? "",
  };
}

function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [current, setCurrent] = useState(0);
  const { prefix, target, suffix } = parseStatValue(value);

  useEffect(() => {
    if (!inView) {
      setCurrent(0);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setCurrent(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const display = Number.isInteger(target)
    ? Math.round(current).toString()
    : current.toFixed(1);

  return (
    <div ref={ref}>
      <p className="text-[34px] sm:text-[40px] font-bold leading-none tabular-nums">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-[13px] leading-tight text-white/90">{label}</p>
    </div>
  );
}
