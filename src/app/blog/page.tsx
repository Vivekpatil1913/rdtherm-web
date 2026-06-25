import type { Metadata } from "next";
import { PageHero } from "@/sections/shared/PageHero";
import { BlogList } from "@/sections/blog/BlogList";
import { blogHero } from "@/data/blog";
import { getBlogsPage } from "@/services/content";

const PAGE_SIZE = 6;

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
  const { items, total } = await getBlogsPage(1, PAGE_SIZE);
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
      <BlogList initialPosts={items} total={total} pageSize={PAGE_SIZE} />
    </>
  );
}
