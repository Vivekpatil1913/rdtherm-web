"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/data/about";

type Milestone = (typeof timeline)[number];

const EASE = [0.22, 1, 0.36, 1] as const;

function deriveHighlights(item: Milestone): string[] {
  const text = item.body.replace(/\s+/g, " ").trim();
  const primary = text
    .split(/\.\s+|\s—\s|\s–\s/)
    .map((s) => s.replace(/[.\s]+$/, "").trim())
    .filter((s) => s.length > 6);
  if (primary.length >= 2) return primary;
  const compound = text.split(/,\s+and\s+/i);
  if (compound.length >= 2) {
    return compound
      .map((s) => s.replace(/[.\s]+$/, "").trim())
      .filter((s) => s.length > 6);
  }
  return [text.replace(/\.$/, "")];
}

type StripMetrics = { slot: number; visible: number };

function readStripMetrics(): StripMetrics {
  if (typeof window === "undefined") return { slot: 84, visible: 12 };
  const w = window.innerWidth;
  if (w >= 1280) return { slot: 84, visible: 12 };
  if (w >= 1024) return { slot: 76, visible: 11 };
  if (w >= 640) return { slot: 68, visible: 9 };
  return { slot: 52, visible: 6 };
}

export function MilestonesInMotion() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [strip, setStrip] = useState<StripMetrics>({ slot: 84, visible: 12 });
  const N = timeline.length;

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const sectionEl = sectionRef.current;
    const stageEl = stageRef.current;
    if (!sectionEl || !stageEl) return;

    // Pinned scroll-driven storytelling only on desktop. On mobile the section
    // is a regular-flow component sized to its content; arrows drive milestone
    // changes directly via setActiveIdx (see goTo).
    const mq = window.matchMedia("(min-width: 1024px)");
    let st: ScrollTrigger | null = null;
    const snapTargets = Array.from({ length: N }, (_, i) => i / (N - 1));

    const build = () => {
      st?.kill(true);
      st = null;
      if (!mq.matches) return;
      st = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: `+=${(N - 1) * 80}%`,
        pin: stageEl,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1.1,
        snap: {
          snapTo: snapTargets,
          duration: { min: 0.25, max: 0.7 },
          ease: "power3.inOut",
          delay: 0.08,
        },
        onUpdate: (self) => {
          const idx = Math.min(
            N - 1,
            Math.max(0, Math.round(self.progress * (N - 1))),
          );
          setActiveIdx((prev) => (prev !== idx ? idx : prev));
        },
      });
    };

    const onResize = () => {
      build();
      ScrollTrigger.refresh();
      setStrip(readStripMetrics());
    };
    setStrip(readStripMetrics());
    build();
    window.addEventListener("resize", onResize);

    // The `resize` event is unreliable when DevTools docks/undocks. A
    // ResizeObserver on the document element catches those layout changes
    // (and any other viewport-size mutation) and reissues ScrollTrigger.refresh
    // so the pin recomputes against the new viewport. rAF-debounced so a
    // drag-resize doesn't spam refresh.
    let rafId: number | null = null;
    const ro = new ResizeObserver(() => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = null;
        ScrollTrigger.refresh();
        setStrip(readStripMetrics());
      });
    });
    ro.observe(document.documentElement);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
      ro.disconnect();
      st?.kill(true);
    };
  }, [N]);

  function goTo(target: number) {
    if (typeof window === "undefined") return;
    const idx = Math.min(N - 1, Math.max(0, target));
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) {
      // No pin on mobile — set state directly. The section flows normally.
      setActiveIdx(idx);
      return;
    }
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;
    const rect = sectionEl.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const totalScroll = sectionEl.offsetHeight - window.innerHeight;
    const ratio = N === 1 ? 0 : idx / (N - 1);
    const y = sectionTop + totalScroll * ratio;
    const lenis = (window as unknown as { lenis?: { scrollTo: (y: number) => void } })
      .lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(y);
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  const item = timeline[activeIdx];
  const highlights = useMemo(() => deriveHighlights(item), [item]);

  // Sliding-window: clamp how far the strip slides so it never empties on the
  // right. After the active year passes the initial window's last slot, the
  // strip starts shifting left by exactly one slot per advance.
  const maxShift = Math.max(0, N - strip.visible);
  const shiftIdx = Math.min(activeIdx, maxShift);
  const stripTranslate = -shiftIdx * strip.slot;

  return (
    <section ref={sectionRef} className="relative bg-[var(--color-bg-dark)] text-white isolate mb-12 sm:mb-16 lg:mb-20">
      <div
        ref={stageRef}
        className="relative flex w-full flex-col overflow-hidden lg:h-screen lg:will-change-transform"
      >
        {/* Ambient accent glow behind the year — sits at z-0 so all content
            blocks (z-10) render over it. Pointer-events:none so it never
            blocks clicks on the strip or arrows. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[55vh] w-[80vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(233,78,27,0.12) 0%, rgba(233,78,27,0.05) 40%, transparent 72%)",
            filter: "blur(40px)",
          }}
        />

        {/* ── Header band ────────────────────────────────────────────────── */}
        <header className="relative z-10 shrink-0 pt-6 sm:pt-10 lg:pt-24">
          <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-16">
            {/* Pill tag — bullet + label, matching the site's section-tag pattern */}
            <div className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 transition-all duration-500 hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/[0.06] hover:shadow-[0_0_28px_rgba(233,78,27,0.18)]">
              <span
                aria-hidden
                className="block size-1.5 rounded-full bg-[var(--color-accent)] transition-all duration-500 group-hover:shadow-[0_0_8px_rgba(233,78,27,0.9)]"
              />
              <span className="text-[11px] sm:text-[12px] lg:text-[13px] font-medium tracking-[0.04em] text-white">
                Milestones in Motion
              </span>
            </div>

            {/* Single-line headline with accent last word */}
            <h2 className="mt-4 sm:mt-5 lg:mt-7 leading-[1.05] tracking-[-0.03em] font-bold text-white text-[clamp(24px,9vh,32px)] sm:text-[clamp(24px,9vh,46px)] lg:text-[clamp(24px,9vh,60px)] xl:text-[clamp(24px,9vh,76px)]">
              Three Decades of{" "}
              <span className="text-[var(--color-accent)]">Engineering</span>
            </h2>
          </div>
        </header>

        {/* ── Center stage: year + content. On mobile the middle has natural
              height so heading → year → bullets pack tightly at the top.
              On desktop it expands (lg:flex-1) and centres the block for the
              cinematic vertical balance. ─────────────────────────────────── */}
        <div className="relative z-10 flex w-full justify-center pt-5 sm:pt-7 lg:pt-0 lg:flex-1 lg:min-h-0 lg:items-center">
          <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col items-center text-center">
              {/* Year row with symmetric horizontal tick marks */}
              <div className="relative flex w-full items-center justify-center">
                <TickRow side="left" />
                <div className="relative mx-4 sm:mx-6 lg:mx-10">
                  <RollingYear year={item.year} />
                </div>
                <TickRow side="right" />
              </div>

              {/* Content — auto-height so short lists don't reserve empty space */}
              <div className="relative mt-4 sm:mt-6 lg:mt-9 w-full max-w-2xl">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.ul
                    key={`${item.year}-c`}
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
                    className="flex flex-col items-start gap-2.5 text-left"
                  >
                    {highlights.map((line, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          ease: EASE,
                          delay: 0.18 + i * 0.08,
                        }}
                        className="relative flex w-full items-start gap-3 pl-1 text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.5] text-white/85"
                      >
                        <span
                          aria-hidden
                          className="mt-[6px] inline-block shrink-0 text-white/85"
                          style={{ fontSize: "0.85em", lineHeight: 1 }}
                        >
                          ✦
                        </span>
                        <span>{line}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile/tablet bottom: progress bar + centered arrows ─────── */}
        <div className="relative z-10 shrink-0 pt-7 pb-6 sm:pt-9 sm:pb-8 lg:hidden">
          <div className="mx-auto w-full max-w-[420px] px-5 sm:px-8">
            <div className="relative mx-auto mb-5 h-[3px] w-full overflow-hidden rounded-full bg-white/12">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${(activeIdx / Math.max(1, N - 1)) * 100}%`,
                  background:
                    "linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
                  transition:
                    "width 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                  willChange: "width",
                }}
              />
            </div>
            <div className="flex items-center justify-center gap-7 sm:gap-9">
              <NavArrow
                direction="left"
                disabled={activeIdx === 0}
                onClick={() => goTo(activeIdx - 1)}
              />
              <NavArrow
                direction="right"
                disabled={activeIdx === N - 1}
                onClick={() => goTo(activeIdx + 1)}
              />
            </div>
          </div>
        </div>

        {/* ── Desktop bottom: arrows + sliding-window year strip ───────── */}
        <div className="relative z-10 hidden shrink-0 pb-9 lg:block lg:pb-10">
          <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3 sm:gap-4">
              <NavArrow
                direction="left"
                disabled={activeIdx === 0}
                onClick={() => goTo(activeIdx - 1)}
              />

              <div
                className="relative flex-1 overflow-hidden"
                style={
                  {
                    // Soft fade on left/right edges so years entering/leaving
                    // don't pop in/out at the container boundary.
                    maskImage:
                      "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
                  } as React.CSSProperties
                }
              >
                <div
                  className="flex items-center"
                  style={{
                    transform: `translateX(${stripTranslate}px)`,
                    transition:
                      "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                    willChange: "transform",
                  }}
                >
                  {timeline.map((m, i) => {
                    const isActive = i === activeIdx;
                    return (
                      <button
                        key={m.year}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Go to ${m.year}`}
                        aria-current={isActive ? "true" : undefined}
                        style={{ width: `${strip.slot}px` }}
                        className={
                          "shrink-0 text-center text-[12px] sm:text-[13px] lg:text-[14px] font-medium tracking-[0.01em] transition-all duration-500 " +
                          (isActive
                            ? "text-[var(--color-accent)]"
                            : "text-white/40 hover:text-white/75")
                        }
                      >
                        {m.year}
                      </button>
                    );
                  })}
                </div>
              </div>

              <NavArrow
                direction="right"
                disabled={activeIdx === N - 1}
                onClick={() => goTo(activeIdx + 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── helpers ───────────────────────── */

/* The huge centred year — each digit rolls independently. Digits that didn't
   change between transitions keep the same React key and therefore stay
   stationary; only the digits that actually changed flip via AnimatePresence. */
function RollingYear({ year }: { year: string }) {
  return (
    <span
      aria-label={year}
      className="inline-flex font-bold leading-none tracking-normal text-[clamp(56px,20vh,84px)] sm:text-[clamp(56px,20vh,112px)] lg:text-[clamp(56px,20vh,128px)] xl:text-[clamp(56px,20vh,144px)]"
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {year.split("").map((digit, i) => (
        <RollingDigit key={i} digit={digit} />
      ))}
    </span>
  );
}

function RollingDigit({ digit }: { digit: string }) {
  // `background-clip: text` only clips an element's own text — not the text
  // of an absolutely-positioned descendant. So the gradient lives on each
  // rolling digit itself; the wrapper just reserves layout space + clips
  // overflow for the roll.
  const digitStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(180deg, #ffffff 0%, #f5e4d3 36%, #c97343 78%, #3a1809 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  return (
    <span
      aria-hidden
      className="relative inline-block overflow-hidden align-baseline"
      style={{ lineHeight: 1.15 }}
    >
      {/* Ghost reserves the slot's width + height. Painted but gradient-clipped
          so it stays a sized, invisible spacer. */}
      <span style={{ ...digitStyle, opacity: 0 }}>{digit}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={digit}
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="absolute inset-0 flex items-center justify-center"
          style={digitStyle}
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function NavArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous milestone" : "Next milestone"}
      onClick={onClick}
      disabled={disabled}
      className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-full border border-white/40 bg-transparent text-white/85 transition-all duration-300 hover:border-white hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: direction === "left" ? "rotate(180deg)" : undefined,
        }}
      >
        <path d="M3 8h10" />
        <path d="M9 4l4 4-4 4" />
      </svg>
    </button>
  );
}

/* Horizontal row of small vertical tick marks on either side of the year.
   Uneven heights/gaps give it a cinematic, hand-placed feel. */
function TickRow({ side }: { side: "left" | "right" }) {
  const pattern: Array<[number, number]> = [
    [18, 10],
    [22, 14],
    [16, 22],
    [20, 12],
    [18, 18],
    [22, 10],
    [16, 14],
    [20, 0],
  ];
  const ticks = side === "left" ? [...pattern].reverse() : pattern;

  return (
    <div
      aria-hidden
      className="hidden sm:flex h-[clamp(70px,20vh,120px)] lg:h-[clamp(70px,20vh,140px)] xl:h-[clamp(70px,20vh,160px)] flex-1 items-center"
      style={{ justifyContent: side === "left" ? "flex-end" : "flex-start" }}
    >
      <div className="flex items-center">
        {ticks.map(([h, gap], i) => (
          <span
            key={i}
            className="block w-px bg-white/55"
            style={{
              height: `${h}px`,
              marginRight: side === "right" ? `${gap}px` : undefined,
              marginLeft: side === "left" ? `${gap}px` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}
