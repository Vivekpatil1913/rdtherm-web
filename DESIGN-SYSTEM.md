# R&D Therm — Design System Reference

The single source of truth for typography, colour, and UI tokens used across the
website. All values below are the **exact values currently in the codebase**.

- **Tokens live in** [`src/app/globals.css`](src/app/globals.css) (the `@theme` block) — Tailwind CSS v4.
- **Consume tokens** as `var(--color-*)` or Tailwind utilities (`bg-[var(--color-accent)]`, `text-[var(--color-ink)]`).
- The site uses **Tailwind arbitrary values** (`text-[15px]`, `rounded-[18px]`) heavily. This document defines the **canonical set** to standardise on; a few one-off values exist in the wild and should migrate to these.

---

## 1. Typography

### 1.1 Font family
| Role | Value |
|---|---|
| Primary | **Mona Sans** (loaded via `next/font/google` in [`src/app/layout.tsx`](src/app/layout.tsx)) |
| CSS variable | `--font-mona-sans` → mapped to `--font-sans` |
| Full stack | `var(--font-mona-sans), "Mona Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| Loaded weights | `400, 500, 600, 700, 800` · `display: swap` · `subsets: latin` |

There is **one** typeface across the entire site. Numeric data uses the `tabular-nums` utility (specs tables, quantities, prices).

### 1.2 Type scale
Headings are `font-bold` (700), tight tracking, tight leading. Sizes are responsive (`base` → `sm:` → `lg:`).

| Token | Element | Size (base → sm → lg) | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| **Display / H1** | Page hero title | `40px → 56px → 68px` (hero variant `44 → 60 → 72`) | 700 | `1.02–1.05` | `-0.02em` |
| **H2** | Section heading | `32px → 40px → 48px` (large variant `34 → 46 → 56`) | 700 | `1.1` | `-0.02em` |
| **H3** | Sub-section / large card title | `24px → 28px → 32px` | 700 | `1.15` | `-0.01em` |
| **H4** | Card title | `20px – 22px` | 700 | `1.15` | `-0.01em` |
| **H5** | Small card / list title | `18px` | 600 | `1.25` | `0` |
| **H6 / Overline** | Eyebrow, section tag, kicker | `12px – 13px` | 500–700 | `1.4` | `0.14em – 0.22em` (uppercase) |
| **Body Large** | Lead paragraph / intro | `17px – 20px` | 400 | `1.6` | `0` |
| **Body** | Default paragraph | `15px – 16px` | 400 | `1.6` | `0` |
| **Body Small** | Supporting text | `13px – 14px` | 400 | `1.5 – 1.55` | `0` |
| **Caption / Meta** | Timestamps, file meta, footnotes | `11px – 12.5px` | 400–500 | `1.5` | `0 – 0.04em` |
| **Label** | Form field label | `12.5px – 13px` | 500 | `1.4` | `0` |
| **Micro-label** | Spec key / uppercase tag inside cards | `10.5px – 11px` | 500–700 | `1.4` | `0.04em – 0.06em` (uppercase) |
| **Button** | Button text | `15px` (md) · `16px` (lg) | 500 | `1.4` | `0` |
| **Table header** | `<th>` | `12px` | 600 | — | `0.08em` (uppercase) |

Rich-text article body (`.prose-article`, CMS content): base `17px / 1.75`, first paragraph `20px / 1.6`, `h2 30px`, `h3 24px`, `h4 20px`.

### 1.3 Font weights
| Weight | Usage |
|---|---|
| `400` Regular | Body copy, paragraphs |
| `500` Medium | Buttons, labels, nav links, tags, chips |
| `600` Semibold | Sub-headings, emphasised inline, table headers, small titles |
| `700` Bold | All headings H1–H4, stat values, key figures |
| `800` Extrabold | Available (loaded) — reserve for rare display emphasis |

### 1.4 Line height & letter spacing summary
- **Headings:** line-height `1.02 → 1.15` (tighter as size grows); tracking `-0.02em` (large) to `-0.01em`.
- **Body:** line-height `1.5 → 1.75`; tracking `0`.
- **Uppercase overlines/eyebrows:** positive tracking `0.04em → 0.22em` (larger for smaller/kicker text).

---

## 2. Colour palette

All brand colours are defined in the `@theme` block of `globals.css`.

### 2.1 Brand / accent
| Token | HEX | Usage |
|---|---|---|
| `--color-accent` | `#e94e1b` | **Primary accent** — highlighted words, marks, icons, dots, focus glow, links |
| `--color-accent-hover` | `#d44513` | Accent hover (links/marks) |
| `--color-accent-soft` | `#fde4d8` | Accent tint — badges, success surfaces, focus rings, incentive blocks |
| **CTA fill** | `#C8370B` | **Primary button background** (deeper than accent — used for `Button variant="primary"` and all main CTAs) |
| **CTA fill hover** | `#A82E08` | Primary button hover |

> ⚠️ **Important nuance:** the marketing **accent** (`#e94e1b`) and the **CTA button fill** (`#C8370B`) are two different oranges. Use `--color-accent` for text/icons/highlights and `#C8370B` for solid primary buttons. Keep this distinction.

### 2.2 Backgrounds
| Token | HEX | Usage |
|---|---|---|
| `--color-bg` | `#f1f1ef` | Page background (warm off-white) |
| `--color-bg-soft` | `#f1f1ef` | Alternating section background (same value — used semantically to signal section rhythm) |
| `--color-surface` | `#ffffff` | Card / panel / input surface |
| `--color-bg-dark` | `#0d0d0d` | Dark sections, dark buttons, table header, footer |
| Section white | `#ffffff` | Some sections use plain white (`bg-white`) |

Section background rhythm alternates: `white → bg-soft → bg-dark` to separate content bands.

### 2.3 Text
| Token | HEX | Usage |
|---|---|---|
| `--color-ink` | `#111111` | Primary text, headings |
| `--color-ink-soft` | `#2a2a2a` | Body / secondary text |
| `--color-muted` | `#6b6b6b` | Captions, meta, placeholders, micro-labels |
| On-dark primary | `#ffffff` | Text on dark sections |
| On-dark muted | `rgba(255,255,255,0.65)` | Secondary text on dark |

### 2.4 Borders / lines
| Token | HEX | Usage |
|---|---|---|
| `--color-line` | `#d9d9d6` | Default border for cards, inputs, dividers |
| `--color-line-dark` | `#1f1f1f` | Border on dark backgrounds |
| On-dark border | `rgba(255,255,255,0.10 – 0.15)` | Chips / cards on dark sections |
| Dashed divider | `--color-line` (dashed) | Spec key/value separators |

### 2.5 Semantic / status colours
The codebase currently defines **error** and **success** patterns only. Warning/Info are **not yet standardised** — recommended values added below for future use.

| State | Currently used | Recommended token (to add) |
|---|---|---|
| **Error** | Text `text-red-600` = `#DC2626`; surface `bg-red-50` = `#FEF2F2`; required asterisk `text-red-500` = `#EF4444`; **field error border/text uses `--color-accent`** | Formalise as `--color-error #DC2626`, `--color-error-soft #FEF2F2` |
| **Success** | Surface `--color-accent-soft` + text `--color-accent` + `CheckCircle2` icon | Add a true green `--color-success #16A34A`, `--color-success-soft #DCFCE7` |
| **Warning** | — none — | `--color-warning #D97706`, `--color-warning-soft #FEF3C7` |
| **Info** | — none — | `--color-info #2563EB`, `--color-info-soft #DBEAFE` |
| **WhatsApp (brand)** | `#25D366` (floating action only) | Keep as brand-specific, not a semantic token |

### 2.6 Interaction-state colours
| State | Treatment |
|---|---|
| **Hover — primary button** | `#C8370B` → `#A82E08` |
| **Hover — dark button** | `--color-bg-dark` → `#1e1e1e` |
| **Hover — outline button** | transparent → fill `--color-ink` (`#111`), text white |
| **Hover — card** | `-translate-y-1` + elevate shadow; border → `--color-accent`/40 |
| **Hover — link / nav** | text → `--color-accent` |
| **Active / selected** | `--color-accent` mark/check; selected tab `bg-[var(--color-ink)]` text white; selected option row `bg-[var(--color-bg)]` |
| **Focus (global)** | `outline: 2px solid var(--color-accent); outline-offset: 3px` (from `globals.css :focus-visible`) |
| **Focus (inputs)** | `border-[var(--color-accent)]` + `ring-2 ring-[var(--color-accent-soft)]` |
| **Disabled** | `opacity-60` (buttons) / `opacity-40` (icon steppers) + `cursor-not-allowed` |

---

## 3. UI design tokens

### 3.1 Border radius
Named tokens (`globals.css`): `--radius-pill 9999px` · `--radius-tag 0.5rem (8px)` · `--radius-card 0.75rem (12px)`.

Canonical scale actually in use:
| Radius | Applied to |
|---|---|
| `9999px` / `rounded-full` | Pills, badges, chips, dots, avatars, floating action buttons |
| `8px` | Icon chips inside buttons, small tags |
| `10px` | **Inputs**, textareas, small buttons, alert boxes |
| `12px` | **Config selects**, icon tiles, quantity stepper, inner note blocks |
| `14px` | FAQ items, small cards |
| `18px` | **Standard card** (default) |
| `20px` | **Configurator / summary cards** |
| `22px – 24px` | Large panels, modals, custom-builder form, CTA banners |
| **Signature button** | `rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px]` (md) · `8px/8px/8px/20px` (lg) — the asymmetric bottom-right corner is the brand button shape |

### 3.2 Box shadow (elevation scale)
A wide set of arbitrary shadows exists; standardise on these **6 tiers** (each maps to the most-used value):

| Tier | Value | Usage |
|---|---|---|
| **xs** | `0 2px 6px -2px rgba(0,0,0,0.06)` | Subtle raised elements, sticky bars |
| **sm (card)** | `0 20px 50px -30px rgba(0,0,0,0.18)` | Standard card resting shadow |
| **md (card)** | `0 24px 60px -40px rgba(0,0,0,0.25)` | Configurator / summary cards |
| **lg (hover/pop)** | `0 24px 60px -24px rgba(0,0,0,0.28)` | Dropdown popovers, card hover lift (`0 20px 60px -30px rgba(0,0,0,0.2)`) |
| **xl (modal)** | `0 30px 80px -50px rgba(0,0,0,0.3)` | Modals, large forms |
| **accent glow** | Banner `0 30px 80px -30px rgba(233,78,27,0.45)` · Button `0 18px 40px -18px rgba(200,55,11,0.7)` | Accent CTA banners & emphasised buttons |

> Focus ring shadow (alt to outline): `0 0 0 4px rgba(233,78,27,0.18)`.

### 3.3 Spacing system
Base unit **4px** (Tailwind default). Common steps in use:

| Utility | px | Typical use |
|---|---|---|
| `gap-2` / `p-2` | 8 | Tight icon gaps |
| `gap-3` | 12 | Chip/label gaps |
| `gap-4` | 16 | Field grid gaps |
| `gap-5` / `p-5` | 20 | Card inner spacing (compact) |
| `gap-6` / `p-6` | 24 | Card padding |
| `gap-7` / `p-7` | 28 | Card padding (standard) |
| `gap-8` | 32 | Grid gutter, card padding (large) |
| `gap-10` | 40 | Column gutter (12-col grids) |
| `gap-12` | 48 | Wide column gutter |
| `gap-14` | 56 | Hero column gutter |

**Section vertical padding:** `py-16 lg:py-20` (64 → 80) or `py-16 lg:py-24` (64 → 96).
**Container horizontal padding:** `px-5 sm:px-8 lg:px-12` (20 → 32 → 48).
**Card padding:** compact `p-5 sm:p-7` (20/28); standard `p-6 lg:p-8` (24/32); large `p-7 lg:p-9` (28/36).

**Container max-widths** ([`Container`](src/components/ui/Container.tsx)): `narrow 1200px` · `default 1320px` · `wide 1440px` · `full none`.

**Breakpoints** (Tailwind defaults; site uses mainly `sm` & `lg`): `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.

### 3.4 Icon sizes
Icons: **lucide-react**, resolved by name (see [`DynamicIcon`](src/components/air-receiver/DynamicIcon.tsx)).

| Size | px | Usage |
|---|---|---|
| `size-3.5` | 14 | Inline chip icons, button arrows, small meta |
| `size-4` | 16 | Default inline icon, form/field icons |
| `size-4.5` / `size-[18px]` | 18 | Select field icons |
| `size-5` | 20 | List/nav/FAQ chevrons, section icons |
| `size-[22px]` | 22 | Feature-card icons |
| `size-8` | 32 | Success circle icon |
| Icon chip `size-9` | 36 | Chip container (rounded-[9px], `bg-[var(--color-bg)]`, accent icon) |
| Icon tile `size-11 – size-12` | 44–48 | Feature / advantage / trust tiles (rounded-[12px]/[13px]) |
| Success badge `size-16` | 64 | Modal / form success state |

Stroke width: `1.7 – 1.8` for decorative icons; `2 – 3` for emphasis/checks.

### 3.5 Buttons
Primary component: [`Button`](src/components/ui/Button.tsx) — with animated text-roll + sliding arrow glyph.

**Shape (all variants):** `rounded-tl-[6px] rounded-tr-[6px] rounded-bl-[6px] rounded-br-[16px]`, `font-medium`.
**Sizes:** `md` → `h-13` (52px), text `15px` · `lg` → `h-14` (56px), text `16px`. (Custom-builder CTA uses `h-15`/60px.)

| Variant | Background | Text | Hover | Arrow chip |
|---|---|---|---|---|
| `primary` | `#C8370B` | white | `#A82E08` | `bg-[var(--color-bg-dark)]` white |
| `dark` | `--color-bg-dark` `#0d0d0d` | white | `#1e1e1e` | `bg-[var(--color-accent)]` white |
| `white` | `#ffffff` + `border-line` | ink | `white/95` | accent white |
| `outline` | transparent + `border-ink` | ink | fill ink, text white | accent white |

Secondary/ghost link buttons: `h-11` (44px), `rounded-[10px]`, `border-line`, `text-[14px] font-medium`, hover border `--color-ink-soft`.

### 3.6 Input fields
Reference: [`ContactSection`](src/sections/contact/ContactSection.tsx) fields, [`ConfigSelect`](src/components/air-receiver/ConfigSelect.tsx), [`QuoteModal`](src/components/air-receiver/QuoteModal.tsx).

| Property | Value |
|---|---|
| Height | `h-12` (48px) text inputs · `h-[52px]` config selects & unit fields |
| Radius | `rounded-[10px]` (inputs) · `rounded-[12px]` (selects) |
| Border | `border border-[var(--color-line)]` |
| Background | `#ffffff` |
| Padding | `px-4` (icon-less) · `pl-9` (with leading icon) |
| Text | `14.5px – 15px`, colour `--color-ink` |
| Placeholder | `--color-muted` |
| Focus | `border-[var(--color-accent)]` + `ring-2 ring-[var(--color-accent-soft)]` |
| Error | border + helper text `--color-accent`; `aria-invalid` set |
| Label | `12.5px – 13px`, `font-medium`, `--color-ink-soft`; required `*` in accent/red-500 |
| Textarea | `rounded-[10px]`, `py-3`, `resize-y`, optional char counter (`{n}/{max}`) |
| Leading-icon chip (select) | `size-9`, `rounded-[9px]`, `bg-[var(--color-bg)]`, accent icon |

### 3.7 Cards
| Card type | Recipe |
|---|---|
| **Standard card** | `rounded-[18px] border border-[var(--color-line)] bg-white p-7 lg:p-9` + shadow **sm** |
| **Configurator card** | `rounded-[20px] border border-[var(--color-line)] bg-white p-6 lg:p-8` + shadow **md** (`0 24px 60px -40px rgba(0,0,0,0.25)`) |
| **FAQ item** | `rounded-[14px] border border-[var(--color-line)] bg-white px-5 py-4`; open state → border `accent/40` + shadow `0 20px 50px -30px rgba(0,0,0,0.15)` |
| **Feature / icon card** | `border-[var(--color-line)] bg-white p-6/7`; icon tile top; hover → border `accent/40`, translate-y-1 |
| **Dark card** (trust) | `rounded-[18px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm` |
| **Chip / tag** | `rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-[14px] font-medium`; dark variant `border-white/15 bg-white/5` |
| **Accent CTA banner** | `rounded-[24px] bg-[linear-gradient(135deg,#f5612e_0%,#e94e1b_55%,#b8390f_100%)] text-white p-10 lg:p-16` + accent glow shadow |
| **Modal** | `rounded-[22px] border border-[var(--color-line)] bg-white shadow-2xl`; backdrop `bg-black/55 backdrop-blur-sm` |

---

## 4. Motion (animation tokens)
Defined in [`src/animations/motion.ts`](src/animations/motion.ts) (Framer Motion). Global smooth-scroll via Lenis.

| Token | Value |
|---|---|
| `EASE_OUT_SOFT` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `EASE_OUT_EXPO` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `fadeUp` | `opacity 0→1`, `y 28→0`, duration `0.7s`, soft ease |
| `fadeIn` | `opacity 0→1`, `0.6s` |
| `scaleIn` | `scale 0.96→1`, `0.7s` |
| `stagger(delayChildren, staggerChildren)` | default `0.05` / `0.08` |
| `viewportOnce` | `{ once: true, amount: 0.25 }` (reveal when 25% in view, once) |
| Button roll/arrow | `transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]` |
| Hover transitions | `duration-300` (colours), `duration-500` (image scale) |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` collapses all animation to ~0ms |

---

## 5. Quick token reference (copy-paste)

```css
/* Colour */
--color-bg:           #f1f1ef;   /* page background            */
--color-bg-soft:      #f1f1ef;   /* alternating section        */
--color-bg-dark:      #0d0d0d;   /* dark sections / footer     */
--color-surface:      #ffffff;   /* cards / inputs             */
--color-ink:          #111111;   /* headings / primary text    */
--color-ink-soft:     #2a2a2a;   /* body text                  */
--color-muted:        #6b6b6b;   /* captions / meta            */
--color-line:         #d9d9d6;   /* borders                    */
--color-line-dark:    #1f1f1f;   /* borders on dark            */
--color-accent:       #e94e1b;   /* highlights / icons / links */
--color-accent-hover: #d44513;   /* accent hover               */
--color-accent-soft:  #fde4d8;   /* accent tint / success      */
/* CTA button fill (not a css var yet — literal): #C8370B, hover #A82E08 */
/* error: text #DC2626, surface #FEF2F2, asterisk #EF4444             */

/* Radius */    pill 9999px · tag 8px · card 12px · std-card 18px · config-card 20px · panel 24px
/* Type */      display -0.02em · headings 700 · body 400/1.6 · font Mona Sans
/* Motion */    ease (0.22,1,0.36,1) · reveal fadeUp y28 0.7s once@25%
/* Container */ narrow 1200 · default 1320 · wide 1440 · pad px-5/8/12
/* Section */   py-16 lg:py-20  (or lg:py-24)
```

---

### Notes for future development
1. **Two oranges are intentional** — accent `#e94e1b` (marks/icons) vs CTA `#C8370B` (buttons). Don't merge them.
2. `--color-bg` and `--color-bg-soft` are the same hex today; keep them as separate tokens so section rhythm can be re-tuned later without a find-replace.
3. **Semantic warning/info are undefined** — add the recommended tokens in §2.5 before building any status/toast UI so it isn't invented ad-hoc.
4. **Shadows sprawl** — ~40 unique arbitrary shadows exist. New work should use the 6-tier scale in §3.2; migrate one-offs opportunistically.
5. The **asymmetric button corner** (`rounded-br-[16px]`) is a brand signature — reuse the `Button` component rather than re-implementing.
