import React, { useEffect, useState } from "react";
import "../styles/Hero.css";
import Floatchar from "../components/Floatchar";

const ORNAMENTS = ["✦","◆","⚜","✦","◆","⚜","✦","◆"];

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="royal-hero">

      {/* Parchment dot texture */}
      <div className="rh-texture" />

      {/* Diagonal warm light beam */}
      <div className="rh-beam" />

      {/* Floating ambient orbs */}
      <div className="rh-orb rh-orb-a" />
      <div className="rh-orb rh-orb-b" />
      <div className="rh-orb rh-orb-c" />

      {/* Ornamental floating particles */}
      <div className="rh-particles" aria-hidden="true">
        {ORNAMENTS.map((o, i) => (
          <span key={i} className="rh-petal" style={{ '--pi': i }}>{o}</span>
        ))}
      </div>

      {/* Institute logos */}
      <Floatchar
        src="/assets/chars/techno.png"
        alt="Techno"
        size={55}
        bottom="86%"
        right="25%"
        animation="none"
        glowColor="#fefefd00"
      />
      <Floatchar
        src="/assets/chars/bit.png"
        alt="TBIT"
        size={54}
        bottom="86%"
        right="55%"
        animation="none"
        glowColor="#f7f6f600"
      />

      {/* ═══ MAIN GRID ═══ */}
      <div className={`rh-inner ${visible ? 'rh-visible' : ''}`}>

        {/* ── LEFT ── */}
        <div className="rh-left">

          {/* [CHANGED] removed bare <br/> — spacing handled by .rh-left gap */}
<br/>
          {/* Crest eyebrow */}
          <div className="rh-eyebrow">
            <span className="rh-ey-line" />
            <span className="rh-ey-txt">⚜ Techno Bengal Institute of Technology ⚜</span>
            <span className="rh-ey-line" />
          </div>

          {/* Main title */}
          {/* [CHANGED] removed bare <br/> inside flex row — was breaking layout on mobile */}
          <div className="rh-title-block">
            <div className="rh-title-year">
              <span className="rh-yr-2k">LITHIUM</span>
              <br/>
              <span className="rh-yr-2k">2K</span>
              <span className="rh-yr-26">26</span>
            </div>
          </div>

          {/* Ornamental divider */}
          <div className="rh-divider">
            <span className="rh-div-line" />
            <span className="rh-div-gem">◆</span>
            <span className="rh-div-line" />
          </div>

          {/* Theme */}
          <div className="rh-theme-block">
            <span className="rh-theme-label">✦ Royal Theme ✦</span>
            <h2 className="rh-theme-name">DREAMSCAPE</h2>
          </div>

          {/* CTAs */}
          <div className="rh-cta">
            <a href="#about" className="rh-btn rh-btn-gold">
              <span className="rh-btn-icon">⚜</span>
<<<<<<< HEAD
              Enter INTO  the dream
=======
              Enter Into The Dream
>>>>>>> 708186357285734bc143401fa1fdc21706f2afb7
            </a>
            <a href="#venue" className="rh-btn rh-btn-ghost">
              Event Details
            </a>
          </div>
        </div>

        {/* ── RIGHT — Logo Stage ── */}
        <div className="rh-right">
          <div className="rh-medallion">
            <div className="rh-medallion-ring rh-ring-outer" />
            <div className="rh-medallion-ring rh-ring-mid" />
            <div className="rh-medallion-ring rh-ring-inner" />
            <div className="rh-medallion-glow" />
            <img
              className="rh-logo-img"
              src="/assets/chars/logoo.png"
              alt="Lithium 2026 logo"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>

      </div>

      {/* Bottom crest band */}
      <div className="rh-footer-band">
        <span className="rh-fb-line" />
        <span className="rh-fb-text">✦ FRESHER'S WELCOME 2026 ✦ DREAMSCAPE ✦</span>
        <span className="rh-fb-line" />
      </div>

    </section>
  );
}
