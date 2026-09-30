import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/sections/seo/SeoLandingPage";
import { breadcrumbJsonLd, type Crumb } from "@/components/ui/Breadcrumbs";
import { getSeoPage, getSeoPages } from "@/services/content";
import { siteConfig, SITE_URL } from "@/data/site";

/**
 * Root-level SEO landing pages — /pressure-vessel-manufacturer-nashik and the
 * like, all authored in the admin.
 *
 * This is the last route the App Router tries: every static segment (/about,
 * /products, /contact …) and every other dynamic segment is matched first, so
 * this can only ever pick up a slug nothing else claimed. An unknown slug 404s
 * rather than rendering an empty shell.
 */

const DEFAULT_OG_IMAGE = "/images/hero/rdtherm-logo.png";

/** Pre-render the published pages at build time; new ones render on demand. */
export async function generateStaticParams() {
  const pages = await getSeoPages();
  return pages.map((page) => ({ slug: page.slug }));
}

/** Keep unpublished or unknown slugs from resolving to a blank 200. */
export const dynamicParams = true;

export async function generateMetadata(props: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = await getSeoPage(slug);
  if (!page) return {};

  const canonical = page.canonicalUrl || `/${page.slug}`;
  const ogTitle = page.ogTitle || page.seoTitle;
  const ogDescription = page.ogDescription || page.metaDescription;

  return {
    // `absolute` bypasses the root layout's "%s | R&D Therm" template: the CMS
    // field is the complete title, and the template would append the brand twice.
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    // Relative values resolve against metadataBase (SITE_URL), so canonical and
    // og:url always carry the real domain.
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      images: [{ url: page.ogImageUrl || DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [page.ogImageUrl || DEFAULT_OG_IMAGE],
    },
  };
}

export default async function SeoLandingRoute(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;
  const page = await getSeoPage(slug);
  if (!page) notFound();

  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: page.h1 },
  ];

  const pageUrl = `${SITE_URL}/${page.slug}`;

  const graph: Record<string, unknown>[] = [
    breadcrumbJsonLd(crumbs, SITE_URL),
    {
      "@type": "LocalBusiness",
      "@id": `${pageUrl}#business`,
      name: siteConfig.name,
      url: SITE_URL,
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "C14/2, NICE Industrial Area, MIDC Satpur",
        addressLocality: "Nashik",
        postalCode: "422007",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
  ];

  // FAQ schema is emitted only when the questions are actually on the page —
  // marking up FAQs a reader cannot see is a manual-action risk.
  if (page.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
        }}
      />
      <SeoLandingPage page={page} crumbs={crumbs} />
    </>
  );
}
