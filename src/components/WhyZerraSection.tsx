import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { Zap, Shield, TrendingUp, Paintbrush, Clock } from "lucide-react";
import ScanOverlay from "./ScanOverlay";
import { useTilt } from "@/hooks/use-tilt";

const differentiators = [
  { icon: Zap, title: "Lightning Fast", description: "Sub-second load times that keep users engaged and search engines happy. Slow sites lose 53% of mobile visitors before the page even loads." },
  { icon: TrendingUp, title: "Results Focused", description: "We track what matters — leads, bookings, and revenue — not just traffic vanity metrics." },
  { icon: Paintbrush, title: "Clean Design", description: "From bold 3D experiences to stripped-back minimalism — we design to match your brand, your audience, and your goals." },
  { icon: Shield, title: "Secure & Reliable", description: "SSL, daily backups, uptime monitoring, and rapid response if anything ever goes wrong." },
  { icon: Clock, title: "On-Time Delivery", description: "We scope carefully and communicate clearly. Your launch date is a commitment, not an estimate." },
];

const WhyZerraSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { onMouseMove, onMouseLeave } = useTilt();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 0.35], [50, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section id="why-zerra" ref={sectionRef} className="section-padding relative overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        <m.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">Why Zerra</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Built different<span className="text-primary">.</span>
          </h2>
        </m.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {differentiators.map((item, i) => (
            <div
              key={item.title}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className={`rounded-xl border border-border/50 hover:border-foreground/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)] cursor-default group ${i === 4 ? "sm:col-span-2 sm:max-w-xs sm:mx-auto lg:col-span-1 lg:max-w-none" : ""}`}
              style={{ transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out" }}
            >
              <ScanOverlay className="rounded-xl h-full">
                <m.div
                  initial={{ opacity: 0, y: 35, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] } }}
                  viewport={{ once: true, margin: "-40px" }}
                  className="text-center p-6 md:p-8"
                >
                  <item.icon className="w-6 h-6 text-foreground/60 mx-auto mb-4 group-hover:scale-130 group-hover:text-foreground group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-150 ease-out" />
                  <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </m.div>
              </ScanOverlay>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyZerraSection;
