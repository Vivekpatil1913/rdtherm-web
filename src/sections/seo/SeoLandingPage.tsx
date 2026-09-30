import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import type { ApiSeoPage } from "@/lib/api-types";

/**
 * The single template every service + location landing page renders through.
 *
 * Adding a page is an admin job, not a code change: the CMS supplies the copy,
 * and the industries / products / case studies are references the API resolves
 * against live records. Sections with no content simply don't render, so a
 * sparsely-filled page still reads as finished rather than broken.
 */
export function SeoLandingPage({ page, crumbs }: { page: ApiSeoPage; crumbs: Crumb[] }) {
  const { industries, products, caseStudies, faqs, sections } = page;

  return (
    <>
      <Breadcrumbs items={crumbs} />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="pt-6 pb-14 lg:pt-8 lg:pb-20">
        <Container size="wide">
          <Reveal>
            <SectionTag>{page.name}</SectionTag>
            <h1 className="mt-6 max-w-[900px] text-[36px] leading-[1.06] tracking-[-0.02em] sm:text-[48px] lg:text-[60px] font-bold">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-[680px] text-[18px] leading-[1.6] text-[var(--color-ink-soft)]">
              {page.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact#enquiry"
                className="group inline-flex h-14 items-center gap-3 rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px] bg-[var(--color-ink)] pl-6 pr-2 text-[16px] font-medium text-white transition-colors hover:bg-black"
              >
                Enquire now
                <span className="inline-flex size-11 items-center justify-center rounded-[8px] bg-[var(--color-accent)] text-white">
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link
                href="/manufacturing"
                className="inline-flex h-14 items-center rounded-[10px] border border-[var(--color-line)] px-6 text-[16px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                See our manufacturing facility
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Body sections ──────────────────────────────────── */}
      {sections.length > 0 ? (
        <section className="bg-[var(--color-bg-soft)] py-14 lg:py-20">
          <Container size="wide">
            <div className="flex flex-col gap-12 lg:gap-16">
              {sections.map((section, i) => (
                <Reveal key={`${section.heading}-${i}`}>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
                    <h2 className="lg:col-span-5 text-[26px] leading-[1.15] tracking-[-0.01em] sm:text-[32px] font-bold">
                      {section.heading}
                    </h2>
                    <div className="lg:col-span-7">
                      {section.body ? (
                        <p className="text-[17px] leading-[1.65] text-[var(--color-ink-soft)]">
                          {section.body}
                        </p>
                      ) : null}
                      {section.bullets.length > 0 ? (
                        <ul className={section.body ? "mt-5 flex flex-col gap-2.5" : "flex flex-col gap-2.5"}>
                          {section.bullets.map((bullet, b) => (
                            <li key={b} className="flex items-start gap-3">
                              <span
                                aria-hidden
                                className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                              >
                                <Check className="size-3" />
                              </span>
                              <span className="text-[16px] leading-[1.55] text-[var(--color-ink)]">
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── Industries served ──────────────────────────────── */}
      {industries.length > 0 ? (
        <section className="py-14 lg:py-20">
          <Container size="wide">
            <Reveal>
              <SectionTag>Industries served</SectionTag>
              <h2 className="mt-6 text-[26px] leading-[1.15] tracking-[-0.01em] sm:text-[32px] lg:text-[40px] font-bold">
                Sectors we build for
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <Reveal
                  key={industry.key}
                  className="rounded-[16px] border border-[var(--color-line)] bg-white p-6"
                >
                  <h3 className="text-[18px] font-semibold text-[var(--color-ink)]">
                    {industry.label}
                  </h3>
                  {industry.description ? (
                    <p className="mt-2 text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">
                      {industry.description}
                    </p>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── Related equipment (internal links into the catalogue) ── */}
      {products.length > 0 ? (
        <section className="bg-[var(--color-bg-soft)] py-14 lg:py-20">
          <Container size="wide">
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionTag>Related equipment</SectionTag>
                <h2 className="mt-6 text-[26px] leading-[1.15] tracking-[-0.01em] sm:text-[32px] lg:text-[40px] font-bold">
                  Equipment we manufacture
                </h2>
              </div>
              <Link
                href="/products"
                className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
              >
                View the full catalogue
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Reveal key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group/card flex h-full flex-col rounded-[16px] border border-[var(--color-line)] bg-white p-6 transition-colors hover:border-[var(--color-accent)]"
                  >
                    <h3 className="flex items-start justify-between gap-3 text-[18px] font-semibold text-[var(--color-ink)]">
                      <span>{product.title}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-4 shrink-0 text-[var(--color-muted)] transition-colors group-hover/card:text-[var(--color-accent)]"
                      />
                    </h3>
                    {product.specs.length > 0 ? (
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {product.specs.map((spec, i) => (
                          <li key={i} className="text-[14px] leading-[1.5] text-[var(--color-ink-soft)]">
                            {spec}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── Case studies ───────────────────────────────────── */}
      {caseStudies.length > 0 ? (
        <section className="py-14 lg:py-20">
          <Container size="wide">
            <Reveal>
              <SectionTag>Projects</SectionTag>
              <h2 className="mt-6 text-[26px] leading-[1.15] tracking-[-0.01em] sm:text-[32px] lg:text-[40px] font-bold">
                Delivered projects
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {caseStudies.map((study) => (
                <Reveal key={study.slug}>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group/case flex h-full flex-col rounded-[18px] border border-[var(--color-line)] bg-white p-7 transition-colors hover:border-[var(--color-accent)]"
                  >
                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      {study.client} · {study.industry}
                    </p>
                    <h3 className="mt-3 text-[20px] font-bold leading-[1.25] text-[var(--color-ink)]">
                      {study.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">
                      {study.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-ink)] transition-colors group-hover/case:text-[var(--color-accent)]">
                      Read the case study
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/case:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── FAQ — rendered visibly, which is what licenses the FAQ schema ── */}
      {faqs.length > 0 ? (
        <section className="bg-[var(--color-bg-soft)] py-14 lg:py-20">
          <Container size="narrow">
            <Reveal>
              <SectionTag>Frequently asked</SectionTag>
              <h2 className="mt-6 text-[26px] leading-[1.15] tracking-[-0.01em] sm:text-[32px] lg:text-[40px] font-bold">
                Questions buyers ask first
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <details
                  key={`${faq.question}-${i}`}
                  // Shared name = exclusive accordion. First item open by default.
                  name="seo-faq"
                  open={i === 0}
                  className="group rounded-[14px] border border-[var(--color-line)] bg-white px-5 py-4 lg:px-6 lg:py-5 open:border-[var(--color-accent)]/40 transition-all duration-300"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-semibold text-[var(--color-ink)] sm:text-[18px] [&::-webkit-details-marker]:hidden">
                    <h3 className="font-semibold">{faq.question}</h3>
                    <ChevronDown className="size-5 shrink-0 text-[var(--color-accent)] transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ink-soft)]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ── Final CTA ──────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20">
        <Container size="wide">
          <Reveal className="overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#f5612e_0%,#e94e1b_55%,#b8390f_100%)] p-10 text-white shadow-[0_30px_80px_-30px_rgba(233,78,27,0.45)] lg:p-16">
            <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/80">
                  Talk to us
                </p>
                <h2 className="mt-3 text-[28px] font-bold leading-[1.08] tracking-[-0.01em] sm:text-[36px] lg:text-[44px]">
                  Tell us what you need built
                </h2>
                <p className="mt-4 max-w-[560px] text-[18px] leading-[1.6] text-white/85">
                  Send us your specification and our engineering team will come back with
                  a scope, a drawing approach and a delivery window.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                <Link
                  href="/contact#enquiry"
                  className="group inline-flex h-14 items-center gap-3 rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px] bg-white pl-6 pr-2 text-[16px] font-medium text-[var(--color-ink)] transition-colors hover:bg-white/90"
                >
                  Contact us
                  <span className="inline-flex size-11 items-center justify-center rounded-[8px] bg-[var(--color-accent)] text-white">
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
