"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Global error boundary. Catches unexpected runtime/render errors so the user
 * always sees a friendly recovery screen instead of a broken page.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
        Something went wrong
      </p>
      <h1 className="mt-4 max-w-xl text-[28px] font-bold leading-tight tracking-tight sm:text-[36px]">
        We hit an unexpected error.
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
        Please try again. If the problem persists, our team has been notified.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px] bg-[#C8370B] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#A82E08]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-[8px] border border-[var(--color-line)] px-6 text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-soft)]"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
