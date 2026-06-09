"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";
import type { ApiJobOpening } from "@/lib/api-types";

export function Openings({ roles = [] }: { roles?: ApiJobOpening[] }) {
  return (
    <section className="bg-[var(--color-bg)] py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-end"
        >
          <div className="lg:col-span-7">
            <motion.div variants={fadeUp}>
              <SectionTag>Open Roles</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold"
            >
              We&apos;re <span className="text-[var(--color-accent)]">hiring</span> across engineering, fabrication and projects.
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="lg:col-span-5 text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[420px]"
          >
            All roles are based at our Nashik facility. Send your resume to{" "}
            <a className="font-semibold text-[var(--color-ink)] underline underline-offset-4" href="mailto:sales@rdtherm.com">
              sales@rdtherm.com
            </a>
            .
          </motion.p>
        </motion.div>

        {roles.length === 0 ? (
          <p className="mt-12 rounded-[14px] border border-[var(--color-line)] bg-white px-6 py-10 text-center text-[15px] text-[var(--color-muted)]">
            There are no open positions right now. We&apos;re always glad to hear from talented people —
            email your resume to{" "}
            <a className="font-semibold text-[var(--color-accent)] underline underline-offset-4" href="mailto:sales@rdtherm.com">
              sales@rdtherm.com
            </a>
            .
          </p>
        ) : (
        <ul className="mt-14 flex flex-col">
          {roles.map((role, i) => (
            <motion.li
              key={role.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group border-t border-[var(--color-line)] last:border-b"
            >
              <a
                href="mailto:sales@rdtherm.com"
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] items-center gap-4 sm:gap-8 py-6 sm:py-8 transition-colors duration-300 hover:bg-[var(--color-bg-soft)] -mx-5 px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
              >
                <span className="text-[22px] sm:text-[26px] font-semibold leading-tight transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                  {role.title}
                </span>
                <span className="hidden sm:inline-flex items-center gap-2 text-[14px] text-[var(--color-ink-soft)]">
                  {role.department}
                </span>
                <span className="hidden sm:inline-flex items-center gap-2 text-[14px] text-[var(--color-ink-soft)]">
                  <MapPin className="size-4" strokeWidth={1.8} />
                  {role.location}
                </span>
                <span className="inline-flex h-9 items-center gap-2 rounded-full bg-[var(--color-bg-soft)] px-4 text-[13px] font-medium text-[var(--color-ink)] transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white">
                  {role.type}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
        )}
      </Container>
    </section>
  );
}
