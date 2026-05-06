import { useEffect } from "react";
import "@/demos/barbershop/barbershop.css";
import BackToZerra from "@/components/BackToZerra";
import { Navbar } from "@/demos/barbershop/components/BarberNavbar";
import { HeroSection } from "@/demos/barbershop/components/HeroSection";
import { InfoBar } from "@/demos/barbershop/components/InfoBar";
import { BarbersSection } from "@/demos/barbershop/components/BarbersSection";
import { GallerySection } from "@/demos/barbershop/components/GallerySection";
import { WhyChooseUs } from "@/demos/barbershop/components/WhyChooseUs";
import { CTASection } from "@/demos/barbershop/components/CTASection";
import { Footer } from "@/demos/barbershop/components/Footer";
import { DemoAlertProvider } from "@/demos/barbershop/components/DemoAlert";

const fontHref =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap";

const BarbershopDemo = () => {
  useEffect(() => {
    if (document.head.querySelector(`link[href="${fontHref}"]`)) return;

    const fontLink = document.createElement("link");
    fontLink.rel = "stylesheet";
    fontLink.href = fontHref;
    document.head.appendChild(fontLink);
  }, []);

  return (
    <div className="barbershop-demo">
      <DemoAlertProvider>
        <BackToZerra />
        <Navbar />
        <main>
          <HeroSection />
          <InfoBar />
          <BarbersSection />
          <GallerySection />
          <WhyChooseUs />
          <CTASection />
        </main>
        <Footer />
      </DemoAlertProvider>
    </div>
  );
};

export default BarbershopDemo;
