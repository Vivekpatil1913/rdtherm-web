"use client";

import { useId } from "react";
import type { AirReceiverConfig } from "@/data/air-receiver";
import { dimensionsByVolume } from "@/data/air-receiver";

/**
 * Live, fully procedural air-receiver visualisation.
 *
 * Instead of swapping static photos, the vessel is drawn as an SVG that reacts
 * to every configurator field — material & colour drive the shell fill,
 * support type swaps the base structure, and the selected accessories (valve,
 * gauge) appear on the vessel. Three "views" mimic a product-photo gallery:
 *   - front:      hero presentation render
 *   - side:       rotated nozzle arrangement
 *   - technical:  monochrome GA-drawing style with dimension call-outs
 *
 * When real photography is available later, this component can be replaced by
 * an <Image> map keyed on the same config without touching the configurator.
 */

export type ReceiverView = "front" | "side" | "technical";

const COLOR_HEX: Record<string, string> = {
  Blue: "#1f4e79",
  Grey: "#6b7280",
  White: "#d8dce1",
  Custom: "#0f9d8a",
};

function isStainless(material: string) {
  return material === "SS304" || material === "SS316";
}

function shellColor(config: AirReceiverConfig) {
  // The selected finish colour drives the shell for every material; stainless
  // simply reads brighter (mixed toward steel) and gets extra sheen below.
  const picked = COLOR_HEX[config.color] ?? "#1f4e79";
  return isStainless(config.material) ? mix(picked, "#c2c8cf", 0.4) : picked;
}

/** Mix hex `a` toward hex `b` by `t` (0–1). */
function mix(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const r = Math.round(((pa >> 16) & 255) * (1 - t) + ((pb >> 16) & 255) * t);
  const g = Math.round(((pa >> 8) & 255) * (1 - t) + ((pb >> 8) & 255) * t);
  const bl = Math.round((pa & 255) * (1 - t) + (pb & 255) * t);
  return `#${[r, g, bl].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** Darken a hex by mixing toward black — used for shading. */
function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.round(((n >> 16) & 255) * (1 - amount)));
  const g = Math.max(0, Math.round(((n >> 8) & 255) * (1 - amount)));
  const b = Math.max(0, Math.round((n & 255) * (1 - amount)));
  return `rgb(${r},${g},${b})`;
}

export function AirReceiverVisual({
  config,
  view = "front",
  className,
}: {
  config: AirReceiverConfig;
  view?: ReceiverView;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const dims = dimensionsByVolume[config.volume] ?? dimensionsByVolume["2"];
  const base = shellColor(config);
  const isTech = view === "technical";

  // Glossiness from coating — epoxy is glossy, sand-blasted/standard is matte —
  // with extra sheen for stainless so it reads metallic.
  const coatGloss = config.coating.includes("Epoxy") ? 0.55 : config.coating === "SandBlast" ? 0.12 : 0.3;
  const gloss = isStainless(config.material) ? Math.min(0.72, coatGloss + 0.28) : coatGloss;

  // Vessel geometry (viewBox 320 x 440), driven by the *real* dimensions of the
  // selected volume so a 0.5 m³ is visibly short & slim and a 10 m³ is tall &
  // wide. The vessel stands on the ground (bottom head apex fixed) and grows
  // upward as volume increases.
  const cx = 160;
  const WIDTH_SCALE = 0.075; // px per mm of diameter
  const HEIGHT_SCALE = 0.062; // px per mm of overall height
  const BOTTOM_APEX = 372; // bottom dished-end apex sits here for every size

  const shellW = Math.max(44, dims.diameter * WIDTH_SCALE);
  const headRy = shellW * 0.22; // dished-end depth scales with diameter
  const totalH = dims.height * HEIGHT_SCALE; // apex-to-apex visual height
  const yBot = BOTTOM_APEX - headRy; // bottom of cylinder
  const bodyH = Math.max(56, totalH - 2 * headRy);
  const yTop = yBot - bodyH; // top of cylinder
  const left = cx - shellW / 2;
  const right = cx + shellW / 2;

  const fillId = `arShell-${uid}`;
  const glossId = `arGloss-${uid}`;

  return (
    <svg
      viewBox="0 0 320 440"
      className={className}
      role="img"
      aria-label={`Air receiver preview — ${config.volume} m³, ${config.material}, ${config.support} support`}
    >
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={shade(base, 0.34)} />
          <stop offset="0.3" stopColor={base} />
          <stop offset="0.55" stopColor={base} />
          <stop offset="1" stopColor={shade(base, 0.42)} />
        </linearGradient>
        <linearGradient id={glossId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.34" stopColor="#ffffff" stopOpacity={gloss} />
          <stop offset="0.46" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* soft ground shadow (skip on technical drawing) */}
      {!isTech && <ellipse cx={cx} cy={418} rx={shellW * 0.85 + 18} ry={12} fill="#000000" opacity="0.07" />}

      {/* ---- SUPPORT (drawn first so the shell sits on top) ---- */}
      <Support type={config.support} left={left} right={right} cx={cx} yBot={yBot} headRy={headRy} isTech={isTech} stroke={base} />

      {/* ---- SHELL ---- */}
      <g>
        {/* cylindrical body */}
        <rect
          x={left}
          y={yTop}
          width={shellW}
          height={bodyH}
          fill={isTech ? "none" : `url(#${fillId})`}
          stroke={isTech ? "#374151" : shade(base, 0.5)}
          strokeWidth={isTech ? 1.4 : 1}
        />
        {/* top dished end */}
        <path
          d={`M ${left} ${yTop} A ${shellW / 2} ${headRy} 0 0 1 ${right} ${yTop}`}
          fill={isTech ? "none" : `url(#${fillId})`}
          stroke={isTech ? "#374151" : shade(base, 0.5)}
          strokeWidth={isTech ? 1.4 : 1}
        />
        {/* bottom dished end */}
        <path
          d={`M ${left} ${yBot} A ${shellW / 2} ${headRy} 0 0 0 ${right} ${yBot}`}
          fill={isTech ? "none" : `url(#${fillId})`}
          stroke={isTech ? "#374151" : shade(base, 0.5)}
          strokeWidth={isTech ? 1.4 : 1}
        />

        {!isTech && (
          <>
            {/* specular gloss highlight */}
            <rect x={left} y={yTop} width={shellW} height={bodyH} fill={`url(#${glossId})`} />
            {/* weld seam rings */}
            <line x1={left} y1={yTop + bodyH * 0.34} x2={right} y2={yTop + bodyH * 0.34} stroke={shade(base, 0.5)} strokeWidth="1" opacity="0.5" />
            <line x1={left} y1={yTop + bodyH * 0.68} x2={right} y2={yTop + bodyH * 0.68} stroke={shade(base, 0.5)} strokeWidth="1" opacity="0.5" />
            {/* manhole / inspection pad — scales with shell width */}
            <ellipse cx={cx} cy={yTop + bodyH * 0.52} rx={shellW * 0.3} ry={Math.min(26, bodyH * 0.16)} fill={shade(base, 0.18)} stroke={shade(base, 0.5)} strokeWidth="1" />
            <ellipse cx={cx} cy={yTop + bodyH * 0.52} rx={shellW * 0.2} ry={Math.min(18, bodyH * 0.11)} fill="none" stroke={shade(base, 0.55)} strokeWidth="1" opacity="0.6" />
          </>
        )}

        {/* nameplate — kept inside the shell */}
        {!isTech && (
          <rect x={cx + shellW * 0.16} y={yTop + bodyH * 0.16} width={Math.min(26, shellW * 0.32)} height={14} rx={2} fill="#e5e7eb" stroke={shade(base, 0.5)} strokeWidth="0.8" opacity="0.95" />
        )}
      </g>

      {/* ---- TOP NOZZLE + accessories ---- */}
      <Accessories
        view={view}
        config={config}
        cx={cx}
        left={left}
        right={right}
        yTop={yTop}
        yBot={yBot}
        headRy={headRy}
        bodyH={bodyH}
        isTech={isTech}
        accent={base}
      />

      {/* ---- TECHNICAL DIMENSION CALL-OUTS ---- */}
      {isTech && (
        <Dimensions
          left={left}
          right={right}
          cx={cx}
          yTop={yTop}
          yBot={yBot}
          headRy={headRy}
          diameter={`${dims.diameter} mm`}
          height={`${dims.height} mm`}
        />
      )}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

function Support({
  type,
  left,
  right,
  cx,
  yBot,
  headRy,
  isTech,
  stroke,
}: {
  type: string;
  left: number;
  right: number;
  cx: number;
  yBot: number;
  headRy: number;
  isTech: boolean;
  stroke: string;
}) {
  const metal = isTech ? "none" : shade(stroke, 0.45);
  const line = isTech ? "#374151" : shade(stroke, 0.6);
  const ground = 402;
  const sw = isTech ? 1.4 : 1;
  const w = right - left;
  const apex = yBot + headRy; // bottom dished-end apex (constant across sizes)

  if (type === "Skid") {
    // Channel base frame the vessel sits on — width tracks the shell.
    const saddleW = Math.max(14, w * 0.2);
    const saddleOff = w * 0.22;
    const saddleH = ground - 18 - apex + 6;
    return (
      <g>
        <rect x={left - 14} y={ground - 18} width={w + 28} height={18} fill={metal} stroke={line} strokeWidth={sw} />
        <rect x={left - 14} y={ground - 18} width={w + 28} height={5} fill={isTech ? "none" : shade(stroke, 0.3)} stroke={line} strokeWidth={sw * 0.7} />
        {/* saddle blocks */}
        <rect x={cx - saddleOff - saddleW / 2} y={apex - 6} width={saddleW} height={saddleH} fill={metal} stroke={line} strokeWidth={sw} />
        <rect x={cx + saddleOff - saddleW / 2} y={apex - 6} width={saddleW} height={saddleH} fill={metal} stroke={line} strokeWidth={sw} />
      </g>
    );
  }

  if (type === "Ring") {
    // Conical skirt / ring support — flares from the shell to a base ring.
    const skirtTop = w * 0.12; // inset from each shell edge
    const baseHalf = w * 0.5 + 10;
    return (
      <g>
        <path
          d={`M ${cx - baseHalf} ${ground} L ${left + skirtTop} ${apex - 8} L ${right - skirtTop} ${apex - 8} L ${cx + baseHalf} ${ground} Z`}
          fill={metal}
          stroke={line}
          strokeWidth={sw}
        />
        {/* base ring */}
        <rect x={cx - baseHalf - 4} y={ground - 5} width={baseHalf * 2 + 8} height={6} fill={isTech ? "none" : shade(stroke, 0.3)} stroke={line} strokeWidth={sw} />
        {/* access opening */}
        <path d={`M ${cx - 9} ${ground} L ${cx - 6} ${ground - 20} L ${cx + 6} ${ground - 20} L ${cx + 9} ${ground} Z`} fill={isTech ? "none" : shade(stroke, 0.6)} stroke={line} strokeWidth={sw * 0.7} opacity={isTech ? 1 : 0.6} />
      </g>
    );
  }

  // Default: leg support (3 visible legs that splay outward to the ground).
  const legTop = apex - 10;
  const inset = Math.max(7, w * 0.18);
  const splay = Math.max(6, w * 0.1);
  const legs = [
    { x: left + inset, dx: -splay },
    { x: cx, dx: 0 },
    { x: right - inset, dx: splay },
  ];
  return (
    <g>
      {legs.map((l, i) => (
        <g key={i}>
          <path
            d={`M ${l.x - 5} ${legTop} L ${l.x + l.dx - 6} ${ground} L ${l.x + l.dx + 2} ${ground} L ${l.x + 3} ${legTop} Z`}
            fill={metal}
            stroke={line}
            strokeWidth={sw}
          />
          {/* foot pad */}
          <rect x={l.x + l.dx - 9} y={ground} width={16} height={5} rx={1} fill={isTech ? "none" : shade(stroke, 0.3)} stroke={line} strokeWidth={sw} />
        </g>
      ))}
      {/* cross brace */}
      {!isTech && (
        <line x1={left + 6} y1={ground - 34} x2={right - 6} y2={ground - 34} stroke={line} strokeWidth="2" opacity="0.7" />
      )}
    </g>
  );
}

/* -------------------------------------------------------------------------- */

function Accessories({
  view,
  config,
  cx,
  left,
  right,
  yTop,
  yBot,
  headRy,
  bodyH,
  isTech,
  accent,
}: {
  view: ReceiverView;
  config: AirReceiverConfig;
  cx: number;
  left: number;
  right: number;
  yTop: number;
  yBot: number;
  headRy: number;
  bodyH: number;
  isTech: boolean;
  accent: string;
}) {
  const metal = isTech ? "none" : "#9aa3ad";
  const dark = isTech ? "#374151" : "#4b5563";
  const sw = isTech ? 1.2 : 1;
  // Side view mirrors the nozzle bank to the opposite side for variety.
  const inletX = view === "side" ? left : right;
  const inletDir = view === "side" ? -1 : 1;
  const accentCol = isTech ? "#374151" : accent;

  return (
    <g>
      {/* top centre outlet nozzle + flange */}
      <rect x={cx - 7} y={yTop - headRy - 16} width={14} height={18} fill={metal} stroke={dark} strokeWidth={sw} />
      <rect x={cx - 12} y={yTop - headRy - 20} width={24} height={6} rx={1} fill={metal} stroke={dark} strokeWidth={sw} />

      {/* SAFETY VALVE (relief) on the top when selected */}
      {config.valve === "Safety" && (
        <g>
          <rect x={cx + 18} y={yTop - 8} width={9} height={16} fill={metal} stroke={dark} strokeWidth={sw} />
          <rect x={cx + 14} y={yTop - 22} width={17} height={15} rx={2} fill={isTech ? "none" : "#cbd5e1"} stroke={dark} strokeWidth={sw} />
          <path d={`M ${cx + 22} ${yTop - 22} l 0 -10 l 6 0`} fill="none" stroke={dark} strokeWidth={sw} />
          {!isTech && <circle cx={cx + 28} cy={yTop - 32} r={2.5} fill={accentCol} />}
        </g>
      )}

      {/* PRESSURE GAUGE near the top of the shell */}
      <g>
        <line x1={inletX} y1={yTop + bodyH * 0.12} x2={inletX + inletDir * 14} y2={yTop + bodyH * 0.12} stroke={dark} strokeWidth={sw * 1.4} />
        {config.gauge === "Digital" ? (
          <g>
            <rect x={inletX + inletDir * 14 - (inletDir < 0 ? 22 : 0)} y={yTop + bodyH * 0.12 - 11} width={22} height={22} rx={2} fill={isTech ? "none" : "#111827"} stroke={dark} strokeWidth={sw} />
            {!isTech && (
              <rect x={inletX + inletDir * 14 - (inletDir < 0 ? 18 : -4)} y={yTop + bodyH * 0.12 - 6} width={14} height={12} rx={1} fill="#22d3ee" opacity="0.85" />
            )}
          </g>
        ) : (
          <g>
            <circle cx={inletX + inletDir * 24} cy={yTop + bodyH * 0.12} r={12} fill={isTech ? "none" : "#f8fafc"} stroke={dark} strokeWidth={sw} />
            {!isTech && (
              <>
                <line x1={inletX + inletDir * 24} y1={yTop + bodyH * 0.12} x2={inletX + inletDir * 24 + 6} y2={yTop + bodyH * 0.12 - 5} stroke={accentCol} strokeWidth="1.6" />
                <circle cx={inletX + inletDir * 24} cy={yTop + bodyH * 0.12} r={1.6} fill={dark} />
              </>
            )}
          </g>
        )}
      </g>

      {/* INLET nozzle on the shell */}
      <g>
        <rect
          x={inletDir > 0 ? inletX : inletX - 16}
          y={yTop + bodyH * 0.42}
          width={16}
          height={11}
          fill={metal}
          stroke={dark}
          strokeWidth={sw}
        />
        <rect
          x={inletDir > 0 ? inletX + 16 : inletX - 21}
          y={yTop + bodyH * 0.42 - 3}
          width={5}
          height={17}
          fill={metal}
          stroke={dark}
          strokeWidth={sw}
        />
      </g>

      {/* DRAIN valve at the bottom dished end */}
      <g>
        <rect x={cx - 4} y={yBot + headRy - 4} width={8} height={14} fill={metal} stroke={dark} strokeWidth={sw} />
        {config.valve === "Drain" && !isTech && (
          <>
            <rect x={cx - 9} y={yBot + headRy + 8} width={18} height={7} rx={1} fill="#cbd5e1" stroke={dark} strokeWidth={sw} />
            <circle cx={cx + 12} cy={yBot + headRy + 11} r={3} fill={accentCol} />
          </>
        )}
        {config.valve === "Drain" && isTech && (
          <rect x={cx - 9} y={yBot + headRy + 8} width={18} height={7} rx={1} fill="none" stroke={dark} strokeWidth={sw} />
        )}
      </g>
    </g>
  );
}

/* -------------------------------------------------------------------------- */

function Dimensions({
  left,
  right,
  cx,
  yTop,
  yBot,
  headRy,
  diameter,
  height,
}: {
  left: number;
  right: number;
  cx: number;
  yTop: number;
  yBot: number;
  headRy: number;
  diameter: string;
  height: string;
}) {
  const dimCol = "#9ca3af";
  const txt = "#4b5563";
  const dimX = right + 30;
  const topY = yTop - headRy;
  const botY = yBot + headRy;

  return (
    <g fontSize="11" fontFamily="ui-sans-serif, system-ui" fill={txt}>
      {/* centreline */}
      <line x1={cx} y1={topY - 24} x2={cx} y2={botY + 30} stroke={dimCol} strokeWidth="0.7" strokeDasharray="6 3 1 3" />

      {/* height dimension (right) */}
      <line x1={dimX} y1={topY} x2={dimX} y2={botY} stroke={dimCol} strokeWidth="0.8" />
      <line x1={dimX - 4} y1={topY} x2={dimX + 4} y2={topY} stroke={dimCol} strokeWidth="0.8" />
      <line x1={dimX - 4} y1={botY} x2={dimX + 4} y2={botY} stroke={dimCol} strokeWidth="0.8" />
      <line x1={right} y1={topY} x2={dimX} y2={topY} stroke={dimCol} strokeWidth="0.4" strokeDasharray="3 3" />
      <line x1={right} y1={botY} x2={dimX} y2={botY} stroke={dimCol} strokeWidth="0.4" strokeDasharray="3 3" />
      <text x={dimX + 6} y={(topY + botY) / 2} dominantBaseline="middle" transform={`rotate(90 ${dimX + 6} ${(topY + botY) / 2})`} textAnchor="middle">
        H {height}
      </text>

      {/* diameter dimension (top) */}
      <line x1={left} y1={topY - 18} x2={right} y2={topY - 18} stroke={dimCol} strokeWidth="0.8" />
      <line x1={left} y1={topY - 22} x2={left} y2={topY - 14} stroke={dimCol} strokeWidth="0.8" />
      <line x1={right} y1={topY - 22} x2={right} y2={topY - 14} stroke={dimCol} strokeWidth="0.8" />
      <line x1={left} y1={topY} x2={left} y2={topY - 18} stroke={dimCol} strokeWidth="0.4" strokeDasharray="3 3" />
      <line x1={right} y1={topY} x2={right} y2={topY - 18} stroke={dimCol} strokeWidth="0.4" strokeDasharray="3 3" />
      <text x={cx} y={topY - 24} textAnchor="middle">
        ⌀ {diameter}
      </text>
    </g>
  );
}
