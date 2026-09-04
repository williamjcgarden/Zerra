import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import LiquidGlassFilter from "@/components/LiquidGlassFilter";
import ProcessSection from "@/components/ProcessSection";
import WhyZerraSection from "@/components/WhyZerraSection";

afterEach(cleanup);

describe("liquid glass cards", () => {
  it("defines one reusable refraction filter", () => {
    const { container } = render(<LiquidGlassFilter />);
    const filter = container.querySelector("#zerra-liquid-glass-refraction");

    expect(filter).toBeInTheDocument();
    expect(filter?.querySelector("feTurbulence")).toBeInTheDocument();
    expect(filter?.querySelector("feDisplacementMap")).toHaveAttribute("scale", "36");
  });

  it("scopes glass to the nine approved cards", () => {
    const { container } = render(
      <>
        <WhyZerraSection />
        <ProcessSection />
      </>,
    );

    expect(container.querySelectorAll("#why-zerra .liquid-glass-card")).toHaveLength(5);
    expect(container.querySelectorAll("#process .liquid-glass-card")).toHaveLength(4);
  });
});
