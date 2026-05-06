import { useState, createContext, useContext, type ReactNode } from "react";

const DemoContext = createContext<{ show: () => void }>({ show: () => {} });

export function useDemoAlert() {
  return useContext(DemoContext);
}

export function DemoAlertProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <DemoContext.Provider value={{ show: () => setOpen(true) }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="glass-card p-8 max-w-md mx-4 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-3xl mb-4">✂️</p>
            <h3 className="font-heading text-xl font-bold text-primary-foreground mb-3">Demo Website</h3>
            <p className="font-body text-[#c4a882] text-sm leading-relaxed mb-6">
              This is a demo site. If this website was yours, this button would send visitors straight into your booking flow, quote request, or preferred contact system.
            </p>
            <button onClick={() => setOpen(false)} className="btn-gold px-8 py-3 text-xs">
              GOT IT
            </button>
          </div>
        </div>
      )}
    </DemoContext.Provider>
  );
}
