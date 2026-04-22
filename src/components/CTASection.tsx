import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AtmosphericBg from "./AtmosphericBg";

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const glowScale = useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1.2]);

  return (
    <section ref={sectionRef} className="section-padding bg-card/50 relative overflow-hidden">
      <AtmosphericBg intensity={1.2} />

      {/* Ambient glow with parallax */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(38 33% 61%), transparent)",
          scale: glowScale,
        }}
      />

      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          Ready to build
          <br />
          <span className="text-gradient-gold">something great?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto"
        >
          Let's build a website that works as hard as you do. Performance, clarity, and results — from day one.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <a href="#booking" className="btn-gold text-sm inline-block min-h-[44px] leading-[44px] px-10 py-0 md:px-8 md:py-4 md:leading-normal md:min-h-0">Book a Call</a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
