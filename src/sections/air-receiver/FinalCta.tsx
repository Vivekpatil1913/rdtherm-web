import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="bg-[var(--color-bg-soft)] py-16 lg:py-24">
      <Container size="wide">
        <Reveal className="overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#f5612e_0%,#e94e1b_55%,#b8390f_100%)] p-10 text-white shadow-[0_30px_80px_-30px_rgba(233,78,27,0.45)] lg:p-16">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/80">
                R&amp;D Therm Engineering
              </p>
              <h2 className="mt-3 text-[30px] font-bold leading-[1.08] tracking-[-0.01em] sm:text-[40px] lg:text-[48px]">
                Need a Custom Air Receiver Solution?
              </h2>
              <p className="mt-4 max-w-[560px] text-[16px] leading-[1.6] text-white/85">
                Our engineering team can design and manufacture air receivers according to your exact requirements —
                volume, pressure, material, certification and delivery.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <a
                href="#custom-quote"
                className="group inline-flex h-14 items-center gap-3 rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px] bg-white pl-6 pr-2 text-[16px] font-medium text-[var(--color-ink)] transition-colors hover:bg-white/90"
              >
                Get Quote
                <span className="inline-flex size-11 items-center justify-center rounded-[8px] bg-[var(--color-accent)] text-white">
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </a>
              <Button href="/contact" variant="dark">
                Contact Engineering Team
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
