import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getCaseStudy, getCaseStudies } from "@/services/content";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=80";

/** Plain-text excerpt from rich summary HTML, for meta descriptions. */
const excerpt = (html: string, max = 160) => {
  const text = (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
};

export async function generateMetadata(
  props: PageProps<"/case-studies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const item = await getCaseStudy(slug);
  if (!item) return { title: "Case study not found", robots: { index: false } };
  const url = `/case-studies/${slug}`;
  const cover = item.cover || FALLBACK_COVER;
  const description = excerpt(item.summary) || `${item.title} — a delivered project by R&D Therm.`;
  return {
    title: item.title,
    description,
    keywords: [item.industry, item.client, item.title.toLowerCase(), "process equipment case study"].filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      title: item.title,
      description,
      url,
      type: "article",
      tags: [item.industry].filter(Boolean),
      images: [{ url: cover, alt: item.title }],
    },
    twitter: { title: item.title, description, images: [cover] },
  };
}

export default async function CaseStudyDetailPage(
  props: PageProps<"/case-studies/[slug]">,
) {
  const { slug } = await props.params;
  const [item, all] = await Promise.all([getCaseStudy(slug), getCaseStudies()]);
  if (!item) notFound();

  const related = all.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <>
      {/* TITLE BLOCK */}
      <section className="pt-10 lg:pt-14 pb-6 lg:pb-8">
        <Container size="narrow">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ArrowLeft className="size-4" /> Back to all case studies
          </Link>

          {item.industry ? (
            <Reveal className="mt-8">
              <SectionTag>{item.industry}</SectionTag>
            </Reveal>
          ) : null}

          <Reveal>
            <h1 className="mt-6 text-[34px] leading-[1.1] tracking-[-0.02em] sm:text-[48px] lg:text-[60px] font-bold">
              {item.title}
            </h1>
          </Reveal>

          <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] font-medium text-[var(--color-ink-soft)] sm:text-[14px]">
            {item.client ? (
              <span className="inline-flex items-center gap-2">
                <Building2 className="size-4 text-[var(--color-accent)]" />
                {item.client}
              </span>
            ) : null}
          </Reveal>
        </Container>
      </section>

      {/* COVER IMAGE — capped, responsive banner height so it never dominates the screen */}
      <Container size="default">
        <Reveal className="relative h-[220px] overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-soft)] sm:h-[320px] lg:h-[440px]">
          <Image
            src={item.cover || FALLBACK_COVER}
            alt={item.title}
            fill
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="object-cover"
            priority
          />
        </Reveal>
      </Container>

      {/* BODY — rich HTML produced by the admin text editor. */}
      <article className="bg-[var(--color-bg)] pt-2 pb-8 lg:pt-4 lg:pb-10">
        <Container size="narrow">
          <Reveal>
            <div
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: item.summary || "" }}
            />
          </Reveal>

          {/* End CTA — premium gradient card (matches the site's FinalCta) */}
          <Reveal className="relative mt-16 overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#f5612e_0%,#e94e1b_55%,#b8390f_100%)] p-8 text-white shadow-[0_30px_80px_-30px_rgba(233,78,27,0.45)] sm:p-10 lg:p-12">
            {/* decorative glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl"
            />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[560px]">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/80">
                  Have a similar project?
                </p>
                <h3 className="mt-3 text-[26px] font-bold leading-[1.1] tracking-[-0.01em] sm:text-[32px] lg:text-[38px]">
                  Tell us your specification — we&apos;ll engineer it.
                </h3>
                <p className="mt-4 text-[15px] leading-[1.6] text-white/85 sm:text-[16px]">
                  From concept to certified delivery, our design and fabrication teams handle the full scope. Get a budgetary quote within one business day.
                </p>
              </div>
              <Button href="/contact" variant="white" size="lg" className="w-fit shrink-0">
                Talk to an engineer
              </Button>
            </div>
          </Reveal>
        </Container>
      </article>

      {/* RELATED */}
      {related.length ? (
        <section className="bg-[var(--color-bg-soft)] pt-10 pb-16 lg:pt-12 lg:pb-20">
          <Container size="wide">
            <Reveal>
              <SectionTag>More Projects</SectionTag>
              <h2 className="mt-6 text-[28px] sm:text-[40px] lg:text-[48px] font-bold leading-[1.1] tracking-[-0.02em]">
                Explore more <span className="text-[var(--color-accent)]">case studies</span>.
              </h2>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {related.map((c) => (
                <Reveal key={c.slug}>
                  <Link
                    href={`/case-studies/${c.slug}`}
                    className="group relative block aspect-square overflow-hidden rounded-[14px] bg-[var(--color-bg-dark)]"
                  >
                    <Image
                      src={c.cardImage || c.cover || FALLBACK_COVER}
                      alt={c.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7 lg:p-8 text-white">
                      {(c.client || c.industry) && (
                        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] backdrop-blur-sm">
                          {[c.client, c.industry].filter(Boolean).join(" · ")}
                        </span>
                      )}
                      <h3 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold leading-[1.15] tracking-[-0.01em]">
                        {c.title}
                      </h3>
                      <p className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-accent)] underline-offset-4 transition-all duration-300 group-hover:gap-3 group-hover:underline">
                        <span>Read case study</span>
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
