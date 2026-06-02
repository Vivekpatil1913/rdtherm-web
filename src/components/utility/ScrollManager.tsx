"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Forces the window to scroll to top on every route change AND on initial load.
 * Mounted once at the root so it covers every page.
 *
 * We scroll multiple times (sync + next frame + after small delay) to defeat any
 * layout-shift / smooth-scroll / restoration race conditions that can otherwise
 * leave the page landing partway down.
 */
export function ScrollManager() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const jump = () => window.scrollTo(0, 0);
    jump();
    const raf = requestAnimationFrame(jump);
    const t = window.setTimeout(jump, 50);

    // On the very first mount also scroll again once everything has loaded
    // (video metadata, fonts, images can shift layout slightly).
    let onLoad: (() => void) | null = null;
    if (firstRun.current) {
      firstRun.current = false;
      onLoad = () => window.scrollTo(0, 0);
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      if (onLoad) window.removeEventListener("load", onLoad);
    };
  }, [pathname]);

  return null;
}
