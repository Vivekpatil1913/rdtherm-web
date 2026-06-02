// Product catalogue.
// Schema is designed to be backend-friendly — every product is a record with the
// same shape, optional fields gracefully render or hide on the detail page,
// and `content` is reserved for HTML produced by a rich-text editor (Tiptap /
// Lexical / TinyMCE) when the admin panel is added.

export type ProductImage = {
  url: string;
  alt: string;
  label?: string;
  caption?: string;
};

export type ProductType = {
  name: string;
  description: string;
};

export type ProductFeature = {
  label: string;
  value: string;
};

export type ProductFAQ = {
  question: string;
  answer: string;
};

export type Product = {
  slug: string;
  title: string;
  summary: string;
  // Used by the product list / cards. Keep short — 3 bullets max.
  specs: string[];
  // Detail page sections (all optional — render if present).
  intro?: string[];
  whatIs?: { title?: string; body: string };
  types?: ProductType[];
  features?: ProductFeature[];
  applications?: string[];
  materials?: string[];
  maxCapacity?: ProductFeature[];
  benefits?: string[];
  compliance?: string[];
  images?: ProductImage[];
  faqs?: ProductFAQ[];
  // Rich HTML body produced by a future text-editor (admin CMS).
  content?: string;
};

export const productsHero = {
  eyebrow: "Our Products",
  heading: ["Process equipment, engineered for ", "real-world plants."],
  description:
    "Pressure vessels, reactors, columns, heat exchangers and complete process skids — every one designed, fabricated and tested in-house under a single quality system.",
};

// Shared FAQ list — rendered on every product detail page.
// Future admin panel will manage this single list (add / edit / reorder Q&A).
export const productFaqs: ProductFAQ[] = [
  {
    question: "What sizes can R&D Therm fabricate?",
    answer:
      "We can fabricate equipment up to 4.5 m in shell diameter, 33 m in overall length and 42 MT single-piece weight. In 2024 we dispatched a 48.5 MT distillation column measuring 4.5 m × 23 m.",
  },
  {
    question: "Which codes and certifications do you build to?",
    answer:
      "We are ASME U-Stamp certified for pressure vessels (Section VIII Div 1 & 2), IBR-approved for boilers and steam pressure parts, and routinely build to PED (CE marked) for European exports. Tanks follow API 650 / IS 2062 as applicable.",
  },
  {
    question: "Do you handle exotic-alloy fabrication?",
    answer:
      "Yes — titanium, Hastelloy C-22 / C-276, duplex and super-duplex stainless steels, Sanicro 28 and 904L are routine work for our welding division. We have qualified welders and procedures for each material.",
  },
  {
    question: "What is your typical delivery timeline?",
    answer:
      "Standard pressure vessels and heat exchangers typically ship in 12 – 16 weeks. Larger columns, reactors and complete process skids ship in 16 – 22 weeks depending on scope and material. Every quote includes a milestone-based delivery schedule.",
  },
  {
    question: "Do you provide third-party inspection support?",
    answer:
      "Yes — we work routinely with Lloyd's Register, BV, TUV, DNV, SGS and customer-nominated inspection agencies. Hold points, witness inspections and full documentation packs are part of every job.",
  },
  {
    question: "Do you supply equipment with standard accessories and instrumentation?",
    answer:
      "Yes — pressure gauges, safety valves, drain valves, manholes, ladders, platforms and instrumentation nozzles are supplied as standard. Auto-drains, PLC / DCS-ready packages and platforms are available as options.",
  },
  {
    question: "Can you offer site erection and commissioning support?",
    answer:
      "We routinely send engineers to site for erection supervision, hydro / loop checking and commissioning support. Full piping and erection is also part of our scope on turnkey skid jobs.",
  },
];

// Shared placeholder gallery — re-used across products until real images are
// uploaded via the admin panel. Each entry has a label so the hover overlay
// behaviour can be tested today.
const INDUSTRIAL_GALLERY: ProductImage[] = [
  {
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80&auto=format&fit=crop",
    alt: "Industrial pipework",
    label: "Inside our fabrication bay",
  },
  {
    url: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80&auto=format&fit=crop",
    alt: "Manufacturing floor",
    label: "Shop-floor inspection",
  },
  {
    url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80&auto=format&fit=crop",
    alt: "Welding operation",
    label: "Certified welder at work",
  },
  {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
    alt: "Industrial detail",
    label: "Code-compliant joinery",
  },
  {
    url: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&q=80&auto=format&fit=crop",
    alt: "Heavy fabrication",
    label: "Heavy-section assembly",
  },
  {
    url: "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=1600&q=80&auto=format&fit=crop",
    alt: "Process plant",
    label: "Site installation",
  },
];

export const productList: Product[] = [
  {
    slug: "distillation-columns",
    title: "Distillation Columns",
    summary:
      "High-efficiency fractional distillation and separation of liquid mixtures based on differences in volatility — built to ASME Sec VIII with our U-Stamp.",
    specs: [
      "Shell diameter up to 4,500 mm",
      "Overall length up to 33,000 mm",
      "Up to 42 MT in single piece",
    ],
    intro: [
      "R&D Therm is a leading global manufacturer and supplier of distillation columns in India, engineered to deliver high-efficiency fractional distillation and separation of liquid mixtures based on differences in volatilities.",
      "Certified with the ASME U-Stamp and built to meet international quality standards, our columns are designed for superior performance in both batch and continuous distillation systems — from vacuum columns to modular distillation units.",
    ],
    whatIs: {
      title: "What is a Distillation Column?",
      body: "A distillation column is a critical piece of equipment used in the distillation process to separate liquid mixtures into their individual components. By leveraging differences in the volatilities of the mixture's constituents, distillation columns enable precise fractionation — making them indispensable across petroleum refineries, chemical processing plants, bioethanol production and pharmaceutical manufacturing.",
    },
    types: [
      {
        name: "Batch Columns",
        description:
          "Ideal for batch-wise separation, offering flexibility for smaller-scale or specialised processes.",
      },
      {
        name: "Continuous Columns",
        description:
          "Designed for large-scale, uninterrupted operations, ensuring high throughput and efficiency.",
      },
      {
        name: "Packed Columns",
        description:
          "Utilise packing materials to enhance separation efficiency, perfect for applications requiring high precision.",
      },
    ],
    maxCapacity: [
      { label: "Shell Diameter", value: "4,500 mm" },
      { label: "Shell Thickness", value: "28 mm" },
      { label: "Overall Length", value: "33,000 mm" },
      { label: "Max Weight", value: "42 MT" },
    ],
    applications: [
      "Chemical processing",
      "Food & beverage",
      "Biofuels production",
      "Solvent recovery systems",
      "Environmental & waste treatment",
      "Essential oils & fragrances",
      "Agrochemical industry",
      "Pulp & paper",
      "LNG & gas processing",
      "Plastic & polymer industry",
      "Pharmaceutical intermediates",
      "Dye & pigment manufacturing",
    ],
    benefits: [
      "High separation efficiency across feed compositions",
      "Robust construction for continuous duty",
      "Customisable trays, packing and internals",
      "Full compliance with ASME Section VIII",
    ],
    materials: [
      "Stainless Steel",
      "Carbon Steel",
      "Titanium",
      "Hastelloy",
      "Sanicro 28",
    ],
    compliance: ["ASME Section VIII", "ASME U-Stamp", "PED"],
    content: `
      <p>Distillation is the most common unit operation in chemical and refining plants, and the column itself is where the entire economics of a process line live or die. A poorly engineered column costs money on day one — and every day after that, in lost yield, extra steam and unscheduled shutdowns.</p>

      <h2>How we design a column</h2>
      <p>Every distillation column we build starts with a process datasheet from the licensor or the client's process team. From there our engineers run hydraulic and mass-transfer calculations in <strong>PV-Elite</strong> and <strong>Aspen</strong>, validate the mechanical design against ASME Section VIII Div 1, and produce shop drawings the floor can build directly.</p>
      <p>We model every internal — trays, downcomers, packing supports, distributors — so the customer sees exactly what they're buying before a single plate is rolled.</p>

      <h2>Trays vs packed columns</h2>
      <p>Both have their place. Trayed columns give you flexibility on turndown and are easier to clean. Packed columns give lower pressure drop and better separation when you have heat-sensitive products. We build both, and we will tell you honestly which one fits your service — including the cases where a hybrid is the right answer.</p>

      <h3>Materials we run regularly</h3>
      <ul>
        <li>Stainless steel grades 304L, 316L, 321 and 904L</li>
        <li>Duplex and super-duplex (2205, 2507) for chloride service</li>
        <li>Titanium Gr 2 / Gr 7 for highly corrosive feeds</li>
        <li>Hastelloy C276 and C22 for acid duties</li>
        <li>Carbon steel with internal cladding for cost-sensitive jobs</li>
      </ul>

      <h2>Why customers come back</h2>
      <p>Our repeat business comes from one thing: the column shows up on time, with a complete code dossier, and starts up first time. We have shipped distillation columns up to <strong>4.5 m in diameter and 33 m long</strong> — in a single piece, fully internally fitted, with hydrotest and radiography reports signed off by a third-party inspector before the truck leaves the shop.</p>

      <blockquote>"R&amp;D Therm delivered our 32 m vacuum column three weeks early and the commissioning team had zero punch-list items. That does not happen often." — Plant Manager, specialty chemicals EPC.</blockquote>

      <h2>What you receive on despatch</h2>
      <p>Every column ships with the full QA dossier — mill test certificates, weld maps, radiography films, hydro reports, dimensional inspection records, and the U-Stamp data report. Everything traceable, every weld accounted for.</p>
    `,
    images: INDUSTRIAL_GALLERY,
  },

  {
    slug: "shell-and-tube-heat-exchanger",
    title: "Shell and Tube Heat Exchangers",
    summary:
      "Fixed tube-sheet, U-tube and floating-head exchangers for oil refineries, chemical plants and high-pressure industrial processes.",
    specs: [
      "All TEMA classes (B, C, R)",
      "Up to 5,000 m² surface area",
      "ASME U-Stamp & IBR certified",
    ],
    intro: [
      "At R&D Therm we specialise in designing and manufacturing shell and tube heat exchangers — the most widely-used heat exchanger type in oil refineries, chemical plants and other high-pressure industrial processes.",
      "Our exchangers are built in compliance with ASME Section VIII standards and carry the ASME U-Stamp for pressure vessels. We are also IBR certified for steam-side service.",
    ],
    types: [
      {
        name: "Fixed Tube Sheet",
        description:
          "Tubes are securely fixed to the shell, offering a cost-effective solution. Ideal for applications where cleaning is less frequent.",
      },
      {
        name: "U-Tube Design",
        description:
          "Tubes are bent into a U-shape, accommodating thermal expansion and making it suitable for high-temperature applications.",
      },
      {
        name: "Floating Head",
        description:
          "Features a removable tube bundle for easy cleaning and maintenance, perfect for processes requiring frequent upkeep.",
      },
    ],
    benefits: [
      "Efficient heat transfer for continuous industrial operation",
      "Simple, cost-effective design with field-proven reliability",
      "Custom-engineered tube layouts, baffles and materials",
      "ASME-certified construction for global compliance",
    ],
    applications: [
      "Oil refineries",
      "Chemical processing",
      "Power generation",
      "Petrochemicals",
      "HVAC systems",
      "Pharmaceutical industry",
      "Food & beverage processing",
      "Marine & offshore",
      "Pulp & paper industry",
      "Renewable energy",
      "Metallurgical industry",
    ],
    materials: [
      "Stainless Steel",
      "Carbon Steel",
      "Titanium",
      "Hastelloy",
      "Sanicro 28",
    ],
    compliance: ["ASME Section VIII", "ASME U-Stamp", "IBR", "TEMA"],
    images: INDUSTRIAL_GALLERY,
  },

  {
    slug: "pressure-vessel",
    title: "Pressure Vessels",
    summary:
      "Code-compliant coded and non-coded pressure vessels in CS, SS, duplex and exotic alloys — designed to ASME Sec VIII Div 1 & 2, PED and IBR.",
    specs: [
      "Up to 80 mm thick",
      "Volumes up to 100 m³",
      "Design pressure up to 100 bar",
    ],
    intro: [
      "R&D Therm is a leading manufacturer of high-quality coded and non-coded pressure vessels, proudly carrying the ASME U-Stamp.",
      "Our pressure vessels are engineered to store and transport liquids, vapours and gases under pressures significantly different from ambient conditions — built for safety, durability and long service life across demanding operating conditions.",
    ],
    whatIs: {
      title: "What is a Pressure Vessel?",
      body: "A pressure vessel is a closed container designed to hold gases or liquids at a pressure substantially different from the ambient pressure. R&D Therm vessels are engineered with optimised plate thickness based on internal pressure, service conditions and applicable code requirements — and inspected at every stage from material acceptance to hydro-test.",
    },
    features: [
      { label: "Design Pressure", value: "Up to 100 bar" },
      { label: "Volume", value: "Up to 100 m³" },
      { label: "Shell Thickness", value: "Up to 80 mm" },
      { label: "Temperature Range", value: "Cryogenic to high-temperature" },
    ],
    applications: [
      "Oil & gas storage and processing",
      "Chemical processing plants",
      "Pharmaceutical industry",
      "Food & beverage",
      "Petrochemicals",
      "Power generation",
      "Specialty chemicals",
      "Cryogenic applications",
    ],
    benefits: [
      "Full code compliance — ASME, PED and IBR",
      "Material traceability with full MTC documentation",
      "Single-source design, fabrication and testing",
      "Third-party inspection support",
    ],
    materials: [
      "SA 516 Gr 70 (Carbon Steel)",
      "SS 304 / 316 / 316L",
      "Duplex 2205 / Super Duplex",
      "Hastelloy C-22 / C-276",
      "Titanium",
      "Sanicro 28",
    ],
    compliance: [
      "ASME Section VIII Div 1 & 2",
      "ASME U-Stamp",
      "PED (CE marked)",
      "IBR",
    ],
    images: INDUSTRIAL_GALLERY,
  },

  {
    slug: "air-receiver",
    title: "Air Receivers",
    summary:
      "Robust high-pressure air storage tanks designed to absorb compressor pulsations, stabilise supply and improve energy efficiency.",
    specs: [
      "Pressure range 6 – 75 Kgf/cm²",
      "Volumes 0.25 – 90 m³",
      "ASME U-Stamp certified",
    ],
    intro: [
      "An air receiver is a critical component in any compressed-air system, designed to store high-pressure air from compressors and minimise pressure fluctuations caused by compressor switching and varying loads.",
      "R&D Therm air receivers enhance compressor efficiency, reduce power consumption and ensure stable air supply — manufactured since 1995 in strict compliance with ASME Section VIII Div 1 and U-Stamp certified inspection processes.",
    ],
    features: [
      { label: "Pressure Range", value: "6 to 75 Kgf/cm²" },
      { label: "Volume Capacity", value: "0.25 to 90 m³" },
      {
        label: "In-Stock Sizes",
        value: "0.5, 1, 2, 3, 4, 5 m³",
      },
      { label: "Materials", value: "SS, CS, Titanium, Hastelloy, Sanicro 28" },
    ],
    applications: [
      "Manufacturing plants",
      "Automotive industry",
      "Food & beverage processing",
      "Pharmaceutical industry",
      "Power generation",
      "Petrochemical & chemical plants",
      "HVAC systems",
      "Construction & mining",
      "Textile industry",
      "Electronics manufacturing",
    ],
    benefits: [
      "Smooths out compressor pressure pulsations",
      "Reduces compressor cycling and power consumption",
      "Buffer storage for instrument & utility air",
      "Custom nozzle, mounting and instrumentation options",
    ],
    materials: ["SS 304", "SS 316", "SA 516 Gr B", "MS"],
    compliance: ["ASME Section VIII Div 1", "ASME U-Stamp"],
    images: INDUSTRIAL_GALLERY,
  },

  {
    slug: "stack",
    title: "Stack & Storage Tanks",
    summary:
      "Industrial vessels engineered for safe short and long-term storage of liquids, chemicals, water and process media at near-atmospheric pressure.",
    specs: [
      "Diameter up to 3,500 mm",
      "Length up to 4,500 mm",
      "Up to 30 MT, thickness 6 – 18 mm",
    ],
    intro: [
      "Stack Storage Tanks are essential industrial vessels engineered to safely store a wide range of liquids, chemicals, water and industrial mediums for both short-term and long-term use.",
      "These tanks operate under minimal atmospheric pressure and serve industries requiring bulk liquid storage. Available in stainless steel, carbon steel and FRP with corrosion resistance and full safety-standard compliance.",
    ],
    types: [
      {
        name: "Low Temperature Storage Tank",
        description:
          "Engineered for storing liquids at low temperatures with superior insulation.",
      },
      {
        name: "Limpet Tanks",
        description:
          "Feature external heating or cooling coils for precise temperature regulation.",
      },
      {
        name: "Underground Storage Tank",
        description:
          "Designed for safe, secure subsurface liquid storage.",
      },
      {
        name: "Chemical Storage Tank",
        description:
          "Built to handle corrosive chemicals using durable materials.",
      },
      {
        name: "Dome Roof Storage Tank",
        description:
          "Ideal for large-scale storage with enhanced structural integrity.",
      },
    ],
    maxCapacity: [
      { label: "Diameter", value: "Up to 3,500 mm" },
      { label: "Thickness", value: "6 – 18 mm" },
      { label: "Length", value: "Up to 4,500 mm" },
      { label: "Maximum Weight", value: "Up to 30 MT" },
    ],
    applications: [
      "Chemical industry",
      "Oil & gas",
      "Food & beverage processing",
      "Pharmaceuticals",
      "Water & wastewater treatment",
      "Agriculture & fertilisers",
      "Power generation",
      "Cryogenic applications",
      "Petrochemicals",
      "Industrial manufacturing",
    ],
    materials: [
      "Stainless Steel",
      "Carbon Steel",
      "Titanium",
      "Hastelloy C-22",
      "Hastelloy C-276",
      "Sanicro 28",
    ],
    compliance: ["ASME Section VIII", "API 650 (where applicable)"],
    images: INDUSTRIAL_GALLERY,
  },

  {
    slug: "deaerator",
    title: "Deaerator",
    summary:
      "Spray-type and tray-type deaerators that remove dissolved O₂ and CO₂ from boiler feedwater — protecting boilers from corrosion.",
    specs: [
      "Capacity 0.5 – 100 m³",
      "Pressure up to 22 kg/cm²(g)",
      "ASME Sec VIII Div 1 + IBR 1950",
    ],
    intro: [
      "A deaerator is a vital vessel engineered to remove dissolved gases — including oxygen and carbon dioxide — from boiler feedwater.",
      "The system prevents corrosion, optimises heat transfer efficiency and ensures durability of steam boiler operations. R&D Therm provides spray-type and tray-type solutions custom-designed for power plants, chemical processing, food processing and high-pressure steam applications.",
    ],
    features: [
      { label: "Capacity Range", value: "0.5 m³ to 100 m³" },
      { label: "Maximum Pressure", value: "Up to 22 kg/cm²(g)" },
      { label: "Type", value: "Spray-type and tray-type" },
      {
        label: "Materials",
        value: "SS, CS, Titanium, Hastelloy, Sanicro 28",
      },
    ],
    applications: [
      "Power plants",
      "Chemical processing",
      "Oil & gas refineries",
      "Pharmaceutical manufacturing",
      "Food & beverage",
      "Pulp & paper",
      "Textiles",
      "District heating systems",
      "General manufacturing facilities",
    ],
    benefits: [
      "Corrosion prevention via dissolved-gas reduction",
      "Enhanced boiler efficiency",
      "Customisable storage volume and trim heaters",
      "High-quality, certified construction",
    ],
    materials: [
      "Stainless Steel",
      "Carbon Steel",
      "Titanium",
      "Hastelloy",
      "Sanicro 28",
    ],
    compliance: ["ASME Section VIII Div 1", "IBR 1950"],
    images: INDUSTRIAL_GALLERY,
  },

  {
    slug: "tank",
    title: "Storage Tanks",
    summary:
      "Atmospheric, vertical and horizontal storage tanks designed to API 650, IS 2062 and ASME — for water, oils, chemicals and process media.",
    specs: [
      "API 650 / IS 2062 / ASME",
      "Fixed, floating & cone roofs",
      "Above-ground & underground",
    ],
    intro: [
      "R&D Therm designs and fabricates storage tanks meeting international standards for safety, durability and long service life across demanding operating conditions.",
      "Our tanks are engineered to store liquids, vapours and gases — with shell, bottom and roof design optimised for the service, environmental loads and inspection access required.",
    ],
    types: [
      {
        name: "Atmospheric Storage Tank",
        description:
          "Designed for storage of liquids at near-atmospheric pressure — water, chemicals, oils and solvents. Built to API 650, IS 2062 and ASME as applicable.",
      },
      {
        name: "Vertical Storage Tanks",
        description:
          "Preferred for large-capacity storage with minimum footprint. Available as fixed roof, floating roof or cone roof.",
      },
      {
        name: "Horizontal Storage Tanks",
        description:
          "Ideal for limited space and skid-mounted applications. Available above-ground or underground with easy installation and transportation.",
      },
    ],
    features: [
      {
        label: "Shell & Bottom",
        value: "Optimised thickness based on hydrostatic head and service.",
      },
      {
        label: "Roof Design",
        value: "Fixed cone, dome or floating roof — selected per service.",
      },
      {
        label: "Nozzles & Manholes",
        value: "Inlet, outlet, drain, overflow, vent and instrumentation.",
      },
      {
        label: "Relief",
        value: "Pressure-vacuum relief valves where applicable.",
      },
    ],
    applications: [
      "Oil & gas",
      "Chemical industry",
      "Petrochemical",
      "Pharmaceutical",
      "Food & beverage",
      "Power generation",
      "Water & wastewater treatment",
      "Fertiliser industry",
      "Paints & coatings",
      "Mining & metallurgy",
    ],
    materials: ["Carbon Steel", "Stainless Steel", "Aluminium", "FRP-lined"],
    compliance: ["API 650", "IS 2062", "ASME Section VIII (where applicable)"],
    images: INDUSTRIAL_GALLERY,
  },

  {
    slug: "reactors",
    title: "Reactors",
    summary:
      "Agitated reactors for chemical, pharmaceutical and specialty processes — built in SS, exotic alloys and high-performance materials.",
    specs: [
      "Volume up to 50 m³",
      "Pressure up to 22 kg/cm²(g)",
      "SS, Hastelloy & alloy options",
    ],
    intro: [
      "Agitated reactors are critical equipment in many industrial processes, designed to efficiently mix, heat or cool materials under controlled conditions.",
      "R&D Therm manufactures custom reactors built to the highest standards of performance, safety and durability — in sizes and materials including stainless steel and high-performance alloys such as Hastelloy C-276, C-22 and 904L.",
    ],
    features: [
      { label: "Volume", value: "Up to 50 m³" },
      { label: "Pressure Rating", value: "Up to 22 kg/cm²(g)" },
      { label: "Temperature Range", value: "Cryogenic to high-temperature" },
      {
        label: "Agitation",
        value: "Anchor, turbine, propeller, hydrofoil per process",
      },
    ],
    applications: [
      "Solids dissolution",
      "Product mixing",
      "Chemical reactions",
      "Batch distillation",
      "Crystallisation",
      "Liquid-liquid extraction",
      "Polymerisation",
      "Pharmaceutical production",
      "Food / beverage processes",
      "Specialty chemicals",
    ],
    materials: [
      "SS 304 / 316 / 316L / 904L",
      "Hastelloy C-22 / C-276",
      "Titanium",
      "Sanicro 28",
      "Carbon Steel",
    ],
    benefits: [
      "Uniform mixing and heat transfer by design",
      "High-pressure and high-temperature service",
      "Limpet / dimple / half-pipe jacket options",
      "Sanitary finishes for pharma applications",
    ],
    compliance: ["ASME Section VIII"],
    images: INDUSTRIAL_GALLERY,
  },
];
