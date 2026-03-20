"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ITINERARY } from "@/lib/constants";
import { MandalaDivider } from "@/components/svg/Decoratives";
import { staggerContainer, staggerItem } from "@/lib/animations";

const CATEGORY_COLORS: Record<string, string> = {
  ceremony: "#1B5538",
  ritual: "#C9972C",
  celebration: "#006400",
  feast: "#1A5B8F",
  custom: "#E34234",
};

export default function ItinerarySection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      id="itinerary"
      style={{
        padding: "100px 20px",
        background: "linear-gradient(180deg, #071E13 0%, #0C2918 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(0deg, #C9972C 0, #C9972C 1px, transparent 0, transparent 80px),
          repeating-linear-gradient(90deg, #C9972C 0, #C9972C 1px, transparent 0, transparent 80px)`,
      }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: 70 }}
        >
          <motion.span variants={staggerItem} className="section-tag">Plan of Celebrations</motion.span>
          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 300,
              color: "#C9972C",
            }}
          >
            The Wedding
            <br />
            <em style={{ fontStyle: "italic", color: "#E8C068" }}>Itinerary</em>
          </motion.h2>
          <motion.div variants={staggerItem}>
            <MandalaDivider />
          </motion.div>
        </motion.div>

        {/* Event day grouping */}
        {/* Group by event */}
        {(() => {
          const groups: Record<string, typeof ITINERARY> = {};
          ITINERARY.forEach(item => {
            if (!groups[item.event]) groups[item.event] = [];
            groups[item.event].push(item);
          });

          return Object.entries(groups).map(([eventName, items], gi) => (
            <div key={eventName} style={{ marginBottom: 60 }}>
              {/* Event day header */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex", alignItems: "center", gap: 16, marginBottom: 28,
                }}
              >
                <div style={{
                  height: 1,
                  flex: 1,
                  background: "linear-gradient(90deg, transparent, rgba(201,151,44,0.3))",
                }} />
                <span style={{
                  fontFamily: "var(--font-cormorant, serif)",
                  fontSize: 20, fontWeight: 500, color: "#C9972C",
                  border: "1px solid rgba(201,151,44,0.3)",
                  padding: "6px 20px", borderRadius: 2,
                  letterSpacing: 2,
                }}>
                  {eventName}
                </span>
                <div style={{
                  height: 1, flex: 1,
                  background: "linear-gradient(90deg, rgba(201,151,44,0.3), transparent)",
                }} />
              </motion.div>

              {/* Timeline items */}
              <div style={{ position: "relative", paddingLeft: 80 }}>
                {/* Vertical line */}
                <div style={{
                  position: "absolute", left: 28, top: 0, bottom: 0, width: 1,
                  background: "linear-gradient(180deg, rgba(201,151,44,0.5), rgba(201,151,44,0.1))",
                }} />

                {items.map((item, ti) => {
                  const dotColor = CATEGORY_COLORS[item.category] || "#C9972C";
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: ti * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 16,
                        marginBottom: 20, position: "relative",
                      }}
                    >
                      {/* Time dot */}
                      <div style={{
                        position: "absolute", left: -57,
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                      }}>
                        <div style={{
                          width: 12, height: 12, borderRadius: "50%",
                          background: dotColor,
                          border: `2px solid ${dotColor}`,
                          boxShadow: `0 0 8px ${dotColor}60`,
                          marginLeft: -5.5,
                        }} />
                      </div>

                      {/* Time badge */}
                      <div style={{
                        position: "absolute", left: -80,
                        fontSize: 10, color: "rgba(201,151,44,0.6)",
                        fontFamily: "var(--font-jost, sans-serif)",
                        letterSpacing: 0.5,
                        width: 48, textAlign: "right",
                        marginTop: -2,
                      }}>
                        {item.time}
                      </div>

                      {/* Content card */}
                      <div style={{
                        flex: 1, padding: "14px 18px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(201,151,44,0.12)",
                        borderRadius: 4,
                        transition: "all 0.3s",
                        borderLeft: `3px solid ${dotColor}`,
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                          <span style={{ fontSize: 18 }}>{item.icon}</span>
                          <h4 style={{
                            fontFamily: "var(--font-cormorant, serif)",
                            fontSize: 18, fontWeight: 500, color: "#E8C068",
                            margin: 0,
                          }}>{item.title}</h4>
                          <span style={{
                            marginLeft: "auto",
                            fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
                            padding: "2px 8px", borderRadius: 2,
                            background: `${dotColor}20`,
                            color: dotColor,
                            fontFamily: "var(--font-jost, sans-serif)",
                          }}>
                            {item.category}
                          </span>
                        </div>
                        {item.description && (
                          <p style={{
                            fontSize: 12, color: "rgba(255,253,208,0.55)",
                            lineHeight: 1.7, margin: 0, marginLeft: 28,
                          }}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ));
        })()}
      </div>
    </section>
  );
}
