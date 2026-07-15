import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyZerraSection from "@/components/WhyZerraSection";
import ProcessSection from "@/components/ProcessSection";
import OurWorkSection from "@/components/OurWorkSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import GlobalAtmosphere from "@/components/GlobalAtmosphere";

// Lazy-load ContactPanel — pulls in react-calendly + react-hook-form + zod;
// no reason to pay that cost until the user actually opens the panel
const ContactPanel = lazy(() => import("@/components/ContactPanel"));

type PanelMode = "quote" | "booking";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactMounted, setContactMounted] = useState(false);
  const [panelMode, setPanelMode] = useState<PanelMode>("quote");
  const contactUnmountTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a[href="#contact"]')) {
        e.preventDefault();
        if (contactUnmountTimer.current) window.clearTimeout(contactUnmountTimer.current);
        setPanelMode("quote");
        setContactMounted(true);
        setContactOpen(true);
      } else if (target.closest('a[href="#booking"]')) {
        e.preventDefault();
        if (contactUnmountTimer.current) window.clearTimeout(contactUnmountTimer.current);
        setPanelMode("booking");
        setContactMounted(true);
        setContactOpen(true);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      if (contactUnmountTimer.current) window.clearTimeout(contactUnmountTimer.current);
    };
  }, []);

  const closeContactPanel = () => {
    setContactOpen(false);
    contactUnmountTimer.current = window.setTimeout(() => setContactMounted(false), 350);
  };

  return (
    <>
      <Helmet>
        <title>Zerra Studios — Web Design &amp; Marketing Agency</title>
        <meta
          name="description"
          content="Zerra Studios is an online marketing agency specializing in web design, web development, SEO, and conversion-focused websites. Built for businesses that want results."
        />
        <meta property="og:title" content="Zerra Studios — Web Design &amp; Marketing Agency" />
        <meta
          property="og:description"
          content="Zerra Studios is an online marketing agency specializing in web design, web development, SEO, and conversion-focused websites. Built for businesses that want results."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zerrastudios.com/" />
        <meta property="og:image" content="https://zerrastudios.com/og-image.png" />
        <link rel="canonical" href="https://zerrastudios.com/" />
      </Helmet>
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <GlobalAtmosphere />

<Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyZerraSection />
      <ProcessSection />
      <OurWorkSection />
      <CTASection />
      <Footer />
      {contactMounted && (
        <Suspense fallback={null}>
          <ContactPanel
            key={panelMode}
            open={contactOpen}
            onClose={closeContactPanel}
            mode={panelMode}
          />
        </Suspense>
      )}
    </div>
    </>
  );
};

export default Index;
