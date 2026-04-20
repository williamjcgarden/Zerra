import { m, useScroll, useTransform } from "framer-motion";

const GlobalAtmosphere = () => {
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* Layer 1 — wide organic sweep */}
      <m.div
        className="absolute inset-0"
        style={{ y: y1, height: "250%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.55,
            background: `
              linear-gradient(118deg, transparent 0%, transparent 19%, rgba(200,215,230,0.03) 20%, rgba(200,215,230,0.12) 21%, rgba(223,176,58,0.32) 22.5%, rgba(200,215,230,0.12) 24%, rgba(200,215,230,0.03) 25%, transparent 26%, transparent 43%, rgba(200,215,230,0.02) 44%, rgba(200,215,230,0.10) 45%, rgba(223,176,58,0.26) 45.7%, rgba(200,215,230,0.10) 46.4%, rgba(200,215,230,0.02) 47.5%, transparent 48%, transparent 67%, rgba(200,215,230,0.02) 68%, rgba(200,215,230,0.10) 69%, rgba(223,176,58,0.28) 69.7%, rgba(200,215,230,0.10) 70.4%, rgba(200,215,230,0.02) 71.5%, transparent 72%, transparent 100%)
            `,
            animation: "shimmerDrift 16s ease-in-out infinite alternate",
          }}
        />
      </m.div>

      {/* Layer 2 — thinner crossing wisps */}
      <m.div
        className="absolute inset-0"
        style={{ y: y2, height: "250%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.45,
            background: `
              linear-gradient(62deg, transparent 0%, transparent 14%, rgba(200,215,230,0.02) 15%, rgba(200,215,230,0.10) 16%, rgba(223,176,58,0.26) 17.2%, rgba(200,215,230,0.10) 18.4%, rgba(200,215,230,0.02) 19.5%, transparent 20%, transparent 39%, rgba(200,215,230,0.02) 40%, rgba(200,215,230,0.10) 41%, rgba(223,176,58,0.28) 41.7%, rgba(200,215,230,0.10) 42.4%, rgba(200,215,230,0.02) 43.5%, transparent 44%, transparent 59%, rgba(200,215,230,0.02) 60.5%, rgba(200,215,230,0.09) 62%, rgba(223,176,58,0.24) 62.7%, rgba(200,215,230,0.09) 63.4%, rgba(200,215,230,0.02) 65%, transparent 65.5%, transparent 81%, rgba(200,215,230,0.02) 82%, rgba(200,215,230,0.10) 83%, rgba(223,176,58,0.30) 83.7%, rgba(200,215,230,0.10) 84.4%, rgba(200,215,230,0.02) 85.5%, transparent 86.5%, transparent 100%)
            `,
            animation: "shimmerDrift2 20s ease-in-out infinite alternate",
          }}
        />
      </m.div>

      {/* Layer 3 — faint broad glow bands */}
      <m.div
        className="absolute inset-0"
        style={{ y: y1, height: "200%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.38,
            background: `
              linear-gradient(135deg, transparent 0%, transparent 29%, rgba(200,215,230,0.02) 31%, rgba(200,215,230,0.09) 33%, rgba(223,176,58,0.24) 35%, rgba(200,215,230,0.09) 37%, rgba(200,215,230,0.02) 39%, transparent 40%, transparent 69%, rgba(200,215,230,0.02) 71%, rgba(200,215,230,0.09) 73%, rgba(223,176,58,0.22) 75%, rgba(200,215,230,0.09) 77%, rgba(200,215,230,0.02) 79%, transparent 80%, transparent 100%)
            `,
            animation: "shimmerDrift3 24s ease-in-out infinite alternate",
          }}
        />
      </m.div>

      {/* Inline keyframes for shimmer animations */}
      <style>{`
        @keyframes shimmerDrift {
          0% { transform: translateX(0%); opacity: 0.48; }
          50% { opacity: 0.75; }
          100% { transform: translateX(-8%); opacity: 0.48; }
        }
        @keyframes shimmerDrift2 {
          0% { transform: translateX(0%); opacity: 0.38; }
          50% { opacity: 0.62; }
          100% { transform: translateX(-6%); opacity: 0.38; }
        }
        @keyframes shimmerDrift3 {
          0% { transform: translateX(0%); opacity: 0.24; }
          50% { opacity: 0.44; }
          100% { transform: translateX(-5%); opacity: 0.24; }
        }
      `}</style>
    </div>
  );
};

export default GlobalAtmosphere;
