# Zerra Studios Phase 1 Technical SEO Design

## Objective

Make Zerra Studios' important content available in the initial HTML response, return genuine HTTP 404 responses for unknown URLs, and address the repository-level metadata, security-header, rendering, and duplicate-video issues identified in the July 14 SEO audit.

This phase preserves the site's current public claims. It does not add testimonials or reviews, and it does not present Rapid Plumbing as completed client work.

## Selected Approach

Add a small static-site generation layer to the existing Vite, React, React Router, and Cloudflare Workers Static Assets stack.

The build will render each known route to an HTML file using React's server-rendering APIs and a static router. The browser will hydrate that HTML and retain the current client-side interactions and transitions. This avoids a framework migration and avoids adding a headless browser to the build.

## Application Architecture

Refactor the application into browser-neutral content and environment-specific entry points:

- A shared application shell will contain providers, route definitions, page layout, and route behavior.
- The browser entry will use `BrowserRouter` and hydrate prerendered markup.
- The build-time server entry will use `StaticRouter`, render the requested route, and collect route-specific Helmet metadata.
- Browser-only initialization will be guarded so server rendering cannot access `window`, `document`, media queries, or scrolling APIs.

The development experience will remain a normal Vite SPA. Static generation runs as part of the production build.

## Generated Routes

The build will generate HTML for:

- `/`
- `/privacy-policy`
- `/terms-of-service`
- `/our-work`
- `/our-work/barbershop-demo`
- `/our-work/landscaping-demo`
- `/our-work/tech-demo`
- `/demo-sites/rapidplumbing`
- `/demo-sites/rapidplumbing/services`
- `/demo-sites/rapidplumbing/reviews`
- `/demo-sites/rapidplumbing/service-areas`
- `/demo-sites/rapidplumbing/contact`

It will also generate a root `404.html` from the existing Not Found page.

## Cloudflare Routing and 404 Behavior

Change Workers Static Assets from `single-page-application` fallback behavior to:

- `not_found_handling: "404-page"`
- `html_handling: "auto-trailing-slash"`

Known routes will resolve to generated HTML assets with HTTP 200 responses. Unknown routes will resolve to `404.html` with HTTP 404 responses. Client-side navigation among known routes will continue to work after hydration.

The canonical homepage URL will use the trailing-slash form `https://zerrastudios.com/`. Other generated route URLs will use Cloudflare's consistent automatic HTML handling.

## Homepage Rendering

Remove the intersection-observer gate around the homepage's Our Work section. The section and its text will be present in the generated homepage HTML on every request. Its images will retain native lazy loading and asynchronous decoding.

The existing showcase content stays unchanged. Rapid Plumbing will not be added to Our Work, and the site will not add testimonials or reviews in this phase.

## Rapid Plumbing Preview Privacy

Rapid Plumbing is an unlisted preview for the business owner, not public portfolio work.

The preview will:

- remain accessible to anyone who has its direct URL;
- remain absent from public navigation and the XML sitemap;
- retain `noindex, nofollow, noarchive` in page metadata;
- retain `X-Robots-Tag: noindex, nofollow, noarchive` response headers for the base path and nested routes;
- be statically generated only so existing direct links continue to work after SPA fallback removal.

This phase does not add authentication or password protection.

## Metadata and Security Headers

Repository-level metadata changes:

- remove the obsolete meta keywords element;
- change the homepage canonical URL to `https://zerrastudios.com/`;
- change the homepage Open Graph URL to the same canonical URL;
- ensure prerendered route metadata is emitted into each generated document's initial head.

Add global static-asset response headers in `public/_headers`:

- `Strict-Transport-Security`;
- `X-Frame-Options`;
- `X-Content-Type-Options`;
- `Referrer-Policy`;
- `Permissions-Policy`.

A Content Security Policy is intentionally excluded from this phase because the site currently depends on external fonts, Calendly, form handling, and a remotely hosted video. It should be introduced only after those dependencies are enumerated and tested.

The existing Rapid Plumbing path-specific robot headers will remain in addition to the global headers.

## Desktop Atmosphere Video

Replace the two-video crossfade implementation with one muted, autoplaying, inline, looping video element. Preserve the current visual styling and mobile still-image behavior.

The video will remain on its existing remote host for this phase. Self-hosting is a separate performance and reliability improvement because it requires adding and deploying the media asset.

## External Tasks Excluded From This Code Phase

The following audit actions require account access or a separate owner decision and will not be changed by this implementation:

- enabling Always Use HTTPS in Cloudflare;
- connecting Google Search Console and submitting the sitemap;
- changing Cloudflare's live AI-crawler controls;
- adding testimonials, reviews, or unverifiable outcomes;
- password-protecting the Rapid Plumbing preview;
- self-hosting the desktop atmosphere video.

## Error Handling

- Static generation will fail the build if any configured route cannot render.
- The route list will be maintained in one shared module so routing and generated output cannot silently diverge.
- The generated 404 document will contain `noindex` metadata.
- Browser-only behavior will run after hydration and will not block static output.

## Testing and Verification

Implementation will follow test-driven development where behavior is testable before the production change.

Automated checks will verify:

- the built homepage HTML contains the hero and Our Work copy without executing JavaScript;
- all configured routes produce the expected HTML files;
- `404.html` exists and contains `noindex` metadata;
- the homepage canonical and Open Graph URLs use the trailing slash;
- meta keywords are absent;
- global security headers and Rapid Plumbing robot headers are present;
- the desktop atmosphere renders a single video element;
- the Rapid Plumbing routes remain absent from the XML sitemap.

Final verification will run the full test suite, lint, production build, and a local Wrangler preview. HTTP checks will confirm a known route returns 200, an unknown route returns 404, the homepage response contains meaningful body copy, and the Rapid Plumbing preview returns its robot-exclusion header.

## Success Criteria

Phase 1 is successful when:

1. A no-JavaScript fetch of the homepage contains its meaningful text and Our Work content.
2. Every supported direct route loads successfully from Cloudflare static assets.
3. An unknown URL returns HTTP 404 with the branded Not Found document.
4. Rapid Plumbing's direct links still work but remain unlisted and excluded from indexing.
5. The metadata, security headers, and single-video regression checks pass.
6. Tests, lint, and the production build complete without errors.

## References

- Cloudflare Workers: Static Site Generation and custom 404 pages — https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/
- Cloudflare Workers: Static asset custom headers — https://developers.cloudflare.com/workers/static-assets/headers/
- Vite: Server-Side Rendering — https://vite.dev/guide/ssr.html
