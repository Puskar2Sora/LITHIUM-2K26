import React from 'react';
import EventCard from '../components/EventCard';
import '../styles/Events.css';

/* ── Section ornament divider (fleur-de-lis + scrollwork) ── */
const OrnamentDivider = () => (
  <svg className="events-ornament" viewBox="0 0 460 44" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dlg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#9A7B2F" stopOpacity="0"/>
        <stop offset="20%"  stopColor="#9A7B2F" stopOpacity="1"/>
        <stop offset="50%"  stopColor="#C9973A" stopOpacity="1"/>
        <stop offset="80%"  stopColor="#9A7B2F" stopOpacity="1"/>
        <stop offset="100%" stopColor="#9A7B2F" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <line x1="0" y1="30" x2="460" y2="30" stroke="url(#dlg)" strokeWidth=".7"/>

    {/* fleur-de-lis centre */}
    <g transform="translate(230,30)">
      <path d="M0,-18 L3,-8 L0,-4 L-3,-8 Z" fill="#9A7B2F"/>
      <path d="M0,-4 L4,2 L0,8 L-4,2 Z" fill="#9A7B2F"/>
      <path d="M0,2 C-8,0 -14,-6 -12,-12 C-10,-17 -4,-14 -4,-10 C-4,-6 -8,-5 -8,-2 C-8,2 -2,4 0,2"
        fill="none" stroke="#9A7B2F" strokeWidth="1.2"/>
      <path d="M0,2 C8,0 14,-6 12,-12 C10,-17 4,-14 4,-10 C4,-6 8,-5 8,-2 C8,2 2,4 0,2"
        fill="none" stroke="#9A7B2F" strokeWidth="1.2"/>
    </g>

    {/* left scrollwork */}
    <g fill="none" stroke="#9A7B2F" strokeWidth="1.1">
      <path d="M185,30 C175,26 165,27 158,30"/>
      <path d="M150,30 C140,25 130,26 124,30"/>
      <path d="M115,30 C105,24 95,27 90,30"/>
      <path d="M80,30 C70,24 55,28 50,30 C44,32 38,28 36,24 C34,19 40,16 44,20"/>
      <path d="M16,30 C10,25 4,27 2,30 C0,34 4,37 8,34 C12,31 10,27 14,30"/>
      <circle cx="50"  cy="30" r="1.3" fill="#9A7B2F" stroke="none"/>
      <circle cx="90"  cy="30" r="1.3" fill="#9A7B2F" stroke="none"/>
      <circle cx="124" cy="30" r="1.3" fill="#9A7B2F" stroke="none"/>
    </g>

    {/* right scrollwork (mirror) */}
    <g fill="none" stroke="#9A7B2F" strokeWidth="1.1" transform="translate(460,0) scale(-1,1)">
      <path d="M185,30 C175,26 165,27 158,30"/>
      <path d="M150,30 C140,25 130,26 124,30"/>
      <path d="M115,30 C105,24 95,27 90,30"/>
      <path d="M80,30 C70,24 55,28 50,30 C44,32 38,28 36,24 C34,19 40,16 44,20"/>
      <path d="M16,30 C10,25 4,27 2,30 C0,34 4,37 8,34 C12,31 10,27 14,30"/>
      <circle cx="50"  cy="30" r="1.3" fill="#9A7B2F" stroke="none"/>
      <circle cx="90"  cy="30" r="1.3" fill="#9A7B2F" stroke="none"/>
      <circle cx="124" cy="30" r="1.3" fill="#9A7B2F" stroke="none"/>
    </g>

    {/* small accent diamonds */}
    <g fill="#9A7B2F" opacity=".5">
      <path d="M124,30 L127,27 L130,30 L127,33 Z"/>
      <path d="M330,30 L333,27 L336,30 L333,33 Z"/>
    </g>
  </svg>
);

/* ══════════════════════════════════
   EVENT LIST
   Add topImage / bottomImage keys
   when you have real assets ready.
══════════════════════════════════ */
const eventList = [
  {
    title: 'Musical Performances',
    desc: 'Soulful voices and mesmerising melodies from beyond any world.',
    tag: 'Live Stage',
      // e.g. '/images/music.jpg'
    bottomImage: '/assets/music.png', // e.g. '/images/music-footer.jpg'
  },
  {
    title: 'Dance Fiesta',
    desc: 'A cascade of rhythm, energy and expression across dimensions.',
    tag: 'Performance',
    topImage: null,
    bottomImage: '/assets/music.png',
  },
  {
    title: 'Talent Hunt',
    desc: 'Top talents created and discovered by world-class groomers.',
    tag: 'Groomers',
    topImage: null,
    bottomImage: '/assets/music.png',
  },
  {
    title: 'Drama & Skits',
    desc: 'Stories come alive under the spotlight. Become your character.',
    tag: 'Theatre',
    topImage: null,
    bottomImage: '/assets/music.png',
  },
  {
    title: 'Musical-Band Night',
    desc: 'Dance the veil away as the night ignites with beats and neon light.',
    tag: 'Night Event',
    topImage: null,
    bottomImage: '/assets/music.png',
  },
  {
    title: 'Surprise',
    desc: 'Something extraordinary is coming. Await the unknown.',
    tag: 'Mystery',
    topImage: null,
    bottomImage: '/assets/music.png',
  },
];

const Events = () => (
  <section id="events" className="royal-events-section">
    {/* ── FLOATING PARTICLES ── */}
      <div className="ab-particles">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className="ab-particle" style={{ '--pi': i }} />
        ))}
      </div>
    <div className="events-dot-bg"/>

    <div className="royal-events-inner">
      {/* ── Header ── */}
      <div className="royal-section-header">
        <span className="royal-section-label">✦ &nbsp;Line-Up&nbsp; ✦</span>
      <br/>
      <br/>
        <div className="royal-title-stack">
          <h2 className="royal-title-1">EVENT</h2>
          <h2 className="royal-title-2">HIGHLIGHTS</h2>
        </div>
      </div>

      {/* ── Ornament divider ── */}
      <OrnamentDivider/>

      {/* ── Cards ── */}
      <div className="royal-events-grid">
        {eventList.map((event, index) => (
          <EventCard
            key={index}
            index={index}
            title={event.title}
            description={event.desc}
            icon={event.icon}
            tag={event.tag}
            topImage={event.topImage}
            bottomImage={event.bottomImage}
          />
        ))}
      </div>
    </div>
  </section>
);

export default Events;