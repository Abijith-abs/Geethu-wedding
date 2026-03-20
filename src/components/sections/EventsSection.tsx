"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EVENTS } from "@/lib/constants";
import { MandalaDivider, OrnamentalCorner } from "@/components/svg/Decoratives";
import { staggerContainer, staggerItem } from "@/lib/animations";

function EventCard({ event, index }: { event: typeof EVENTS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateY: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      style={{
        width: "100%",
        maxWidth: 360,
        height: 440,
        perspective: 1200,
        cursor: "pointer",
        position: "relative",
      }}
      className="event-card"
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="event-card-inner" style={{
        width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        {/* FRONT */}
        <div className="event-card-front" style={{
          position: "absolute", inset: 0,
          background: event.isPrimary
            ? `linear-gradient(135deg, #0D3D24, #1B5538, #2A7A50)`
            : `linear-gradient(135deg, #F5F3EC, #FDF8EF)`,
          border: event.isPrimary ? "2px solid #C9972C" : "1px solid rgba(201,151,44,0.3)",
          borderRadius: 6,
          padding: "32px 28px",
          display: "flex", flexDirection: "column",
          alignItems: "center", textAlign: "center",
          boxShadow: event.isPrimary
            ? "0 8px 50px rgba(19,78,52,0.4), 0 0 30px rgba(201,151,44,0.2)"
            : "0 4px 30px rgba(19,78,52,0.08)",
          overflow: "hidden",
        }}>
          {/* Ornamental corners */}
          <OrnamentalCorner position="tl" size={40} />
          <OrnamentalCorner position="tr" size={40} />
          <OrnamentalCorner position="bl" size={40} />
          <OrnamentalCorner position="br" size={40} />

          {/* Background pattern */}
          <div style={{
            position: "absolute", inset: 0, opacity: event.isPrimary ? 0.06 : 0.04,
            backgroundImage: `repeating-linear-gradient(45deg, ${event.color} 0, ${event.color} 1px, transparent 0, transparent 50%)`,
            backgroundSize: "20px 20px",
            pointerEvents: "none",
          }} />

          {event.isPrimary && (
            <div style={{
              fontSize: 9, letterSpacing: 5, textTransform: "uppercase",
              color: "#FFD700", marginBottom: 8, opacity: 0.9,
            }}>
              ✦ Main Ceremony ✦
            </div>
          )}

          <div style={{ fontSize: 40, marginBottom: 12 }}>{event.icon}</div>

          <div style={{
            fontFamily: "var(--font-malayalam, serif)",
            fontSize: 16, color: event.isPrimary ? "#C9972C" : "#1B5538",
            marginBottom: 4, letterSpacing: 2,
          }}>
            {event.tamilName}
          </div>

          <h3 style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 500,
            color: event.isPrimary ? "#FDF8EF" : "#0D3D24",
            marginBottom: 6,
          }}>
            {event.name}
          </h3>

          <div style={{
            fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
            color: event.isPrimary ? "rgba(255,253,208,0.6)" : "var(--text-light)",
            marginBottom: 20,
          }}>
            {event.subtitle}
          </div>

          <div style={{
            width: 40, height: 1,
            background: event.isPrimary ? "rgba(201,151,44,0.6)" : "rgba(19,78,52,0.2)",
            margin: "0 auto 20px",
          }} />

          <div style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontSize: 18,
            color: event.isPrimary ? "#C9972C" : "#1B5538",
            letterSpacing: 1, marginBottom: 4,
          }}>
            {event.date}
          </div>
          <div style={{
            fontSize: 13, color: event.isPrimary ? "rgba(255,253,208,0.7)" : "var(--text-medium)",
          }}>
            {event.time}
          </div>

          <div style={{
            marginTop: "auto",
            fontSize: 11, color: event.isPrimary ? "rgba(255,253,208,0.5)" : "var(--text-light)",
            letterSpacing: 2, textTransform: "uppercase",
          }}>
            Hover or tap for details
          </div>
        </div>

        {/* BACK */}
        <div className="event-card-back" style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${event.color}22, #F5F3EC)`,
          border: `1px solid ${event.color}55`,
          borderRadius: 6,
          padding: "28px 24px",
          display: "flex", flexDirection: "column",
          alignItems: "flex-start", textAlign: "left",
          boxShadow: `0 8px 40px ${event.color}33`,
          overflow: "hidden",
        }}>
          <OrnamentalCorner position="tl" size={36} />
          <OrnamentalCorner position="tr" size={36} />

          <div style={{ fontSize: 24, marginBottom: 8 }}>{event.icon}</div>
          <h3 style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontSize: 22, fontWeight: 500,
            color: "#0D3D24", marginBottom: 14,
          }}>
            {event.name}
          </h3>

          <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-medium)", marginBottom: 16 }}>
            {event.description}
          </p>

          <div style={{
            width: "100%", height: 1,
            background: `linear-gradient(90deg, ${event.color}55, transparent)`,
            margin: "8px 0 14px",
          }} />

          {[
            { icon: "📅", label: event.date },
            { icon: "⏰", label: event.time },
            { icon: "📍", label: event.venue },
            { icon: "👗", label: event.dresscode },
          ].map(({ icon, label }) => (
            <div key={icon} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 12, color: "var(--text-medium)" }}>
              <span>{icon}</span>
              <span style={{ lineHeight: 1.5 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function EventsSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

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
      {/* Decorative band */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: "linear-gradient(90deg, var(--maroon), var(--gold), var(--vermillion), var(--gold), var(--maroon))",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 4,
        background: "linear-gradient(90deg, var(--maroon), var(--gold), var(--vermillion), var(--gold), var(--maroon))",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <motion.span variants={staggerItem} className="section-tag">Wedding Celebrations</motion.span>
          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 300,
              color: "#0D3D24",
            }}
          >
            Five Days of<br />
            <em style={{ fontStyle: "italic", color: "#C9972C" }}>Sacred Celebrations</em>
          </motion.h2>
          <motion.div variants={staggerItem}>
            <MandalaDivider />
          </motion.div>
          <motion.p
            variants={staggerItem}
            style={{ fontSize: 14, color: "var(--text-medium)", maxWidth: 500, margin: "0 auto" }}
          >
            A South Indian wedding is not a ceremony — it is a beautiful, multi-day tapestry of rituals, music, colour and love.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          justifyContent: "center",
          alignItems: "flex-start",
        }}>
          {EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

        {/* Dress code note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            textAlign: "center", marginTop: 50,
            padding: "20px 30px",
            background: "rgba(201,151,44,0.06)",
            border: "1px solid rgba(201,151,44,0.2)",
            borderRadius: 4,
            maxWidth: 600,
            margin: "50px auto 0",
            fontSize: 13,
            color: "var(--text-medium)",
            lineHeight: 1.8,
          }}
        >
          <strong style={{ color: "#0D3D24" }}>Dress Code Note: </strong>
          Traditional South Indian attire is warmly encouraged. Kanchipuram silk sarees and veshtis honour the sanctity of the occasion.
        </motion.div>
      </div>
    </section>
  );
}
