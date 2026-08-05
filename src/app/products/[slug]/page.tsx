import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProductGalleryLightbox } from "@/components/ui/ProductGalleryLightbox";
import { ProductFaqs } from "@/sections/products/ProductFaqs";
import { getProduct, getProducts, getFaqs } from "@/services/content";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80&auto=format&fit=crop";

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
  const chipGroups = [
    { label: "Specifications", items: product.specs },
    { label: "Applications", items: product.applications },
    { label: "Materials", items: product.materials },
    { label: "Compliance", items: compliance },
  ].filter((g) => g.items && g.items.length > 0);

  return (
    <>
      {/* HERO */}
      <section className="pt-10 lg:pt-14 pb-6 lg:pb-8">
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

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 lg:items-center">
            <Reveal as="div" className="lg:col-span-8">
              <h1 className="text-[40px] leading-[1.05] tracking-[-0.02em] sm:text-[56px] lg:text-[72px] font-bold">
                {product.title}
              </h1>
            </Reveal>
            <Reveal as="div" className="lg:col-span-4">
              <p className="line-clamp-5 text-[18px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[420px]">
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

      {/* RICH CONTENT (from the admin editor). The gallery above shares this
          background and already supplies the top gap, so the article only needs
          bottom padding. */}
      {product.content ? (
        <section className="bg-[var(--color-bg-soft)] pb-14 pt-2 lg:pb-20 lg:pt-4">
          <Container size="narrow">
            <Reveal amount="some">
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
                <Reveal as="div" key={group.label} className="grid grid-cols-1 lg:grid-cols-[190px_1fr] gap-y-4 gap-x-8 items-start">
                  <div>
                    <SectionTag variant="accent">{group.label}</SectionTag>
                  </div>
                  <div className="flex flex-col gap-2.5 lg:flex-row lg:flex-wrap lg:gap-2">
                    {group.items!.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-start gap-2.5 rounded-[12px] border border-[var(--color-line)] bg-white px-4 py-2.5 text-[14px] font-medium text-[var(--color-ink)] lg:items-center lg:gap-2 lg:rounded-full lg:py-2"
                      >
                        <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[var(--color-accent)] lg:mt-0" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-12 items-start">
              <Reveal as="div" className="lg:col-span-8">
                <SectionTag>Explore More</SectionTag>
                <h2 className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[40px] lg:text-[48px] font-bold">
                  Related R&amp;D Therm <span className="text-[var(--color-accent)]">products</span>.
                </h2>
              </Reveal>
              <Reveal as="div" className="lg:col-span-4 lg:flex lg:justify-end">
                <Button href="/products" variant="dark">
                  View all products
                </Button>
              </Reveal>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {related.map((p) => (
                <Reveal key={p.slug}>
                  {/* Same treatment as the home / products grids: the photo is the
                      card, with the title centred beneath it. */}
                  <Link href={`/products/${p.slug}`} className="group flex h-full flex-col">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-[var(--color-bg-soft)] shadow-[0_20px_46px_-26px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.05] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:ring-[var(--color-accent)]/35 group-hover:shadow-[0_32px_70px_-28px_rgba(233,78,27,0.5)] sm:aspect-square">
                      <Image
                        src={p.cover || p.images?.[0]?.url || FALLBACK_IMAGE}
                        alt={p.title}
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
                      {p.title}
                    </h3>
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
