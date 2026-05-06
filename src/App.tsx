import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = lazy(() => import("./pages/Index.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const OurWork = lazy(() => import("./pages/OurWork.tsx"));
const BarbershopDemo = lazy(() => import("./pages/demos/BarbershopDemo.tsx"));
const LandscapingDemo = lazy(() => import("./pages/demos/LandscapingDemo.tsx"));
const TechDemo = lazy(() => import("./pages/demos/TechDemo.tsx"));

const RouteFallback = () => (
  <div className="min-h-screen bg-background" />
);

const ScrollToRoute = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [hash, pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToRoute />
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="min-h-screen"
        >
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/our-work" element={<OurWork />} />
              <Route path="/our-work/barbershop-demo" element={<BarbershopDemo />} />
              <Route path="/our-work/landscaping-demo" element={<LandscapingDemo />} />
              <Route path="/our-work/tech-demo" element={<TechDemo />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </m.div>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <HelmetProvider>
  <LazyMotion features={domAnimation}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </LazyMotion>
  </HelmetProvider>
);

export default App;
