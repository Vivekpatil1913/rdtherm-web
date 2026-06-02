import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { ColumnTick } from "@/components/ui/SectionDivider";
import { Reveal } from "@/components/ui/Reveal";
import { ProductGalleryLightbox } from "@/components/ui/ProductGalleryLightbox";
import { ProductFaqs } from "@/sections/products/ProductFaqs";
import { productList } from "@/data/products";

// Common deliverables shipped with every R&D Therm product — same for all SKUs.
// Kept static here (not data-driven) so every product page renders the same list.
const COMMON_INCLUSIONS = [
  "Detailed mechanical design with FEA review.",
  "Mill-to-shop material traceability.",
  "Third-party inspection and code stamping.",
  "QA dossier and as-built drawings on despatch.",
];

// Universal code stamps & quality standards R&D Therm builds to —
// applies to every product, kept static here so every page shows the same set.
const COMMON_COMPLIANCE = [
  "ASME Section VIII",
  "ASME U-Stamp",
  "PED 2014/68/EU",
  "IBR",
  "IS 2825 / IS 4503",
  "TEMA",
  "ISO 9001:2015",
];

export function generateStaticParams() {
  return productList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = productList.find((p) => p.slug === slug);
  if (!product) return { title: "Product not found", robots: { index: false } };
  const url = `/products/${slug}`;
  return {
    title: product.title,
    description: product.summary,
    keywords: [
      product.title.toLowerCase(),
      `${product.title.toLowerCase()} manufacturer`,
      `${product.title.toLowerCase()} India`,
      "ASME process equipment",
      "code-compliant pressure equipment",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: product.title,
      description: product.summary,
      url,
      type: "website",
      images: product.images?.[0]
        ? [{ url: product.images[0].url, alt: product.title }]
        : undefined,
    },
    twitter: {
      title: product.title,
      description: product.summary,
      images: product.images?.[0] ? [product.images[0].url] : undefined,
    },
  };
}

export default async function ProductDetailPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = productList.find((p) => p.slug === slug);
  if (!product) notFound();

  const index = productList.findIndex((p) => p.slug === slug);
  const related = productList.filter((_, i) => i !== index).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="pt-10 lg:pt-14 pb-10 lg:pb-12">
        <Container size="wide">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ArrowLeft className="size-4" /> Back to all products
          </Link>

          <Reveal className="mt-8">
            <SectionTag>
              Product {String(index + 1).padStart(2, "0")} /{" "}
              {String(productList.length).padStart(2, "0")}
            </SectionTag>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 items-start">
            <Reveal as="div" className="lg:col-span-8">
              <h1 className="text-[40px] leading-[1.05] tracking-[-0.02em] sm:text-[56px] lg:text-[72px] font-bold">
                {product.title}
              </h1>
            </Reveal>
            <Reveal as="div" className="lg:col-span-4 lg:pt-6">
              <p className="text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[420px]">
                {product.summary}
              </p>
              <div className="mt-6">
                <Button href="/contact" variant="primary">
                  Request a quote
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* IMAGE GALLERY — click any tile to open the lightbox */}
      {product.images && product.images.length > 0 ? (
        <ProductGalleryLightbox title={product.title} images={product.images} />
      ) : null}

      {/* INTRO PARAGRAPHS */}
      {product.intro && product.intro.length > 0 ? (
        <section className="bg-[var(--color-bg)] py-14 lg:py-20">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-start">
              <Reveal as="div" className="lg:col-span-4">
                <SectionTag>About this product</SectionTag>
              </Reveal>
              <Reveal as="div" className="lg:col-span-8 flex flex-col gap-5">
                {product.intro.map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-[20px] leading-[1.55] text-[var(--color-ink)] sm:text-[22px]"
                        : "text-[16px] leading-[1.7] text-[var(--color-ink-soft)]"
                    }
                  >
                    {para}
                  </p>
                ))}
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}

      {/* WHAT IS — definition + rich body (from text editor) */}
      {product.whatIs || product.content ? (
        <section className="bg-[var(--color-bg-soft)] py-14 lg:py-20">
          <Container size="wide">
            {product.whatIs ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-start">
                <Reveal as="div" className="lg:col-span-5">
                  <SectionTag>Definition</SectionTag>
                  <h2 className="mt-6 text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.1] tracking-[-0.02em]">
                    {product.whatIs.title ?? `What is a ${product.title}?`}
                  </h2>
                </Reveal>
                <Reveal as="div" className="lg:col-span-7">
                  <p className="text-[16px] leading-[1.7] text-[var(--color-ink-soft)] sm:text-[18px]">
                    {product.whatIs.body}
                  </p>
                </Reveal>
              </div>
            ) : null}
          </Container>

          {product.content ? (
            <Container size="narrow" className={product.whatIs ? "mt-14 lg:mt-16" : ""}>
              <Reveal>
                <div
                  className="prose-article"
                  dangerouslySetInnerHTML={{ __html: product.content }}
                />
              </Reveal>
            </Container>
          ) : null}
        </section>
      ) : null}

      {/* MAX CAPACITY / FEATURES — spec grid */}
      {product.maxCapacity && product.maxCapacity.length > 0 ? (
        <SpecGrid
          eyebrow="Maximum Capacity"
          title="Sized for your toughest jobs."
          items={product.maxCapacity}
        />
      ) : null}

      {product.features && product.features.length > 0 ? (
        <SpecGrid
          eyebrow="Key Specifications"
          title="Engineered specifications at a glance."
          items={product.features}
          tone="dark"
        />
      ) : null}



      {/* ALWAYS-INCLUDED + BENEFITS — matched two-column card block.
          Left card: static deliverables (same on every product page).
          Right card: product-specific benefits from data. */}
      <section className="bg-[var(--color-bg)] py-16 lg:py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7 items-stretch">
            <Reveal
              as="div"
              className="flex flex-col rounded-[18px] border border-[var(--color-line)] bg-white p-7 lg:p-9 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.18)]"
            >
              <div className="self-start">
                <SectionTag>Always included</SectionTag>
              </div>
              <h3 className="mt-5 text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-[1.15] tracking-[-0.01em]">
                Engineering services included.
              </h3>
              <ol className="mt-7 flex flex-1 flex-col gap-4">
                {COMMON_INCLUSIONS.map((item, i) => (
                  <li key={i} className="flex items-center gap-3.5">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-[var(--color-line)] bg-[var(--color-bg)] text-[12px] font-bold uppercase tracking-[0.04em] text-[var(--color-accent)] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-[1.5] text-[var(--color-ink)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            {product.benefits && product.benefits.length > 0 ? (
              <Reveal
                as="div"
                className="flex flex-col rounded-[18px] border border-[var(--color-line)] bg-white p-7 lg:p-9 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.18)]"
              >
                <div className="self-start">
                  <SectionTag>Benefits</SectionTag>
                </div>
                <h3 className="mt-5 text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-[1.15] tracking-[-0.01em]">
                  Why teams choose us.
                </h3>
                <ul className="mt-7 flex flex-1 flex-col gap-4">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3.5">
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-[var(--color-accent)] text-white">
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                      <span className="text-[15px] leading-[1.5] text-[var(--color-ink)]">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      {/* COMPLIANCE & STANDARDS — static, common to every product page. */}
      <section className="bg-[var(--color-bg-dark)] py-14 lg:py-20 text-white">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-center">
              <div className="lg:col-span-5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Constructed to code
                </p>
                <h3 className="mt-4 text-[28px] sm:text-[36px] lg:text-[40px] font-bold leading-tight">
                  Compliance & standards.
                </h3>
                <p className="mt-4 max-w-[420px] text-[14.5px] leading-[1.55] text-white/65">
                  Every vessel, exchanger and skid we ship is engineered, fabricated and inspected to internationally recognised pressure-equipment codes.
                </p>
              </div>
              <div className="lg:col-span-7 flex flex-wrap gap-2">
                {COMMON_COMPLIANCE.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-semibold backdrop-blur-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>


      {/* FAQ — shared across every product page */}
      <ProductFaqs />

      {/* CTA */}
      <section className="bg-[var(--color-bg)] py-16 lg:py-20">
        <Container size="wide">
          <Reveal className="overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#f5612e_0%,#e94e1b_55%,#b8390f_100%)] p-10 lg:p-16 text-white shadow-[0_30px_80px_-30px_rgba(233,78,27,0.45)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/80">
                  Build with R&D Therm
                </p>
                <h3 className="mt-3 text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.1] tracking-[-0.01em]">
                  Talk to an engineer about your {product.title.toLowerCase()}{" "}
                  enquiry.
                </h3>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Button href="/contact" variant="dark">
                  Request a quote
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* RELATED */}
      <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-end">
            <Reveal as="div" className="lg:col-span-8">
              <SectionTag>Explore More</SectionTag>
              <h2 className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[40px] lg:text-[48px] font-bold">
                Related R&D Therm{" "}
                <span className="text-[var(--color-accent)]">products</span>.
              </h2>
            </Reveal>
            <Reveal as="div" className="lg:col-span-4 lg:flex lg:justify-end lg:pb-3">
              <Button href="/products" variant="dark">
                View all products
              </Button>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full flex-col gap-5 rounded-[18px] border border-[var(--color-line)] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex h-28 w-full items-center justify-center rounded-[10px] bg-[var(--color-bg-soft)] text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    {p.slug}
                  </div>
                  <ColumnTick />
                  <h3 className="text-[18px] font-semibold leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-[13px] leading-[1.55] text-[var(--color-ink-soft)]">
                    {p.summary}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-accent)]">
                    View product <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

/* -----------------------------------------------------------------------
 * Inline subcomponents — kept local so the file remains a single source
 * of truth for the product detail page. Promote to /components if reused.
 * --------------------------------------------------------------------- */

function SpecGrid({
  eyebrow,
  title,
  items,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  items: { label: string; value: string }[];
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <section
      className={
        isDark
          ? "bg-[var(--color-bg-dark)] py-16 lg:py-20 text-white"
          : "bg-[var(--color-bg-soft)] py-16 lg:py-20"
      }
    >
      <Container size="wide">
        <Reveal>
          <SectionTag>{eyebrow}</SectionTag>
          <h2
            className={
              "mt-6 text-[28px] leading-[1.1] tracking-[-0.02em] sm:text-[36px] lg:text-[42px] font-bold " +
              (isDark ? "text-white" : "")
            }
          >
            {title}
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((it) => (
            <Reveal
              key={it.label}
              className={
                "flex flex-col gap-2 rounded-[14px] p-5 lg:p-6 " +
                (isDark
                  ? "border border-white/10 bg-white/[0.04] backdrop-blur-sm"
                  : "border border-[var(--color-line)] bg-white")
              }
            >
              <p
                className={
                  "text-[11px] font-semibold uppercase tracking-[0.22em] " +
                  (isDark ? "text-white/55" : "text-[var(--color-muted)]")
                }
              >
                {it.label}
              </p>
              <p
                className={
                  "text-[20px] sm:text-[22px] lg:text-[26px] font-bold leading-tight tracking-[-0.01em] " +
                  (isDark ? "text-white" : "text-[var(--color-ink)]")
                }
              >
                {it.value}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

