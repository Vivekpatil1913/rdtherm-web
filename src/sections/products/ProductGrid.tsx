"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { productList } from "@/data/products";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80&auto=format&fit=crop";

export function ProductGrid() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container size="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {productList.map((product, i) => (
            <motion.article
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.05 + (i % 4) * 0.06, ease: EASE_OUT_SOFT }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[18px] border border-[var(--color-accent)]/30 bg-white p-7 shadow-[0_18px_45px_-25px_rgba(233,78,27,0.22)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--color-accent)]/60 hover:shadow-[0_28px_70px_-25px_rgba(233,78,27,0.35)]"
              >
                <div className="relative h-60 sm:h-72 lg:h-80 w-full overflow-hidden rounded-[12px] bg-[var(--color-bg-soft)]">
                  <Image
                    src={product.images?.[0]?.url ?? FALLBACK_IMAGE}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <span
                    aria-hidden
                    className="inline-block h-[3px] w-9 rounded-full bg-[var(--color-accent)]"
                  />
                  <h3 className="text-[22px] font-semibold leading-tight tracking-[-0.01em] text-[var(--color-accent)]">
                    {product.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-[var(--color-ink-soft)]">
                    {product.summary}
                  </p>
                </div>

                <span className="absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-[0_6px_18px_-6px_rgba(233,78,27,0.55)] transition-all duration-300 group-hover:bg-[var(--color-accent-hover)] group-hover:rotate-[-8deg]">
                  <ArrowUpRight className="size-4" />
                </span>

                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-hover)]"
                />
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
