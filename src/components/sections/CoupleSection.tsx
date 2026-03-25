"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WEDDING } from "@/lib/constants";
import { MandalaDivider, OrnamentalCorner } from "@/components/svg/Decoratives";
import { slideLeft, slideRight, staggerContainer, staggerItem } from "@/lib/animations";

function FamilyCard({
  title,
  name,
  father,
  mother,
  houseName,
  place,
  area,
  phone,
  side,
}: {
  title: string;
  name: string;
  father: string;
  mother: string;
  houseName: string;
  place: string;
  area: string;
  phone?: string;
  side: "bride" | "groom";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
        position: "relative",
        background: "#FFFBF7",
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 8px 50px rgba(196,120,106,0.1)",
      }}
    >
      {/* Gradient top bar */}
      <div style={{
        height: 5,
        background: side === "bride"
          ? "linear-gradient(90deg, #C4786A, #C9972C, #C4786A)"
          : "linear-gradient(90deg, #C9972C, #C4786A, #C9972C)",
      }} />

      {/* Ornamental corners */}
      <OrnamentalCorner position="tl" size={44} />
      <OrnamentalCorner position="tr" size={44} />
      <OrnamentalCorner position="bl" size={44} />
      <OrnamentalCorner position="br" size={44} />

      <div style={{ padding: "36px 28px 32px" }}>
        {/* Role label */}
        <div style={{
          fontSize: 9, letterSpacing: 6, textTransform: "uppercase",
          color: "#C9972C", opacity: 0.8, marginBottom: 20,
        }}>
          {title}
        </div>

        {/* Decorative name ring */}
        <div style={{
          width: 120, height: 120, borderRadius: "50%",
          border: "2px solid rgba(201,151,44,0.3)",
          margin: "0 auto 20px",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
          background: "linear-gradient(135deg, rgba(201,151,44,0.06), rgba(196,120,106,0.06))",
        }}>
          <div style={{
            position: "absolute", inset: -8, borderRadius: "50%",
            border: "1px dashed rgba(201,151,44,0.25)",
            animation: "spinSlow 25s linear infinite",
          }} />
          <div style={{
            position: "absolute", top: -4, left: "50%",
            width: 8, height: 8, borderRadius: "50%",
            background: "#C9972C",
            transform: "translateX(-50%)",
          }} />
          <span style={{
            fontFamily: "var(--font-great-vibes, cursive)",
            fontSize: 52,
            color: "#C4786A",
            lineHeight: 1,
          }}>
            {name[0]}
          </span>
        </div>

        {/* Name */}
        <h2 style={{
          fontFamily: "var(--font-cormorant, serif)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 400,
          color: "#9E5A4E",
          letterSpacing: 2,
          marginBottom: 6,
          lineHeight: 1.1,
        }}>
          {name}
        </h2>

        {/* Gold divider */}
        <div style={{
          width: 60, height: 1, margin: "14px auto 20px",
          background: "linear-gradient(90deg, transparent, #C9972C, transparent)",
        }} />

        {/* Parents */}
        <div style={{
          padding: "16px 18px",
          background: "rgba(201,151,44,0.06)",
          borderRadius: 6,
          border: "1px solid rgba(201,151,44,0.12)",
          marginBottom: 14,
          textAlign: "left",
        }}>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#C9972C", marginBottom: 8 }}>
            {side === "bride" ? "Daughter of" : "Son of"}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-medium)", lineHeight: 1.9 }}>
            <span style={{ color: "#9E5A4E", fontWeight: 400 }}>{father}</span><br />
            <span style={{ color: "#9E5A4E", fontWeight: 400 }}>&amp; {mother}</span>
          </div>
        </div>

        {/* Address */}
        <div style={{
          padding: "14px 18px",
          borderRadius: 6,
          border: "1px solid rgba(196,120,106,0.15)",
          textAlign: "left",
          marginBottom: phone ? 14 : 0,
        }}>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "#C9972C", marginBottom: 6 }}>
            Residence
          </div>
          <div style={{ fontSize: 12, color: "var(--text-medium)", lineHeight: 1.9 }}>
            {houseName}, {place}<br />{area}
          </div>
        </div>

        {/* Contact (bride only) */}
        {phone && (
          <div style={{
            padding: "12px 18px",
            borderRadius: 6,
            border: "1px solid rgba(201,151,44,0.15)",
            textAlign: "left",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6.6 10.8C7.9 13.4 10 15.4 12.6 16.8L14.6 14.8C14.9 14.5 15.3 14.4 15.6 14.6C16.7 14.9 17.8 15.1 19 15.1C19.6 15.1 20 15.5 20 16.1V19C20 19.6 19.6 20 19 20C10.2 20 3 12.8 3 4C3 3.4 3.4 3 4 3H7C7.6 3 8 3.4 8 4C8 5.2 8.2 6.3 8.5 7.4C8.6 7.8 8.5 8.2 8.2 8.4L6.6 10.8Z"
                stroke="#C9972C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 12, color: "var(--text-medium)", letterSpacing: 1 }}>{phone}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function CoupleSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const inviteRef = useRef(null);
  const inviteInView = useInView(inviteRef, { once: true, margin: "-80px" });

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
            Two Souls,{" "}
            <em style={{ fontStyle: "italic", color: "#C9972C" }}>One Destiny</em>
          </motion.h2>
          <motion.div variants={staggerItem}>
            <MandalaDivider />
          </motion.div>
        </motion.div>

        {/* Invitation message */}
        <motion.div
          ref={inviteRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inviteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: "center",
            maxWidth: 680,
            margin: "0 auto 60px",
            padding: "36px 40px",
            background: "#FFFBF7",
            borderRadius: 8,
            border: "1px solid rgba(201,151,44,0.2)",
            boxShadow: "0 4px 40px rgba(196,120,106,0.08)",
            position: "relative",
          }}
        >
          <OrnamentalCorner position="tl" size={40} />
          <OrnamentalCorner position="tr" size={40} />
          <OrnamentalCorner position="bl" size={40} />
          <OrnamentalCorner position="br" size={40} />
          <div style={{
            fontSize: 9, letterSpacing: 5, textTransform: "uppercase",
            color: "#C9972C", marginBottom: 16, opacity: 0.8,
          }}>
            Invitation
          </div>
          <p style={{
            fontFamily: "var(--font-cormorant, serif)",
            fontSize: "clamp(16px, 2.4vw, 22px)",
            fontWeight: 400,
            color: "#7A5C47",
            lineHeight: 1.8,
            fontStyle: "italic",
          }}>
            &ldquo;{WEDDING.invitation.message}&rdquo;
          </p>
          <div style={{
            marginTop: 16,
            fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
            color: "#C9972C", opacity: 0.7,
          }}>
            — {WEDDING.bride.parents.father} &amp; {WEDDING.bride.parents.mother}
          </div>
        </motion.div>

        {/* Family cards */}
        <div style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-start",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <FamilyCard
            title="The Bride"
            name={WEDDING.bride.firstName}
            father={WEDDING.bride.parents.father}
            mother={WEDDING.bride.parents.mother}
            houseName={WEDDING.bride.address.houseName}
            place={WEDDING.bride.address.place}
            area={WEDDING.bride.address.area}
            phone={WEDDING.bride.contact.phone}
            side="bride"
          />

          {/* Ampersand connector */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            minWidth: 60,
            padding: "80px 0",
          }}>
            <div style={{ width: 1, flex: 1, background: "linear-gradient(180deg, transparent, #C9972C)" }} />
            <div style={{
              fontFamily: "var(--font-great-vibes, cursive)",
              fontSize: 52,
              color: "#C9972C",
              textShadow: "0 0 20px rgba(201,151,44,0.4)",
              lineHeight: 1,
            }}>
              &amp;
            </div>
            <svg width="50" height="30" viewBox="0 0 50 30" fill="none" aria-hidden="true">
              <path d="M25 15 C25 15 8 0 8 12 C8 20 16 20 25 15 C34 20 42 20 42 12 C42 0 25 15 25 15Z"
                fill="#C4786A" opacity="0.35" />
            </svg>
            <div style={{ width: 1, flex: 1, background: "linear-gradient(180deg, #C9972C, transparent)" }} />
          </div>

          <FamilyCard
            title="The Groom"
            name={WEDDING.groom.firstName}
            father={WEDDING.groom.parents.father}
            mother={WEDDING.groom.parents.mother}
            houseName={WEDDING.groom.address.houseName}
            place={WEDDING.groom.address.place}
            area={WEDDING.groom.address.area}
            side="groom"
          />
        </div>
      </div>
    </section>
  );
}
