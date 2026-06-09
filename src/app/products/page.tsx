import type { Metadata } from "next";
import { PageHero } from "@/sections/shared/PageHero";
import { ProductGrid } from "@/sections/products/ProductGrid";
import { TrustedBy } from "@/sections/home/TrustedBy";
import { productsHero } from "@/data/products";
import { getProducts, getLogosByKind } from "@/services/content";

const TITLE = "Products — Process Equipment";
const DESCRIPTION =
  "Pressure vessels, heat exchangers, reactors, distillation columns and process skids designed and fabricated to global standards.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "pressure vessels India",
    "heat exchanger manufacturer",
    "reactor fabricator",
    "distillation column India",
    "process skid manufacturer",
    "deaerator manufacturer",
    "air receiver tank",
    "flow reactor skids",
  ],
  alternates: { canonical: "/products" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/products",
    type: "website",
  },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default async function ProductsPage() {
  const [start, accent] = productsHero.heading;
  const [products, logos] = await Promise.all([getProducts(), getLogosByKind("client")]);
  return (
    <>
      <PageHero
        eyebrow={productsHero.eyebrow}
        heading={
          <>
            {start}
            <span className="text-[var(--color-accent)]">{accent}</span>
          </>
        }
        description={productsHero.description}
      />
      <ProductGrid products={products} />
      <TrustedBy logos={logos} />
    </>
  );
}
