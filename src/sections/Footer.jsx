import React, { useState, useEffect, useRef } from 'react';
import '../styles/Footer.css';
import FloatChar from '../components/Floatchar';

const NAV = [
  { label: 'Home',    href: '#home'    },
  { label: 'Events',  href: '#events'  },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Venue',   href: '#venue'   },
];

const SOCIALS = [
  { 
    icon: '/assets-optimized/icons/insta.webp', 
    label: 'Instagram', 
    handle: '@tbit_lithium2k26',      
    href: 'https://www.instagram.com/tbit_lithium2k26' 
  },
  { 
    icon: '/assets-optimized/icons/whatsapp.webp', 
    label: 'WhatsApp',  
    handle: 'LITHIUM 2K26 Group',        
    href: 'https://chat.whatsapp.com/BT1bPV3g4JnFpjwy2dIJWN?mode=gi_t' 
  },
  { 
    icon: '/assets-optimized/icons/gmail.webp', 
    label: 'Email',      
    handle: 'boitkolkata@gmail.com',   
    href: 'mailto:boitkolkata@gmail.com' 
  },
  { 
    icon: '/assets-optimized/icons/facebook.webp', 
    label: 'Facebook',  
    handle: 'Lithium 2k26',          
    href: 'https://www.facebook.com/LITHIUM2K23?rdid=w4yznTAycBnyysMU&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F168qwXXAoE%2F#' 
  },
];

/* Stable star/meteor data — generated once */
const STARS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  left:     `${(Math.random() * 100).toFixed(2)}%`,
  top:      `${(Math.random() * 100).toFixed(2)}%`,
  size:     Math.random() * 2.2 + 0.3,
  delay:    `${(Math.random() * 7).toFixed(2)}s`,
  duration: `${(Math.random() * 4 + 2.5).toFixed(2)}s`,
  color:    i % 9 === 0 ? '#00D4FF' : i % 15 === 0 ? '#FF2D87' : i % 22 === 0 ? '#FFE600' : '#ffffff',
}));

const METEORS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left:     `${(Math.random() * 120 - 10).toFixed(2)}%`,
  top:      `${(Math.random() * 50 - 10).toFixed(2)}%`,
  delay:    `${(Math.random() * 16).toFixed(2)}s`,
  duration: `${(Math.random() * 2 + 1.5).toFixed(2)}s`,
  length:   Math.random() * 130 + 60,
  color:    ['rgba(255,255,255,0.85)', 'rgba(255,230,0,0.8)', 'rgba(0,212,255,0.8)', 'rgba(255,45,135,0.75)'][i % 4],
}));

const PHRASE = 'DREAMSCAPE';

export default function Footer() {
  const [hovered, setHovered]   = useState(null);
  const [typed,   setTyped]     = useState('');
  const [visible, setVisible]   = useState(false);
  const sectionRef              = useRef(null);

  /* Intersection observer — animate in when visible */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Typewriter loop */
  useEffect(() => {
    let i = 0, forward = true, timer;
    const tick = () => {
      if (forward) {
        i++;
        setTyped(PHRASE.slice(0, i));
        if (i === PHRASE.length) { forward = false; timer = setTimeout(tick, 2400); return; }
      } else {
        i--;
        setTyped(PHRASE.slice(0, i));
        if (i === 0) { forward = true; timer = setTimeout(tick, 500); return; }
      }
      timer = setTimeout(tick, forward ? 100 : 55);
    };
    timer = setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className={`ft ${visible ? 'ft-visible' : ''}`} ref={sectionRef}>

      {/* ── BG STARS + METEORS ── */}
      <div className="ft-sky" aria-hidden>
        <div className="ft-meteor-layer">
          {METEORS.map(m => (
            <span key={m.id} className="ft-meteor" style={{
              left: m.left, top: m.top,
              width: `${m.length}px`,
              background: `linear-gradient(90deg, ${m.color}, transparent)`,
              animationDelay: m.delay,
              animationDuration: m.duration,
            }} />
          ))}
        </div>
        {STARS.map(s => (
          <span key={s.id} className="ft-star" style={{
            left: s.left, top: s.top,
            width: `${s.size}px`, height: `${s.size}px`,
            background: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }} />
        ))}
      </div>


   <FloatChar
      src="/assets/chars/royal.png"
      alt="Miles Morales"
      size={200}
      bottom="71%"
      right="26%"
      animation="none"     // float | swing | bob | spin-slow
      glowColor="#f7f4f500"
   />
      {/* Nebula washes */}
      <div className="ft-nb ft-nb1" />
      <div className="ft-nb ft-nb2" />
      <div className="ft-nb ft-nb3" />

      <div className="ft-inner">

        {/* ════════════════════════════
            BRAND HERO
        ════════════════════════════ */}
        <div className="ft-brand-section">
          <div className="ft-brand-center">
            {/* Eyebrow */}
            
            {/* Main wordmark */}
             <div className="rh-title-block">
            <div className="rh-title-year">
              <span className="rh-yr-2k">LITHIUM</span>
              <br/>
              <span className="rh-yr-2k">2K</span>
              <span className="rh-yr-26">26</span>
            </div>
          </div>


            {/* Typewriter theme */}
            <div className="ft-tw">
              <span className="ft-tw-label">✦ THEME ✦</span>
              <div className="ft-tw-screen">
                <span className="ft-tw-txt">{typed}</span>
                <span className="ft-tw-caret">|</span>
              </div>
            </div>

            {/* Tagline */}
            <p className="ft-tagline">
              Escape From The Dream<br />Face The Reality.
            </p>
          </div>
        </div>
        
      
        {/* ════════════════════════════
            INFO GRID
        ════════════════════════════ */}
        <div className="ft-grid">
          {/* Event details */}
          <div className="ft-col ft-col-event">
            <div className="ft-col-hd">
              <span className="ft-col-hd-bar" />
              THE EVENT
            </div>
            {[
              { icon: '', lbl: 'DATE',    val: '17th June, 2026'                              },
              { icon: '', lbl: 'TIME',    val: '1:00 PM onwards'                            },
              { icon: '', lbl: 'VENUE',   val: 'Mohit Moitra Mancha, Kolkata'    },
              { icon: '', lbl: 'HOST',    val: 'Techno Bengal Institute of Technology'       },
            ].map((r, i) => (
              <div key={i} className="ft-event-row">
                <span className="ft-ev-ico">{r.icon}</span>
                <div>
                  <span className="ft-ev-lbl">{r.lbl}</span>
                  <span className="ft-ev-val">{r.val}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Connect */}
          <div className="ft-col">
            <div className="ft-col-hd">
              <span className="ft-col-hd-bar" />
              CONNECT
            </div>
            {SOCIALS.map((s, i) => (
  <a key={i} href={s.href} className="ft-social" target="_blank" rel="noopener noreferrer">
    <span className="ft-soc-ico">
      <img src={s.icon} alt={s.label} style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
    </span>
    <div className="ft-soc-txt">
      <span className="ft-soc-lbl">{s.label}</span>
      <span className="ft-soc-hdl">{s.handle}</span>
    </div>
    <span className="ft-soc-arr">›</span>
  </a>
))}
          </div>
        </div>

        {/* ════════════════════════════
            BOTTOM CREDIT
        ════════════════════════════ */}
        <div className="ft-bottom">
          <div className="ft-bottom-line" />

          <div className="ft-credit-row">
            

            <div className="ft-divider">
          <div className="ft-div-l" />
          <div className="ft-div-badge">
            <span className="ft-div-badge-txt">DREAMSCAPE</span>
          </div>
          <div className="ft-div-r" />
        </div>

            <p className="ft-copy">
              © 2026 Techno Bengal Institute of Technology
            </p>
            
          </div>
        </div>

      </div>
    </footer>
  );
}
