// Blog catalogue.
// Schema is designed so the admin panel only needs to expose:
//   - a single cover image upload  → `cover`
//   - a rich-text editor           → `content` (HTML)
// Everything else (slug, title, excerpt, category, date, read-time) is metadata
// the editor enters in plain inputs. Frontend renders `content` as-is.

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  /** Single cover image URL — uploaded once from the admin panel. */
  cover: string;
  /** Rich HTML from the admin text-editor. Rendered verbatim on the detail page. */
  content: string;
};

export const blogHero = {
  eyebrow: "Insights & Articles",
  heading: ["Notes from the ", "shop floor", " — and the design room."],
  description:
    "Articles, case studies and engineering deep-dives from the R&D Therm team. Practical, technical and grounded in 30 years of fabrication experience.",
};

export const blogList: Post[] = [
  {
    slug: "breakthroughs-powering-manufacturing-efficiency",
    title: "Breakthroughs powering manufacturing efficiency",
    excerpt:
      "How modern automation, lean process design and digital twin technology are reshaping fabrication shop floors.",
    category: "Manufacturing",
    date: "May 12, 2026",
    readTime: "6 min read",
    cover:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&q=80&auto=format&fit=crop",
    content: `
<p>The last decade has reshaped what it means to be efficient on a fabrication shop floor. The combination of digital tooling, lean process design, and real-time data is making it possible to deliver complex process equipment faster, with fewer defects, and with documentation our customers actually trust.</p>

<h2>Lean is finally measurable</h2>
<p>Lean manufacturing is a 50-year-old idea. What's new is that we can now <strong>measure</strong> it. Modern shop-floor systems track every weld pass, every hold-time, every NDT result and every transfer between bays — and surface the data the same day, not at month-end.</p>
<p>Two of the biggest wastes we used to live with — overproduction of welding consumables and inspection rework — are now visible in dashboards. That visibility alone changes behaviour.</p>

<h2>Digital twins for pressure equipment</h2>
<p>Digital twin software lets us simulate the heat input, residual stress and post-weld heat treatment cycle of a pressure vessel before we cut a single plate. Catastrophic surprises during hydro-test become exceedingly rare.</p>
<p>For large columns and reactors, twins also let us optimise lifting plans, transport orientation and even site erection sequences — before any of that physical work happens.</p>

<h2>What this means for our customers</h2>
<p>Better predictability. Tighter delivery dates. Documentation packs that match the equipment exactly. And fewer late-stage surprises that turn 14-week jobs into 22-week ones.</p>
`,
  },
  {
    slug: "automation-future-of-manufacturing",
    title: "How automation is shaping the future of manufacturing",
    excerpt:
      "Exploring robotic welding cells, AI-driven QC and connected machines across the process equipment industry.",
    category: "Automation",
    date: "April 28, 2026",
    readTime: "8 min read",
    cover:
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1600&q=80&auto=format&fit=crop",
    content: `
<p>Automation in process-equipment fabrication isn't about replacing welders. It's about removing the repetitive, fatigue-driven work that causes defects — and giving experienced welders more time to focus on the joints where their craft genuinely matters.</p>

<h2>Robotic welding cells</h2>
<p>We use orbital welders for tube-to-tubesheet joints in heat exchangers and longitudinal welders for shell seams. The defect rate on automated joints is roughly <strong>a fifth</strong> of what we see on equivalent hand-welds — and the data is auditable.</p>

<h2>AI-driven quality control</h2>
<p>Machine-learning models flag potential defects in radiographs faster than human inspectors. We still rely on a Level III inspector to make the final call — but the AI is excellent at saying "look here first".</p>

<h2>Connected machines</h2>
<p>Every CNC, every welder, every NDT setup is networked. That connectivity is what makes the digital twin and the dashboards actually useful — without data, both are just slideware.</p>
`,
  },
  {
    slug: "selecting-right-heat-exchanger",
    title: "Selecting the right heat exchanger for your process",
    excerpt:
      "A practical guide to TEMA classes, tube layouts and material selection — written for process engineers, not catalogue writers.",
    category: "Engineering",
    date: "April 14, 2026",
    readTime: "9 min read",
    cover:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80&auto=format&fit=crop",
    content: `
<p>Heat exchangers look simple. They're not. The difference between a 25-year exchanger and a 5-year exchanger usually comes down to choices made in the first 48 hours of the design conversation.</p>

<h2>Understanding TEMA classes</h2>
<p>TEMA classes B, C and R each carry a different inspection regime, baffle spacing and tube-bundle removability. The right choice depends on service severity, expected cleaning frequency and how often you need to access tubes.</p>

<h2>Tube layouts that matter</h2>
<p>Triangular layouts give you more heat transfer area per shell diameter, but harder mechanical cleaning. Square layouts trade some area for cleanability — which often pays off in fouling services.</p>

<h2>Materials of construction</h2>
<p>For corrosive service, we frequently recommend duplex 2205 tubes with CS shells, or full 316L for sanitary applications. Going from CS to duplex can change the lifetime of an exchanger from 5 years to 20 — at perhaps 1.5x the cost.</p>
`,
  },
  {
    slug: "asme-vs-ped-vs-ibr",
    title: "ASME vs PED vs IBR: which code does your project need?",
    excerpt:
      "Demystifying the three codes that govern most of the world's pressure equipment — and how to plan for each.",
    category: "Codes & Standards",
    date: "March 30, 2026",
    readTime: "7 min read",
    cover:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80&auto=format&fit=crop",
    content: `
<p>Most pressure equipment in the world is built to one of three codes: ASME Section VIII, the European PED, or India's IBR. If you're shipping internationally, you'll quickly meet all three. Here's a working engineer's guide to telling them apart.</p>

<h2>ASME Section VIII</h2>
<p>Predominantly North American but accepted globally. Strong documentation requirements, U-stamp authorisation tied to specific fabricator audits, and a relatively prescriptive design code.</p>

<h2>PED (Pressure Equipment Directive)</h2>
<p>EU directive — performance-based rather than prescriptive. You demonstrate compliance via a harmonised standard (usually EN 13445), then a notified body confirms via CE marking.</p>

<h2>IBR (Indian Boiler Regulations)</h2>
<p>Indian regulation specifically for boilers and steam pressure parts. Materials and welders must be IBR-approved. It's a smaller scope than ASME but mandatory in India.</p>
`,
  },
  {
    slug: "from-drawing-to-despatch",
    title: "From drawing to despatch: anatomy of a process skid",
    excerpt:
      "A walk through every stage of building a 12-tonne process skid for a multinational pharma client.",
    category: "Case Study",
    date: "March 18, 2026",
    readTime: "10 min read",
    cover:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1600&q=80&auto=format&fit=crop",
    content: `
<p>A 12-tonne process skid for a multinational pharma client looks finished in two photos. The reality between order and despatch is 18 weeks of disciplined engineering, fabrication, inspection and documentation. This is what every stage looks like.</p>

<h2>Week 1–4: Engineering</h2>
<p>We start from P&amp;IDs, customer datasheets and a kick-off meeting. By week 4, we have approved mechanical drawings, instrumentation lists and a heat &amp; material balance the client engineer can sign off on.</p>

<h2>Week 5–10: Fabrication</h2>
<p>Material arrives with full traceability. Vessel shells are rolled and welded; dished ends are formed and welded on. Piping spools are fabricated to ISO drawings. Every weld is inspected.</p>

<h2>Week 11–14: Assembly &amp; test</h2>
<p>Vessels, pumps, instruments and piping are assembled on the skid. Hydro-testing, loop testing and FAT happen in this window — with the client engineer present for witness points.</p>

<h2>Week 15–18: Documentation &amp; despatch</h2>
<p>Final data books, MTCs, NDT reports and operation manuals are compiled. The skid is preserved, packed, lifted and shipped. Two of our engineers fly to site for erection support.</p>
`,
  },
  {
    slug: "specialty-alloys-in-process-equipment",
    title: "Speciality alloys in process equipment",
    excerpt:
      "When CS or SS isn't enough — a tour of duplex, super-duplex, Hastelloy and titanium fabrication.",
    category: "Materials",
    date: "March 04, 2026",
    readTime: "8 min read",
    cover:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
    content: `
<p>For most process equipment, carbon steel or 316L stainless steel is the answer. But every fabrication shop eventually meets a service condition where neither will do — and that's where speciality alloys earn their keep.</p>

<h2>Duplex &amp; super-duplex</h2>
<p>Duplex stainless steels combine the toughness of ferrite with the corrosion resistance of austenite. They're roughly <strong>twice as strong</strong> as 316L, with excellent resistance to chloride stress-corrosion cracking — making them ideal for seawater and chloride-bearing services.</p>

<h2>Hastelloy &amp; Inconel</h2>
<p>Nickel-based alloys for highly corrosive or high-temperature service. Hastelloy C-276 is the workhorse for hot acids; Inconel 625 excels in high-temperature oxidising environments.</p>

<h2>Titanium</h2>
<p>When chloride service combines with high purity requirements — for example, in some pharma APIs or seawater desalination — titanium is often the only material that survives long-term.</p>
`,
  },
];
