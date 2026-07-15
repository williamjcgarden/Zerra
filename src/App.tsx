import { Suspense, useEffect } from "react";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_ROUTES } from "@/routes";

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
  const routes = useRoutes(APP_ROUTES, location);

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
          <Suspense fallback={<RouteFallback />}>{routes}</Suspense>
        </m.div>
      </AnimatePresence>
    </>
  );
};

export type HelmetContext = { helmet?: HelmetServerState | null };

export const AppShell = ({ helmetContext }: { helmetContext?: HelmetContext }) => (
  <HelmetProvider context={helmetContext}>
    <LazyMotion features={domAnimation}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatedRoutes />
      </TooltipProvider>
    </LazyMotion>
  </HelmetProvider>
);

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
