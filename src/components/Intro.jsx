import { useEffect, useRef, useState } from "react";
import Floatchar from "../components/Floatchar";
import "../styles/Intro.css";
export default function Intro({ onComplete, duration = 6000 }) {
  const [phase, setPhase] = useState("drawing"); // "drawing" | "hold" | "fading" | "done"

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"),   5000);
    const t2 = setTimeout(() => setPhase("fading"), 5400);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, duration);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete, duration]);
  if (phase === "done") return null;
  return (
    <>
      <style>{`
        @keyframes lithium-draw { to { stroke-dashoffset: 0; } }
      `}</style>

      <div
        aria-label="Loading Lithium 2K26"
        role="status"
        style={{
          position:       "fixed",
          inset:          0,
          background:     "#C9C0B3",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          zIndex:         9999,
          opacity:        phase === "fading" ? 0 : 1,
          transition:     phase === "fading" ? "opacity 0.8s ease" : "none",
          pointerEvents:  "none",
          willChange:     "opacity",
        }}
      >
        
        <LithiumWordmark animate={phase === "drawing"} />
      </div>
    </>
  );
}
function LithiumWordmark({ animate }) {
  const dark = "#2A211A";
  const red  = "#8B2525";
  const sw   = 3.2;
  const ss   = 2.0;
  const ease = "cubic-bezier(0.45,0,0.2,1)";

  const segments = [
  // ── L ──────────────────────────────────────────────────────
  { d:"M100,18 L100,102 L140,102",                                len:198, delay:0.08, dur:0.54, color:dark, sw  },
  
  // ── I ──────────────────────────────────────────────────────
  { d:"M200,18 L160,18",                                          len:20,  delay:0.73, dur:0.14, color:dark, sw:ss },
  { d:"M180,18 L180,102",                                         len:108, delay:0.79, dur:0.42, color:dark, sw  },
  { d:"M200,102 L160,102",                                        len:20,  delay:1.17, dur:0.14, color:dark, sw:ss },

  // ── T ──────────────────────────────────────────────────────
  { d:"M220,18 L272,18",                                          len:50,  delay:1.34, dur:0.25, color:dark, sw:ss },
  { d:"M245,18 L245,102",                                         len:108, delay:1.50, dur:0.42, color:dark, sw  },
  
  // ── H ──────────────────────────────────────────────────────
  { d:"M305,18 L305,102",                                         len:108, delay:2.10, dur:0.42, color:dark, sw  },
  { d:"M365,18 L365,102",                                         len:108, delay:2.24, dur:0.42, color:dark, sw  },
  { d:"M305,60 L365,60",                                          len:52,  delay:2.60, dur:0.22, color:dark, sw:2.8},
  
  // ── I ──────────────────────────────────────────────────────
  { d:"M400,18 L435,18",                                          len:20,  delay:2.80, dur:0.14, color:dark, sw:ss },
  { d:"M417,18 L417,102",                                         len:108, delay:2.86, dur:0.42, color:dark, sw  },
  { d:"M400,102 L435,102",                                        len:20,  delay:3.24, dur:0.14, color:dark, sw:ss },

  // ── U ──────────────────────────────────────────────────────
  { d:"M466,18 L466,80 Q466,106 492,106 Q518,106 518,80 L518,18", len:228, delay:3.46, dur:0.72, color:dark, sw  },

  // ── M ──────────────────────────────────────────────────────
  { d:"M538,102 L538,18 L572,66 L606,18 L606,102",                len:368, delay:4.26, dur:0.95, color:dark, sw  },
  ];
  return (
    <svg
      viewBox="0 0 720 120"
      width="800"
      height="200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {segments.map((seg, i) => (
        <DrawnPath
          key={i}
          d={seg.d}
          estimatedLen={seg.len}
          delay={seg.delay}
          duration={seg.dur}
          ease={ease}
          color={seg.color}
          strokeWidth={seg.sw}
          animate={animate}
        />
      ))}
    </svg>
  );
}
/* ─────────────────────────────────────────────────────────────────────────────
   DrawnPath — stroke-dashoffset drawing trick
───────────────────────────────────────────────────────────────────────────── */
function DrawnPath({ d, estimatedLen, delay, duration, ease, color, strokeWidth, animate }) {
  const pathRef = useRef(null);
  const [length, setLength] = useState(estimatedLen);

  useEffect(() => {
    if (pathRef.current) {
      const l = pathRef.current.getTotalLength?.();
      if (l && l > 0) setLength(l);
    }
  }, []);
  const animatedStyle = animate
    ? {
        strokeDasharray:  length,
        strokeDashoffset: length,
        animation: `lithium-draw ${duration}s ${ease} ${delay}s forwards`,
      }
    : {
        strokeDasharray:  "none",
        strokeDashoffset: 0,
      };
  return (
    <path
      ref={pathRef}
      d={d}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      style={animatedStyle}
    />
  );
}