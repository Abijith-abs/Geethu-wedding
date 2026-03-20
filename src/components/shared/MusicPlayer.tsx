"use client";

import { useEffect, useRef, useState } from "react";
import { WEDDING } from "@/lib/constants";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      // Fade out
      const fadeTo = (vol: number, cb: () => void) => {
        if (audio.volume > vol + 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
          setTimeout(() => fadeTo(vol, cb), 50);
        } else {
          audio.volume = vol;
          cb();
        }
      };
      fadeTo(0, () => audio.pause());
      setPlaying(false);
    } else {
      audio.volume = 0;
      audio.play().then(() => {
        // Fade in
        const fadeTo = (vol: number) => {
          if (audio.volume < vol - 0.05) {
            audio.volume = Math.min(1, audio.volume + 0.05);
            setTimeout(() => fadeTo(vol), 50);
          } else {
            audio.volume = vol;
          }
        };
        fadeTo(0.6);
        setPlaying(true);
      }).catch(() => {
        // Autoplay blocked
      });
    }
  };

  if (!visible) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={WEDDING.music.url}
        loop
        preload="none"
        aria-label="Background music"
      />

      <div
        id="musicPlayer"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9997,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div style={{
          fontSize: 9, letterSpacing: 3, textTransform: "uppercase",
          color: "rgba(201,151,44,0.7)",
        }}>
          Music
        </div>
        <button
          onClick={toggle}
          aria-label={playing ? "Pause background music" : "Play background music"}
          className={!playing ? "music-paused" : ""}
          style={{
            width: 48, height: 48,
            borderRadius: "50%",
            border: "1px solid rgba(201,151,44,0.5)",
            background: "rgba(13,1,1,0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s",
            animation: playing ? "glowPulse 2s ease-in-out infinite" : "none",
            gap: 2,
          }}
          onMouseEnter={e => { (e.currentTarget).style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { (e.currentTarget).style.transform = "scale(1)"; }}
        >
          {playing ? (
            /* Sound wave bars */
            <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
              <div className="eq-bar" />
              <div className="eq-bar" />
              <div className="eq-bar" />
              <div className="eq-bar" />
              <div className="eq-bar" />
            </div>
          ) : (
            /* Temple bell / play icon */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C8 2 8 6 8 6V11L6 13V15H18V13L16 11V6C16 6 16 2 12 2Z" stroke="#C9972C" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9 15V16C9 17.6569 10.3431 19 12 19C13.6569 19 15 17.6569 15 16V15" stroke="#C9972C" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="21" r="1" fill="#C9972C" opacity="0.5" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
