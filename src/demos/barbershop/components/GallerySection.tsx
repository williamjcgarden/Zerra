import { useScrollReveal } from "../hooks/use-scroll-reveal";
import { useEffect, useRef, useState } from "react";
import pompadourImg from "../assets/pompadour.jpg";

const images = [
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80", caption: "Skin Fade" },
  { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80", caption: "Classic Cut" },
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80", caption: "Beard Trim" },
  { src: pompadourImg, caption: "Pompadour" },
  { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80", caption: "Textured Crop" },
  { src: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=600&q=80", caption: "Line Up" },
];

function AnimatedImage({ src, caption, index }: { src: string; caption: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl group transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
      }`}
    >
      <img
        src={src}
        alt={caption}
        loading="lazy"
        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
        <p className="font-body text-sm text-white font-semibold px-4 pb-4 tracking-wider uppercase">
          {caption}
        </p>
      </div>
    </div>
  );
}

export function GallerySection() {
  const ref = useScrollReveal();

  return (
    <section id="gallery" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dark via-brown-dark to-background" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div ref={ref} className="reveal-on-scroll text-center mb-16">
          <p className="text-xs font-body font-medium tracking-[0.3em] uppercase text-gold/60 mb-3">Portfolio</p>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground">
            Our <span className="gradient-text">Work</span>
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-lg mx-auto text-sm">
            A showcase of cuts, styles, and craft. Every head tells a story.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <AnimatedImage key={img.caption} index={i} {...img} />
          ))}
        </div>
      </div>
    </section>
  );
}
