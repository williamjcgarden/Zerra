import { useState } from "react";
import { useLocation } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

type NavLink = { label: string; href: string };

const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Why Zerra", href: "#why-zerra" },
  { label: "Process", href: "#process" },
  { label: "Our Work", href: "#our-work" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const renderLink = (link: NavLink, mobile = false) => {
    const cls = mobile
      ? "text-sm text-muted-foreground hover:text-foreground transition-colors"
      : "text-[13px] lg:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide whitespace-nowrap";
    const href = location.pathname === "/" ? link.href : `/${link.href}`;

    return (
      <a
        key={link.href}
        href={href}
        onClick={mobile ? () => setMobileOpen(false) : undefined}
        className={cls}
      >
        {link.label}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between h-16 md:h-20">
        <a href="/" className="text-xl font-bold tracking-tight text-foreground shrink-0">
          ZERRA<span className="text-gradient-gold">.</span>
        </a>

        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => renderLink(link))}
        </div>

        <div className="hidden md:block shrink-0">
          <a href={location.pathname === "/" ? "#contact" : "/#contact"} className="btn-gold text-xs whitespace-nowrap px-5 py-3 lg:px-8 lg:py-4">Get a Quote</a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="md:hidden text-foreground"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => renderLink(link, true))}
              <a href={location.pathname === "/" ? "#contact" : "/#contact"} onClick={() => setMobileOpen(false)} className="btn-gold text-xs text-center mt-2">
                Get a Quote
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
