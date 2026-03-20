"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { WEDDING } from "@/lib/constants";
import { MandalaDivider, OrnamentalCorner } from "@/components/svg/Decoratives";
import { fadeUp, slideLeft, slideRight, staggerContainer, staggerItem } from "@/lib/animations";

function NakshatraStars({ count = 6 }: { count?: number }) {
  return (
    <div style={{ position: "relative", height: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{
          width: i === Math.floor(count / 2) ? 8 : 5,
          height: i === Math.floor(count / 2) ? 8 : 5,
          borderRadius: "50%",
          background: i === Math.floor(count / 2) ? "#C9972C" : "rgba(201,151,44,0.4)",
          animation: `glowPulse ${1 + i * 0.3}s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </div>
  );
}

function PersonCard({
  person,
  side,
  parents,
}: {
  person: typeof WEDDING.bride | typeof WEDDING.groom;
  side: "bride" | "groom";
  parents: { father: string; mother: string };
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const variant = side === "bride" ? slideLeft : slideRight;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variant}
      style={{
        flex: 1,
        minWidth: 280,
        maxWidth: 420,
        textAlign: "center",
        padding: "40px 20px",
        position: "relative",
      }}
    >
      {/* Ornamental border lines */}
      <div style={{
        position: "absolute", inset: 0,
        border: "1px solid rgba(201,151,44,0.15)",
        borderRadius: 4,
        pointerEvents: "none",
      }} />
      <OrnamentalCorner position="tl" size={44} />
      <OrnamentalCorner position="tr" size={44} />
      <OrnamentalCorner position="bl" size={44} />
      <OrnamentalCorner position="br" size={44} />

      {/* Role label */}
      <div style={{
        fontSize: 9, letterSpacing: 6, textTransform: "uppercase",
        color: "#C9972C", opacity: 0.7, marginBottom: 20,
      }}>
        {side === "bride" ? "The Bride" : "The Groom"}
      </div>

      {/* Circular photo frame */}
      <div style={{
        width: 180, height: 180, borderRadius: "50%",
        margin: "0 auto 24px",
        position: "relative",
        padding: 4,
        background: "linear-gradient(135deg, #C9972C, #C4786A, #C9972C)",
        animation: "glowPulse 3s ease-in-out infinite",
      }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: "50%",
          overflow: "hidden", position: "relative",
          background: "#2c1a1a",
        }}>
          <Image
            src={person.photo}
            alt={`${person.firstName} ${person.lastName}`}
            fill
            style={{ objectFit: "cover" }}
            sizes="180px"
          />
        </div>
        {/* Gold ring orbiting decoration */}
        <div style={{
          position: "absolute", inset: -8, borderRadius: "50%",
          border: "1px dashed rgba(201,151,44,0.3)",
          animation: "spinSlow 20s linear infinite",
        }} />
        {/* Dot on the ring */}
        <div style={{
          position: "absolute", top: -4, left: "50%",
          width: 8, height: 8, borderRadius: "50%",
          background: "#C9972C",
          transform: "translateX(-50%)",
        }} />
      </div>

      {/* Name */}
      <h2 style={{
        fontFamily: "var(--font-cormorant, serif)",
        fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: 400,
        color: "#9E5A4E",
        letterSpacing: 2,
        marginBottom: 4,
      }}>
        {person.firstName}
      </h2>

      {/* Malayalam name */}
      <div style={{
        fontFamily: "var(--font-malayalam, serif)",
        fontSize: 16,
        color: "#C9972C",
        opacity: 0.8,
        marginBottom: 8,
        letterSpacing: 2,
      }}>
        {person.tamilName}
      </div>

      {/* Nakshatram */}
      <NakshatraStars count={7} />
      <div style={{ fontSize: 10, letterSpacing: 3, color: "var(--text-light)", textTransform: "uppercase", marginBottom: 4 }}>
        {person.nakshatram} · {person.rashi}
      </div>

      {/* Bio with typewriter */}
      <p style={{
        fontSize: 13,
        lineHeight: 1.8,
        color: "var(--text-medium)",
        maxWidth: 300,
        margin: "16px auto 20px",
        fontStyle: "italic",
      }}>
        &ldquo;{person.bio}&rdquo;
      </p>

      {/* Parents */}
      <div style={{
        padding: "14px 20px",
        background: "rgba(201,151,44,0.06)",
        borderTop: "1px solid rgba(201,151,44,0.15)",
        borderRadius: "0 0 4px 4px",
        marginTop: "auto",
      }}>
        <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#C9972C", marginBottom: 6 }}>
          Daughter / Son of
        </div>
        <div style={{ fontSize: 13, color: "var(--text-medium)", lineHeight: 1.6 }}>
          {parents.father}<br />&amp; {parents.mother}
        </div>
      </div>
    </motion.div>
  );
}

export default function CoupleSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      id="couple"
      style={{
        padding: "100px 20px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background mandala */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600, opacity: 0.04,
        pointerEvents: "none",
        animation: "spinSlow 60s linear infinite",
      }}>
        <svg viewBox="0 0 600 600" fill="none">
          {Array.from({ length: 24 }, (_, i) => {
            const a = i * 15 * Math.PI / 180;
            return <ellipse key={i} cx={300 + 240 * Math.cos(a)} cy={300 + 240 * Math.sin(a)}
              rx="20" ry="60"
              transform={`rotate(${i * 15} ${300 + 240 * Math.cos(a)} ${300 + 240 * Math.sin(a)})`}
              fill="#C9972C" />;
          })}
          <circle cx="300" cy="300" r="60" fill="#C4786A" />
        </svg>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <motion.span variants={staggerItem} className="section-tag">The Couple</motion.span>
          <motion.h2 variants={staggerItem} style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 300,
            color: "#9E5A4E",
            lineHeight: 1.1,
          }}>
            Two Souls,<br />
            <em style={{ fontStyle: "italic", color: "#C9972C" }}>One Destiny</em>
          </motion.h2>
          <motion.div variants={staggerItem}>
            <MandalaDivider />
          </motion.div>
        </motion.div>

        {/* Person cards + center symbol */}
        <div className="couple-flex" style={{
          display: "flex",
          gap: 40,
          alignItems: "stretch",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <PersonCard
            person={WEDDING.bride}
            side="bride"
            parents={WEDDING.parents.bride}
          />

          {/* Center connector */}
          <div className="couple-connector" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            minWidth: 60,
            padding: "40px 0",
          }}>
            <div style={{ width: 1, flex: 1, background: "linear-gradient(180deg, transparent, #C9972C)" }} />
            <div style={{
              fontFamily: "var(--font-great-vibes, cursive)",
              fontSize: 48,
              color: "#C9972C",
              textShadow: "0 0 20px rgba(201,151,44,0.4)",
            }}>
              &amp;
            </div>
            {/* Infinity / heart connector */}
            <svg width="50" height="30" viewBox="0 0 50 30" fill="none" aria-hidden="true">
              <path d="M25 15 C25 15 8 0 8 12 C8 20 16 20 25 15 C34 20 42 20 42 12 C42 0 25 15 25 15Z"
                fill="#C4786A" opacity="0.4" />
            </svg>
            <div style={{ width: 1, flex: 1, background: "linear-gradient(180deg, #C9972C, transparent)" }} />
          </div>

          <PersonCard
            person={WEDDING.groom}
            side="groom"
            parents={WEDDING.parents.groom}
          />
        </div>
      </div>
    </section>
  );
}
