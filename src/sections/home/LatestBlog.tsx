"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { blogPosts } from "@/data/home";

const COVER_IMAGES: Record<string, string> = {
  engine:
    "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80",
  robot:
    "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1200&q=80",
  chain:
    "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200&q=80",
};

export function LatestBlog() {
  return (
    <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-end"
        >
          <div className="lg:col-span-8">
            <motion.div variants={fadeUp}>
              <SectionTag>Insights & Article</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 text-[36px] leading-[1.05] tracking-[-0.02em] sm:text-[52px] lg:text-[72px] font-bold"
            >
              Latest from our <span className="text-[var(--color-accent)]">blog</span>
            </motion.h2>
          </div>

          <motion.div variants={fadeUp} className="lg:col-span-4 lg:flex lg:justify-end lg:pb-3">
            <Button href="/blog" variant="dark">
              View all blogs
            </Button>
          </motion.div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.href}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE_OUT_SOFT }}
            >
              <Link
                href={post.href}
                className="group relative block aspect-square overflow-hidden rounded-[14px] bg-[var(--color-bg-dark)]"
              >
                <Image
                  src={COVER_IMAGES[post.cover] ?? COVER_IMAGES.engine}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
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
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
