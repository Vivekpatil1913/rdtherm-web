import type { Metadata } from "next";
import { Hero } from "@/sections/home/Hero";
import { WhyRdtherm } from "@/sections/home/WhyRdtherm";
import { Products } from "@/sections/home/Products";
import { Industries } from "@/sections/home/Industries";
import { TrustedBy } from "@/sections/home/TrustedBy";
import { LatestBlog } from "@/sections/home/LatestBlog";
import { Testimonials } from "@/sections/home/Testimonials";
import { siteConfig } from "@/data/site";

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

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyRdtherm />
      <Products />
      <Industries />
      <TrustedBy />
      <LatestBlog />
      <Testimonials />
    </>
  );
}
