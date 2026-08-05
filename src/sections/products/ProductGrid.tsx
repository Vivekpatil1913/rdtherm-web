"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
        className="group flex h-full flex-col"
      >
        {/* The photo is the card — no chrome competing with the product */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] sm:aspect-square bg-[var(--color-bg-soft)] shadow-[0_20px_46px_-26px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.05] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:ring-[var(--color-accent)]/35 group-hover:shadow-[0_32px_70px_-28px_rgba(233,78,27,0.5)]">
          <Image
            src={product.cover || product.images?.[0]?.url || FALLBACK_IMAGE}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
          />
          {/* Accent corner flag, revealed on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 size-0 border-l-[52px] border-t-[52px] border-l-transparent border-t-[var(--color-accent)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
          />
          <span className="pointer-events-none absolute right-2.5 top-2.5 text-white opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            <ArrowUpRight className="size-4" strokeWidth={2.5} />
          </span>
        </div>

        <h3 className="mt-4 text-center text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] text-[var(--color-ink)] transition-colors duration-300 group-hover:text-[var(--color-accent)] sm:text-[18px]">
          {product.title}
        </h3>
      </Link>
    </motion.article>
  );
}
