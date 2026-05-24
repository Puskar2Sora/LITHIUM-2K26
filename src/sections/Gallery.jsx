import React, { useState, useRef, useCallback, useEffect } from 'react';
import '../styles/Gallery.css';


const PHOTOS = [
  { 
    src: new URL('../assets-optimized/pic/img1.webp', import.meta.url).href, 
    caption: 'Groomers', 
    year: '2K25', 
    tag: 'Grand Opening', 
    color: '#C9973A', 
    bg: '#efebd8' 
  },
  { 
    src: new URL('../assets-optimized/pic/img2.webp', import.meta.url).href, 
    caption: 'Dance Performance', 
    year: '2K25', 
    tag: 'On Stage', 
    color: '#C9973A', 
    bg: '#efebd8' 
  },
  { 
    src: new URL('../assets-optimized/pic/img3.webp', import.meta.url).href, 
    caption: 'Ultra Music', 
    year: '2K25', 
    tag: 'Spider Sence', 
    color: '#C9973A', 
    bg: '#efebd8' 
  },
  { 
    src: new URL('../assets-optimized/pic/img4.webp', import.meta.url).href, 
    caption: 'Cultural', 
    year: '2K25', 
    tag: 'Performance', 
    color: '#C9973A', 
    bg: '#efebd8' 
  },
  { 
    src: new URL('../assets-optimized/pic/img5.webp', import.meta.url).href, 
    caption: 'The RoadMap', 
    year: '2K24', 
    tag: 'Follow Them', 
    color: '#C9973A', 
    bg: '#efebd8' 
  },
  { 
    src: new URL('../assets-optimized/pic/img6.webp', import.meta.url).href, 
    caption: 'Host', 
    year: '2K25', 
    tag: 'Night Events', 
    color: '#C9973A', 
    bg: '#efebd8' 
  },
];

export default function Gallery() {
  const [active, setActive] = useState(0);
  const dragRef = useRef({ down: false, startX: 0 });
  const trackRef = useRef(null);

  const total = PHOTOS.length;

  const goTo = useCallback((idx) => {
    if (idx === active) return;
    setActive(idx);
  }, [active]);

  const next = useCallback(() => goTo((active + 1) % total), [active, goTo, total]);
  const prev_ = useCallback(() => goTo((active - 1 + total) % total), [active, goTo, total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev_();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev_]);

  const onPointerDown = (e) => {
    dragRef.current = { down: true, startX: e.clientX ?? e.touches?.[0]?.clientX ?? 0 };
  };

  const onPointerUp = (e) => {
    if (!dragRef.current.down) return;
    dragRef.current.down = false;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
    const dx = endX - dragRef.current.startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev_();
    }
  };

  const getCardStyle = (i) => {
    const diff = i - active;
    const absDiff = Math.abs(diff);
    if (absDiff > 3) return { display: 'none' };

    const z = 10 - absDiff;
    const scale = absDiff === 0 ? 1 : absDiff === 1 ? 0.82 : absDiff === 2 ? 0.67 : 0.54;
    const tx = diff * 220;
    const rotate = diff * -6;
    const opacity = absDiff > 2 ? 0.35 : 1;

    return {
      transform: `translateX(${tx}px) scale(${scale}) rotate(${rotate}deg)`,
      zIndex: z,
      opacity,
      transition: 'transform 0.5s cubic-bezier(0.34,1.4,0.64,1), opacity 0.4s ease',
      pointerEvents: absDiff === 0 ? 'all' : 'none',
    };
  };

  const photo = PHOTOS[active];

  return (
    
    <section id="gallery" className="gl-section">
      <div className="gl-dots" />
      <div className="gl-stripe" />

      <div className="gl-header">
        <div className="gl-header-left">
          <span className="gl-eyebrow">✦ Previous Year ✦</span>
          <h2 className="gl-title">MEMORIES</h2>
          <div className="gl-title-badge">CAPTURED MOMENTS</div>
          
        </div>
        
        <div className="gl-header-right">
          <div className="gl-counter">
            <span className="gl-cnum">{String(active + 1).padStart(2, '0')}</span>
            <span className="gl-csep">/</span>
            <span className="gl-ctot">{String(total).padStart(2, '0')}</span>
          </div>
          <p className="gl-sub">Relive the magic of LITHIUM 2K25</p>
        </div>
        
      </div>

      <div
        className="gl-stage"
        ref={trackRef}
        onMouseDown={onPointerDown}
        onMouseUp={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchEnd={onPointerUp}
      >
        <div className="gl-fan">
          
          {PHOTOS.map((p, i) => {
            const style = getCardStyle(i);
            if (style.display === 'none') return null;
            const isActive = i === active;
            return (
              
              <div
                key={i}
                className={`gl-card ${isActive ? 'gl-card-active' : ''}`}
                style={style}
                onClick={() => !isActive && goTo(i)}
              >
                <div className="gl-polaroid" style={{ background: p.bg }}>
                  <div className="gl-card-tag" style={{ color: p.color }}>
                    {p.tag}
                  </div>

                  <div className="gl-photo-area" style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={p.src}
                      alt={p.caption}
                      className="gl-real-img"
                      draggable="false"
                      loading={isActive ? 'eager' : 'lazy'}
                      fetchPriority={isActive ? 'high' : 'low'}
                      decoding="async"
                      style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        objectFit: 'cover',
                        zIndex: 2,
                      }}
                    />
                    
                    <div className="gl-placeholder">
                      <span className="gl-ph-ico">📸</span>
                      <span className="gl-ph-num" style={{ color: p.bg === '#0a0a0a' ? '#FFE600' : p.bg }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    {isActive && <div className="gl-glint" />}
                  </div>

                  <div className="gl-caption-strip">
                    <span className="gl-caption" style={{ color: p.color }}>{p.caption}</span>
                    <span className="gl-year" style={{ color: p.color, opacity: 0.55 }}>LITHIUM {p.year}</span>
                  </div>
                </div>
                <div className="gl-card-shadow" />
              </div>
            );
          })}
        </div>

        <button className="gl-side-btn gl-side-l" onClick={prev_} aria-label="Previous"><span>‹</span></button>
        <button className="gl-side-btn gl-side-r" onClick={next} aria-label="Next"><span>›</span></button>
      </div>

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
              className={`gl-dot ${i === active ? 'gl-dot-active' : ''}`}
              style={i === active ? { background: photo.bg, borderColor: '#0a0a0a' } : {}}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

      </div>
          
          </section>
    
  );
  }
