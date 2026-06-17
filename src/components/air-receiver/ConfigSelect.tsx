"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { DynamicIcon } from "@/components/air-receiver/DynamicIcon";
import type { ConfigOption } from "@/data/air-receiver";

/**
 * Premium accessible dropdown used across the configurator and custom builder.
 * Custom-rendered (not a native <select>) for the icon + note styling, but with
 * full keyboard support, listbox roles, click-outside and Escape handling.
 */
export function ConfigSelect({
  label,
  icon,
  options,
  value,
  onChange,
  hint,
  swatch,
}: {
  label: string;
  icon?: string;
  options: ConfigOption[];
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  /** Show the selected option's colour chip (for colour / material fields). */
  swatch?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  // Open the menu with the currently-selected option pre-highlighted.
  const openMenu = () => {
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const commit = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openMenu();
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      commit(active);
    }
  };

  return (
    <div className="flex flex-col gap-1.5" ref={ref}>
      <span className="text-[12.5px] font-medium text-[var(--color-ink-soft)]">{label}</span>
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => (open ? setOpen(false) : openMenu())}
          onKeyDown={onKeyDown}
          className={cn(
            "group flex h-[52px] w-full items-center gap-3 rounded-[12px] border bg-white px-3.5 text-left transition-colors duration-200",
            open
              ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent-soft)]"
              : "border-[var(--color-line)] hover:border-[var(--color-ink-soft)]",
          )}
        >
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-[var(--color-bg)] text-[var(--color-accent)]">
            {swatch && selected?.swatch ? (
              <span className="size-4 rounded-full border border-black/15" style={{ background: selected.swatch }} />
            ) : (
              <DynamicIcon name={icon} className="size-[18px]" strokeWidth={1.8} />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-semibold text-[var(--color-ink)]">
              {selected?.label}
            </span>
            {(selected?.note || hint) && (
              <span className="block truncate text-[11.5px] text-[var(--color-muted)]">
                {selected?.note ?? hint}
              </span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-[var(--color-muted)] transition-transform duration-200",
              open && "rotate-180 text-[var(--color-accent)]",
            )}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            id={listId}
            aria-label={label}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-[280px] overflow-auto rounded-[14px] border border-[var(--color-line)] bg-white p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.28)]"
          >
            {options.map((opt, i) => {
              const isSel = opt.value === value;
              return (
                <li key={opt.value} role="option" aria-selected={isSel}>
                  <button
                    type="button"
                    onClick={() => commit(i)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left transition-colors",
                      i === active ? "bg-[var(--color-bg)]" : "bg-transparent",
                    )}
                  >
                    {opt.swatch ? (
                      <span className="size-4 shrink-0 rounded-full border border-black/15" style={{ background: opt.swatch }} />
                    ) : (
                      <span className="size-4 shrink-0" />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14.5px] font-medium text-[var(--color-ink)]">{opt.label}</span>
                      {opt.note && <span className="block text-[11.5px] text-[var(--color-muted)]">{opt.note}</span>}
                    </span>
                    {isSel && <Check className="size-4 shrink-0 text-[var(--color-accent)]" strokeWidth={2.5} />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
