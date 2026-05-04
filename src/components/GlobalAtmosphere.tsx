import { useEffect, useRef, useState } from "react";

const ATMOSPHERE_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_074215_f4339e1c-0b1a-4f60-98b2-90e3d7840cb7.mp4";

const FADE_SECS = 1.2;

const baseVideoStyle: React.CSSProperties = {
  mixBlendMode: "screen",
  filter: "sepia(55%) hue-rotate(15deg) brightness(1.5) saturate(1.15) contrast(1.05)",
  transform: "translateZ(0)",
  transition: `opacity ${FADE_SECS}s ease-in-out`,
};

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
        style={{ ...baseVideoStyle, opacity: showing === "a" ? 0.38 : 0 }}
        autoPlay muted playsInline preload="metadata"
      >
        <source src={ATMOSPHERE_VIDEO} type="video/mp4" />
      </video>
      <video
        ref={refB}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ ...baseVideoStyle, opacity: showing === "b" ? 0.38 : 0 }}
        muted playsInline preload="metadata"
      >
        <source src={ATMOSPHERE_VIDEO} type="video/mp4" />
      </video>
    </>
  );
};

const GlobalAtmosphere = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <VideoAtmosphere />
  </div>
);

export default GlobalAtmosphere;
