export const manufacturingHero = {
  eyebrow: "Manufacturing & Capabilities",
  heading: ["Engineering, fabrication and ", "process know-how", " — under one roof."],
  description:
    "From process design and detail engineering to in-house fabrication, NDT, hydro-testing and on-site erection — every stage of equipment delivery is owned and controlled by R&D Therm.",
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

// Top-level shop floor breakdown — three dedicated bays
export const facility = [
  {
    id: "cs-shop",
    title: "Carbon Steel Workshop",
    bays: [
      { label: "Under shed", value: "50,000 sq ft" },
      { label: "Open yard", value: "35,000 sq ft" },
    ],
    cranes: ["25 T × 1", "15 T × 1", "10 T × 1", "5 T × 5", "3 T × 4"],
    body:
      "Our flagship bay handles heavy CS pressure vessels, columns, reactors and complete process skids up to 100 tonnes shipping weight.",
  },
  {
    id: "ss-shop",
    title: "Stainless Steel Workshop",
    bays: [
      { label: "Under shed", value: "25,000 sq ft" },
      { label: "Atmosphere", value: "Controlled" },
    ],
    cranes: ["10 T × 1", "5 T × 1"],
    body:
      "Dedicated SS bay with controlled atmosphere — segregated tooling, consumables and grinding stations to prevent cross-contamination.",
  },
  {
    id: "pv-shop",
    title: "Pressure Vessel Shop",
    bays: [
      { label: "Vessel range", value: "1 L – 500 L" },
      { label: "Sanitary", value: "ASME BPE" },
    ],
    cranes: ["5 T × 2"],
    body:
      "Specialist bay for small-batch and pharma pressure vessels — electropolish-ready surfaces, sanitary fittings and BPE compliance.",
  },
];

// Featured flagship machine
export const flagshipMachine = {
  badge: "Flagship Equipment",
  name: "TruLaser 3060",
  type: "CNC Fibre Laser Cutting System",
  description:
    "Our 4 kW fibre-laser cutting bay handles the day-one cut on most of our pressure parts. Tight tolerances, repeatable kerfs, and a 6-metre bed mean we can cut shell course plates, tube-sheet outlines and intricate flange profiles without a single secondary setup.",
  specs: [
    { label: "Laser power", value: "4,000 W" },
    { label: "Cutting bed", value: "2,500 × 6,000 mm" },
    { label: "Mild steel", value: "up to 25 mm" },
    { label: "Stainless steel", value: "up to 20 mm" },
    { label: "Aluminium", value: "up to 20 mm" },
    { label: "Brass / Copper", value: "up to 8 mm" },
  ],
};

// Categorised machine inventory — used by the interactive MachineShowcase
export const machineCategories = [
  {
    id: "cutting",
    label: "Cutting",
    subtitle: "Laser, plasma and oxy-gas cutting for every plate thickness.",
    machines: [
      {
        name: "TruLaser 3060",
        type: "Fibre Laser Cutter",
        specs: [
          "Power: 4,000 W",
          "Bed: 2,500 × 6,000 mm",
          "MS up to 25 mm, SS up to 20 mm",
        ],
      },
      {
        name: "CNC Profile Cutter",
        type: "Plasma + Oxy-gas",
        specs: [
          "Bed: 2,500 × 12,000 mm",
          "Thickness: up to 30 mm",
          "Dual cutting heads",
        ],
      },
      {
        name: "Sheet Shearing Machine",
        type: "Hydraulic Shear",
        specs: [
          "Capacity: 3,100 mm × 10 mm",
          "CS, SS, alloy plates",
          "Precision back-gauge",
        ],
      },
    ],
  },
  {
    id: "forming",
    label: "Forming",
    subtitle: "Bending, rolling and dished-end forming for shells and heads.",
    machines: [
      {
        name: "E-Brake 300T",
        type: "CNC Electronic Press Brake",
        specs: [
          "Capacity: 300 ton",
          "Dual-drive servo control",
          "Up to 4 m bend length",
        ],
      },
      {
        name: "Plate Bending Roller",
        type: "3-Roll Plate Roller",
        specs: [
          "Width: up to 2,500 mm",
          "Thickness: up to 45 mm",
          "Pre-pinch & full circle",
        ],
      },
      {
        name: "Dished End Forming",
        type: "Spinning & Flanging",
        specs: [
          "Diameter: up to 4,000 mm",
          "Hemispherical & torispherical",
          "Hot & cold forming",
        ],
      },
    ],
  },
  {
    id: "welding",
    label: "Welding",
    subtitle: "Manual, automatic and robotic welding qualified to ASME / PED.",
    machines: [
      {
        name: "Robotic Welding Arm",
        type: "6-Axis Industrial Robot",
        specs: [
          "Repeatable tube-to-tubesheet welds",
          "Programmable weave & oscillation",
          "GMAW / GTAW heads",
        ],
      },
      {
        name: "SAW Column & Boom",
        type: "Submerged Arc Welder",
        specs: [
          "Column 6 m × Boom 6 m",
          "Heavy shell longitudinal & circ welds",
          "Single & tandem wire",
        ],
      },
      {
        name: "Auto Seam Welder",
        type: "L-seam & C-seam",
        specs: [
          "TIG, MIG, CO₂ processes",
          "Up to 4 m seam length",
          "PLC controlled tracking",
        ],
      },
    ],
  },
  {
    id: "machining",
    label: "Machining",
    subtitle: "Drilling, turning and finishing on heavy parts and small precision components.",
    machines: [
      {
        name: "Radial Drill Machine",
        type: "German-Make Heavy Duty",
        specs: [
          "Drill capacity: up to 80 mm",
          "Vessel nozzles & tubesheet holes",
          "High positional accuracy",
        ],
      },
      {
        name: "Conventional Lathe",
        type: "Heavy Lathe",
        specs: [
          "OD capacity: up to 1,800 mm",
          "Bed length: 5 m",
          "Flange, shaft & spool machining",
        ],
      },
      {
        name: "Small Radial Drill",
        type: "Precision Drilling",
        specs: [
          "Sanitary fittings & instruments",
          "Tight-tolerance work",
          "Bench-mounted operations",
        ],
      },
    ],
  },
  {
    id: "surface",
    label: "Surface Prep",
    subtitle: "Shot blasting, painting, powder coating and metalising.",
    machines: [
      {
        name: "Shot Blasting Booth",
        type: "Enclosed Booth",
        specs: [
          "7 m × 7 m × 16 m",
          "SA 2½ surface prep",
          "Dust collection + PPE compliant",
        ],
      },
      {
        name: "Painting & Curing Line",
        type: "Conveyor System",
        specs: [
          "7 m × 7 m × 12 m booth",
          "Airless & air-spray",
          "Climate-controlled curing",
        ],
      },
      {
        name: "Metalising Cabin",
        type: "Aluminium Spray",
        specs: [
          "7 m × 7 m × 4 m",
          "Up to 300 micron coating",
          "For marine & corrosive service",
        ],
      },
      {
        name: "Powder Coating",
        type: "Electrostatic System",
        specs: [
          "Curing oven up to 200 °C",
          "Architectural & equipment-grade",
          "RAL colour matching",
        ],
      },
    ],
  },
  {
    id: "testing",
    label: "Testing",
    subtitle: "Hydro, pneumatic, NDT and dimensional inspection in-house.",
    machines: [
      {
        name: "Hydro Test Pump",
        type: "High-Pressure Hydrostatic",
        specs: [
          "Pressure: up to 500 bar",
          "Calibrated pressure gauges",
          "Witness & client inspection bay",
        ],
      },
      {
        name: "Pneumatic Test Rig",
        type: "Low-Volume Air Test",
        specs: [
          "Pressure: up to 30 bar",
          "Soap-bubble & sound test",
          "Safety-zoned bay",
        ],
      },
      {
        name: "NDT Lab",
        type: "RT · UT · PT · MT · PMI",
        specs: [
          "ASNT Level II & III inspectors",
          "Hardness, weld gauge, PMI gun",
          "Third-party witness ready",
        ],
      },
      {
        name: "Dimensional Tools",
        type: "Calibrated Measurement",
        specs: [
          "Vernier calipers up to 2,500 mm",
          "Height gauges & surface plates",
          "Bend tester (180° / 12.5 mm)",
        ],
      },
    ],
  },
];

export const qualifiedMaterials = [
  "Carbon Steel (IS 2062, SA 516 Gr 60/70)",
  "Low-Alloy Steel (SA 387 Gr 11, 22)",
  "Corten Weathering Steel (SA 242)",
  "Stainless Steel 304L / 316L",
  "Stainless Steel 904L",
  "Stainless Steel 310 / 321",
  "Duplex 2205",
  "Super-Duplex 2507",
  "Cupronickel 90/10 & 70/30",
  "Hastelloy C-276 & B-3",
  "Monel 400 & K-500",
  "Inconel 600 & 625",
  "Titanium Gr 2",
  "Clad / Lined Plates",
];

export const designSoftware = [
  { name: "HTRI", role: "Thermal design of exchangers" },
  { name: "PV Elite", role: "ASME Sec VIII Div 1 & 2 calculations" },
  { name: "SolidWorks", role: "3D modelling & detail drawings" },
  { name: "AutoCAD", role: "GA & isometric drawings" },
  { name: "NozzlePro", role: "Nozzle / pipe stress analysis" },
  { name: "STAAD Pro", role: "Structural & support analysis" },
  { name: "ANSYS", role: "FEA — vibration, thermal, fatigue" },
  { name: "Tekla Structures", role: "Steel structure detailing" },
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

export const weldingCerts = [
  "ASME Section IX — GMAW, GTAW, SMAW, SAW, FCAW",
  "PED 2014/68/EU welding qualification",
  "ASTM D 4228-05 painter qualification",
  "SA 2½ surface preparation (ISO 8501-1)",
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
