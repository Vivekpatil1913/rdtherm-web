"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { ColumnTick } from "@/components/ui/SectionDivider";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { products } from "@/data/home";
import { productList } from "@/data/products";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80&auto=format&fit=crop";

function imageFor(slug: string): string {
  const product = productList.find((p) => p.slug === slug);
  return product?.images?.[0]?.url ?? FALLBACK_IMAGE;
}

export function Products() {
  const [headStart, accent, headEnd] = products.heading;

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.div variants={fadeUp}>
            <SectionTag>{products.eyebrow}</SectionTag>
          </motion.div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-start">
            <motion.h2
              variants={fadeUp}
              className="lg:col-span-9 text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[46px] lg:text-[56px] font-bold"
            >
              {headStart}
              <span className="text-[var(--color-accent)]">{accent}</span>
              {headEnd}
            </motion.h2>
            <motion.div variants={fadeUp} className="lg:col-span-3 lg:pt-4">
              <Button href={products.cta.href} variant="dark">
                {products.cta.label}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-14 lg:mt-20 border-t border-[var(--color-line)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--color-line)]">
            {products.items.slice(0, 4).map((item, i) => (
              <ProductCell key={item.slug} item={item} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-[var(--color-line)] border-t border-[var(--color-line)]">
            {products.items.slice(4, 8).map((item, i) => (
              <ProductCell key={item.slug} item={item} index={i + 4} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProductCell({
  item,
  index,
}: {
  item: { label: string; slug: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{
        duration: 0.6,
        delay: 0.05 + (index % 4) * 0.08,
        ease: EASE_OUT_SOFT,
      }}
    >
      <Link
        href={`/products/${item.slug}`}
        className="group relative flex h-full flex-col gap-4 px-3 sm:px-4 py-8 lg:py-10 transition-colors duration-300 hover:bg-[var(--color-bg-soft)]"
      >
        <div className="relative h-52 sm:h-60 lg:h-72 w-full overflow-hidden rounded-[12px] bg-[var(--color-bg-soft)]">
          <Image
            src={imageFor(item.slug)}
            alt={item.label}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          <span className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-white/95 text-[var(--color-ink)] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-1">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <ColumnTick />
        <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[1.25] text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
          {item.label}
        </h3>
      </Link>
    </motion.div>
  );
}
