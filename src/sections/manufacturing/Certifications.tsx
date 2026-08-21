import { ExternalLink, ScrollText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { certificateDocs } from "@/data/manufacturing";

// Shorter than the A4 the scans arrive in, so three cards sit in the viewport
// without a scroll. `view=Fit` scales the page down to suit, so the document
// still shows whole — just with a little breathing room at the sides.
const SHEET = "aspect-[1/1.15]";

// Viewer hints for the embedded preview: no toolbar, no side panel, and the page
// fitted to the tile's *width* — `view=Fit` would letterbox the sheet and leave
// the viewer's dark backdrop showing down both sides. Browsers that ignore these
// just show a little more chrome; ones with no PDF viewer fall through to the
// <object> fallback below.
const PREVIEW_HASH = "#toolbar=0&navpanes=0&scrollbar=0&view=FitH&page=1";

export function Certifications() {
  if (!certificateDocs.length) return null;

  return (
    <section className="bg-[var(--color-bg-soft)] py-16 lg:py-20">
      {/* A notch narrower than the widest sections — three certificates at full
          bleed read as posters rather than documents. Set at the container so
          the heading stays flush with the first card. */}
      <Container size="default">
        <SectionTag>Certificates</SectionTag>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {certificateDocs.map((doc) => (
            <CertificateCard key={doc.title} doc={doc} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CertificateCard({ doc }: { doc: (typeof certificateDocs)[number] }) {
  const shell =
    "group block w-full rounded-[18px] border border-[var(--color-line)] bg-white p-3 text-left shadow-[0_20px_50px_-30px_rgba(0,0,0,0.18)] transition-all duration-300 lg:p-4";
  const hover =
    " hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-accent)]/20";

  const body = (
    <>
      <span className={`relative block overflow-hidden rounded-[12px] border border-[var(--color-line)] bg-white ${SHEET}`}>
        {doc.file ? (
          <>
            {/* The certificate itself, rendered by the browser's PDF viewer.
                Clicks belong to the link wrapping it, so the embed never takes
                the pointer. */}
            <object
              data={`${doc.file}${PREVIEW_HASH}`}
              type="application/pdf"
              aria-hidden
              tabIndex={-1}
              // Overscanned a touch so the viewer's own padding falls outside
              // the tile and only paper shows inside it.
              style={{ width: "106%", height: "106%", left: "-3%", top: "-3%" }}
              className="pointer-events-none absolute"
            >
              {/* Shown only where the browser cannot render a PDF inline
                  (most mobile browsers) — the tap target still opens it. */}
              <Placeholder label="Tap to open the certificate (PDF)" />
            </object>
            {/* Keeps the whole sheet clickable even over the embed. */}
            <span className="absolute inset-0" />
          </>
        ) : (
          <Placeholder label="Certificate scan coming soon" />
        )}
      </span>

      <span className="mt-4 flex items-start justify-between gap-3">
        <span className="min-w-0">
          <span className="block text-[15px] font-semibold leading-tight text-[var(--color-ink)]">
            {doc.title}
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-[var(--color-muted)]">
            {doc.issuer}
          </span>
          {doc.validity ? (
            <span className="mt-1 block text-[12px] leading-snug text-[var(--color-muted)]/80">
              {doc.validity}
            </span>
          ) : null}
        </span>
        {doc.file ? (
          <ExternalLink
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            strokeWidth={2}
          />
        ) : null}
      </span>
    </>
  );

  if (!doc.file) return <div className={shell}>{body}</div>;

  return (
    <a
      href={doc.file}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open the ${doc.title} certificate (PDF) in a new tab`}
      className={shell + hover}
    >
      {body}
    </a>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--color-bg-soft)] px-6 text-center">
      <span className="inline-flex size-11 items-center justify-center rounded-[12px] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
        <ScrollText className="size-5" strokeWidth={1.7} />
      </span>
      <span className="text-[13px] leading-snug text-[var(--color-muted)]">{label}</span>
    </span>
  );
}
