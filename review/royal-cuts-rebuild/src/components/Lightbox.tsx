import { trapFocus } from './trapFocus';
import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { looks } from '../data';
export default function Lightbox({index,onClose,onBook}:{index:number;onClose:()=>void;onBook:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);const look=looks[index];
 useEffect(()=>{const previous=document.activeElement as HTMLElement;dialog.current?.showModal();return()=>{dialog.current?.close();previous?.focus();};},[]);
 return <dialog onKeyDown={trapFocus} className="lightbox" ref={dialog} aria-labelledby="look-title" onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><button className="icon-button lightbox-close" aria-label="Close haircut image" onClick={onClose}><X/></button><div className="look-photo lightbox-photo" style={{backgroundPosition:look.position,backgroundImage:look.image?`url(${look.image})`:undefined,backgroundSize:look.backgroundSize}} role="img" aria-label={look.title+' — '+look.type}/><div className="lightbox-info"><div><p className="eyebrow">{look.type}</p><h2 id="look-title">{look.title}</h2><p className="small muted">Concept imagery. Inspiration for your next appointment.</p></div><button className="button dark" onClick={()=>{onClose();onBook();}}>Book an appointment <ArrowUpRight size={17}/></button></div></dialog>;
}
