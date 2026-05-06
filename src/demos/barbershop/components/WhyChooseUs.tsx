import { useScrollReveal } from "../hooks/use-scroll-reveal";

const features = [
  {
    title: "Expert Craftsmanship",
    desc: "Masters of their trade, trained in both classic and contemporary techniques.",
    icon: "✂️",
  },
  {
    title: "Premium Products",
    desc: "Only the finest grooming products, sourced from heritage brands trusted for generations.",
    icon: "✨",
  },
  {
    title: "Welcoming Vibe",
    desc: "Good conversation, cold drinks, and an atmosphere built for relaxation.",
    icon: "🤝",
  },
];

export function WhyChooseUs() {
  const ref = useScrollReveal();

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Warm colorful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.12_0.04_30)] via-[oklch(0.10_0.03_45)] to-[oklch(0.08_0.02_260)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_oklch(0.72_0.18_45_/_0.12)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_oklch(0.65_0.15_30_/_0.10)_0%,_transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="glow-orb w-96 h-96 bg-gold/15 -bottom-20 -right-20" />
      <div className="glow-orb w-72 h-72 bg-[oklch(0.6_0.12_30_/_0.08)] top-10 -left-10" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div ref={ref} className="reveal-on-scroll text-center mb-16">
          <p className="text-xs font-body font-medium tracking-[0.3em] uppercase text-gold/60 mb-3">Why Us</p>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-primary-foreground">
            Why Choose <span className="text-shimmer font-black">Royal Cuts</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <FeatureBlock key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({ title, desc, icon }: { title: string; desc: string; icon: string }) {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="reveal-on-scroll glass-card gold-glow-hover p-8 text-center">
      <div className="text-3xl mb-5">{icon}</div>
      <h3 className="font-heading text-lg font-bold text-primary-foreground mb-3">{title}</h3>
      <p className="font-body text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
