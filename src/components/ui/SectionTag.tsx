import { cn } from "@/lib/cn";

type SectionTagProps = {
  children: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
};

export function SectionTag({ children, variant = "light", className }: SectionTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium",
        variant === "light"
          ? "border-[var(--color-line)] bg-white text-[var(--color-ink)]"
          : "border-white/15 bg-white/[0.04] text-white",
        className,
      )}
    >
      <span className="size-1.5 rounded-[2px] bg-[var(--color-accent)]" aria-hidden />
      {children}
    </span>
  );
}
