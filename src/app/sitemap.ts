import type { MetadataRoute } from "next";
import { getProducts, getBlogs } from "@/services/content";

const SITE_URL = "https://rdtherm.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [products, blogs] = await Promise.all([getProducts(), getBlogs()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" },
    { url: "/products", priority: 0.9, changeFrequency: "monthly" },
    { url: "/manufacturing", priority: 0.8, changeFrequency: "monthly" },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { url: "/careers", priority: 0.6, changeFrequency: "monthly" },
    { url: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ].map((r) => ({ ...r, url: `${SITE_URL}${r.url}`, lastModified: now })) as MetadataRoute.Sitemap;

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: "yearly",
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
