import { useDemoAlert } from "./DemoAlert";

export function Footer() {
  const { show } = useDemoAlert();

  return (
    <footer className="relative py-16 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f08] via-[#231510] to-[#2a1a0e]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-heading text-xl font-extrabold gradient-text mb-4">ROYAL CUTS</h3>
          <p className="font-body text-[#c4a882] text-sm leading-relaxed">
            Premium barbering since 2010. Where every cut is a craft and every client leaves with a smile.
          </p>
        </div>

        <div>
          <h4 className="font-body font-semibold text-gold/70 uppercase tracking-wider text-xs mb-4">Hours</h4>
          <div className="font-body text-[#c4a882] text-sm space-y-1">
            <p>Monday – Saturday: 9am – 8pm</p>
            <p>Sunday: 12pm – 6pm</p>
          </div>
        </div>

        <div>
          <h4 className="font-body font-semibold text-gold/70 uppercase tracking-wider text-xs mb-4">Contact</h4>
          <div className="font-body text-[#c4a882] text-sm space-y-1">
            <p>123 Main Street, Downtown</p>
            <p>(555) 123-4567</p>
          </div>
          <div className="flex gap-4 mt-4">
            <button onClick={show} className="text-[#c4a882] hover:text-gold transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto mt-12 pt-8 text-center">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-8" />
        <p className="font-body text-[#8a7560] text-xs">
          © 2026 Royal Cuts Barbershop. All rights reserved.
        </p>
        <p className="mt-2 font-body text-[11px] leading-relaxed text-[#715f50]">
          This is a concept demo. Testimonials, businesses, statistics, and claims are fictional.
        </p>
      </div>
    </footer>
  );
}
