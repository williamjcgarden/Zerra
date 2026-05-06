import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { useRef, useState, useEffect } from "react";
import barber1 from "../assets/barber-1.jpg";
import barber2 from "../assets/barber-2.jpg";
import barber3 from "../assets/barber-3.jpg";
import barber4 from "../assets/barber-4.jpg";
import barber5 from "../assets/barber-5.jpg";
import barber6 from "../assets/barber-6.jpg";

const barbers = [
  { name: "Marcus", years: 12, specialty: "Fade Master", photo: barber1 },
  { name: "James", years: 8, specialty: "Classic Cuts", photo: barber2 },
  { name: "Derek", years: 15, specialty: "Beard Specialist", photo: barber3 },
  { name: "Viktor", years: 20, specialty: "Hot Towel Shaves", photo: barber4 },
  { name: "Kevin", years: 6, specialty: "Modern Styles", photo: barber5 },
  { name: "Omar", years: 10, specialty: "Straight Razor", photo: barber6 },
];

export function BarbersSection() {
  const ref = useScrollReveal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <section id="barbers" className="relative py-16 md:py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-dark to-background" />
      <div className="glow-orb w-64 h-64 bg-gold/10 -top-32 left-1/3" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={ref} className="reveal-on-scroll flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-body font-medium tracking-[0.3em] uppercase text-gold/60 mb-2">The Team</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-foreground">
              Our <span className="gradient-text">Barbers</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary-foreground/60 hover:text-gold transition-colors disabled:opacity-30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary-foreground/60 hover:text-gold transition-colors disabled:opacity-30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {barbers.map((b) => (
            <BarberCard key={b.name} {...b} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BarberCard({ name, years, specialty, photo }: { name: string; years: number; specialty: string; photo: string }) {
  return (
    <div className="flex-shrink-0 w-52 md:w-60 snap-start group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl glass-card gold-glow-hover">
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="w-full h-56 md:h-64 object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-heading text-lg font-bold text-primary-foreground">{name}</h3>
          <p className="text-gold text-xs font-body font-medium mt-0.5">{specialty}</p>
          <p className="text-primary-foreground/40 text-[11px] font-body mt-1">{years} yrs exp.</p>
        </div>
      </div>
    </div>
  );
}
