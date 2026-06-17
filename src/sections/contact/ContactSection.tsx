"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";
import { siteConfig } from "@/data/site";
import type { ApiSettings } from "@/lib/api-types";
import { submitLead } from "@/services/content";

const MESSAGE_LIMIT = 250;

// Name: letters/spaces (+ basic name punctuation) only — no digits or symbols.
const NAME_RE = /^[A-Za-z][A-Za-z .'-]*$/;
const sanitizeName = (v: string) => v.replace(/[^A-Za-z .'-]/g, "");
// Company must not contain numbers.
const sanitizeCompany = (v: string) => v.replace(/\d/g, "");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function ContactSection({ settings }: { settings?: ApiSettings | null }) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const contact = {
    address: settings?.address || siteConfig.contact.address,
    phone: settings?.phone || siteConfig.contact.phone,
    email: settings?.email || siteConfig.contact.email,
  };
  const firstHours = settings?.hours?.[0] ?? siteConfig.contact.hours[0];

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    else if (!NAME_RE.test(form.name.trim())) next.name = "Name can contain letters only.";
    if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.company.trim()) next.company = "Please enter your company name.";
    else if (/\d/.test(form.company)) next.company = "Company name can't contain numbers.";
    if (!form.message.trim()) next.message = "Please enter a short message.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    setError(null);
    const res = await submitLead({
      name: form.name,
      email: form.email,
      company: form.company,
      message: form.message,
      subject: "Website enquiry",
      source: "Website contact form",
    });
    setSubmitting(false);
    if (res.ok) {
      setSubmitted(true);
      setForm(INITIAL_STATE);
      setErrors({});
    } else {
      setError(res.error || "Could not send your enquiry. Please try again.");
    }
  };

  const set =
    <K extends keyof FormState>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      let value = e.target.value;
      if (key === "name") value = sanitizeName(value);
      else if (key === "company") value = sanitizeCompany(value);
      setForm((prev) => ({ ...prev, [key]: value }));
      // Clear this field's error as soon as the user edits it.
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    };

  return (
    <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-14">
          <motion.aside
            variants={stagger(0.05, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <motion.div variants={fadeUp}>
              <SectionTag>Talk to an engineer</SectionTag>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[44px] font-bold"
            >
              Tell us what you need to build — we&apos;ll get back within{" "}
              <span className="text-[var(--color-accent)]">24 hours</span>.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-[460px]"
            >
              Whether you have a P&ID, a datasheet, or just a process problem to solve — we&apos;ll put you in front of the right engineer fast.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              className="mt-2 flex flex-col gap-5 text-[15px] text-[var(--color-ink-soft)]"
            >
              <Item icon={<MapPin className="size-5" strokeWidth={1.8} />}>
                {contact.address}
              </Item>
              <Item icon={<Phone className="size-5" strokeWidth={1.8} />}>
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="hover:text-[var(--color-ink)]">
                  {contact.phone}
                </a>
              </Item>
              <Item icon={<Mail className="size-5" strokeWidth={1.8} />}>
                <a href={`mailto:${contact.email}`} className="hover:text-[var(--color-ink)]">
                  {contact.email}
                </a>
              </Item>
              <Item icon={<Clock className="size-5" strokeWidth={1.8} />}>
                <span>
                  {firstHours.label}: {firstHours.value}
                </span>
              </Item>
            </motion.ul>
          </motion.aside>

          <motion.form
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col gap-5 rounded-[22px] border border-[var(--color-line)] bg-white p-7 sm:p-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Full name"
                value={form.name}
                onChange={set("name")}
                error={errors.name}
                required
              />
              <Field
                label="Work email"
                type="email"
                value={form.email}
                onChange={set("email")}
                error={errors.email}
                required
              />
            </div>
            <Field
              label="Company"
              value={form.company}
              onChange={set("company")}
              error={errors.company}
              required
            />
            <TextareaField
              label="Message"
              value={form.message}
              onChange={(e) => {
                const value = e.target.value.slice(0, MESSAGE_LIMIT);
                setForm((prev) => ({ ...prev, message: value }));
                setErrors((prev) => (prev.message ? { ...prev, message: undefined } : prev));
              }}
              error={errors.message}
              required
              maxLength={MESSAGE_LIMIT}
            />

            <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[13px] text-[var(--color-muted)]">
                By submitting, you agree to our privacy policy.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-13 items-center gap-2 rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px] bg-[#C8370B] px-6 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-[#A82E08] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? <Loader2 className="size-4 animate-spin" /> : null}
                {submitting ? "Sending…" : "Send enquiry"}
              </button>
            </div>

            {submitted ? (
              <p className="rounded-[10px] bg-[var(--color-accent-soft)] px-4 py-3 text-[14px] text-[var(--color-accent)]">
                Thanks — we&apos;ve received your enquiry and will reply within one business day.
              </p>
            ) : null}
            {error ? (
              <p className="rounded-[10px] bg-red-50 px-4 py-3 text-[14px] text-red-600">{error}</p>
            ) : null}
          </motion.form>
        </div>
      </Container>
    </section>
  );
}

function Item({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-white text-[var(--color-accent)] border border-[var(--color-line)]">
        {icon}
      </span>
      <span className="leading-[1.5]">{children}</span>
    </li>
  );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span className="text-[13px] font-medium text-[var(--color-ink)]">
      {label}
      {required ? (
        <span className="text-red-500" aria-hidden>
          {" "}
          *
        </span>
      ) : null}
    </span>
  );
}

function Field({
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
    <label className="flex flex-col gap-2">
      <FieldLabel label={label} required={required} />
      <input
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        className={
          "h-12 rounded-[10px] border bg-white px-4 text-[15px] text-[var(--color-ink)] outline-none transition-colors duration-200 focus:ring-2 focus:ring-[var(--color-accent-soft)] " +
          (error
            ? "border-[var(--color-accent)] focus:border-[var(--color-accent)]"
            : "border-[var(--color-line)] focus:border-[var(--color-accent)]")
        }
      />
      {error ? <span className="text-[12px] text-[var(--color-accent)]">{error}</span> : null}
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  required,
  maxLength,
  error,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  maxLength?: number;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <FieldLabel label={label} required={required} />
      <textarea
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        maxLength={maxLength}
        rows={5}
        className={
          "resize-y rounded-[10px] border bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] outline-none transition-colors duration-200 focus:ring-2 focus:ring-[var(--color-accent-soft)] " +
          (error
            ? "border-[var(--color-accent)] focus:border-[var(--color-accent)]"
            : "border-[var(--color-line)] focus:border-[var(--color-accent)]")
        }
      />
      <div className="flex items-center justify-between gap-3">
        {error ? (
          <span className="text-[12px] text-[var(--color-accent)]">{error}</span>
        ) : (
          <span />
        )}
        {maxLength ? (
          <span
            className={
              "text-[11px] font-medium tabular-nums " +
              (value.length >= maxLength
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-muted)]")
            }
          >
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>
    </label>
  );
}
