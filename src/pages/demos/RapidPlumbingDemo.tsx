import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/demos/rapid-plumbing/components/Header";
import { Footer } from "@/demos/rapid-plumbing/components/Footer";
import { MobileCallBar } from "@/demos/rapid-plumbing/components/MobileCallBar";
import { Route as HomeRoute } from "@/demos/rapid-plumbing/pages/Home";
import { Route as ServicesRoute } from "@/demos/rapid-plumbing/pages/Services";
import { Route as ReviewsRoute } from "@/demos/rapid-plumbing/pages/Reviews";
import { Route as ServiceAreasRoute } from "@/demos/rapid-plumbing/pages/ServiceAreas";
import { Route as ContactRoute } from "@/demos/rapid-plumbing/pages/Contact";
import "@/demos/rapid-plumbing/rapid-plumbing.css";

const TITLES: Record<string, string> = {
  "": "Rapid Plumbing & Gas - Comox Valley Plumbers",
  services: "Services - Rapid Plumbing & Gas",
  reviews: "Reviews - Rapid Plumbing & Gas",
  "service-areas": "Service Areas - Rapid Plumbing & Gas",
  contact: "Contact - Rapid Plumbing & Gas",
};

const Home = HomeRoute.component;
const Services = ServicesRoute.component;
const Reviews = ReviewsRoute.component;
const ServiceAreas = ServiceAreasRoute.component;
const Contact = ContactRoute.component;

export default function RapidPlumbingDemo() {
  const { pathname, hash } = useLocation();
  const section = pathname.split("/").filter(Boolean).at(-1) ?? "";

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [hash, pathname]);

  return (
    <div className="rapid-plumbing-demo flex min-h-screen flex-col bg-background">
      <Helmet>
        <title>{TITLES[section] ?? TITLES[""]}</title>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />
        <meta name="description" content="Private Rapid Plumbing & Gas website demonstration by Zerra Studios." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Work+Sans:wght@400;500;600;700&display=swap" />
      </Helmet>
      <Header />
      <main className="flex-1 pb-24 lg:pb-0">
        <Routes>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="service-areas" element={<ServiceAreas />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}
