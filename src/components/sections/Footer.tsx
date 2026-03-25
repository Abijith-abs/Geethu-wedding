"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { KolamSVG, OmSymbol } from "@/components/svg/Decoratives";

const NAV_LINKS = [
  { label: "Couple", href: "#couple" },
  { label: "Event", href: "#events" },
  { label: "Venue", href: "#venue" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #1E1510, #120C08)",
        padding: "80px 20px 40px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Top border */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, #C9972C 30%, #C4786A 50%, #C9972C 70%, transparent)",
      }} />

      {/* Kolam background */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%) scale(3)",
        opacity: 0.025, pointerEvents: "none",
      }}>
        <KolamSVG />
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Om symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 24 }}
        >
          <OmSymbol />
        </motion.div>

        {/* Couple names monogram */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-great-vibes, cursive)",
            fontSize: "clamp(48px, 10vw, 86px)",
            color: "#C9972C",
            lineHeight: 1,
            margin: "0 0 8px",
          }}
        >
          {WEDDING.bride.firstName} &amp; {WEDDING.groom.firstName}
        </motion.h2>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontSize: 14,
            fontFamily: "var(--font-cormorant, serif)",
            color: "rgba(255,253,208,0.5)",
            marginBottom: 8,
            letterSpacing: 2,
          }}
        >
          {WEDDING.wedding.day}, {WEDDING.wedding.date}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.32 }}
          style={{
            fontSize: 12, letterSpacing: 4,
            color: "rgba(201,151,44,0.5)",
            textTransform: "uppercase",
            marginBottom: 48,
          }}
        >
          {WEDDING.wedding.venue.name} · {WEDDING.wedding.venue.city}
        </motion.p>

        {/* Compliments from section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            marginBottom: 48,
            padding: "28px 32px",
            border: "1px solid rgba(201,151,44,0.2)",
            borderRadius: 8,
            background: "rgba(201,151,44,0.04)",
          }}
        >
          <div style={{
            fontSize: 9, letterSpacing: 5, textTransform: "uppercase",
            color: "rgba(201,151,44,0.6)", marginBottom: 16,
          }}>
            With Love &amp; Compliments from
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(20px, 4vw, 40px)",
            flexWrap: "wrap",
          }}>
            {WEDDING.complimentsFrom.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                style={{ textAlign: "center" }}
              >
                {/* Dot cluster */}
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(3, 5px)",
                  gap: 3, margin: "0 auto 8px", width: "fit-content",
                }}>
                  {Array.from({ length: 9 }).map((_, j) => (
                    <div key={j} style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: j === 4 ? "#C9972C" : "rgba(201,151,44,0.3)",
                      boxShadow: j === 4 ? "0 0 5px rgba(201,151,44,0.6)" : "none",
                    }} />
                  ))}
                </div>
                <span style={{
                  fontFamily: "var(--font-cormorant, serif)",
                  fontSize: "clamp(14px, 2.5vw, 18px)",
                  color: "rgba(255,253,208,0.75)",
                  fontStyle: "italic",
                  letterSpacing: 1,
                }}>
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Nav links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: "flex", justifyContent: "center",
            gap: "clamp(16px, 4vw, 36px)", flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
                color: "rgba(201,151,44,0.5)",
                fontFamily: "var(--font-jost, sans-serif)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div style={{
          height: 1, margin: "0 auto 28px",
          maxWidth: 300,
          background: "linear-gradient(90deg, transparent, rgba(201,151,44,0.3), transparent)",
        }} />

        {/* Love message */}
        <p style={{
          fontFamily: "var(--font-great-vibes, cursive)",
          fontSize: 22,
          color: "rgba(201,151,44,0.7)",
          marginBottom: 8,
        }}>
          Made with love &mdash; {WEDDING.bride.firstName} &amp; {WEDDING.groom.firstName}
        </p>

        <p style={{
          fontSize: 11, letterSpacing: 1,
          color: "rgba(255,253,208,0.2)",
          fontFamily: "var(--font-jost, sans-serif)",
          marginBottom: 32,
        }}>
          &copy; {year} · All rights reserved
        </p>

        {/* Back to top */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -4, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "transparent",
            border: "1px solid rgba(201,151,44,0.3)",
            borderRadius: "50%",
            width: 52, height: 52,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto",
            cursor: "pointer",
            color: "#C9972C",
            fontSize: 20,
            transition: "all 0.3s",
          }}
          title="Back to top"
        >
          🪔
        </motion.button>
        <p style={{
          marginTop: 8, fontSize: 9,
          letterSpacing: 3, textTransform: "uppercase",
          color: "rgba(201,151,44,0.3)",
          fontFamily: "var(--font-jost, sans-serif)",
        }}>
          Back to top
        </p>
      </div>
    </footer>
  );
}
