"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_PHOTOS } from "@/lib/constants";
import { MandalaDivider } from "@/components/svg/Decoratives";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useInView } from "framer-motion";

export default function GallerySection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
  }, [lightboxIndex]);
  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % GALLERY_PHOTOS.length);
  }, [lightboxIndex]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prevPhoto, nextPhoto]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) nextPhoto();
    else if (diff < -50) prevPhoto();
    setTouchStart(null);
  };

  // 3-column masonry layout weights
  const columns: (typeof GALLERY_PHOTOS)[] = [[], [], []];
  GALLERY_PHOTOS.forEach((photo, i) => columns[i % 3].push(photo));

  return (
    <section
      id="gallery"
      style={{
        padding: "100px 20px",
        background: "#FFF5EE",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <motion.span variants={staggerItem} className="section-tag">Our Moments</motion.span>
          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 300,
              color: "#9E5A4E",
            }}
          >
            A Glimpse of
            <br />
            <em style={{ fontStyle: "italic", color: "#C9972C" }}>Our Story</em>
          </motion.h2>
          <motion.div variants={staggerItem}>
            <MandalaDivider />
          </motion.div>
        </motion.div>

        {/* Masonry Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}>
          {columns.map((col, ci) => (
            <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {col.map((photo, pi) => {
                const globalIndex = ci + pi * 3;
                const tall = (pi + ci) % 3 === 0;
                return (
                  <motion.div
                    key={photo.id}
                    className="gallery-item"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: (ci * 0.08) + (pi * 0.05), ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: "relative",
                      height: tall ? 340 : 220,
                      borderRadius: 4,
                      overflow: "hidden",
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                    }}
                    onClick={() => openLightbox(globalIndex)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                    <div className="gallery-overlay" style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(158,90,78,0.7) 0%, transparent 50%)",
                      opacity: 0, transition: "opacity 0.3s",
                      display: "flex", flexDirection: "column",
                      justifyContent: "flex-end", padding: 14,
                    }}>
                      <span style={{
                        fontFamily: "var(--font-great-vibes, cursive)",
                        fontSize: 18, color: "#C9972C",
                      }}>{photo.alt}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
                        {photo.caption}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Mobile single-column override */}
        <style>{`
          @media (max-width: 600px) {
            .gallery-masonry { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 900px) {
            .gallery-masonry { grid-template-columns: repeat(2, 1fr) !important; }
          }
          .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
        `}</style>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: "rgba(0,0,0,0.95)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute", top: 20, right: 24,
                background: "rgba(255,255,255,0.1)", border: "none",
                color: "#C9972C", fontSize: 28, cursor: "pointer",
                borderRadius: "50%", width: 48, height: 48,
                display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 10,
              }}
            >✕</button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prevPhoto(); }}
              style={{
                position: "absolute", left: 16,
                background: "rgba(255,255,255,0.1)", border: "none",
                color: "#C9972C", fontSize: 24, cursor: "pointer",
                borderRadius: "50%", width: 52, height: 52,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >‹</button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "relative", maxWidth: "90vw", maxHeight: "85vh",
                width: 800, height: 560,
              }}
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={GALLERY_PHOTOS[lightboxIndex].src}
                alt={GALLERY_PHOTOS[lightboxIndex].alt}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
              {/* Caption */}
              <div style={{
                position: "absolute", bottom: -44, left: 0, right: 0,
                textAlign: "center",
              }}>
                <span style={{
                  fontFamily: "var(--font-great-vibes, cursive)",
                  fontSize: 22, color: "#C9972C",
                }}>
                  {GALLERY_PHOTOS[lightboxIndex].alt}
                </span>
                <span style={{
                  display: "block", fontSize: 11, color: "rgba(255,255,255,0.5)",
                  marginTop: 2,
                }}>
                  {lightboxIndex + 1} / {GALLERY_PHOTOS.length}
                </span>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); nextPhoto(); }}
              style={{
                position: "absolute", right: 16,
                background: "rgba(255,255,255,0.1)", border: "none",
                color: "#C9972C", fontSize: 24, cursor: "pointer",
                borderRadius: "50%", width: 52, height: 52,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
