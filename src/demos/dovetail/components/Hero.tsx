import { useEffect, useRef, useState } from "react";
import { Link } from "@/demos/dovetail/navigation";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";

export function Hero() {
  const [allowVideo, setAllowVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const media = matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () =>
      setAllowVideo(
        media.matches &&
          !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
      );
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const el = video.current;
    if (!el || !allowVideo) return;
    void el.play().catch(() => setPlaying(false));
  }, [allowVideo]);
  return (
    <section className="hero" aria-label="DOVETAIL studio wardrobe" data-scroll-scene>
      <picture className="hero-media">
        <source media="(max-width: 767px)" srcSet="/demos/dovetail/media/sky-mobile.webp" />
        <img src="/demos/dovetail/media/sky.webp" alt="" width={1920} height={1080} {...{ fetchpriority: "high" }} />
      </picture>
      {allowVideo && (
        <video
          ref={video}
          className="hero-video"
          src="/demos/dovetail/media/sky.mp4"
          poster="/demos/dovetail/media/sky.webp"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setAllowVideo(false);
            setPlaying(false);
          }}
        />
      )}
      <div className="hero-veil" />
      <div className="hero-content">
        <p className="eyebrow" data-reveal="0">
          Everyday clothing / The studio wardrobe
        </p>
        <h1>
          <span data-reveal="1">DOVETAIL</span>
          <strong data-reveal="2">STUDIOS</strong>
        </h1>
        <p className="hero-copy" data-reveal="3">
          Relaxed shapes.
          <br />A wardrobe that works together.
        </p>
        <Link to="/" search={{}} hash="shop" className="button button-light sweep-button">
          <span>Explore the wardrobe</span>
          <span className="button-arrow" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>
      <div className="hero-bottom">
        <a href="#collections" className="hero-scroll">
          Nine pieces. Start with one. <ArrowDown size={16} />
        </a>
        {allowVideo && (
          <button
            className="icon-button motion-button"
            title={playing ? "Pause background motion" : "Play background motion"}
            aria-label={playing ? "Pause background motion" : "Play background motion"}
            onClick={() => {
              if (playing) video.current?.pause();
              else void video.current?.play().catch(() => setPlaying(false));
            }}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}
      </div>
    </section>
  );
}
