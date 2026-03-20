"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { STORY_MILESTONES } from "@/lib/constants";
import { MandalaDivider } from "@/components/svg/Decoratives";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        padding: "100px 20px",
        background: "linear-gradient(180deg, var(--bg) 0%, #F0E8D5 40%, var(--bg) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Silk pattern overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none",
        backgroundImage: `repeating-linear-gradient(45deg, #C4786A 0, #C4786A 1px, transparent 0, transparent 50%)`,
        backgroundSize: "30px 30px",
      }} />

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: 70 }}
        >
          <motion.span variants={staggerItem} className="section-tag">Our Journey</motion.span>
          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 300,
              color: "#9E5A4E",
            }}
          >
            How We Found<br />
            <em style={{ fontStyle: "italic", color: "#C9972C" }}>Each Other</em>
          </motion.h2>
          <motion.div variants={staggerItem}>
            <MandalaDivider />
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: 0 }}>
          {/* Animated center line */}
          <div className="story-center-line" style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 2,
            background: "rgba(201,151,44,0.1)",
            transform: "translateX(-50%)",
          }}>
            <motion.div
              style={{
                width: "100%",
                height: lineHeight,
                background: "linear-gradient(180deg, #C9972C 0%, #C4786A 100%)",
                transformOrigin: "top",
              }}
            />
          </div>

          {/* Milestones */}
          {STORY_MILESTONES.map((milestone, i) => {
            const isLeft = i % 2 === 0;
            const ref = useRef(null);
            const inView = useInView(ref, { once: true, margin: "-60px" });

            return (
              <motion.div
                key={milestone.year}
                ref={ref}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="story-item"
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  marginBottom: 60,
                  position: "relative",
                }}
              >
                {/* Card */}
                <div className="story-card" style={{
                  width: "45%",
                  background: "#FFFBF7",
                  border: "1px solid rgba(201,151,44,0.25)",
                  borderRadius: 4,
                  padding: "24px 28px",
                  position: "relative",
                  boxShadow: "0 4px 30px rgba(196,120,106,0.06)",
                  transition: "box-shadow 0.3s, transform 0.3s",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(196,120,106,0.14)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 30px rgba(196,120,106,0.06)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Year badge */}
                  <div style={{
                    fontSize: 11, letterSpacing: 4, textTransform: "uppercase",
                    color: "#C9972C", marginBottom: 4,
                  }}>
                    {milestone.year}
                  </div>

                  {/* Icon + Title */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 22 }}>{milestone.icon}</span>
                    <h3 style={{
                      fontFamily: "var(--font-cormorant, serif)",
                      fontSize: 22,
                      fontWeight: 500,
                      color: "#9E5A4E",
                    }}>
                      {milestone.title}
                    </h3>
                  </div>

                  <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-medium)" }}>
                    {milestone.description}
                  </p>

                  {/* Connector arrow */}
                  <div className="story-arrow" style={{
                    position: "absolute",
                    top: "50%",
                    [isLeft ? "right" : "left"]: -10,
                    transform: "translateY(-50%)",
                    width: 0, height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    [isLeft ? "borderLeft" : "borderRight"]: "10px solid rgba(201,151,44,0.25)",
                  }} />
                </div>

                {/* Center dot */}
                <div className="story-dot" style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 40, height: 40,
                  background: "#FFFBF7",
                  border: "2px solid #C9972C",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  zIndex: 2,
                  boxShadow: "0 0 0 4px rgba(201,151,44,0.15)",
                }}>
                  {milestone.icon}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
