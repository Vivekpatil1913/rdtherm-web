"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import type { ApiProduct } from "@/lib/api-types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80&auto=format&fit=crop";

export function ProductGrid({ products = [] }: { products?: ApiProduct[] }) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container size="wide">
        {products.length === 0 ? (
          <p className="py-16 text-center text-[18px] text-[var(--color-muted)]">
            No products are available right now. Please check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function ProductCard({ product, index }: { product: ApiProduct; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay: 0.05 + (index % 4) * 0.07, ease: EASE_OUT_SOFT }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_18px_44px_-26px_rgba(0,0,0,0.22)] ring-1 ring-black/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.28)]"
      >
        {/* Image */}
        <div className="relative h-40 w-full overflow-hidden bg-[var(--color-bg-soft)] sm:h-44">
          <Image
            src={product.cover || product.images?.[0]?.url || FALLBACK_IMAGE}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <div className="flex flex-col gap-1.5">
            <span aria-hidden className="h-[3px] w-8 rounded-full bg-[var(--color-accent)]" />
            <span className="text-[13px] font-bold tabular-nums text-[var(--color-accent)]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-[19px] font-bold leading-tight tracking-[-0.01em] text-[var(--color-ink)]">
            {product.title}
          </h3>

          <div className="mt-auto flex items-end justify-between gap-4">
            <p className="text-[14px] leading-[1.55] text-[var(--color-ink-soft)] line-clamp-2">
              {product.summary}
            </p>
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-[0_8px_20px_-6px_rgba(233,78,27,0.6)] transition-all duration-300 group-hover:bg-[var(--color-accent-hover)] group-hover:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
