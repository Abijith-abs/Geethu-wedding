"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { MandalaDivider, OrnamentalCorner } from "@/components/svg/Decoratives";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function VenueSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(WEDDING.wedding.venue.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const features = [
    { icon: "🕐", label: "Muhurtham", value: `${WEDDING.wedding.muhurthamStart} – ${WEDDING.wedding.muhurthamEnd}` },
    { icon: "📅", label: "Date", value: `${WEDDING.wedding.day}, ${WEDDING.wedding.date}` },
    { icon: "📍", label: "Location", value: WEDDING.wedding.venue.city + ", Kerala" },
    { icon: "🛕", label: "Occasion", value: "Vivaha — Sacred Wedding" },
  ];

  return (
    <section
      id="venue"
      style={{
        padding: "100px 20px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Temple pattern bg */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(0deg, #C9972C 0, #C9972C 1px, transparent 0, transparent 60px),
          repeating-linear-gradient(90deg, #C9972C 0, #C9972C 1px, transparent 0, transparent 60px)`,
      }} />

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <motion.span variants={staggerItem} className="section-tag">The Venue</motion.span>
          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 300,
              color: "#9E5A4E",
            }}
          >
            Where It All{" "}
            <em style={{ fontStyle: "italic", color: "#C9972C" }}>Begins</em>
          </motion.h2>
          <motion.div variants={staggerItem}><MandalaDivider /></motion.div>
        </motion.div>

        {/* Main venue card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "#FFFBF7",
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid rgba(201,151,44,0.3)",
            boxShadow: "0 12px 60px rgba(196,120,106,0.12)",
            position: "relative",
          }}
        >
          {/* Gradient top border */}
          <div style={{
            height: 5,
            background: "linear-gradient(90deg, #C4786A, #C9972C, #E8C068, #C9972C, #C4786A)",
          }} />

          {/* Ornamental corners */}
          <OrnamentalCorner position="tl" size={50} />
          <OrnamentalCorner position="tr" size={50} />
          <OrnamentalCorner position="bl" size={50} />
          <OrnamentalCorner position="br" size={50} />

          <div style={{
            padding: "50px 50px 50px",
            display: "flex",
            flexWrap: "wrap",
            gap: 50,
            alignItems: "flex-start",
            justifyContent: "center",
          }}>
            {/* Left – venue info */}
            <div style={{ flex: "1 1 300px", maxWidth: 450 }}>
              <div style={{ fontSize: 48, marginBottom: 16, textAlign: "center" }}>🏛️</div>
              <h3 style={{
                fontFamily: "var(--font-cormorant, serif)",
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 500,
                color: "#9E5A4E",
                marginBottom: 10,
                lineHeight: 1.2,
                textAlign: "center",
              }}>
                {WEDDING.wedding.venue.name}
              </h3>

              <div style={{
                textAlign: "center",
                fontFamily: "var(--font-cormorant, serif)",
                fontSize: 17,
                color: "#C9972C",
                marginBottom: 24,
                fontStyle: "italic",
              }}>
                {WEDDING.wedding.venue.city}, Kerala
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button
                  onClick={copyAddress}
                  style={{
                    padding: "13px 20px",
                    border: "1px solid rgba(201,151,44,0.5)",
                    borderRadius: 6,
                    background: copied ? "rgba(201,151,44,0.12)" : "transparent",
                    color: copied ? "#9E5A4E" : "#C4786A",
                    fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
                    fontFamily: "var(--font-jost, sans-serif)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                >
                  {copied ? "✓ Copied!" : "📋 Copy Address"}
                </button>
                <a
                  href={WEDDING.wedding.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "13px 20px",
                    background: "linear-gradient(135deg, #C4786A, #9E5A4E)",
                    borderRadius: 6,
                    color: "#FFD700",
                    fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
                    fontFamily: "var(--font-jost, sans-serif)",
                    textAlign: "center",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "all 0.3s",
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(196,120,106,0.3)",
                  }}
                >
                  🗺️ Get Directions
                </a>
              </div>
            </div>

            {/* Right – feature grid */}
            <div style={{ flex: "1 1 300px", maxWidth: 420 }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}>
                {features.map(({ icon, label, value }) => (
                  <div key={label} style={{
                    padding: "20px 16px",
                    borderRadius: 8,
                    background: "rgba(201,151,44,0.05)",
                    border: "1px solid rgba(201,151,44,0.15)",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                    <div style={{
                      fontSize: 9, letterSpacing: 3, textTransform: "uppercase",
                      color: "#C9972C", marginBottom: 6, opacity: 0.8,
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-cormorant, serif)",
                      fontSize: 14, color: "#9E5A4E", lineHeight: 1.4,
                    }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative gold divider */}
              <div style={{
                margin: "24px 0 20px",
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(201,151,44,0.4), transparent)",
              }} />

              {/* Arrival note */}
              <div style={{
                padding: "16px 18px",
                background: "rgba(196,120,106,0.05)",
                borderRadius: 8,
                border: "1px solid rgba(196,120,106,0.12)",
                fontSize: 12,
                color: "var(--text-medium)",
                lineHeight: 1.8,
              }}>
                <strong style={{ color: "#9E5A4E" }}>📍 Reaching the Venue:</strong><br />
                Mynagappally is located in Kollam district, easily accessible from
                Karunagappally and Kollam town via NH-66.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
