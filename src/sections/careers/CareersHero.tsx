"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_OUT_SOFT } from "@/animations/motion";
import { careersHero } from "@/data/careers";

export function CareersHero() {
  return (
    // overflow-hidden so the entry scale can't leak a horizontal scrollbar.
    <section className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT_SOFT }}
        className="relative w-full"
      >
        {/* Two crops, one per form factor. Both render at their own intrinsic
            ratio (h-auto) rather than cropped to a viewport-height band, so
            nothing is cut off and the section ends exactly where the image
            does — no letterboxing underneath. */}
        <Image
          src={careersHero.imageMobile}
          alt={careersHero.imageAlt}
          width={926}
          height={1698}
          priority
          sizes="100vw"
          className="block h-auto w-full md:hidden"
        />
        <Image
          src={careersHero.image}
          alt={careersHero.imageAlt}
          width={2172}
          height={635}
          priority
          sizes="100vw"
          className="hidden h-auto w-full md:block"
        />
      </motion.div>
    </section>
  );
}
