"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/animations/motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { journeyMilestones, journeySection } from "@/data/about";

/* =====================================================================
   JourneyTimeline — auto-advancing milestone story.

   Each milestone owns the screen for a fixed dwell (HOLD_MS) so the copy
   can be read at a natural pace, then the timeline steps to the next one
   on its own: the rail marker glides down and the panel crossfades. After
   the last milestone it loops back to the first. Hovering the section
   pauses the timer so a reader can linger.

   The years on the rail are also buttons: clicking one jumps straight to
   that milestone and restarts the dwell, so a manual pick always gets a
   full read before the timeline resumes stepping on its own.

   Layout lives in JourneyTimeline.css — see the note at the top of that
   file for why it is plain CSS rather than utilities. It is pulled in via
   globals.css, not imported here.
   ===================================================================== */

/* How long each milestone stays on screen before advancing. */
const HOLD_MS = 3000;

const N = journeyMilestones.length;

/* Rail colours are animated by framer-motion, so they have to be literals
   rather than var() references. */
const ACCENT = "#e94e1b";
const RAIL_IDLE = "#d9d9d6";
const INK = "#111111";
const MUTED = "#6b6b6b";

const [headStart, headAccent] = journeySection.heading;

export function JourneyTimeline() {
  /* Which milestone owns the screen. Advances on a timer, loops at the end. */
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  /* Bumped on every manual pick purely to re-run the timer effect, so the
     clicked milestone gets a full HOLD_MS instead of whatever was left. */
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % N), HOLD_MS);
    return () => clearInterval(id);
  }, [paused, cycle]);

  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  /* Rail marker position, 0→1 of the rail height. Follows `active`, so the
     fill and glider slide down as each milestone lands. */
  const railPos = N > 1 ? active / (N - 1) : 0;
  const item = journeyMilestones[active];

  return (
    <section
      className="jt"
      aria-label="Our journey"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="jt-stage">
        {/* The heading is deliberately outside the animated stack: it is the
            one thing that must not move while the milestones swap beneath
            it. */}
        <header className="jt-head">
          <div className="jt-eyebrow">
            <SectionTag>{journeySection.eyebrow}</SectionTag>
          </div>
          <h2 className="jt-heading">
            {headStart}
            <span className="jt-heading-accent">{headAccent}</span>.
          </h2>
          <p className="jt-sub">{journeySection.description}</p>

          {/* Phone-only milestone picker. The vertical rail collapses below
              640px — it is too narrow to carry year labels — so the years
              move up here as a tappable row instead. */}
          <nav className="jt-chips" aria-label="Jump to milestone">
            {journeyMilestones.map((m, i) => (
              <button
                key={m.year}
                type="button"
                className="jt-chip"
                onClick={() => select(i)}
                aria-current={i === active ? "true" : undefined}
                aria-label={`${m.year} — ${m.title}`}
              >
                {m.year}
              </button>
            ))}
          </nav>
        </header>

        {/* ----------------------------------------------------------- body */}
        <div className="jt-grid">
          <div className="jt-rail">
            <div className="jt-rail-track" aria-hidden="true">
              <motion.span
                className="jt-rail-fill"
                animate={{ scaleY: railPos }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              />
              <motion.span
                className="jt-glider"
                animate={{ top: `${railPos * 100}%` }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
              />
            </div>

            <ol className="jt-ticks">
              {journeyMilestones.map((m, i) => (
                <li key={m.year} className="jt-tick">
                  <button
                    type="button"
                    className="jt-tick-btn"
                    onClick={() => select(i)}
                    aria-current={i === active ? "true" : undefined}
                    aria-label={`${m.year} — ${m.title}`}
                  >
                    <motion.span
                      className="jt-dot"
                      animate={{
                        scale: i === active ? 1 : 0.55,
                        backgroundColor: i <= active ? ACCENT : RAIL_IDLE,
                      }}
                      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                    />
                    <motion.span
                      className="jt-tick-year"
                      animate={{
                        opacity: i === active ? 1 : 0.34,
                        x: i === active ? 4 : 0,
                        color: i === active ? INK : MUTED,
                      }}
                      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                    >
                      {m.year}
                    </motion.span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="jt-panels">
            <AnimatePresence mode="wait">
              <motion.article
                key={item.year}
                className="jt-panel"
                initial={{ opacity: 0, y: 36, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -28, scale: 0.99 }}
                transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              >
                <div className="jt-copy">
                  <span className="jt-year">{item.year}</span>
                  <h3 className="jt-title">{item.title}</h3>
                  <p className="jt-text">{item.body}</p>
                </div>

                <div className="jt-art">
                  <Image
                    src={item.image}
                    alt={`${item.year} — ${item.title}`}
                    fill
                    sizes="(max-width: 899px) 100vw, 62vw"
                    priority={active === 0}
                  />
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
