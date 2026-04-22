import { motion, useScroll, useTransform } from "framer-motion";

const GlobalAtmosphere = () => {
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* === MOVING abstract streaks with shimmer animation === */}
      {/* Layer 1 — wide organic sweep */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y1, height: "250%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.25,
            background: `
              linear-gradient(118deg, transparent 0%, transparent 20%, rgba(255,255,255,0.02) 21.8%, rgba(255,255,255,0.18) 22.5%, rgba(255,255,255,0.02) 23.2%, transparent 25%, transparent 44%, rgba(255,255,255,0.01) 45.3%, rgba(255,255,255,0.14) 45.7%, rgba(255,255,255,0.01) 46.1%, transparent 47%, transparent 68%, rgba(255,255,255,0.02) 69.3%, rgba(255,255,255,0.16) 69.7%, rgba(255,255,255,0.02) 70.1%, transparent 71%, transparent 100%)
            `,
            animation: "shimmerDrift 25s ease-in-out infinite alternate",
          }}
        />
      </motion.div>

      {/* Layer 2 — thinner crossing wisps */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y2, height: "250%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.18,
            background: `
              linear-gradient(62deg, transparent 0%, transparent 15%, rgba(255,255,255,0.01) 16.8%, rgba(255,255,255,0.12) 17.2%, rgba(255,255,255,0.01) 17.6%, transparent 19%, transparent 40%, rgba(255,255,255,0.01) 41.3%, rgba(255,255,255,0.15) 41.7%, rgba(255,255,255,0.01) 42.1%, transparent 43%, transparent 60%, rgba(255,255,255,0.01) 62.3%, rgba(255,255,255,0.1) 62.7%, rgba(255,255,255,0.01) 63.1%, transparent 64%, transparent 82%, rgba(255,255,255,0.02) 83.3%, rgba(255,255,255,0.16) 83.7%, rgba(255,255,255,0.02) 84.1%, transparent 85%, transparent 100%)
            `,
            animation: "shimmerDrift2 30s ease-in-out infinite alternate",
          }}
        />
      </motion.div>

      {/* Layer 3 — faint broad glow bands */}
      <motion.div
        className="absolute inset-0"
        style={{ y: y1, height: "200%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.12,
            background: `
              linear-gradient(135deg, transparent 0%, transparent 30%, rgba(255,255,255,0.01) 34.5%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.01) 35.5%, transparent 37%, transparent 70%, rgba(255,255,255,0.01) 74.5%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.01) 75.5%, transparent 77%, transparent 100%)
            `,
            animation: "shimmerDrift3 35s ease-in-out infinite alternate",
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <motion.div className="absolute inset-0" style={{ y: y3, height: "300%" }}>
        {[
          { top: "5%", left: "10%", size: 2, opacity: 0.18 },
          { top: "12%", left: "75%", size: 1.5, opacity: 0.14 },
          { top: "22%", left: "40%", size: 1, opacity: 0.1 },
          { top: "30%", left: "90%", size: 2, opacity: 0.16 },
          { top: "38%", left: "15%", size: 1.5, opacity: 0.12 },
          { top: "45%", left: "60%", size: 2.5, opacity: 0.18 },
          { top: "55%", left: "30%", size: 1, opacity: 0.1 },
          { top: "62%", left: "80%", size: 2, opacity: 0.15 },
          { top: "70%", left: "50%", size: 1.5, opacity: 0.13 },
          { top: "78%", left: "20%", size: 1, opacity: 0.09 },
          { top: "85%", left: "70%", size: 2, opacity: 0.17 },
          { top: "92%", left: "45%", size: 1.5, opacity: 0.12 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              opacity: dot.opacity,
            }}
          />
        ))}
      </motion.div>

      {/* Inline keyframes for shimmer animations */}
      <style>{`
        @keyframes shimmerDrift {
          0% { transform: translateX(0%) skewX(-0.5deg); opacity: 0.2; }
          50% { opacity: 0.35; }
          100% { transform: translateX(-8%) skewX(0.5deg); opacity: 0.2; }
        }
        @keyframes shimmerDrift2 {
          0% { transform: translateX(0%) skewX(0.3deg); opacity: 0.15; }
          50% { opacity: 0.25; }
          100% { transform: translateX(-6%) skewX(-0.3deg); opacity: 0.15; }
        }
        @keyframes shimmerDrift3 {
          0% { transform: translateX(0%) rotate(-0.3deg); opacity: 0.08; }
          50% { opacity: 0.16; }
          100% { transform: translateX(-5%) rotate(0.3deg); opacity: 0.08; }
        }
      `}</style>
    </div>
  );
};

export default GlobalAtmosphere;
