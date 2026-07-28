"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_OUT_SOFT } from "@/animations/motion";
import { careersHero } from "@/data/careers";

// Header height — subtracted so the image fills exactly one viewport below the
// (sticky, in-flow) navbar instead of pushing content off-screen.
const HEADER_H = 78;

export function CareersHero() {
  return (
    // overflow-hidden so the entry scale can't leak a horizontal scrollbar.
    <section className="relative overflow-hidden bg-[var(--color-bg-dark)]">
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT_SOFT }}
        className="relative w-full"
        style={{ height: `calc(100dvh - ${HEADER_H}px)`, minHeight: 420 }}
      >
        <Image
          src={careersHero.image}
          alt={careersHero.imageAlt}
          fill
          priority
          sizes="100vw"
          // The source is ~2.8:1, so narrow screens crop hard — hold the focus
          // to the right of centre to keep the helmet in frame.
          className="object-cover object-[72%_center] lg:object-center"
        />
      </motion.div>
    </section>
  );
}
