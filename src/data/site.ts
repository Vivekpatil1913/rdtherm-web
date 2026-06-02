export const siteConfig = {
  name: "R & D Therm (I) Pvt. Ltd.",
  shortName: "R&D Therm",
  parent: "A Konark Global Co.",
  since: 1993,
  tagline: "Design.Fabricate.Deliver",
  description:
    "From Feed tank to Reactors to Distillation Column, we design and fabricate code-compliant chemical process equipment for global Chemical, Pharma, Agro and Energy plants — delivered on time, first-time right.",
  contact: {
    address: "C14/2, NICE Industrial Area, MIDC Satpur, Nashik, 422007, Maharashtra, India",
    phone: "+91 94222 93397",
    email: "sales@rdtherm.com",
    hours: [
      { label: "Mon to Fri", value: "8:00am - 6:00pm" },
      { label: "Saturday", value: "8:00am - 1:00pm" },
      { label: "Sunday", value: "Closed" },
    ],
  },
  social: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
} as const;

export const mainNav = [
  { label: "Who We Are", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contacts", href: "/contact" },
] as const;

export const footerLinks = {
  primary: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
  secondary: [
    { label: "Case Studies", href: "#" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Error 404", href: "/404" },
  ],
};
