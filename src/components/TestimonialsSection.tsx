import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Zerra rebuilt our entire e-commerce platform and we saw a 280% increase in conversions within three months. Best investment we've made.",
    name: "Sarah Chen",
    role: "CEO, Luxe Commerce",
    metric: "+280% conversions",
  },
  {
    quote: "Their approach to SEO and performance optimization brought us from page 3 to position 1 for our top keywords. Revenue followed.",
    name: "Marcus Reid",
    role: "Founder, Atlas Legal",
    metric: "#1 ranking achieved",
  },
  {
    quote: "Clean, fast, and built to convert. Our new site pays for itself every single month in new patient acquisitions.",
    name: "Dr. Priya Patel",
    role: "Director, Bloom Health",
    metric: "12x ROI in year one",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Client <span className="text-gradient-silver">results</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.quote}"</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <span className="text-xs font-semibold text-gold border border-gold/20 rounded-full px-3 py-1">
                  {t.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
