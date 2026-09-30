/**
 * Shapes returned by the public API (rdtherm-api /api/public/*).
 * Only published, non-deleted records are ever returned.
 */

export interface ApiProductImage {
  url: string;
  alt: string;
  label?: string;
}

export interface ApiProduct {
  id: string;
  slug: string;
  title: string;
  cover: string;
  featured: boolean;
  specs: string[];
  applications: string[];
  materials: string[];
  compliance: string[];
  benefits: string[];
  inclusions: string[];
  images: ApiProductImage[];
  content: string;
}

export interface ApiBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string | null;
  readTime: string;
  /** Wide 21:9 banner for the article detail page. */
  cover: string;
  /** Square 1:1 thumbnail for the blog grid cards (falls back to cover). */
  cardImage: string;
  content?: string;
}

export interface ApiTestimonial {
  id: string;
  author: string;
  role: string;
  body: string;
  rating: number;
  avatarUrl?: string | null;
}

export interface ApiIndustry {
  id: string;
  key: string;
  label: string;
  description: string;
  cover: string;
}

/** One body section of an SEO landing page, as authored in the admin. */
export interface ApiSeoSection {
  heading: string;
  body: string;
  bullets: string[];
}

export interface ApiSeoFaq {
  question: string;
  answer: string;
}

/** Row in the landing-page index — enough for the footer and the sitemap. */
export interface ApiSeoPageSummary {
  slug: string;
  name: string;
  h1: string;
  updatedAt?: string;
  /** Products this landing page covers — drives contextual internal linking. */
  productSlugs?: string[];
}

/**
 * A full landing page. `industries`, `products` and `caseStudies` are resolved
 * server-side from live records, so a page can only ever show content that
 * genuinely exists and is still published.
 */
export interface ApiSeoPage {
  slug: string;
  name: string;
  primaryKeyword: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroDescription: string;
  heroImageUrl?: string | null;
  heroImageAlt?: string | null;
  sections: ApiSeoSection[];
  faqs: ApiSeoFaq[];
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImageUrl?: string | null;
  canonicalUrl?: string | null;
  industries: { key: string; label: string; description?: string | null }[];
  products: { slug: string; title: string; cover?: string | null; specs: string[] }[];
  caseStudies: {
    slug: string;
    title: string;
    client: string;
    industry: string;
    summary: string;
    cover?: string | null;
  }[];
}

export interface ApiLogo {
  id: string;
  name: string;
  imageUrl?: string | null;
  kind: "client" | "integration" | "certification";
  /**
   * Slug of this client's case study, when there is one and it is live. The API
   * withholds it for an unpublished study, so a present slug is always safe to
   * link to.
   */
  caseStudySlug?: string | null;
}

export interface ApiTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  group: "director" | "team";
}

export interface ApiFaq {
  id: string;
  question: string;
  answer: string;
  /** Owning product, or null for a FAQ shown on every product page. */
  productId?: string | null;
}

export interface ApiJobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export interface ApiCaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  /** Wide 21:9 banner for the case-study detail page. */
  cover: string;
  /** Square 1:1 thumbnail for the grid/related cards (falls back to cover). */
  cardImage: string;
  metrics: { label: string; value: string }[];
}

export interface ApiSettings {
  name: string;
  shortName: string;
  parent: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  social: { label: string; href: string; active?: boolean }[];
  hours: { label: string; value: string }[];
}
