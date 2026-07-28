"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportOnce } from "@/animations/motion";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "span";
  /**
   * How much of the element must be visible before it reveals. The default
   * (0.25) never resolves for blocks taller than four viewports — a long article
   * would stay hidden forever — so pass "some" for tall content.
   */
  amount?: number | "some" | "all";
};

export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = "div",
  amount,
}: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={amount === undefined ? viewportOnce : { once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
