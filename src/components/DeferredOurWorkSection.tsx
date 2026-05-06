import { lazy, Suspense, useEffect, useRef, useState } from "react";

const OurWorkSection = lazy(() => import("@/components/OurWorkSection"));

const DeferredOurWorkSection = () => {
  const [shouldLoad, setShouldLoad] = useState(() => window.location.hash === "#our-work");
  const placeholderRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (shouldLoad) return;

    const loadFromHash = () => {
      if (window.location.hash === "#our-work") {
        setShouldLoad(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );

    const current = placeholderRef.current;
    if (current) observer.observe(current);
    window.addEventListener("hashchange", loadFromHash);
    loadFromHash();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", loadFromHash);
    };
  }, [shouldLoad]);

  if (!shouldLoad) {
    return <section id="our-work" ref={placeholderRef} className="section-padding min-h-[520px]" />;
  }

  return (
    <Suspense fallback={<section id="our-work" ref={placeholderRef} className="section-padding min-h-[520px]" />}>
      <OurWorkSection />
    </Suspense>
  );
};

export default DeferredOurWorkSection;
