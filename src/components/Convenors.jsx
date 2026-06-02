import React, { useEffect, useRef } from 'react';
import '../styles/Convenors.css';

const CONVENOR = {
  id: 'convenor',
  role: 'CONVENOR',
  name: 'PROF. Gargi Dutta',
  dept: '',
  image: '/assets/posters/banner.webp',
};

const JOINT_COORDINATORS = [
  {
    id: 'jc1',
    role: 'JOINT COORDINATOR',
    name: 'PROF. Sreyoshi Mitra',
    dept: '',
    image: '/assets/posters/banner.webp',
  },
  {
    id: 'jc2',
    role: 'JOINT COORDINATOR',
    name: 'PROF. Dwaipayan Chakraborty',
    dept: '',
    image: '/assets/posters/banner.webp',
  },
];

/* ─── Crown SVG decoration ─────────────────────────────── */
const CrownIcon = () => (
  <svg className="cvn-crown" viewBox="0 0 60 32" xmlns="http://www.w3.org/2000/svg">
    <polygon points="2,28 12,6 22,18 30,2 38,18 48,6 58,28" fill="none" stroke="#B8860B" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="2" y1="28" x2="58" y2="28" stroke="#B8860B" strokeWidth="1.5" />
    <circle cx="30" cy="2" r="2.5" fill="#D4A843" />
    <circle cx="12" cy="6" r="2" fill="#D4A843" />
    <circle cx="48" cy="6" r="2" fill="#D4A843" />
  </svg>
);

/* ─── Ornament divider ──────────────────────────────────── */
const OrnamentDivider = () => (
  <div className="cvn-ornament">
    <div className="cvn-ornament-line" />
    <div className="cvn-ornament-diamond" />
    <div className="cvn-ornament-line" />
  </div>
);

/* ─── Person Card ───────────────────────────────────────── */
const PersonCard = ({ person, isConvenor, index }) => (
  <div
    className={`cvn-card ${isConvenor ? 'cvn-card--convenor' : 'cvn-card--jc'}`}
    style={{ animationDelay: `${index * 0.15}s` }}
  >
    {/* Corner brackets */}
    <div className="cvn-corner cvn-corner--tl" />
    <div className="cvn-corner cvn-corner--tr" />
    <div className="cvn-corner cvn-corner--bl" />
    <div className="cvn-corner cvn-corner--br" />

    {/* Role badge */}
    <div className="cvn-role-badge">
      <span className="cvn-role-dot" />
      <span>{person.role}</span>
      <span className="cvn-role-dot" />
    </div>

    {/* Photo frame */}
    <div className="cvn-photo-wrap">
      <div className="cvn-photo-frame">
        <img
          src={person.image}
          alt={person.name}
          className="cvn-photo"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {/* Shimmer overlay on hover */}
        <div className="cvn-photo-shimmer" />
      </div>
      {/* Gold ring around photo */}
      <div className="cvn-photo-ring" />
    </div>

    {/* Info */}
    <div className="cvn-info">
      <div className="cvn-name">{person.name}</div>
      <div className="cvn-dept">{person.dept}</div>
    </div>

    {/* Bottom glow bar */}
    <div className="cvn-bottombar" />
  </div>
);

/* ─── Main Section ──────────────────────────────────────── */
const Convenors = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('cvn-section--visible');
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="convenors" className="cvn-section" ref={sectionRef}>
      {/* Background accents */}
      <div className="cvn-bg-accent cvn-bg-accent--tl" />
      <div className="cvn-bg-accent cvn-bg-accent--br" />
      <div className="cvn-bg-seal" />

      <div className="cvn-inner">

        {/* ── Header ── */}
        <header className="cvn-header">
          <div className="cvn-eyebrow">
            <span className="cvn-dot" />
            <span>THE ROYAL COUNCIL</span>
            <span className="cvn-dot" />
          </div>

          <h2 className="cvn-title">
            <span className="cvn-title-text">Convenor</span>
            <span className="cvn-title-sub">&amp; Joint Coordinators</span>
          </h2>

          <OrnamentDivider />
        </header>

        {/* ── Cards Row — all 3 in same row ── */}
        <div className="cvn-grid">
          {/* Convenor — center, highlighted */}
          <PersonCard person={CONVENOR} isConvenor={true} index={1} />

          {/* Joint Coordinators */}
          {JOINT_COORDINATORS.map((jc, i) => (
            <PersonCard key={jc.id} person={jc} isConvenor={false} index={i === 0 ? 0 : 2} />
          ))}
        </div>

        {/* Bottom ornament */}
        <OrnamentDivider />
      </div>
    </section>
  );
};

export default Convenors;