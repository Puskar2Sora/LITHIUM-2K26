import { useEffect, useRef, useState } from "react";
import "../styles/Intro.css";

/**
 * Lithium 2K26 — Cinematic Intro
 *
 * Phases:
 *   "silent"  → ivory screen, brief breath
 *   "reveal"  → letters appear one-by-one (blur → sharp, rise)
 *   "hold"    → full wordmark rests ~1.2s; ornaments, rule, year label fade in
 *   "zooming" → text scales + blurs, overlay fades simultaneously
 *   "done"    → unmounts
 */
export default function Intro({ onDone }) {
  const [phase, setPhase] = useState("silent");

  const T_SILENT = 350;
  const T_REVEAL = 2600;
  const T_HOLD   = 1300;
  const T_ZOOM   = 950;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"),  T_SILENT);
    const t2 = setTimeout(() => setPhase("hold"),    T_SILENT + T_REVEAL);
    const t3 = setTimeout(() => setPhase("zooming"), T_SILENT + T_REVEAL + T_HOLD);
    const t4 = setTimeout(() => {
      setPhase("done");
      onDone?.();
    }, T_SILENT + T_REVEAL + T_HOLD + T_ZOOM);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (phase === "done") return null;

  const held    = phase === "hold" || phase === "zooming";
  const active  = phase !== "silent";

  return (
    <>
      <div className={`ci ci--${phase}`} aria-label="Loading Lithium 2K26" role="status">
        <div className="ci-grain"    aria-hidden="true" />
        <div className="ci-vignette" aria-hidden="true" />

        <ParticleDust active={phase === "reveal" || phase === "hold"} />

        {/* ── Central stage ── */}
        <div className={`ci-stage ci-stage--${phase}`} aria-hidden="true">

          {/* Flanking ornaments — appear during hold */}
          <span className={`ci-orn ci-orn--left${held ? " ci-orn--visible" : ""}`}>✦</span>

          {/* Wordmark column */}
          <div className="ci-column">

            {/* Top accent line */}
            <div className={`ci-accent-line${held ? " ci-accent-line--visible" : ""}`} />

            {/* The main word */}
            <WordReveal text="LITHIUM" active={active} held={held} />

            {/* Bottom gold rule that draws left→right */}
            <div className={`ci-rule${held ? " ci-rule--visible" : ""}`} />

            {/* Year label */}
            <p className={`ci-year${held ? " ci-year--visible" : ""}`}>2 0 2 6</p>

          </div>

          {/* Right ornament */}
          <span className={`ci-orn ci-orn--right${held ? " ci-orn--visible" : ""}`}>✦</span>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────
   WordReveal
───────────────────────────────────────────────────── */
function WordReveal({ text, active, held }) {
  return (
    <span className={`ci-word${held ? " ci-word--held" : ""}`}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className={`ci-letter${active ? " ci-letter--visible" : ""}`}
          style={{ transitionDelay: active ? `${i * 105}ms` : "0ms" }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────
   ParticleDust — warm gold ambient motes
───────────────────────────────────────────────────── */
function ParticleDust({ active }) {
  const pts = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id:    i,
      left:  Math.random() * 100,
      delay: Math.random() * -16,
      dur:   10 + Math.random() * 10,
      drift: (Math.random() - 0.5) * 70,
      spin:  (Math.random() - 0.5) * 360,
      op:    0.08 + Math.random() * 0.14,
      type:  i % 7 === 0 ? "gold" : i % 5 === 0 ? "fleck" : "dust",
    }))
  ).current;

  if (!active) return null;

  return (
    <>
      {pts.map((p) => (
        <span
          key={p.id}
          className={`ci-particle ci-particle--${p.type}`}
          style={{
            left:              `${p.left}%`,
            animationDuration: `${p.dur}s`,
            animationDelay:    `${p.delay}s`,
            "--p-drift":       `${p.drift}px`,
            "--p-spin":        `${p.spin}deg`,
            "--p-op":          p.op,
          }}
        />
      ))}
    </>
  );
}