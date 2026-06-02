"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { blogList } from "@/data/blog";

export function BlogList() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {blogList.map((post, i) => (
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
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7 lg:p-8 text-white">
                  <h3 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold leading-[1.15] tracking-[-0.01em]">
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
      </Container>
    </section>
  );
}
