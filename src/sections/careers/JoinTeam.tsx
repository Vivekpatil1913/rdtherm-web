"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { openings } from "@/data/careers";
import { siteConfig } from "@/data/site";
import { submitApplication } from "@/services/content";
import { Recaptcha, type RecaptchaHandle } from "@/components/ui/Recaptcha";

type FormState = {
  name: string;
  email: string;
  phone: string;
  role: string;
  portfolio: string;
  message: string;
  resume: File | null;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  role: "",
  portfolio: "",
  message: "",
  resume: null,
};

// Name: letters/spaces (+ basic name punctuation) only — no digits or symbols.
const NAME_RE = /^[A-Za-z][A-Za-z .'-]*$/;
const sanitizeName = (v: string) => v.replace(/[^A-Za-z .'-]/g, "");

export function JoinTeam() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState("");
  const recaptchaRef = useRef<RecaptchaHandle>(null);

  const handleCaptcha = (token: string | null) => {
    setCaptchaToken(token);
    if (token) setCaptchaError("");
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    else if (!NAME_RE.test(form.name.trim())) next.name = "Name can contain letters only.";
    if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      next.phone = "Enter a 10-digit Indian mobile number starting 6–9.";
    if (!form.role) next.role = "Please select a role.";
    if (!form.resume) next.resume = "Please attach your resume (PDF / DOC).";
    else if (!/\.(pdf|docx?|DOCX?|PDF)$/.test(form.resume.name))
      next.resume = "Resume must be a PDF, DOC or DOCX file.";
    else if (form.resume.size > 5 * 1024 * 1024) next.resume = "Resume must be under 5 MB.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = validate();
    if (!captchaToken) setCaptchaError("Please confirm you're not a robot.");
    if (!ok || !form.resume || !captchaToken) return;
    setStatus("sending");
    const res = await submitApplication({
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      portfolio: form.portfolio,
      message: form.message,
      resume: form.resume,
      recaptchaToken: captchaToken,
    });
    // reCAPTCHA tokens are single-use — reset for the next attempt.
    recaptchaRef.current?.reset();
    setCaptchaToken(null);
    if (res.ok) {
      setStatus("sent");
      setForm(INITIAL);
    } else {
      setStatus("error");
      setErrorMsg(res.error || "");
      if (res.fieldErrors) setErrors(res.fieldErrors as Partial<Record<keyof FormState, string>>);
    }
  };

  if (status === "sent") {
    return (
      <section className="bg-white py-16 lg:py-20">
        <Container size="wide">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_SOFT }}
            className="mx-auto max-w-[640px] rounded-[20px] border border-[var(--color-line)] bg-white p-10 lg:p-14 text-center shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)]"
          >
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-[var(--color-accent)]/12 text-[var(--color-accent)]">
              <CheckCircle2 className="size-7" strokeWidth={2} />
            </span>
            <h3 className="mt-6 text-[28px] sm:text-[32px] font-bold leading-tight">
              Application received.
            </h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">
              Thanks for applying to R&D Therm. Our hiring team will review your
              profile and get back to you within 3 – 5 working days.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-7 inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-accent)] hover:underline underline-offset-4"
            >
              Submit another application <ArrowUpRight className="size-4" />
            </button>
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
      <Container size="wide">
        <motion.div
          variants={stagger(0.05, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-10"
        >
          {/* Left: brand / info card */}
          <motion.aside
            variants={fadeUp}
            className="lg:col-span-5 flex flex-col gap-7"
          >
            <SectionTag className="self-start">Apply now</SectionTag>
            <h2 className="text-[34px] leading-[1.05] tracking-[-0.02em] sm:text-[44px] lg:text-[54px] font-bold">
              Join our <span className="text-[var(--color-accent)]">team</span>.
            </h2>
            <p className="max-w-[460px] text-[16px] leading-[1.65] text-[var(--color-ink-soft)]">
              Send us your details and a recent resume — our hiring team will
              review your profile and reach out within 3 – 5 working days. All
              roles are based at our Nashik facility.
            </p>

            <ul className="mt-2 flex flex-col gap-4 text-[14.5px]">
              <li className="flex items-start gap-3 text-[var(--color-ink)]">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-white text-[var(--color-accent)] ring-1 ring-[var(--color-line)]">
                  <MapPin className="size-4" />
                </span>
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--color-ink)]">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-white text-[var(--color-accent)] ring-1 ring-[var(--color-line)]">
                  <Mail className="size-4" />
                </span>
                <a
                  href="mailto:sales@rdtherm.com"
                  className="hover:text-[var(--color-accent)]"
                >
                  sales@rdtherm.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-[var(--color-ink)]">
                <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-white text-[var(--color-accent)] ring-1 ring-[var(--color-line)]">
                  <Phone className="size-4" />
                </span>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-[var(--color-accent)]"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
            </ul>
          </motion.aside>

          {/* Right: the form */}
          <motion.form
            variants={fadeUp}
            onSubmit={onSubmit}
            noValidate
            className="lg:col-span-7 rounded-[20px] border border-[var(--color-line)] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_28px_70px_-40px_rgba(0,0,0,0.18)]"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              Join our team
            </p>
            <h3 className="mt-2 text-[24px] sm:text-[28px] font-bold leading-tight">
              Apply for a role at R&D Therm.
            </h3>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Full name"
                required
                error={errors.name}
                input={
                  <input
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: sanitizeName(e.target.value) }))
                    }
                    placeholder="Jane Sharma"
                    className={INPUT_CLS}
                  />
                }
              />

              <Field
                label="Email"
                required
                error={errors.email}
                input={
                  <input
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    placeholder="jane@example.com"
                    className={INPUT_CLS}
                  />
                }
              />

              <Field
                label="Mobile number"
                required
                error={errors.phone}
                input={
                  <div className="flex items-stretch overflow-hidden rounded-[10px] border border-[var(--color-line)] bg-white focus-within:border-[var(--color-accent)]">
                    <span className="inline-flex items-center gap-1 border-r border-[var(--color-line)] bg-[var(--color-bg-soft)] px-3 text-[14px] font-semibold text-[var(--color-ink-soft)]">
                      +91
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        }))
                      }
                      placeholder="98XXXXXXXX"
                      maxLength={10}
                      pattern="[6-9][0-9]{9}"
                      className="w-full bg-transparent px-3 py-2.5 text-[14.5px] text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted)]"
                    />
                  </div>
                }
              />

              <Field
                label="Role you're applying for"
                required
                error={errors.role}
                input={
                  <select
                    value={form.role}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, role: e.target.value }))
                    }
                    className={INPUT_CLS + " appearance-none pr-10 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 8%22 fill=%22none%22 stroke=%22%236b6b6b%22 stroke-width=%221.5%22><path d=%22M1 1.5l5 5 5-5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] bg-no-repeat bg-[right_0.85rem_center] bg-[length:12px]"}
                  >
                    <option value="">Select a role…</option>
                    {openings.map((r) => (
                      <option key={r.title} value={r.title}>
                        {r.title}
                      </option>
                    ))}
                    <option value="other">Other / General application</option>
                  </select>
                }
              />

              <Field
                label="LinkedIn / portfolio URL"
                className="sm:col-span-2"
                input={
                  <input
                    type="url"
                    value={form.portfolio}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, portfolio: e.target.value }))
                    }
                    placeholder="https://linkedin.com/in/your-handle"
                    className={INPUT_CLS}
                  />
                }
              />

              <Field
                label="Cover note (optional)"
                className="sm:col-span-2"
                input={
                  <div className="flex flex-col gap-1.5">
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          message: e.target.value.slice(0, 200),
                        }))
                      }
                      maxLength={200}
                      placeholder="A short paragraph about your experience, why you want to join R&D Therm, and what you're great at."
                      className={INPUT_CLS + " resize-y min-h-[110px] break-words"}
                    />
                    <span
                      className={
                        "self-end text-[11px] font-medium tabular-nums " +
                        (form.message.length >= 200
                          ? "text-[var(--color-accent)]"
                          : "text-[var(--color-muted)]")
                      }
                    >
                      {form.message.length}/200
                    </span>
                  </div>
                }
              />

              <Field
                label="Resume (PDF / DOC)"
                required
                error={errors.resume}
                className="sm:col-span-2"
                input={
                  <label className="flex cursor-pointer items-center justify-between gap-3 rounded-[10px] border border-dashed border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 py-3 text-[14px] text-[var(--color-ink-soft)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-ink)]">
                    <span>
                      {form.resume
                        ? form.resume.name
                        : "Click to upload — PDF, DOC or DOCX (max 5 MB)"}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-[12px] font-semibold text-[var(--color-ink)]">
                      Browse
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      required
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          resume: e.target.files?.[0] ?? null,
                        }))
                      }
                      className="hidden"
                    />
                  </label>
                }
              />
            </div>

            <div className="mt-6">
              <Recaptcha ref={recaptchaRef} onChange={handleCaptcha} />
              {captchaError ? (
                <span className="mt-1.5 block text-[12.5px] text-[var(--color-accent)]">{captchaError}</span>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12.5px] leading-[1.55] text-[var(--color-muted)] max-w-[420px]">
                By submitting, you agree to our processing of your details for
                recruitment purposes only.
              </p>
              <Button type="submit" variant="primary" size="lg">
                {status === "sending" ? "Sending…" : "Submit application"}
              </Button>
            </div>

            {status === "error" ? (
              <p className="mt-4 text-[13px] font-medium text-[var(--color-accent)]">
                {errorMsg || "Something went wrong. Please retry or email sales@rdtherm.com."}
              </p>
            ) : null}
          </motion.form>
        </motion.div>
      </Container>
    </section>
  );
}

const INPUT_CLS =
  "w-full rounded-[10px] border border-[var(--color-line)] bg-white px-3.5 py-2.5 text-[14.5px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)]";

function Field({
  label,
  required,
  error,
  input,
  className,
}: {
  label: string;
  required?: boolean;
  error?: string;
  input: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={"flex flex-col gap-1.5 " + (className ?? "")}>
      <label className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-soft)]">
        {label}
        {required ? <span className="text-[var(--color-accent)]"> *</span> : null}
      </label>
      {input}
      {error ? (
        <p className="text-[12px] text-[var(--color-accent)]">{error}</p>
      ) : null}
    </div>
  );
}
