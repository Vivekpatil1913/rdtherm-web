"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { footerLinks, siteConfig } from "@/data/site";
import type { ApiSettings } from "@/lib/api-types";
import { cn } from "@/lib/cn";

/**
 * Turn an admin-entered social URL into a safe absolute link. Values like
 * "www.facebook.com" (no protocol) would otherwise be treated as a relative
 * path. Returns null for empty / placeholder ("#") values so we don't render a
 * dead link.
 */
function toExternalUrl(href: string): string | null {
  const v = (href || "").trim();
  if (!v || v === "#") return null;
  if (/^(https?:)?\/\//i.test(v) || /^(mailto:|tel:)/i.test(v)) return v;
  return `https://${v}`;
}

export function Footer({ settings }: { settings?: ApiSettings | null }) {
  const pathname = usePathname();

  // Live contact details from the CMS, falling back to static config.
  const contact = {
    address: settings?.address || siteConfig.contact.address,
    phone: settings?.phone || siteConfig.contact.phone,
    email: settings?.email || siteConfig.contact.email,
  };
  const hours = settings?.hours?.length ? settings.hours : siteConfig.contact.hours;
  const social = (settings?.social?.length ? settings.social : siteConfig.social).filter(
    (s) => (s as { active?: boolean }).active !== false,
  );


  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <footer className="relative isolate overflow-hidden bg-[#0d0d0d] text-white">
      {/* Soft vertical grid lines (matches reference) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-lines-dark opacity-60"
      />
      {/* Twin orange glows: top-right and bottom-left, dark in the middle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_92%_15%,rgba(233,78,27,0.65),transparent_60%),radial-gradient(70%_65%_at_8%_95%,rgba(233,78,27,0.6),transparent_60%)]"
      />

      <Container size="wide" className="relative z-10 pt-20 pb-10 lg:pt-24 lg:pb-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          {/* Brand */}
          <div className="flex flex-col items-start gap-5">
            {/* Colored navbar logo on a light chip — keeps the brand colours
                crisp and intentional against the dark footer. */}
            {/* -ml offsets the left padding so the logo lines up with the paragraph below. */}
            <div className="inline-flex items-center rounded-[12px] bg-white px-2 py-1.5 shadow-[0_14px_34px_-16px_rgba(0,0,0,0.7)]">
              <Logo className="[&_img]:h-[4.5rem]" />
            </div>
            <p className="max-w-[300px] text-[14px] leading-relaxed text-white/65">
              Code-compliant pressure vessels, reactors and process equipment — engineered,
              fabricated and delivered first-time right.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-accent)] underline-offset-4 transition-all duration-300 hover:gap-3"
            >
              Talk to an engineer
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Links — split into two sub-columns */}
          <FooterColumn title="Links">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              <ul className="flex flex-col gap-3">
                {footerLinks.primary.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} active={isActive(link.href)}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-3">
                {footerLinks.secondary.map((link) => (
                  <li key={`s-${link.label}`}>
                    <FooterLink href={link.href} active={isActive(link.href)}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </FooterColumn>

          {/* Contact info */}
          <FooterColumn title="Contact info">
            <ul className="flex flex-col gap-3 text-[14px] leading-relaxed text-white/70">
              <li className="sm:max-w-[230px]">{contact.address}</li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-white">
                  {contact.email}
                </a>
              </li>
            </ul>
          </FooterColumn>

          {/* Working hours */}
          <FooterColumn title="Working hours">
            <ul className="flex flex-col gap-4 text-[14px] leading-[1.55] text-white/70">
              {hours.map((h) => {
                const isRange = h.value.includes("-");
                return (
                  <li key={h.label}>
                    {isRange ? (
                      <>
                        {/* Inline on mobile (full-width column); stacked on desktop (narrow column). */}
                        <span className="lg:block">{h.label}:</span>{" "}
                        <span className="lg:block">{h.value}</span>
                      </>
                    ) : (
                      <span>
                        {h.label}: {h.value}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </FooterColumn>
        </div>

        {/* Divider + bottom row — social above the credit on mobile (reversed). */}
        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/60">
            Designed by{" "}
            <a
              href="https://sumagoinfotech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline-offset-4 transition-colors hover:text-[var(--color-accent)] hover:underline"
            >
              Sumago Infotech Pvt Ltd
            </a>
            {", "}Powered by{" "}
            <span className="text-white">Innovation</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px]">
            {social.map((s) => {
              const Icon = SOCIAL_ICONS[s.label as keyof typeof SOCIAL_ICONS];
              const brand = SOCIAL_BRAND[s.label as keyof typeof SOCIAL_BRAND];
              const url = toExternalUrl(s.href);
              return (
                <a
                  key={s.label}
                  href={url ?? "#"}
                  target={url ? "_blank" : undefined}
                  rel={url ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group inline-flex items-center gap-2 text-white/70 transition-colors",
                    brand?.text,
                  )}
                  aria-label={s.label}
                >
                  <span
                    className={cn(
                      "inline-flex size-6 items-center justify-center rounded-[6px] bg-white/[0.08] text-white transition-colors",
                      brand?.chip,
                    )}
                  >
                    {Icon ? <Icon className="size-3" /> : null}
                  </span>
                  <span>{s.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Giant faded watermark */}
        <div
          aria-hidden
          className="pointer-events-none mt-6 select-none whitespace-nowrap overflow-hidden text-center font-extrabold uppercase leading-[0.85] tracking-tight text-white/[0.04] text-[28vw] sm:text-[22vw] lg:text-[18vw]"
        >
          RDTHERM
          <sup className="align-top text-[0.2em] text-white/[0.04]">®</sup>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-[22px] font-semibold tracking-tight">{title}</h3>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[14px] transition-colors",
        active
          ? "text-[var(--color-accent)]"
          : "text-white/70 hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}

const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
  LinkedIn: LinkedInIcon,
} as const;

const SOCIAL_BRAND = {
  Facebook: {
    chip: "group-hover:bg-[#1877F2] group-hover:text-white",
    text: "group-hover:text-[#1877F2]",
  },
  Instagram: {
    chip:
      "group-hover:bg-[linear-gradient(45deg,#F58529,#DD2A7B_50%,#8134AF)] group-hover:text-white",
    text: "group-hover:text-[#DD2A7B]",
  },
  Twitter: {
    chip: "group-hover:bg-white group-hover:text-black",
    text: "group-hover:text-white",
  },
  LinkedIn: {
    chip: "group-hover:bg-[#0A66C2] group-hover:text-white",
    text: "group-hover:text-[#0A66C2]",
  },
} as const;

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6c-.3 0-1.35-.1-2.55-.1-2.55 0-4.3 1.55-4.3 4.4v2H7.2v3.1h2.65V22h3.65z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001zM3 9h4v12H3V9zm7.5 0H14v1.71h.05c.5-.95 1.72-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 5.75V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21h-4V9z" />
    </svg>
  );
}
