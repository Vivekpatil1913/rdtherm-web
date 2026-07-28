"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { globalPresence } from "@/data/about";

// One continuous plate: the section background reproduces the artwork's own
// soft vignette, so the copy above the map and the map itself read as a single
// composition rather than a caption stacked on an image.
// Sampled from the artwork itself so the plate and the image are the same grey.
const PLATE = "radial-gradient(120% 110% at 50% 12%, #f4f4f5 0%, #eceaea 100%)";
// Feathers the artwork's corners into that background — needed once the
// viewport passes the 1600px cap and the plate shows through either side.
const MAP_MASK = "radial-gradient(130% 118% at 50% 45%, #000 76%, transparent 100%)";
// Dissolves the artwork's top edge, which otherwise draws a hard line straight
// across the section. 16% is just short of the ~19% of empty sky it carries, so
// no landmass is touched. Applied on a nested element: two masks multiply
// without needing mask-composite.
const MAP_TOP_FADE = "linear-gradient(to bottom, transparent 0%, #000 16%)";

export function GlobalPresence() {
  const [line1, line2] = globalPresence.heading;
  const [sub1, sub2] = globalPresence.description;

  return (
    <section className="relative overflow-hidden" style={{ background: PLATE }}>
      <div className="relative mx-auto w-full max-w-[1600px]">
        {/* Everything is sized in vw against the plate width, so the artwork's
            proportions hold at any size, then freeze at the 1600px cap. */}
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          // z-10: the artwork's sky is opaque, so the copy has to sit above it.
          className="relative z-10 px-5 pt-12 text-center lg:pt-[min(4.9vw,78px)]"
        >
          <motion.h2
            variants={fadeUp}
            className="font-bold leading-[1.08] tracking-[-0.02em] text-[30px] sm:text-[40px] lg:text-[length:min(4.4vw,70px)]"
          >
            {line1}
            <br />
            <span className="text-[var(--color-accent)]">{line2}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-[14px] leading-[1.55] text-[var(--color-muted)] sm:text-[15px] lg:mt-[1.5vw] lg:text-[length:min(1.19vw,19px)]"
          >
            {sub1}
            <br />
            {sub2}
          </motion.p>
        </motion.div>

        {/* The artwork carries ~19% empty sky above the landmass. Pulling it up
            by most of that closes the gap to the copy to the same rhythm as the
            reference, instead of leaving a dead band under the sub-line. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE_OUT_SOFT, delay: 0.15 }}
          className="relative z-0 aspect-[1672/941] w-full -mt-[6.5vw] lg:-mt-[min(8.75vw,140px)]"
          style={{ WebkitMaskImage: MAP_MASK, maskImage: MAP_MASK }}
        >
          <div
            className="absolute inset-0"
            style={{ WebkitMaskImage: MAP_TOP_FADE, maskImage: MAP_TOP_FADE }}
          >
            <Image
              src={globalPresence.image}
              alt={globalPresence.imageAlt}
              fill
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
