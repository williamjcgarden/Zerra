const base = import.meta.env?.BASE_URL ?? '/';
export const asset = (name:string) => `${base}assets/${name}`;
const zerraOrigin = base === '/' ? 'https://zerrastudios.com' : '';
export const ZERRA_WORK = `${zerraOrigin}/our-work`;
export const ZERRA_CONTACT = `${zerraOrigin}/?enquiry=website`;
export const services = [
  { id: 'haircut', name: 'Regular haircut', short: 'Regular haircut', price: 35, minutes: 30, description: 'A regular haircut with clippers or scissors, finished and styled.', detail: '' },
  { id: 'fade', name: 'Specialty haircut', short: 'Specialty haircut', price: 45, minutes: 45, description: 'Extra time for a skin fade or a full restyle.', detail: 'Skin fades or a full restyle.' },
  { id: 'beard', name: 'Beard trim', short: 'Beard trim', price: 25, minutes: 20, description: 'Beard trimming, shaping and a clean neckline.', detail: '' },
  { id: 'cut-beard', name: 'Haircut & beard', short: 'Haircut & beard', price: 55, minutes: 60, description: 'A haircut and beard trim in one appointment.', detail: '' },
] as const;
export type ServiceId = typeof services[number]['id'];
export const barbers = [
  { id: 'ellis', name: 'Ellis', specialty: 'Scissor cuts & lived-in texture', description: 'For a shape that grows out as well as it starts.', photo: 0 },
  { id: 'micah', name: 'Micah', specialty: 'Skin fades & curl shaping', description: 'Clean transitions. A natural finish on top.', photo: 1 },
  { id: 'luca', name: 'Luca', specialty: 'Classic cuts & beard work', description: 'A considered approach to the complete look.', photo: 2 },
] as const;
export type BarberId = typeof barbers[number]['id'] | 'any';
export type BookingSelection = { service?: ServiceId; barber?: BarberId };
export const looks: {title:string; type:string; position:string; image?:string; backgroundSize?:string}[] = [
  { title: 'Curly taper fade', type: 'Short curls · tapered sides', position: '0% 0%' },
  { title: 'Bro flow', type: 'Medium length · layered scissor cut', position: '100% 0%' },
  { title: 'Textured crop', type: 'Short fringe · skin fade', position:'0% 100%' },
  { title: 'Classic side part', type: 'Side part · trimmed beard', position:'100% 100%' },
  { title: 'Buzz cut', type: 'Close clipper cut · faded sides', position:'0% 0%', image:asset('cuts-extra-v2.webp'), backgroundSize:'300% 200%' },
  { title: 'Crew cut', type: 'Short top · tapered sides', position:'50% 0%', image:asset('cuts-extra-v2.webp'), backgroundSize:'300% 200%' },
  { title: 'Pompadour', type: 'Swept-back volume · short sides', position:'100% 0%', image:asset('cuts-extra-v2.webp'), backgroundSize:'300% 200%' },
  { title: 'Textured quiff', type: 'Lifted front · loose texture', position:'0% 100%', image:asset('cuts-extra-v2.webp'), backgroundSize:'300% 200%' },
  { title: 'Modern mullet', type: 'Tapered sides · longer at the back', position:'50% 100%', image:asset('cuts-extra-v2.webp'), backgroundSize:'300% 200%' },
  { title: 'Flat top', type: 'Level top · faded temples', position:'100% 100%', image:asset('cuts-extra-v2.webp'), backgroundSize:'300% 200%' },
];
export const faqs = [
  {q:'Not sure which service to choose?',a:'Choose Regular haircut for your usual cut, Specialty haircut for a skin fade or a full restyle, Beard trim for just your beard, or Haircut & beard for both.'},
  {q:'Can I choose my barber?',a:'Yes. Pick Ellis, Micah or Luca, or choose Any barber. Try it in the booking demo — your selection stays with you as you choose a time.'},
  {q:'What should I bring to an appointment?',a:'A reference photo is a useful starting point. Think about how you usually style your hair, how much length you want to keep and how often you like to get it cut.'},
  {q:'Can I walk in?',a:'This concept is designed around appointments, with walk-ins when a chair is free. Royal Cuts is fictional, so the hours, services and availability shown here are examples.'},
  {q:'Is this a real barbershop?',a:'Royal Cuts is a fictional brand and website concept by Zerra Studios. The people, imagery, services, prices and appointment times are illustrative. No real appointment or payment can be made.'},
];
export function exampleDates() {
 const now=new Date();
 const days: {id:string;day:string;date:number;label:string}[]=[];
 for(let offset=1;days.length<5;offset++) {
  const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+offset,12);
  if(d.getDay()===0||d.getDay()===1)continue;
  days.push({id:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`,day:d.toLocaleDateString('en-CA',{weekday:'short'}),date:d.getDate(),label:d.toLocaleDateString('en-CA',{weekday:'long',month:'long',day:'numeric'})});
 }
 return days;
}
export function exampleTimes(date:string,minutes:number) {
 const closingHour=date&&new Date(`${date}T12:00:00`).getDay()===6?17:19;
 return [{label:'9:00 AM',start:540},{label:'10:30 AM',start:630},{label:'12:00 PM',start:720},{label:'1:30 PM',start:810},{label:'3:00 PM',start:900},{label:'4:30 PM',start:990}].filter(slot=>slot.start+minutes<=closingHour*60).map(slot=>slot.label);
}
