"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Loader2, Plus, ChevronUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { getBlogsPage } from "@/services/content";
import type { ApiBlog } from "@/lib/api-types";

const FALLBACK_COVER = "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80";

type Props = {
  initialPosts?: ApiBlog[];
  total?: number;
  pageSize?: number;
};

export function BlogList({ initialPosts = [], total = 0, pageSize = 6 }: Props) {
  const [posts, setPosts] = useState<ApiBlog[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const hasMore = posts.length < total;
  // Collapsible only once the user has loaded past the first page.
  const canCollapse = !hasMore && posts.length > pageSize;

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    const next = page + 1;
    const res = await getBlogsPage(next, pageSize);
    setPosts((prev) => {
      const seen = new Set(prev.map((p) => p.slug));
      return [...prev, ...res.items.filter((p) => !seen.has(p.slug))];
    });
    setPage(next);
    setLoading(false);
  }, [loading, page, pageSize]);

  const showLess = useCallback(() => {
    setPosts(initialPosts);
    setPage(1);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [initialPosts]);

  if (posts.length === 0) {
    return (
      <section className="bg-white py-16 lg:py-20">
        <Container size="wide">
          <p className="py-12 text-center text-[16px] text-[var(--color-muted)]">
            No articles have been published yet. Please check back soon.
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 lg:py-20">
      <Container size="wide">
        <div ref={gridRef} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.7,
                delay: 0.05 + (i % 3) * 0.08,
                ease: EASE_OUT_SOFT,
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group relative block aspect-square overflow-hidden rounded-[14px] bg-[var(--color-bg-dark)]"
              >
                <Image
                  src={post.cardImage || post.cover || FALLBACK_COVER}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-7 lg:p-8">
                  <h3 className="text-[22px] font-bold leading-[1.15] tracking-[-0.01em] sm:text-[26px] lg:text-[30px]">
                    {post.title}
                  </h3>
                  <p className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-accent)] underline-offset-4 transition-all duration-300 group-hover:gap-3 group-hover:underline">
                    <span>Read full blog</span>
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {(hasMore || canCollapse) && (
          <div className="mt-12 flex flex-col items-center gap-3">
            {hasMore ? (
              <button
                type="button"
                onClick={loadMore}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_40px_-18px_rgba(233,78,27,0.7)] transition-colors hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Loading…
                  </>
                ) : (
                  <>
                    <Plus className="size-4" /> Load more articles
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={showLess}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-7 py-3.5 text-[15px] font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <ChevronUp className="size-4" /> Show less
              </button>
            )}
            <p className="text-[13px] text-[var(--color-muted)]">
              Showing {posts.length} of {total} articles
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
