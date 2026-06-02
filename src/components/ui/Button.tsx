import Link from "next/link";
import { cn } from "@/lib/cn";

function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 12"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m14.425 6-5-5m5 5-5 5m5-5H1.575"
      />
    </svg>
  );
}

type ButtonVariant = "primary" | "dark" | "white" | "outline";
type ButtonSize = "md" | "lg";

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const SIZE_MAP: Record<ButtonSize, string> = {
  md: "h-13 pl-5 pr-2 text-[15px] gap-3",
  lg: "h-14 pl-5 pr-2 text-[16px] gap-3.5",
};

const ICON_SIZE_MAP: Record<ButtonSize, string> = {
  md: "h-10 w-10",
  lg: "h-11 w-11",
};

const VARIANT_MAP: Record<ButtonVariant, string> = {
  primary: "bg-[#C8370B] text-white hover:bg-[#A82E08]",
  dark: "bg-[var(--color-bg-dark)] text-white hover:bg-[#1e1e1e]",
  white:
    "bg-white text-[var(--color-ink)] hover:bg-white/95 border border-[var(--color-line)]",
  outline:
    "border border-[var(--color-ink)] bg-transparent text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white",
};

const ICON_VARIANT_MAP: Record<ButtonVariant, string> = {
  primary: "bg-[var(--color-bg-dark)] text-white",
  dark: "bg-[var(--color-accent)] text-white",
  white: "bg-[var(--color-accent)] text-white",
  outline: "bg-[var(--color-accent)] text-white",
};

// Synchronised easing + duration shared by text roll and arrow slide.
const MOTION =
  "transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform";

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    showArrow = true,
    className,
  } = props;

  const cls = cn(
    "group/btn relative inline-flex items-center rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px] font-medium transition-colors duration-300",
    SIZE_MAP[size],
    VARIANT_MAP[variant],
    !showArrow && "pr-6",
    className,
  );

  const content = (
    <>
      <span className="relative inline-block overflow-hidden whitespace-nowrap leading-[1.4] py-[1px]">
        <span
          className={cn(
            "block group-hover/btn:-translate-y-full",
            MOTION,
          )}
        >
          {children}
        </span>
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-0 top-full block group-hover/btn:-translate-y-full",
            MOTION,
          )}
        >
          {children}
        </span>
      </span>
      {showArrow ? (
        <span
          aria-hidden
          className={cn(
            "relative inline-block shrink-0 overflow-hidden rounded-[8px]",
            ICON_SIZE_MAP[size],
            ICON_VARIANT_MAP[variant],
          )}
        >
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center group-hover/btn:translate-x-full",
              MOTION,
            )}
          >
            <ArrowGlyph className="w-4" />
          </span>
          <span
            className={cn(
              "absolute inset-0 flex -translate-x-full items-center justify-center group-hover/btn:translate-x-0",
              MOTION,
            )}
          >
            <ArrowGlyph className="w-4" />
          </span>
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={cls}
    >
      {content}
    </button>
  );
}
