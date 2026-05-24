import React, { lazy, useMemo, useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Intro from './components/Intro.jsx';
import LazySection from './components/LazySection.jsx';
import RoyalCursor from "./components/Royalcursor";

import './App.css';

const About = lazy(() => import('./sections/About'));
const Events = lazy(() => import('./sections/Events'));
const Gallery = lazy(() => import('./sections/Gallery'));
const Winners = lazy(() => import('./components/Winners.jsx'));
const Venue = lazy(() => import('./sections/Venue'));
const MessageFromLeaders = lazy(() => import('./sections/Messagefromleaders'));
const FAQ = lazy(() => import('./sections/FAQ'));
const Footer = lazy(() => import('./sections/Footer'));

function shouldPlayIntro() {
  if (typeof window === 'undefined') return false;

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const slowConnection = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || '');
  const alreadySeen = sessionStorage.getItem('lithium:intro-seen') === '1';

  return !reducedMotion && !slowConnection && !alreadySeen;
}
let _introPlayedThisSession = false;

function App() {
   useEffect(() => {
    console.log("%c✦ PUSKAR NATH'S DREAM ✦", 
      "color: #e6bc34be; font-size: 20px; font-weight: bold;");
  }, []);
  const [showIntro, setShowIntro] = useState(() => shouldPlayIntro());
  const sectionFallback = useMemo(() => <div className="section-skeleton" aria-hidden="true" />, []);

 const handleIntroDone = () => {
  _introPlayedThisSession = true; // ← in-memory only, cleared on refresh
  setShowIntro(false);
};

  return (
    <div className="realm-container">
      <RoyalCursor />
      {showIntro && <Intro onDone={handleIntroDone} />}
      <Navbar />
      <main>
        <Hero />
        <LazySection fallback={sectionFallback} minHeight={520}>
          <About />
        </LazySection>
        <LazySection fallback={sectionFallback} minHeight={560}>
          <Events />
        </LazySection>
        <LazySection fallback={sectionFallback} minHeight={720}>
          <Gallery />
        </LazySection>
        <LazySection fallback={sectionFallback} minHeight={760}>
          <Winners />
        </LazySection>
        <LazySection fallback={sectionFallback} minHeight={760}>
          <Venue />
        </LazySection>
        <LazySection fallback={sectionFallback} minHeight={720}>
          <MessageFromLeaders />
        </LazySection>
      </main>
      <LazySection fallback={sectionFallback} minHeight={560}>
        <FAQ />
      </LazySection>
      <LazySection fallback={sectionFallback} minHeight={520}>
        <Footer />
      </LazySection>
    </div>
  );
}

export default App;