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
  summary: string;
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

export interface ApiLogo {
  id: string;
  name: string;
  imageUrl?: string | null;
  kind: "client" | "integration" | "certification";
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
  cover: string;
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
