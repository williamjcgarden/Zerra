import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";

/**
 * Renders subtle animated diagonal lines + floating particles
 * that parallax-scroll with the section they're placed in.
 *
 * Not used on the main Index page (GlobalAtmosphere handles that globally).
 * Used on: PrivacyPolicy, TermsOfService, NotFound — secondary/static pages
 * that don't have GlobalAtmosphere mounted.
 */
const AtmosphericBg = ({ intensity = 1 }: { intensity?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60 * intensity, -60 * intensity]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30 * intensity, -30 * intensity]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80 * intensity, -80 * intensity]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary diagonal lines */}
      <m.div
        className="absolute inset-0"
        style={{
          y: y1,
          opacity: 0.04 * intensity,
          background:
            "repeating-linear-gradient(115deg, transparent 0px, transparent 48px, rgba(255,255,255,0.14) 50.5px, transparent 53px, transparent 100px)",
        }}
      />

      {/* Secondary cross lines */}
      <m.div
        className="absolute inset-0"
        style={{
          y: y2,
          opacity: 0.03 * intensity,
          background:
            "repeating-linear-gradient(65deg, transparent 0px, transparent 68px, rgba(255,255,255,0.12) 70.5px, transparent 73px, transparent 140px)",
        }}
      />

      {/* Floating dots / stars */}
      <m.div className="absolute inset-0" style={{ y: y3 }}>
        {[
          { top: "12%", left: "8%", size: 2, opacity: 0.12 },
          { top: "28%", left: "85%", size: 1.5, opacity: 0.1 },
          { top: "55%", left: "22%", size: 1, opacity: 0.08 },
          { top: "72%", left: "65%", size: 2.5, opacity: 0.14 },
          { top: "38%", left: "45%", size: 1, opacity: 0.06 },
          { top: "85%", left: "90%", size: 1.5, opacity: 0.1 },
          { top: "15%", left: "55%", size: 1, opacity: 0.07 },
          { top: "65%", left: "35%", size: 2, opacity: 0.09 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity * intensity,
            }}
          />
        ))}
      </m.div>

      {/* Soft radial glow for depth */}
      <m.div
        className="absolute inset-0"
        style={{
          y: y2,
          opacity: 0.03 * intensity,
          background: "radial-gradient(ellipse at 40% 50%, rgba(255,255,255,0.12), transparent 70%)",
        }}
      />
    </div>
  );
};

export default AtmosphericBg;
