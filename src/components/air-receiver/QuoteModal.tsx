"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle2, User, Building2, Mail, Phone, Globe, MapPin } from "lucide-react";
import { submitQuote } from "@/services/content";

export type QuoteLine = { label: string; value: string };

export type QuoteContext = {
  /** Heading shown in the modal, e.g. "Standard Configuration" / "Custom Air Receiver". */
  title: string;
  /** Auto-attached configuration summary (label / value pairs). */
  lines: QuoteLine[];
  /** Lead source tag for the CRM. */
  source: string;
  /** Free-text requirements carried over from a custom build (optional). */
  notes?: string;
  /** Product the quote is for (defaults to "Air Receiver"). */
  productName?: string;
  /** "standard" (configurator) or "custom" (builder). Defaults to "standard". */
  quoteType?: "standard" | "custom";
};

const MESSAGE_LIMIT = 300;

// Validation rules — kept in sync with the backend (validate middleware).
const NAME_RE = /^[A-Za-z][A-Za-z .'-]*$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;

/** Strip anything that isn't a letter / space / basic name punctuation. */
const sanitizeName = (v: string) => v.replace(/[^A-Za-z .'-]/g, "");
/** Digits only, max 10 (Indian mobile). */
const sanitizeMobile = (v: string) => v.replace(/\D/g, "").slice(0, 10);
/** Company must not contain numbers. */
const sanitizeCompany = (v: string) => v.replace(/\d/g, "");

type FormState = {
  name: string;
  company: string;
  email: string;
  mobile: string;
  country: string;
  city: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  company: "",
  email: "",
  mobile: "",
  country: "",
  city: "",
  message: "",
};

/**
 * Shared inquiry modal for both the standard configurator and the custom
 * builder. The selected configuration is auto-attached and a structured
 * payload is assembled so a future API can persist the config verbatim.
 */
export function QuoteModal({
  open,
  onClose,
  context,
}: {
  open: boolean;
  onClose: () => void;
  context: QuoteContext | null;
}) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  // Single close path — resets transient state so the next open is clean,
  // then notifies the parent. Used by the X, backdrop, Escape and success view.
  const close = useCallback(() => {
    setDone(false);
    setError(null);
    setErrors({});
    onClose();
  }, [onClose]);

  // Escape to close + body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (k === "name") value = sanitizeName(value);
    else if (k === "mobile") value = sanitizeMobile(value);
    else if (k === "company") value = sanitizeCompany(value);
    setForm((p) => ({ ...p, [k]: value }));
    setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Name is required.";
    else if (form.name.trim().length < 2) next.name = "Name must be at least 2 characters.";
    else if (!NAME_RE.test(form.name.trim())) next.name = "Name can contain letters only.";
    if (!form.company.trim()) next.company = "Company is required.";
    else if (/\d/.test(form.company)) next.company = "Company name can't contain numbers.";
    if (!EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid email (e.g. abc@gmail.com).";
    if (!MOBILE_RE.test(form.mobile)) next.mobile = "Enter a 10-digit number starting 6, 7, 8 or 9.";
    if (!form.country.trim()) next.country = "Country is required.";
    if (!form.city.trim()) next.city = "City is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !context) return;
    if (!validate()) return;
    setSubmitting(true);
    setError(null);

    // The selected configuration is attached as structured label/value rows;
    // any custom notes carried over from a builder become an extra row.
    const configuration = [
      ...context.lines,
      ...(context.notes ? [{ label: "Additional requirements", value: context.notes }] : []),
    ];

    const res = await submitQuote({
      name: form.name,
      company: form.company,
      email: form.email,
      mobile: form.mobile,
      country: form.country,
      city: form.city,
      message: form.message.trim(),
      productName: context.productName ?? "Air Receiver",
      quoteType: context.quoteType ?? "standard",
      configuration,
      source: context.source,
    });

    setSubmitting(false);
    if (res.ok) {
      setDone(true);
      setForm(EMPTY);
    } else {
      // Surface the backend's per-field validation errors on the matching fields.
      if (res.fieldErrors && Object.keys(res.fieldErrors).length) {
        setErrors(res.fieldErrors as Partial<Record<keyof FormState, string>>);
        setError("Please correct the highlighted fields and try again.");
      } else {
        setError(res.error || "Could not send your enquiry. Please try again.");
      }
    }
  };

  return (
    <AnimatePresence>
      {open && context && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={close} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Request a quote — ${context.title}`}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-t-[22px] border border-[var(--color-line)] bg-white shadow-2xl sm:rounded-[22px]"
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-[var(--color-line)] px-6 py-5 sm:px-8">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  Request a Quote
                </p>
                <h3 className="mt-1 text-[20px] font-bold leading-tight sm:text-[24px]">{context.title}</h3>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-bg)]"
              >
                <X className="size-4.5" />
              </button>
            </div>

            <div className="grid flex-1 grid-cols-1 overflow-auto md:grid-cols-[1fr_280px]">
              {/* form */}
              {done ? (
                <div className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center md:col-span-2">
                  <span className="inline-flex size-16 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h4 className="text-[22px] font-bold">Enquiry received</h4>
                  <p className="max-w-[380px] text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">
                    Thanks — your configuration and details are with our engineering team. We&apos;ll get back to you
                    within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-2 inline-flex h-12 items-center rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px] bg-[var(--color-bg-dark)] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#1e1e1e]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 px-6 py-6 sm:px-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <ModalField label="Name" icon={<User className="size-4" />} value={form.name} onChange={set("name")} error={errors.name} required />
                      <ModalField label="Company" icon={<Building2 className="size-4" />} value={form.company} onChange={set("company")} error={errors.company} required />
                      <ModalField label="Email" type="email" icon={<Mail className="size-4" />} value={form.email} onChange={set("email")} error={errors.email} required />
                      <ModalField label="Mobile" type="tel" icon={<Phone className="size-4" />} value={form.mobile} onChange={set("mobile")} error={errors.mobile} required />
                      <ModalField label="Country" icon={<Globe className="size-4" />} value={form.country} onChange={set("country")} error={errors.country} required />
                      <ModalField label="City" icon={<MapPin className="size-4" />} value={form.city} onChange={set("city")} error={errors.city} required />
                    </div>
                    <label className="flex flex-col gap-1.5">
                      <span className="text-[12.5px] font-medium text-[var(--color-ink-soft)]">
                        Message <span className="font-normal text-[var(--color-muted)]">(optional)</span>
                      </span>
                      <textarea
                        value={form.message}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, message: e.target.value.slice(0, MESSAGE_LIMIT) }))
                        }
                        rows={3}
                        maxLength={MESSAGE_LIMIT}
                        placeholder="Anything else we should know — timeline, certification, delivery location…"
                        className="resize-y break-words rounded-[10px] border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-[14.5px] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
                      />
                      <span
                        className={
                          "self-end text-[11px] font-medium tabular-nums " +
                          (form.message.length >= MESSAGE_LIMIT ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]")
                        }
                      >
                        {form.message.length}/{MESSAGE_LIMIT}
                      </span>
                    </label>

                    {error && (
                      <p className="rounded-[10px] bg-red-50 px-4 py-3 text-[13.5px] text-red-600">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-1 inline-flex h-13 items-center justify-center gap-2 rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px] bg-[#C8370B] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#A82E08] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting && <Loader2 className="size-4 animate-spin" />}
                      {submitting ? "Sending…" : "Submit Quote Request"}
                    </button>
                    <p className="text-[12px] text-[var(--color-muted)]">
                      Your selected configuration is attached automatically. We never share your details.
                    </p>
                  </form>

                  {/* attached configuration */}
                  <aside className="border-t border-[var(--color-line)] bg-[var(--color-bg)] px-6 py-6 md:border-l md:border-t-0 md:px-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                      Attached Configuration
                    </p>
                    <dl className="mt-4 flex flex-col gap-2.5">
                      {context.lines.map((l) => (
                        <div key={l.label} className="flex items-baseline justify-between gap-3 border-b border-dashed border-[var(--color-line)] pb-2">
                          <dt className="text-[12.5px] text-[var(--color-muted)]">{l.label}</dt>
                          <dd className="text-right text-[13px] font-semibold text-[var(--color-ink)]">{l.value}</dd>
                        </div>
                      ))}
                    </dl>
                    {context.notes && (
                      <div className="mt-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">Notes</p>
                        <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[var(--color-ink-soft)] whitespace-pre-wrap">{context.notes}</p>
                      </div>
                    )}
                  </aside>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalField({
  label,
  icon,
  value,
  onChange,
  type = "text",
  required,
  error,
}: {
  label: string;
  icon: React.ReactNode;
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
      <span className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          inputMode={type === "tel" ? "numeric" : undefined}
          aria-invalid={!!error}
          className={
            "h-12 w-full rounded-[10px] border bg-white pl-9 pr-3 text-[14.5px] outline-none transition-colors focus:ring-2 focus:ring-[var(--color-accent-soft)] " +
            (error ? "border-[var(--color-accent)] focus:border-[var(--color-accent)]" : "border-[var(--color-line)] focus:border-[var(--color-accent)]")
          }
        />
      </span>
      {error && <span className="text-[12px] text-[var(--color-accent)]">{error}</span>}
    </label>
  );
}
