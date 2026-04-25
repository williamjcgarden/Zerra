import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

const AVAILABILITY = "5 project slots available";

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const glowScale = useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1.2]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">

      {/* Ambient glow with parallax */}
      <m.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(38 33% 61%), transparent)",
          scale: glowScale,
        }}
      />

      <m.div
        className="max-w-3xl mx-auto text-center relative z-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-muted-foreground tracking-widest uppercase">{AVAILABILITY}</span>
        </m.div>
        <m.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          Ready to build
          <br />
          <span className="text-primary" style={{ textShadow: "0 0 15px hsl(43 72% 55% / 0.4), 0 0 45px hsl(43 72% 55% / 0.2), 0 0 80px hsl(43 72% 55% / 0.1)" }}>something great?</span>
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto"
        >
          Let's build a website that works as hard as you do. Performance, clarity, and results — from day one.
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a href="#contact" className="btn-gold text-sm inline-block min-h-[44px] leading-[44px] px-10 py-0 md:px-8 md:py-4 md:leading-normal md:min-h-0">Get a Quote</a>
        </m.div>
      </m.div>
    </section>
  );
};

export default CTASection;
