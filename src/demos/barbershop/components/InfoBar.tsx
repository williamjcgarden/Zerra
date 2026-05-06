export function InfoBar() {
  return (
    <section className="relative py-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-surface-dark to-background" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-primary-foreground/50 text-xs font-body">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
          <span>Mon–Sat 9am–8pm | Sun 12–6pm</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
          <span>123 Main Street, Downtown</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
          <span>(555) 123-4567</span>
        </div>
      </div>
    </section>
  );
}
