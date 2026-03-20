"use client";

import { useEffect, useRef } from "react";
import { KolamSVG, KuthuvilakkuSVG, OmSymbol } from "@/components/svg/Decoratives";
import { WEDDING } from "@/lib/constants";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    let cancelled = false;
    import("gsap").then(({ gsap }) => {
      if (cancelled) return;
      const el = preloaderRef.current;
      if (!el) return;

      const tl = gsap.timeline({
        onComplete: () => {
          if (!cancelled) onComplete();
        },
      });

      // Phase 1: Lamp flickers to life
      tl.set(".pre-lamp", { opacity: 0, scale: 0.7 })
        .set(".pre-flame", { opacity: 0, scale: 0 })
        .set(".pre-glow", { opacity: 0, scale: 0 })
        .set(".pre-kolam", { opacity: 0 })
        .set(".pre-om", { opacity: 0, scale: 0.5 })
        .set(".pre-names", { opacity: 0, y: 30 })
        .set(".pre-tagline", { opacity: 0, y: 20 })
        .set(".pre-enter-btn", { opacity: 0, y: 20 })
        .set(".pre-door-left", { opacity: 1, rotationY: 0 })
        .set(".pre-door-right", { opacity: 1, rotationY: 0 })

        // Lamp scales in
        .to(".pre-lamp", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }, 0.3)

        // Flame flickers on
        .to(".pre-flame", { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, 0.9)
        .to(".pre-glow", { opacity: 1, scale: 1.5, duration: 0.6, ease: "power2.out" }, 1.0)

        // Kolam draws around lamp
        .to(".pre-kolam", { opacity: 1, duration: 0.3 }, 1.3)

        // OM / Sri symbol fades in
        .to(".pre-om", { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" }, 2.5)

        // Names appear
        .to(".pre-names", { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 3.2)
        .to(".pre-tagline", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 3.9)
        .to(".pre-enter-btn", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 4.3);
    });

    return () => { cancelled = true; };
  }, [onComplete]);

  const handleEnter = () => {
    import("gsap").then(({ gsap }) => {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      tl.to(".pre-enter-btn", { opacity: 0, duration: 0.3 })
        .to(".pre-door-left", {
          rotationY: -90,
          duration: 1.0,
          ease: "power2.inOut",
          transformOrigin: "left center",
          transformPerspective: 1200,
        }, 0.2)
        .to(".pre-door-right", {
          rotationY: 90,
          duration: 1.0,
          ease: "power2.inOut",
          transformOrigin: "right center",
          transformPerspective: 1200,
        }, 0.2)
        .to(preloaderRef.current, { opacity: 0, duration: 0.5 }, 0.8);
    });
  };

  return (
    <div
      ref={preloaderRef}
      id="preloader"
      style={{ position: "fixed", inset: 0, zIndex: 10000, background: "#040F09", overflow: "hidden" }}
    >
      {/* Temple door left */}
      <div
        ref={doorLeftRef}
        className="pre-door-left"
        style={{
          position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
          background: "linear-gradient(135deg, #071E13 0%, #0C2918 100%)",
          zIndex: 10, transformOrigin: "left center",
          borderRight: "1px solid rgba(201,151,44,0.2)",
        }}
      >
        {/* Door pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: "repeating-linear-gradient(0deg, #C9972C 0, #C9972C 1px, transparent 0, transparent 50%)",
          backgroundSize: "30px 30px",
        }} />
        <div style={{
          position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
          width: 24, height: 24, borderRadius: "50%",
          background: "#C9972C", opacity: 0.6, marginRight: 8,
        }} />
      </div>

      {/* Temple door right */}
      <div
        ref={doorRightRef}
        className="pre-door-right"
        style={{
          position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
          background: "linear-gradient(225deg, #071E13 0%, #0C2918 100%)",
          zIndex: 10, transformOrigin: "right center",
          borderLeft: "1px solid rgba(201,151,44,0.2)",
        }}
      >
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: "repeating-linear-gradient(0deg, #C9972C 0, #C9972C 1px, transparent 0, transparent 50%)",
          backgroundSize: "30px 30px",
        }} />
        <div style={{
          position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
          width: 24, height: 24, borderRadius: "50%",
          background: "#C9972C", opacity: 0.6, marginLeft: 8,
        }} />
      </div>

      {/* Background glow */}
      <div
        className="pre-glow"
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,165,0,0.15) 0%, rgba(255,69,0,0.05) 50%, transparent 70%)",
          opacity: 0, zIndex: 1,
        }}
      />

      {/* Kolam pattern */}
      <div
        className="pre-kolam"
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0, zIndex: 2,
        }}
      >
        <KolamSVG size={320} animated />
      </div>

      {/* Content center */}
      <div style={{
        position: "relative", zIndex: 5,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        height: "100%", gap: 0,
      }}>
        {/* OM symbol */}
        <div className="pre-om" style={{ marginBottom: 8 }}>
          <OmSymbol size={50} />
        </div>

        {/* Lamp + Flame */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <div className="pre-lamp">
            <KuthuvilakkuSVG size={70} />
          </div>
          <div className="pre-flame" style={{
            position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
          }}>
            {/* Extra glow */}
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,200,0,0.4) 0%, transparent 70%)",
              animation: "glowPulse 1.5s ease-in-out infinite",
            }} />
          </div>
        </div>

        {/* Couple names */}
        <div className="pre-names" style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{
            fontFamily: "var(--font-great-vibes, cursive)",
            fontSize: 16, color: "#C9972C", letterSpacing: 3,
            marginBottom: 4, opacity: 0.8,
          }}>
            Together with their families
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)",
              fontSize: "clamp(36px, 8vw, 64px)",
              fontWeight: 300, color: "#F5F3EC", letterSpacing: 4,
            }}>
              {WEDDING.bride.nickname}
            </span>
            <span style={{
              fontFamily: "var(--font-great-vibes, cursive)",
              fontSize: "clamp(28px, 6vw, 48px)",
              color: "#C9972C",
            }}>
              &amp;
            </span>
            <span style={{
              fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)",
              fontSize: "clamp(36px, 8vw, 64px)",
              fontWeight: 300, color: "#F5F3EC", letterSpacing: 4,
            }}>
              {WEDDING.groom.nickname}
            </span>
          </div>
          <div style={{
            fontFamily: "var(--font-malayalam, serif)",
            fontSize: 18, color: "#C9972C",
            opacity: 0.7, marginTop: 4, letterSpacing: 2,
          }}>
            {WEDDING.bride.tamilName} &amp; {WEDDING.groom.tamilName}
          </div>
        </div>

        {/* Tagline */}
        <div className="pre-tagline" style={{
          fontSize: 10, letterSpacing: 8, textTransform: "uppercase",
          color: "rgba(201,151,44,0.6)", marginBottom: 36,
        }}>
          February 14, 2027 · Madurai
        </div>

        {/* Enter button */}
        <button
          className="pre-enter-btn"
          onClick={handleEnter}
          style={{
            padding: "14px 40px",
            border: "1px solid rgba(201,151,44,0.6)",
            background: "transparent",
            color: "#C9972C",
            fontSize: 11,
            letterSpacing: 6,
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "var(--font-jost, sans-serif)",
            transition: "all 0.3s",
            borderRadius: 2,
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={e => {
            (e.target as HTMLButtonElement).style.background = "rgba(201,151,44,0.1)";
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(201,151,44,0.2)";
          }}
          onMouseLeave={e => {
            (e.target as HTMLButtonElement).style.background = "transparent";
            (e.target as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          🎵 Enter &amp; Play Music
        </button>
      </div>

      {/* Corner decorations */}
      {["top:0;left:0", "top:0;right:0", "bottom:0;left:0", "bottom:0;right:0"].map((pos, i) => {
        const [v, h] = pos.split(";");
        const rotations = [0, 90, 270, 180];
        return (
          <div key={i} style={{
            position: "absolute",
            [v.split(":")[0]]: v.split(":")[1],
            [h.split(":")[0]]: h.split(":")[1],
            width: 120, height: 120, opacity: 0.25, zIndex: 1,
            transform: `rotate(${rotations[i]}deg)`,
          }}>
            <svg viewBox="0 0 120 120" fill="none">
              <path d="M5 115 L5 25 C5 14 14 5 25 5 L115 5" stroke="#C9972C" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M5 115 L5 45 C5 24 24 5 45 5 L115 5" stroke="#C9972C" strokeWidth="0.5" opacity="0.4" strokeLinecap="round" />
              <circle cx="14" cy="14" r="6" stroke="#C9972C" strokeWidth="1.5" />
              <circle cx="14" cy="14" r="2.5" fill="#C9972C" opacity="0.5" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
