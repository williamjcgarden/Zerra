import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import GlobalAtmosphere from "@/components/GlobalAtmosphere";
import Index from "@/pages/Index";

beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Phase 1 homepage SEO quick wins", () => {
  it("renders Our Work without waiting for an intersection observer", () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getAllByText("Our Work").length).toBeGreaterThan(0);
    expect(screen.getByText(/Websites tailored to/i)).toBeInTheDocument();
    expect(container.querySelector('nav a[href="/our-work"]')).toBeInTheDocument();
    expect(container.querySelectorAll('#our-work a[href^="/our-work/"]')).toHaveLength(4);
    expect(screen.getByText("E-commerce")).toBeInTheDocument();
    expect(screen.getByText("Software")).toBeInTheDocument();
  });

  it("keeps the intentional two-video seamless crossfade", () => {
    const { container } = render(<GlobalAtmosphere />);
    const videos = container.querySelectorAll("video");
    expect(videos).toHaveLength(2);
    expect(videos[0]).toHaveAttribute("autoplay");
    expect(videos[0].querySelector("source")?.getAttribute("src")).toBe(
      videos[1].querySelector("source")?.getAttribute("src"),
    );
  });

  it("defers atmosphere selection until after hydration", () => {
    const html = renderToString(<GlobalAtmosphere />);
    expect(html).not.toContain("orb-video-still.webp");
    expect(html).not.toContain("hf_20260421_074215");
  });

  it("removes static keyword and non-canonical homepage URLs", () => {
    const html = readFileSync(resolve("index.html"), "utf8");
    expect(html).not.toContain('name="keywords"');
    expect(html).not.toContain('href="https://zerrastudios.com"');
    expect(html).not.toContain('content="https://zerrastudios.com"');
  });

  it("defines global security headers without retired preview rules", () => {
    const headers = readFileSync(resolve("public/_headers"), "utf8");
    expect(headers).toContain("Strict-Transport-Security:");
    expect(headers).toContain("X-Frame-Options: SAMEORIGIN");
    expect(headers).toContain("X-Content-Type-Options: nosniff");
    expect(headers).toContain("Referrer-Policy: strict-origin-when-cross-origin");
    expect(headers).toContain("Permissions-Policy:");
    expect(headers).not.toContain("rapidplumbing");
  });
});
