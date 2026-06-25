import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Reveal } from "@/components/ui/Reveal";
import { specRows } from "@/data/air-receiver";

const COLUMNS = ["Volume", "Pressure", "Material", "Diameter", "Height", "Weight", "Connection"];

export function TechnicalSpecs() {
  return (
    <section className="bg-[var(--color-bg-soft)] pt-16 pb-10 lg:pt-24 lg:pb-12">
      <Container size="wide">
        <Reveal>
          <SectionTag>Technical Specifications</SectionTag>
          <h2 className="mt-6 max-w-[760px] text-[32px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[40px] lg:text-[48px]">
            Standard sizing <span className="text-[var(--color-accent)]">reference table</span>.
          </h2>
          <p className="mt-4 max-w-[620px] text-[16px] leading-[1.6] text-[var(--color-ink-soft)]">
            Indicative dimensions for our most-requested sizes. Custom volumes, pressures and nozzle schedules are
            manufactured to order.
          </p>
        </Reveal>

        <Reveal as="div" className="mt-10 overflow-hidden rounded-[18px] border border-[var(--color-line)] bg-white">
          <div className="scroll-x-bar overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="bg-[var(--color-bg-dark)] text-white">
                  {COLUMNS.map((c) => (
                    <th
                      key={c}
                      className="px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.08em] first:pl-6 last:pr-6"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((r, i) => (
                  <tr
                    key={r.volume}
                    className={i % 2 === 1 ? "bg-[var(--color-bg)]" : "bg-white"}
                  >
                    <td className="px-5 py-4 pl-6 text-[14.5px] font-bold text-[var(--color-ink)]">{r.volume}</td>
                    <td className="px-5 py-4 text-[14px] text-[var(--color-ink-soft)]">{r.pressure}</td>
                    <td className="px-5 py-4 text-[14px] text-[var(--color-ink-soft)]">{r.material}</td>
                    <td className="px-5 py-4 text-[14px] tabular-nums text-[var(--color-ink-soft)]">{r.diameter}</td>
                    <td className="px-5 py-4 text-[14px] tabular-nums text-[var(--color-ink-soft)]">{r.height}</td>
                    <td className="px-5 py-4 text-[14px] tabular-nums text-[var(--color-ink-soft)]">{r.weight}</td>
                    <td className="px-5 py-4 pr-6 text-[14px] tabular-nums text-[var(--color-ink-soft)]">{r.connection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        {/* Mobile scroll affordance — native scrollbars don't show on touch devices. */}
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] font-medium text-[var(--color-muted)] sm:hidden">
          <span aria-hidden>←</span> Swipe to see all columns <span aria-hidden>→</span>
        </p>
        <p className="mt-4 text-[12.5px] text-[var(--color-muted)]">
          * Weights and dimensions are indicative for MS construction and may vary with material, pressure rating and
          accessories. Refer to the GA drawing for certified dimensions.
        </p>
      </Container>
    </section>
  );
}
