import { useState, useCallback } from "react";

const ScanOverlay = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [scanning, setScanning] = useState(false);

  const handleEnter = useCallback(() => setScanning(true), []);
  const handleLeave = useCallback(() => setScanning(false), []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      {scanning && (
        <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-120%",
              width: "72%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.02) 28%, hsl(0 0% 100% / 0.045) 44%, hsl(0 0% 100% / 0.07) 50%, hsl(0 0% 100% / 0.045) 56%, hsl(0 0% 100% / 0.02) 72%, transparent 100%)",
              transform: "skewX(-18deg)",
              willChange: "transform",
              animation: "cardScanSlide 4.5s linear infinite",
            }}
          />
        </div>
      )}
      <style>{`
        @keyframes cardScanSlide {
          from { transform: translateX(0%) skewX(-18deg); }
          to { transform: translateX(340%) skewX(-18deg); }
        }
      `}</style>
    </div>
  );
};

export default ScanOverlay;
