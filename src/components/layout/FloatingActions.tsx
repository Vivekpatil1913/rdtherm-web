"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/site";

const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;

// Strip everything except digits → use for tel: and wa.me URLs
const phoneDigits = siteConfig.contact.phone.replace(/\D/g, "");
const whatsappHref = `https://wa.me/${phoneDigits}`;
const callHref = `tel:+${phoneDigits}`;

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[55] flex flex-col items-center gap-3.5 sm:bottom-7 sm:right-7">
      {/* WHATSAPP — pulse ring offset by half a cycle so it alternates with the Call ring */}
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: 0.1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto group relative inline-flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_-6px_rgba(37,211,102,0.6)] transition-shadow duration-300 hover:shadow-[0_14px_36px_-6px_rgba(37,211,102,0.75)] sm:size-14"
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-50"
          style={{ animationDuration: "2.2s", animationDelay: "1.1s" }}
        />
        <span
          aria-hidden
          className="absolute -inset-1.5 -z-10 rounded-full border border-[#25D366]/35"
        />
        <WhatsAppIcon className="size-6 sm:size-7" />
      </motion.a>

      {/* CALL — with pulsing ring */}
      <motion.a
        href={callHref}
        aria-label="Call us"
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT_SOFT, delay: 0.18 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto group relative inline-flex size-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-[0_10px_28px_-6px_rgba(233,78,27,0.6)] transition-shadow duration-300 hover:shadow-[0_14px_36px_-6px_rgba(233,78,27,0.8)] sm:size-14"
      >
        {/* Pulse rings */}
        <span
          aria-hidden
          className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--color-accent)] opacity-50"
          style={{ animationDuration: "2.2s" }}
        />
        <span
          aria-hidden
          className="absolute -inset-1.5 -z-10 rounded-full border border-[var(--color-accent)]/35"
        />
        <Phone className="size-5 sm:size-6" strokeWidth={2.2} />
      </motion.a>

      {/* SCROLL TO TOP — appears after the user scrolls down */}
      <AnimatePresence>
        {showTop ? (
          <motion.button
            key="scroll-top"
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.45, ease: EASE_OUT_SOFT }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            className="pointer-events-auto inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-line)] bg-white text-[var(--color-ink)] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:size-12"
          >
            <ArrowUp className="size-4 sm:size-5" strokeWidth={2.2} />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01a1.1 1.1 0 0 0-.795.371c-.273.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
    </svg>
  );
}
