export const heroQuote = {
  text: "Great manufacturing isn't just about precision — it's about vision, commitment and the relentless pursuit of excellence.",
  author: "Michael R. Bennett",
  role: "Founder & CEO",
};

export const whyRdtherm = {
  eyebrow: "Why R&D Therm",
  heading: "We solve the problems that delay your projects",
  description:
    "From design bottlenecks to delivery delays — we understand the real challenges process engineers face. Our solutions are built around eliminating them.",
  cta: { label: "Our Capabilities", href: "/manufacturing" },
  features: [
    {
      title: "On-Time Delivery, Every Time",
      body: "Your project schedule is our commitment. We plan, track and deliver — no surprises.",
    },
    {
      title: "First Time Right Fabrication",
      body: "QC at every stage means equipment that passes inspection the first time, every time.",
    },
    {
      title: "Design Optimization",
      body: "We don't just fabricate — we refine. Our engineers identify improvements before production begins.",
    },
    {
      title: "Global Code Compliance",
      body: "ASME, PED, IBR, IS — we fabricate to the codes your markets demand, anywhere in the world.",
    },
    {
      title: "Single-Source Accountability",
      body: "One partner for design, engineering, fabrication and delivery. No finger-pointing, just results.",
    },
    {
      title: "Transparent Communication",
      body: "Real-time updates, clear documentation and a single point of contact throughout your project.",
    },
  ],
};

// Home page Product highlights — slugs match `productList` in /data/products.ts
// so the home grid pulls images and links straight from the catalogue.
export const products = {
  eyebrow: "Our Products",
  heading: ["From ", "Pressure Vessels to Process Skids", " — We Build It All."],
  cta: { label: "Explore all products", href: "/products" },
  items: [
    { label: "Pressure Vessel", slug: "pressure-vessel" },
    { label: "Shell & Tube Heat Exchanger", slug: "shell-and-tube-heat-exchanger" },
    { label: "Reactors", slug: "reactors" },
    { label: "Distillation Columns", slug: "distillation-columns" },
    { label: "Deaerator", slug: "deaerator" },
    { label: "Air Receiver", slug: "air-receiver" },
    { label: "Storage Tank", slug: "tank" },
    { label: "Stack & Storage Tanks", slug: "stack" },
  ],
};

export const industries = {
  eyebrow: "Industries We Serve",
  heading: ["Engineering and Fabrication ", "Solutions", " for Process Industry"],
  items: [
    {
      key: "chemical",
      label: "Chemical and Petrochemical",
      description:
        "From reactors to distillation columns — fabricated in CS, SS and exotic alloys for the harshest chemical service.",
      cover: "chemical",
    },
    {
      key: "pharma",
      label: "Pharmaceutical & Biotechnology",
      description:
        "GMP-ready stainless steel equipment, electropolished finishes, full material traceability and ASME BPE compliance.",
      cover: "pharma",
    },
    {
      key: "oil-gas",
      label: "Oil & Gas",
      description:
        "Pressure vessels, separators and process equipment for upstream and downstream oil & gas — built for harsh environments and stringent safety standards.",
      cover: "oilgas",
    },
    {
      key: "food",
      label: "Food & Beverage Processing",
      description:
        "Sanitary-grade tanks, mixers and heat exchangers engineered for hygienic processing and easy CIP/SIP cleaning.",
      cover: "food",
    },
    {
      key: "power",
      label: "Power & Utilities",
      description:
        "Deaerators, heat exchangers, flash drums and IBR-compliant pressure parts for thermal and renewable power plants.",
      cover: "power",
    },
  ],
};

// Decorative floating images placed at the corners of the Industries section.
// Sized + positioned conservatively so they never overflow the viewport
// or peek out from behind the content card.
export const industryDecor = [
  { id: "top-left", className: "hidden lg:block absolute left-6 lg:left-10 top-10 lg:top-16 w-24 h-16 lg:w-28 lg:h-20 rounded-[10px]", tone: "assembly" },
  { id: "top-right", className: "hidden lg:block absolute right-6 lg:right-10 top-10 lg:top-16 w-24 h-16 lg:w-28 lg:h-20 rounded-[10px]", tone: "engine" },
  { id: "bottom-left", className: "hidden lg:block absolute left-6 lg:left-10 bottom-10 lg:bottom-14 w-24 h-16 lg:w-28 lg:h-20 rounded-[10px]", tone: "discs" },
  { id: "bottom-right", className: "hidden lg:block absolute right-6 lg:right-10 bottom-10 lg:bottom-6 w-24 h-16 lg:w-28 lg:h-20 rounded-[10px]", tone: "turbine" },
];

export const trustedLogos = [
  { name: "KOBE", glyph: "市" },
  { name: "On_Event", glyph: "✦" },
  { name: "oslo.", glyph: "" },
  { name: "U-Turn", glyph: "↻" },
  { name: "Swiss", glyph: "✚" },
  { name: "alaska", glyph: "" },
  { name: "Berlin.", glyph: "🗼" },
  { name: "Cairo", glyph: "" },
  { name: "Nordic", glyph: "❄" },
  { name: "Tokyo", glyph: "東" },
  { name: "Helsinki", glyph: "" },
  { name: "Vienna", glyph: "" },
];

export const blogPosts = [
  {
    title: "Breakthroughs powering manufacturing efficiency",
    excerpt:
      "How modern automation, lean process design and digital twin technology are reshaping fabrication shop floors.",
    href: "/blog/breakthroughs-powering-manufacturing-efficiency",
    cover: "engine",
  },
  {
    title: "How automation is shaping the future of manufacturing",
    excerpt:
      "Exploring the rise of robotic welding cells, AI-driven QC and connected machines across the process equipment industry.",
    href: "/blog/automation-future-of-manufacturing",
    cover: "robot",
  },
  {
    title: "Top 5 materials revolutionizing industrial components",
    excerpt:
      "From duplex stainless steels to titanium and Hastelloy — a survey of the alloys redefining process equipment.",
    href: "/blog/top-5-materials-revolutionizing-industrial-components",
    cover: "chain",
  },
];

export const testimonials = [
  {
    id: "emily",
    avatar: "E",
    avatarTone: "from-[#f5b894] to-[#c97d4e]",
    rating: 5,
    body:
      "The team's dedication and innovative approach transformed our ideas into reality. Every stage of the project was handled with care and expertise.",
    author: "Emily Carter",
    role: "Product Designer",
  },
  {
    id: "marcus",
    avatar: "M",
    avatarTone: "from-[#b8c4d6] to-[#5d6b85]",
    rating: 5,
    body:
      "From design review to commissioning, R&D Therm felt like an extension of our own engineering team. Documentation and traceability were spotless.",
    author: "Marcus Hale",
    role: "Process Engineering Lead",
  },
  {
    id: "amara",
    avatar: "A",
    avatarTone: "from-[#dabc8a] to-[#7e5a36]",
    rating: 5,
    body:
      "We needed an ASME U-stamped reactor delivered in 14 weeks. R&D Therm not only met the deadline — they shipped two weeks early.",
    author: "Amara Okafor",
    role: "Director, Plant Engineering",
  },
  {
    id: "sofia",
    avatar: "S",
    avatarTone: "from-[#e4c4d9] to-[#8c5070]",
    rating: 5,
    body:
      "I was impressed by their professionalism and attention to detail. Communication was clear, and the final product exceeded our expectations.",
    author: "Sofia Ramirez",
    role: "Marketing Lead at BrightWave Tech",
  },
  {
    id: "kenji",
    avatar: "K",
    avatarTone: "from-[#a3b7a0] to-[#4d6447]",
    rating: 5,
    body:
      "Their welding qualification depth gave us confidence to award the Hastelloy job. Zero NDT rejections across the entire batch.",
    author: "Kenji Watanabe",
    role: "Senior Mechanical Engineer",
  },
  {
    id: "priya",
    avatar: "P",
    avatarTone: "from-[#f1c4a2] to-[#a86838]",
    rating: 5,
    body:
      "The team delivered our distillation column with full third-party inspection paperwork on day one. Set-up at site took half the time it normally does.",
    author: "Priya Iyer",
    role: "Project Manager — EPC",
  },
];

export const heroStats = {
  delivery: { value: "98%", label: "On-Time delivery rate" },
  professionals: { value: "50+", label: "Skilled professionals" },
};

export const supportCard = {
  title: "Need help choosing the right product?",
  body: "Always ready with guidance, product details, and after-sales support.",
  cta: { label: "Contact Support", href: "/contact" },
};
