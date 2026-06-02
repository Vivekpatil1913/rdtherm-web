"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-[var(--color-bg)]/85 backdrop-blur-md border-b border-[var(--color-line)]"
          : "bg-transparent",
      )}
    >
      <Container size="wide" className="flex h-[78px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-7">
          {mainNav.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative inline-flex items-center text-[14px] tracking-[-0.005em] transition-colors duration-300",
                  isActive
                    ? "font-semibold text-[var(--color-accent)]"
                    : "font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)]",
                )}
              >
                {/* Active marker — small accent square, matches SectionTag bullet */}
                {isActive ? (
                  <span
                    aria-hidden
                    className="mr-2 inline-block size-1.5 rounded-[2px] bg-[var(--color-accent)]"
                  />
                ) : null}
                <span className="relative inline-block">
                  {item.label}
                  {/* Active / hover underline — grows from center */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[var(--color-accent)] transition-[width,opacity] duration-300 ease-out",
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                    )}
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary" size="md">
            Enquire now
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden inline-flex size-11 items-center justify-center rounded-[10px] border border-[var(--color-line)] bg-white text-[var(--color-ink)]"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-x-0 top-[78px] z-[60] h-[calc(100dvh-78px)] overflow-y-auto bg-[var(--color-bg)]"
            style={{ backgroundColor: "var(--color-bg, #f1f1ef)" }}
          >
            <Container className="flex flex-col gap-2 py-8">
              {mainNav.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-3 border-b border-[var(--color-line)] py-4 text-[20px] transition-colors",
                      isActive
                        ? "font-semibold text-[var(--color-accent)]"
                        : "font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)]",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "inline-block h-5 w-[3px] rounded-full bg-[var(--color-accent)] transition-all duration-300",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-6">
                <Button href="/contact" variant="primary" size="lg" className="w-full justify-between">
                  Enquire now
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
