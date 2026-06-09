import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProductGalleryLightbox } from "@/components/ui/ProductGalleryLightbox";
import { ProductFaqs } from "@/sections/products/ProductFaqs";
import { getProduct, getProducts, getFaqs } from "@/services/content";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80&auto=format&fit=crop";

// Fallback deliverables, used only if a product has no inclusions set in the admin.
const COMMON_INCLUSIONS = [
  "Detailed mechanical design with FEA review.",
  "Mill-to-shop material traceability.",
  "Third-party inspection and code stamping.",
  "QA dossier and as-built drawings on despatch.",
];

const COMMON_COMPLIANCE = ["ASME Section VIII", "ASME U-Stamp", "PED 2014/68/EU", "IBR", "ISO 9001:2015"];

export async function generateMetadata(
  props: PageProps<"/products/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found", robots: { index: false } };
  const url = `/products/${slug}`;
  const cover = product.cover || product.images?.[0]?.url;
  return {
    title: product.title,
    description: product.summary,
    alternates: { canonical: url },
    openGraph: {
      title: product.title,
      description: product.summary,
      url,
      type: "website",
      images: cover ? [{ url: cover, alt: product.title }] : undefined,
    },
    twitter: { title: product.title, description: product.summary, images: cover ? [cover] : undefined },
  };
}

export default async function ProductDetailPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const [product, all, faqs] = await Promise.all([getProduct(slug), getProducts(), getFaqs()]);
  if (!product) notFound();

  const index = all.findIndex((p) => p.slug === slug);
  const total = all.length || 1;
  const related = all.filter((p) => p.slug !== slug).slice(0, 4);
  const compliance = product.compliance?.length ? product.compliance : COMMON_COMPLIANCE;
  const inclusions = product.inclusions?.length ? product.inclusions : COMMON_INCLUSIONS;
  const chipGroups = [
    { label: "Specifications", items: product.specs },
    { label: "Applications", items: product.applications },
    { label: "Materials", items: product.materials },
  ].filter((g) => g.items && g.items.length > 0);

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
              {index >= 0
                ? `Product ${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
                : "Product"}
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

      {/* IMAGE GALLERY */}
      {product.images && product.images.length > 0 ? (
        <ProductGalleryLightbox title={product.title} images={product.images} />
      ) : null}

      {/* RICH CONTENT (from the admin editor) */}
      {product.content ? (
        <section className="bg-[var(--color-bg-soft)] py-14 lg:py-20">
          <Container size="narrow">
            <Reveal>
              <div className="prose-article" dangerouslySetInnerHTML={{ __html: product.content }} />
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* SPECS / APPLICATIONS / MATERIALS */}
      {chipGroups.length > 0 ? (
        <section className="bg-[var(--color-bg)] py-14 lg:py-20">
          <Container size="wide">
            <div className="flex flex-col gap-10">
              {chipGroups.map((group) => (
                <Reveal as="div" key={group.label} className="grid grid-cols-1 lg:grid-cols-12 gap-y-4 gap-x-12 items-start">
                  <div className="lg:col-span-4">
                    <SectionTag>{group.label}</SectionTag>
                  </div>
                  <div className="lg:col-span-8 flex flex-wrap gap-2">
                    {group.items!.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-[14px] font-medium text-[var(--color-ink)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* ALWAYS-INCLUDED + BENEFITS */}
      <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
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
                {inclusions.map((item, i) => (
                  <li key={i} className="flex items-center gap-3.5">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[8px] border border-[var(--color-line)] bg-[var(--color-bg)] text-[12px] font-bold uppercase tracking-[0.04em] text-[var(--color-accent)] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] leading-[1.5] text-[var(--color-ink)]">{item}</span>
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
                      <span className="text-[15px] leading-[1.5] text-[var(--color-ink)]">{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      {/* COMPLIANCE & STANDARDS */}
      <section className="bg-[var(--color-bg-dark)] py-14 lg:py-20 text-white">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-center">
            <div className="lg:col-span-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Constructed to code
              </p>
              <h3 className="mt-4 text-[28px] sm:text-[36px] lg:text-[40px] font-bold leading-tight">
                Compliance &amp; standards.
              </h3>
              <p className="mt-4 max-w-[420px] text-[14.5px] leading-[1.55] text-white/65">
                Every vessel, exchanger and skid we ship is engineered, fabricated and inspected to
                internationally recognised pressure-equipment codes.
              </p>
            </div>
            <div className="lg:col-span-7 flex flex-wrap gap-2">
              {compliance.map((c) => (
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

      {/* FAQ */}
      <ProductFaqs faqs={faqs} />

      {/* CTA */}
      <section className="bg-[var(--color-bg)] py-16 lg:py-20">
        <Container size="wide">
          <Reveal className="overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#f5612e_0%,#e94e1b_55%,#b8390f_100%)] p-10 lg:p-16 text-white shadow-[0_30px_80px_-30px_rgba(233,78,27,0.45)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/80">
                  Build with R&amp;D Therm
                </p>
                <h3 className="mt-3 text-[28px] sm:text-[36px] lg:text-[44px] font-bold leading-[1.1] tracking-[-0.01em]">
                  Talk to an engineer about your {product.title.toLowerCase()} enquiry.
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
      {related.length > 0 ? (
        <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
          <Container size="wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-end">
              <Reveal as="div" className="lg:col-span-8">
                <SectionTag>Explore More</SectionTag>
                <h2 className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[40px] lg:text-[48px] font-bold">
                  Related R&amp;D Therm <span className="text-[var(--color-accent)]">products</span>.
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
                    <div className="relative h-28 w-full overflow-hidden rounded-[10px] bg-[var(--color-bg-soft)]">
                      <Image
                        src={p.cover || p.images?.[0]?.url || FALLBACK_IMAGE}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-[18px] font-semibold leading-tight">{p.title}</h3>
                    <p className="text-[13px] leading-[1.55] text-[var(--color-ink-soft)] line-clamp-2">
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
      ) : null}
    </>
  );
}
