import { useEffect, useRef, useState } from "react";

const ATMOSPHERE_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_074215_f4339e1c-0b1a-4f60-98b2-90e3d7840cb7.mp4";

const FADE_SECS = 1.5;

const baseVideoStyle: React.CSSProperties = {
  mixBlendMode: "screen",
  filter: "grayscale(100%) sepia(80%) brightness(1.1)",
  transition: `opacity ${FADE_SECS}s ease-in-out`,
};

// Desktop-only video atmosphere — crossfading pair for seamless loop
const VideoAtmosphere = () => {
  const refA = useRef<HTMLVideoElement>(null);
  const refB = useRef<HTMLVideoElement>(null);
  const [showing, setShowing] = useState<"a" | "b">("a");
  const crossfading = useRef(false);

  useEffect(() => {
    const vA = refA.current!;
    const vB = refB.current!;

    vA.play().catch(() => {});

    const tryFade = (from: HTMLVideoElement, to: HTMLVideoElement, next: "a" | "b") => {
      if (crossfading.current) return;
      if (!from.duration || from.duration - from.currentTime > FADE_SECS) return;

      crossfading.current = true;
      to.currentTime = 0;
      to.play().catch(() => {});
      setShowing(next);

      setTimeout(() => {
        from.pause();
        from.currentTime = 0;
        crossfading.current = false;
      }, FADE_SECS * 1000);
    };

    const onAUpdate = () => tryFade(vA, vB, "b");
    const onBUpdate = () => tryFade(vB, vA, "a");

    vA.addEventListener("timeupdate", onAUpdate);
    vB.addEventListener("timeupdate", onBUpdate);
    return () => {
      vA.removeEventListener("timeupdate", onAUpdate);
      vB.removeEventListener("timeupdate", onBUpdate);
    };
  }, []);

  return (
    <>
      <video
        ref={refA}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ ...baseVideoStyle, opacity: showing === "a" ? 0.28 : 0 }}
        muted playsInline preload="none"
      >
        <source src={ATMOSPHERE_VIDEO} type="video/mp4" />
      </video>
      <video
        ref={refB}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ ...baseVideoStyle, opacity: showing === "b" ? 0.28 : 0 }}
        muted playsInline preload="none"
      >
        <source src={ATMOSPHERE_VIDEO} type="video/mp4" />
      </video>
    </>
  );
};

// Mobile/tablet fallback — pure CSS, zero network cost
const CSSAtmosphere = () => (
  <>
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 80% 30%, rgba(223,176,58,0.10) 0%, transparent 55%), " +
          "radial-gradient(ellipse at 20% 70%, rgba(223,176,58,0.07) 0%, transparent 50%)",
      }}
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(200,190,160,0.04) 0%, transparent 70%)",
      }}
    />
  </>
);

const GlobalAtmosphere = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {isDesktop ? <VideoAtmosphere /> : <CSSAtmosphere />}

      {/* Center gold wash — all devices */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(223,176,58,0.06) 0%, transparent 65%)",
        }}
      />
    </div>
  );
};

export default GlobalAtmosphere;
