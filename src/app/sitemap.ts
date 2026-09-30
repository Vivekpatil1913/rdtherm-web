import type { MetadataRoute } from "next";
import { getProducts, getBlogs, getSeoPages } from "@/services/content";
import { SITE_URL } from "@/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [products, blogs, seoPages] = await Promise.all([
    getProducts(),
    getBlogs(),
    getSeoPages(),
  ]);

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

  // Service + location landing pages live at the site root, and are authored in
  // the admin — so the sitemap has to read them rather than list them by hand.
  const seoRoutes: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: page.updatedAt ? new Date(page.updatedAt) : now,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...productRoutes, ...seoRoutes, ...blogRoutes];
}
