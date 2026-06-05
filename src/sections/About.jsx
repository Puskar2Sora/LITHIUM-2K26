import React, { useEffect, useRef, useState } from 'react';
import '../styles/About.css';
import Floatchar from '../components/Floatchar';


const STATS = [
  { num: '500+', label: 'Students',    suffix: '',  color: '#FFE600' },
  { num: '10+',  label: 'Events',      suffix: '',  color: '#FF2D87' },
  { num: '6',    label: 'Genres',      suffix: '',  color: '#00D4FF' },
  { num: '1',    label: 'Epic Night',  suffix: '',  color: '#00FF88' },
];

const UNIVERSES = [
  { emoji: '🕷️', label: 'Spider-Verse' },
  { emoji: '🏴‍☠️', label: 'Caribbean'    },
  { emoji: '🧙',  label: 'Fantasy'      },
  { emoji: '🦸',  label: 'DC Universe'  },
  { emoji: '⚔️',  label: 'Medieval'     },
  { emoji: '🤖',  label: 'Future'       },
  { emoji: '🐉',  label: 'GoT'          },
  { emoji: '🧛',  label: 'Gothic'       },
];

/* Count-up hook */
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ''));
    if (!num) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* Single animated stat */
function StatItem({ stat, visible }) {
  const count = useCountUp(stat.num, 1600, visible);
  const suffix = stat.num.includes('+') ? '+' : '';
  return (
    <div className="ab-stat" style={{ '--sc': stat.color }}>
      <div className="ab-stat-bg" />
      <span className="ab-stat-num">
        {stat.num.replace(/\d+/, count)}{suffix !== '+' ? '' : ''}
      </span>
      <span className="ab-stat-lbl">{stat.label}</span>
      <div className="ab-stat-bar" />
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          setTimeout(() => setTextVisible(true), 300);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="ab-section" ref={sectionRef}>
      {/* ── DOT TEXTURE ── */}
     
      {/* ── DIAGONAL SLASH ── */}
      
      {/* ── FLOATING PARTICLES ── */}
      <div className="ab-particles">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className="ab-particle" style={{ '--pi': i }} />
        ))}
      </div>

      
      <div className="ab-inner">

        {/* ════ LEFT COLUMN — WRITING ════ */}
        <div className={`ab-left ${visible ? 'ab-left-in' : ''}`}>

          {/* Eyebrow */}
          <div className="ab-eyebrow">
            <br/>
            <span className="ab-ey-line" />
            <br/>
            <span className="ab-ey-txt" style={{ marginLeft: '20px' }}>✦ Who We Are ✦</span>
            <br/>
            
            <span className="ab-ey-line ab-ey-r" />
            <br/>
          </div>

          {/* Section title */}
          <div 
  className="ab-title-wrap" 
  style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    width: '100%' 
  }}
>
  <h2 className="ab-title" style={{ margin: 0 }}>
    {'ABOUT'.split('').map((ch, i) => (
      <span
        key={i}
        className="ab-title-ch"
        style={{ '--ti': i, display: 'inline-block' }}
      >
        {ch}
      </span>
    ))}
  </h2>
  <div className="ab-title-sub">LITHIUM 2K26</div>
</div>
          <div className="ab-text-block">
            <p className="ab-para ab-p1" style={{ '--di': 0 }}>
  <span className="ab-drop-cap">L</span>
  ithium marks the beginning of an exciting new chapter for the newest members of <strong>  Techno Bengal Institute of Technology </strong> 
  family. More than just a Freshers' Welcome, Lithium is a celebration of dreams, talent, friendship, and the vibrant spirit of college life.
Lithium aims to provide first-year students with a memorable introduction to campus culture, helping them connect with seniors, faculty members.
The event will feature spectacular cultural performances, music, dance, entertainment segments, interactive activities, and inspiring moments that showcase the creativity and unity of the BIT community.
Lithium has always been one of the most awaited celebrations at BIT, bringing together students from different departments to create unforgettable memories and strengthen the bonds that make our institution a family.
  </p>
          </div>
        </div>





<div className={`ab-left ${visible ? 'ab-left-in' : ''}`}>

 
  <h2 className="ab-tit" style={{ margin: 0 }}>
    {'THEME'.split('').map((ch, i) => (
      <span
        key={i}
        className="ab-title-c"
        style={{ '--ti': i, display: 'inline-block' }}
      >
        {ch}
      </span>
    ))}
  </h2>
  <br/>
  <div className="ab-title-su">DREAMSCAPE</div>

          {/* Animated text paragraphs */}
          <div className="ab-text-block">
           <p className="ab-para ab-p2" style={{ '--di': 1 }}>
              The theme <strong>DREAMSCAPE</strong> a sovereign invitation to step beyond the mundane and traverse the thin membrane between dimensions. In this realm, your imagination is the only law. 
              We beckon you to cast aside the ordinary and ascend as the legends you admire.
Whether you walk the path of the High Seas, wield the Sorcery of the Ancients, navigate the Cyborg Frontiers of tomorrow, or swing through the Multiverse itself—your essence is the masterpiece of this night.
<br/>
<br/>
<strong> <span className="ab-drop-cap">DREAMSCAPE</span> Where every universe converges, and every guest is royalty.</strong>
            </p></div>
        </div>

        
      </div>
    </section>
  );
}