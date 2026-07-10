import { useEffect, useRef, useState } from "react";

const ATMOSPHERE_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_074215_f4339e1c-0b1a-4f60-98b2-90e3d7840cb7.mp4";
const MOBILE_ATMOSPHERE_IMAGE = "/images/orb-video-still.webp";

const FADE_SECS = 1.2;
const MOBILE_MEDIA_QUERY = "(max-width: 767px)";
const MOBILE_SCROLL_FACTOR = 0.08;
const MOBILE_MAX_OFFSET = 120;

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
      vA.pause();
      vB.pause();
    };
  }, []);

  return (
    <>
      <video
        ref={refA}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ ...baseVideoStyle, opacity: showing === "a" ? 0.38 : 0 }}
        autoPlay
        muted
        playsInline
        preload="metadata"
      >
        <source src={ATMOSPHERE_VIDEO} type="video/mp4" />
      </video>
      <video
        ref={refB}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ ...baseVideoStyle, opacity: showing === "b" ? 0.38 : 0 }}
        muted
        playsInline
        preload="metadata"
      >
        <source src={ATMOSPHERE_VIDEO} type="video/mp4" />
      </video>
    </>
  );
};

const MobileImageAtmosphere = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const updateOffset = () => {
      frame = 0;
      const offset = Math.min(window.scrollY * MOBILE_SCROLL_FACTOR, MOBILE_MAX_OFFSET);
      image.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateOffset);
    };

    updateOffset();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="absolute left-1/2 top-[-16dvh] h-[132dvh] w-[145vw] -translate-x-1/2 overflow-hidden">
      <div
        ref={imageRef}
        className="h-full w-full bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${MOBILE_ATMOSPHERE_IMAGE})`,
          mixBlendMode: "screen",
          filter: "sepia(55%) hue-rotate(15deg) brightness(1.5) saturate(1.15) contrast(1.05)",
          opacity: 0.38,
        }}
      />
    </div>
  );
};

const GlobalAtmosphere = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(MOBILE_MEDIA_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const updateBackground = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", updateBackground);
    return () => mediaQuery.removeEventListener("change", updateBackground);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {isMobile ? <MobileImageAtmosphere /> : <VideoAtmosphere />}
    </div>
  );
};

export default GlobalAtmosphere;
