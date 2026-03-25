"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { MandalaDivider, OrnamentalCorner, KuthuvilakkuSVG } from "@/components/svg/Decoratives";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";

export default function EventsSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });

  const details = [
    { icon: "📅", label: "Date", value: `${WEDDING.wedding.day}, ${WEDDING.wedding.date}` },
    { icon: "🕐", label: "Muhurtham", value: `${WEDDING.wedding.muhurthamStart} – ${WEDDING.wedding.muhurthamEnd}` },
    { icon: "📍", label: "Venue", value: WEDDING.wedding.venue.name },
    { icon: "🗺️", label: "Location", value: WEDDING.wedding.venue.city },
  ];

  return (
    <section
      id="events"
      style={{
        padding: "100px 20px",
        background: "linear-gradient(180deg, var(--bg), #FAF0E6, var(--bg))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative top/bottom bands */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: "linear-gradient(90deg, var(--maroon), var(--gold), var(--vermillion), var(--gold), var(--maroon))",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 4,
        background: "linear-gradient(90deg, var(--maroon), var(--gold), var(--vermillion), var(--gold), var(--maroon))",
      }} />

      {/* Background pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(45deg, #C9972C 0, #C9972C 1px, transparent 0, transparent 40%)",
        backgroundSize: "18px 18px",
      }} />

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <motion.span variants={staggerItem} className="section-tag">Wedding Ceremony</motion.span>
          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 300,
              color: "#9E5A4E",
            }}
          >
            The Auspicious<br />
            <em style={{ fontStyle: "italic", color: "#C9972C" }}>Vivaha Muhurtham</em>
          </motion.h2>
          <motion.div variants={staggerItem}><MandalaDivider /></motion.div>
        </motion.div>

        {/* Main event card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={cardInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "linear-gradient(135deg, #9E5A4E 0%, #C4786A 45%, #D4957F 100%)",
            borderRadius: 12,
            padding: "60px 50px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 80px rgba(196,120,106,0.4), 0 0 40px rgba(201,151,44,0.2)",
            border: "2px solid rgba(201,151,44,0.5)",
            textAlign: "center",
          }}
        >
          {/* Ornamental corners */}
          <OrnamentalCorner position="tl" size={56} />
          <OrnamentalCorner position="tr" size={56} />
          <OrnamentalCorner position="bl" size={56} />
          <OrnamentalCorner position="br" size={56} />

          {/* Background texture */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.07,
            backgroundImage: "repeating-linear-gradient(45deg, #C9972C 0, #C9972C 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
            pointerEvents: "none",
          }} />

          {/* Top badge */}
          <div style={{
            fontSize: 9, letterSpacing: 6, textTransform: "uppercase",
            color: "#FFD700", marginBottom: 24, opacity: 0.9,
          }}>
            ✦ Main Ceremony ✦
          </div>

          {/* Oil lamp icon */}
          <div style={{
            display: "flex", justifyContent: "center", marginBottom: 24,
            animation: "floatGentle 4s ease-in-out infinite",
          }}>
            <KuthuvilakkuSVG size={60} />
          </div>

          {/* Malayalam text */}
          <div style={{
            fontFamily: "var(--font-malayalam, serif)",
            fontSize: "clamp(14px, 2vw, 20px)",
            color: "rgba(201,151,44,0.85)",
            marginBottom: 8, letterSpacing: 3,
          }}>
            വിവാഹ മുഹൂർത്തം
          </div>

          {/* Event name */}
          <h2 style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 400,
            color: "#FFFBF7",
            marginBottom: 8,
            lineHeight: 1.1,
            letterSpacing: 2,
          }}>
            Vivaha Muhurtham
          </h2>

          {/* Subtitle */}
          <div style={{
            fontSize: 11, letterSpacing: 4, textTransform: "uppercase",
            color: "rgba(255,253,208,0.65)", marginBottom: 32,
          }}>
            The Sacred Wedding Ceremony
          </div>

          {/* Gold divider */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 16, marginBottom: 40,
          }}>
            <div style={{ flex: 1, maxWidth: 120, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,151,44,0.7))" }} />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="3" fill="#C9972C" opacity="0.8" />
              {[0, 72, 144, 216, 288].map(deg => {
                const r = deg * Math.PI / 180;
                return <circle key={deg} cx={8 + 6 * Math.cos(r)} cy={8 + 6 * Math.sin(r)} r="1.5" fill="#C9972C" opacity="0.5" />;
              })}
            </svg>
            <div style={{ flex: 1, maxWidth: 120, height: 1, background: "linear-gradient(90deg, rgba(201,151,44,0.7), transparent)" }} />
          </div>

          {/* Detail grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 20,
            maxWidth: 700,
            margin: "0 auto 40px",
          }}>
            {details.map(({ icon, label, value }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                style={{
                  padding: "18px 16px",
                  background: "rgba(0,0,0,0.15)",
                  borderRadius: 8,
                  border: "1px solid rgba(201,151,44,0.2)",
                  backdropFilter: "blur(4px)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
                <div style={{
                  fontSize: 9, letterSpacing: 3, textTransform: "uppercase",
                  color: "rgba(201,151,44,0.7)", marginBottom: 6,
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: "var(--font-cormorant, serif)",
                  fontSize: 15, fontWeight: 400,
                  color: "#FFFBF7",
                  lineHeight: 1.4,
                }}>
                  {value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Invitation note */}
          <div style={{
            padding: "20px 24px",
            background: "rgba(0,0,0,0.12)",
            borderRadius: 8,
            border: "1px solid rgba(201,151,44,0.25)",
            maxWidth: 540,
            margin: "0 auto",
          }}>
            <p style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(14px, 1.8vw, 18px)",
              fontStyle: "italic",
              color: "rgba(255,253,208,0.85)",
              lineHeight: 1.9,
            }}>
              &ldquo;The most auspicious moment — two souls united under divine blessings. Witness the sacred union with your gracious presence.&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Attire note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: "center", marginTop: 40,
            padding: "20px 30px",
            background: "rgba(201,151,44,0.06)",
            border: "1px solid rgba(201,151,44,0.2)",
            borderRadius: 8,
            fontSize: 13,
            color: "var(--text-medium)",
            lineHeight: 1.8,
          }}
        >
          <strong style={{ color: "#9E5A4E" }}>Traditional Attire Encouraged — </strong>
          Kasavu sarees &amp; mundu honour the sanctity of this auspicious occasion.
        </motion.div>
      </div>
    </section>
  );
}
