"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTag } from "@/components/ui/SectionTag";
import { Button } from "@/components/ui/Button";
import { fadeUp, stagger, viewportOnce, EASE_OUT_SOFT } from "@/animations/motion";
import { siteConfig } from "@/data/site";
import { heroQuote } from "@/data/home";

const VIDEO_SOURCES = ["/videos/hero/rdthern.mp4"];

const POSTER_IMG =
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80";
const PORTRAIT_IMG =
  "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Sync state with actual video element state
    setIsPlaying(!v.paused);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onCanPlay = () => setVideoReady(true);

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("canplay", onCanPlay);

    // Attempt autoplay (must be muted for browser to allow it)
    v.muted = true;
    v.play().catch(() => {
      // Autoplay rejected — wait for user click on the play button.
      setIsPlaying(false);
    });

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) {
        await v.play();
      } else {
        v.pause();
      }
    } catch {
      // Play promise rejected — keep paused state
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative bg-[var(--color-bg-soft)] pt-8 lg:pt-10">
      <Container size="wide">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-12 pb-8 lg:pb-12"
          variants={stagger(0.05, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="lg:col-span-7">
            <motion.h1
              variants={fadeUp}
              className="text-[36px] leading-[1.06] tracking-[-0.02em] sm:text-[48px] md:text-[54px] lg:text-[60px] xl:text-[66px] font-bold"
            >
              Process Equipment,
              <br />
              <span className="text-[var(--color-accent)]">Engineered and Manufactured</span>{" "}
              Right
            </motion.h1>
            <motion.div variants={fadeUp} className="mt-7">
              <SectionTag>Design.Fabricate.Deliver</SectionTag>
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <motion.p
              variants={fadeUp}
              className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-soft)]"
            >
              {`// SINCE - ${siteConfig.since} //`}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-[420px] text-[16px] leading-[1.55] text-[var(--color-ink-soft)]"
            >
              {siteConfig.description}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-7">
              <Button href="/products" variant="dark">
                Explore our products
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE_OUT_SOFT }}
          className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[var(--color-bg-dark)]"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            poster={POSTER_IMG}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            {VIDEO_SOURCES.map((src) => (
              <source key={src} src={src} type="video/mp4" />
            ))}
          </video>

          {/* Dark overlay — must not capture clicks so the play/pause button works */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/15 to-black/45"
          />

          {/* Center column: founder card + quote, stacked and centered over the video */}
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-7 px-6 text-center">
            <FounderCard />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE_OUT_SOFT, delay: 0.2 }}
              className="mx-auto max-w-[420px] text-[15px] font-medium leading-[1.4] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-[18px] lg:text-[20px]"
            >
              {heroQuote.text}
            </motion.p>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            className="absolute bottom-5 left-5 z-20 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] transition-all duration-200 hover:bg-black/90 hover:scale-105 active:scale-95"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="size-4 fill-current" />
            ) : (
              <Play className="size-4 fill-current ml-0.5" />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function FounderCard() {
  return (
    <div className="relative w-[240px] sm:w-[260px] lg:w-[290px] overflow-hidden rounded-[18px] border border-white/12 bg-[#0d0d0d]/85 p-2.5 backdrop-blur-md shadow-[0_24px_70px_-20px_rgba(0,0,0,0.6)]">
      <div className="relative aspect-[5/5] w-full overflow-hidden rounded-[12px]">
        <Image
          src={PORTRAIT_IMG}
          alt={heroQuote.author}
          fill
          className="object-cover"
          sizes="290px"
        />
      </div>
      <div className="px-2 pt-3 pb-2 text-center text-white">
        <p className="text-[16px] font-semibold leading-tight">{heroQuote.author}</p>
        <p className="mt-1 text-[12px] text-white/55">{heroQuote.role}</p>
      </div>
    </div>
  );
}
