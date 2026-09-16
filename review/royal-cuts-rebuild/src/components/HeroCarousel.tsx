import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { asset, looks } from '../data';

const slides = [
 { title: 'The textured taper', description: 'A finished textured haircut with a precise low taper fade', position: null },
 ...looks.slice(0, 4).map(look => ({ title: look.title, description: `${look.title} — ${look.type}`, position: look.position })),
];

export default function HeroCarousel({ motionOn }: { motionOn: boolean }) {
 const host = useRef<HTMLDivElement>(null);
 const [index, setIndex] = useState(0);
 const [visible, setVisible] = useState(false);
 const [pageVisible, setPageVisible] = useState(!document.hidden);
 useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .3 });
  if (host.current) observer.observe(host.current);
  const onVisibility = () => setPageVisible(!document.hidden);
  document.addEventListener('visibilitychange', onVisibility);
  return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
 }, []);
 useEffect(() => {
  if (!motionOn || !visible || !pageVisible) return;
  const timer = window.setInterval(() => {
   if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setIndex(current => (current + 1) % slides.length);
  }, 2500);
  return () => window.clearInterval(timer);
 }, [motionOn, visible, pageVisible]);
 const slide = slides[index];
 return <div ref={host} className="hero-photo hero-carousel" role="region" aria-roledescription="carousel" aria-label="Featured haircuts">
  <div className="hero-slide" style={{'--look-position': slide.position || '0% 0%'} as CSSProperties} key={index} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}>
   {slide.position === null
    ? <img src={asset('hero.webp')} alt={slide.description} fetchPriority="high" width="1536" height="1024" />
    : <div className="look-photo" role="img" aria-label={slide.description} style={{ backgroundPosition: slide.position }} />}
  </div>
  <div className="photo-label">
   <div className="carousel-caption" aria-live="off" aria-atomic="true"><span>{slide.title}</span><span className="carousel-count">{String(index + 1).padStart(2, '0')} / 05</span></div>
  </div>
 </div>;
}
