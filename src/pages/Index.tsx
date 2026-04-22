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

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href="#contact"]');
      if (anchor) {
        e.preventDefault();
        setContactOpen(true);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GlobalAtmosphere />
      <CursorTrail />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyZerraSection />
      <ProcessSection />
      <CTASection />
      <Footer />
      <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Index;
