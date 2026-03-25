"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

import Navbar from "@/components/shared/Navbar";
import MusicPlayer from "@/components/shared/MusicPlayer";
import FloatingPetals from "@/components/shared/FloatingPetals";

import Hero from "@/components/sections/Hero";
import CoupleSection from "@/components/sections/CoupleSection";
import EventsSection from "@/components/sections/EventsSection";
import VenueSection from "@/components/sections/VenueSection";
import Footer from "@/components/sections/Footer";

const Preloader = dynamic(() => import("@/components/shared/Preloader"), { ssr: false });

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (!contentVisible) return;

    let lenis: import("lenis").default | null = null;
    // typed ref so we can remove the exact same function from GSAP ticker
    let gsapRaf: ((time: number) => void) | null = null;

    const initLenis = async () => {
      try {
        const [LenisModule, gsapModule] = await Promise.all([
          import("lenis"),
          import("gsap"),
        ]);
        const Lenis = LenisModule.default;
        const gsap = gsapModule.gsap;

        lenis = new Lenis({
          lerp: 0.08,            // lower = snappier response (default 0.1)
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
          anchors: true,         // lets nav href="#section" links work
          overscroll: false,
        });

        // Drive Lenis through GSAP's optimized ticker — no duplicate RAF loops
        gsapRaf = (time: number) => { lenis!.raf(time * 1000); };
        gsap.ticker.add(gsapRaf);
        gsap.ticker.lagSmoothing(0); // prevent GSAP lag compensation interfering
      } catch { /* fall back to native scroll */ }
    };

    initLenis();
    return () => {
      if (gsapRaf) {
        // dynamically import so cleanup mirrors init
        import("gsap").then(({ gsap }) => gsap.ticker.remove(gsapRaf!)).catch(() => {});
      }
      lenis?.destroy();
    };
  }, [contentVisible]);

  const handlePreloaderComplete = () => { setShowPreloader(false); setTimeout(() => setContentVisible(true), 300); };

  return (
    <>
      <AnimatePresence>{showPreloader && <Preloader onComplete={handlePreloaderComplete} />}</AnimatePresence>
      <AnimatePresence>
        {contentVisible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <FloatingPetals />
            <Navbar />
            <main>
              <Hero />
              <CoupleSection />
              <EventsSection />
              <VenueSection />
            </main>
            <Footer />
            <MusicPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}