import { useEffect, useRef } from "react";

export function useEditorialMotion() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanUp = () => {};
    const sync = () => {
      cleanUp();
      if (reduced.matches) return;
      root.dataset["motion"] = "on";
      const scenes = [...root.querySelectorAll<HTMLElement>("[data-scroll-scene]")];
      const activeScenes = new Set<HTMLElement>();
      const animations = new Map<HTMLElement, Animation>();
      let frame = 0;
      const draw = () => {
        frame = 0;
        // Read all geometry before writing transform-only custom properties.
        const positions = [...activeScenes].map((scene) => {
          const bounds = scene.getBoundingClientRect();
          const progress = (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height);
          return { scene, value: Math.max(-1, Math.min(1, progress * 2 - 1)) };
        });
        positions.forEach(({ scene, value }) =>
          scene.style.setProperty("--scene-progress", value.toFixed(4)),
        );
      };
      const schedule = () => {
        if (!frame && activeScenes.size) frame = window.requestAnimationFrame(draw);
      };
      const sceneObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (isIntersecting) activeScenes.add(target as HTMLElement);
            else activeScenes.delete(target as HTMLElement);
          });
          schedule();
        },
        { rootMargin: "120px" },
      );
      scenes.forEach((scene) => sceneObserver.observe(scene));
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            const element = target as HTMLElement;
            revealObserver.unobserve(element);
            if (element.contains(document.activeElement)) return;
            const animation = element.animate(
              [
                { opacity: 0, transform: "translate3d(0, 38px, 0)", clipPath: "inset(0 0 12% 0)" },
                { opacity: 1, transform: "translate3d(0, 0, 0)", clipPath: "inset(0 0 0 0)" },
              ],
              {
                duration: 760,
                delay: Number(element.dataset["reveal"] || 0) * 90,
                easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                fill: "backwards",
              },
            );
            animations.set(element, animation);
            animation.onfinish = () => animations.delete(element);
          });
        },
        { threshold: 0.12 },
      );
      root
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => revealObserver.observe(element));
      // Animate translation separately so the existing rotation/parallax stays intact.
      const dropObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            if (!isIntersecting) return;
            dropObserver.unobserve(target);
            target.setAttribute("data-dropped", "");
            target.querySelectorAll<HTMLElement>("[data-drop-item]").forEach((element, index) => {
              const animation = element.animate(
                [
                  { opacity: 0, translate: "0 -80px" },
                  { opacity: 1, translate: "0 0" },
                ],
                {
                  duration: 720,
                  delay: index * 300,
                  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                  fill: "backwards",
                },
              );
              animations.set(element, animation);
              animation.onfinish = () => animations.delete(element);
            });
          });
        },
        { threshold: 0.3 },
      );
      root
        .querySelectorAll<HTMLElement>("[data-drop-group]")
        .forEach((group) => dropObserver.observe(group));
      const onFocus = (event: FocusEvent) => {
        animations.forEach((animation, element) => {
          if (event.target instanceof Node && element.contains(event.target)) animation.finish();
        });
      };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      root.addEventListener("focusin", onFocus);
      cleanUp = () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        root.removeEventListener("focusin", onFocus);
        sceneObserver.disconnect();
        revealObserver.disconnect();
        dropObserver.disconnect();
        root
          .querySelectorAll("[data-drop-group]")
          .forEach((group) => group.removeAttribute("data-dropped"));
        animations.forEach((animation) => animation.cancel());
        scenes.forEach((scene) => scene.style.removeProperty("--scene-progress"));
        delete root.dataset["motion"];
      };
    };
    sync();
    reduced.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      cleanUp();
    };
  }, []);
  return ref;
}
