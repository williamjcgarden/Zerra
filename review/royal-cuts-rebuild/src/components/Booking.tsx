import { trapFocus } from './trapFocus';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, ChevronRight, Clock3, Scissors, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { services, barbers, exampleDates, exampleTimes, type BookingSelection, type ServiceId, type BarberId } from '../data';

export default function Booking({selection,onClose,motionOn}:{selection:BookingSelection;onClose:()=>void;motionOn:boolean}) {
 const dialog=useRef<HTMLDialogElement>(null);
 const title=useRef<HTMLHeadingElement>(null);
 const [step,setStep]=useState(0);
 const [service,setService]=useState<ServiceId|undefined>(selection.service);
 const [barber,setBarber]=useState<BarberId>(selection.barber || 'any');
 const [dates]=useState(exampleDates);
 const [date,setDate]=useState('');
 const [time,setTime]=useState('');
 const [error,setError]=useState('');
 const current=services.find(s=>s.id===service);
 const barberName=barber==='any'?'Any barber':barbers.find(b=>b.id===barber)!.name;
 const dateLabel=dates.find(d=>d.id===date)?.label;
 const steps=['Choose your service','Choose your barber','Find your time','Make it yours','You’re all set. For the demo.'];
 useEffect(()=>{const previous=document.activeElement as HTMLElement;dialog.current?.showModal();return()=>{dialog.current?.close();previous?.focus();};},[]);
 useEffect(()=>{title.current?.focus();},[step]);
 const next=()=>{if(step===0&&!service){setError('Choose a service to continue.');return;}if(step===2&&(!date||!time)){setError('Choose an example day and time to continue.');return;}setError('');setStep(s=>s+1);};
 const reset=()=>{setService(undefined);setBarber('any');setDate('');setTime('');setStep(0);setError('');};
 return <dialog onKeyDown={trapFocus} ref={dialog} className="booking-dialog" aria-labelledby="booking-title" aria-describedby="booking-disclaimer" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
  <div className="booking-shell">
   <aside className="booking-aside"><span className="wordmark">ROYAL CUTS<span>BARBERSHOP</span></span><div className="aside-heading">YOUR<br/>NEXT<br/><em>GOOD CUT.</em></div><div className="booking-aside-note"><Scissors size={22}/><p>A little time for yourself.<br/>A look that feels like you.</p></div><p className="micro">A FICTIONAL CONCEPT BY ZERRA STUDIOS</p></aside>
   <div className="booking-main">
    <div className="booking-top"><span className="eyebrow">THE APPOINTMENT</span><button className="icon-button" onClick={onClose} aria-label="Close booking"><X size={22}/></button></div>
    <p id="booking-disclaimer" className="demo-note">Explore the demo. No real appointment or payment.</p>
    <div className="step-track" aria-label={`Step ${Math.min(step+1,4)} of 4`}>{['Service','Barber','Time','Review'].map((s,i)=><span key={s} className={step>=i?'complete':''}>{step>i?<Check size={12}/>:<b>{i+1}</b>}{s}</span>)}</div>
    <h2 ref={title} tabIndex={-1} id="booking-title">{steps[step]}</h2>
    <motion.div key={step} className="booking-content" initial={motionOn?{x:12}:false} animate={{x:0}} transition={{duration:.18}}>
     {step===0&&<div className="selection-list" role="group" aria-label="Services">{services.map(s=><button key={s.id} aria-pressed={service===s.id} className={`selection ${service===s.id?'selected':''}`} onClick={()=>{setService(s.id);setTime('');setError('');}}><span><strong>{s.name}</strong><small>{s.minutes} min{s.detail && ` · ${s.detail}`}</small></span><span className="selection-price">${s.price}<i>{service===s.id?<Check size={15}/>:<span/>}</i></span></button>)}<p className="small muted">All prices are illustrative, in CAD.</p></div>}
     {step===1&&<div className="selection-list" role="group" aria-label="Barbers"><p className="small muted">All barbers offer every service.</p><button className={`selection ${barber==='any'?'selected':''}`} aria-pressed={barber==='any'} onClick={()=>{setBarber('any');setTime('');}}><span><strong>Any barber</strong><small>No preference</small></span>{barber==='any'?<Check size={19}/>:<ChevronRight size={19}/>}</button>{barbers.map(b=><button key={b.id} className={`selection ${barber===b.id?'selected':''}`} aria-pressed={barber===b.id} onClick={()=>{setBarber(b.id);setTime('');}}><span><strong>{b.name}</strong></span>{barber===b.id?<Check size={19}/>:<ChevronRight size={19}/>}</button>)}</div>}
     {step===2&&<><p className="small muted">Example availability · Pacific time</p><div className="date-options" role="group" aria-label="Example dates">{dates.map(d=><button aria-label={d.label} aria-pressed={date===d.id} className={date===d.id?'selected':''} key={d.id} onClick={()=>{setDate(d.id);setTime('');setError('');}}><span>{d.day}</span><strong>{d.date}</strong></button>)}</div><p className="eyebrow time-label">{date?'CHOOSE A TIME':'CHOOSE A DAY TO SEE TIMES'}</p><div className="time-options" role="group" aria-label="Example appointment times">{exampleTimes(date,current?.minutes||0).map(t=><button disabled={!date} key={t} aria-pressed={time===t} className={time===t?'selected':''} onClick={()=>{setTime(t);setError('');}}>{t}</button>)}</div></>}
     {step===3&&<><p className="small muted">Your example appointment, ready to review.</p><dl className="review-list"><div><dt>Service</dt><dd>{current?.name}</dd></div><div><dt>Barber</dt><dd>{barberName}</dd></div><div><dt>Day</dt><dd>{dateLabel}</dd></div><div><dt>Time</dt><dd>{time} · Pacific</dd></div><div><dt>Duration</dt><dd>{current?.minutes} minutes</dd></div><div className="review-total"><dt>Sample total</dt><dd>${current?.price} CAD</dd></div></dl><p className="small muted">This is a preview of the booking experience. Completing it will not reserve a real appointment.</p></>}
     {step===4&&<div className="booking-success"><span className="success-check"><Check size={30}/></span><h3>Demo complete.</h3><p>No appointment has been booked.</p><div className="success-ticket"><span>{current?.name}</span><strong>{dateLabel}</strong><p>{time} · {barberName} · ${current?.price} CAD</p></div><button className="text-button" onClick={reset}>Try another appointment <ArrowUpRight size={17}/></button></div>}
    </motion.div>
    <p className="form-error" role="alert">{error}</p>
    <div className="booking-bottom">{current&&step<3&&<div className="mini-summary"><span>{current.short} · ${current.price} CAD</span><span><Clock3 size={13}/>{current.minutes} min</span></div>}<div className="booking-actions">{step>0&&step<4?<button className="text-button" onClick={()=>{setStep(s=>s-1);setError('');}}><ArrowLeft size={16}/>Back</button>:<span/>}{step<4?<button className="button dark" onClick={next}>{step===3?'Complete demo booking':'Continue'}<ArrowUpRight size={17}/></button>:<button className="button dark" onClick={onClose}>Back to Royal Cuts <ArrowUpRight size={17}/></button>}</div></div>
   </div>
  </div>
 </dialog>;
}
