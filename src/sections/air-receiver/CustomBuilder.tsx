"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Sparkles, PenTool } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, viewportOnce } from "@/animations/motion";
import { ConfigSelect } from "@/components/air-receiver/ConfigSelect";
import { configFields, customDropdownKeys, type ConfigKey } from "@/data/air-receiver";
import { submitQuote } from "@/services/content";

/** Pull a field definition by key for reuse in the custom builder. */
const field = (key: ConfigKey) => configFields.find((f) => f.key === key)!;

const REQUIREMENTS_LIMIT = 300;

// Validation rules — kept in sync with the backend (validate middleware).
const NAME_RE = /^[A-Za-z][A-Za-z .'-]*$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;

/** Strip anything that isn't a letter / space / basic name punctuation. */
const sanitizeName = (v: string) => v.replace(/[^A-Za-z .'-]/g, "");
/** Digits only, max 10 (Indian mobile). */
const sanitizeMobile = (v: string) => v.replace(/\D/g, "").slice(0, 10);

/** Decimal input: digits + a single dot, no leading zeros, length-capped. */
const cleanDecimal = (raw: string): string => {
  let v = raw.replace(/[^\d.]/g, "");
  const dot = v.indexOf(".");
  if (dot !== -1) v = v.slice(0, dot + 1) + v.slice(dot + 1).replace(/\./g, "");
  v = v.replace(/^0+(?=\d)/, ""); // drop leading zeros, keep "0."
  return v.slice(0, 9);
};
/** Whole-number input: digits only, no leading zeros, length-capped. */
const cleanInteger = (raw: string): string =>
  raw.replace(/\D/g, "").replace(/^0+(?=\d)/, "").slice(0, 5);
// Sensible upper bounds so absurd values are rejected on submit.
const SPEC_MAX: Record<keyof Spec, number> = {
  volume: 100000,
  pressure: 1000,
  diameter: 100000,
  height: 100000,
  quantity: 99999,
};

type Spec = { volume: string; pressure: string; diameter: string; height: string; quantity: string };
type Drops = Record<(typeof customDropdownKeys)[number], string>;
type Customer = { name: string; company: string; email: string; mobile: string; city: string; country: string };

const SPEC0: Spec = { volume: "", pressure: "", diameter: "", height: "", quantity: "1" };
const CUST0: Customer = { name: "", company: "", email: "", mobile: "", city: "", country: "" };

export function CustomBuilder() {
  const sectionRef = useRef<HTMLElement>(null);
  const [spec, setSpec] = useState<Spec>(SPEC0);
  const [drops, setDrops] = useState<Drops>(
    () => customDropdownKeys.reduce((a, k) => ({ ...a, [k]: field(k).default }), {} as Drops),
  );
  const [requirements, setRequirements] = useState("");
  const [cust, setCust] = useState<Customer>(CUST0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});
  const [specErrors, setSpecErrors] = useState<Partial<Record<keyof Spec, string>>>({});

  const setS = (k: keyof Spec) => (e: React.ChangeEvent<HTMLInputElement>) => {
    // Numeric only — quantity is whole numbers, dimensions allow decimals.
    const value = k === "quantity" ? cleanInteger(e.target.value) : cleanDecimal(e.target.value);
    setSpec((p) => ({ ...p, [k]: value }));
    setSpecErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));
  };
  const setC = (k: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (k === "name") value = sanitizeName(value);
    else if (k === "mobile") value = sanitizeMobile(value);
    else if (k === "company") value = value.replace(/\d/g, "");
    setCust((p) => ({ ...p, [k]: value }));
    setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));
  };

  const validate = () => {
    const n: Partial<Record<keyof Customer, string>> = {};
    if (!cust.name.trim()) n.name = "Name is required.";
    else if (cust.name.trim().length < 2) n.name = "Name must be at least 2 characters.";
    else if (!NAME_RE.test(cust.name.trim())) n.name = "Name can contain letters only.";
    if (!cust.company.trim()) n.company = "Company is required.";
    else if (/\d/.test(cust.company)) n.company = "Company name can't contain numbers.";
    if (!EMAIL_RE.test(cust.email.trim())) n.email = "Enter a valid email (e.g. abc@gmail.com).";
    if (!MOBILE_RE.test(cust.mobile)) n.mobile = "Enter a 10-digit number starting 6, 7, 8 or 9.";
    if (!cust.city.trim()) n.city = "City is required.";
    if (!cust.country.trim()) n.country = "Country is required.";

    // Required dimensions + quantity — must be positive numbers within range.
    const s: Partial<Record<keyof Spec, string>> = {};
    const checkNum = (key: keyof Spec, label: string) => {
      const v = spec[key];
      if (!v.trim()) return `${label} is required.`;
      const n = Number(v);
      if (Number.isNaN(n) || n <= 0) return "Enter a valid number.";
      if (n > SPEC_MAX[key]) return `Value can't exceed ${SPEC_MAX[key].toLocaleString()}.`;
      return null;
    };
    (["volume", "pressure", "diameter", "height", "quantity"] as (keyof Spec)[]).forEach((key) => {
      const label = key === "quantity" ? "Quantity" : key[0].toUpperCase() + key.slice(1);
      const err = checkNum(key, label);
      if (err) s[key] = err;
    });

    setErrors(n);
    setSpecErrors(s);
    return Object.keys(n).length === 0 && Object.keys(s).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    setError(null);

    const dropLines = customDropdownKeys.map((k) => {
      const f = field(k);
      const label = f.options.find((o) => o.value === drops[k])?.label ?? drops[k];
      return { label: f.label, value: label };
    });
    // Attach the full custom specification as structured label/value rows.
    const configuration = [
      { label: "Volume", value: spec.volume ? `${spec.volume} m³` : "—" },
      { label: "Pressure", value: spec.pressure ? `${spec.pressure} Bar` : "—" },
      { label: "Diameter", value: spec.diameter ? `${spec.diameter} mm` : "—" },
      { label: "Height", value: spec.height ? `${spec.height} mm` : "—" },
      ...dropLines,
      { label: "Quantity", value: spec.quantity || "1" },
    ];

    const res = await submitQuote({
      name: cust.name,
      company: cust.company,
      email: cust.email,
      mobile: cust.mobile,
      country: cust.country,
      city: cust.city,
      message: requirements.trim(),
      productName: "Air Receiver",
      quoteType: "custom",
      configuration,
      source: "Air Receiver custom builder",
    });
    setSubmitting(false);
    if (res.ok) {
      setDone(true);
      setSpec(SPEC0);
      setRequirements("");
      setCust(CUST0);
      setSpecErrors({});
      // The tall form collapses into the short success message, which would
      // shift later sections into view — scroll the success card back into view.
      requestAnimationFrame(() =>
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    } else {
      // Surface the backend's per-field validation errors on the matching fields.
      if (res.fieldErrors && Object.keys(res.fieldErrors).length) {
        setErrors(res.fieldErrors as Partial<Record<keyof Customer, string>>);
        setError("Please correct the highlighted fields and try again.");
      } else {
        setError(res.error || "Could not send your request. Please try again.");
      }
    }
  };

  return (
    <section ref={sectionRef} id="custom-quote" className="scroll-mt-24 bg-[var(--color-bg-soft)] pt-10 pb-16 lg:pt-12 lg:pb-24">
      <Container size="wide">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="max-w-[760px]">
          <SectionTag>Customise Your Air Receiver</SectionTag>
          <h2 className="mt-6 text-[32px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[40px] lg:text-[48px]">
            Need something <span className="text-[var(--color-accent)]">built to spec</span>?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[var(--color-ink-soft)]">
            For non-standard volumes, pressures, dimensions, nozzle schedules or certifications, send us your exact
            requirement. Custom projects are handled directly by our engineering team.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          noValidate
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 overflow-hidden rounded-[24px] border border-[var(--color-line)] bg-white shadow-[0_30px_80px_-50px_rgba(0,0,0,0.3)]"
        >
          {/* accent banner — signals a high-value lead path */}
          <div className="flex items-center gap-3 bg-[linear-gradient(135deg,#f5612e_0%,#e94e1b_55%,#b8390f_100%)] px-6 py-4 text-white sm:px-9">
            <PenTool className="size-5 shrink-0" />
            <p className="text-[14px] font-semibold sm:text-[15px]">
              Custom Engineering Request — designed &amp; manufactured to your specification
            </p>
          </div>

          {done ? (
            <div className="flex flex-col items-center justify-center gap-4 px-8 pt-10 pb-16 text-center">
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                <CheckCircle2 className="size-8" />
              </span>
              <h3 className="text-[24px] font-bold">Request received</h3>
              <p className="max-w-[420px] text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">
                Thank you — your custom requirement is with our engineering team. Expect a detailed response within one
                business day.
              </p>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="mt-2 inline-flex h-12 items-center rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px] border border-[var(--color-line)] px-6 text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg)]"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <div className="px-6 py-8 sm:px-9 sm:py-10">
              {/* dimensions */}
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                Required Dimensions
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <UnitField label="Volume" unit="m³" value={spec.volume} onChange={setS("volume")} placeholder="e.g. 7.5" required error={specErrors.volume} maxLength={9} />
                <UnitField label="Pressure" unit="Bar" value={spec.pressure} onChange={setS("pressure")} placeholder="e.g. 14" required error={specErrors.pressure} maxLength={9} />
                <UnitField label="Diameter" unit="mm" value={spec.diameter} onChange={setS("diameter")} placeholder="e.g. 1500" required error={specErrors.diameter} maxLength={9} />
                <UnitField label="Height" unit="mm" value={spec.height} onChange={setS("height")} placeholder="e.g. 4200" required error={specErrors.height} maxLength={9} />
              </div>

              {/* construction dropdowns */}
              <p className="mt-8 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-muted)]">
                Construction &amp; Trim
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {customDropdownKeys.map((k) => {
                  const f = field(k);
                  return (
                    <ConfigSelect
                      key={k}
                      label={f.label}
                      icon={f.icon}
                      options={f.options}
                      value={drops[k]}
                      onChange={(v) => setDrops((p) => ({ ...p, [k]: v }))}
                      swatch={k === "color" || k === "material"}
                    />
                  );
                })}
                <UnitField label="Quantity" unit="nos" value={spec.quantity} onChange={setS("quantity")} placeholder="1" required error={specErrors.quantity} maxLength={5} />
              </div>

              {/* requirements */}
              <label className="mt-8 flex flex-col gap-1.5">
                <span className="text-[12.5px] font-medium text-[var(--color-ink-soft)]">
                  Additional Requirements <span className="font-normal text-[var(--color-muted)]">(optional)</span>
                </span>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value.slice(0, REQUIREMENTS_LIMIT))}
                  rows={4}
                  maxLength={REQUIREMENTS_LIMIT}
                  placeholder="Please mention any custom nozzle requirements, dimensions, certifications, mounting requirements, or special requests."
                  className="resize-y break-words rounded-[12px] border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
                />
                <span
                  className={
                    "self-end text-[11px] font-medium tabular-nums " +
                    (requirements.length >= REQUIREMENTS_LIMIT ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]")
                  }
                >
                  {requirements.length}/{REQUIREMENTS_LIMIT}
                </span>
              </label>

              {/* customer details */}
              <div className="mt-8 rounded-[18px] border border-[var(--color-line)] bg-[var(--color-bg)] p-5 sm:p-7">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-[var(--color-accent)]" />
                  <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--color-ink)]">
                    Customer Details
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <PlainField label="Name" value={cust.name} onChange={setC("name")} error={errors.name} required />
                  <PlainField label="Company Name" value={cust.company} onChange={setC("company")} error={errors.company} required />
                  <PlainField label="Email" type="email" value={cust.email} onChange={setC("email")} error={errors.email} required />
                  <PlainField label="Mobile Number" type="tel" value={cust.mobile} onChange={setC("mobile")} error={errors.mobile} required />
                  <PlainField label="City" value={cust.city} onChange={setC("city")} error={errors.city} required />
                  <PlainField label="Country" value={cust.country} onChange={setC("country")} error={errors.country} required />
                </div>
              </div>

              {error && (
                <p className="mt-6 rounded-[10px] bg-red-50 px-4 py-3 text-[14px] text-red-600">{error}</p>
              )}

              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-15 items-center justify-center gap-2.5 rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] rounded-br-[20px] bg-[#C8370B] px-9 text-[16px] font-semibold text-white shadow-[0_18px_40px_-18px_rgba(200,55,11,0.7)] transition-colors hover:bg-[#A82E08] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="size-5 animate-spin" /> : <Sparkles className="size-5" />}
                  {submitting ? "Sending…" : "Request Custom Quote"}
                </button>
                <p className="max-w-[320px] text-[12.5px] text-[var(--color-muted)]">
                  Priority handling for custom projects. A dedicated engineer will respond within one business day.
                </p>
              </div>
            </div>
          )}
        </motion.form>
      </Container>
    </section>
  );
}

function UnitField({
  label,
  unit,
  value,
  onChange,
  placeholder,
  required,
  error,
  maxLength,
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  maxLength?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12.5px] font-medium text-[var(--color-ink-soft)]">
        {label}
        {required && <span className="text-[var(--color-accent)]"> *</span>}
      </span>
      <span className="relative flex">
        <input
          value={value}
          onChange={onChange}
          inputMode="decimal"
          maxLength={maxLength}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={
            "h-[52px] w-full rounded-[12px] border bg-white pl-4 pr-14 text-[15px] font-semibold text-[var(--color-ink)] outline-none transition-colors focus:ring-2 focus:ring-[var(--color-accent-soft)] " +
            (error ? "border-[var(--color-accent)] focus:border-[var(--color-accent)]" : "border-[var(--color-line)] focus:border-[var(--color-accent)]")
          }
        />
        <span className="pointer-events-none absolute right-0 top-0 flex h-full items-center rounded-r-[12px] border-l border-[var(--color-line)] bg-[var(--color-bg)] px-3 text-[13px] font-semibold text-[var(--color-muted)]">
          {unit}
        </span>
      </span>
      {error && <span className="text-[12px] text-[var(--color-accent)]">{error}</span>}
    </label>
  );
}

function PlainField({
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12.5px] font-medium text-[var(--color-ink-soft)]">
        {label}
        {required && <span className="text-[var(--color-accent)]"> *</span>}
      </span>
      <input
        value={value}
        onChange={onChange}
        type={type}
        inputMode={type === "tel" ? "numeric" : undefined}
        aria-invalid={!!error}
        className={
          "h-12 rounded-[10px] border bg-white px-4 text-[14.5px] outline-none transition-colors focus:ring-2 focus:ring-[var(--color-accent-soft)] " +
          (error ? "border-[var(--color-accent)] focus:border-[var(--color-accent)]" : "border-[var(--color-line)] focus:border-[var(--color-accent)]")
        }
      />
      {error && <span className="text-[12px] text-[var(--color-accent)]">{error}</span>}
    </label>
  );
}
