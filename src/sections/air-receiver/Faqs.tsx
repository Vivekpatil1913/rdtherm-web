import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/data/air-receiver";

/** Native <details> accordion — stays server-rendered, no JS required. */
export function Faqs() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container size="narrow">
        <Reveal>
          <SectionTag>Frequently Asked</SectionTag>
          <h2 className="mt-6 text-[32px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[40px] lg:text-[48px]">
            Air receiver <span className="text-[var(--color-accent)]">questions</span>.
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <details
              key={faq.question}
              // Shared name = exclusive accordion (opening one closes the others).
              // First item open by default.
              name="air-receiver-faq"
              open={i === 0}
              className="group rounded-[14px] border border-[var(--color-line)] bg-white px-5 py-4 transition-all duration-300 open:border-[var(--color-accent)]/40 open:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.15)] lg:px-6 lg:py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-semibold text-[var(--color-ink)] [&::-webkit-details-marker]:hidden sm:text-[18px]">
                <span>{faq.question}</span>
                <ChevronDown className="size-5 shrink-0 text-[var(--color-accent)] transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ink-soft)]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
