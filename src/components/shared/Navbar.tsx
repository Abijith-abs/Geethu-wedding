"use client";

import { useEffect, useRef, useState } from "react";
import { WEDDING, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 60);
      setProgress(totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0);

      // Detect active section
      const sections = ["hero", "couple", "events", "venue"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <nav
        id="nav"
        className={scrolled ? "nav-scrolled" : ""}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-great-vibes, cursive)",
            fontSize: 26,
            color: scrolled ? "var(--maroon-dark)" : "#FFFBF7",
            transition: "color 0.5s",
            cursor: "pointer",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {WEDDING.bride.nickname} &amp; {WEDDING.groom.nickname}
        </div>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: 32,
            listStyle: "none",
            alignItems: "center",
          }}
          className="nav-desktop-links"
        >
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={href}>
                <button
                  onClick={() => scrollTo(href)}
                  style={{
                    fontSize: 9,
                    letterSpacing: 4,
                    textTransform: "uppercase",
                    color: scrolled
                      ? isActive ? "var(--maroon-dark)" : "var(--text-light)"
                      : isActive ? "#C9972C" : "rgba(255,253,208,0.7)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-jost, sans-serif)",
                    padding: "4px 0",
                    position: "relative",
                    transition: "color 0.4s",
                  }}
                >
                  {label}
                  {/* Kolam-inspired active underline */}
                  <span style={{
                    position: "absolute",
                    bottom: 0, left: 0,
                    width: isActive ? "100%" : "0",
                    height: 1,
                    background: isActive
                      ? "linear-gradient(90deg, transparent, #C9972C, transparent)"
                      : "#C9972C",
                    transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }} />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            padding: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            zIndex: 1001,
          }}
          className="nav-hamburger"
        >
          <span style={{
            width: 22, height: 1.5,
            background: scrolled ? "var(--maroon-dark)" : "#FFFBF7",
            display: "block",
            transition: "all 0.3s",
            transform: menuOpen ? "rotate(45deg) translateY(9px)" : "none",
          }} />
          <span style={{
            width: 22, height: 1.5,
            background: scrolled ? "var(--maroon-dark)" : "#FFFBF7",
            display: "block",
            transition: "all 0.3s",
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            width: 22, height: 1.5,
            background: scrolled ? "var(--maroon-dark)" : "#FFFBF7",
            display: "block",
            transition: "all 0.3s",
            transform: menuOpen ? "rotate(-45deg) translateY(-9px)" : "none",
          }} />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(13, 1, 1, 0.97)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        transition: "opacity 0.4s",
      }}>
        {/* Decorative rings */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400, height: 400, borderRadius: "50%",
          border: "1px solid rgba(201,151,44,0.1)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300, height: 300, borderRadius: "50%",
          border: "1px solid rgba(201,151,44,0.08)",
          pointerEvents: "none",
        }} />

          {NAV_LINKS.map(({ label, href }, i) => (
          <button
            key={href}
            onClick={() => scrollTo(href)}
            style={{
              fontFamily: "var(--font-cormorant, serif)",
              fontSize: 32,
              fontStyle: "italic",
              color: "#FFFBF7",
              background: "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: 2,
              transition: "color 0.3s, transform 0.3s",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 0.07}s`,
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = "#C9972C"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = "#FFFBF7"; }}
          >
            {label}
          </button>
        ))}

        <div style={{ fontSize: 12, color: "rgba(201,151,44,0.5)", letterSpacing: 4, marginTop: 8 }}>
          {WEDDING.wedding.date}
        </div>
      </div>

      {/* Side dots navigation */}
      <nav className="side-dots" aria-label="Section navigation dots">
        {["hero", "couple", "events", "venue"].map(id => (
          <button
            key={id}
            className={`side-dot ${activeSection === id ? "active" : ""}`}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            aria-label={`Go to ${id} section`}
          />
        ))}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .side-dots { display: none; }
          #nav { padding: 16px 20px !important; }
          #nav.nav-scrolled { padding: 12px 20px !important; }
        }
      `}</style>
    </>
  );
}
