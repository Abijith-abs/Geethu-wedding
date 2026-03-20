"use client";

import { useEffect, useRef } from "react";
import { WEDDING } from "@/lib/constants";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled) return;

      // ── Initial states ──────────────────────────────────────
      gsap.set(".pre-ring-outer", { scale: 0, opacity: 0 });
      gsap.set(".pre-ring-inner", { scale: 0, opacity: 0 });
      gsap.set(".pre-ring-draw", { strokeDashoffset: 1168 });
      gsap.set(".pre-ring-dots circle", { scale: 0, opacity: 0, transformOrigin: "center" });
      gsap.set(".pre-ornament", { opacity: 0, y: 8 });
      gsap.set(".pre-sub", { opacity: 0, y: 10 });
      gsap.set(".pre-bride", { opacity: 0, x: -24 });
      gsap.set(".pre-amp", { opacity: 0, scale: 0.6 });
      gsap.set(".pre-groom", { opacity: 0, x: 24 });
      gsap.set(".pre-divider-line", { scaleX: 0 });
      gsap.set(".pre-date", { opacity: 0, y: 8 });
      gsap.set(".pre-enter", { opacity: 0, y: 12 });

      const tl = gsap.timeline();

      tl
        // Outer ring blooms
        .to(".pre-ring-outer", { scale: 1, opacity: 1, duration: 1.4, ease: "expo.out" }, 0.1)
        .to(".pre-ring-inner", { scale: 1, opacity: 1, duration: 1.1, ease: "expo.out" }, 0.3)
        // SVG ring stroke-draws itself
        .to(".pre-ring-draw",  { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" }, 0.2)
        // Dots pop in staggered along the ring
        .to(".pre-ring-dots circle", { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: "back.out(2)" }, 1.6)
        // Italic tagline
        .to(".pre-ornament", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 2.2)
        // Malayalam names
        .to(".pre-sub", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 2.7)
        // Main names slide in from sides
        .to(".pre-bride", { opacity: 1, x: 0, duration: 1.0, ease: "power3.out" }, 3.0)
        .to(".pre-amp",   { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, 3.3)
        .to(".pre-groom", { opacity: 1, x: 0, duration: 1.0, ease: "power3.out" }, 3.4)
        // Divider draws
        .to(".pre-divider-line", { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 4.0)
        // Date + button
        .to(".pre-date",  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 4.5)
        .to(".pre-enter", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 4.9);
    });

    return () => { cancelled = true; };
  }, [onComplete]);

  const handleEnter = () => {
    import("gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ onComplete: onComplete });

      tl
        .to(".pre-enter", { opacity: 0, scale: 0.9, duration: 0.2 })
        .to(".pre-bride, .pre-amp, .pre-groom, .pre-ornament, .pre-sub, .pre-date, .pre-divider-line", {
          opacity: 0, y: -14, duration: 0.45, stagger: 0.04, ease: "power2.in",
        }, 0.1)
        .to(".pre-ring-draw", { strokeDashoffset: -1168, duration: 0.55, ease: "power2.in" }, 0.2)
        .to(".pre-ring-dots circle", { scale: 0, opacity: 0, duration: 0.3, stagger: 0.05 }, 0.15)
        .to(".pre-ring-inner, .pre-ring-outer", {
          scale: 12, opacity: 0, duration: 0.8, ease: "expo.in",
        }, 0.4)
        .to(preloaderRef.current, { opacity: 0, duration: 0.35 }, 0.9);
    });
  };

  // Dot positions along the SVG ring (r=186, cx=200, cy=200)
  const ringDots = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (deg - 90) * (Math.PI / 180);
    return { cx: 200 + 186 * Math.cos(rad), cy: 200 + 186 * Math.sin(rad), accent: deg % 120 === 0 };
  });

  return (
    <div
      ref={preloaderRef}
      id="preloader"
      style={{ position: "fixed", inset: 0, zIndex: 10000, background: "#FAF7F3", overflow: "hidden" }}
    >
      {/* Subtle dot texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "radial-gradient(circle, #9E5A4E 1px, transparent 1px)",
        backgroundSize: "28px 28px", pointerEvents: "none",
      }} />

      {/* Outer halo ring */}
      <div className="pre-ring-outer" style={{
        position: "absolute",
        width: "min(500px, 85vw)", height: "min(500px, 85vw)",
        borderRadius: "50%",
        border: "1px solid rgba(201,151,44,0.1)",
      }} />

      {/* Inner halo ring */}
      <div className="pre-ring-inner" style={{
        position: "absolute",
        width: "min(370px, 63vw)", height: "min(370px, 63vw)",
        borderRadius: "50%",
        border: "1px solid rgba(201,151,44,0.25)",
      }} />

      {/* SVG ring that stroke-draws itself + accent dots */}
      <svg
        className="pre-ring-dots"
        style={{ position: "absolute", width: "min(410px, 70vw)", height: "min(410px, 70vw)" }}
        viewBox="0 0 400 400"
      >
        <circle
          className="pre-ring-draw"
          cx="200" cy="200" r="186"
          fill="none"
          stroke="#C9972C"
          strokeWidth="0.8"
          strokeDasharray="1168"
          strokeDashoffset="1168"
          strokeLinecap="round"
          opacity="0.5"
        />
        {ringDots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.accent ? 2.8 : 1.6}
            fill="#C9972C" opacity={d.accent ? 0.6 : 0.35} />
        ))}
      </svg>

      {/* Centre content */}
      <div style={{
        position: "relative", zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center", textAlign: "center",
        padding: "0 28px",
      }}>
        {/* Italic tagline */}
        <div className="pre-ornament" style={{
          fontFamily: "var(--font-cormorant, serif)",
          fontStyle: "italic",
          fontSize: "clamp(13px, 2.5vw, 17px)",
          color: "rgba(201,151,44,0.7)",
          letterSpacing: 3,
          marginBottom: 18,
        }}>
          Together with their families
        </div>

        {/* Malayalam names */}
        <div className="pre-sub" style={{
          fontFamily: "var(--font-malayalam, serif)",
          fontSize: "clamp(14px, 2.8vw, 18px)",
          color: "#B89A88",
          letterSpacing: 3,
          marginBottom: 20,
        }}>
          {WEDDING.bride.tamilName} &amp; {WEDDING.groom.tamilName}
        </div>

        {/* Couple names */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(10px, 3vw, 26px)" }}>
          <div className="pre-bride" style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontSize: "clamp(38px, 9vw, 84px)",
            fontWeight: 300,
            color: "#2A1F17",
            letterSpacing: "clamp(2px, 1vw, 7px)",
            lineHeight: 1,
          }}>
            {WEDDING.bride.nickname}
          </div>

          <div className="pre-amp" style={{
            fontFamily: "var(--font-great-vibes, cursive)",
            fontSize: "clamp(30px, 7vw, 68px)",
            color: "#C9972C",
            lineHeight: 1,
          }}>
            &amp;
          </div>

          <div className="pre-groom" style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontSize: "clamp(38px, 9vw, 84px)",
            fontWeight: 300,
            color: "#2A1F17",
            letterSpacing: "clamp(2px, 1vw, 7px)",
            lineHeight: 1,
          }}>
            {WEDDING.groom.nickname}
          </div>
        </div>

        {/* Gold divider */}
        <div className="pre-divider-line" style={{
          width: "clamp(120px, 28vw, 200px)", height: 1,
          background: "linear-gradient(90deg, transparent, #C9972C 30%, #C9972C 70%, transparent)",
          transformOrigin: "center",
          margin: "22px auto 16px",
        }} />

        {/* Date */}
        <div className="pre-date" style={{
          fontSize: "clamp(8px, 1.4vw, 10px)",
          letterSpacing: "clamp(4px, 1.5vw, 8px)",
          textTransform: "uppercase",
          color: "#B89A88",
          marginBottom: 34,
        }}>
          February 14, 2027 &nbsp;·&nbsp; Ernakulam, Kerala
        </div>

        {/* Enter button */}
        <button
          className="pre-enter"
          onClick={handleEnter}
          style={{
            padding: "11px 36px",
            border: "1px solid rgba(201,151,44,0.4)",
            background: "transparent",
            color: "#9E5A4E",
            fontSize: "clamp(8px, 1.4vw, 10px)",
            letterSpacing: 6,
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "var(--font-jost, sans-serif)",
            transition: "all 0.3s ease",
            borderRadius: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(201,151,44,0.07)";
            e.currentTarget.style.borderColor = "rgba(201,151,44,0.65)";
            e.currentTarget.style.color = "#C9972C";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(201,151,44,0.4)";
            e.currentTarget.style.color = "#9E5A4E";
          }}
        >
          Open Invitation
        </button>
      </div>

      {/* Minimal corner brackets */}
      {[
        { top: 18, left: 18, r: 0 },
        { top: 18, right: 18, r: 90 },
        { bottom: 18, right: 18, r: 180 },
        { bottom: 18, left: 18, r: 270 },
      ].map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          top: p.top, left: (p as any).left,
          right: (p as any).right, bottom: (p as any).bottom,
          width: 32, height: 32,
          transform: `rotate(${p.r}deg)`,
          opacity: 0.3,
        }}>
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M2 30 L2 8 C2 4.5 4.5 2 8 2 L30 2" stroke="#C9972C" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      ))}
    </div>
  );
}
