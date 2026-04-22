import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Server, Search, BarChart3 } from "lucide-react";
import { useRef } from "react";
import AtmosphericBg from "./AtmosphericBg";

const services = [
  {
    icon: Code2,
    title: "Website Development",
    description: "Custom-built, fast websites engineered with modern frameworks for performance and scalability.",
  },
  {
    icon: Server,
    title: "Hosting & Maintenance",
    description: "Reliable hosting with high uptime, continuous monitoring, and proactive maintenance.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Data-driven SEO strategies that increase organic traffic, improve rankings, and drive qualified leads.",
  },
  {
    icon: BarChart3,
    title: "Conversion Design",
    description: "Strategic UX and conversion-focused design that turns visitors into customers.",
  },
];

const ServiceCard = ({ service, i }: { service: typeof services[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.03) translateY(-10px)`;
    ref.current.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(255,255,255,0.06), 0 0 30px rgba(255,255,255,0.04)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1) translateY(0px)";
    ref.current.style.boxShadow = "none";
  };

  return (
    <motion.div
      ref={ref}
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
    </motion.div>
  );
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section id="services" ref={sectionRef} className="section-padding relative overflow-hidden">
      <AtmosphericBg intensity={1} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-sm uppercase tracking-[0.3em] text-gradient-gold mb-4"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Services built for <span className="text-gradient-silver">growth</span>
          </motion.h2>
        </motion.div>

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
