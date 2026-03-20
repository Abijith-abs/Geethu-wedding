// South Indian decorative SVG components — all inline, no external assets

/** Kuthuvilakku (Oil Lamp) SVG */
export function KuthuvilakkuSVG({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 80 112" fill="none" className={className} aria-label="Oil lamp">
      {/* Base */}
      <ellipse cx="40" cy="104" rx="28" ry="6" fill="#C9972C" opacity="0.4" />
      <rect x="24" y="92" width="32" height="12" rx="4" fill="#C9962A" />
      {/* Stand */}
      <path d="M30 92 L28 60 L52 60 L50 92Z" fill="#C9972C" />
      <path d="M29 76 L51 76" stroke="#C9962A" strokeWidth="1.5" />
      <path d="M28.5 68 L51.5 68" stroke="#C9962A" strokeWidth="1.5" />
      {/* Bowl */}
      <ellipse cx="40" cy="60" rx="18" ry="8" fill="#C9972C" />
      <path d="M22 60 Q22 52 40 52 Q58 52 58 60" fill="#B8860B" />
      {/* Wick holder */}
      <circle cx="40" cy="52" r="4" fill="#C9962A" />
      {/* Flame outer */}
      <path
        d="M40 48 C38 44 35 40 36 34 C37 28 40 24 40 18 C40 24 43 28 44 34 C45 40 42 44 40 48Z"
        fill="url(#flame-grad)"
        style={{ transformOrigin: "40px 48px", animation: "flameFull 1.5s ease-in-out infinite" }}
      />
      {/* Flame inner */}
      <path
        d="M40 46 C39 43 37.5 40 38 36 C38.5 32 40 29 40 24 C40 29 41.5 32 42 36 C42.5 40 41 43 40 46Z"
        fill="url(#flame-inner-grad)"
        style={{ transformOrigin: "40px 46px", animation: "flameFull 1.2s ease-in-out infinite reverse" }}
      />
      {/* Glow */}
      <ellipse cx="40" cy="46" rx="10" ry="10" fill="rgba(255,200,0,0.12)" />
      <defs>
        <radialGradient id="flame-grad" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="60%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF4500" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id="flame-inner-grad" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#FFFAF0" />
          <stop offset="100%" stopColor="#FFD700" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/** Kolam / Rangoli SVG for preloader */
export function KolamSVG({ size = 300, animated = false, className = "" }: { size?: number; animated?: boolean; className?: string }) {
  const pathClass = animated ? "kolam-path" : "";
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" fill="none" className={className} aria-label="Kolam pattern">
      {/* Outer petals */}
      <path className={pathClass} d="M150 30 C170 60 200 80 230 90 C200 100 170 120 150 150 C130 120 100 100 70 90 C100 80 130 60 150 30Z"
        stroke="#C9972C" strokeWidth="1.5" strokeLinecap="round" />
      <path className={pathClass} d="M150 270 C170 240 200 220 230 210 C200 200 170 180 150 150 C130 180 100 200 70 210 C100 220 130 240 150 270Z"
        stroke="#C9972C" strokeWidth="1.5" strokeLinecap="round" style={{ animationDelay: "0.3s" }} />
      <path className={pathClass} d="M30 150 C60 170 80 200 90 230 C100 200 120 170 150 150 C120 130 100 100 90 70 C80 100 60 130 30 150Z"
        stroke="#C9972C" strokeWidth="1.5" strokeLinecap="round" style={{ animationDelay: "0.6s" }} />
      <path className={pathClass} d="M270 150 C240 170 220 200 210 230 C200 200 180 170 150 150 C180 130 200 100 210 70 C220 100 240 130 270 150Z"
        stroke="#C9972C" strokeWidth="1.5" strokeLinecap="round" style={{ animationDelay: "0.9s" }} />
      {/* Diagonal petals */}
      {[45, 135, 225, 315].map((angle, i) => (
        <path key={angle} className={pathClass}
          d={`M${150 + 95 * Math.cos((angle - 20) * Math.PI / 180)} ${150 + 95 * Math.sin((angle - 20) * Math.PI / 180)} Q${150 + 50 * Math.cos(angle * Math.PI / 180)} ${150 + 50 * Math.sin(angle * Math.PI / 180)} ${150 + 95 * Math.cos((angle + 20) * Math.PI / 180)} ${150 + 95 * Math.sin((angle + 20) * Math.PI / 180)}`}
          stroke="#E34234" strokeWidth="1" strokeLinecap="round"
          style={{ animationDelay: `${1.2 + i * 0.2}s` }}
        />
      ))}
      {/* Inner lotus */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = i * 45 * Math.PI / 180;
        return (
          <ellipse key={i} className={pathClass} cx={150 + 40 * Math.cos(a)} cy={150 + 40 * Math.sin(a)}
            rx="12" ry="20"
            transform={`rotate(${i * 45} ${150 + 40 * Math.cos(a)} ${150 + 40 * Math.sin(a)})`}
            stroke="#C9972C" strokeWidth="1" style={{ animationDelay: `${2 + i * 0.1}s` }}
          />
        );
      })}
      {/* Center dot */}
      <circle cx="150" cy="150" r="8" stroke="#C9972C" strokeWidth="2" />
      <circle cx="150" cy="150" r="3" fill="#C9972C" />
      {/* Outer ring */}
      <circle className={pathClass} cx="150" cy="150" r="130" stroke="#C9972C" strokeWidth="0.5" strokeDasharray="4 4" style={{ animationDelay: "2.5s" }} />
      <circle className={pathClass} cx="150" cy="150" r="110" stroke="#C4786A" strokeWidth="0.5" strokeDasharray="2 6" style={{ animationDelay: "2.8s" }} />
    </svg>
  );
}

/** Mango Paisley Border SVG */
export function PaisleyBorderSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 80" fill="none" className={className} preserveAspectRatio="none">
      {/* Repeating paisley pattern */}
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i} transform={`translate(${i * 80}, 0)`}>
          <path
            d="M40 10 C20 10 5 25 5 40 C5 60 20 70 40 70 C55 70 65 60 70 45 C75 30 68 15 55 10 C50 8 45 8 40 10Z"
            stroke="#C9972C" strokeWidth="1" fill="none" opacity="0.6"
          />
          <circle cx="40" cy="40" r="4" fill="#C9972C" opacity="0.5" />
        </g>
      ))}
      {/* Top & bottom lines */}
      <line x1="0" y1="4" x2="800" y2="4" stroke="#C9972C" strokeWidth="1" opacity="0.4" />
      <line x1="0" y1="76" x2="800" y2="76" stroke="#C9972C" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/** Lotus Divider SVG */
export function LotusDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
      <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(90deg, transparent, #C9972C)" }} />
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <ellipse
            key={i}
            cx={24 + 14 * Math.cos(a * Math.PI / 180)}
            cy={24 + 14 * Math.sin(a * Math.PI / 180)}
            rx="6" ry="10"
            transform={`rotate(${a} ${24 + 14 * Math.cos(a * Math.PI / 180)} ${24 + 14 * Math.sin(a * Math.PI / 180)})`}
            fill="#C9972C" opacity="0.5"
          />
        ))}
        <circle cx="24" cy="24" r="6" fill="#C4786A" opacity="0.8" />
        <circle cx="24" cy="24" r="3" fill="#C9972C" />
      </svg>
      <div className="h-px flex-1 max-w-24" style={{ background: "linear-gradient(90deg, #C9972C, transparent)" }} />
    </div>
  );
}

/** Temple Gopuram Silhouette (top decoration) */
export function GopuramSilhouette({ className = "" }: { className?: string }) {
  // Kerala-style temple: wide tiered sloped roofs, rounded sopanam spire, copper finial
  return (
    <svg viewBox="0 0 400 130" fill="none" className={className} preserveAspectRatio="xMidYMax meet" aria-label="Kerala temple">
      {/* Ground platform */}
      <rect x="30" y="118" width="340" height="12" fill="#C4786A" opacity="0.10" rx="1" />
      {/* Mandapa base wall */}
      <rect x="70" y="96" width="260" height="22" fill="#C4786A" opacity="0.10" />
      {/* Pillars */}
      {[92, 120, 148, 176, 204, 232, 260, 288].map((x, i) => (
        <rect key={i} x={x} y="88" width="5" height="30" fill="#C9972C" opacity="0.28" rx="2" />
      ))}
      {/* Lowest wide roof tier — Kerala curved sloping eaves */}
      <path d="M35 96 Q80 90 110 82 L200 60 L290 82 Q320 90 365 96Z" fill="#C4786A" opacity="0.16" />
      {/* Eave accent line */}
      <line x1="100" y1="82" x2="300" y2="82" stroke="#C9972C" strokeWidth="0.6" opacity="0.25" />
      {/* Middle roof tier */}
      <path d="M105 82 Q140 76 165 68 L200 52 L235 68 Q260 76 295 82Z" fill="#C4786A" opacity="0.14" />
      <line x1="140" y1="68" x2="260" y2="68" stroke="#C9972C" strokeWidth="0.6" opacity="0.22" />
      {/* Upper roof tier */}
      <path d="M150 68 Q170 62 183 54 L200 42 L217 54 Q230 62 250 68Z" fill="#C4786A" opacity="0.13" />
      <line x1="168" y1="54" x2="232" y2="54" stroke="#C9972C" strokeWidth="0.5" opacity="0.20" />
      {/* Top small tier */}
      <path d="M178 54 L200 38 L222 54Z" fill="#C4786A" opacity="0.11" />
      {/* Rounded Kerala sopanam spire stem */}
      <path d="M195 38 L197 31 Q200 20 203 31 L205 38Z" fill="#C9972C" opacity="0.45" />
      {/* Copper finial (amalaka) — elongated oval */}
      <ellipse cx="200" cy="16" rx="4.5" ry="7" fill="#C9972C" opacity="0.50" />
      {/* Copper top orb */}
      <circle cx="200" cy="8" r="2.8" fill="#C9972C" opacity="0.48" />
      {/* Flag staff */}
      <line x1="200" y1="5" x2="200" y2="-1" stroke="#C9972C" strokeWidth="0.9" opacity="0.38" />
      {/* Small pennant */}
      <path d="M200 -1 L207 2 L200 5Z" fill="#E34234" opacity="0.38" />
    </svg>
  );
}

/** Toran (Mango leaf garland) */
export function ToranSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 100" fill="none" className={className} preserveAspectRatio="xMidYMid meet">
      {/* String */}
      <path d="M0 20 Q150 35 300 20 Q450 35 600 20" stroke="#8B5E3C" strokeWidth="1.5" fill="none" />
      {/* Mango leaves */}
      {Array.from({ length: 14 }, (_, i) => {
        const x = i * 44 + 10;
        const y = 20 + Math.sin(i * 0.8) * 8;
        return (
          <g key={i}>
            <ellipse
              cx={x} cy={y + 30}
              rx="10" ry="18"
              fill={i % 3 === 0 ? "#006400" : i % 3 === 1 ? "#228B22" : "#32CD32"}
              opacity="0.75"
              transform={`rotate(${(i % 2 === 0 ? -15 : 15)} ${x} ${y + 30})`}
            />
            {/* Leaf vein */}
            <line x1={x} y1={y + 14} x2={x} y2={y + 46} stroke="#004000" strokeWidth="0.5" opacity="0.5"
              transform={`rotate(${(i % 2 === 0 ? -15 : 15)} ${x} ${y + 30})`} />
          </g>
        );
      })}
      {/* Coconuts */}
      {[60, 200, 340, 480, 550].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy={18} rx="10" ry="12" fill="#D2691E" opacity="0.5" />
          <path d="M-5 0 Q0 -15 5 0" stroke="#006400" strokeWidth="2" fill="none"
            transform={`translate(${x}, 6)`} opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

/** OM Symbol */
export function OmSymbol({ size = 60, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className} aria-label="Om symbol">
      <text x="50" y="72" textAnchor="middle" fontSize="70" fontFamily="serif" fill="#C9972C" opacity="0.9">ॐ</text>
    </svg>
  );
}

/** Mandala Section Divider */
export function MandalaDivider({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-6 my-6 ${className}`}>
      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, #C4786A 40%, transparent)" }} />
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
        {/* Rings */}
        <circle cx="40" cy="40" r="38" stroke="#C9972C" strokeWidth="0.5" strokeDasharray="3 3" />
        <circle cx="40" cy="40" r="30" stroke="#C4786A" strokeWidth="0.5" />
        <circle cx="40" cy="40" r="20" stroke="#C9972C" strokeWidth="0.5" />
        {/* Petals */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = i * 30 * Math.PI / 180;
          return (
            <ellipse key={i}
              cx={40 + 24 * Math.cos(a)} cy={40 + 24 * Math.sin(a)}
              rx="5" ry="8"
              transform={`rotate(${i * 30 + 90} ${40 + 24 * Math.cos(a)} ${40 + 24 * Math.sin(a)})`}
              fill="#C9972C" opacity="0.3"
            />
          );
        })}
        {/* Inner dots */}
        {Array.from({ length: 8 }, (_, i) => {
          const a = i * 45 * Math.PI / 180;
          return <circle key={i} cx={40 + 14 * Math.cos(a)} cy={40 + 14 * Math.sin(a)} r="2" fill="#C4786A" opacity="0.5" />;
        })}
        <circle cx="40" cy="40" r="4" fill="#C9972C" opacity="0.8" />
        <circle cx="40" cy="40" r="1.5" fill="#C4786A" />
      </svg>
      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, #C4786A 40%, transparent)" }} />
    </div>
  );
}

/** Ornamental corner border for cards */
export function OrnamentalCorner({ position = "tl", size = 50, className = "" }: { position?: "tl" | "tr" | "bl" | "br"; size?: number; className?: string }) {
  const rotations = { tl: 0, tr: 90, br: 180, bl: 270 };
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 50 50"
      fill="none"
      className={`absolute pointer-events-none ${className}`}
      style={{
        top: position.includes("t") ? 0 : "auto",
        bottom: position.includes("b") ? 0 : "auto",
        left: position.includes("l") ? 0 : "auto",
        right: position.includes("r") ? 0 : "auto",
        transform: `rotate(${rotations[position]}deg)`,
        transformOrigin: position === "tl" ? "top left" : position === "tr" ? "top right" : position === "br" ? "bottom right" : "bottom left",
      }}
      aria-hidden="true"
    >
      <path d="M2 48 L2 10 C2 6 6 2 10 2 L48 2" stroke="#C9972C" strokeWidth="2" strokeLinecap="round" />
      <path d="M2 48 L2 20 C2 12 12 2 20 2 L48 2" stroke="#C9972C" strokeWidth="0.5" opacity="0.5" strokeLinecap="round" />
      <circle cx="8" cy="8" r="3" stroke="#C9972C" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="1" fill="#C9972C" opacity="0.6" />
    </svg>
  );
}

/** Jasmine flower (small, for decorations) */
export function JasmineSVG({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => {
        const a = i * 72 * Math.PI / 180 - Math.PI / 2;
        return (
          <ellipse key={i}
            cx={12 + 6 * Math.cos(a)} cy={12 + 6 * Math.sin(a)}
            rx="3" ry="5"
            transform={`rotate(${i * 72 - 90} ${12 + 6 * Math.cos(a)} ${12 + 6 * Math.sin(a)})`}
            fill="white" opacity="0.9"
          />
        );
      })}
      <circle cx="12" cy="12" r="3" fill="#FFD700" />
    </svg>
  );
}
