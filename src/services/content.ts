/**
 * Content services — typed accessors for the public API.
 * Each list returns `[]` and each detail returns `null` on failure, so callers
 * can render empty/not-found states without try/catch.
 */

import { apiGet, apiPost } from "@/lib/api";
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

export const getBlogs = () => apiGet<ApiBlog[]>("/blogs", []);
export const getBlog = (slug: string) => apiGet<ApiBlog | null>(`/blogs/${slug}`, null);

export const getTestimonials = () => apiGet<ApiTestimonial[]>("/testimonials", []);
export const getIndustries = () => apiGet<ApiIndustry[]>("/industries", []);
export const getTeam = () => apiGet<ApiTeamMember[]>("/team", []);
export const getFaqs = () => apiGet<ApiFaq[]>("/faqs", []);
export const getCareers = () => apiGet<ApiJobOpening[]>("/careers", []);
export const getCaseStudies = () => apiGet<ApiCaseStudy[]>("/case-studies", []);
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
}

export const submitLead = (input: LeadInput) => apiPost("/leads", input);
