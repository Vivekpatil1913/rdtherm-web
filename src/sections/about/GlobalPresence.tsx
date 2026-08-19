"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { SectionTag } from "@/components/ui/SectionTag";
import { globalPresence } from "@/data/about";

// Sampled from the artwork so the plate and the image are the same grey — the
// band reads as one composition however wide the viewport gets.
const PLATE = "radial-gradient(120% 110% at 70% 40%, #f6f5f4 0%, #ecebea 100%)";

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
            className="relative z-10 px-5 pb-2 pt-12 text-center sm:px-8 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[46%] lg:flex-col lg:justify-center lg:px-[max(3rem,4vw)] lg:pb-0 lg:pt-0 lg:text-left"
          >
            <motion.div variants={fadeUp} className="flex justify-center lg:block">
              <SectionTag>{globalPresence.eyebrow}</SectionTag>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="mt-5 font-bold leading-[1.12] tracking-[-0.02em] text-[30px] sm:text-[40px] lg:mt-[1.4vw] lg:text-[length:min(2.75vw,44px)]"
            >
              {line1}
              <br />
              <span className="text-[var(--color-accent)]">{line2}</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-[14px] leading-[1.6] text-[var(--color-muted)] sm:text-[15px] lg:mt-[1.1vw] lg:text-[length:min(1.05vw,17px)]"
            >
              {sub1}
              <br />
              {sub2}
            </motion.p>
          </motion.div>

          {/* Artwork. The wide plate only works once there is room for its
              2.83:1 ratio, so below lg a tighter 956x610 crop of the same render
              takes over. The box matches that file exactly, so nothing is cut and
              no dead grey is left under the map. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: EASE_OUT_SOFT, delay: 0.15 }}
            className="relative z-0 aspect-[956/610] w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          >
            <Image
              src={globalPresence.mobileImage}
              alt={globalPresence.imageAlt}
              fill
              sizes="100vw"
              className="object-cover object-center lg:hidden"
            />
            <Image
              src={globalPresence.image}
              alt={globalPresence.imageAlt}
              fill
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="hidden object-cover object-center lg:block"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
