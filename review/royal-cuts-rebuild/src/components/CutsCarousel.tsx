import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Pause, Play, Plus } from 'lucide-react';
import { looks } from '../data';

const cardsPerView = () => window.innerWidth < 768 ? 2 : window.innerWidth <= 1100 ? 3 : 5;

export default function CutsCarousel({motionOn,onSelect}:{motionOn:boolean;onSelect:(index:number)=>void}) {
 const viewport=useRef<HTMLDivElement>(null);
 const [start,setStart]=useState(0);
 const track=useRef<HTMLDivElement>(null);
 const distance=useRef(0);
 const [hasOffset,setHasOffset]=useState(false);
 const [paused,setPaused]=useState(false);
 const [hovered,setHovered]=useState(false);
 const [focused,setFocused]=useState(false);
 const [visible,setVisible]=useState(false);
 const [pageVisible,setPageVisible]=useState(!document.hidden);
 const [perView,setPerView]=useState(cardsPerView);
 const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const canAnimate=motionOn&&!reduced;
 useEffect(()=>{if(canAnimate&&viewport.current)viewport.current.scrollLeft=0;},[canAnimate]);
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.2});
  if(viewport.current)observer.observe(viewport.current);
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const onMotion=()=>setReduced(media.matches);
  const onResize=()=>{distance.current=0;setHasOffset(false);if(track.current)track.current.style.transform='translate3d(0,0,0)';setPerView(cardsPerView());};
  const onVisibility=()=>setPageVisible(!document.hidden);
  media.addEventListener('change',onMotion);
  window.addEventListener('resize',onResize);
  document.addEventListener('visibilitychange',onVisibility);
  return()=>{observer.disconnect();media.removeEventListener('change',onMotion);window.removeEventListener('resize',onResize);document.removeEventListener('visibilitychange',onVisibility);};
 },[]);
 useEffect(()=>{
  if(!canAnimate||paused||hovered||focused||!visible||!pageVisible||!track.current)return;
  const rail=track.current;
  let previous=performance.now();
  let frame=0;
  const glide=(now:number)=>{
   const step=(rail.clientWidth+parseFloat(getComputedStyle(rail).columnGap))/perView;
   const elapsed=Math.min(now-previous,50);previous=now;
   if(distance.current===0)setHasOffset(true);
   distance.current+=step*elapsed/3000;
   if(distance.current>=step){
    distance.current-=step;
    // Reorder and reset the transform in the same frame to keep the loop seamless.
    flushSync(()=>setStart(current=>(current+1)%looks.length));
   }
   rail.style.transform=`translate3d(${-distance.current}px,0,0)`;
   frame=requestAnimationFrame(glide);
  };
  frame=requestAnimationFrame(glide);
  return()=>cancelAnimationFrame(frame);
 },[canAnimate,paused,hovered,focused,visible,pageVisible,perView]);
 return <div className={`cuts-carousel${canAnimate?'':' cuts-carousel-static'}`} role="region" aria-label="Haircut styles" aria-roledescription="carousel">
  <div className="cuts-carousel-tools">
   <div className="cuts-carousel-actions">
    {canAnimate&&<button className="cuts-pause" onClick={()=>setPaused(value=>!value)} aria-label={paused?'Play cuts carousel':'Pause cuts carousel'}>{paused?<Play size={16}/>:<Pause size={16}/>}</button>}
   </div>
  </div>
  <div className="cuts-viewport" ref={viewport} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setFocused(false);}}>
   <div className="cuts-track" ref={track} aria-live="off">
    {looks.map((_,offset)=>{
     const index=(start+offset)%looks.length;
     const look=looks[index];
     const shown=!canAnimate||offset<perView+(hasOffset?1:0);
     return <article className="look-card" key={look.title} aria-hidden={!shown}>
      <button className="look-image-button" onClick={()=>onSelect(index)} aria-label={`Explore ${look.title}`} tabIndex={!canAnimate||offset<perView?0:-1}>
       <div className="look-photo" style={{backgroundPosition:look.position,backgroundImage:look.image?`url(${look.image})`:undefined,backgroundSize:look.backgroundSize}} role="img" aria-label={`${look.title} — ${look.type}`}/>
       <span className="look-expand"><Plus size={23}/></span>
      </button>
      <div className="look-caption"><h3>{look.title}</h3><span>{look.type}</span></div>
     </article>;
    })}
   </div>
  </div>
 </div>;
}
