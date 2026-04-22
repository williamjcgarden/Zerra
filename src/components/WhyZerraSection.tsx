import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Shield, TrendingUp, Paintbrush, Clock } from "lucide-react";
import AtmosphericBg from "./AtmosphericBg";
import ScanOverlay from "./ScanOverlay";

const differentiators = [
  { icon: Zap, title: "Lightning Fast", description: "Sub-second load times that keep users engaged and search engines happy." },
  { icon: TrendingUp, title: "Results Focused", description: "Every design decision is purposeful and optimized for real business outcomes." },
  { icon: Paintbrush, title: "Clean Design", description: "Minimal, purposeful aesthetics that communicate trust and professionalism." },
  { icon: Shield, title: "Secure & Reliable", description: "Robust security practices protecting your business and customer data." },
  { icon: Clock, title: "On-Time Delivery", description: "Transparent timelines and reliable delivery you can plan your business around." },
];

const WhyZerraSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 0.35], [50, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section id="why-zerra" ref={sectionRef} className="section-padding relative overflow-hidden">
      <AtmosphericBg intensity={0.7} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Why Zerra</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Built different<span className="text-primary">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {differentiators.map((item, i) => (
            <ScanOverlay key={item.title} className={`rounded-xl ${i === 4 ? "sm:col-span-2 sm:max-w-xs sm:mx-auto lg:col-span-1 lg:max-w-none" : ""}`}>
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -8, scale: 1.05, transition: { duration: 0.15, ease: "easeOut" } }}
                className="text-center p-6 md:p-8 rounded-xl border border-border/50 hover:border-foreground/20 transition-all duration-150 ease-out group hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                style={{ perspective: "800px" }}
              >
                <item.icon className="w-6 h-6 text-foreground/60 mx-auto mb-4 group-hover:scale-130 group-hover:text-foreground group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-150 ease-out" />
                <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            </ScanOverlay>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyZerraSection;
