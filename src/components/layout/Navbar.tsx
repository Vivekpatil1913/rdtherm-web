"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type NavProduct = {
  slug: string;
  title: string;
  cover?: string;
  specs?: string[];
};

const PRODUCTS_HREF = "/products";
// "/" is a prefix of every route, so the home link only counts as active on an
// exact match.
const isActiveHref = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80&auto=format&fit=crop";
const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar({ products = [] }: { products?: NavProduct[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Desktop "Products" mega-menu.
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  // Mobile "Products" accordion.
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Horizontal centre of the "Products" trigger — the panel is centred on it.
  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const [anchorX, setAnchorX] = useState<number | null>(null);

  const hasProducts = products.length > 0;
  // Preview defaults to the product you're currently viewing, if any.
  const currentIndex = useMemo(() => {
    const i = products.findIndex((p) => pathname === `${PRODUCTS_HREF}/${p.slug}`);
    return i >= 0 ? i : 0;
  }, [products, pathname]);

  const measureTrigger = () => {
    const el = triggerRef.current;
    if (el) setAnchorX(el.offsetLeft + el.offsetWidth / 2);
  };

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    // Each time it opens, the highlight starts on the product you're viewing.
    if (!menuOpen) setHovered(currentIndex);
    measureTrigger();
    setMenuOpen(true);
  };
  // Small delay so brushing past the edge of the panel doesn't slam it shut.
  const scheduleCloseMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 140);
  };

  // Open the contact form directly. If already on /contact, just smooth-scroll
  // to it (avoids the duplicated #enquiry#enquiry hash); otherwise navigate.
  const goToEnquiry = () => {
    setOpen(false);
    if (pathname === "/contact") {
      document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/contact#enquiry");
    }
  };

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
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      const el = triggerRef.current;
      if (el) setAnchorX(el.offsetLeft + el.offsetWidth / 2);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

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
        "sticky top-0 z-[60] transition-colors duration-300",
        scrolled || menuOpen
          ? "bg-[var(--color-bg)]/85 backdrop-blur-md border-b border-[var(--color-line)]"
          : "bg-transparent",
      )}
    >
      {/* The whole bar + panel is one hover surface, so the pointer can travel
          from the trigger down into the menu without ever leaving it. */}
      <div className="relative" onMouseLeave={scheduleCloseMenu}>
        <Container size="wide" className="flex h-[78px] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-7">
            {mainNav.map((item) => {
              const isActive = isActiveHref(pathname, item.href);
              const isProducts = item.href === PRODUCTS_HREF && hasProducts;
              return (
                <Link
                  key={item.href}
                  ref={isProducts ? triggerRef : undefined}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  aria-haspopup={isProducts ? "true" : undefined}
                  aria-expanded={isProducts ? menuOpen : undefined}
                  onMouseEnter={isProducts ? openMenu : () => setMenuOpen(false)}
                  onFocus={isProducts ? openMenu : () => setMenuOpen(false)}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "group relative inline-flex items-center text-[14px] tracking-[-0.005em] transition-colors duration-300",
                    isActive || (isProducts && menuOpen)
                      ? "font-semibold text-[var(--color-accent)]"
                      : "font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)]",
                  )}
                >
                  {/* Active marker - small accent square, matches SectionTag bullet */}
                  {isActive ? (
                    <span
                      aria-hidden
                      className="mr-2 inline-block size-1.5 rounded-[2px] bg-[var(--color-accent)]"
                    />
                  ) : null}
                  <span className="relative inline-block">
                    {item.label}
                    {/* Active / hover underline - grows from center */}
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute -bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[var(--color-accent)] transition-[width,opacity] duration-300 ease-out",
                        isActive || (isProducts && menuOpen)
                          ? "w-full opacity-100"
                          : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                      )}
                    />
                  </span>
                  {isProducts ? (
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "ml-1.5 size-3.5 transition-transform duration-300",
                        menuOpen ? "rotate-180" : "rotate-0",
                      )}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Button onClick={goToEnquiry} variant="primary" size="md">
              Enquire now
            </Button>
          </div>

          <button
            type="button"
            onClick={() => {
              setOpen((s) => !s);
              setMobileProductsOpen(false);
            }}
            className="lg:hidden inline-flex size-11 items-center justify-center rounded-[10px] border border-[var(--color-line)] bg-white text-[var(--color-ink)]"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </Container>

        {/* PRODUCTS MEGA-MENU (desktop) */}
        <AnimatePresence>
          {menuOpen && hasProducts ? (
            <>
              <motion.div
                key="mega-scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none fixed inset-x-0 bottom-0 top-[78px] z-[55] hidden bg-[var(--color-bg-dark)]/25 backdrop-blur-[2px] lg:block"
              />
              <motion.div
                key="mega-menu"
                // x:"-50%" lives in the animation so framer's transform keeps the centring.
                initial={{ opacity: 0, y: -12, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: -12, x: "-50%" }}
                transition={{ duration: 0.28, ease: EASE }}
                style={{ left: anchorX ?? "50%" }}
                className="absolute top-full z-[70] hidden lg:block"
              >
                <div className="px-5 pb-6">
                  {/* Width hugs the list, so the panel only grows as products are added. */}
                  <div className="max-w-[calc(100vw-40px)] overflow-hidden rounded-b-[22px] border border-t-0 border-[var(--color-line)] bg-white shadow-[0_40px_90px_-40px_rgba(0,0,0,0.4)]">
                    {/* The catalogue index */}
                    <div className="p-6 xl:p-7">
                        <div className="flex items-center justify-between gap-12 px-2">
                          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
                            <span
                              aria-hidden
                              className="inline-block size-1.5 rounded-[2px] bg-[var(--color-accent)]"
                            />
                            The catalogue
                          </span>
                          <Link
                            href={PRODUCTS_HREF}
                            onClick={() => setMenuOpen(false)}
                            className="group/all inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
                          >
                            All products
                            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/all:translate-x-0.5" />
                          </Link>
                        </div>

                        {/* Column-major: 4 rows per column, a new column starts
                            automatically once a column is full. */}
                        <ul className="mt-4 grid auto-cols-max grid-flow-col grid-rows-4 gap-x-4">
                          {products.map((p, i) => {
                            const active = i === hovered;
                            return (
                              <motion.li
                                key={p.slug}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.04 + i * 0.025, ease: EASE }}
                              >
                                <Link
                                  href={`${PRODUCTS_HREF}/${p.slug}`}
                                  onMouseEnter={() => setHovered(i)}
                                  onFocus={() => setHovered(i)}
                                  onClick={() => setMenuOpen(false)}
                                  className="group/row relative flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition-colors duration-300"
                                >
                                  {/* Sliding highlight - one shared layout animation. */}
                                  {active ? (
                                    <motion.span
                                      layoutId="mega-row"
                                      aria-hidden
                                      transition={{ duration: 0.3, ease: EASE }}
                                      className="absolute inset-0 -z-10 rounded-[12px] bg-[var(--color-bg-soft)]"
                                    />
                                  ) : null}
                                  <span
                                    className={cn(
                                      "whitespace-nowrap text-[15px] leading-[1.3] transition-colors duration-300",
                                      active
                                        ? "font-semibold text-[var(--color-accent)]"
                                        : "font-medium text-[var(--color-ink)]",
                                    )}
                                  >
                                    {p.title}
                                  </span>
                                  <ArrowUpRight
                                    aria-hidden
                                    className={cn(
                                      "size-4 shrink-0 text-[var(--color-accent)] transition-all duration-300",
                                      active ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                                    )}
                                  />
                                </Link>
                              </motion.li>
                            );
                          })}
                        </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="lg:hidden fixed inset-x-0 top-[78px] z-[60] h-[calc(100dvh-78px)] overflow-y-auto bg-[var(--color-bg)]"
            style={{ backgroundColor: "var(--color-bg, #f1f1ef)" }}
          >
            <Container className="flex flex-col gap-2 py-8">
              {mainNav.map((item) => {
                const isActive = isActiveHref(pathname, item.href);
                const isProducts = item.href === PRODUCTS_HREF && hasProducts;
                return (
                  <div key={item.href} className="border-b border-[var(--color-line)]">
                    <div className="flex items-center gap-3">
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "relative flex flex-1 items-center gap-3 py-4 text-[20px] transition-colors",
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
                      {isProducts ? (
                        <button
                          type="button"
                          onClick={() => setMobileProductsOpen((s) => !s)}
                          aria-expanded={mobileProductsOpen}
                          aria-label={mobileProductsOpen ? "Hide products" : "Show products"}
                          className={cn(
                            "inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] border transition-colors",
                            mobileProductsOpen
                              ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                              : "border-[var(--color-line)] bg-white text-[var(--color-ink)]",
                          )}
                        >
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-300",
                              mobileProductsOpen ? "rotate-180" : "rotate-0",
                            )}
                          />
                        </button>
                      ) : null}
                    </div>

                    <AnimatePresence initial={false}>
                      {isProducts && mobileProductsOpen ? (
                        <motion.div
                          key="mobile-products"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1.5 pb-4">
                            {products.map((p) => (
                              <Link
                                key={p.slug}
                                href={`${PRODUCTS_HREF}/${p.slug}`}
                                className={cn(
                                  "flex items-center gap-3 rounded-[14px] border px-3 py-2.5 transition-colors",
                                  pathname === `${PRODUCTS_HREF}/${p.slug}`
                                    ? "border-[var(--color-accent)] bg-white"
                                    : "border-[var(--color-line)] bg-white/70",
                                )}
                              >
                                <span className="relative size-11 shrink-0 overflow-hidden rounded-[10px] bg-[var(--color-bg-soft)]">
                                  <Image
                                    src={p.cover || FALLBACK_IMAGE}
                                    alt=""
                                    fill
                                    sizes="44px"
                                    className="object-cover"
                                  />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-[15px] font-semibold text-[var(--color-ink)]">
                                    {p.title}
                                  </span>
                                </span>
                                <ArrowUpRight
                                  aria-hidden
                                  className="size-4 shrink-0 text-[var(--color-accent)]"
                                />
                              </Link>
                            ))}
                            <Link
                              href={PRODUCTS_HREF}
                              className="mt-1 inline-flex items-center justify-center gap-2 rounded-[14px] bg-[var(--color-ink)] px-4 py-3 text-[14px] font-semibold text-white"
                            >
                              View all products
                              <ArrowRight className="size-4" />
                            </Link>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="pt-6">
                <Button onClick={goToEnquiry} variant="primary" size="lg" className="w-full justify-between">
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
