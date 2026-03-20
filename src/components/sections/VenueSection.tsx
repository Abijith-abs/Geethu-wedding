"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { MandalaDivider } from "@/components/svg/Decoratives";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";

export default function VenueSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);
  const [compassActive, setCompassActive] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(WEDDING.wedding.venue.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

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

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
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
              color: "#0D3D24",
            }}
          >
            Where It All<br />
            <em style={{ fontStyle: "italic", color: "#C9972C" }}>Begins</em>
          </motion.h2>
          <motion.div variants={staggerItem}>
            <MandalaDivider />
          </motion.div>
        </motion.div>

        <div style={{ display: "flex", gap: 50, flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start" }}>
          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: "1 1 400px",
              maxWidth: 560,
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid rgba(201,151,44,0.3)",
              boxShadow: "0 8px 50px rgba(19,78,52,0.12)",
              position: "relative",
            }}
          >
            {/* Gold top border */}
            <div style={{
              height: 4,
              background: "linear-gradient(90deg, #1B5538, #C9972C, #1B5538)",
            }} />
            <iframe
              src={WEDDING.wedding.venue.googleMapsEmbed}
              width="100%"
              height="380"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding venue map"
            />
          </motion.div>

          {/* Venue info card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: "1 1 300px",
              maxWidth: 420,
              padding: "40px 36px",
              background: "#FDF8EF",
              border: "1px solid rgba(201,151,44,0.3)",
              borderRadius: 6,
              position: "relative",
              boxShadow: "0 4px 30px rgba(19,78,52,0.08)",
            }}
          >
            {/* Decorative top */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 4,
              background: "linear-gradient(90deg, #1B5538, #C9972C, #1B5538)",
              borderRadius: "6px 6px 0 0",
            }} />

            {/* Temple icon */}
            <div style={{ fontSize: 48, marginBottom: 16, textAlign: "center" }}>🏛️</div>

            <h3 style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: 26, fontWeight: 500,
              color: "#0D3D24", marginBottom: 8, lineHeight: 1.2,
            }}>
              {WEDDING.wedding.venue.name}
            </h3>

            <p style={{
              fontSize: 13, lineHeight: 1.8, color: "var(--text-medium)", marginBottom: 20,
            }}>
              {WEDDING.wedding.venue.address}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Copy address button */}
              <button
                onClick={copyAddress}
                style={{
                  padding: "12px 20px",
                  border: "1px solid rgba(201,151,44,0.5)",
                  borderRadius: 3,
                  background: copied ? "rgba(201,151,44,0.15)" : "transparent",
                  color: copied ? "#0D3D24" : "#1B5538",
                  fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
                  fontFamily: "var(--font-jost, sans-serif)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                {copied ? "✓ Copied!" : "📋 Copy Address"}
              </button>

              {/* Directions button */}
              <a
                href={WEDDING.wedding.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "12px 20px",
                  background: "linear-gradient(135deg, #1B5538, #0D3D24)",
                  borderRadius: 3,
                  color: "#C9972C",
                  fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
                  fontFamily: "var(--font-jost, sans-serif)",
                  textAlign: "center",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "all 0.3s",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(19,78,52,0.3)",
                }}
                onMouseEnter={e => { (e.currentTarget).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget).style.transform = "translateY(0)"; }}
              >
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  style={{ animation: compassActive ? "spinSlow 2s linear infinite" : "none" }}
                  onMouseEnter={() => setCompassActive(true)}
                  onMouseLeave={() => setCompassActive(false)}
                >
                  <circle cx="12" cy="12" r="10" stroke="#C9972C" strokeWidth="1.5" />
                  <path d="M16.24 7.76L14.12 14.12L7.76 16.24L9.88 9.88L16.24 7.76Z" stroke="#C9972C" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="1.5" fill="#C9972C" />
                </svg>
                Get Directions
              </a>
            </div>

            {/* Distance info */}
            <div style={{
              marginTop: 24, padding: "14px 16px",
              background: "rgba(19,78,52,0.04)",
              borderRadius: 4,
              fontSize: 12, color: "var(--text-medium)", lineHeight: 1.8,
            }}>
              <strong style={{ color: "#0D3D24" }}>🛫 Outstation Guests:</strong><br />
              Nearest airport: Madurai Airport (IXM) — 12 km<br />
              Nearest railway: Madurai Junction — 3 km<br />
              Recommended hotels: Hotel Heritage Madurai, Grand Central
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
