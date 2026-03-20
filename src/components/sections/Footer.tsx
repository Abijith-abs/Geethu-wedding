"use client";

import { motion } from "framer-motion";
import { WEDDING, hashtag } from "@/lib/constants";
import { KolamSVG, OmSymbol } from "@/components/svg/Decoratives";

const NAV_LINKS = [
  { label: "Couple", href: "#couple" },
  { label: "Story", href: "#story" },
  { label: "Events", href: "#events" },
  { label: "Venue", href: "#venue" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
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
      {/* Subtle top border */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, #C9972C 30%, #C4786A 50%, #C9972C 70%, transparent)",
      }} />

      {/* Kolam background decoration */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%) scale(3)",
        opacity: 0.025, pointerEvents: "none",
      }}>
        <KolamSVG />
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
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

        {/* Monogram */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-great-vibes, cursive)",
            fontSize: "clamp(52px, 10vw, 88px)",
            color: "#C9972C",
            lineHeight: 1,
            margin: "0 0 8px",
          }}
        >
          Kichu &amp; Dathan
        </motion.h2>

        {/* Hashtag */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontSize: 13, letterSpacing: 4,
            color: "rgba(201,151,44,0.6)",
            textTransform: "uppercase",
            fontFamily: "var(--font-jost, sans-serif)",
            marginBottom: 12,
          }}
        >
          #{hashtag.replace("#", "")}
        </motion.p>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontSize: 16,
            fontFamily: "var(--font-cormorant, serif)",
            color: "rgba(255,253,208,0.5)",
            marginBottom: 48,
          }}
        >
          {WEDDING.wedding.date} · {WEDDING.wedding.venue.city}
        </motion.p>

        {/* Kolam dot nav */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: "flex", justifyContent: "center",
            gap: "clamp(12px, 3vw, 28px)", flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 6,
                textDecoration: "none",
              }}
            >
              {/* Kolam dot cluster */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 4px)", gap: 2 }}>
                {Array.from({ length: 9 }).map((_, j) => (
                  <div key={j} style={{
                    width: 4, height: 4, borderRadius: "50%",
                    background: j === 4 ? "#C9972C" : "rgba(201,151,44,0.3)",
                    boxShadow: j === 4 ? "0 0 4px rgba(201,151,44,0.6)" : "none",
                  }} />
                ))}
              </div>
              <span style={{
                fontSize: 9, letterSpacing: 2,
                textTransform: "uppercase",
                color: "rgba(201,151,44,0.5)",
                fontFamily: "var(--font-jost, sans-serif)",
              }}>
                {link.label}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div style={{
          height: 1, margin: "0 auto 32px",
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
          Made with love by the families of Kichu &amp; Dathan
        </p>

        <p style={{
          fontSize: 11, letterSpacing: 1,
          color: "rgba(255,253,208,0.2)",
          fontFamily: "var(--font-jost, sans-serif)",
          marginBottom: 32,
        }}>
          © {year} · All rights reserved
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
