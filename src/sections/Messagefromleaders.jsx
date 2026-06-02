import React, { useEffect, useRef, useState } from 'react';
import '../styles/Messagefromleaders.css';


const LEADERS = [
  {
    id: 'director',
    role: 'DIRECTOR',
    name: 'DR. NARAYAN CHANDRA GHOSH',
    dept: 'Director of Techno Bengal Institute Of Technology',
    accentColor: '#FFE600',
    glowColor: 'rgba(255,230,0,0.25)',
    badgeIcon: '',
    videoSrc: '/assets/videos/director.mp4',
    poster: '/assets/posters/banner.webp',
  },
  {
    id: 'principal',
    role: 'PRINCIPAL',
    name: "DR. SHANTA PHANI",
    dept: 'Principal of Techno Bengal Institute Of Technology',
    accentColor: '#FF2D87',
    glowColor: 'rgba(255,45,135,0.25)',
    badgeIcon: '',
    videoSrc: '/assets/videos/principal.mp4',
    poster: '/assets/posters/banner.webp',
  },
];

/* ─── Video Card ─────────────────────────────────────────── */
const VideoCard = ({ leader, index, isVisible }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else         { v.play();  setPlaying(true);  }
  };

  return (
    <div
      className={`mfl-card ${isVisible ? 'mfl-card--in' : ''}`}
      style={{
        '--accent': leader.accentColor,
        '--glow': leader.glowColor,
        animationDelay: `${index * 0.2}s`,
      }}
    >
      {/* ── Top label bar ── */}
     
      {/* ── Video frame ── */}
      <div className="mfl-video-wrap">
        {/* Plain video — NO filter, plays with sound */}
        <video
          ref={videoRef}
          className="mfl-video"
          src={leader.videoSrc}
          poster={leader.poster}
          preload="auto"
          playsInline
          onEnded={() => setPlaying(false)}
        />

        {/* Corner brackets */}
        <div className="mfl-frame-corner mfl-frame-corner--tl" />
        <div className="mfl-frame-corner mfl-frame-corner--tr" />
        <div className="mfl-frame-corner mfl-frame-corner--bl" />
        <div className="mfl-frame-corner mfl-frame-corner--br" />

        {/* Big centered play overlay — only when paused */}
        {!playing && (
          <div className="mfl-video-overlay" onClick={togglePlay}>
            <div className="mfl-play-btn">
              {/* Triangle SVG play icon */}
              <svg className="mfl-play-svg" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,6 30,18 10,30" fill="#000" />
              </svg>
            </div>
            <span className="mfl-video-label">PRESS PLAY</span>
          </div>
        )}

        {/* Small pause pill — bottom-right, only while playing */}
        {playing && (
          <button className="mfl-pause-fab" onClick={togglePlay} aria-label="Pause video">
            {/* Two-bar pause SVG */}
            <svg className="mfl-pause-svg" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
              <rect x="8"  y="6" width="8" height="24" rx="2" fill="#000" />
              <rect x="20" y="6" width="8" height="24" rx="2" fill="#000" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Info ── */}
      <div className="mfl-card-info">
        <div className="mfl-card-name">{leader.name}</div>
        <div className="mfl-card-dept">{leader.dept}</div>
      </div>

      {/* Bottom animated bar */}
      <div className="mfl-card-bottombar" />
    </div>
  );
};

/* ─── Main Section ───────────────────────────────────────── */
const MessageFromLeaders = () => {
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
    <section id="leaders" className="mfl-section" ref={sectionRef}>
      <div className="mfl-slash-accent" />

      {/* Floatchar — desktop size */}
     
      <br />

      <div className={`mfl-inner ${visible ? 'mfl-inner--visible' : ''}`}>
        <br />

        {/* ── Header ── */}
        <header className="mfl-header">
          <div className="mfl-eyebrow">
            <span className="mfl-dot" />
            <span>TRANSMISSION INCOMING</span>
            <span className="mfl-dot" />
          </div>
          <h2 className="mfl-title">
            <span className="mfl-title-line2">Message</span>
          </h2>
        </header>

        {/* ── Video Cards ── */}
        <div className="mfl-cards-grid">
          {LEADERS.map((leader, i) => (
            <VideoCard key={leader.id} leader={leader} index={i} isVisible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MessageFromLeaders;