import React, { useState, useRef, useCallback, useEffect } from 'react';
import '../styles/Gallery.css';

const PHOTOS = [
  {
    src: new URL('../assets-optimized/pic/img1.webp', import.meta.url).href,
    caption: 'Groomers',
    year: '2K25',
    tag: 'Grand Opening',
    color: '#C9973A',
    bg: '#efebd8',
  },
  {
    src: new URL('../assets-optimized/pic/img2.webp', import.meta.url).href,
    caption: 'Dance Performance',
    year: '2K25',
    tag: 'On Stage',
    color: '#C9973A',
    bg: '#efebd8',
  },
  {
    src: new URL('../assets-optimized/pic/img3.webp', import.meta.url).href,
    caption: 'Ultra Music',
    year: '2K25',
    tag: 'Spider Sence',
    color: '#C9973A',
    bg: '#efebd8',
  },
  {
    src: new URL('../assets-optimized/pic/img4.webp', import.meta.url).href,
    caption: 'Cultural',
    year: '2K25',
    tag: 'Performance',
    color: '#C9973A',
    bg: '#efebd8',
  },
  {
    src: new URL('../assets-optimized/pic/img5.webp', import.meta.url).href,
    caption: 'The RoadMap',
    year: '2K24',
    tag: 'Follow Them',
    color: '#C9973A',
    bg: '#efebd8',
  },
  {
    src: new URL('../assets-optimized/pic/img6.webp', import.meta.url).href,
    caption: 'Host',
    year: '2K25',
    tag: 'Night Events',
    color: '#C9973A',
    bg: '#efebd8',
  },
];

const TOTAL = PHOTOS.length;

/* ── infinite clone list: [...original, ...original, ...original] ── */
const CLONED = [...PHOTOS, ...PHOTOS, ...PHOTOS];
const OFFSET = TOTAL; // index where the "real" middle copy starts

export default function Gallery() {
  const [active, setActive] = useState(OFFSET);          // start at middle copy
  const [animating, setAnimating] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const trackRef = useRef(null);
  const timeoutRef = useRef(null);

  /* ── normalise index so we stay in the middle clone window ── */
  const normalise = useCallback((idx) => {
    if (idx < OFFSET) return idx + TOTAL;
    if (idx >= OFFSET + TOTAL) return idx - TOTAL;
    return idx;
  }, []);

  const goTo = useCallback(
    (idx, instant = false) => {
      if (animating && !instant) return;
      setAnimating(true);
      setActive(idx);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setActive((prev) => {
          const n = normalise(prev);
          return n;
        });
        setAnimating(false);
      }, instant ? 0 : 540);
    },
    [animating, normalise]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  /* drag / swipe */
  const onDragStart = (e) => {
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    setDragStart(x);
  };
  const onDragEnd = (e) => {
    if (dragStart === null) return;
    const x = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const dx = x - dragStart;
    setDragStart(null);
    if (Math.abs(dx) > 48) dx < 0 ? next() : prev();
  };

  /* real index for label lookup */
  const realIdx = ((active - OFFSET) % TOTAL + TOTAL) % TOTAL;
  const photo = PHOTOS[realIdx];

  /* ── per-card style ── */
  const cardStyle = (i) => {
    const diff = i - active;
    const abs = Math.abs(diff);
    if (abs > 3) return { display: 'none' };

    const scales  = [1, 0.78, 0.60, 0.46];
    const offsets = [0, 230, 390, 510];       // px from center
    const rotates = [0, -7, -13, -18];
    const opacities = [1, 0.85, 0.55, 0.28];

    const sign   = diff === 0 ? 0 : diff / abs;
    const scale  = scales[abs];
    const tx     = sign * offsets[abs];
    const rot    = sign * rotates[abs];
    const opacity = opacities[abs];
    const zIndex  = 20 - abs;

    return {
      transform: `translateX(${tx}px) scale(${scale}) rotate(${rot}deg)`,
      zIndex,
      opacity,
      transition: animating
        ? 'transform 0.52s cubic-bezier(0.22,1.1,0.36,1), opacity 0.38s ease'
        : 'none',
      pointerEvents: abs === 0 ? 'all' : 'none',
      willChange: 'transform, opacity',
    };
  };

  return (
    <section id="gallery" className="gl-section">
      {/* ── decorative bg ── */}
      <div className="gl-bg-grid" />
      <div className="gl-bg-glow" />

      {/* ── header ── */}
      <div className="gl-header">
        <div className="gl-header-left">
          <span className="gl-eyebrow">✦ Previous Year ✦</span>
          <h2 className="gl-title">MEMORIES</h2>
          <div className="gl-title-badge">CAPTURED MOMENTS</div>
        </div>
        <div className="gl-header-right">
          <div className="gl-counter">
            <span className="gl-cnum">{String(realIdx + 1).padStart(2, '0')}</span>
            <span className="gl-csep">/</span>
            <span className="gl-ctot">{String(TOTAL).padStart(2, '0')}</span>
          </div>
          <p className="gl-sub">Relive the magic of LITHIUM 2K25</p>
        </div>
      </div>

      {/* ── carousel stage ── */}
      <div
        className="gl-stage"
        ref={trackRef}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
      >
        <div className="gl-fan">
          {CLONED.map((p, i) => {
            const style = cardStyle(i);
            if (style.display === 'none') return null;
            const isActive = i === active;

            return (
              <div
                key={i}
                className={`gl-card${isActive ? ' gl-card-active' : ''}`}
                style={style}
                onClick={() => !isActive && goTo(i)}
                aria-hidden={!isActive}
              >
                {/* ── film-strip frame ── */}
                <div className="gl-film-wrap">
                  {/* sprocket holes top */}
                  <div className="gl-sprocket gl-sprocket-top">
                    {Array.from({ length: 6 }).map((_, h) => (
                      <span key={h} className="gl-hole" />
                    ))}
                  </div>

                  {/* photo area */}
                  <div className="gl-film-body" style={{ background: p.bg }}>
                    <div className="gl-film-tag" style={{ color: p.color }}>{p.tag}</div>

                    <div className="gl-photo-area">
                      <img
                        src={p.src}
                        alt={p.caption}
                        className="gl-real-img"
                        draggable="false"
                        loading={isActive ? 'eager' : 'lazy'}
                        fetchPriority={isActive ? 'high' : 'low'}
                        decoding="async"
                      />
                      {isActive && <div className="gl-glint" />}
                      {isActive && <div className="gl-film-vignette" />}
                    </div>

                    <div className="gl-caption-strip">
                      <span className="gl-caption" style={{ color: p.color }}>{p.caption}</span>
                      <span className="gl-year" style={{ color: p.color, opacity: 0.5 }}>
                        LITHIUM {p.year}
                      </span>
                    </div>
                  </div>

                  {/* sprocket holes bottom */}
                  <div className="gl-sprocket gl-sprocket-bottom">
                    {Array.from({ length: 6 }).map((_, h) => (
                      <span key={h} className="gl-hole" />
                    ))}
                  </div>
                </div>

                <div className="gl-card-shadow" />
              </div>
            );
          })}
        </div>

        {/* nav arrows */}
        <button className="gl-side-btn gl-side-l" onClick={prev} aria-label="Previous">
          <span>‹</span>
        </button>
        <button className="gl-side-btn gl-side-r" onClick={next} aria-label="Next">
          <span>›</span>
        </button>
      </div>

      {/* ── bottom bar ── */}
      <div className="gl-bottom">
        <div className="gl-info">
          <div className="gl-info-color" style={{ background: photo.bg }} />
          <div className="gl-info-text">
            <span className="gl-info-caption">{photo.caption}</span>
            <span className="gl-info-tag">{photo.tag}</span>
          </div>
        </div>

        <div className="gl-nav-dots">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              className={`gl-dot${i === realIdx ? ' gl-dot-active' : ''}`}
              style={i === realIdx ? { background: photo.color, borderColor: '#0a0a0a' } : {}}
              onClick={() => goTo(OFFSET + i)}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
  /* ── per-card style ── */
  const cardStyle = (i) => {
    const diff = i - active;
    const abs = Math.abs(diff);
    if (abs > 3) return { display: 'none' };

    const scales  = [1, 0.78, 0.60, 0.46];
    const offsets = [0, 230, 390, 510];       // px from center
    const rotates = [0, -7, -13, -18];
    const opacities = [1, 0.85, 0.55, 0.28];

    const sign   = diff === 0 ? 0 : diff / abs;
    const scale  = scales[abs];
    const tx     = sign * offsets[abs];
    const rot    = sign * rotates[abs];
    const opacity = opacities[abs];
    const zIndex  = 20 - abs;

    return {
      transform: `translateX(${tx}px) scale(${scale}) rotate(${rot}deg)`,
      zIndex,
      opacity,
      transition: animating
        ? 'transform 0.52s cubic-bezier(0.22,1.1,0.36,1), opacity 0.38s ease'
        : 'none',
      pointerEvents: abs === 0 ? 'all' : 'none',
      willChange: 'transform, opacity',
    };
  };

  return (
    <section id="gallery" className="gl-section">
      {/* ── decorative bg ── */}
      <div className="gl-bg-grid" />
      <div className="gl-bg-glow" />

      {/* ── header ── */}
      <div className="gl-header">
        <div className="gl-header-left">
          <span className="gl-eyebrow">✦ Previous Year ✦</span>
          <h2 className="gl-title">MEMORIES</h2>
          <div className="gl-title-badge">CAPTURED MOMENTS</div>
        </div>
        <div className="gl-header-right">
          <div className="gl-counter">
            <span className="gl-cnum">{String(realIdx + 1).padStart(2, '0')}</span>
            <span className="gl-csep">/</span>
            <span className="gl-ctot">{String(TOTAL).padStart(2, '0')}</span>
          </div>
          <p className="gl-sub">Relive the magic of LITHIUM 2K25</p>
        </div>
      </div>

      {/* ── carousel stage ── */}
      <div
        className="gl-stage"
        ref={trackRef}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
      >
        <div className="gl-fan">
          {CLONED.map((p, i) => {
            const style = cardStyle(i);
            if (style.display === 'none') return null;
            const isActive = i === active;

            return (
              <div
                key={i}
                className={`gl-card${isActive ? ' gl-card-active' : ''}`}
                style={style}
                onClick={() => !isActive && goTo(i)}
                aria-hidden={!isActive}
              >
                {/* ── film-strip frame ── */}
                <div className="gl-film-wrap">
                  {/* sprocket holes top */}
                  <div className="gl-sprocket gl-sprocket-top">
                    {Array.from({ length: 6 }).map((_, h) => (
                      <span key={h} className="gl-hole" />
                    ))}
                  </div>

                  {/* photo area */}
                  <div className="gl-film-body" style={{ background: p.bg }}>
                    <div className="gl-film-tag" style={{ color: p.color }}>{p.tag}</div>

                    <div className="gl-photo-area">
                      <img
                        src={p.src}
                        alt={p.caption}
                        className="gl-real-img"
                        draggable="false"
                        loading={isActive ? 'eager' : 'lazy'}
                        fetchpriority={isActive ? 'high' : 'low'}
                        decoding="async"
                      />
                      {isActive && <div className="gl-glint" />}
                      {isActive && <div className="gl-film-vignette" />}
                    </div>

                    <div className="gl-caption-strip">
                      <span className="gl-caption" style={{ color: p.color }}>{p.caption}</span>
                      <span className="gl-year" style={{ color: p.color, opacity: 0.5 }}>
                        LITHIUM {p.year}
                      </span>
                    </div>
                  </div>

                  {/* sprocket holes bottom */}
                  <div className="gl-sprocket gl-sprocket-bottom">
                    {Array.from({ length: 6 }).map((_, h) => (
                      <span key={h} className="gl-hole" />
                    ))}
                  </div>
                </div>

                <div className="gl-card-shadow" />
              </div>
            );
          })}
        </div>

        {/* nav arrows */}
        <button className="gl-side-btn gl-side-l" onClick={prev} aria-label="Previous">
          <span>‹</span>
        </button>
        <button className="gl-side-btn gl-side-r" onClick={next} aria-label="Next">
          <span>›</span>
        </button>
      </div>

      {/* ── bottom bar ── */}
      <div className="gl-bottom">
        <div className="gl-info">
          <div className="gl-info-color" style={{ background: photo.bg }} />
          <div className="gl-info-text">
            <span className="gl-info-caption">{photo.caption}</span>
            <span className="gl-info-tag">{photo.tag}</span>
          </div>
        </div>

        <div className="gl-nav-dots">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              className={`gl-dot${i === realIdx ? ' gl-dot-active' : ''}`}
              style={i === realIdx ? { background: photo.color, borderColor: '#0a0a0a' } : {}}
              onClick={() => goTo(OFFSET + i)}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
      }
                        
