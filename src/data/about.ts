// `body` paragraphs carry **bold** markers on the phrases the approved company
// profile emphasises — company name, product range, materials, certifications.
// Rendered by <CompanyIntro />, which splits on the markers.
export const aboutIntro = {
  eyebrow: "About R&D Therm",
  heading: "Engineering and Fabrication excellence in three decades of process industry expertise.",
  body: [
    "Established in 1995, **R&D Therm India Pvt. Ltd.** is a Nashik based manufacturer expert in the **design and fabrication of industrial process equipment.** A family business at heart, R&D Therm is today powered by a strong second generation of leadership bringing fresh vision and ambition to a three decade legacy.",
    "Our core product range includes **Pressure Vessels**, **Shell & Tube Heat Exchangers**, **Distillation Columns**, and **Reactors**, along with a broader portfolio covering Deaerators, Air Receivers, Tanks, Stacks, and Piping & Erection services. We have recently extended our portfolio to include **Spinning Disc Flow Reactors and Flow Skids**, through a global collaboration with **Flowid**, a Netherlands based company. We work across a wide range of materials of construction including **SS 304, SS 316, Hastelloy, Inconel, and Carbon Steel** enabling us to address the most demanding process and corrosion requirements across industries.",
    "Our manufacturing facility spans over **60,000 sq. ft.**, equipped with modern fabrication and automation infrastructure, and staffed by a team of **more than 100 professionals** including skilled in-house welders, fitters, and quality engineers. This integrated, in-house capability gives us direct control over quality, timelines, and workmanship at every stage of production.",
    "We hold **ASME U Stamp, IBR, and ISO 9001:2015** certifications reflecting our commitment to domestic as well as global quality standards and our ability to supply equipment for the most regulated and safety-critical applications.",
    "As a proud member of the **Konark Global** group, R&D Therm combines the values of a family-built enterprise with the ambition and capability to compete on the world stage.",
  ],
};

export const visionMission = {
  vision: {
    title: "Vision",
    body:
      "R&D Therm (I) Pvt. Ltd. will be a global player in design & manufacturing of process equipment with world-class manufacturing setup by 2030.",
  },
  mission: {
    title: "Mission",
    body:
      "R&D Therm (I) Pvt. Ltd. is committed to design & manufacture process equipment such as pressure vessels, heat exchanger, distillation columns, tanks, reactors in all grades of Stainless Steel, Carbon Steel & Specialty Alloy for Pharma, Chemical, Oil & Gas, Specialty Chemicals, Aromatics, Dyes & Paints industries adhering to stringent quality standards, traceability of material & ensuring on time delivery.",
  },
};

export const directorsSection = {
  eyebrow: "Board of Directors",
  heading: ["The people behind ", "R&D Therm"] as const,
  description:
    "Three decades of process-equipment expertise distilled into a leadership team that signs every major drawing, weld procedure and dispatch certificate.",
};

export const directors = [
  {
    name: "Rajeev Deshmukh",
    role: "Founder & Chairman",
    bio: "Founded R&D Therm in 1993. 40+ years across pressure-vessel design, ASME compliance and process plant commissioning.",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Sneha Konark",
    role: "Managing Director",
    bio: "Drives strategy, growth and the Konark Global integration. Background in mechanical engineering and operations leadership.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Amit Patil",
    role: "Director — Engineering",
    bio: "Leads design, code compliance and engineering review. ASME Section VIII, PED & IBR specialist with 25+ years on the floor.",
    photo:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Priya Iyer",
    role: "Director — Operations",
    bio: "Owns shop-floor delivery, QC and dispatch. Built our digital QC stack and the on-time delivery system customers count on.",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80&auto=format&fit=crop",
  },
];

export const teamMembers = [
  {
    name: "Aarav Mehta",
    role: "Lead Process Engineer",
    bio: "Owns process design reviews across distillation, reactors and heat exchangers. ASME Section VIII and PED specialist with a record of zero-defect commissioning on 40+ global EPC projects.",
    photo:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Ishaan Kapoor",
    role: "Head of Fabrication",
    bio: "Runs the shop floor — 120 welders, 6 bays and every duplex / super-duplex job that ships from Nashik. Built our column-boom and orbital welding workflow from the ground up.",
    photo:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Riya Sharma",
    role: "QA / NDT Lead",
    bio: "Drives radiography, dye-pen, hydro and code-stamp inspections. Author of our live weld-data logging system that customers cite in audits across Europe and the US.",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=85&auto=format&fit=crop",
  },
  {
    name: "Devansh Rao",
    role: "Project Delivery Manager",
    bio: "End-to-end ownership of every major export order — from kick-off MOM to dispatch. Sleeps with the Gantt chart open, ships on time, every time.",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=85&auto=format&fit=crop",
  },
];

export const coreValues = [
  {
    icon: "growth",
    title: "Growth",
    body: "We invest in people, processes and capacity so every project delivers more value than the one before.",
  },
  {
    icon: "handshake",
    title: "Commitment of Individual",
    body: "Every promise we make is owned end-to-end by a named engineer — accountability is personal.",
  },
  {
    icon: "search",
    title: "Transparency in Actions",
    body: "Open documentation, traceable materials and clear communication from kick-off to commissioning.",
  },
  {
    icon: "respect",
    title: "Respect",
    body: "For our clients, our teams, our suppliers and the codes & standards that keep process plants safe.",
  },
  {
    icon: "heart",
    title: "Human Touch",
    body: "Behind every weld, drawing and inspection is a craftsperson who cares about getting it right.",
  },
];

// Copy for the auto-advancing "Our Journey" milestone stage. Same shape as
// `directorsSection` — eyebrow pill, heading split so the tail can carry the
// accent colour, then a description line.
export const journeySection = {
  eyebrow: "Our Journey",
  heading: ["Three decades of ", "process equipment"] as const,
  description:
    "Key milestones in the R&D Therm story — from a 1,100 sq ft Nashik shop in 1998 to a global supplier of code-compliant equipment.",
};

// `image` is the milestone photograph shown alongside the copy in
// <JourneyTimeline />. Placeholders for now — drop real shop-floor and dispatch
// photos into /public/images/about/timeline/ and swap the URLs in place.
export const timeline = [
  {
    year: "1998",
    title: "Foundation",
    body: "Started operations in a 1,100 sq ft facility at SICOF, Nashik.",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "1999",
    title: "First Expansion",
    body: "Shifted to a 4,000 sq ft facility at C14/2, MIDC Satpur.",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2000",
    title: "Capacity & Marquee Orders",
    body: "Bigger-size equipment commissioned and landmark orders secured from UPL and Ferminich.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2007",
    title: "UDHE Jacobs Certification",
    body: "Achieved fabricator approval from UDHE Jacobs — a key global engineering licensor.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2010",
    title: "Lloyds, BVIS & TCE Approval",
    body: "Shop approved by Lloyd's Register, BVIS and TCE for code-compliant pressure equipment.",
    image:
      "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2015",
    title: "TKIS Certification",
    body: "Earned fabrication approval from ThyssenKrupp Industrial Solutions (TKIS).",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2016",
    title: "Titanium Fabrication",
    body: "Delivered titanium fabrication jobs to Godavari Ltd. and Orchid Pharma — entering the exotic-alloy league.",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2017",
    title: "Joined Konark Group",
    body: "Amalgamated with Konark Group — broadening reach across dealership, projects and manufacturing.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2018",
    title: "Automation & ISO Renewal",
    body: "Inducted automated CNC marking & cutting, beveling, and column-boom welding machines. ISO 9001:2015 renewed by TÜV SÜD.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2019",
    title: "IBR & ASME U-Stamp",
    body: "Approved for IBR boiler manufacturing and awarded the ASME U-Stamp authorisation in August.",
    image:
      "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2020",
    title: "First USA Export",
    body: "Distillation columns shipped to the United States — a defining export milestone.",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2021",
    title: "Record Export Year",
    body: "Largest export order in company history booked and delivered.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2022",
    title: "U-Stamp Renewal",
    body: "ASME U-Stamp authorisation successfully renewed, reaffirming code-compliance credentials.",
    image:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2023",
    title: "Deaerator Introduced",
    body: "Deaerators added to the product portfolio for thermal power and process plants.",
    image:
      "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2024",
    title: "Heavy-Equipment Milestone",
    body: "First Deaerator exported to the Philippines, and a 48.5 MT distillation column (4.5 m dia × 23 m long) successfully dispatched.",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2025",
    title: "Capacity & Alloy Expansion",
    body: "New fabrication bays commissioned and dedicated capacity added for duplex, super-duplex and Hastelloy services.",
    image:
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1400&q=80&auto=format&fit=crop",
  },
  {
    year: "2026",
    title: "Digital Shop Floor",
    body: "Rolled out connected QC, live weld data logging and real-time project dashboards across every active job.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&q=80&auto=format&fit=crop",
  },
];

// The Journey rail reads best with six stops — seventeen ticks crowd the line
// and the auto-advance cycle runs past a minute. So the stage shows a curated
// arc of the full timeline above: founding, first global licensor approval,
// the Konark merger, the ASME U-Stamp, the heaviest dispatch, and today.
// Chronological order; every year here must exist in `timeline`.
const JOURNEY_YEARS = ["1998", "2007", "2017", "2019", "2024", "2026"];

export const journeyMilestones = JOURNEY_YEARS.map((year) => {
  const milestone = timeline.find((m) => m.year === year);
  if (!milestone) throw new Error(`journeyMilestones: no timeline entry for ${year}`);
  return milestone;
});

// "Worldwide Impact" band — centred statement over the global-presence map.
// Both the heading and the sub-line break exactly where the approved artwork
// breaks them, so the two lines stay balanced instead of rewrapping.
export const globalPresence = {
  heading: ["Engineering Excellence.", "Worldwide Impact."] as const,
  description: [
    "Delivering reliable solutions across continents,",
    "building partnerships that power progress.",
  ] as const,
  image: "/images/about/map.webp",
  imageAlt:
    "World map marking the countries R&D Therm has supplied process equipment to across six continents",
};
