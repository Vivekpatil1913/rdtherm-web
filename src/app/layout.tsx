import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ScrollManager } from "@/components/utility/ScrollManager";
import { LenisProvider } from "@/components/utility/LenisProvider";
import { siteConfig } from "@/data/site";
import { getSettings } from "@/services/content";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = "https://rdtherm.example.com";
const DEFAULT_TITLE = `${siteConfig.name} — Process Equipment, Engineered & Manufactured Right`;
const DEFAULT_DESCRIPTION = siteConfig.description;
const DEFAULT_OG_IMAGE = "/images/hero/rdtherm-logo.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: siteConfig.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.parent,
  keywords: [
    "process equipment manufacturer",
    "pressure vessel manufacturer India",
    "heat exchanger fabricator",
    "reactor manufacturer",
    "distillation column fabricator",
    "deaerator manufacturer",
    "ASME U-stamp fabricator",
    "PED CE pressure equipment",
    "IBR pressure parts India",
    "process skid manufacturer",
    "stainless steel fabrication Nashik",
    "chemical process equipment",
    "pharma process equipment",
    "oil and gas pressure vessels",
    "R&D Therm",
    "Konark Global",
  ],
  category: "Manufacturing",
  alternates: {
    canonical: "/",
  },
  // Favicon is auto-generated from src/app/icon.png via Next.js file convention.
  openGraph: {
    type: "website",
    siteName: siteConfig.shortName,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: "en_IN",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${siteConfig.shortName} — Process Equipment Manufacturing`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // Add real Search Console / Bing verification tokens here when issued.
    // google: "xxxxxxxxxxxxxxxxxxxxxxxx",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f1ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  description: DEFAULT_DESCRIPTION,
  foundingDate: String(siteConfig.since),
  parentOrganization: { "@type": "Organization", name: siteConfig.parent },
  address: {
    "@type": "PostalAddress",
    streetAddress: "C14/2, NICE Industrial Area, MIDC Satpur",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    postalCode: "422007",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    contactType: "sales",
    areaServed: "Worldwide",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: siteConfig.social.map((s) => s.href).filter((h) => h && h !== "#"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  return (
    <html lang="en" className={`${monaSans.variable}`}>
      <head>
        {/* Runs before hydration: disable browser scroll restoration and pin to top on every load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}window.addEventListener('load',function(){window.scrollTo(0,0);},{once:true});`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[var(--color-ink)] font-sans">
        <ScrollManager />
        <LenisProvider />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <FloatingActions />
      </body>
    </html>
  );
}
