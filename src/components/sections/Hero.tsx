"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { GopuramSilhouette, KuthuvilakkuSVG, LotusDivider } from "@/components/svg/Decoratives";
import Countdown from "./Countdown";

export default function Hero() {
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxBgRef.current) return;
      const y = window.scrollY;
      parallaxBgRef.current.style.transform = `translateY(${y * 0.35}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#120C08",
      }}
    >
      {/* Parallax background layers */}
      <div ref={parallaxBgRef} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        {/* Deep background gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 60%, #1A100B 0%, #1E1510 50%, #120C08 100%)",
        }} />
        {/* Silk texture overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #C9972C 0px, #C9972C 1px, transparent 0px, transparent 50%
          )`,
          backgroundSize: "20px 20px",
        }} />
        {/* Warm glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 45%, rgba(201,151,44,0.08) 0%, transparent 60%)",
        }} />
      </div>

      {/* Gopuram silhouette — bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        zIndex: 2, opacity: 0.35, pointerEvents: "none",
      }}>
        <GopuramSilhouette />
      </div>

      {/* CSS bead ornament — top border accent (replaces leaf toran) */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        zIndex: 3, pointerEvents: "none",
      }}>
        {/* Top gradient glow */}
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent 4%, rgba(201,151,44,0.45) 25%, rgba(201,151,44,0.55) 50%, rgba(201,151,44,0.45) 75%, transparent 96%)",
        }} />
        {/* Bead drops */}
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 0 }}>
          {Array.from({ length: 48 }, (_, i) => {
            const isAccent = i % 8 === 0;
            const isMid = i % 4 === 2;
            return (
              <div key={i} style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              }}>
                <div style={{
                  width: 1,
                  height: isAccent ? 22 : isMid ? 15 : 9,
                  background: `rgba(201,151,44,${isAccent ? 0.5 : 0.28})`,
                }} />
                <div style={{
                  width: isAccent ? 5 : 3,
                  height: isAccent ? 5 : 3,
                  borderRadius: "50%",
                  background: "#C9972C",
                  opacity: isAccent ? 0.6 : 0.3,
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Ornamental corner borders */}
      {([
        { top: 16, left: 16, deg: 0 },
        { top: 16, right: 16, deg: 90 },
        { bottom: 16, right: 16, deg: 180 },
        { bottom: 16, left: 16, deg: 270 },
      ] as Array<{ top?: number; bottom?: number; left?: number; right?: number; deg: number }>).map((corner, i) => (
        <div key={i} style={{
          position: "absolute",
          top: corner.top,
          left: corner.left,
          right: corner.right,
          bottom: corner.bottom,
          width: 80, height: 80, zIndex: 3, opacity: 0.5, pointerEvents: "none",
        }}>
          <svg viewBox="0 0 80 80" fill="none" style={{ transform: `rotate(${corner.deg}deg)` }}>
            <path d="M4 76 L4 18 C4 10 10 4 18 4 L76 4" stroke="#C9972C" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M4 76 L4 34 C4 18 18 4 34 4 L76 4" stroke="#C9972C" strokeWidth="0.5" opacity="0.4" strokeLinecap="round" />
            <circle cx="12" cy="12" r="5" stroke="#C9972C" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="2" fill="#C9972C" opacity="0.5" />
          </svg>
        </div>
      ))}

      {/* Main content */}
      <div style={{
        position: "relative", zIndex: 5,
        textAlign: "center",
        padding: "80px 20px 120px",
        maxWidth: 900,
        width: "100%",
      }}>
        {/* Sri / Auspicious greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontSize: 11,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "rgba(201,151,44,0.7)",
            marginBottom: 16,
          }}
        >
          ॐ · शुभ विवाह · OM
        </motion.div>

        {/* Oil lamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
        >
          <div style={{ animation: "floatGentle 4s ease-in-out infinite" }}>
            <KuthuvilakkuSVG size={60} />
          </div>
        </motion.div>

        {/* Script line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-great-vibes, cursive)",
            fontSize: "clamp(18px, 3vw, 26px)",
            color: "#C9972C",
            marginBottom: 10,
          }}
        >
          Together with their families, joyfully invite you to celebrate
        </motion.div>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 style={{
            fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)",
            fontSize: "clamp(48px, 13vw, 130px)",
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: -1,
            color: "#FFFBF7",
          }}>
            {WEDDING.bride.nickname}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-great-vibes, cursive)",
            fontSize: "clamp(32px, 7vw, 70px)",
            color: "#C9972C",
            lineHeight: 1.2,
            display: "block",
          }}
        >
          &amp;
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 style={{
            fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)",
            fontSize: "clamp(48px, 13vw, 130px)",
            fontWeight: 300,
            lineHeight: 0.9,
            letterSpacing: -1,
            color: "#FFFBF7",
          }}>
            {WEDDING.groom.nickname}
          </h1>
        </motion.div>

        {/* Tamil names */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          style={{
            fontFamily: "var(--font-malayalam, serif)",
            fontSize: "clamp(14px, 2.5vw, 20px)",
            color: "rgba(201,151,44,0.6)",
            letterSpacing: 3,
            marginTop: 10,
          }}
        >
          {WEDDING.bride.tamilName} &amp; {WEDDING.groom.tamilName}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 14, margin: "24px 0",
          }}
        >
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, transparent, #C9972C)" }} />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => {
              const a = i * 72 * Math.PI / 180 - Math.PI / 2;
              return <ellipse key={i} cx={10 + 5 * Math.cos(a)} cy={10 + 5 * Math.sin(a)} rx="2.5" ry="4"
                transform={`rotate(${i * 72 - 90} ${10 + 5 * Math.cos(a)} ${10 + 5 * Math.sin(a)})`} fill="#C9972C" opacity="0.7" />;
            })}
            <circle cx="10" cy="10" r="2" fill="#C4786A" />
          </svg>
          <div style={{ width: 60, height: 1, background: "linear-gradient(90deg, #C9972C, transparent)" }} />
        </motion.div>

        {/* Date & venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.7 }}
          style={{ marginBottom: 40 }}
        >
          <div style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontSize: "clamp(14px, 2vw, 20px)",
            fontWeight: 400,
            letterSpacing: 5,
            color: "#C9972C",
            textTransform: "uppercase",
            marginBottom: 6,
          }}>
            {WEDDING.wedding.date}
          </div>
          <div style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,253,208,0.5)",
            lineHeight: 2,
          }}>
            {WEDDING.wedding.venue.name}
          </div>
          <div style={{
            fontSize: 10,
            letterSpacing: 3,
            color: "rgba(255,253,208,0.35)",
          }}>
            Madurai, Tamil Nadu
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <Countdown />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 0.8 }}
        style={{
          position: "absolute", bottom: 30, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8, zIndex: 5,
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,253,208,0.4)" }}>
          Scroll
        </span>
        {/* Lotus scroll indicator */}
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
          {[0, 60, 120, 180, 240, 300].map((a, i) => {
            const rad = a * Math.PI / 180;
            return <ellipse key={i} cx={15 + 8 * Math.cos(rad)} cy={15 + 8 * Math.sin(rad)}
              rx="3" ry="5"
              transform={`rotate(${a} ${15 + 8 * Math.cos(rad)} ${15 + 8 * Math.sin(rad)})`}
              fill="#C9972C" opacity="0.4" />;
          })}
          <circle cx="15" cy="15" r="3" fill="#C9972C" opacity="0.6" />
        </svg>
        <div style={{
          width: 1, height: 50,
          background: "linear-gradient(180deg, rgba(201,151,44,0.6), transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
      </motion.div>
    </section>
  );
}
