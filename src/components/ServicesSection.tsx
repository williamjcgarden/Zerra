import { m, useScroll, useTransform } from "framer-motion";
import { Code2, Server, Search, BarChart3 } from "lucide-react";
import { useRef } from "react";
import type { MouseEvent } from "react";
import { useTilt } from "@/hooks/use-tilt";

const services = [
  {
    icon: Code2,
    title: "Website Development",
    description: "Custom-built, fast websites engineered with modern frameworks for performance and scalability.",
  },
  {
    icon: Server,
    title: "Hosting & Maintenance",
    description: "Zero-hassle hosting with 99.9% uptime, automatic backups, and a team watching your site so you don't have to.",
  },
  {
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    description: "Rank for the searches that matter. We build sustainable organic traffic that keeps compounding month after month.",
  },
  {
    icon: BarChart3,
    title: "Conversion Design",
    description: "Every pixel is intentional. We design visitor journeys that reduce drop-off and turn browsers into buyers.",
  },
];

const ServiceCard = ({ service, i }: { service: typeof services[0]; i: number }) => {
  const { onMouseMove: tiltMove, onMouseLeave: tiltLeave } = useTilt({ perspective: 600, rotateMultiplier: 8, scale: 1.03, translateY: -10 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    tiltMove(e);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(255,255,255,0.06), 0 0 30px rgba(255,255,255,0.04)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    tiltLeave(e);
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card-hover rounded-xl p-8 md:p-10 group cursor-default"
      style={{ transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out" }}
    >
      <service.icon className="w-8 h-8 text-foreground/70 mb-6 transition-all duration-150 ease-out group-hover:scale-125 group-hover:text-foreground group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
      <h3 className="text-xl font-semibold mb-3 tracking-tight transition-all duration-150 ease-out group-hover:text-foreground">{service.title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm transition-colors duration-150 ease-out group-hover:text-foreground/70">{service.description}</p>
    </m.div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section id="services" ref={sectionRef} className="section-padding relative overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        <m.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-16"
        >
          <m.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-sm uppercase tracking-[0.3em] text-gradient-gold mb-4"
          >
            What You Get
          </m.p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Services built for <span className="text-primary" style={{ textShadow: "0 0 15px hsl(43 72% 55% / 0.4), 0 0 45px hsl(43 72% 55% / 0.2), 0 0 80px hsl(43 72% 55% / 0.1)" }}>growth</span>
          </m.h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
