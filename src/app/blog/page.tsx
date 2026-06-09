import type { Metadata } from "next";
import { PageHero } from "@/sections/shared/PageHero";
import { BlogList } from "@/sections/blog/BlogList";
import { blogHero } from "@/data/blog";
import { getBlogs } from "@/services/content";

const TITLE = "Blog — Engineering Notes & Case Studies";
const DESCRIPTION =
  "Engineering notes, case studies and shop-floor insights from R&D Therm's design and fabrication teams.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "process equipment blog",
    "manufacturing case studies",
    "ASME PED IBR articles",
    "heat exchanger design",
    "speciality alloys process equipment",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/blog",
    type: "website",
  },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default async function BlogPage() {
  const [start, accent, end] = blogHero.heading;
  const posts = await getBlogs();
  return (
    <>
      <PageHero
        eyebrow={blogHero.eyebrow}
        heading={
          <>
            {start}
            <span className="text-[var(--color-accent)]">{accent}</span>
            {end}
          </>
        }
        description={blogHero.description}
      />
      <BlogList posts={posts} />
    </>
  );
}
