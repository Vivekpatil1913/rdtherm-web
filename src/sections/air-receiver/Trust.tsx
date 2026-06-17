import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Reveal } from "@/components/ui/Reveal";
import { certifications, trust } from "@/data/air-receiver";

function icon(name: string): LucideIcon {
  return ((Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.ShieldCheck) as LucideIcon;
}

export function Trust() {
  return (
    <section className="bg-[var(--color-bg-dark)] py-16 text-white lg:py-24">
      <Container size="wide">
        <Reveal>
          <SectionTag variant="dark">Trust &amp; Assurance</SectionTag>
          <h2 className="mt-6 max-w-[760px] text-[32px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[40px] lg:text-[48px]">
            Built to code, backed by <span className="text-[var(--color-accent)]">three decades</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => {
            const Icon = icon(t.icon);
            return (
              <Reveal
                key={t.title}
                as="div"
                className="flex flex-col gap-4 rounded-[18px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-[13px] bg-[var(--color-accent)] text-white">
                  <Icon className="size-[22px]" strokeWidth={1.8} />
                </span>
                <h3 className="text-[18px] font-bold leading-tight">{t.title}</h3>
                <p className="text-[14px] leading-[1.6] text-white/65">{t.body}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal as="div" className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white/50">
            Certified &amp; inspected to
          </p>
          <div className="flex flex-wrap gap-2.5">
            {certifications.map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-[13px] font-semibold backdrop-blur-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
