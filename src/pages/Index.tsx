import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyZerraSection from "@/components/WhyZerraSection";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";
import ContactPanel from "@/components/ContactPanel";
import Footer from "@/components/Footer";
import CursorTrail from "@/components/CursorTrail";
import GlobalAtmosphere from "@/components/GlobalAtmosphere";

type PanelMode = "quote" | "booking";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<PanelMode>("quote");

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a[href="#contact"]')) {
        e.preventDefault();
        setPanelMode("quote");
        setContactOpen(true);
      } else if (target.closest('a[href="#booking"]')) {
        e.preventDefault();
        setPanelMode("booking");
        setContactOpen(true);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <GlobalAtmosphere />
      <CursorTrail />

<Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyZerraSection />
      <ProcessSection />
      <CTASection />
      <Footer />
      <ContactPanel
        key={panelMode}
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        mode={panelMode}
      />
    </div>
  );
};

export default Index;
