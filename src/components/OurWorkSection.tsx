import { Link } from "react-router-dom";
import { m } from "framer-motion";
import type { MouseEvent } from "react";
import { useTilt } from "@/hooks/use-tilt";
import barbershopPreview from "@/assets/work-previews/barbershop.webp";
import landscapingPreview from "@/assets/work-previews/landscaping.webp";
import techPreview from "@/assets/work-previews/tech.webp";

type Project = {
  slug: string;
  label: string;
  image: string;
  imageAlt: string;
};

const projects: Project[] = [
  {
    slug: "barbershop-demo",
    label: "Barbershops",
    image: barbershopPreview,
    imageAlt: "Royal Cuts Barbershop homepage preview",
  },
  {
    slug: "landscaping-demo",
    label: "Landscaping",
    image: landscapingPreview,
    imageAlt: "Verdant Landscaping homepage preview",
  },
  {
    slug: "tech-demo",
    label: "Tech/SaaS Startups",
    image: techPreview,
    imageAlt: "StartUp SaaS homepage preview",
  },
];

const WorkCard = ({ project, i }: { project: Project; i: number }) => {
  const { onMouseMove: tiltMove, onMouseLeave: tiltLeave } = useTilt({
    perspective: 600,
    rotateMultiplier: 8,
    scale: 1.03,
    translateY: -10,
  });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    tiltMove(e);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.boxShadow = `${-x * 20}px ${y * 20}px 40px rgba(255,255,255,0.06), 0 0 30px rgba(255,255,255,0.04)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    tiltLeave(e);
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        to={`/our-work/${project.slug}`}
        aria-label={`Open ${project.label} demo`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative block aspect-[32/15] overflow-hidden rounded-xl border border-border/70 bg-black/30 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{ transition: "transform 0.15s ease-out, box-shadow 0.15s ease-out" }}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          width={1024}
          height={480}
          className="h-full w-full object-cover transition-all duration-150 ease-out group-hover:scale-105 group-hover:blur-sm group-hover:brightness-50"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-150 ease-out group-hover:bg-black/35 group-hover:opacity-100">
          <div className="flex flex-col items-center px-5 py-3 text-center">
            <span className="max-w-[92%] pb-1 text-xl font-bold leading-[1.2] tracking-tight text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.28)] md:text-2xl">
              {project.label}
            </span>
          </div>
        </div>
      </Link>
    </m.div>
  );
};

const OurWorkSection = () => {
  return (
    <section id="our-work" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gradient-gold mb-4">
            Our Work
          </p>
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Websites tailored to <span className="text-primary" style={{ textShadow: "0 0 15px hsl(43 72% 55% / 0.4), 0 0 45px hsl(43 72% 55% / 0.2), 0 0 80px hsl(43 72% 55% / 0.1)" }}>any industry</span>
          </m.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <WorkCard key={project.slug} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWorkSection;
