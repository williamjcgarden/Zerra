# Zerra Studios Phase 1 Technical SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate crawlable HTML for every supported Zerra Studios route, serve genuine 404 responses, and complete the approved metadata, security-header, homepage-rendering, and duplicate-video fixes.

**Architecture:** Keep the existing Vite/React application and split its browser router from a server-renderable application shell. A Vite SSR build will expose a React streaming renderer, and a small Node post-build script will render every known route into Cloudflare Static Asset HTML files before deployment.

**Tech Stack:** React 18.3, React Router 6.30, Vite 8, Vitest 3, react-helmet-async, Cloudflare Workers Static Assets, TypeScript, Node.js ESM.

## Global Constraints

- Preserve the existing showcase content; do not add Rapid Plumbing to Our Work.
- Do not add testimonials, reviews, fabricated outcomes, or new client claims.
- Rapid Plumbing remains an unlisted URL-only preview with no authentication.
- Keep every Rapid Plumbing route out of public navigation and `public/sitemap.xml`.
- Apply `noindex, nofollow, noarchive` to Rapid Plumbing in both HTML metadata and `X-Robots-Tag` response headers.
- Do not change Cloudflare dashboard AI-crawler controls, Always Use HTTPS, or Google Search Console.
- Keep the atmosphere video remotely hosted during this phase.
- Do not add a Content Security Policy during this phase.
- Use test-first red-green-refactor cycles for each behavior change.
- Do not modify or stage the existing untracked `output/` directory.

---

## File Structure

### Create

- `src/routes.tsx` — shared React Router route objects and exact prerender path manifest.
- `src/entry-server.tsx` — build-time static router and streaming React renderer.
- `src/ssg/document.ts` — pure HTML template composition function.
- `src/test/phase-one-quick-wins.test.tsx` — component and repository-level quick-win regressions.
- `src/test/routes.test.ts` — route-manifest and preview-privacy regressions.
- `src/test/entry-server.test.tsx` — Node-environment SSR output regressions.
- `src/test/document.test.ts` — generated-document composition regressions.
- `scripts/prerender.mjs` — production post-build route generator.
- `scripts/verify-seo-build.mjs` — built-output SEO and routing contract checks.
- `vite.ssg.config.ts` — isolated Vite server-renderer build.

### Modify

- `src/App.tsx` — export a router-neutral `AppShell` and consume shared route objects.
- `src/main.tsx` — hydrate prerendered HTML and retain `createRoot` for the empty dev shell.
- `src/pages/Index.tsx` — render Our Work eagerly and own complete homepage SEO metadata.
- `src/components/GlobalAtmosphere.tsx` — replace the two-video crossfade with one looping video.
- `index.html` — remove obsolete and duplicate static SEO tags; add static-generation insertion markers.
- `public/_headers` — add global security headers while preserving preview robot headers.
- `wrangler.jsonc` — use static 404 handling and consistent HTML routing.
- `package.json` — add client build, server build, prerender, and built-output verification commands.
- `.gitignore` — ignore the temporary `.ssg` server bundle.

---

### Task 1: Homepage SEO and Rendering Quick Wins

**Files:**
- Create: `src/test/phase-one-quick-wins.test.tsx`
- Modify: `src/pages/Index.tsx`
- Modify: `src/components/GlobalAtmosphere.tsx`
- Modify: `index.html`
- Modify: `public/_headers`
- Delete: `src/components/DeferredOurWorkSection.tsx`

**Interfaces:**
- Consumes: existing `Index`, `OurWorkSection`, and `GlobalAtmosphere` React components.
- Produces: an eagerly rendered homepage, complete homepage Helmet metadata, one desktop video element, and deployable static security-header rules.

- [ ] **Step 1: Write failing homepage and video tests**

Create `src/test/phase-one-quick-wins.test.tsx`:

```tsx
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

    expect(screen.getByText("Our Work")).toBeInTheDocument();
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
```

- [ ] **Step 2: Run the focused test and verify the intended failures**

Run:

```bash
npm test -- src/test/phase-one-quick-wins.test.tsx
```

Expected: FAIL because Our Work remains behind `IntersectionObserver`, two desktop videos render, meta keywords and bare-domain URLs remain, and global security headers are absent.

- [ ] **Step 3: Render Our Work eagerly and move homepage SEO metadata into Helmet**

In `src/pages/Index.tsx`, replace the deferred import and element with the direct component:

```tsx
import OurWorkSection from "@/components/OurWorkSection";
```

```tsx
<OurWorkSection />
```

Expand the existing homepage `<Helmet>` block to:

```tsx
<Helmet>
  <title>Zerra Studios — Web Design &amp; Marketing Agency</title>
  <meta
    name="description"
    content="Zerra Studios is an online marketing agency specializing in web design, web development, SEO, and conversion-focused websites. Built for businesses that want results."
  />
  <meta property="og:title" content="Zerra Studios — Web Design &amp; Marketing Agency" />
  <meta
    property="og:description"
    content="Zerra Studios is an online marketing agency specializing in web design, web development, SEO, and conversion-focused websites. Built for businesses that want results."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://zerrastudios.com/" />
  <meta property="og:image" content="https://zerrastudios.com/og-image.png" />
  <link rel="canonical" href="https://zerrastudios.com/" />
</Helmet>
```

Delete `src/components/DeferredOurWorkSection.tsx` after removing its only import.

- [ ] **Step 4: Replace the desktop crossfade pair with one looping video**

In `src/components/GlobalAtmosphere.tsx`, remove `useRef`, the crossfade state, the crossfade effect, `FADE_SECS`, and `baseVideoStyle`. Replace `VideoAtmosphere` with:

```tsx
const VideoAtmosphere = () => (
  <video
    className="absolute inset-0 h-full w-full object-cover"
    style={{
      mixBlendMode: "screen",
      filter: "sepia(55%) hue-rotate(15deg) brightness(1.5) saturate(1.15) contrast(1.05)",
      transform: "translateZ(0)",
      opacity: 0.38,
    }}
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
  >
    <source src={ATMOSPHERE_VIDEO} type="video/mp4" />
  </video>
);
```

Keep the mobile still-image component and media-query switching unchanged.

- [ ] **Step 5: Remove duplicate static SEO tags and add security headers**

In `index.html`, remove the static `<title>`, description, keywords, Open Graph tags, and canonical link. Preserve favicons, author metadata, font setup, and JSON-LD. Add this marker immediately before the closing `</head>` tag:

```html
<!--app-head-->
```

Replace `public/_headers` with:

```text
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/demo-sites/rapidplumbing
  X-Robots-Tag: noindex, nofollow, noarchive

/demo-sites/rapidplumbing/*
  X-Robots-Tag: noindex, nofollow, noarchive
```

- [ ] **Step 6: Run the focused test and full test suite**

Run:

```bash
npm test -- src/test/phase-one-quick-wins.test.tsx
npm test
```

Expected: the focused file passes all four tests and the full suite reports zero failures.

- [ ] **Step 7: Commit the quick wins**

```bash
git add src/test/phase-one-quick-wins.test.tsx src/pages/Index.tsx src/components/GlobalAtmosphere.tsx src/components/DeferredOurWorkSection.tsx index.html public/_headers
git commit -m "fix: apply phase 1 SEO quick wins"
```

---

### Task 2: Shared Route Manifest and Server-Render-Safe App Shell

**Files:**
- Create: `src/routes.tsx`
- Create: `src/test/routes.test.ts`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Produces: `APP_ROUTES: RouteObject[]`, `PUBLIC_PRERENDER_PATHS: readonly string[]`, `RAPID_PREVIEW_PATHS: readonly string[]`, `PRERENDER_PATHS: readonly string[]`, and `AppShell({ helmetContext? })`.
- Consumed by: Task 3 server renderer and Task 4 route generator.

- [ ] **Step 1: Write the failing route-manifest privacy test**

Create `src/test/routes.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  PRERENDER_PATHS,
  PUBLIC_PRERENDER_PATHS,
  RAPID_PREVIEW_PATHS,
} from "@/routes";

describe("static route manifest", () => {
  it("contains every supported public and unlisted preview route exactly once", () => {
    expect(PUBLIC_PRERENDER_PATHS).toEqual([
      "/",
      "/privacy-policy",
      "/terms-of-service",
      "/our-work",
      "/our-work/barbershop-demo",
      "/our-work/landscaping-demo",
      "/our-work/tech-demo",
    ]);
    expect(RAPID_PREVIEW_PATHS).toEqual([
      "/demo-sites/rapidplumbing",
      "/demo-sites/rapidplumbing/services",
      "/demo-sites/rapidplumbing/reviews",
      "/demo-sites/rapidplumbing/service-areas",
      "/demo-sites/rapidplumbing/contact",
    ]);
    expect(new Set(PRERENDER_PATHS).size).toBe(PRERENDER_PATHS.length);
  });

  it("keeps every Rapid Plumbing preview URL out of the sitemap", () => {
    const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
    for (const path of RAPID_PREVIEW_PATHS) {
      expect(sitemap).not.toContain(path);
    }
  });
});
```

- [ ] **Step 2: Run the route test and verify it fails because the module is absent**

Run:

```bash
npm test -- src/test/routes.test.ts
```

Expected: FAIL with an import-resolution error for `@/routes`.

- [ ] **Step 3: Create the shared route objects and path manifest**

Move the lazy page imports from `src/App.tsx` into `src/routes.tsx`, then export:

```tsx
import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Index = lazy(() => import("./pages/Index.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const OurWork = lazy(() => import("./pages/OurWork.tsx"));
const BarbershopDemo = lazy(() => import("./pages/demos/BarbershopDemo.tsx"));
const LandscapingDemo = lazy(() => import("./pages/demos/LandscapingDemo.tsx"));
const TechDemo = lazy(() => import("./pages/demos/TechDemo.tsx"));
const RapidPlumbingDemo = lazy(() => import("./pages/demos/RapidPlumbingDemo.tsx"));

export const PUBLIC_PRERENDER_PATHS = [
  "/",
  "/privacy-policy",
  "/terms-of-service",
  "/our-work",
  "/our-work/barbershop-demo",
  "/our-work/landscaping-demo",
  "/our-work/tech-demo",
] as const;

export const RAPID_PREVIEW_PATHS = [
  "/demo-sites/rapidplumbing",
  "/demo-sites/rapidplumbing/services",
  "/demo-sites/rapidplumbing/reviews",
  "/demo-sites/rapidplumbing/service-areas",
  "/demo-sites/rapidplumbing/contact",
] as const;

export const PRERENDER_PATHS = [
  ...PUBLIC_PRERENDER_PATHS,
  ...RAPID_PREVIEW_PATHS,
] as const;

export const APP_ROUTES: RouteObject[] = [
  { path: "/", element: <Index /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  { path: "/our-work", element: <OurWork /> },
  { path: "/our-work/barbershop-demo", element: <BarbershopDemo /> },
  { path: "/our-work/landscaping-demo", element: <LandscapingDemo /> },
  { path: "/our-work/tech-demo", element: <TechDemo /> },
  { path: "/demo-sites/rapidplumbing/*", element: <RapidPlumbingDemo /> },
  { path: "*", element: <NotFound /> },
];
```

- [ ] **Step 4: Export a router-neutral application shell**

In `src/App.tsx`, remove the lazy imports and `<Routes>` declarations, import `useRoutes` and `APP_ROUTES`, and replace the route body with:

```tsx
const AnimatedRoutes = () => {
  const location = useLocation();
  const routes = useRoutes(APP_ROUTES, location);

  return (
    <>
      <ScrollToRoute />
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="min-h-screen"
        >
          <Suspense fallback={<RouteFallback />}>{routes}</Suspense>
        </m.div>
      </AnimatePresence>
    </>
  );
};
```

Define and export the shell while keeping the default browser app:

```tsx
import type { HelmetServerState } from "react-helmet-async";

export type HelmetContext = { helmet?: HelmetServerState | null };

export const AppShell = ({ helmetContext }: { helmetContext?: HelmetContext }) => (
  <HelmetProvider context={helmetContext}>
    <LazyMotion features={domAnimation}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatedRoutes />
      </TooltipProvider>
    </LazyMotion>
  </HelmetProvider>
);

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);
```

Keep `ScrollToRoute` browser work inside its existing `useEffect`; effects do not execute during server rendering.

- [ ] **Step 5: Hydrate generated markup in production**

Replace `src/main.tsx` with:

```tsx
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;

if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
```

- [ ] **Step 6: Run tests and commit the shared routing boundary**

Run:

```bash
npm test -- src/test/routes.test.ts
npm test
```

Expected: all route tests and the full suite pass with zero failures.

Commit:

```bash
git add src/routes.tsx src/test/routes.test.ts src/App.tsx src/main.tsx
git commit -m "refactor: share routes with static renderer"
```

---

### Task 3: React Streaming Server Renderer

**Files:**
- Create: `src/entry-server.tsx`
- Create: `src/test/entry-server.test.tsx`

**Interfaces:**
- Consumes: `AppShell`, `HelmetContext`, and `PRERENDER_PATHS`.
- Produces: `render(url: string): Promise<RenderedPage>` where `RenderedPage` is `{ appHtml: string; headHtml: string }`; re-exports `PRERENDER_PATHS` for the Node generator.

- [ ] **Step 1: Write a failing Node-environment server-render test**

Create `src/test/entry-server.test.tsx`:

```tsx
// @vitest-environment node
import { describe, expect, it } from "vitest";
import { render } from "@/entry-server";

describe("static React renderer", () => {
  it("renders meaningful homepage and Our Work HTML", async () => {
    const page = await render("/");
    expect(page.appHtml).toContain("Websites that");
    expect(page.appHtml).toContain("Our Work");
    expect(page.appHtml).toContain("Websites tailored to");
    expect(page.headHtml).toContain("Zerra Studios");
    expect(page.headHtml).toContain("https://zerrastudios.com/");
  });

  it("renders preview robot directives into initial HTML", async () => {
    const page = await render("/demo-sites/rapidplumbing/services");
    expect(page.appHtml).toContain("Rapid Plumbing");
    expect(page.headHtml).toContain("noindex, nofollow, noarchive");
  });

  it("renders branded noindex content for an unknown route", async () => {
    const page = await render("/__static-404__");
    expect(page.appHtml).toContain("Page not found");
    expect(page.headHtml).toContain("noindex");
  });
});
```

- [ ] **Step 2: Run the server test and verify the missing-module failure**

Run:

```bash
npm test -- src/test/entry-server.test.tsx
```

Expected: FAIL because `src/entry-server.tsx` does not exist.

- [ ] **Step 3: Implement the streaming renderer**

Create `src/entry-server.tsx`:

```tsx
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell, type HelmetContext } from "./App";

export { PRERENDER_PATHS } from "./routes";

export type RenderedPage = {
  appHtml: string;
  headHtml: string;
};

const helmetToString = (context: HelmetContext) => {
  const helmet = context.helmet;
  if (!helmet) return "";

  return [
    helmet.title.toString(),
    helmet.priority.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.style.toString(),
    helmet.script.toString(),
    helmet.noscript.toString(),
  ].join("");
};

export const render = (url: string): Promise<RenderedPage> =>
  new Promise((resolve, reject) => {
    const helmetContext: HelmetContext = {};
    let firstError: unknown;
    let settled = false;

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppShell helmetContext={helmetContext} />
      </StaticRouter>,
      {
        onAllReady() {
          if (firstError) {
            settled = true;
            abort();
            reject(firstError);
            return;
          }

          const output = new PassThrough();
          let appHtml = "";
          output.setEncoding("utf8");
          output.on("data", (chunk: string) => {
            appHtml += chunk;
          });
          output.on("end", () => {
            if (settled) return;
            settled = true;
            resolve({ appHtml, headHtml: helmetToString(helmetContext) });
          });
          output.on("error", reject);
          pipe(output);
        },
        onShellError(error) {
          settled = true;
          reject(error);
        },
        onError(error) {
          firstError ??= error;
        },
      },
    );
  });
```

- [ ] **Step 4: Run the focused and full tests**

Run:

```bash
npm test -- src/test/entry-server.test.tsx
npm test
```

Expected: all three server-render cases pass and the full suite reports zero failures.

- [ ] **Step 5: Commit the server renderer**

```bash
git add src/entry-server.tsx src/test/entry-server.test.tsx
git commit -m "feat: add static React renderer"
```

---

### Task 4: Static HTML Generation Pipeline

**Files:**
- Create: `src/ssg/document.ts`
- Create: `src/test/document.test.ts`
- Create: `scripts/prerender.mjs`
- Create: `vite.ssg.config.ts`
- Modify: `src/entry-server.tsx`
- Modify: `index.html`
- Modify: `package.json`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `createDocument(template: string, appHtml: string, headHtml: string): string` and production HTML assets in `dist/`.
- Consumes: `render(url)` and `PRERENDER_PATHS` from the bundled server entry.

- [ ] **Step 1: Write the failing document-composition test**

Create `src/test/document.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { createDocument } from "@/ssg/document";

describe("static document composition", () => {
  it("injects rendered head and body content exactly once", () => {
    const template = "<html><head><!--app-head--></head><body><div id=\"root\"><!--app-html--></div></body></html>";
    const result = createDocument(template, "<main>Rendered</main>", "<title>SEO title</title>");

    expect(result).toContain("<title>SEO title</title>");
    expect(result).toContain('<div id="root"><main>Rendered</main></div>');
    expect(result).not.toContain("<!--app-head-->");
    expect(result).not.toContain("<!--app-html-->");
  });

  it("throws when either build marker is absent", () => {
    expect(() => createDocument("<html></html>", "body", "head")).toThrow(
      "Static HTML template markers are missing",
    );
  });
});
```

- [ ] **Step 2: Run the focused test and verify the missing-module failure**

Run:

```bash
npm test -- src/test/document.test.ts
```

Expected: FAIL because `src/ssg/document.ts` does not exist.

- [ ] **Step 3: Implement document composition and export it from the server bundle**

Create `src/ssg/document.ts`:

```ts
const HEAD_MARKER = "<!--app-head-->";
const HTML_MARKER = "<!--app-html-->";

export const createDocument = (
  template: string,
  appHtml: string,
  headHtml: string,
) => {
  if (!template.includes(HEAD_MARKER) || !template.includes(HTML_MARKER)) {
    throw new Error("Static HTML template markers are missing");
  }

  return template
    .replace(HEAD_MARKER, headHtml)
    .replace(HTML_MARKER, appHtml);
};
```

Add to `src/entry-server.tsx`:

```ts
export { createDocument } from "./ssg/document";
```

Change the root element in `index.html` to:

```html
<div id="root"><!--app-html--></div>
```

- [ ] **Step 4: Run the document test and verify it passes**

Run:

```bash
npm test -- src/test/document.test.ts
```

Expected: both document-composition cases pass.

- [ ] **Step 5: Create the isolated server-build configuration**

Create `vite.ssg.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: "src/entry-server.tsx",
    outDir: ".ssg",
    emptyOutDir: true,
    rollupOptions: {
      output: { format: "es" },
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
});
```

- [ ] **Step 6: Create the route generator**

Create `scripts/prerender.mjs`:

```js
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = resolve(root, "dist");
const serverEntry = pathToFileURL(resolve(root, ".ssg/entry-server.js")).href;
const { createDocument, PRERENDER_PATHS, render } = await import(serverEntry);
const template = await readFile(resolve(dist, "index.html"), "utf8");

const outputFileFor = (route) =>
  route === "/"
    ? resolve(dist, "index.html")
    : resolve(dist, `${route.slice(1)}.html`);

const writeRoute = async (route, outputFile = outputFileFor(route)) => {
  const { appHtml, headHtml } = await render(route);
  const document = createDocument(template, appHtml, headHtml);
  await mkdir(dirname(outputFile), { recursive: true });
  await writeFile(outputFile, document, "utf8");
};

for (const route of PRERENDER_PATHS) {
  await writeRoute(route);
}

await writeRoute("/__static-404__", resolve(dist, "404.html"));
```

- [ ] **Step 7: Wire the production build commands and temporary output ignore**

In `package.json`, replace the build script and add the supporting scripts:

```json
"build": "npm run build:client && npm run build:ssg && npm run prerender",
"build:client": "vite build",
"build:ssg": "vite build --config vite.ssg.config.ts",
"prerender": "node scripts/prerender.mjs"
```

Add to `.gitignore`:

```text
.ssg
```

- [ ] **Step 8: Build and inspect the static output**

Run:

```bash
npm run build
rg -n "Websites that|Our Work|Websites tailored to" dist/index.html
rg -n "noindex, nofollow, noarchive" dist/demo-sites/rapidplumbing/services.html
rg -n "Page not found|noindex" dist/404.html
find dist -path '*.html' -type f | sort
```

Expected: build exits 0; homepage copy appears in `dist/index.html`; preview robot metadata appears in its route file; `404.html` contains the branded error and `noindex`; every manifest route has a corresponding HTML file.

- [ ] **Step 9: Run tests and commit the generation pipeline**

Run:

```bash
npm test
```

Expected: zero test failures.

Commit:

```bash
git add src/ssg/document.ts src/test/document.test.ts scripts/prerender.mjs vite.ssg.config.ts src/entry-server.tsx index.html package.json package-lock.json .gitignore
git commit -m "feat: prerender supported routes"
```

---

### Task 5: Cloudflare 404 Routing and Built-Output Verification

**Files:**
- Create: `scripts/verify-seo-build.mjs`
- Modify: `wrangler.jsonc`
- Modify: `package.json`

**Interfaces:**
- Consumes: generated `dist/` route files, `public/_headers`, `public/sitemap.xml`, and `wrangler.jsonc`.
- Produces: `npm run verify:seo` as the repeatable Phase 1 deployment contract.

- [ ] **Step 1: Write the built-output verification script before changing Cloudflare routing**

Create `scripts/verify-seo-build.mjs`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const read = (path) => readFile(resolve(path), "utf8");
const home = await read("dist/index.html");
const notFound = await read("dist/404.html");
const headers = await read("dist/_headers");
const sitemap = await read("dist/sitemap.xml");
const wrangler = await read("wrangler.jsonc");

assert.match(home, /Websites that/);
assert.match(home, /Our Work/);
assert.match(home, /Websites tailored to/);
assert.match(home, /https:\/\/zerrastudios\.com\//);
assert.doesNotMatch(home, /name="keywords"/);
assert.match(notFound, /Page not found/i);
assert.match(notFound, /noindex/);
assert.match(headers, /Strict-Transport-Security:/);
assert.match(headers, /X-Robots-Tag: noindex, nofollow, noarchive/);
assert.doesNotMatch(sitemap, /demo-sites\/rapidplumbing/);
assert.match(wrangler, /"not_found_handling": "404-page"/);
assert.match(wrangler, /"html_handling": "auto-trailing-slash"/);

const generatedRoutes = [
  "dist/privacy-policy.html",
  "dist/terms-of-service.html",
  "dist/our-work.html",
  "dist/our-work/barbershop-demo.html",
  "dist/our-work/landscaping-demo.html",
  "dist/our-work/tech-demo.html",
  "dist/demo-sites/rapidplumbing.html",
  "dist/demo-sites/rapidplumbing/services.html",
  "dist/demo-sites/rapidplumbing/reviews.html",
  "dist/demo-sites/rapidplumbing/service-areas.html",
  "dist/demo-sites/rapidplumbing/contact.html",
];

for (const routeFile of generatedRoutes) {
  assert.ok((await read(routeFile)).includes('<div id="root">'), routeFile);
}

console.log("Phase 1 SEO build contract verified.");
```

- [ ] **Step 2: Add the verification command and confirm it fails on SPA routing**

Add to `package.json`:

```json
"verify:seo": "node scripts/verify-seo-build.mjs"
```

Run:

```bash
npm run verify:seo
```

Expected: FAIL on the Wrangler assertion because `not_found_handling` is still `single-page-application`.

- [ ] **Step 3: Enable Cloudflare static 404 handling**

Change the `assets` block in `wrangler.jsonc` to:

```jsonc
"assets": {
  "not_found_handling": "404-page",
  "html_handling": "auto-trailing-slash"
}
```

- [ ] **Step 4: Run the complete automated verification gate**

Run:

```bash
npm test
npm run lint
npm run build
npm run verify:seo
```

Expected: tests report zero failures, ESLint exits 0, the production build exits 0, and verification prints `Phase 1 SEO build contract verified.`

- [ ] **Step 5: Verify HTTP behavior in a local Workers preview**

Start the preview in one terminal:

```bash
npx wrangler dev --ip 127.0.0.1 --port 8787
```

From another terminal, run:

```bash
curl -sS -o /tmp/zerra-home.html -w '%{http_code}\n' http://127.0.0.1:8787/
curl -sS -o /tmp/zerra-privacy.html -w '%{http_code}\n' http://127.0.0.1:8787/privacy-policy
curl -sS -o /tmp/zerra-missing.html -w '%{http_code}\n' http://127.0.0.1:8787/definitely-missing
curl -sSI http://127.0.0.1:8787/demo-sites/rapidplumbing/services | rg -i 'HTTP/|x-robots-tag'
rg -n "Websites that|Our Work|Websites tailored to" /tmp/zerra-home.html
```

Expected: homepage and privacy return `200`; the missing URL returns `404`; the preview response includes `X-Robots-Tag: noindex, nofollow, noarchive`; the fetched homepage contains all three content matches.

- [ ] **Step 6: Review the final diff and commit Cloudflare routing**

Run:

```bash
git diff --check
git status --short
git diff --stat
```

Expected: no whitespace errors; only Phase 1 implementation files are changed; `output/` remains untracked and unstaged.

Commit:

```bash
git add scripts/verify-seo-build.mjs wrangler.jsonc package.json package-lock.json
git commit -m "fix: serve real 404 responses"
```

---

## Final Completion Checklist

- [ ] Re-run `npm test` and confirm zero failures.
- [ ] Re-run `npm run lint` and confirm exit code 0.
- [ ] Re-run `npm run build` and confirm exit code 0.
- [ ] Re-run `npm run verify:seo` and confirm the success message.
- [ ] Re-run local HTTP checks for homepage 200, known-route 200, unknown-route 404, and Rapid Plumbing `X-Robots-Tag`.
- [ ] Confirm `git status --short` contains no unintended files and leaves `output/` untouched.
- [ ] Compare the final diff against every success criterion in `docs/superpowers/specs/2026-07-15-phase-1-technical-seo-design.md`.
