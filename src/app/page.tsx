"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

import Navbar from "@/components/shared/Navbar";
import MusicPlayer from "@/components/shared/MusicPlayer";
import FloatingPetals from "@/components/shared/FloatingPetals";

import Hero from "@/components/sections/Hero";
import CoupleSection from "@/components/sections/CoupleSection";
import StoryTimeline from "@/components/sections/StoryTimeline";
import EventsSection from "@/components/sections/EventsSection";
import VenueSection from "@/components/sections/VenueSection";
import GallerySection from "@/components/sections/GallerySection";
import RSVPSection from "@/components/sections/RSVPSection";
import ItinerarySection from "@/components/sections/ItinerarySection";
import GiftSection from "@/components/sections/GiftSection";
import Footer from "@/components/sections/Footer";

const Preloader = dynamic(() => import("@/components/shared/Preloader"), { ssr: false });

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (!contentVisible) return;
    let lenis: { destroy(): void } | null = null;
    const initLenis = async () => {
      try {
        const LenisModule = await import("@studio-freight/lenis");
        const LenisClass = LenisModule.default;
        lenis = new LenisClass({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), orientation: "vertical" as const, gestureOrientation: "vertical" as const, smoothWheel: true });
        const raf = (time: number) => { (lenis as any).raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
      } catch { /* native scroll */ }
    };
    initLenis();
    return () => { lenis?.destroy(); };
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
              <StoryTimeline />
              <EventsSection />
              <VenueSection />
              <GallerySection />
              <RSVPSection />
              <ItinerarySection />
              <GiftSection />
            </main>
            <Footer />
            <MusicPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}