import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide" | "full";
  as?: keyof React.JSX.IntrinsicElements;
};

const SIZE_MAP: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-[1200px]",
  default: "max-w-[1320px]",
  wide: "max-w-[1440px]",
  full: "max-w-none",
};

export function Container({
  children,
  className,
  size = "default",
  as: Tag = "div",
}: ContainerProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", SIZE_MAP[size], className)}
    >
      {children}
    </Component>
  );
}
