import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/data/site";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label={siteConfig.name}
    >
      <Image
        src="/images/hero/rdtherm-logo.png"
        alt={siteConfig.name}
        width={786}
        height={317}
        sizes="200px"
        className="h-16 w-auto object-contain sm:h-[68px]"
        priority
      />
    </Link>
  );
}
