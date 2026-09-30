import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { ApiSeoPageSummary } from "@/lib/api-types";

/**
 * Contextual internal links from an existing page to the service + location
 * landing pages that cover it.
 *
 * Which pages are relevant comes from the CMS — each landing page records the
 * products it covers — so no product-to-page mapping is hardcoded here, and a
 * new landing page starts appearing on the right product pages on its own.
 */
export function RelatedLocationPages({
  pages,
  productSlug,
  heading = "Looking for a manufacturer in your region?",
}: {
  pages: ApiSeoPageSummary[];
  /** Narrow to the pages that reference this product. Omit to show them all. */
  productSlug?: string;
  heading?: string;
}) {
  const relevant = productSlug
    ? pages.filter((page) => (page.productSlugs ?? []).includes(productSlug))
    : pages;

  if (relevant.length === 0) return null;

  return (
    <section className="border-t border-[var(--color-line)] bg-white py-10 lg:py-14">
      <Container size="wide">
        <Reveal>
          <h2 className="text-[18px] font-semibold text-[var(--color-ink)] sm:text-[20px]">
            {heading}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {relevant.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/${page.slug}`}
                  className="group/rel inline-flex items-center gap-2 rounded-[10px] border border-[var(--color-line)] px-4 py-2.5 text-[15px] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {page.h1}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 text-[var(--color-muted)] transition-colors group-hover/rel:text-[var(--color-accent)]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
