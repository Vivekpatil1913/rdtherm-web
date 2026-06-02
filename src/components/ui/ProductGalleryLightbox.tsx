"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Container } from "@/components/ui/Container";

export type ProductGalleryImage = {
  url: string;
  alt: string;
  label?: string;
  caption?: string;
};

type Props = {
  title: string;
  images: ProductGalleryImage[];
};

export function ProductGalleryLightbox({ title, images }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = images.map((img) => ({
    src: img.url,
    alt: img.alt ?? title,
    title: img.label,
    description: img.caption,
  }));

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const [hero, ...rest] = images;

  return (
    <>
      <section className="bg-[var(--color-bg-soft)] pb-14 lg:pb-16">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
            <GalleryTile
              image={hero}
              alt={hero.alt ?? title}
              className="relative lg:col-span-8 aspect-[16/10] lg:aspect-[16/11]"
              priority
              onClick={() => openAt(0)}
            />

            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5">
              {rest.slice(0, 2).map((img, i) => (
                <GalleryTile
                  key={img.url}
                  image={img}
                  alt={img.alt ?? title}
                  className="relative aspect-square lg:aspect-[16/10]"
                  onClick={() => openAt(i + 1)}
                />
              ))}
            </div>

            {rest.length > 2 ? (
              <div className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
                {rest.slice(2).map((img, i) => (
                  <GalleryTile
                    key={img.url}
                    image={img}
                    alt={img.alt ?? title}
                    className="relative aspect-[5/4]"
                    onClick={() => openAt(i + 3)}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Fullscreen, Slideshow, Thumbnails]}
        thumbnails={{ position: "bottom", border: 0, gap: 12, padding: 4 }}
        zoom={{ maxZoomPixelRatio: 4, scrollToZoom: true }}
        animation={{ fade: 250, swipe: 300 }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}

function GalleryTile({
  image,
  alt,
  className,
  priority,
  onClick,
}: {
  image: { url: string; label?: string; caption?: string };
  alt: string;
  className: string;
  priority?: boolean;
  onClick: () => void;
}) {
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <figure
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKey}
      className={
        "group relative cursor-zoom-in overflow-hidden rounded-[16px] border border-[var(--color-line)] bg-[var(--color-bg-dark)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 " +
        className
      }
    >
      <Image
        src={image.url}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        priority={priority}
      />
      {image.label ? (
        <figcaption
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex translate-y-full items-center gap-3 bg-gradient-to-t from-black/85 via-black/70 to-transparent px-5 py-4 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span className="inline-block h-px w-7 bg-[var(--color-accent)]" />
          <p className="text-[13px] font-semibold tracking-[-0.01em] sm:text-[14px]">
            {image.label}
          </p>
        </figcaption>
      ) : null}
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 z-10 inline-flex size-7 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <ArrowUpRight className="size-3.5 text-white" />
      </span>
    </figure>
  );
}
