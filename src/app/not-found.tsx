import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
        404 — Not found
      </p>
      <h1 className="mt-4 max-w-xl text-[32px] font-bold leading-tight tracking-tight sm:text-[44px]">
        This page could not be found.
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
        The page you&apos;re looking for may have been moved or no longer exists.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px] bg-[#C8370B] px-6 text-[15px] font-medium text-white transition-colors hover:bg-[#A82E08]"
        >
          Back to home
        </Link>
        <Link
          href="/products"
          className="inline-flex h-12 items-center rounded-[8px] border border-[var(--color-line)] px-6 text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-bg-soft)]"
        >
          Browse products
        </Link>
      </div>
    </section>
  );
}
