"use client";

import { useEffect, useState } from "react";
import { WEDDING } from "@/lib/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const target = new Date(WEDDING.wedding.dateISO).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
      setKey(k => k + 1);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  const units: Array<{ value: number; label: string }> = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <div style={{
      display: "flex",
      gap: 20,
      alignItems: "flex-end",
      justifyContent: "center",
      flexWrap: "wrap",
    }}>
      {units.map(({ value, label }, i) => (
        <div key={label} style={{ textAlign: "center", position: "relative" }}>
          {/* Brass vessel effect */}
          <div style={{
            width: 80,
            height: 90,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* Vessel SVG container */}
            <svg
              width="80" height="90"
              viewBox="0 0 80 90"
              style={{ position: "absolute", inset: 0 }}
              aria-hidden="true"
            >
              {/* Vessel body */}
              <path
                d="M15 80 L10 50 Q8 30 20 20 L20 15 Q20 8 40 8 Q60 8 60 15 L60 20 Q72 30 70 50 L65 80Z"
                fill="url(#brass-grad)" opacity="0.9"
              />
              {/* Rim */}
              <ellipse cx="40" cy="80" rx="26" ry="5" fill="url(#brass-dark)" />
              <ellipse cx="40" cy="14" rx="22" ry="5" fill="url(#brass-grad)" />
              {/* Highlight */}
              <path d="M22 22 Q18 40 20 60" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Decorative band */}
              <line x1="14" y1="55" x2="66" y2="55" stroke="#9A7020" strokeWidth="1" opacity="0.6" />
              <defs>
                <linearGradient id={`brass-grad`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9A7020" />
                  <stop offset="40%" stopColor="#C9972C" />
                  <stop offset="80%" stopColor="#C9962A" />
                  <stop offset="100%" stopColor="#8B6914" />
                </linearGradient>
                <linearGradient id={`brass-dark`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7A5C14" />
                  <stop offset="50%" stopColor="#9A7020" />
                  <stop offset="100%" stopColor="#7A5C14" />
                </linearGradient>
              </defs>
            </svg>

            {/* Number */}
            <span
              key={`${key}-${i}`}
              className="countdown-digit"
              style={{
                fontFamily: "var(--font-cormorant, 'Cormorant Garamond', serif)",
                fontSize: 32,
                fontWeight: 500,
                color: "#FDF8EF",
                position: "relative",
                zIndex: 1,
                lineHeight: 1,
                textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
            >
              {pad(value)}
            </span>
          </div>

          {/* Label */}
          <div style={{
            fontSize: 9,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(201,151,44,0.7)",
            marginTop: 6,
          }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
