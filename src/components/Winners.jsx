import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/Winners.css';

const WINNERS = [
  { id: 1,  title: 'Best Couple',       name: 'Sagnik Roy Choudhury', instagram: '@sagnik.roy.chowdhury', year: '2K25', fc: '#C9973A', gc: 'rgba(201,151,58,0.55)',  tagline: 'Two Worlds, One Vibe',    img: '/assets-optimized/winners/saguda.webp',          crown: '', num: '01' },
  { id: 2,  title: 'Best Couple',       name: 'Tanisha Banerjee',     instagram: '@guitfiddle.tanisha',   year: '2K25', fc: '#C9973A', gc: 'rgba(201,151,58,0.55)',  tagline: 'Two Worlds, One Vibe',    img: '/assets-optimized/winners/Tanisha Banerjee.webp',crown: '', num: '02' },
  { id: 3,  title: 'Ms. Fresher',       name: 'Surasree Majumder',    instagram: '@areh._peculiar',       year: '2K25', fc: '#D4788A', gc: 'rgba(212,120,138,0.55)', tagline: 'Born to Shine',           img: '/assets-optimized/winners/surasree.webp',        crown: '', num: '03' },
  { id: 4,  title: 'Mr. Fresher',       name: 'Ayushman Das',         instagram: '@_ayushman_das',        year: '2K25', fc: '#D4788A', gc: 'rgba(212,120,138,0.55)', tagline: 'Grace & Glory',           img: '/assets-optimized/winners/Ayushman.webp',        crown: '', num: '04' },
  { id: 5,  title: 'Ms. Graceful',      name: 'Palak Ray',            instagram: '@x.palak.r',            year: '2K25', fc: '#5AB4C8', gc: 'rgba(90,180,200,0.55)',  tagline: 'Grace Yourself',          img: '/assets-optimized/winners/palak.webp',           crown: '', num: '05' },
  { id: 6,  title: 'Mr. Personality',   name: 'Atanu Karmakar',       instagram: '@arghhhaa',             year: '2K25', fc: '#4AB888', gc: 'rgba(74,184,136,0.55)',  tagline: 'Built Different',         img: '/assets-optimized/winners/Atanu.webp',           crown: '', num: '06' },
  { id: 7,  title: 'Ms. Personality',   name: 'Tanisa Naskar',        instagram: '@tanisa_naskar',        year: '2K25', fc: '#4AB888', gc: 'rgba(74,184,136,0.55)',  tagline: 'Personality is the Key',  img: '/assets-optimized/winners/tanisa.webp',          crown: '', num: '07' },
  { id: 8,  title: 'Mr. Charming',      name: 'Parthib Mandal',       instagram: '@parthib__mondal',       year: '2K25', fc: '#6B9EE8', gc: 'rgba(107,158,232,0.55)', tagline: 'Charm Beyond Measure',    img: '/assets-optimized/winners/parthib.webp',         crown: '', num: '08' },
  { id: 9,  title: '',      name: 'Khushi Yadav',         instagram: '@_khushi.__08',         year: '2K25', fc: '#6B9EE8', gc: 'rgba(107,158,232,0.55)', tagline: 'Light in Every Room',     img: '/assets-optimized/winners/khushi.webp',          crown: '', num: '09' },
  { id: 10, title: '',        name: 'Nargis Sultana',       instagram: '@_nargissultana._',     year: '2K25', fc: '#E87850', gc: 'rgba(232,120,80,0.55)',  tagline: 'Dare to Match My Vibe?',  img: '/assets-optimized/winners/nargis.webp',          crown: '', num: '10' },
  { id: 11, title: '',        name: 'Ankit Das',            instagram: '@tan_duri_chicken',     year: '2K25', fc: '#E87850', gc: 'rgba(232,120,80,0.55)',  tagline: 'Dare to Match My Vibe?',  img: '/assets-optimized/winners/Ankit Das.webp',       crown: '', num: '11' },
  { id: 12, title: '',        name: 'Monalisa Sen',         instagram: '@_misss_sen_',          year: '2K25', fc: '#A87DD8', gc: 'rgba(168,125,216,0.55)', tagline: "Let's Stay Together",     img: '/assets-optimized/winners/mona.webp',            crown: '', num: '12' },
  { id: 13, title: '',        name: 'Roumik Ghosh',         instagram: '@_itz_roumik_',         year: '2K25', fc: '#A87DD8', gc: 'rgba(168,125,216,0.55)', tagline: "Let's Stay Together",     img: '/assets/winners/roumik.jpg',          crown: '', num: '13' },
  { id: 14, title: '', name: 'Sujal Singh',          instagram: '@__singhsujal17',       year: '2K25', fc: '#D4B832', gc: 'rgba(212,184,50,0.55)',  tagline: 'Shining Above the Rest',  img: '/assets-optimized/winners/sujal.webp',           crown: '', num: '14' },
  { id: 15, title: '',      name: 'Anwesha Dey',          instagram: '@__.anw_sha.__',        year: '2K25', fc: '#38C4D4', gc: 'rgba(56,196,212,0.55)',  tagline: 'One Path, One Way',       img: '/assets-optimized/winners/aneswa.webp',          crown: '', num: '15' },
  { id: 16, title: '',      name: 'Sahim Uddin Farhan',   instagram: '@the_ethereal.sky',     year: '2K25', fc: '#38C4D4', gc: 'rgba(56,196,212,0.55)',  tagline: 'One Path, One Way',       img: '/assets-optimized/winners/sahim.webp',           crown: '', num: '16' },
];

const LOOP = [...WINNERS, ...WINNERS, ...WINNERS, ...WINNERS];

function useDragScroll() {
  const ref = useRef(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, vel: 0, lastX: 0, lastT: 0, raf: null });
  const cancelRaf = () => { if (drag.current.raf) cancelAnimationFrame(drag.current.raf); };

  function wrapScroll(node) {
    const q = node.scrollWidth / 4;
    if (node.scrollLeft < q)     node.scrollLeft += q * 2;
    if (node.scrollLeft > q * 3) node.scrollLeft -= q * 2;
  }

  function momentum() {
    const d = drag.current; const node = ref.current;
    if (!node) return;
    d.vel *= 0.93;
    node.scrollLeft += d.vel;
    wrapScroll(node);
    if (Math.abs(d.vel) > 0.3) d.raf = requestAnimationFrame(momentum);
  }

  const onDown = useCallback((e) => {
    const d = drag.current; const node = ref.current;
    cancelRaf();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    d.active = true; d.startX = x; d.scrollLeft = node.scrollLeft;
    d.vel = 0; d.lastX = x; d.lastT = Date.now();
    if (node) node.style.cursor = 'grabbing';
  }, []);

  const onMove = useCallback((e) => {
    const d = drag.current; const node = ref.current;
    if (!d.active) return;
    if (e.cancelable) e.preventDefault();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    node.scrollLeft = d.scrollLeft - (x - d.startX);
    wrapScroll(node);
    const now = Date.now(); const dt = Math.max(now - d.lastT, 1);
    d.vel = (d.lastX - x) / dt * 12;
    d.lastX = x; d.lastT = now;
  }, []);

  function onUp() {
    const d = drag.current; const node = ref.current;
    if (!d.active) return;
    d.active = false;
    if (node) node.style.cursor = 'grab';
    d.raf = requestAnimationFrame(momentum);
  }

  useEffect(() => {
    const node = ref.current; if (!node) return;
    const seed = () => { const t = node.scrollWidth / 4; if (t > 0) node.scrollLeft = t * 2; };
    const id = setTimeout(seed, 60);
    node.addEventListener('touchmove', (e) => onMove(e), { passive: false });
    return () => clearTimeout(id);
  }, [onMove]);

  return {
    ref,
    events: {
      onMouseDown: onDown, onMouseMove: onMove,
      onMouseUp: onUp,     onMouseLeave: onUp,
      onTouchStart: onDown, onTouchEnd: onUp,
    },
  };
}

function WinnerCard({ w, idx }) {
  const initials = w.name.trim().split(' ').map(n => n[0]).join('').slice(0, 2);

  const handleImgError = (e) => {
    e.currentTarget.style.display = 'none';
    const ph = e.currentTarget.parentElement.querySelector('.wn-ph');
    if (ph) ph.style.display = 'flex';
  };

  return (
    <div
      className="wn-card"
      style={{ '--fc': w.fc, '--gc': w.gc, '--idx': idx % WINNERS.length }}
    >
      <div className="wn-card-inner">

        {/* Floating crown */}
        <div className="wn-crown">{w.crown}</div>

        {/* ── FRAME ── */}
        <div className="wn-frame">
          {/* Corner diamonds — 4 tiny gems, nothing more */}
          
          <div className="wn-photo-wrap">
            <img
              src={w.img}
              alt={w.name}
              className="wn-photo"
              draggable="false"
              loading="lazy"
              decoding="async"
              onError={handleImgError}
            />
            <div className="wn-photo-grad" />

            <div className="wn-ph">
              <span className="wn-ph-icon">{w.crown}</span>
              <span className="wn-ph-init">{initials}</span>
            </div>
          </div>
        </div>

        {/* ── INFO ── */}
        <div className="wn-info">
          <span className="wn-num-mark">{w.num}</span>

          <p className="wn-title-lbl">{w.title}</p>
          <h3 className="wn-name">{w.name}</h3>
          <p className="wn-tagline">❝ {w.tagline} ❞</p>

          <div className="wn-divider">
            <span className="wn-div-line" />
            <span className="wn-div-gem">◆</span>
            <span className="wn-div-line" />
          </div>

          <a
            href={`https://instagram.com/${w.instagram.replace('@', '').trim()}`}
            className="wn-insta"
            target="_blank"
            rel="noreferrer"
          >
            <span className="wn-handle">{w.instagram}</span>
            <span className="wn-arr">↗</span>
          </a>
        </div>

      </div>
    </div>
  );
}

export default function Winners() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const { ref: trackRef, events } = useDragScroll();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="winners"
      className={`wn-section ${visible ? 'wn-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="wn-dots" />
      <div className="wn-glow-top" />
      <div className="wn-glow-btm" />

      {/* Header */}
      <div className="wn-header">
        <div className="wn-eyebrow-row">
          <span className="wn-ey-line" />
          <span className="wn-ey-txt">⚜ Hall of Fame · 2K25 ⚜</span>
          <span className="wn-ey-line" />
        </div>
        <h2 className="wn-h-main">OUR &nbsp; LEGENDARY</h2>
        <h2 className="wn-h-accent">GROOMERS</h2>
      </div>

      {/* Ticker */}
      <div className="wn-ticker" aria-hidden="true">
        <div className="wn-ticker-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="wn-ticker-seg">
              ⚜ MR. FRESHER &nbsp;·&nbsp; MS. FRESHER &nbsp;·&nbsp; BEST COUPLE &nbsp;·&nbsp;
              MR. CHARMING &nbsp;·&nbsp; MS. GRACEFUL &nbsp;·&nbsp; MR. PERSONALITY &nbsp;·&nbsp;
              MS. PERSONALITY &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="wn-gallery">
        <div className="wn-fade-l" />
        <div className="wn-fade-r" />
        <div className="wn-cards" ref={trackRef} {...events}>
          {LOOP.map((w, idx) => (
            <WinnerCard key={`${w.id}-${idx}`} w={w} idx={idx} />
          ))}
        </div>
      </div>

      <div className="wn-scroll-hint">
        <span className="wn-sh-arr wn-sh-l">←</span>
        <span>drag to explore</span>
        <span className="wn-sh-arr wn-sh-r">→</span>
      </div>

    </section>
  );
}
