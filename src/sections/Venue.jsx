import React, { useEffect, useRef, useState } from 'react';
import '../styles/Venue.css';

const DETAILS = [
  {
    icon: '⚑',
    label: 'Venue',
    value: 'Mohit Moitra Manch',
    sub: ' Raja Manindra Rd, Tala, Paikpara, Kolkata-700037, West Bengal',
  },
  {
    icon: '◈',
    label: 'Date',
    value: '17th June, 2026',
    sub: 'Wednesday',
  },
  {
    icon: '◉',
    label: 'Time',
    value: '1:00 PM',
    sub: 'Doors open at 12:00 PM',
  },
];

const Venue = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="venue" className="ryl-venue" ref={sectionRef}>

      {/* Background texture layers */}
      <div className="ryl-bg-radial" />
      <div className="ryl-bg-vignette" />
      <div className="ryl-bg-lines" />

      {/* Ornamental corner pieces */}
      <div className="ryl-corner ryl-corner--tl">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4 L4 40 M4 4 L40 4" stroke="url(#cg)" strokeWidth="1.2"/>
          <path d="M4 4 L20 20" stroke="url(#cg)" strokeWidth="0.8" strokeDasharray="2 3"/>
          <circle cx="4" cy="4" r="2.5" fill="#C9973A"/>
          <circle cx="40" cy="4" r="1.2" fill="#C9973A" opacity="0.5"/>
          <circle cx="4" cy="40" r="1.2" fill="#C9973A" opacity="0.5"/>
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C9973A"/>
              <stop offset="100%" stopColor="#C9973A" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="ryl-corner ryl-corner--tr">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M76 4 L76 40 M76 4 L40 4" stroke="url(#cgr)" strokeWidth="1.2"/>
          <path d="M76 4 L60 20" stroke="url(#cgr)" strokeWidth="0.8" strokeDasharray="2 3"/>
          <circle cx="76" cy="4" r="2.5" fill="#C9973A"/>
          <defs>
            <linearGradient id="cgr" x1="80" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C9973A"/>
              <stop offset="100%" stopColor="#C9973A" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="ryl-corner ryl-corner--bl">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 76 L4 40 M4 76 L40 76" stroke="url(#cgb)" strokeWidth="1.2"/>
          <circle cx="4" cy="76" r="2.5" fill="#C9973A"/>
          <defs>
            <linearGradient id="cgb" x1="0" y1="80" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C9973A"/>
              <stop offset="100%" stopColor="#C9973A" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="ryl-corner ryl-corner--br">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M76 76 L76 40 M76 76 L40 76" stroke="url(#cgbr)" strokeWidth="1.2"/>
          <circle cx="76" cy="76" r="2.5" fill="#C9973A"/>
          <defs>
            <linearGradient id="cgbr" x1="80" y1="80" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C9973A"/>
              <stop offset="100%" stopColor="#C9973A" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className={`ryl-inner ${visible ? 'ryl-inner--visible' : ''}`}>

        {/* ── HEADER ── */}
        <header className="ryl-header">
          {/* Top ornament */}
          
          <h2 className="ryl-title">
            <span className="ryl-title-the">The</span>
            <span className="ryl-title-main">Grand Portal</span>
          </h2>

          <p className="ryl-subtitle">Where the journey begins</p>

          {/* Bottom ornament */}
          <div className="ryl-ornament ryl-ornament--bottom">
            <span className="ryl-orn-line" />
            <span className="ryl-orn-motif">❧</span>
            <span className="ryl-orn-line" />
          </div>
        </header>

        {/* ── BODY ── */}
        <div className="ryl-body">

          {/* LEFT: Detail Cards */}
          <div className="ryl-left">
            {DETAILS.map((d, i) => (
              <div
                key={i}
                className="ryl-card"
                style={{ '--ci': i }}
              >
                {/* Top border accent */}
                <div className="ryl-card-accent" />

                <div className="ryl-card-icon-wrap">
                  <span className="ryl-card-icon">{d.icon}</span>
                </div>

                <div className="ryl-card-body">
                  <span className="ryl-card-label">{d.label}</span>
                  <span className="ryl-card-value">{d.value}</span>
                  <span className="ryl-card-sub">{d.sub}</span>
                </div>

                {/* Hover shimmer */}
                <div className="ryl-card-shimmer" />
              </div>
            ))}

            <a
             href="https://maps.app.goo.gl/ym5JoerQVnBAZKhz6"
  target="_blank"
  rel="noreferrer"
  className="ryl-cta"
>
              <span className="ryl-cta-inner">
                <span className="ryl-cta-icon">✦</span>
                <span className="ryl-cta-text">Obtain Directions</span>
                <span className="ryl-cta-arrow">→</span>
              </span>
              <div className="ryl-cta-glow" />
            </a>
          </div>

          {/* RIGHT: Map */}
          <div className="ryl-right">
            <div className="ryl-map-wrap">

              {/* Map header */}
              <div className="ryl-map-header">
                <span className="ryl-map-title">Location</span>
                <span className="ryl-map-coords">22.5939° N &nbsp;·&nbsp; 88.4067° E</span>
              </div>

              {/* Map frame with ornamental overlay */}
              {/* Map frame with ornamental overlay */}
<div className="ryl-map-frame">
  <iframe
    title="Venue Map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.1133163639565!2d88.3804600744876!3d22.61224327946346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d503e06cb7b%3A0xf01fd00a505fde18!2sMohit%20Moitra%20Mancha%2C%20Tala!5e0!3m2!1sen!2sin!4v1779608023813!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0, display: 'block' }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
  {/* Map overlay frame corners */}
  <div className="ryl-map-overlay" />
</div>

{/* Map footer */}
<div className="ryl-map-footer">
  <span className="ryl-map-pin">◈</span>
  <span>Raja Manindra Rd, Tala, Paikpara, Kolkata-700037</span>
</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;