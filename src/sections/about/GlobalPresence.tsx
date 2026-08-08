"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Handshake, MapPin, Users } from "lucide-react";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { globalPresence } from "@/data/about";
import { cn } from "@/lib/cn";

// Sampled from the artwork so the plate and the image are the same grey — the
// band reads as one composition however wide the viewport gets.
const PLATE = "radial-gradient(120% 110% at 70% 40%, #f6f5f4 0%, #ecebea 100%)";

const ICONS = {
  globe: Globe,
  pin: MapPin,
  handshake: Handshake,
  users: Users,
} as const;

export function GlobalPresence() {
  const [line1, line2] = globalPresence.heading;
  const [sub1, sub2] = globalPresence.description;

  return (
    <section className="relative overflow-hidden" style={{ background: PLATE }}>
      <div className="relative mx-auto w-full max-w-[1600px]">
        {/* On desktop the artwork fills the band and the copy overlays the empty
            left third it was drawn with. Below lg the two simply stack. */}
        <div className="relative lg:aspect-[2109/745]">
          <motion.div
            variants={stagger(0.05, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative z-10 px-5 pb-8 pt-12 sm:px-8 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[47%] lg:flex-col lg:justify-center lg:px-[max(3rem,4vw)] lg:pb-0 lg:pt-0"
          >
            <motion.div variants={fadeUp}>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                {globalPresence.eyebrow}
              </p>
              <span aria-hidden className="mt-3 block h-[2px] w-12 bg-[var(--color-accent)]" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-5 font-bold leading-[1.12] tracking-[-0.02em] text-[30px] sm:text-[40px] lg:mt-[1.6vw] lg:text-[length:min(3.4vw,54px)]"
            >
              {line1}
              <br />
              <span className="text-[var(--color-accent)]">{line2}</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-[14px] leading-[1.6] text-[var(--color-muted)] sm:text-[15px] lg:mt-[1.2vw] lg:text-[length:min(1.15vw,18px)]"
            >
              {sub1}
              <br />
              {sub2}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 grid grid-cols-2 gap-y-5 rounded-[16px] border border-white/70 bg-white/70 px-2 py-5 shadow-[0_20px_44px_-28px_rgba(0,0,0,0.3)] backdrop-blur-[2px] sm:flex sm:flex-wrap sm:justify-start lg:mt-[2vw] lg:self-start"
            >
              {globalPresence.stats.map((stat, i) => {
                const Icon = ICONS[stat.icon as keyof typeof ICONS] ?? Globe;
                return (
                  <div
                    key={stat.label}
                    className={cn(
                      "flex flex-col items-center px-3 text-center sm:px-5 lg:px-[1.4vw]",
                      // Divider between every item on desktop; only between the
                      // two columns on the mobile 2×2 grid.
                      i % 2 === 1 && "border-l border-[var(--color-line)]",
                      i > 0 && "sm:border-l sm:border-[var(--color-line)]",
                    )}
                  >
                    <Icon className="size-6 text-[var(--color-accent)]" strokeWidth={1.7} />
                    <p className="mt-2 text-[20px] font-bold leading-none tracking-[-0.01em] tabular-nums sm:text-[22px]">
                      {stat.value}
                    </p>
                    <p className="mt-1.5 text-[12px] leading-tight text-[var(--color-muted)]">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Artwork. Cropped to its right half on small screens so the map still
              reads once the band is too narrow for its 2.83:1 ratio. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: EASE_OUT_SOFT, delay: 0.15 }}
            className="relative z-0 aspect-[16/10] w-full sm:aspect-[2/1] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          >
            <Image
              src={globalPresence.image}
              alt={globalPresence.imageAlt}
              fill
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover object-right lg:object-center"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
