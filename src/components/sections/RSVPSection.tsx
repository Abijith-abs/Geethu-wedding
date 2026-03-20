"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { WEDDING, EVENTS } from "@/lib/constants";
import { submitRSVP, type RSVPData } from "@/lib/rsvp";
import { MandalaDivider, KolamSVG } from "@/components/svg/Decoratives";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useInView } from "framer-motion";
import { useRef } from "react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  attending: "yes" | "no" | "maybe";
  guestCount: number;
  events: string[];
  dietary: "vegetarian" | "vegan" | "non-vegetarian";
  message: string;
};

export default function RSVPSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confetti, setConfetti] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      attending: "yes",
      guestCount: 1,
      dietary: "vegetarian",
      events: [],
    },
  });

  const attending = watch("attending");

  // Check if already submitted
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("rsvp_submitted")) setSubmitted(true);
    }
  }, []);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError("");
    try {
      const payload: RSVPData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        attending: data.attending,
        guestCount: Number(data.guestCount),
        events: data.events,
        dietary: data.dietary,
        message: data.message,
      };
      const result = await submitRSVP(payload);
      if (result.success) {
        setSubmitted(true);
        setConfetti(true);
        setTimeout(() => setConfetti(false), 4000);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="rsvp"
      style={{
        padding: "100px 20px",
        background: "linear-gradient(180deg, #FFF5EE 0%, #FAF7F3 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background kolam decoration */}
      <div style={{
        position: "absolute", right: -80, bottom: -80, opacity: 0.04, transform: "scale(2)",
        pointerEvents: "none",
      }}>
        <KolamSVG />
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={staggerContainer}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <motion.span variants={staggerItem} className="section-tag">We Await You</motion.span>
          <motion.h2
            variants={staggerItem}
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: 300,
              color: "#9E5A4E",
            }}
          >
            RSVP
          </motion.h2>
          <motion.p
            variants={staggerItem}
            style={{
              fontSize: 15, color: "var(--text-medium)",
              maxWidth: 400, margin: "0 auto", lineHeight: 1.8,
            }}
          >
            Kindly let us know if you can grace us with your presence.
            Please respond by <strong style={{ color: "#C4786A" }}>January 31, 2027</strong>.
          </motion.p>
          <motion.div variants={staggerItem}>
            <MandalaDivider />
          </motion.div>
        </motion.div>

        {/* Confetti burst */}
        <AnimatePresence>
          {confetti && (
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999, overflow: "hidden" }}>
              {Array.from({ length: 32 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: "100vh", x: `${Math.random() * 100}vw`, scale: 0, rotate: 0 }}
                  animate={{
                    y: `${-20 - Math.random() * 60}vh`,
                    scale: [0, 1, 0.8],
                    rotate: Math.random() * 720 - 360,
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 2 + Math.random() * 1.5, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    width: 10, height: 10,
                    borderRadius: Math.random() > 0.5 ? "50%" : "0",
                    background: ["#C9972C", "#C4786A", "#E34234", "#FFFBF7"][i % 4],
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Success state */}
        <AnimatePresence>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: "center", padding: "60px 40px",
                background: "#FFFBF7",
                border: "1px solid rgba(201,151,44,0.4)",
                borderRadius: 6,
                boxShadow: "0 8px 50px rgba(196,120,106,0.1)",
              }}
            >
              <div style={{ fontSize: 56, marginBottom: 20 }}>🪔</div>
              <h3 style={{
                fontFamily: "var(--font-great-vibes, cursive)",
                fontSize: 44, color: "#C4786A", marginBottom: 12,
              }}>
                Thank You!
              </h3>
              <p style={{ fontSize: 16, color: "var(--text-medium)", lineHeight: 1.8 }}>
                Your presence will make our day truly special.<br />
                We look forward to celebrating with you!
              </p>
              <p style={{
                marginTop: 20, color: "#C9972C",
                fontFamily: "var(--font-great-vibes, cursive)", fontSize: 22,
              }}>
                — Kichu & Dathan
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              onSubmit={handleSubmit(onSubmit)}
              style={{
                background: "#FFFBF7",
                border: "1px solid rgba(201,151,44,0.3)",
                borderRadius: 6,
                padding: "48px 40px",
                boxShadow: "0 8px 50px rgba(196,120,106,0.1)",
                position: "relative",
              }}
              className="rsvp-form-inner"
              noValidate
            >
              {/* Top gold border */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 4,
                background: "linear-gradient(90deg, #C4786A, #C9972C, #C4786A)",
                borderRadius: "6px 6px 0 0",
              }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {/* Name */}
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Your full name"
                    className="rsvp-input"
                    style={inputStyle}
                  />
                  {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
                </div>

                {/* Email + Phone row */}
                <div className="rsvp-email-phone" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                      })}
                      type="email"
                      placeholder="you@email.com"
                      className="rsvp-input"
                      style={inputStyle}
                    />
                    {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="rsvp-input"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Attending */}
                <div>
                  <label style={labelStyle}>Will you attend? *</label>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                    {([
                      { value: "yes", label: "Joyfully attending 🎉" },
                      { value: "maybe", label: "Will try to make it" },
                      { value: "no", label: "Sadly can't make it" },
                    ] as const).map(opt => (
                      <label key={opt.value} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "10px 18px",
                        border: `2px solid ${attending === opt.value ? "#C4786A" : "rgba(201,151,44,0.3)"}`,
                        borderRadius: 4,
                        background: attending === opt.value ? "rgba(196,120,106,0.06)" : "transparent",
                        cursor: "pointer",
                        fontSize: 13, color: attending === opt.value ? "#9E5A4E" : "var(--text-medium)",
                        transition: "all 0.2s",
                      }}>
                        <input
                          type="radio"
                          value={opt.value}
                          {...register("attending")}
                          style={{ accentColor: "#C4786A" }}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                {attending !== "no" && (
                  <>
                    {/* Guest count */}
                    <div>
                      <label style={labelStyle}>Number of Guests *</label>
                      <input
                        {...register("guestCount", { min: 1, max: 10 })}
                        type="number"
                        min={1}
                        max={10}
                        className="rsvp-input"
                        style={{ ...inputStyle, width: 100 }}
                      />
                    </div>

                    {/* Events */}
                    <div>
                      <label style={labelStyle}>Events you'll attend</label>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                        {EVENTS.map(event => (
                          <label key={event.id} style={{
                            display: "flex", alignItems: "center", gap: 10,
                            fontSize: 13, color: "var(--text-medium)", cursor: "pointer",
                          }}>
                            <input
                              type="checkbox"
                              value={event.name}
                              {...register("events")}
                              style={{ accentColor: "#C4786A", width: 16, height: 16 }}
                            />
                            <span>
                              <strong style={{ color: "#9E5A4E" }}>{event.name}</strong>
                              <span style={{ color: "rgba(158,90,78,0.5)", marginLeft: 6 }}>
                                — {event.date}, {event.time}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Dietary */}
                    <div>
                      <label style={labelStyle}>Dietary Preference</label>
                      <select {...register("dietary")} className="rsvp-input" style={inputStyle}>
                        <option value="vegetarian">Vegetarian 🥗</option>
                        <option value="vegan">Vegan 🌿</option>
                        <option value="non-vegetarian">Non-vegetarian 🍗</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Message */}
                <div>
                  <label style={labelStyle}>Leave a blessing / message</label>
                  <textarea
                    {...register("message")}
                    placeholder="Share your heartfelt wishes for the couple…"
                    rows={4}
                    className="rsvp-input"
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                {/* Error */}
                {error && (
                  <p style={{ color: "#E34234", fontSize: 13, textAlign: "center" }}>
                    ⚠️ {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "16px 32px",
                    background: loading
                      ? "rgba(196,120,106,0.4)"
                      : "linear-gradient(135deg, #C4786A, #9E5A4E)",
                    border: "none",
                    borderRadius: 4,
                    color: "#C9972C",
                    fontSize: 11, letterSpacing: 4, textTransform: "uppercase",
                    fontFamily: "var(--font-jost, sans-serif)",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s",
                    boxShadow: "0 4px 20px rgba(196,120,106,0.3)",
                  }}
                >
                  {loading ? "Sending…" : "Send My RSVP 🙏"}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 10,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: "#C4786A",
  fontFamily: "var(--font-jost, sans-serif)",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid rgba(201,151,44,0.3)",
  borderRadius: 4,
  background: "rgba(255,253,208,0.5)",
  color: "#2c1a1a",
  fontSize: 14,
  fontFamily: "var(--font-jost, sans-serif)",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const errorStyle: React.CSSProperties = {
  display: "block",
  marginTop: 4,
  fontSize: 11,
  color: "#E34234",
};
