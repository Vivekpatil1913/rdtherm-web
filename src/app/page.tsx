import type { Metadata } from "next";
import { Hero } from "@/sections/home/Hero";
import { WhyRdtherm } from "@/sections/home/WhyRdtherm";
import { Products } from "@/sections/home/Products";
import { Industries } from "@/sections/home/Industries";
import { TrustedBy } from "@/sections/home/TrustedBy";
import { LatestBlog } from "@/sections/home/LatestBlog";
import { Testimonials } from "@/sections/home/Testimonials";
import { siteConfig } from "@/data/site";
import {
  getProducts,
  getIndustries,
  getLogosByKind,
  getBlogs,
  getTestimonials,
} from "@/services/content";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} — Process Equipment, Engineered & Manufactured Right`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — Process Equipment, Engineered & Manufactured Right`,
    description: siteConfig.description,
    url: "/",
    type: "website",
  },
  twitter: {
    title: `${siteConfig.name} — Process Equipment, Engineered & Manufactured Right`,
    description: siteConfig.description,
  },
};

export default async function HomePage() {
  const [products, industries, logos, blogs, testimonials] = await Promise.all([
    getProducts(),
    getIndustries(),
    getLogosByKind("client"),
    getBlogs(),
    getTestimonials(),
  ]);

  const homeProducts = products.slice(0, 8).map((p) => ({
    label: p.title,
    slug: p.slug,
    image: p.cover,
  }));

  return (
    <>
      <Hero />
      <WhyRdtherm />
      <Products items={homeProducts} />
      <Industries items={industries} />
      <TrustedBy logos={logos} />
      <LatestBlog posts={blogs.slice(0, 3)} />
      <Testimonials items={testimonials} />
    </>
  );
}
