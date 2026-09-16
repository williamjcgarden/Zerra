import type { KeyboardEvent } from 'react';

// Native dialogs make the page inert; wrap Tab so focus also stays out of browser chrome.
export function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
 if(event.key !== 'Tab') return;
 const items=Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(el=>el.getClientRects().length>0);
 const first=items[0],last=items[items.length-1];
 if(!first)return;
 const active=document.activeElement;
 if(event.shiftKey&&(active===first||!items.includes(active as HTMLElement))){event.preventDefault();last.focus();}
 else if(!event.shiftKey&&active===last){event.preventDefault();first.focus();}
}
