import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import Floatchar from '../components/Floatchar';

const NAV_ICONS = {
  Home:    'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  About:   'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  Events:  'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  Gallery: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  Venue:'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  Groomers:'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
   FAQ: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
};

const navLinks = [
  { name: 'Home',    href: '#home' },
  { name: 'About',   href: '#about' },
  { name: 'Events',  href: '#events' },
  { name: 'Gallery', href: '#gallery' },
  {name : 'Groomers', href: '#winners'},
  {name : 'Venue', href:'#venue'},
  {name : 'Team Lithium', href:'#lithiumteam'},
  {name : 'FAQ', href:'#faq'},
  
];

const NavIcon = ({ path }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive]  = useState('Home');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLink = (name) => {
    setActive(name);
    setIsOpen(false);
  };

  return (
    <>
      {/* ── FLOATING TOP BAR ── */}
      <div className="btv-topbar">

        {/* Logo */}
        <div className="btv-logo-mark">
          <span className="ab-drop-cap">L</span>
          <div className="logo-text-wrap">
            <span className="logo-main">ITHIUM</span>
            <span className="logo-sub">2K26 · DREAMSCAPE</span>
          </div>
        </div>

        {/* ── ROYAL PARCHMENT HAMBURGER ── */}
        <button
          className={`btv-ham ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(v => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {/* Corner filigree dots */}
          <div className="btv-ham-corners" />

          {/* Three royal lines */}
          <div className="btv-ham-lines">
            <span />
            <span />
            <span />
          </div>
        </button>

      </div>

      {/* ── BACKDROP ── */}
      <div
        className={`btv-backdrop ${isOpen ? 'show' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* ── DRAWER ── */}
      <nav className={`btv-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>

        {/* Drawer header */}
        <div className="drawer-head">
          <div className="drawer-head-brand">
            <span className="dh-lithium">LITHIUM</span>
            <span className="dh-year">2K26</span>
          </div>
          <div className="drawer-head-theme">✦ DREAMSCAPE ✦</div>

          
          {/* Close button */}
          <button className="drawer-close" onClick={() => setIsOpen(false)} aria-label="Close menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Ornate divider */}
        <div className="drawer-divider" />

        {/* Nav links */}
        <ul className="drawer-links">
          {navLinks.map((link, i) => (
            <li key={link.name} className="drawer-item" style={{ '--i': i }}>
              <a
                href={link.href}
                className={`drawer-link ${active === link.name ? 'active' : ''}`}
                onClick={() => handleLink(link.name)}
              >
                <span className="drawer-icon-box">
                  <NavIcon path={NAV_ICONS[link.name]} />
                </span>
                <span className="drawer-label">{link.name}</span>
                <span className="drawer-arrow">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>


        {/* Footer */}
        <div className="drawer-foot">
          <span>© 2026 Techno Bengal Institute of Technology</span>
        </div>

      </nav>
    </>
  );
};

export default Navbar;