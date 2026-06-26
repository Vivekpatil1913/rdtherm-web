import { cn } from "@/lib/cn";

type SectionTagProps = {
  children: React.ReactNode;
  variant?: "light" | "dark" | "accent";
  className?: string;
};

export function SectionTag({ children, variant = "light", className }: SectionTagProps) {
  const isAccent = variant === "accent";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium",
        variant === "light" && "border-[var(--color-line)] bg-white text-[var(--color-ink)]",
        variant === "dark" && "border-white/15 bg-white/[0.04] text-white",
        isAccent && "border-transparent bg-[var(--color-accent)] text-white",
        className,
      )}
    >
      <span
        className={cn("size-1.5", isAccent ? "rounded-full bg-white" : "rounded-[2px] bg-[var(--color-accent)]")}
        aria-hidden
      />
      {children}
    </span>
  );
}
