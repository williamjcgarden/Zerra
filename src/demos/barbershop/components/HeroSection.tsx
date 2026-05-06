import heroImg from "../assets/hero-barbershop.jpg";
import { useDemoAlert } from "./DemoAlert";

export function HeroSection() {
  const { show } = useDemoAlert();

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Premium barbershop interior"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/95" />
      <div className="glow-orb w-96 h-96 bg-gold/20 top-1/4 -left-48" />
      <div className="glow-orb w-72 h-72 bg-gold/10 bottom-1/4 right-0" style={{ animationDelay: '2.5s' }} />

      <div className="relative z-10 text-center px-6 hero-animate max-w-4xl mx-auto">
        <p className="font-body text-xs md:text-sm tracking-[0.4em] uppercase text-gold/80 mb-6 font-medium">
          EST. 2010 — Classic Barbering
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-[6rem] font-extrabold leading-[0.95] tracking-tight">
          <span className="text-primary-foreground">Premium Cuts.</span>
          <br />
          <span className="text-shimmer mt-2 inline-block">Timeless Style.</span>
        </h1>
        <p className="font-body text-base md:text-lg text-primary-foreground/50 mt-8 max-w-xl mx-auto leading-relaxed font-light">
          Where tradition meets precision. Every visit is an experience in classic craftsmanship.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#barbers" className="btn-gold px-10 py-4 text-sm">
            View Our Barbers
          </a>
          <button
            onClick={show}
            className="group relative border border-gold/30 text-gold font-body font-medium text-sm uppercase tracking-wider px-10 py-4 rounded-xl overflow-hidden transition-all hover:border-gold/60"
          >
            <span className="relative z-10">Book an Appointment</span>
            <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
