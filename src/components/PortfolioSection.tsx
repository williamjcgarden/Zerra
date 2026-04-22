import { motion } from "framer-motion";

const projects = [
  { title: "Luxe Commerce", category: "E-Commerce", description: "Premium online store with modern checkout experience" },
  { title: "Atlas Legal", category: "Professional Services", description: "Corporate site designed to attract qualified leads" },
  { title: "Bloom Health", category: "Healthcare", description: "Patient portal built for clarity and ease of use" },
  { title: "Forge Fitness", category: "Local Business", description: "Membership platform designed for growth" },
  { title: "Vertex SaaS", category: "Technology", description: "Product site optimised for engagement and clarity" },
  { title: "Nova Real Estate", category: "Real Estate", description: "Property platform built for lead generation" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Selected <span className="text-gradient-silver">work</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-xl overflow-hidden border border-border/50 hover:border-gold/30 transition-all duration-500 cursor-pointer aspect-[4/3] flex items-end"
              style={{
                background: `linear-gradient(135deg, hsl(0 0% ${8 + i * 2}%) 0%, hsl(0 0% 5%) 100%)`,
              }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 rounded-full px-3 py-1">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="relative p-6 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
