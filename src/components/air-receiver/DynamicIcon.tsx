import { createElement } from "react";
import * as Icons from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";

/**
 * Renders a lucide icon from a *string* name (as stored in data / the API).
 * Declared at module scope so consumers never create a component during render
 * — they just pass a data-driven `name`.
 */
export function DynamicIcon({ name, ...props }: { name?: string } & LucideProps) {
  const Icon = ((Icons as unknown as Record<string, LucideIcon>)[name ?? ""] ?? Icons.Circle) as LucideIcon;
  return createElement(Icon, props);
}
