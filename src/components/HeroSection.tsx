import { useRef } from "react";
import type React from "react";
import { m } from "framer-motion";


const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content with parallax */}
      <m.div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Premium Web Studio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
            Websites that
            <br />
            <span className="text-primary" style={{ textShadow: "0 0 15px hsl(43 72% 55% / 0.4), 0 0 45px hsl(43 72% 55% / 0.2), 0 0 80px hsl(43 72% 55% / 0.1)" }}>drive revenue</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-12 text-lg leading-[1.9] text-white/85 md:text-xl md:leading-[1.85]">
            <span className="box-decoration-clone rounded-md bg-black/25 px-2 py-1 shadow-[0_2px_14px_rgba(0,0,0,0.15)] backdrop-blur-[3px]">
              We design and build conversion-focused websites for ambitious businesses — fast, beautiful, and built to rank.
            </span>
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact" className="btn-gold">Get a Quote</a>
        </m.div>
        <p className="text-xs text-muted-foreground mt-4 tracking-wide">Free consultation · No obligation · Results in 2–4 weeks</p>
      </m.div>
    </section>
  );
};

export default HeroSection;
