"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MandalaDivider, JasmineSVG } from "@/components/svg/Decoratives";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function GiftSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const [giftHovered, setGiftHovered] = useState(false);
  const [blessingCopied, setBlessingCopied] = useState<string | null>(null);

  const blessings = [
    "May your love be the anchor that keeps you both grounded.",
    "Wishing you a lifetime of laughter, love, and shared dreams.",
    "May every day bring you closer and fill your hearts with joy.",
    "Here's to a beautiful beginning of a wonderful forever.",
  ];

  return (
    <section
      id="blessings"
      style={{
        padding: "100px 20px",
        background: "linear-gradient(180deg, #FAF7F3 0%, #FAF7F3 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Jasmine decoration */}
      <div style={{
        position: "absolute", left: -20, top: "20%", opacity: 0.06,
        transform: "scale(3)", pointerEvents: "none",
      }}>
        <JasmineSVG />
      </div>
      <div style={{
        position: "absolute", right: -20, bottom: "20%", opacity: 0.06,
        transform: "scale(3) scaleX(-1)", pointerEvents: "none",
      }}>
        <JasmineSVG />
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <motion.span variants={staggerItem} className="section-tag">With Good Wishes</motion.span>
          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 300,
              color: "#9E5A4E",
            }}
          >
            Gifts &amp;
            <br />
            <em style={{ fontStyle: "italic", color: "#C9972C" }}>Blessings</em>
          </motion.h2>
          <motion.div variants={staggerItem}>
            <MandalaDivider />
          </motion.div>
        </motion.div>

        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
          {/* Gift card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: "1 1 340px", maxWidth: 400,
              padding: "48px 36px",
              background: "#FFFBF7",
              border: "1px solid rgba(201,151,44,0.35)",
              borderRadius: 6,
              boxShadow: "0 4px 30px rgba(196,120,106,0.08)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 4,
              background: "linear-gradient(90deg, #C4786A, #C9972C, #C4786A)",
            }} />

            {/* Animated gift box */}
            <motion.div
              onHoverStart={() => setGiftHovered(true)}
              onHoverEnd={() => setGiftHovered(false)}
              animate={giftHovered
                ? { rotate: [0, -5, 5, -3, 3, 0], y: [0, -8, 0] }
                : { rotate: 0, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: 72, cursor: "default",
                display: "inline-block", marginBottom: 20,
                filter: giftHovered ? "drop-shadow(0 8px 20px rgba(201,151,44,0.5))" : "none",
                transition: "filter 0.3s",
              }}
            >
              🎁
            </motion.div>

            <h3 style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: 26, fontWeight: 500, color: "#9E5A4E", marginBottom: 12,
            }}>
              Your Presence is our Gift
            </h3>
            <p style={{
              fontSize: 14, color: "var(--text-medium)", lineHeight: 1.8, marginBottom: 24,
            }}>
              We truly feel blessed to have your love and support.
              Your presence at our celebration is the greatest gift we could ask for.
            </p>
            <p style={{
              fontSize: 13, color: "var(--text-medium)", lineHeight: 1.7,
              fontStyle: "italic",
            }}>
              However, if you wish to bless us with a gift, we are registered
              at our home address. Cash envelopes may be given at the reception.
            </p>
          </motion.div>

          {/* Digital blessings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              flex: "1 1 340px", maxWidth: 400,
              padding: "48px 36px",
              background: "linear-gradient(135deg, #1E1510, #1A100B)",
              border: "1px solid rgba(201,151,44,0.2)",
              borderRadius: 6,
              boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 4,
              background: "linear-gradient(90deg, #C9972C, #C4786A, #C9972C)",
            }} />

            <div style={{ fontSize: 48, marginBottom: 16 }}>🙏</div>

            <h3 style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: 26, fontWeight: 500, color: "#C9972C", marginBottom: 12,
            }}>
              Send Your Blessings
            </h3>
            <p style={{
              fontSize: 13, color: "rgba(255,253,208,0.65)", lineHeight: 1.8, marginBottom: 24,
            }}>
              Share a wish to warm the couple's hearts. Tap to copy &amp; share!
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {blessings.map((b, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    navigator.clipboard.writeText(b);
                    setBlessingCopied(b);
                    setTimeout(() => setBlessingCopied(null), 2000);
                  }}
                  style={{
                    padding: "12px 16px",
                    background: blessingCopied === b ? "rgba(201,151,44,0.2)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${blessingCopied === b ? "rgba(201,151,44,0.5)" : "rgba(201,151,44,0.15)"}`,
                    borderRadius: 4,
                    color: blessingCopied === b ? "#C9972C" : "rgba(255,253,208,0.75)",
                    fontSize: 12, lineHeight: 1.6,
                    fontFamily: "var(--font-jost, sans-serif)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex", alignItems: "center", gap: 10,
                  }}
                >
                  <span style={{ opacity: 0.5, fontSize: 14 }}>
                    {blessingCopied === b ? "✓" : "📋"}
                  </span>
                  {b}
                </motion.button>
              ))}
            </div>

            <p style={{
              marginTop: 20, fontSize: 10,
              color: "rgba(201,151,44,0.4)",
              letterSpacing: 2, textTransform: "uppercase",
              fontFamily: "var(--font-jost, sans-serif)",
            }}>
              Also leave a RSVP message above ↑
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
