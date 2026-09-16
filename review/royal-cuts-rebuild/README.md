# Royal Cuts — Zerra demo source

A complete fictional barbershop website by Zerra Studios. Red/porcelain/chrome art direction, original concept photography, a custom rotating Three.js barber pole, a layered first-load hero entrance, editorial motion, a stable studio showcase, four services, a ten-cut sliding gallery with haircut lightboxes, fictional barber profiles and an in-memory booking demonstration.

This folder owns the editable Royal Cuts source. The approved rebuild is now integrated into the local Zerra site as a self-contained static export at `/demos/royal-cuts/`; the original `/our-work/barbershop-demo` route forwards there. The shared showcase card keeps its existing hover effects and uses a fresh homepage capture. The generated export ships with the main Zerra build.

## Local preview

From this folder:

```sh
npm install
npm run build
npm run preview -- --port 4189
```

Open **http://127.0.0.1:4189/**. Development mode is `npm run dev -- --port 4188`. Both bind to loopback.

## Verification

```sh
npm run typecheck
npm run build
npm test
node scripts/performance.cjs
```

The tests use installed Google Chrome in visible mode and expect the production preview at port 4189. Set `PREVIEW_URL` to override. No real booking or external enquiry is submitted. Results and screenshots are in `evidence/`; the final review is `REVIEW.md`.

## Files

- `src/App.tsx`: site sections, navigation and entry actions.
- `src/data.ts`: all illustrative services, prices, people, FAQs and rolling example dates.
- `src/components/Booking.tsx`: service/barber/time/review/demo-completion flow.
- `src/components/CutsCarousel.tsx`: ten haircut styles, continuous leftward glide, seamless looping, responsive visible-card count and pause/play controls and native horizontal browsing with motion disabled.
- `src/components/HeroCarousel.tsx`: five-photo hero carousel, automatic 2.5-second rotation and global pause/reduced-motion support.
- `src/components/BarberPole.tsx`: original 3D scene with dynamic imports, offscreen pause, reduced-motion/mobile poster and WebGL fallback.
- `src/components/Lightbox.tsx`: enlarged haircut view and general appointment action.
- `src/components/trapFocus.ts`: shared modal keyboard boundaries.
- `src/styles.css`, `src/fonts.css`: isolated visual system and self-hosted fonts.
- `public/assets/`: project-owned generated image copies, code-native favicon and font licence files.
- `tests/journeys.spec.ts`: browser journeys, responsive checks, accessibility and 3D behavior.
- `ASSET-SOURCES.md`: image-generation prompts, original file locations, font sources and internal design references.

## Demo boundaries

All people, business imagery, services, prices, hours and appointment times are illustrative. There is no account, data submission, booking backend, payment or analytics integration. Final completion explicitly says no appointment has been booked. Zerra return and enquiry links point to the real established site destinations.

Mobile and reduced-motion users receive the CSS pole poster. Desktop loads the optional 3D engine separately. The build reports a size warning for that optional Three.js chunk; it is not included in the initial mobile experience. The integrated export preserves that distinction.

## Refresh the local Zerra integration

From the repository root:

```sh
npm ci --prefix review/royal-cuts-rebuild
npm run build:royal-cuts
npm run build
npx wrangler dev --config dist/wrangler.json --local --port 8090 --persist-to /tmp/zerra-royal-cuts-state
```

`build:royal-cuts` typechecks and builds this source with the `/demos/royal-cuts/` asset base, then replaces only the generated `public/demos/royal-cuts` export. It does not change the standalone preview build. The normal Zerra build copies that export unchanged, so it does not add Three.js or the demo styles to Zerra's app bundle. Run the export command again after changing this source or its assets; do not hand-edit the generated files. Keep this source, its lockfile, the export script and generated public directory together when committing the integration.

Review http://127.0.0.1:8090/our-work. Integrated return and enquiry links stay on the same origin. To verify the export:

```sh
PREVIEW_URL=http://127.0.0.1:8090 DEMO_PATH=/demos/royal-cuts/ npm --prefix review/royal-cuts-rebuild test
```

William authorized local integration on September 15 and the combined Royal Cuts, StartUp and Verdant Cloudflare release on September 16. Deployment state and release evidence are recorded in the canonical Zerra Website Project note. The old implementation remains in `src/demos/barbershop` as an unused source reference, and its original thumbnail is also preserved as `src/assets/work-previews/barbershop.png`. Preserve unrelated repository work.
