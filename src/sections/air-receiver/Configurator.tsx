"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Eye, Maximize2, Ruler, BadgePercent, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, viewportOnce } from "@/animations/motion";
import { cn } from "@/lib/cn";
import { ConfigSelect } from "@/components/air-receiver/ConfigSelect";
import { AirReceiverVisual, type ReceiverView } from "@/components/air-receiver/AirReceiverVisual";
import { QuoteModal, type QuoteContext, type QuoteLine } from "@/components/air-receiver/QuoteModal";
import {
  configFields,
  defaultConfig,
  dimensionsByVolume,
  type AirReceiverConfig,
  type ConfigKey,
} from "@/data/air-receiver";

const VIEWS: { key: ReceiverView; label: string; icon: typeof Eye }[] = [
  { key: "front", label: "Front View", icon: Eye },
  { key: "side", label: "Side View", icon: Maximize2 },
  { key: "technical", label: "Technical View", icon: Ruler },
];

/** Resolve the human label for a selected value via the field definitions. */
function labelFor(key: ConfigKey, value: string): string {
  const field = configFields.find((f) => f.key === key);
  return field?.options.find((o) => o.value === value)?.label ?? value;
}

export function Configurator() {
  const [config, setConfig] = useState<AirReceiverConfig>(defaultConfig);
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState<ReceiverView>("front");
  const [quote, setQuote] = useState<QuoteContext | null>(null);

  const setField = (key: ConfigKey) => (value: string) =>
    setConfig((prev) => ({ ...prev, [key]: value }));

  const dims = dimensionsByVolume[config.volume] ?? dimensionsByVolume["2"];

  const summaryLines: QuoteLine[] = useMemo(() => {
    const lines = configFields.map((f) => ({ label: f.label, value: labelFor(f.key, config[f.key]) }));
    return [...lines, { label: "Quantity", value: String(quantity) }];
  }, [config, quantity]);

  const openQuote = () =>
    setQuote({
      title: "Standard Configuration",
      lines: summaryLines,
      source: "Air Receiver configurator",
    });

  return (
    <section id="configure" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <Container size="wide">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <SectionTag>Configure Your Air Receiver</SectionTag>
          <h2 className="mt-6 max-w-[760px] text-[32px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[40px] lg:text-[48px]">
            Build your vessel and <span className="text-[var(--color-accent)]">see it update live</span>.
          </h2>
          <p className="mt-4 max-w-[620px] text-[16px] leading-[1.6] text-[var(--color-ink-soft)]">
            Select your specification below — the preview, dimensions and quote summary update instantly. Every option
            maps to a real, manufacturable configuration.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ----- OPTIONS ----- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <div className="h-full rounded-[20px] border border-[var(--color-line)] bg-white p-5 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.25)] sm:p-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {configFields.map((f) => (
                  <ConfigSelect
                    key={f.key}
                    label={f.label}
                    icon={f.icon}
                    hint={f.hint}
                    options={f.options}
                    value={config[f.key]}
                    onChange={setField(f.key)}
                    swatch={f.key === "color" || f.key === "material"}
                  />
                ))}

                {/* quantity stepper */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-medium text-[var(--color-ink-soft)]">Quantity</span>
                  <div className="flex h-[52px] items-center gap-1 rounded-[12px] border border-[var(--color-line)] bg-white px-2">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="inline-flex size-9 items-center justify-center rounded-[9px] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg)] disabled:opacity-40"
                      disabled={quantity <= 1}
                    >
                      <Minus className="size-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.floor(Number(e.target.value) || 1)))}
                      className="w-full [appearance:textfield] bg-transparent text-center text-[16px] font-semibold text-[var(--color-ink)] outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      aria-label="Quantity"
                    />
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="inline-flex size-9 items-center justify-center rounded-[9px] text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg)]"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ----- VISUAL + SUMMARY (sticky) ----- */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              {/* live visual */}
              <div className="overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-white shadow-[0_24px_60px_-40px_rgba(0,0,0,0.25)]">
                <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] bg-white p-1.5">
                  {VIEWS.map((v) => {
                    const Icon = v.icon;
                    const isActive = view === v.key;
                    return (
                      <button
                        key={v.key}
                        type="button"
                        onClick={() => setView(v.key)}
                        className={cn(
                          "inline-flex flex-1 items-center justify-center gap-1.5 rounded-[10px] px-2 py-2 text-[12.5px] font-semibold transition-colors",
                          isActive
                            ? "bg-[var(--color-ink)] text-white"
                            : "text-[var(--color-ink-soft)] hover:bg-[var(--color-bg)]",
                        )}
                      >
                        <Icon className="size-3.5" />
                        <span className="hidden sm:inline">{v.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative bg-[linear-gradient(160deg,#fbfbfa_0%,#ececeb_100%)]">
                  <AirReceiverVisual key={view} config={config} view={view} className="h-[420px] w-full" />
                  {/* live badge */}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-[var(--color-ink-soft)] backdrop-blur-sm">
                    <span className="size-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
                    Live preview
                  </span>
                </div>

                <div className="grid grid-cols-3 divide-x divide-[var(--color-line)] border-t border-[var(--color-line)] bg-white text-center">
                  <SpecPill label="Diameter" value={`${dims.diameter} mm`} />
                  <SpecPill label="Height" value={`${dims.height} mm`} />
                  <SpecPill label="Approx. weight" value={`${dims.weight} kg`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----- SELECTED CONFIGURATION (one joined card, aligned under the top row) ----- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 overflow-hidden rounded-[20px] border border-[var(--color-line)] bg-white shadow-[0_24px_60px_-40px_rgba(0,0,0,0.25)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-10">
            {/* specs — aligns under the options card (col-span-7) */}
            <div className="p-6 lg:col-span-7 lg:p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold uppercase tracking-[0.06em] text-[var(--color-ink)]">
                  Selected Configuration
                </h3>
                <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-[11px] font-bold text-[var(--color-accent)]">
                  Qty {quantity}
                </span>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
                {summaryLines.slice(0, -1).map((l) => (
                  <div key={l.label} className="flex flex-col gap-0.5 border-b border-dashed border-[var(--color-line)] pb-2">
                    <dt className="text-[10.5px] uppercase tracking-[0.04em] text-[var(--color-muted)]">{l.label}</dt>
                    <dd className="text-[14px] font-semibold text-[var(--color-ink)]">{l.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* actions — aligns under the preview card (col-span-5) */}
            <div className="flex flex-col justify-center gap-3.5 border-t border-[var(--color-line)] bg-[var(--color-bg)] p-6 lg:col-span-5 lg:border-t-0 lg:p-8">
              {/* introductory trade-discount incentive */}
              <div className="flex items-start gap-3 rounded-[12px] border border-[var(--color-accent)]/25 bg-[var(--color-accent-soft)] px-4 py-3">
                <BadgePercent className="mt-0.5 size-5 shrink-0 text-[var(--color-accent)]" strokeWidth={2} />
                <p className="text-[12.5px] leading-[1.55] text-[var(--color-ink)]">
                  <span className="font-bold text-[var(--color-accent)]">Save up to 20%</span> on your first order — place
                  this configuration through us and our team applies an introductory discount on eligible builds.
                </p>
              </div>

              <button
                type="button"
                onClick={openQuote}
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px] bg-[#C8370B] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#A82E08]"
              >
                Get Quote &amp; Unlock Discount
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[12px] text-[var(--color-muted)]">
                <ShieldCheck className="size-3.5 text-[var(--color-accent)]" />
                No obligation · Reply within 1 business day
              </p>
            </div>
          </div>
        </motion.div>
      </Container>

      <QuoteModal open={!!quote} onClose={() => setQuote(null)} context={quote} />
    </section>
  );
}

function SpecPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-2 py-3">
      <p className="text-[10.5px] uppercase tracking-[0.04em] text-[var(--color-muted)]">{label}</p>
      <p className="mt-0.5 text-[14px] font-bold text-[var(--color-ink)]">{value}</p>
    </div>
  );
}
