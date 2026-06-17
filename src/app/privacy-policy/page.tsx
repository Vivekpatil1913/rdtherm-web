import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/sections/shared/PageHero";
import { siteConfig } from "@/data/site";

const LAST_UPDATED = "16 June 2026";

const TITLE = "Privacy Policy";
const DESCRIPTION = `How ${siteConfig.shortName} collects, uses and protects the personal information you share with us through this website.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/privacy-policy",
    type: "website",
  },
  twitter: { title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  const { name, contact } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading={
          <>
            Privacy <span className="text-[var(--color-accent)]">Policy</span>
          </>
        }
        description={`Last updated ${LAST_UPDATED}. This policy explains what information we collect when you use this website and how we handle it.`}
      />

      <section className="bg-[var(--color-bg)] pb-16 lg:pb-24">
        <Container size="narrow">
          <div className="prose-article">
              <p>
                {name} (&ldquo;{siteConfig.shortName}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;)
                respects your privacy and is committed to protecting the personal information you share with us. This
                Privacy Policy describes how we collect, use, disclose and safeguard your information when you visit this
                website or contact us through it. By using this website, you agree to the practices described below.
              </p>

              <h2>1. Information we collect</h2>
              <p>We only collect information that helps us respond to your enquiries and improve our service:</p>
              <ul>
                <li>
                  <strong>Information you provide.</strong> When you submit a contact form, request a quote or apply for a
                  role, we collect details such as your name, company, email address, mobile number, country, city and any
                  message or requirements you choose to share.
                </li>
                <li>
                  <strong>Configuration details.</strong> If you use our product configurators (for example, the Air
                  Receiver builder), we store the specification you select so our engineering team can prepare an accurate
                  quotation.
                </li>
                <li>
                  <strong>Technical &amp; usage data.</strong> Like most websites, our servers may automatically record
                  limited technical information such as your browser type, device, approximate location and the pages you
                  view, to keep the site secure and reliable.
                </li>
              </ul>

              <h2>2. How we use your information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>respond to your enquiries, quotations and applications;</li>
                <li>design, manufacture and deliver the products and services you request;</li>
                <li>communicate with you about your project, including follow-ups and support;</li>
                <li>maintain, secure and improve our website and services; and</li>
                <li>comply with our legal and regulatory obligations.</li>
              </ul>
              <p>We do not sell your personal information, and we do not use it for unrelated marketing without your consent.</p>

              <h2>3. Cookies &amp; analytics</h2>
              <p>
                This website may use essential cookies and similar technologies to remember your preferences and understand
                how the site is used. You can control or delete cookies through your browser settings; disabling some
                cookies may affect how parts of the site function.
              </p>

              <h2>4. How we share information</h2>
              <p>We treat your information as confidential and only share it where necessary:</p>
              <ul>
                <li>
                  <strong>Service providers.</strong> Trusted partners who host our website, deliver email or provide IT
                  services on our behalf, bound by confidentiality obligations.
                </li>
                <li>
                  <strong>Legal requirements.</strong> Where we are required to do so by law, regulation or valid legal
                  process, or to protect our rights, safety and property.
                </li>
              </ul>

              <h2>5. Data retention</h2>
              <p>
                We retain personal information only for as long as needed to fulfil the purposes described in this policy,
                to maintain our business records, and to comply with applicable legal and accounting requirements. When no
                longer required, information is securely deleted or anonymised.
              </p>

              <h2>6. Data security</h2>
              <p>
                We implement reasonable technical and organisational measures to protect your information against
                unauthorised access, alteration, disclosure or destruction. However, no method of transmission over the
                internet is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2>7. Your rights</h2>
              <p>
                Subject to applicable law, you may request to access, correct, update or delete the personal information we
                hold about you, or object to certain processing. To exercise any of these rights, please contact us using
                the details below and we will respond within a reasonable timeframe.
              </p>

              <h2>8. Third-party links</h2>
              <p>
                Our website may contain links to third-party sites. We are not responsible for the privacy practices or
                content of those sites, and we encourage you to review their privacy policies.
              </p>

              <h2>9. Children&rsquo;s privacy</h2>
              <p>
                This website is intended for business and professional use and is not directed at children. We do not
                knowingly collect personal information from anyone under the age of 18.
              </p>

              <h2>10. Changes to this policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal
                requirements. The latest version will always be available on this page, with the &ldquo;Last updated&rdquo;
                date revised accordingly.
              </p>

              <h2>11. Contact us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li>
                  <strong>Phone:</strong> <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
                </li>
                <li>
                  <strong>Address:</strong> {contact.address}
                </li>
              </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
