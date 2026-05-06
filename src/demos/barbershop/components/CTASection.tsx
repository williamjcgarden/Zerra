import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { useDemoAlert } from "./DemoAlert";
import ctaBg from "../assets/cta-bg.jpg";

export function CTASection() {
  const ref = useScrollReveal();
  const { show } = useDemoAlert();

  return (
    <section id="book" className="relative py-32 md:py-44 px-6 overflow-hidden">
      {/* Background image */}
      <img
        src={ctaBg}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div ref={ref} className="reveal-on-scroll relative z-10 max-w-3xl mx-auto text-center">
        {/* Scissors divider */}
        <p className="text-gold/70 text-4xl mb-6">✂</p>

        {/* Subtitle — bold and visible */}
        <p className="text-sm md:text-base font-heading font-bold tracking-[0.35em] uppercase text-gold mb-5">
          Your Chair Awaits
        </p>

        {/* Main heading */}
        <h2 className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-[1.05] drop-shadow-lg">
          Ready for your
          <br />
          <span className="gradient-text">best look?</span>
        </h2>

        {/* Description */}
        <p className="font-body text-white/60 mt-6 text-lg md:text-xl font-light max-w-xl mx-auto">
          Walk in or book ahead — we'll make sure you leave feeling like a million bucks.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={show} className="btn-gold px-14 py-5 text-sm shadow-xl shadow-gold/20">
            BOOK YOUR CUT
          </button>
          <button
            onClick={show}
            className="border-2 border-white/30 hover:border-gold/60 text-white hover:text-gold font-body font-medium text-sm uppercase tracking-wider px-10 py-4 rounded-xl transition-all duration-300"
          >
            Call Us
          </button>
        </div>
      </div>
    </section>
  );
}
