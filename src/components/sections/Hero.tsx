"use client";

import { useEffect, useRef } from "react";
import { WEDDING } from "@/lib/constants";
import { GopuramSilhouette, KuthuvilakkuSVG } from "@/components/svg/Decoratives";
import Countdown from "./Countdown";

// ── 12-petal rotating mandala ─────────────────────────────────────────────────
function MandalaBg() {
  const petals12 = Array.from({ length: 12 }, (_, i) => i);
  const petals6  = Array.from({ length: 6  }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <circle cx="200" cy="200" r="194" stroke="#C9972C" strokeWidth="0.5" opacity="0.35" />
      <circle cx="200" cy="200" r="150" stroke="#C9972C" strokeWidth="0.3" opacity="0.25" />
      <circle cx="200" cy="200" r="106" stroke="#C9972C" strokeWidth="0.3" opacity="0.2" />
      <circle cx="200" cy="200" r="62"  stroke="#C9972C" strokeWidth="0.5" opacity="0.3" />
      {petals12.map((i) => {
        const a = i * 30 * Math.PI / 180;
        return <line key={i}
          x1={200 + 63  * Math.cos(a)} y1={200 + 63  * Math.sin(a)}
          x2={200 + 194 * Math.cos(a)} y2={200 + 194 * Math.sin(a)}
          stroke="#C9972C" strokeWidth="0.25" opacity="0.2" />;
      })}
      {petals12.map((i) => {
        const a  = i * 30 * Math.PI / 180;
        const cx = 200 + 150 * Math.cos(a);
        const cy = 200 + 150 * Math.sin(a);
        return <ellipse key={i} cx={cx} cy={cy} rx="11" ry="22"
          fill="#C9972C" opacity="0.1"
          transform={`rotate(${i * 30 + 90} ${cx} ${cy})`} />;
      })}
      {petals12.map((i) => {
        const a  = (i * 30 + 15) * Math.PI / 180;
        const cx = 200 + 106 * Math.cos(a);
        const cy = 200 + 106 * Math.sin(a);
        return <ellipse key={i} cx={cx} cy={cy} rx="7" ry="15"
          fill="#C9972C" opacity="0.13"
          transform={`rotate(${i * 30 + 105} ${cx} ${cy})`} />;
      })}
      {petals6.map((i) => {
        const a  = i * 60 * Math.PI / 180;
        const cx = 200 + 30 * Math.cos(a);
        const cy = 200 + 30 * Math.sin(a);
        return <ellipse key={i} cx={cx} cy={cy} rx="5" ry="11"
          fill="#C9972C" opacity="0.22"
          transform={`rotate(${i * 60 + 90} ${cx} ${cy})`} />;
      })}
      <circle cx="200" cy="200" r="8" stroke="#C9972C" strokeWidth="1" opacity="0.35" />
      <circle cx="200" cy="200" r="3" fill="#C9972C" opacity="0.4" />
    </svg>
  );
}

const PARTICLES = [
  { left: "10%",  top: "22%", big: true  },
  { left: "87%",  top: "32%", big: false },
  { left: "20%",  top: "70%", big: false },
  { left: "80%",  top: "62%", big: true  },
  { left: "50%",  top: "15%", big: false },
  { left: "35%",  top: "84%", big: false },
  { left: "68%",  top: "18%", big: true  },
];

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const handleScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // ── GSAP cinematic entrance timeline ────────────────────────────────
    import("gsap").then(({ gsap }) => {
      if (cancelled) return;

      gsap.set(".hero-scanline",   { top: "0%", opacity: 1 });
      gsap.set(".hero-badge",      { opacity: 0, y: -14 });
      gsap.set(".hero-corners",    { opacity: 0 });
      gsap.set(".hero-lamp",       { opacity: 0, y: 22, scale: 0.5 });
      gsap.set(".hero-bride-clip", { clipPath: "inset(0 0 0 100%)" });
      gsap.set(".hero-groom-clip", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".hero-amp",        { opacity: 0, scale: 0.3, rotation: -18 });
      gsap.set(".hero-malayalam",  { opacity: 0, y: 14 });
      gsap.set(".hero-divider",    { scaleX: 0 });
      gsap.set(".hero-date",       { opacity: 0, y: 10 });
      gsap.set(".hero-countdown",  { opacity: 0, y: 20 });
      gsap.set(".hero-scroll",     { opacity: 0 });
      gsap.set(".hero-mandala",    { opacity: 0 });
      gsap.set(".hero-particle",   { opacity: 0 });

      const tl = gsap.timeline();
      tl
        // Scanline sweeps top to bottom (film-load)
        .to(".hero-scanline",   { top: "106%", duration: 0.65, ease: "power2.inOut" }, 0.05)
        .to(".hero-scanline",   { opacity: 0, duration: 0.2 }, 0.65)
        // Mandala materialises
        .to(".hero-mandala",    { opacity: 0.18, duration: 2.5, ease: "power1.out" }, 0.2)
        // Top badge + corners
        .to(".hero-badge",      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.45)
        .to(".hero-corners",    { opacity: 0.45, duration: 0.6 }, 0.5)
        // Oil lamp lifts into place
        .to(".hero-lamp",       { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: "expo.out" }, 0.65)
        // Bride name wipes in (clip from left, right edge appears first)
        .to(".hero-bride-clip", { clipPath: "inset(0 0% 0 0%)", duration: 1.15, ease: "expo.out" }, 1.0)
        // Ampersand spins + scales in
        .to(".hero-amp",        { opacity: 1, scale: 1, rotation: 0, duration: 0.85, ease: "back.out(2.5)" }, 1.45)
        // Groom name wipes in (clip from right, left edge appears first)
        .to(".hero-groom-clip", { clipPath: "inset(0 0% 0 0%)", duration: 1.15, ease: "expo.out" }, 1.65)
        // Malayalam script
        .to(".hero-malayalam",  { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 2.3)
        // Gold divider expands
        .to(".hero-divider",    { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 2.65)
        // Date block
        .to(".hero-date",       { opacity: 1, y: 0, duration: 0.55 }, 3.1)
        // Countdown
        .to(".hero-countdown",  { opacity: 1, y: 0, duration: 0.65 }, 3.5)
        // Scroll hint
        .to(".hero-scroll",     { opacity: 1, duration: 0.5 }, 4.1)
        // Firefly particles stagger in
        .to(".hero-particle",   { opacity: 1, duration: 1.2, stagger: 0.18 }, 1.2);

      // Mandala slow spin (continuous)
      gsap.to(".hero-mandala", {
        rotation: 360, duration: 120, ease: "none",
        repeat: -1, transformOrigin: "center center", delay: 1,
      });

      // Fireflies float up/down (yoyo)
      gsap.to(".hero-particle", {
        y: "-55px", duration: 3.2, ease: "power1.inOut",
        stagger: { each: 0.45, repeat: -1, yoyo: true }, delay: 2,
      });
    });

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", handleScroll);
    };
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
      {/* Parallax background */}
      <div ref={bgRef} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 55%, #1E1510 0%, #150E0A 55%, #0C0806 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: "repeating-linear-gradient(45deg, #C9972C 0px, #C9972C 1px, transparent 0px, transparent 40%)",
          backgroundSize: "18px 18px",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 40%, rgba(201,151,44,0.07) 0%, transparent 55%)",
        }} />
      </div>

      {/* Golden scanline (film-load sweep) */}
      <div className="hero-scanline" style={{
        position: "absolute", left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent 2%, rgba(201,151,44,0.65) 20%, #C9972C 50%, rgba(201,151,44,0.65) 80%, transparent 98%)",
        boxShadow: "0 0 14px rgba(201,151,44,0.5), 0 0 36px rgba(201,151,44,0.18)",
        zIndex: 20, pointerEvents: "none",
      }} />

      {/* Rotating mandala ring */}
      <div className="hero-mandala" style={{
        position: "absolute",
        width: "min(720px, 92vw)", height: "min(720px, 92vw)",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2, pointerEvents: "none",
      }}>
        <MandalaBg />
      </div>

      {/* Firefly particles */}
      {PARTICLES.map((p, i) => (
        <div key={i} className="hero-particle" style={{
          position: "absolute", left: p.left, top: p.top,
          width: p.big ? 4 : 2.5, height: p.big ? 4 : 2.5,
          borderRadius: "50%", background: "#C9972C",
          boxShadow: `0 0 ${p.big ? 9 : 5}px rgba(201,151,44,0.75)`,
          zIndex: 3, pointerEvents: "none",
        }} />
      ))}

      {/* Gopuram silhouette */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        zIndex: 2, opacity: 0.3, pointerEvents: "none",
      }}>
        <GopuramSilhouette />
      </div>

      {/* Bead toran top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 3, pointerEvents: "none" }}>
        <div style={{
          height: 1,
          background: "linear-gradient(90deg, transparent 4%, rgba(201,151,44,0.4) 25%, rgba(201,151,44,0.5) 50%, rgba(201,151,44,0.4) 75%, transparent 96%)",
        }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          {Array.from({ length: 48 }, (_, i) => {
            const isAccent = i % 8 === 0;
            const isMid    = i % 4 === 2;
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 1, height: isAccent ? 22 : isMid ? 15 : 9,
                  background: `rgba(201,151,44,${isAccent ? 0.5 : 0.28})`,
                }} />
                <div style={{
                  width: isAccent ? 5 : 3, height: isAccent ? 5 : 3,
                  borderRadius: "50%", background: "#C9972C",
                  opacity: isAccent ? 0.6 : 0.3,
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Corner ornaments */}
      {([
        { top: 16, left: 16, deg: 0 },
        { top: 16, right: 16, deg: 90 },
        { bottom: 16, right: 16, deg: 180 },
        { bottom: 16, left: 16, deg: 270 },
      ] as Array<{ top?: number; bottom?: number; left?: number; right?: number; deg: number }>).map((c, i) => (
        <div key={i} className="hero-corners" style={{
          position: "absolute",
          top: c.top, left: c.left, right: c.right, bottom: c.bottom,
          width: 80, height: 80, zIndex: 4, pointerEvents: "none",
        }}>
          <svg viewBox="0 0 80 80" fill="none" style={{ transform: `rotate(${c.deg}deg)` }}>
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
        padding: "80px 20px 130px",
        maxWidth: 1040, width: "100%",
      }}>
        {/* Auspicious badge */}
        <div className="hero-badge" style={{
          fontSize: 10, letterSpacing: 8, textTransform: "uppercase",
          color: "rgba(201,151,44,0.6)", marginBottom: 28,
        }}>
          ॐ &nbsp;&middot;&nbsp; शुभ विवाह &nbsp;&middot;&nbsp; OM
        </div>

        {/* Oil lamp */}
        <div className="hero-lamp" style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ animation: "floatGentle 4s ease-in-out infinite" }}>
            <KuthuvilakkuSVG size={54} />
          </div>
        </div>

        {/* BRIDE NAME — right-aligned, clips in from left */}
        <div style={{ overflow: "hidden" }}>
          <div className="hero-bride-clip">
            <h1 style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(56px, 15vw, 148px)",
              fontWeight: 300, lineHeight: 0.85, margin: 0,
              letterSpacing: "clamp(2px, 1.5vw, 14px)",
              color: "#FFFBF7",
              textAlign: "right",
              paddingRight: "clamp(8px, 5vw, 90px)",
            }}>
              {WEDDING.bride.nickname}
            </h1>
          </div>
        </div>

        {/* AMPERSAND — centred, bounces in */}
        <div className="hero-amp" style={{
          fontFamily: "var(--font-great-vibes, cursive)",
          fontSize: "clamp(46px, 11vw, 112px)",
          color: "#C9972C",
          lineHeight: 1,
          textShadow: "0 0 45px rgba(201,151,44,0.32)",
          margin: "clamp(-10px, -1.8vw, -18px) 0",
        }}>
          &amp;
        </div>

        {/* GROOM NAME — left-aligned, clips in from right */}
        <div style={{ overflow: "hidden" }}>
          <div className="hero-groom-clip">
            <h1 style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(56px, 15vw, 148px)",
              fontWeight: 300, lineHeight: 0.85, margin: 0,
              letterSpacing: "clamp(2px, 1.5vw, 14px)",
              color: "#FFFBF7",
              textAlign: "left",
              paddingLeft: "clamp(8px, 5vw, 90px)",
            }}>
              {WEDDING.groom.nickname}
            </h1>
          </div>
        </div>

        {/* Malayalam names */}
        <div className="hero-malayalam" style={{
          fontFamily: "var(--font-cormorant, serif)",
          fontSize: "clamp(13px, 2.4vw, 19px)",
          color: "rgba(201,151,44,0.5)",
          letterSpacing: 3, marginTop: 22,
          fontStyle: "italic",
        }}>
          {WEDDING.wedding.day} &nbsp;&middot;&nbsp; {WEDDING.wedding.date}
        </div>

        {/* Gold divider */}
        <div className="hero-divider" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 14, margin: "22px auto", transformOrigin: "center",
        }}>
          <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, transparent, #C9972C)" }} />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => {
              const a = i * 60 * Math.PI / 180;
              return <ellipse key={i}
                cx={10 + 5 * Math.cos(a)} cy={10 + 5 * Math.sin(a)} rx="2" ry="4"
                transform={`rotate(${i * 60} ${10 + 5 * Math.cos(a)} ${10 + 5 * Math.sin(a)})`}
                fill="#C9972C" opacity="0.6" />;
            })}
            <circle cx="10" cy="10" r="2" fill="#C4786A" />
          </svg>
          <div style={{ width: 80, height: 1, background: "linear-gradient(90deg, #C9972C, transparent)" }} />
        </div>

        {/* Date & venue */}
        <div className="hero-date" style={{ marginBottom: 38 }}>
          <div style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontSize: "clamp(13px, 2vw, 20px)",
            fontWeight: 400, letterSpacing: "clamp(4px, 1.5vw, 8px)",
            color: "#C9972C", textTransform: "uppercase", marginBottom: 6,
          }}>
            {WEDDING.wedding.date}
          </div>
          <div style={{
            fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
            color: "rgba(255,253,208,0.5)", lineHeight: 2,
          }}>
            Muhurtham · {WEDDING.wedding.muhurthamStart} – {WEDDING.wedding.muhurthamEnd}
          </div>
          <div style={{
            fontSize: 10, letterSpacing: 3, color: "rgba(255,253,208,0.35)", marginTop: 4,
          }}>
            {WEDDING.wedding.venue.name} · {WEDDING.wedding.venue.city}
          </div>
        </div>

        {/* Countdown */}
        <div className="hero-countdown">
          <Countdown />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" style={{
        position: "absolute", bottom: 30, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 8, zIndex: 5,
      }}>
        <span style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "rgba(255,253,208,0.35)" }}>
          Scroll
        </span>
        <div style={{
          width: 1, height: 50,
          background: "linear-gradient(180deg, rgba(201,151,44,0.6), transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}
