import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Reveal } from "@/components/ui/Reveal";
import { getBlog, getBlogs } from "@/services/content";

const FALLBACK_COVER = "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80";

/**
 * Format an API date (always "YYYY-MM-DD") as "dd-mm-yyyy".
 * Done with plain string ops — no `Date`/locale — so it renders identically
 * on every device regardless of the visitor's system locale/timezone.
 */
function formatBlogDate(iso: string | null): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return y && m && d ? `${d}-${m}-${y}` : iso;
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlog(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  const url = `/blog/${slug}`;
  const cover = post.cover || FALLBACK_COVER;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, post.title.toLowerCase(), "process equipment blog"],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date ?? undefined,
      authors: [post.author || "R&D Therm Engineering Desk"],
      tags: [post.category],
      images: [{ url: cover, alt: post.title }],
    },
    twitter: { title: post.title, description: post.excerpt, images: [cover] },
  };
}

export default async function BlogDetailPage(
  props: PageProps<"/blog/[slug]">,
) {
  const { slug } = await props.params;
  const [post, all] = await Promise.all([getBlog(slug), getBlogs()]);
  if (!post) notFound();

  const related = all.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* TITLE BLOCK */}
      <section className="pt-10 lg:pt-14 pb-8 lg:pb-10">
        <Container size="narrow">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ArrowLeft className="size-4" /> Back to all articles
          </Link>

          <Reveal className="mt-8">
            <SectionTag>{post.category}</SectionTag>
          </Reveal>

          <Reveal>
            <h1 className="mt-6 text-[34px] leading-[1.1] tracking-[-0.02em] sm:text-[48px] lg:text-[60px] font-bold">
              {post.title}
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 text-[17px] leading-[1.6] text-[var(--color-ink-soft)] sm:text-[19px]">
              {post.excerpt}
            </p>
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-medium text-[var(--color-ink-soft)] sm:text-[14px]">
            {post.author ? (
              <span className="inline-flex items-center gap-2">
                <User className="size-4 text-[var(--color-accent)]" />
                {post.author}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4 text-[var(--color-accent)]" />
              {formatBlogDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="size-4 text-[var(--color-accent)]" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-2">
              <Tag className="size-4 text-[var(--color-accent)]" />
              {post.category}
            </span>
          </Reveal>
        </Container>
      </section>

      {/* COVER IMAGE — capped, responsive banner height so it never dominates the screen */}
      <Container size="default">
        <Reveal className="relative h-[220px] overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-soft)] sm:h-[320px] lg:h-[440px]">
          <Image
            src={post.cover || FALLBACK_COVER}
            alt={post.title}
            fill
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="object-cover"
            priority
          />
        </Reveal>
      </Container>

      {/* BODY — rich HTML produced by the admin text editor.
          Rendered exactly as authored. Styling comes from .prose-article. */}
      <article className="overflow-x-clip bg-[var(--color-bg)] py-14 lg:py-20">
        <Container size="narrow">
          <Reveal>
            <div
              className="prose-article max-w-full overflow-x-clip"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </Reveal>

          {/* End-of-article CTA */}
          <Reveal className="mt-16 flex flex-col gap-3 rounded-[18px] border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-7 sm:p-9">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              R&D Therm Engineering Desk
            </p>
            <h3 className="text-[22px] sm:text-[24px] font-semibold leading-tight">
              Have a process problem you&apos;d like an engineer to weigh in on?
            </h3>
            <p className="text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">
              Drop us a note and one of our process or mechanical engineers will reply within one business day. No sales calls — just engineering.
            </p>
            <div className="mt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-accent)] hover:underline underline-offset-4"
              >
                Talk to an engineer
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </article>

      {/* RELATED */}
      <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
        <Container size="wide">
          <Reveal>
            <SectionTag>Keep Reading</SectionTag>
            <h2 className="mt-6 text-[28px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.1] tracking-[-0.02em]">
              More from the <span className="text-[var(--color-accent)]">blog</span>.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group relative block aspect-square overflow-hidden rounded-[14px] bg-[var(--color-bg-dark)]"
                >
                  <Image
                    src={p.cover || FALLBACK_COVER}
                    alt={p.title}
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
                      {p.title}
                    </h3>
                    <p className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-accent)] underline-offset-4 transition-all duration-300 group-hover:gap-3 group-hover:underline">
                      <span>Read full blog</span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
