export const manufacturingHero = {
  eyebrow: "Manufacturing & Capabilities",
  heading: ["Designed with Purpose. ", "Manufactured with Precision.", ""],
  description:
    "With over 32 years of experience, we bring together a skilled engineering and manufacturing team, advanced manufacturing infrastructure, and industry-recognised certifications to deliver process equipment built to your exact specification.",
};

export const strengths = [
  {
    number: "01",
    title: "In-house Design & Engineering",
    body: "Mechanical design as per ASME Sec VIII Div 1 & 2, PED, IBR. Full 3D modelling, detail drawings and as-built documentation.",
  },
  {
    number: "02",
    title: "Material Expertise",
    body: "Carbon steels, all grades of stainless steel, duplex, super-duplex, Hastelloy, Monel, Inconel, titanium and clad plates.",
  },
  {
    number: "03",
    title: "Modern Fabrication Shop",
    body: "Dedicated CS and SS bays, plasma cutting, automatic seam welders, CNC rolling and a dedicated dished-end forming line.",
  },
  {
    number: "04",
    title: "Qualified Welding Procedures",
    body: "Over 200+ qualified WPS/PQRs covering GTAW, SMAW, SAW, FCAW and orbital welding for sanitary process equipment.",
  },
  {
    number: "05",
    title: "NDT & Inspection",
    body: "In-house RT, UT, PT, MT, PMI and hardness testing — performed by ASNT Level II / Level III qualified inspectors.",
  },
  {
    number: "06",
    title: "Hydro & Pneumatic Testing",
    body: "Test bays for hydro and pneumatic testing of equipment up to high pressures, with calibrated instrumentation.",
  },
  {
    number: "07",
    title: "Surface Treatment & Finishing",
    body: "Pickling, passivation, electropolishing and shot blasting — including 0.4 µm Ra finishes for sanitary applications.",
  },
  {
    number: "08",
    title: "Project Management",
    body: "Single point of contact, integrated MS Project schedules and weekly progress dashboards for every active order.",
  },
];

export const capabilitiesStats = [
  { value: "30+", label: "Years of fabrication" },
  { value: "1.1 Lakh sq ft", label: "Total shop floor" },
  { value: "200+", label: "Qualified WPS / PQR" },
  { value: "25+", label: "Export countries" },
];

// Top-level shop floor breakdown — dedicated bays
export const facility = [
  {
    id: "cs-shop",
    title: "Carbon Steel Workshop",
    // Swap for a real shop-floor photo when available — the section falls back to
    // a branded placeholder frame if the image ever fails to load.
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1400&q=80&auto=format&fit=crop",
    bays: [
      { label: "Under shed", value: "20,000 sq ft" },
      { label: "Open yard", value: "15,000 sq ft" },
    ],
    cranes: ["10 T × 1", "3 T × 1", "2 T × 1"],
    body:
      "Our flagship bay handles heavy CS pressure vessels, columns, reactors and complete process skids up to 100 tonnes shipping weight.",
  },
  {
    id: "ss-shop",
    title: "Stainless Steel Workshop",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1400&q=80&auto=format&fit=crop",
    bays: [
      { label: "Under shed", value: "10,000 sq ft" },
      { label: "Open yard", value: "5,000 sq ft" },
    ],
    cranes: ["10 T × 1", "3 T × 1", "2 T × 1"],
    body:
      "Dedicated SS bay with controlled atmosphere — segregated tooling, consumables and grinding stations to prevent cross-contamination.",
  },
];

// Categorised machine inventory — used by the interactive MachineShowcase.
// `specs` may be empty: those categories render as title-only cards.
export const machineCategories = [
  {
    id: "cutting",
    label: "Cutting",
    machines: [
      {
        name: "CNC Plate Cutting",
        image: "/images/manufacturing/plate-cutting.webp",
        specs: [
          "Bed size: 2,500 × 12,000 mm",
          "Carbon steel up to 40 mm",
          "Stainless steel up to 32 mm",
        ],
      },
      {
        name: "Pipe Cutting",
        image: "/images/manufacturing/pipe-cutting.webp",
        specs: ["For pipe cutting up to 8 inch"],
      },
    ],
  },
  {
    id: "forming",
    label: "Forming",
    machines: [
      {
        name: "Plate Rolling",
        image: "/images/manufacturing/plate-rolling.webp",
        specs: ["Plate rolling for 2,500 mm width and 16 mm thick"],
      },
    ],
  },
  {
    id: "welding",
    label: "Welding",
    machines: [
      { name: "Manual TIG / MIG Welding", image: null, specs: [] },
      { name: "6 Axis Robotic Welding", image: "/images/manufacturing/robotic-welding.webp", specs: [] },
      { name: "Special Purpose Machine", image: "/images/manufacturing/special-purpose-welding-machine.webp", specs: [] },
      { name: "SAW Column and Boom", image: null, specs: [] },
    ],
  },
  {
    id: "machining",
    label: "Machining",
    machines: [
      { name: "Radial Drilling Machine", image: "/images/manufacturing/radial-drill-machine.webp", specs: [] },
      { name: "Conventional Lathe Machine", image: null, specs: [] },
    ],
  },
  {
    id: "surface",
    label: "Surface Prep",
    machines: [
      { name: "Shot Blasting Booth", image: null, specs: [] },
      { name: "Painting & Curing Line", image: null, specs: [] },
      { name: "Metalising Cabin", image: null, specs: [] },
      { name: "Powder Coating", image: null, specs: [] },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    machines: [
      { name: "Hydro Test Pump", image: null, specs: [] },
      { name: "Pneumatic Test Rig", image: null, specs: [] },
      { name: "NDT Lab", image: null, specs: [] },
      { name: "Dimensional Tools", image: null, specs: [] },
    ],
  },
];

export const qualifiedMaterials = [
  "Stainless Steel 304 / 304L",
  "Stainless Steel 316 / 316L",
  "Carbon Steel (SA 516 Gr. 70)",
  "MS (IS 2062)",
  "Hastelloy",
  "Titanium",
];

export const designSoftware = [
  { name: "CADEM", role: "" },
  { name: "AutoCAD", role: "" },
  { name: "ProgeCAD", role: "" },
  { name: "Solid Edge", role: "" },
  { name: "HTRI", role: "Outsourced" },
  { name: "NozzlePro", role: "Outsourced" },
  { name: "ANSYS", role: "Outsourced" },
];

export const qualityMetrics = [
  { value: "97%", label: "Customer satisfaction", body: "Based on 5-year client review surveys across India and export markets." },
  { value: "98%", label: "First-time-right quality", body: "Equipment passing third-party inspection on first attempt." },
  { value: "99%", label: "On-time delivery", body: "Across orders shipped over the last 36 months." },
  { value: "25+", label: "Export countries", body: "Equipment shipped across Asia, Europe, MENA and Africa." },
];

export const qualityMethods = [
  { title: "Kaizen", body: "Continuous improvement built into every shift and project review." },
  { title: "5S Lean", body: "Sort, Set, Shine, Standardise, Sustain — visibly applied on every bay." },
  { title: "Poka-Yoke", body: "Defect-prevention jigs and fixtures designed into the process, not bolted on later." },
  { title: "Root Cause Analysis", body: "Every non-conformance triggers a 5-Why investigation and SOP update." },
  { title: "Supplier Qualification", body: "Audited material vendors with full mill test certificate traceability." },
  { title: "Process Mapping", body: "Every job mapped from RA to dispatch with built-in inspection hold points." },
];


export const certifications = [
  "ASME U-Stamp",
  "ASME R-Stamp",
  "IBR (India)",
  "PED (EU)",
  "ISO 9001:2015",
  "ISO 14001:2015",
  "ISO 45001:2018",
  "CE Marking",
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery",
    body: "We start with your P&IDs, datasheets and process conditions to understand the real engineering problem.",
  },
  {
    step: "02",
    title: "Engineering",
    body: "Detailed mechanical design, 3D modelling, code calculations and customer drawing approval.",
  },
  {
    step: "03",
    title: "Procurement",
    body: "Material procurement with full traceability — every plate, pipe and forging linked to mill test certificates.",
  },
  {
    step: "04",
    title: "Fabrication",
    body: "Cutting, rolling, welding and assembly in our dedicated bays with stage-wise quality inspections.",
  },
  {
    step: "05",
    title: "Testing & Inspection",
    body: "NDT, hydro/pneumatic testing, surface finishing and final third-party inspection witnessing.",
  },
  {
    step: "06",
    title: "Delivery & Erection",
    body: "Packing, logistics and on-site erection / commissioning — your equipment from drawing to operation.",
  },
];

/**
 * Scanned certificates shown as a 3-up wall under the code chips.
 *
 * Drop the scans into /public/images/certifications/ and point `image` at
 * them. An entry with an empty `image` renders a labelled placeholder tile
 * instead of a broken one, so this list is safe to ship before the files
 * arrive — and safe if one ever goes missing.
 */
export const certificateDocs = [
  {
    title: "ASME U-Stamp",
    issuer: "The American Society of Mechanical Engineers",
    image: "",
    alt: "R&D Therm ASME U-Stamp certificate of authorization for pressure vessel manufacture",
  },
  {
    title: "ISO 9001:2015",
    issuer: "Quality management system",
    image: "",
    alt: "R&D Therm ISO 9001:2015 quality management system certificate",
  },
  {
    title: "IBR (India)",
    issuer: "Indian Boiler Regulations",
    image: "",
    alt: "R&D Therm IBR certificate for boiler and steam pressure part manufacture",
  },
];
