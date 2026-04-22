import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Crosshair, Palette, Zap, Rocket } from "lucide-react";
import ScanOverlay from "./ScanOverlay";

const steps = [
  { number: "01", icon: Crosshair, title: "Strategy", description: "Deep-dive into your business goals, audience, and competitive landscape." },
  { number: "02", icon: Palette, title: "Design", description: "Pixel-perfect mockups focused on user experience and conversion flow." },
  { number: "03", icon: Zap, title: "Development", description: "Clean, performant code built with modern frameworks and best practices." },
  { number: "04", icon: Rocket, title: "Launch & Optimise", description: "Deployment, monitoring, and continuous optimisation for strong performance." },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 0.35], [50, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section id="process" ref={sectionRef} className="section-padding relative overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Process</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            How we <span className="text-primary" style={{ textShadow: "0 0 15px hsl(43 72% 55% / 0.4), 0 0 45px hsl(43 72% 55% / 0.2), 0 0 80px hsl(43 72% 55% / 0.1)" }}>deliver</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, scale: 1.03, boxShadow: "inset 0 0 0 1px hsl(0 0% 100% / 0.35), 0 0 25px rgba(255,255,255,0.06)", transition: { duration: 0.15, ease: "easeOut" } }}
              className="relative rounded-xl transition-all duration-150 ease-out group"
              style={{ boxShadow: "inset 0 0 0 1px hsl(0 0% 100% / 0.12)" }}
            >
              <ScanOverlay className="rounded-xl">
                <div className="relative p-8">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border/50" />
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <step.icon className="w-6 h-6 text-foreground/50 group-hover:text-foreground group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-150" />
                    <span className="text-3xl font-bold text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors duration-150">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </ScanOverlay>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
