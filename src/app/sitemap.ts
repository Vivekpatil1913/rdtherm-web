import type { MetadataRoute } from "next";
import { productList } from "@/data/products";
import { blogList } from "@/data/blog";

const SITE_URL = "https://rdtherm.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" },
    { url: "/products", priority: 0.9, changeFrequency: "monthly" },
    { url: "/manufacturing", priority: 0.8, changeFrequency: "monthly" },
    { url: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { url: "/careers", priority: 0.6, changeFrequency: "monthly" },
    { url: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ].map((r) => ({ ...r, url: `${SITE_URL}${r.url}`, lastModified: now }));

  const productRoutes: MetadataRoute.Sitemap = productList.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogList.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: "yearly",
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
