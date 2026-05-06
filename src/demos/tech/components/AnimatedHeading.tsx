import { useEffect, useState, CSSProperties } from "react";

interface Props {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  charDelay?: number;
}

export function AnimatedHeading({ text, className, style, delay = 0, charDelay = 30 }: Props) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const lines = text.split("\n");

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex}>
          {Array.from(line).map((ch, charIndex) => {
            const transitionDelay =
              lineIndex * line.length * charDelay + charIndex * charDelay;
            return (
              <span
                key={charIndex}
                className="inline-block transition-all duration-500"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateX(0)" : "translateX(-18px)",
                  transitionDelay: `${transitionDelay}ms`,
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            );
          })}
        </div>
      ))}
    </h1>
  );
}
