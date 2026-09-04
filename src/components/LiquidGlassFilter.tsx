const LiquidGlassFilter = () => (
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    focusable="false"
  >
    <defs>
      <filter
        id="zerra-liquid-glass-refraction"
        x="-15%"
        y="-15%"
        width="130%"
        height="130%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.026"
          numOctaves="2"
          seed="7"
          result="glassNoise"
        />
        <feGaussianBlur in="glassNoise" stdDeviation="0.7" result="softGlassNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softGlassNoise"
          scale="36"
          xChannelSelector="R"
          yChannelSelector="B"
        />
      </filter>
    </defs>
  </svg>
);

export default LiquidGlassFilter;
