import "../../../src/components/demo-context.css";
import { trapFocus } from './components/trapFocus';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight,  Crown, Menu, Pause, Play, Plus, Scissors, X } from 'lucide-react';
import { motion, useReducedMotion, MotionConfig } from 'framer-motion';
import { asset, barbers, faqs, services, ZERRA_CONTACT, ZERRA_WORK, type BookingSelection } from './data';
import Booking from './components/Booking';
import Lightbox from './components/Lightbox';
import BarberPole from './components/BarberPole';
import HeroCarousel from './components/HeroCarousel';
import CutsCarousel from './components/CutsCarousel';
const nav=[['Services','services'],['The cuts','cuts'],['Our barbers','barbers'],['Visit','visit']];

const MotionEnabled=createContext(true);
function Reveal({children,className=''}:{children:React.ReactNode;className?:string}){const enabled=useContext(MotionEnabled);if(!enabled)return <div className={className}>{children}</div>;return <motion.div className={className} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.65,ease:[.2,.7,.2,1]}}>{children}</motion.div>;}
function Craft({onBook}:{onBook:()=>void}){
 return <section id="experience" className="craft" aria-labelledby="experience-title">
  <div className="experience-scene">
   <img className="experience-photo" src={asset('studio-v2.webp')} alt="The imagined Royal Cuts studio, with red chairs and cabinetry, chrome workstations, bright white walls and Royal Cuts signage" loading="lazy" width="1536" height="1024"/>
   <div className="experience-content shell">
    <div className="experience-copy">
     <span className="eyebrow">03 / THE ROYAL CUTS EXPERIENCE</span>
     <h2 id="experience-title">WALK OUT<br/>FEELING SHARP.</h2>
     <p>Bring a photo or tell us what you’re after. We’ll talk through the cut, get the shape right, and show you how to style it.</p>
     <button className="button cream" onClick={onBook}>Book an appointment <ArrowUpRight size={19}/></button>
    </div>
   </div>
   <span className="experience-photo-note">THE ROYAL CUTS CONCEPT STUDIO</span>
  </div>
  <div className="craft-steps shell">{[
   ['01','Agree on the cut','Length, shape and finish — decided with you before we start.'],
   ['02','Cut, tidy, style','Your chosen cut, a clean neckline and a styled finish.'],
   ['03','Keep it looking good','Simple styling tips and product advice for your hair.'],
  ].map(([n,t,d])=><Reveal key={n}><span className="step-number">{n}</span><h3>{t}</h3><p>{d}</p></Reveal>)}</div>
 </section>;
}
export default function App(){
 const [introActive,setIntroActive]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{const timer=window.setTimeout(()=>setIntroActive(false),2800);return()=>window.clearTimeout(timer);},[]);
 const [booking,setBooking]=useState<BookingSelection|null>(null);const [look,setLook]=useState<number|null>(null);const [menuOpen,setMenuOpen]=useState(false);const [motionOn,setMotionOn]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const reduce=useReducedMotion();const menuRef=useRef<HTMLDialogElement>(null);const menuTrigger=useRef<HTMLButtonElement>(null);
 const book=(selection:BookingSelection={})=>{setMenuOpen(false);setBooking(selection);};
 useEffect(()=>{if(menuOpen){menuRef.current?.showModal();}else if(menuRef.current?.open){menuRef.current.close();menuTrigger.current?.focus();}},[menuOpen]);
 return <MotionConfig reducedMotion={motionOn?'user':'always'}><MotionEnabled.Provider value={motionOn&&!reduce}><div data-motion={motionOn&&!reduce?'on':'off'}>
  <a className="skip-link" href="#main">Skip to content</a>
  <nav aria-label="Demo navigation"><a className="zerra-return" href={ZERRA_WORK} aria-label="Back to Zerra"><span className="zerra-return-arrow"><ArrowLeft size={17} strokeWidth={2.4}/></span><span className="zerra-return-label">ZERRA<span>.</span></span></a></nav>
  <div className="royal-concept-bar zerra-demo-context"><span>Fictional brand &amp; website concept by Zerra Studios</span></div>
  <header className="site-header"><a href="#home" className="wordmark" aria-label="Royal Cuts home">ROYAL CUTS<span>BARBERSHOP</span></a><nav aria-label="Main navigation">{nav.map(([name,id])=><a key={id} href={'#'+id}>{name}</a>)}</nav><div className="header-actions"><button className="button cream header-book" onClick={()=>book()}>Book an appointment <ArrowUpRight size={16}/></button><button className="icon-button mobile-menu" ref={menuTrigger} aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={()=>setMenuOpen(true)}><Menu/></button></div></header>
  <main id="main">
   <section className={`hero${introActive?' hero-intro':''}`} id="home"><div className="shell"><div className="hero-overline"><span>GOOD HAIR STARTS HERE.</span><span>HAIRCUTS / FADES / BEARDS</span></div><h1 aria-label="Royal Cuts"><span>ROYAL</span> <span className="hero-cuts">CUTS</span></h1><div className="hero-composition"><div className="hero-copy"><p className="hero-description">A cut that<br/> feels like <em>you.</em></p><p>Fades, scissor cuts and beard shaping.<br className="desktop-only"/> A little time for yourself.</p><button className="button cream" onClick={()=>book()}>Book an appointment <ArrowUpRight size={19}/></button><a href="#cuts" className="hero-secondary">Find your next look <ArrowDown size={14}/></a></div><div className="hero-pole"><BarberPole motionOn={motionOn&&!reduce}/></div><HeroCarousel motionOn={motionOn&&!reduce&&!booking&&!menuOpen&&look===null}/><div className="hero-seal" aria-hidden="true"><Crown size={32}/><span>COME AS<br/>YOU ARE.</span></div></div><div className="hero-bottom"><a href="#services"><span className="down-circle"><ArrowDown size={16}/></span>YOUR NEXT GOOD CUT, THIS WAY.</a><button className="motion-control" onClick={()=>{setIntroActive(false);setMotionOn(s=>!s);}} aria-pressed={!motionOn}>{motionOn?<Pause size={13}/>:<Play size={13}/>} {motionOn?'Pause motion':'Play motion'}</button></div></div></section>
   <section className="services-section shell section-space" id="services"><div className="services-intro"><span className="eyebrow">01 / THE SERVICE MENU</span><Reveal><h2>HOW DO<br/>YOU WANT<br/><span className="red-text">TO WEAR IT?</span></h2></Reveal><p>Tell us about your hair, your routine and what you’d like to change.</p><div className="service-stamp"><Scissors size={29}/><span>CONSULTATION<br/>WITH EVERY CUT.</span></div></div><div className="service-list">{services.map((s,i)=><Reveal key={s.id}><button className="service-row" onClick={()=>book({service:s.id})} aria-label={`Book ${s.name}, ${s.price} CAD, ${s.minutes} minutes`}><span className="service-index">0{i+1}</span><span className="service-main"><span className="service-heading">{s.name}</span><span className="service-description">{s.description}</span><span className="service-duration">{s.minutes} MIN</span></span><span className="service-price">${s.price}</span><span className="service-arrow"><ArrowUpRight size={22}/></span></button></Reveal>)}<p className="service-disclaimer">Concept services & prices. All amounts in CAD. <span>No real bookings.</span></p></div></section>
   <section className="cuts-section section-space" id="cuts"><div className="shell"><div className="section-heading"><div><span className="eyebrow">02 / FIND YOUR NEXT LOOK</span><Reveal><h2>THE CUTS.</h2></Reveal></div><p>A few directions you could take.<br/>Make the next one your own.</p></div><CutsCarousel motionOn={motionOn&&!reduce&&!booking&&!menuOpen&&look===null} onSelect={setLook}/><div className="cuts-footer"><p>Concept imagery, created for Royal Cuts.</p><button className="text-button" onClick={()=>book()}>Book an appointment <ArrowUpRight size={18}/></button></div></div></section>
   <Craft onBook={()=>book()}/>
   <section className="barbers-section section-space shell" id="barbers"><div className="section-heading"><div><span className="eyebrow">04 / THE PEOPLE BEHIND THE CUT</span><Reveal><h2>PICK YOUR<br/><span className="red-text">PERSON.</span></h2></Reveal></div><p>Find the barber for your style.<br/>Meet the fictional Royal Cuts team.</p></div><div className="barber-grid">{barbers.map(b=><Reveal key={b.id}><div className="barber-photo" role="img" aria-label={`${b.name}, a fictional Royal Cuts barber`} style={{backgroundPosition:`${b.photo*50}% 0%`}}/><div className="barber-name"><h3>{b.name}</h3><button className="round-button" onClick={()=>book({barber:b.id})} aria-label={`Book with ${b.name}`}><ArrowUpRight size={22}/></button></div><p className="barber-specialty">{b.specialty}</p><p className="barber-description">{b.description}</p></Reveal>)}</div></section>
   <section className="visit-section" id="visit"><div className="shell visit-layout"><div><span className="eyebrow">05 / A PLACE TO SLOW DOWN</span><Reveal><h2>YOUR CHAIR<br/>IS WAITING.</h2></Reveal><p>An imagined neighbourhood shop.<br/>A familiar face. A fresh perspective.</p><button className="button cream" onClick={()=>book()}>Find your time <ArrowUpRight size={18}/></button><div className="visit-hours"><span className="eyebrow">CONCEPT OPENING HOURS</span><dl><div><dt>Tuesday — Friday</dt><dd>9am — 7pm</dd></div><div><dt>Saturday</dt><dd>9am — 5pm</dd></div><div><dt>Sunday — Monday</dt><dd>Closed</dd></div></dl><p className="small">An illustrative schedule for this fictional shop.</p></div></div><div className="visit-art"><div className="shop-window"><span className="window-crown"><Crown strokeWidth={1} size={52}/></span><strong>ROYAL<br/>CUTS</strong><span className="window-barbershop">BARBERSHOP</span><div className="window-line"/><p>COME ON IN.</p><Scissors size={23}/></div><span className="visit-art-caption">AN IMAGINED SHOPFRONT / A ZERRA CONCEPT</span></div></div></section>
   <section className="faq-section shell section-space"><div><span className="eyebrow">BEFORE YOU SIT DOWN</span><h2>A FEW<br/>GOOD QUESTIONS.</h2></div><div className="faq-list">{faqs.map(f=><details key={f.q}><summary>{f.q}<Plus size={19}/></summary><p>{f.a}</p></details>)}</div></section>
   <section className="last-book shell"><span className="eyebrow">READY WHEN YOU ARE.</span><button onClick={()=>book()} className="last-book-button">LET’S BOOK<br/>YOU IN.<span><ArrowUpRight strokeWidth={1.1}/></span></button><p>Choose your service. Find your barber. Make it your time.</p></section>
  </main>
  <footer><div className="zerra-panel shell"><div><span className="eyebrow">A CONCEPT BY ZERRA STUDIOS</span><h2>Give customers a clear<br/>way to book.</h2><p>Royal Cuts is a fictional barbershop, built to show how a brand can come to life online — from the first impression to the appointment.</p></div><a className="button outline" href={ZERRA_CONTACT}>Discuss your website with Zerra <ArrowUpRight size={18}/></a></div><div className="footer-bottom shell"><a href="#home" className="wordmark">ROYAL CUTS<span>BARBERSHOP</span></a><p>Fictional business, people, imagery, prices and availability.<br/>No real appointments or payments.</p><a href={ZERRA_WORK}>Back to Zerra <ArrowRight size={15}/></a></div></footer>
  <div className="mobile-book-bar"><span>MAKE TIME FOR A GOOD CUT.</span><button onClick={()=>book()}>Book an appointment <ArrowUpRight size={17}/></button></div>
  <dialog onKeyDown={trapFocus} ref={menuRef} id="mobile-navigation" className="menu-dialog" aria-label="Navigation" onCancel={()=>setMenuOpen(false)}><div className="menu-dialog-top"><span className="wordmark">ROYAL CUTS</span><button className="icon-button" aria-label="Close navigation" onClick={()=>setMenuOpen(false)}><X/></button></div><nav>{nav.map(([name,id],i)=><a key={id} href={'#'+id} onClick={()=>setMenuOpen(false)}><span>0{i+1}</span>{name}<ArrowUpRight/></a>)}</nav><button className="button cream" onClick={()=>book()}>Book an appointment <ArrowUpRight size={18}/></button><p className="small">A fictional barbershop concept by Zerra Studios.</p></dialog>
  {booking&&<Booking motionOn={motionOn&&!reduce} selection={booking} onClose={()=>setBooking(null)}/>}{look!==null&&<Lightbox index={look} onClose={()=>setLook(null)} onBook={book}/>}
 </div></MotionEnabled.Provider></MotionConfig>;
}
