import { cn } from "@/lib/cn";

type SectionDividerProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function SectionDivider({ variant = "light", className }: SectionDividerProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "h-px w-full",
        variant === "light" ? "bg-[var(--color-line)]" : "bg-white/10",
        className,
      )}
    />
  );
}

export function ColumnTick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block h-[3px] w-7 bg-[var(--color-accent)]",
        className,
      )}
    />
  );
}
