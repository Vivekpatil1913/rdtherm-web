import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Reveal } from "@/components/ui/Reveal";
import { productFaqs } from "@/data/products";

/**
 * Shared product-FAQ section. Same Q&A on every product detail page.
 * Future admin panel manages a single FAQ list — this component renders it.
 * Uses native <details>/<summary> so it stays server-rendered (no JS needed).
 */
export function ProductFaqs() {
  if (!productFaqs || productFaqs.length === 0) return null;

  return (
    <section className="bg-[var(--color-bg-soft)] py-10 lg:py-14">
      <Container size="narrow">
        <Reveal>
          <SectionTag>Frequently asked</SectionTag>
          <h2 className="mt-6 text-[32px] leading-[1.1] tracking-[-0.02em] sm:text-[40px] lg:text-[48px] font-bold">
            Questions buyers{" "}
            <span className="text-[var(--color-accent)]">ask first</span>.
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-3">
          {productFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-[14px] border border-[var(--color-line)] bg-white px-5 py-4 lg:px-6 lg:py-5 open:border-[var(--color-accent)]/40 open:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 list-none text-[16px] sm:text-[18px] font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <ChevronDown className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-180 text-[var(--color-accent)]" />
              </summary>
              <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ink-soft)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
