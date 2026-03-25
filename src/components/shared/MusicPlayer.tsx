"use client";

import { useEffect, useRef, useState } from "react";
import { WEDDING } from "@/lib/constants";

const START_FROM = WEDDING.music.startFrom; // 44 seconds
const TARGET_VOL  = WEDDING.music.volume;   // 0.46

export default function MusicPlayer() {
  const [playing, setPlaying]           = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const audioRef      = useRef<HTMLAudioElement>(null);
  const autoHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Show tutorial hint 5 s after mount, auto-hide after another 7 s */
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowTutorial(true);
      autoHideTimer.current = setTimeout(() => setShowTutorial(false), 7000);
    }, 5000);
    return () => {
      clearTimeout(showTimer);
      if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
    };
  }, []);

  /* Loop manually so every play-through starts at START_FROM */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      audio.currentTime = START_FROM;
      audio.play().catch(() => {});
    };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const dismissTutorial = () => {
    setShowTutorial(false);
    if (autoHideTimer.current) clearTimeout(autoHideTimer.current);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    dismissTutorial();

    if (playing) {
      /* ── Fade out then pause ── */
      const fadeOut = () => {
        if (audio.volume > 0.04) {
          audio.volume = Math.max(0, audio.volume - 0.04);
          setTimeout(fadeOut, 40);
        } else {
          audio.volume = 0;
          audio.pause();
        }
      };
      fadeOut();
      setPlaying(false);
    } else {
      /* ── Seek to START_FROM, then fade in ── */
      audio.currentTime = START_FROM;
      audio.volume = 0;
      audio.play()
        .then(() => {
          const fadeIn = () => {
            if (audio.volume < TARGET_VOL - 0.03) {
              audio.volume = Math.min(TARGET_VOL, audio.volume + 0.03);
              setTimeout(fadeIn, 40);
            } else {
              audio.volume = TARGET_VOL;
            }
          };
          fadeIn();
          setPlaying(true);
        })
        .catch(() => {/* browser blocked — user must interact again */});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={WEDDING.music.url}
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
        {/* ── Tutorial tooltip ── */}
        {showTutorial && (
          <div
            role="tooltip"
            style={{
              position: "absolute",
              bottom: "calc(100% + 14px)",
              right: 0,
              background: "rgba(13,1,1,0.93)",
              border: "1px solid rgba(201,151,44,0.55)",
              borderRadius: 12,
              padding: "10px 16px",
              whiteSpace: "nowrap",
              color: "#FFFBF7",
              fontSize: 12,
              fontFamily: "var(--font-jost)",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              animation: "tutorialFadeIn 0.45s ease-out forwards",
              boxShadow: "0 6px 24px rgba(0,0,0,0.45), 0 0 24px rgba(201,151,44,0.12)",
              pointerEvents: "none",
            }}
          >
            <span style={{ fontSize: 15, lineHeight: 1 }}>♫</span>
            <span>Tap to play music</span>
            {/* caret arrow */}
            <span
              style={{
                position: "absolute",
                bottom: -7,
                right: 19,
                width: 12,
                height: 12,
                background: "rgba(13,1,1,0.93)",
                border: "1px solid rgba(201,151,44,0.55)",
                borderTop: "none",
                borderLeft: "none",
                transform: "rotate(45deg)",
              }}
            />
          </div>
        )}

        <div
          style={{
            fontSize: 9,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(201,151,44,0.7)",
          }}
        >
          Music
        </div>

        <button
          onClick={toggle}
          aria-label={playing ? "Pause background music" : "Play background music"}
          className={!playing ? "music-paused" : ""}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: "1px solid rgba(201,151,44,0.5)",
            background: "rgba(13,1,1,0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s",
            animation: showTutorial
              ? "tutorialPulse 1.1s ease-in-out infinite"
              : playing
              ? "glowPulse 2s ease-in-out infinite"
              : "none",
            gap: 2,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {playing ? (
            <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
              <div className="eq-bar" />
              <div className="eq-bar" />
              <div className="eq-bar" />
              <div className="eq-bar" />
              <div className="eq-bar" />
            </div>
          ) : (
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
