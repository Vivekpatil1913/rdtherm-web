"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { fadeUp, stagger, viewportOnce } from "@/animations/motion";
import { siteConfig } from "@/data/site";

const MESSAGE_LIMIT = 250;

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

export function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_STATE);
  };

  const set =
    <K extends keyof FormState>(key: K) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

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
                {siteConfig.contact.address}
              </Item>
              <Item icon={<Phone className="size-5" strokeWidth={1.8} />}>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-[var(--color-ink)]"
                >
                  {siteConfig.contact.phone}
                </a>
              </Item>
              <Item icon={<Mail className="size-5" strokeWidth={1.8} />}>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-[var(--color-ink)]"
                >
                  {siteConfig.contact.email}
                </a>
              </Item>
              <Item icon={<Clock className="size-5" strokeWidth={1.8} />}>
                <span>
                  {siteConfig.contact.hours[0].label}:{" "}
                  {siteConfig.contact.hours[0].value}
                </span>
              </Item>
            </motion.ul>
          </motion.aside>

          <motion.form
            onSubmit={onSubmit}
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
                required
              />
              <Field
                label="Work email"
                type="email"
                value={form.email}
                onChange={set("email")}
                required
              />
            </div>
            <Field
              label="Company"
              value={form.company}
              onChange={set("company")}
              required
            />
            <TextareaField
              label="Message"
              value={form.message}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  message: e.target.value.slice(0, MESSAGE_LIMIT),
                }))
              }
              required
              maxLength={MESSAGE_LIMIT}
            />

            <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[13px] text-[var(--color-muted)]">
                By submitting, you agree to our privacy policy.
              </p>
              <Button type="submit" variant="primary">
                Send enquiry
              </Button>
            </div>

            {submitted ? (
              <p className="rounded-[10px] bg-[var(--color-accent-soft)] px-4 py-3 text-[14px] text-[var(--color-accent)]">
                Thanks — we&apos;ve received your enquiry and will reply within one business day.
              </p>
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
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
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
        className="h-12 rounded-[10px] border border-[var(--color-line)] bg-white px-4 text-[15px] text-[var(--color-ink)] outline-none transition-colors duration-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  required,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="flex flex-col gap-2">
      <FieldLabel label={label} required={required} />
      <textarea
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
        maxLength={maxLength}
        rows={5}
        className="resize-y rounded-[10px] border border-[var(--color-line)] bg-white px-4 py-3 text-[15px] text-[var(--color-ink)] outline-none transition-colors duration-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-soft)]"
      />
      {maxLength ? (
        <span
          className={
            "self-end text-[11px] font-medium tabular-nums " +
            (value.length >= maxLength
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-muted)]")
          }
        >
          {value.length}/{maxLength}
        </span>
      ) : null}
    </label>
  );
}
