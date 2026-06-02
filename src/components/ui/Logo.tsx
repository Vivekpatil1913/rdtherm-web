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
        width={72}
        height={72}
        className="h-14 w-auto object-contain sm:h-16"
        priority
      />
    </Link>
  );
}
