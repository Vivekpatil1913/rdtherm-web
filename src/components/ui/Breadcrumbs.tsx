import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export type Crumb = {
  label: string;
  /** Omit on the last crumb — the current page is not a link to itself. */
  href?: string;
};

/**
 * Visible breadcrumb trail. Emitting BreadcrumbList schema without showing the
 * trail to a reader is exactly the mismatch Google penalises, so the markup for
 * both comes from one list — see `breadcrumbJsonLd` below.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="pt-6 lg:pt-8">
      <Container size="wide">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] text-[var(--color-muted)]">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[var(--color-accent)]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className="text-[var(--color-ink)]">
                    {item.label}
                  </span>
                )}
                {isLast ? null : (
                  <ChevronRight aria-hidden className="size-3.5 text-[var(--color-line)]" />
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}

/**
 * BreadcrumbList structured data for the same trail. `siteUrl` is required
 * because schema.org wants absolute URLs even though the visible links are
 * relative.
 */
export function breadcrumbJsonLd(items: Crumb[], siteUrl: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };
}
