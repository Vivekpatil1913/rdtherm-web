/**
 * Content services — typed accessors for the public API.
 * Each list returns `[]` and each detail returns `null` on failure, so callers
 * can render empty/not-found states without try/catch.
 */

import { apiGet, apiPost, apiPostForm } from "@/lib/api";
import type {
  ApiBlog,
  ApiCaseStudy,
  ApiFaq,
  ApiIndustry,
  ApiJobOpening,
  ApiLogo,
  ApiProduct,
  ApiSettings,
  ApiTeamMember,
  ApiTestimonial,
} from "@/lib/api-types";

export const getProducts = () => apiGet<ApiProduct[]>("/products", []);
export const getProduct = (slug: string) => apiGet<ApiProduct | null>(`/products/${slug}`, null);

export type BlogsPage = {
  items: ApiBlog[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

/** Server-side paginated blog list. Used for the blog page's lazy "load more". */
export const getBlogsPage = (page = 1, limit = 6) =>
  apiGet<BlogsPage>(`/blogs?page=${page}&limit=${limit}`, {
    items: [],
    total: 0,
    page,
    limit,
    hasMore: false,
  });

/** Convenience: latest N posts as a flat array (home page "Latest" section). */
export const getBlogs = async (limit = 6): Promise<ApiBlog[]> => (await getBlogsPage(1, limit)).items;
export const getBlog = (slug: string) => apiGet<ApiBlog | null>(`/blogs/${slug}`, null);

export const getTestimonials = () => apiGet<ApiTestimonial[]>("/testimonials", []);
export const getIndustries = () => apiGet<ApiIndustry[]>("/industries", []);
export const getTeam = () => apiGet<ApiTeamMember[]>("/team", []);
export const getFaqs = () => apiGet<ApiFaq[]>("/faqs", []);
export const getCareers = () => apiGet<ApiJobOpening[]>("/careers", []);
export const getCaseStudies = () => apiGet<ApiCaseStudy[]>("/case-studies", []);
export const getCaseStudy = (slug: string) => apiGet<ApiCaseStudy | null>(`/case-studies/${slug}`, null);
export const getSettings = () => apiGet<ApiSettings | null>("/settings", null);

export const getLogos = () => apiGet<ApiLogo[]>("/logos", []);
/** Logos filtered by kind (client / integration / certification). */
export async function getLogosByKind(kind: ApiLogo["kind"]) {
  const logos = await getLogos();
  return logos.filter((l) => l.kind === kind);
}

/** Team filtered by group (director / team). */
export async function getTeamByGroup(group: ApiTeamMember["group"]) {
  const team = await getTeam();
  return team.filter((m) => m.group === group);
}

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  source?: string;
  recaptchaToken?: string | null;
}

export const submitLead = (input: LeadInput) => apiPost("/leads", input);

/** A single label/value row of an attached product configuration. */
export interface QuoteConfigLine {
  label: string;
  value: string;
}

export interface QuoteInput {
  name: string;
  company: string;
  email: string;
  mobile: string;
  country: string;
  city: string;
  message?: string;
  productName?: string;
  quoteType?: "standard" | "custom";
  configuration?: QuoteConfigLine[];
  source?: string;
}

/** Air Receiver quote request — configurator (standard) & custom builder. */
export const submitQuote = (input: QuoteInput) => apiPost("/quotes", input);

export interface ApplicationInput {
  name: string;
  email: string;
  phone: string;
  role: string;
  portfolio?: string;
  message?: string;
  resume: File;
  recaptchaToken?: string | null;
}

/** Careers job application — multipart (fields + resume file). */
export const submitApplication = (input: ApplicationInput) => {
  const form = new FormData();
  form.append("name", input.name);
  form.append("email", input.email);
  form.append("phone", input.phone);
  form.append("recaptchaToken", input.recaptchaToken ?? "");
  form.append("role", input.role);
  form.append("portfolio", input.portfolio ?? "");
  form.append("message", input.message ?? "");
  form.append("resume", input.resume);
  return apiPostForm("/careers/apply", form);
};
