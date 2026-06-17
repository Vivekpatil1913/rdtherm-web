// Air Receiver product-page data.
//
// This file is the single source of truth for the Air Receiver configurator.
// It is intentionally serialisable (plain strings / numbers, icon *names* not
// components) so the exact same shape can later be served by the Admin API
// without changing any component. When the backend is ready, replace these
// exports with `getAirReceiver()` in services/content.ts — the components only
// depend on the types below.

/* ------------------------------------------------------------------ */
/*  Configurator model                                                 */
/* ------------------------------------------------------------------ */

/** A single selectable option inside a configurator field. */
export type ConfigOption = {
  value: string;
  label: string;
  /** Optional helper note shown under the option (e.g. lead time, premium). */
  note?: string;
  /** Hex used by the live visual when this option drives colour (material/paint). */
  swatch?: string;
};

/** A configurator field — rendered as a premium dropdown. */
export type ConfigField = {
  key: ConfigKey;
  label: string;
  /** lucide-react icon name, resolved to a component in the UI layer. */
  icon: string;
  options: ConfigOption[];
  /** Default selected value (must match one option `value`). */
  default: string;
  /** Short engineer-facing hint shown in the field. */
  hint?: string;
};

export type ConfigKey =
  | "volume"
  | "pressure"
  | "material"
  | "support"
  | "color"
  | "coating"
  | "valve"
  | "gauge";

/** Full selected configuration (quantity kept separate as it is numeric). */
export type AirReceiverConfig = Record<ConfigKey, string>;

export const configFields: ConfigField[] = [
  {
    key: "volume",
    label: "Volume",
    icon: "Box",
    hint: "Tank storage capacity",
    default: "2",
    options: [
      { value: "0.5", label: "0.5 m³", note: "Compact / point-of-use" },
      { value: "1", label: "1 m³", note: "Light duty" },
      { value: "2", label: "2 m³", note: "Most popular" },
      { value: "5", label: "5 m³", note: "Plant air buffer" },
      { value: "10", label: "10 m³", note: "Central / ring main" },
    ],
  },
  {
    key: "pressure",
    label: "Working Pressure",
    icon: "Gauge",
    hint: "Design / working pressure",
    default: "12",
    options: [
      { value: "8", label: "8 Bar" },
      { value: "10", label: "10 Bar" },
      { value: "12", label: "12 Bar", note: "Standard shop air" },
      { value: "16", label: "16 Bar" },
      { value: "20", label: "20 Bar", note: "High pressure" },
    ],
  },
  {
    key: "material",
    label: "Material of Construction",
    icon: "Layers",
    hint: "Shell & dished-end material",
    default: "MS",
    options: [
      { value: "MS", label: "MS (Mild Steel)", note: "IS 2062 / SA 516", swatch: "#3f5d80" },
      { value: "SS304", label: "SS304", note: "Food / general clean air", swatch: "#c2c8cf" },
      { value: "SS316", label: "SS316", note: "Pharma / corrosive duty", swatch: "#b9c0c8" },
    ],
  },
  {
    key: "support",
    label: "Support Type",
    icon: "Wrench",
    hint: "Mounting arrangement",
    default: "Leg",
    options: [
      { value: "Leg", label: "Leg Support", note: "Vertical, 3–4 legs" },
      { value: "Skid", label: "Skid Mounted", note: "Channel base frame" },
      { value: "Ring", label: "Ring Support", note: "Full skirt / ring" },
    ],
  },
  {
    key: "color",
    label: "Finish Colour",
    icon: "Palette",
    hint: "External paint shade",
    default: "Blue",
    options: [
      { value: "Blue", label: "Industrial Blue", swatch: "#1f4e79" },
      { value: "Grey", label: "Grey", swatch: "#6b7280" },
      { value: "White", label: "White", swatch: "#e5e7eb" },
      { value: "Custom", label: "Custom Colour", note: "RAL / shade on request", swatch: "#0f9d8a" },
    ],
  },
  {
    key: "coating",
    label: "Surface Coating",
    icon: "PaintBucket",
    hint: "Corrosion protection",
    default: "Epoxy",
    options: [
      { value: "Standard", label: "Standard Paint", note: "1 coat primer + 1 finish" },
      { value: "Epoxy", label: "Epoxy Coating", note: "2-pack, high durability" },
      { value: "SandBlast", label: "Sand Blasting", note: "SA 2.5 surface prep" },
      { value: "SandBlastEpoxy", label: "Sand Blasting + Epoxy", note: "Best protection" },
    ],
  },
  {
    key: "valve",
    label: "Valve Type",
    icon: "Settings2",
    hint: "Primary trim valve",
    default: "Safety",
    options: [
      { value: "Standard", label: "Standard Valve" },
      { value: "Safety", label: "Safety Valve", note: "Pressure relief, recommended" },
      { value: "Drain", label: "Drain Valve", note: "Auto / manual condensate" },
    ],
  },
  {
    key: "gauge",
    label: "Pressure Gauge",
    icon: "CircleGauge",
    hint: "Instrumentation",
    default: "Analog",
    options: [
      { value: "Analog", label: "Analog Gauge", note: "Bourdon dial, 100 mm" },
      { value: "Digital", label: "Digital Gauge", note: "Display + 4–20 mA out" },
    ],
  },
];

/** Convenience: default configuration derived from the fields above. */
export const defaultConfig: AirReceiverConfig = configFields.reduce(
  (acc, f) => ({ ...acc, [f.key]: f.default }),
  {} as AirReceiverConfig,
);

/**
 * Realistic engineering dimensions keyed by volume (m³).
 * Drives the live technical view dimension call-outs and the summary.
 * Diameter & height in mm, dry weight in kg (indicative, MS @ 12 bar).
 */
export const dimensionsByVolume: Record<
  string,
  { diameter: number; height: number; weight: number; connection: string }
> = {
  "0.5": { diameter: 600, height: 2050, weight: 220, connection: '1"' },
  "1": { diameter: 800, height: 2400, weight: 360, connection: '1.5"' },
  "2": { diameter: 1000, height: 2900, weight: 620, connection: '2"' },
  "5": { diameter: 1400, height: 3650, weight: 1450, connection: '3"' },
  "10": { diameter: 1600, height: 4900, weight: 2650, connection: '4"' },
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Compressed Air Equipment",
  title: "Air Receiver",
  description:
    "ASME U-Stamp certified air receivers that absorb compressor pulsations, stabilise line pressure and cut energy cost. Configure your vessel below and request a quote in minutes.",
  badges: [
    "Pressure Vessel Certified",
    "Multiple Volume Options",
    "Custom Manufacturing Available",
    "SS & MS Material Options",
  ],
  quickSpecs: [
    { label: "Volume Range", value: "0.25 – 90 m³", icon: "Box" },
    { label: "Pressure Range", value: "6 – 75 Kgf/cm²", icon: "Gauge" },
    { label: "Material Options", value: "MS · SS304 · SS316", icon: "Layers" },
    { label: "Support Types", value: "Leg · Skid · Ring", icon: "Wrench" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Product information                                                */
/* ------------------------------------------------------------------ */

export const productInfo: { key: string; title: string; body: string }[] = [
  {
    key: "overview",
    title: "Overview",
    body: "An air receiver is a pressure vessel that stores compressed air downstream of the compressor. By providing buffer storage it dampens pressure pulsations, prevents rapid compressor cycling and delivers a stable, dry air supply to the plant. R&D Therm has built air receivers since 1995 to ASME Section VIII Div 1, each unit hydro-tested and inspected before despatch.",
  },
  {
    key: "applications",
    title: "Applications",
    body: "Used wherever compressed air is generated or consumed — as primary storage near the compressor, as secondary buffer storage near high-demand machines, and as part of instrument-air and ring-main systems across process industries.",
  },
  {
    key: "working",
    title: "Working Principle",
    body: "Compressed air enters the receiver, expands and slows down inside the larger volume. Heavier moisture and oil droplets drop out and collect at the base for draining, while the stored air volume acts as an energy reservoir — meeting peak demand without the compressor needing to start, which reduces load/unload cycling and saves power.",
  },
  {
    key: "construction",
    title: "Construction Details",
    body: "Rolled shell with 2:1 ellipsoidal dished ends, full-penetration welds, radiography per code, and nozzles for inlet, outlet, safety valve, drain, pressure gauge and a manhole/handhole for inspection. Supplied with leg, skid or ring support and the coating system you select.",
  },
];

export const industries: { label: string; icon: string }[] = [
  { label: "Manufacturing Plants", icon: "Factory" },
  { label: "Pharmaceutical Industry", icon: "Pill" },
  { label: "Food Processing", icon: "UtensilsCrossed" },
  { label: "Chemical Industry", icon: "FlaskConical" },
  { label: "Compressor Systems", icon: "Wind" },
];

/* ------------------------------------------------------------------ */
/*  Advantages                                                         */
/* ------------------------------------------------------------------ */

export const advantages: { title: string; body: string; icon: string }[] = [
  { title: "Stable Air Pressure", body: "Buffer volume smooths line pressure to consuming equipment.", icon: "Gauge" },
  { title: "Reduced Compressor Cycling", body: "Fewer load/unload events extend service intervals.", icon: "RefreshCw" },
  { title: "Improved System Efficiency", body: "Meets peak demand from storage, not from the motor.", icon: "TrendingUp" },
  { title: "Lower Energy Consumption", body: "Less cycling and pressure drop means lower kWh.", icon: "Zap" },
  { title: "Longer Compressor Life", body: "Reduced starts lower thermal and mechanical wear.", icon: "HeartPulse" },
  { title: "Better Moisture Separation", body: "Air slows inside the shell so condensate drops out.", icon: "Droplets" },
  { title: "Improved Air Quality", body: "Cleaner, drier air protects downstream tools.", icon: "Wind" },
  { title: "High Durability", body: "Code construction and coatings for long field life.", icon: "ShieldCheck" },
];

/* ------------------------------------------------------------------ */
/*  Technical specification table                                      */
/* ------------------------------------------------------------------ */

export type SpecRow = {
  volume: string;
  pressure: string;
  material: string;
  diameter: string;
  height: string;
  weight: string;
  connection: string;
};

export const specRows: SpecRow[] = [
  { volume: "0.5 m³", pressure: "8–20 Bar", material: "MS / SS", diameter: "600 mm", height: "2050 mm", weight: "220 kg", connection: '1"' },
  { volume: "1 m³", pressure: "8–20 Bar", material: "MS / SS", diameter: "800 mm", height: "2400 mm", weight: "360 kg", connection: '1.5"' },
  { volume: "2 m³", pressure: "8–20 Bar", material: "MS / SS", diameter: "1000 mm", height: "2900 mm", weight: "620 kg", connection: '2"' },
  { volume: "3 m³", pressure: "8–16 Bar", material: "MS / SS", diameter: "1200 mm", height: "3200 mm", weight: "950 kg", connection: '2.5"' },
  { volume: "5 m³", pressure: "8–16 Bar", material: "MS / SS", diameter: "1400 mm", height: "3650 mm", weight: "1450 kg", connection: '3"' },
  { volume: "10 m³", pressure: "8–12 Bar", material: "MS / SS", diameter: "1600 mm", height: "4900 mm", weight: "2650 kg", connection: '4"' },
];

/* ------------------------------------------------------------------ */
/*  Downloads                                                          */
/* ------------------------------------------------------------------ */

export const downloads: { title: string; meta: string; icon: string; href: string }[] = [
  { title: "Product Brochure", meta: "PDF · 2.4 MB", icon: "FileText", href: "#" },
  { title: "Technical Datasheet", meta: "PDF · 1.1 MB", icon: "FileBadge", href: "#" },
  { title: "GA Drawing", meta: "PDF · 3.8 MB", icon: "Ruler", href: "#" },
  { title: "Installation Manual", meta: "PDF · 1.6 MB", icon: "BookOpen", href: "#" },
];

/* ------------------------------------------------------------------ */
/*  Trust                                                              */
/* ------------------------------------------------------------------ */

export const trust: { title: string; body: string; icon: string }[] = [
  { title: "Quality Certifications", body: "ASME U-Stamp, ISO 9001:2015, PED (CE) and IBR approved fabrication.", icon: "BadgeCheck" },
  { title: "Manufacturing Capability", body: "Shells up to 4.5 m diameter, single-piece weights up to 42 MT in-house.", icon: "Factory" },
  { title: "Industry Experience", body: "Building air receivers and pressure vessels since 1995 for global plants.", icon: "Award" },
  { title: "After-Sales Support", body: "Erection supervision, hydro/loop checks and commissioning support on site.", icon: "Headset" },
];

export const certifications = ["ASME Section VIII Div 1", "ASME U-Stamp", "ISO 9001:2015", "PED (CE marked)", "IBR"];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What is an Air Receiver?",
    answer:
      "An air receiver is a pressure vessel that stores compressed air from a compressor. It provides buffer storage that stabilises line pressure, reduces compressor cycling, separates moisture and improves the overall efficiency of a compressed-air system.",
  },
  {
    question: "How do I select Air Receiver volume?",
    answer:
      "A common rule of thumb is 6–10 litres of receiver volume per CFM of compressor capacity (roughly 1 m³ per 100–150 CFM). For fluctuating or high-peak demand, size up. Tell us your compressor CFM and duty cycle in the quote form and our engineers will confirm the optimum size.",
  },
  {
    question: "Which material should I choose?",
    answer:
      "MS (mild steel) suits general shop and instrument air and is the most economical. SS304 is preferred for food, beverage and clean-air duty. SS316 is used for pharmaceutical and corrosive or coastal environments. We also build in CS, titanium, Hastelloy and Sanicro 28 on request.",
  },
  {
    question: "What pressure rating is suitable?",
    answer:
      "The receiver design pressure should be at least equal to the compressor's maximum discharge pressure plus a margin. Most shop-air systems run 8–12 bar; high-pressure applications go up to 20 bar and beyond. We design and stamp to your specified working pressure.",
  },
  {
    question: "Can I order custom dimensions?",
    answer:
      "Yes. Beyond the standard sizes we manufacture fully custom receivers — your exact volume, diameter, height, nozzle schedule, mounting and certification. Use the 'Customise Your Air Receiver' section to send us your requirement.",
  },
  {
    question: "Do you provide certification?",
    answer:
      "Every vessel ships with a full QA dossier — material test certificates, weld maps, radiography reports, hydro-test records and the code data report (ASME U-Stamp / PED / IBR as applicable). Third-party inspection by Lloyd's, BV, TUV, DNV or SGS is supported.",
  },
];

/* ------------------------------------------------------------------ */
/*  Custom builder dropdowns (reuse the same option lists)            */
/* ------------------------------------------------------------------ */

export const customDropdownKeys: ConfigKey[] = [
  "material",
  "support",
  "color",
  "coating",
  "valve",
  "gauge",
];
