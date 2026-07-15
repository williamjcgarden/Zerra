import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import GlobalAtmosphere from "@/components/GlobalAtmosphere";
import Index from "@/pages/Index";

afterEach(cleanup);

describe("Phase 1 homepage SEO quick wins", () => {
  it("renders Our Work without waiting for an intersection observer", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getAllByText("Our Work").length).toBeGreaterThan(0);
    expect(screen.getByText(/Websites tailored to/i)).toBeInTheDocument();
  });

  it("renders one desktop atmosphere video", () => {
    const { container } = render(<GlobalAtmosphere />);
    expect(container.querySelectorAll("video")).toHaveLength(1);
    expect(container.querySelector("video")).toHaveAttribute("loop");
  });

  it("removes static keyword and non-canonical homepage URLs", () => {
    const html = readFileSync(resolve("index.html"), "utf8");
    expect(html).not.toContain('name="keywords"');
    expect(html).not.toContain('href="https://zerrastudios.com"');
    expect(html).not.toContain('content="https://zerrastudios.com"');
  });

  it("defines global security headers and private-preview robot headers", () => {
    const headers = readFileSync(resolve("public/_headers"), "utf8");
    expect(headers).toContain("Strict-Transport-Security:");
    expect(headers).toContain("X-Frame-Options: SAMEORIGIN");
    expect(headers).toContain("X-Content-Type-Options: nosniff");
    expect(headers).toContain("Referrer-Policy: strict-origin-when-cross-origin");
    expect(headers).toContain("Permissions-Policy:");
    expect(headers).toContain("/demo-sites/rapidplumbing/*");
    expect(headers).toContain("X-Robots-Tag: noindex, nofollow, noarchive");
  });
});
