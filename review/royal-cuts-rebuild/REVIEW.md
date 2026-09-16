# Royal Cuts — local rebuild review

September 13, 2026 · isolated review candidate · publication not authorized

The rebuilt Royal Cuts concept is a complete independent application at `review/royal-cuts-rebuild/`. Local production preview: **http://127.0.0.1:4189/**. The existing Zerra application, barber route, main dependencies and portfolio assets remain unchanged.

## What changed

A red, porcelain and chrome identity replaces the old orange/gold treatment. Large condensed typography, original concept photography, a custom Three.js barber pole and a masked studio-image scroll sequence form the visual direction. The page covers services, sample CAD pricing and duration, finished looks, the appointment experience, three fictional barbers, illustrative hours, practical FAQs and a Zerra enquiry panel.

Booking is an accessible local demonstration: service → barber → example day/time → review → explicit demo completion. Service, gallery and barber actions preselect the appropriate choice. Changing a service or barber clears the old time. Slots omit closed days and appointments that would finish after the displayed closing time. No personal information, payment or backend is involved.

## Critical review and fixes

| Finding | Impact | Resolution |
|---|---|---|
| Baseline mobile Zerra return/logo collision | Confusing top navigation | Dedicated concept strip; separate responsive header and booking action. |
| Baseline Services link had no real service menu | Visitor could not compare offerings | Four explicit services with inclusions, sample price, duration and direct selection. |
| Baseline booking stopped at a generic popup | Demo did not demonstrate the customer journey | Complete stateful booking demonstration with validation, editing and a truthful completion state. |
| First candidate used overly small supporting text | Price and service comprehension suffered on mobile | Increased body, service, FAQ and booking type; checked the rendered layouts again. |
| First gallery crops cut into finished looks | Weaker visual evidence and composition | Square panels preserve the generated haircut compositions; enlarged views use the same mapping. |
| Initial keyboard check let Tab leave the dialog for browser chrome | Keyboard users could lose their place | Explicit modal Tab boundaries, Escape and trigger-focus restoration. |
| Inactive booking steps had insufficient contrast | Progress labels were harder to read | Darkened the muted text token; rechecked page and dialog contrast. |
| Outgoing animated steps remained interactive briefly | Fast back/change-service navigation could hit an obsolete control | Immediate DOM replacement with entrance-only motion; focused regression passed three consecutive runs. |
| Opacity transitions continued in reduced-motion mode | Text could briefly appear faint and content could remain hidden | Booking text remains opaque; reduced motion and pause render section reveals immediately. |
| Initial example slots included closed days/late Saturday appointments | Demonstration contradicted the displayed schedule | Generate five upcoming open days and filter slots by service duration and closing time. |

## Copywriting and simulated marketing council

The copywriting pass prioritizes concrete service information, visible CAD labels, useful FAQ answers and explicit booking/demo states. Removed the generic paired agency slogan in favor of “Give customers a clear way to book.” There are no fabricated reviews, awards, address, phone number, operating history or business-performance claims. The fictional people, imagery, prices and availability are disclosed at entry, relevant sections, booking and footer.

The council is a simulation using the installed advisor frameworks, not an endorsement by those people. Godin's distinctiveness lens supports the memorable red/chrome identity. Ogilvy's direct-response critique places services immediately after the hero and keeps booking usable without watching the motion. Dunford's positioning lens separates the immersive barber experience from the closing Zerra agency explanation. The resolved tradeoff is one prominent 3D object and one cinematic section, with an ordinary, legible customer journey.

MotionSites MCP supplied an accessible cinematic reference for image masking and choreography. The implementation and assets were authored for this local concept. Lovable access was verified during planning; no Lovable project/build was used. UI/UX Pro Max informed layout and interaction checks. Public-facing copy contains no build-tool attribution. See `ASSET-SOURCES.md` for original image prompts, font sources and internal references.

## Verification

- Final TypeScript check and production build passed (`npm run build` runs both). The reviewed entry bundle is `index-Br4MZJly.js`.
- **15/15 visible Chrome browser tests passed**, zero failures, skips or retries; 87.7 seconds on September 13. `evidence/browser-tests.json` records the final run.
- Responsive checks at **375, 390, 768, 1024 and 1440 pixels**: no horizontal overflow, failed image assets or uncaught page errors in the tested page journeys. Hero/full-page evidence and booking screenshots are in `evidence/`.
- Service/barber/gallery preselection, required selection messages, back/edit behavior, invalidated slots, completion and restart passed. Example dates exclude Sunday/Monday; Saturday slots respect service duration.
- Keyboard Tab containment, Escape and focus restoration passed. Reduced motion renders section content immediately and omits the 3D canvas. The motion pause control and a simulated unavailable WebGL context both leave a usable static pole and booking flow.
- Axe reported **zero violations** for its selected WCAG 2 A/AA and 2.1 AA rules on the desktop page, desktop booking, mobile page and mobile booking. Four `axe-*.json` files contain the complete results.
- Separate cold-cache localhost lab: mobile Chrome touch emulation, 390×844, 4× CPU slowdown, 1.6 Mbps download and 150 ms latency produced **LCP 1,656 ms**, observed layout-shift sum **0.000011**, and approximately **613 kB** of reported resource transfer. The optional Three.js module was not loaded. This is one synthetic run, not field Core Web Vitals or a production performance guarantee.
- Desktop Chrome loaded and rendered the 3D engine and reported zero layout shifts, but did not emit an LCP entry in the lab run; its raw `lcp: 0` is **unavailable data, not a zero-millisecond result**. See `evidence/performance-lab.json`.
- Final rendered desktop composition, mobile page and mobile booking were visually inspected after the fixes. Original application paths and root package files have no tracked diff; no staged changes exist.

Reproducible checks: `npm run build`, `npm test`, and `node scripts/performance.cjs` while the preview runs at port 4189.

## Remaining boundaries

This is ready for William's local design review, not a production release. No integration, thumbnail replacement, push or deployment has occurred. Real appointment inventory, payment, notifications and customer data are intentionally outside this fictional demonstration.

Chrome desktop and mobile emulation are covered; a physical phone, Safari/VoiceOver and other browser engines have not been tested. Automated accessibility checks do not establish complete accessibility conformance. Conversion impact is unmeasured. The optional desktop Three.js module still produces Vite's size warning (695 kB minified, about 177 kB gzip); mobile and reduced-motion visitors use the static pole. The React SWC plugin also emits a non-blocking Vite deprecation warning. Revisit browser coverage and production delivery when integration is authorized.

## September 14 — simpler booking choices

William requested a normal barbershop service list and removal of the specialty labels beside individual barbers in booking. The local service data now uses **Regular haircut $35 / 30 min; Specialty haircut $45 / 45 min; Beard trim $25 / 20 min; Haircut & beard $55 / 60 min**, all illustrative CAD amounts. Only Specialty haircut needs an explanation: skin fades or a full restyle. The other booking rows show the service, duration and price without promotional descriptions. Shared service-menu labels, prices, FAQs and booking totals remain consistent.

The barber selection shows **Any barber — No preference**, **Ellis**, **Micah**, and **Luca**, with “All barbers offer every service.” Individual specialty descriptions have been removed from the booking dialog. The separate homepage barber profiles were outside this booking-copy correction.

### Menu research, checked September 14

Four official Vancouver shop menus informed the simple categories and sample price scale. These are observations from published menus, not a claimed market average or approved real-business rates:

- [Main Barbers](https://www.mainbarbers.com/services): haircut $30, skin fade $32, long hair $33, beard trim $20. A compact menu distinguishing ordinary and more involved cuts.
- [In The Cut](https://www.inthecut.ca/services): haircut $40+, haircut with beard trim $55+, beard trim $25+. Straightforward service names and a combined option.
- [Celebrities Barbershop](https://celebritiesbarbershop.com/): regular haircut $30, skin fade $35; its $60 bronze package includes haircut, beard trim and styling. Supports a simple base-cut / extra-time-cut distinction; package inclusions differ from this demo.
- [Adam Petipas Hair](https://www.adampetipashair.com/services): haircut $75, hair and beard $112.50, beard trim $37.50. Its concise three-service structure is useful; its higher rates were not copied into the concept.

The selected demo prices are a design decision informed by these examples. No tax policy, cancellation terms, special offers or live availability were adopted from other shops. Production remains unchanged.

**Revision verification:** September 14 build/typecheck passed (`index-BI2YWnSQ.js`); all 15 Chrome tests passed with zero failures or retries. Service/barber selections, sample price in the review, back/change-service behavior, closing-time filtering and accessibility checks passed. Updated desktop/mobile booking screenshots were visually inspected; `evidence/simple-barbers-desktop.png`, `evidence/simple-barbers-mobile.png` and `evidence/final-mobile-booking.png` show the revised selection screens. Performance was not remeasured for this copy/data-only revision; the September 13 lab numbers above remain historical.

## September 14 — stronger hero booking action and working photo carousel

William requested a larger hero booking button and a real carousel to justify the existing “01 / 05” photo indicator. The primary button now has a 68px desktop minimum height, larger/bolder label, larger arrow and a subtle shadow; tablet/mobile use a 62px minimum, with a full-width mobile action. The secondary gallery link moves below it on mobile. The barber pole’s model and placement are preserved.

The hero now contains five actual slides: the original textured taper and the four existing concept haircut images. Previous/next controls wrap through all five, update the photo title/counter, and pause automatic rotation after manual interaction. Automatic rotation runs every seven seconds when enabled and the carousel is visible; it pauses during hover, hidden-tab state, open dialogs and global motion pause. Keyboard focus on navigation controls stops rotation; a dedicated Start/Pause photo control allows an explicit restart. Reduced-motion mode keeps manual navigation without automatic rotation or image transitions.

The final composition keeps whole haircut portraits visible in the wide desktop frame, with soft image backgrounds at the sides. During review, decorative badge/canvas hit areas initially blocked carousel buttons; controls and stacking were corrected instead of bypassing normal clicks. A stale hover-state problem prevented rotation from resuming; rotation now checks the browser’s current hover state directly. No new generated assets or production changes were required.

**Hero revision verification:** Build/typecheck passed (`index-CoAgzB84.js`). All **19 Chrome browser tests passed**: the original 15 journeys plus carousel/button checks at 390/768/1440 and automatic rotation/pause/resume. The normal page checks still cover 375/390/768/1024/1440. All five slides were captured on desktop/mobile and the crops inspected. Automated accessibility checks passed on the tested page/dialog states. Evidence includes `hero-*-slide-*.png` and the current `browser-tests.json`. Performance was not remeasured for this revision; the earlier lab results remain historical. No production files or route were replaced.

## September 14 — haircut names in The Cuts

William requested actual haircut names that match the photos, keeping “The Cuts” section title. Visual inspection of the four existing images supports the labels **Curly taper fade**, **Bro flow**, **Textured crop**, and **Classic side part**. Short secondary captions describe the visible length, fringe, taper/fade or beard. The shared look data updates the gallery, enlarged image labels, accessibility names and hero-carousel captions together; service mappings and images remain unchanged.

Terminology references: [Uppercut Deluxe’s textured crop guide](https://eu.uppercutdeluxe.com/blogs/blog/how-to-style-textured-crop), [its textured side-part guide](https://eu.uppercutdeluxe.com/blogs/blog/textured-side-part-how-to-cut), and [Jatai’s flow haircut education](https://jatai.net/pages/education-connect/mastering-the-flow-haircut-with-russell-mayes). Names were chosen by comparing the existing concept photos to recognizable styles; these references do not authenticate the generated images or endorse the demo.

**Cut-name revision verification:** Build/typecheck passed (`index-C9wUPshg.js`). Four targeted existing browser checks passed: carousel labels/navigation at 390/768/1440 and gallery-to-booking preselection. Desktop/mobile gallery screenshots were visually reviewed (`named-cuts-desktop.png`, `named-cuts-mobile.png`). Results are in `evidence/cuts-label-tests.txt`; the full 19-test JSON remains the earlier hero-revision record. No booking logic, prices, assets or production code changed.

## September 14 — appointment section redesigned

William rejected “We’ll take our time” as an unappealing promise of a slow appointment and the white gaps around the expanding studio photograph. The rendered desktop/mobile section and its scroll styles were reviewed using UI/UX Pro Max and the copywriting guidance. The issue was hierarchy as well as motion: the headline emphasized duration, while a scroll-linked mask/scale/translation drew attention to the image container rather than the shop.

The replacement headline is **“Walk out feeling sharp.”** The section now uses a stable, edge-to-edge studio image on an ink background, readable copy over a directional dark gradient on desktop, and a natural photo/copy stack on mobile. No image masking, scroll translation or scaling remains. The three practical steps are “Agree on the cut,” “Cut, tidy, style,” and “Keep it looking good.” A direct Book a chair action opens the existing booking flow. The image, red/porcelain brand, hero pole, carousel and revised service/cut names are preserved.

The skill’s stable-layout, restrained-motion, readable-text and accessible-control guidance informed the design. Its generic alternative font/palette suggestions and unsubstantiated engagement uplift were not adopted. The change makes no timing or conversion-performance claims.

**Section-specific verification:** At 1440, 768 and 390 pixels, the image loaded, covered the viewport width, and retained `clip-path: none` / `transform: none` at three scroll positions. The section booking CTA opened the correct dialog at each width, with no overflow or uncaught page errors. Before/after captures are `experience-before-*.png` and `experience-after-*.png`; results are in `experience-revision-checks.json`.

**Final revision verification:** Build/typecheck passed (`index-j_z7Fn_O.js`), and all **19 Chrome browser tests passed** with no failures, covering responsive layout, booking, gallery/carousel controls, keyboard focus, reduced motion, WebGL fallback and automated desktop/mobile accessibility. The new section was separately visually inspected at 1440/768/390 pixels. Performance was not remeasured; prior lab measurements remain historical. The original app source, public assets and root package files remain unchanged. This revision is local only at `http://127.0.0.1:4189/#experience`.

## September 14 — varied staff portraits

William identified repetitive head tilts, framing, shirts and backgrounds in “Pick Your Person.” Replaced the displayed team sheet with a generated revision using the existing fictional identities and studio as references. Ellis leans at a station, Micah smiles off-camera in an apron beside a chair, and Luca has a closer window portrait. Different body angles, expressions and shop backgrounds add variation while black workwear and warm shop colors keep the set coherent. Removed the grayscale hover treatment. Original imagery is preserved; provenance is in `ASSET-SOURCES.md`.

Visual review caught clipped crowns in the old 25% vertical crop. The final top-aligned framing preserves full heads. Build/typecheck passed (`index-m5bZvjXo.js`). Focused visible Chrome checks passed at 1440/768/390: updated image decoding, distinct panel crops, all three correct barber preselections, no overflow and no uncaught errors. Final desktop/mobile screenshots were inspected (`team-v2-*.png`); results in `team-v2-checks.json`. The prior full 19-test run belongs to the appointment-section revision and was not repeated for this asset/crop change. Original application source and production remain unchanged. An accidental root build regenerated ignored build outputs only; it did not change tracked source or deploy. Local owner review: http://127.0.0.1:4189/#barbers.

## September 14 — automatic hero carousel

Owner requested no carousel buttons and a 2.5-second rotation interval. Removed previous/next and local pause controls, their CSS and manual/hover-pause state. All five photos now cycle automatically every 2500ms while visible and motion is enabled. Existing page-level Pause motion, booking/modal pause, hidden/offscreen pause and reduced-motion support remain. Added a timer-level media check after verification found changing reduced motion on an already open page did not stop rotation reliably through the existing parent hook alone.

Build/typecheck passed (`index-BOR-7zbv.js`); four updated Chrome hero checks passed at 390/768/1440, covering five-slide order/wrap, no carousel buttons, primary booking CTA, global pause/resume, booking pause and dynamic reduced motion. Desktop/mobile hero captures inspected (`hero-auto-*.png`). The full journey suite was not rerun for this scoped change. No tracked main-app source changes or deployment; local review at http://127.0.0.1:4189/.

## September 14 — unified hero wordmark and header CTA

William requested tighter spacing between Royal and Cuts and “Book an appointment” in the top-right header to match the hero action. The hero heading now uses a fixed .14em word gap instead of distributing the words to opposite sides; desktop type is slightly smaller (maximum 285px) and centered as one wordmark. Existing responsive type sizes remain. Only the header booking label changed; behavior is preserved. Existing browser tests now scope hero-specific booking actions to the hero because the header correctly has the same accessible label.

Build/typecheck passed (`index-BjXdO1zY.js`). Targeted checks at 375/390/768/1024/1440 verified the heading gap, viewport fit, no overflow and successful header booking. Desktop/mobile screenshots inspected; evidence in `hero-heading-*.png` and `hero-heading-checks.json`. Main-app tracked source remains unchanged; no deployment.

**Final verification:** All 19 Chrome tests passed for this revision, including booking journeys, carousel, responsive layout and automated accessibility. Current results are in `evidence/browser-tests.json`.

**Owner spacing correction:** William clarified he wants more space between the hero words, like the smaller logo, by moving only ROYAL left. Applied a 48px left offset above 1100px; CUTS stays in place. Build passed (`index-DxefVe7f.js`), visual desktop check and viewport checks at 390/768/1101/1440 passed. Evidence: `hero-wordgap-*.png`, `hero-wordgap-checks.json`. Prior full-suite results precede this CSS-only adjustment.

## September 14 — rounded letter clipping fixed

William identified flattened bottoms on the hero O/U/C/S. Reproduced with motion enabled: the entrance animation retained `clip-path: inset(0)` on the .8-line-height word spans, clipping glyph overshoot. Earlier reduced-motion visual checks missed this because they disabled that animation. Removed the animation's clipping mask while preserving its fade/translation, word spacing, desktop ROYAL offset and font size.

Build/typecheck passed (`index-Bln1PGxg.js`); five targeted hero browser tests passed, including a new normal-motion regression at 390/768/1440 that waits for the entrance to finish and verifies no text clip remains. Before and fixed desktop/mobile screenshots inspected (`hero-type-before.png`, `hero-type-fixed-*.png`). Existing carousel, booking and pause checks passed. Full journey suite not repeated for this CSS-only fix; production unchanged.

## September 14 — ten-cut sliding gallery and consistent appointment labels

William requested “Book an appointment” in the experience section and a ten-cut gallery that sweeps left one card every second. Replaced the four-card staggered grid with a responsive carousel showing five cards on desktop, three on tablet and two on mobile. A 320ms leftward slide starts each second, then reorders the same ten cards for a continuous loop. Stable numbers identify each cut. Previous/next and pause/play controls permit browsing; hover, keyboard focus, hidden/offscreen state, open dialogs, global motion pause and reduced-motion preferences suspend automatic advancement. Offscreen cards are excluded from the keyboard/accessibility sequence. All ten open the matching lightbox and preselect a related service. The hero retains its separate five-photo, 2.5-second carousel.

Added Buzz cut, Crew cut, Pompadour, Textured quiff, Modern mullet and Flat top. William identified too-similar faces in the initial generation, so the final six images use visibly different ages, hair colors, facial structures and facial hair. Initial and final source assets are preserved; `ASSET-SOURCES.md` records provenance. The displayed addition is `cuts-extra-v2.webp` (1536×1024; 159,610 bytes).

Changed the experience, gallery footer and mobile bar's remaining “Book a chair” labels to “Book an appointment,” matching the already-correct hero/header. Build/typecheck passed (`index-BIKdNwKN.js`). Targeted checks exercise all ten lightboxes/service mappings at 390/768/1440 and measure actual one-second advances through a complete wrap, leftward transform and interaction/reduced-motion pauses. The first simulated-clock timing test missed brief transition states; verification now samples real browser advancement rather than assuming fake-clock and CSS-animation frames stay aligned.

**Final verification:** All **24 Chrome browser tests passed** on the final asset/build, including automated desktop/mobile accessibility, booking journeys, hero behavior and four new cuts-carousel tests. Final new-portrait groups were visually inspected at 1440 and 390 (`cuts-final-*-start-*.png`); images and names match their intended styles and the revised faces are visibly differentiated. Current full results: `evidence/browser-tests.json`. Performance was not remeasured. Original app source, root dependencies and production remain unchanged. Local review: http://127.0.0.1:4189/#cuts.

## September 14 — calmer cuts-carousel motion

William found the one-second, 320ms sweep too fast and jolty. Increased the interval to three seconds and the slide to 800ms, using a gentler ease-in/ease-out curve. Card reordering now waits for the actual transform transition-end event instead of a separate timeout, avoiding an early reset near the end of the movement. Reduced/global motion pause completes an in-flight reorder without animation. Existing browsing and pause behavior remain.

Build/typecheck passed (`index-CvDO7ftJ.js`). The cuts motion regression now measures three-second cadence and the complete ten-cut wrap, with longer observation windows for hover/focus/reduced-motion pause checks.

**Final verification:** Four focused cuts-carousel tests passed (all ten booking mappings at 390/768/1440 plus the full three-second loop and pause behavior). A separate 73-frame normal-motion capture confirmed continuous leftward travel and stable settling across the reorder: maximum forward frame movement 16.38px, maximum reverse movement 0.0063px, final position range 0px. Evidence: `cuts-smooth-motion.json`, `cuts-smooth-final.png`. Prior full 24-test results precede this timing revision; production remains unchanged.

## September 14 — stronger first-load hero entrance

William requested a slower, more pronounced opening across the hero. Added a staggered 1.7-second title arrival with subtle perspective, a 2.2-second pole swing/rise with restrained overshoot, a 1.9-second photo entrance, and sequenced copy, CTA, seal and footer details. The longest entrance settles about 2.3 seconds after mounting; temporary intro state is removed at 2.8 seconds. Motion-toggle interaction clears that state immediately so the opening does not replay. Reduced-motion users see the settled content immediately; keyboard focus reveals the animated booking/link controls immediately. No preloader or interaction blocker.

All text animation remains free of clipping masks. Existing desktop ROYAL offset, spacing, final layout, 2.5-second hero carousel and three-second cuts carousel are preserved. The 3D renderer now sizes from the container's untransformed client dimensions so the pole's entrance transform does not leave the canvas undersized. No model/texture/lighting redesign.

Build/typecheck passed (`index-ClnRKnt6.js`). Normal-motion desktop/mobile captures inspected at multiple moments from 200ms through 2900ms (`hero-intro-*.png`); settled letter rounding, CTA visibility and composition remain intact. Desktop canvas and container both measured 394×470; no mobile canvas loaded and neither viewport overflowed (`hero-intro-checks.json`).

**Final verification:** All **25 Chrome browser tests passed**, including the new normal/reduced-motion entrance and no-replay checks, rounded-letter regression, 3D/fallback behavior, both carousels, booking and automated desktop/mobile accessibility. Results are current in `evidence/browser-tests.json`. Performance was not remeasured. The preview is local only; original app source and production remain unchanged.

**Runner shutdown note:** All 25 tests completed successfully, but the Playwright worker stalled after the final result. Sent SIGINT to this run's parent process (PID 32086) to finish shutdown. The command exited 130; the resulting JSON confirms expected 25, unexpected 0, skipped 0, flaky 0 and no report errors. This is a runner shutdown limitation, not a clean command exit. The local preview was unaffected.

## September 14 — continuous cuts glide and general appointment CTA

William requested continuous movement rather than timed slide steps, and “Book an appointment” in haircut popups because a gallery style is not a bookable service. Replaced the stepped transition/timer with a frame-driven linear glide at roughly one card-width per three seconds, without dwell between cards. Reordering and transform adjustment happen in the same frame to preserve movement across the loop. Hover, keyboard focus, manual pause, hidden/offscreen state, open dialogs and reduced/global motion pause freeze the current position; manual previous/next remain available. Responsive resizing recalculates the card step.

The lightbox now says “Book an appointment,” explains that images are inspiration, and opens the general service chooser with no service preselected. Removed the unused haircut-to-service mappings. No booking services or prices changed.

Build/typecheck passed (`index-D48ymr26.js`). Four targeted cuts tests passed: all ten popup/general-booking paths at 390/768/1440, steady sampled movement across a reorder, 10-to-1 wrap, and pause-in-place behavior. Existing hero entrance and other layouts remain unchanged.

**Final verification:** Seven focused browser checks passed with clean exits: four cuts-carousel checks plus gallery/general-booking, desktop accessibility and mobile accessibility journeys. Desktop/mobile popup and unselected booking captures were inspected (`cut-appointment-*.png`, `cut-general-booking-*.png`). The prior full-suite JSON remains historical for the hero-entrance revision; the full suite was not repeated here. Original app source and production remain unchanged. Local review: http://127.0.0.1:4189/#cuts.

## September 15 — pause-only cuts controls

Removed previous/next arrow buttons and their unused navigation handler. The continuous carousel retains its pause/play control. When motion is disabled, native horizontal scrolling and keyboard focus keep all ten cuts accessible without arrow controls.

Candidate build/typecheck and all four targeted cuts browser tests passed with exit 0, covering booking at 390/768/1440, continuous wrapping and pause behavior. Local-only change; no deployment.

## September 15 — modern Royal Cuts interior

Replaced the displayed experience photo with newly generated `studio-v2.webp`: bright porcelain walls, red chairs/cabinetry, chrome and Royal Cuts wall branding. Retained the old asset. Updated descriptive alt text and shifted the desktop crop to center 20% so the wall sign is intact. Existing copy, CTA and concept disclosure remain.

Build/typecheck passed. Visible Chrome checks at 1440/768/390 verified the new 1536×1024 image, working appointment CTA, no horizontal overflow and no page errors; rendered captures inspected. Evidence: `studio-v2-checks.json`, `studio-v2-{width}.png`, and exact `studio-v2-prompt.txt`. Full suite not rerun for this image change. Local-only review: http://127.0.0.1:4189/#experience.

## September 15 — local integration into Zerra

William authorized replacing the existing demo locally before a later Cloudflare deployment. The showcase now links to `/demos/royal-cuts/`, with a 1024×480 capture of the approved rebuild replacing `src/assets/work-previews/barbershop.webp`. Shared card classes, hover handlers and other destinations are preserved. `/our-work/barbershop-demo` forwards to the new page, retaining query/hash; its original component tree remains as an unused source reference.

The rebuilt app is exported separately into `public/demos/royal-cuts`, keeping CSS and Three.js out of Zerra's application bundle. `npm run build:royal-cuts` reproducibly refreshes this export from the source in this folder; the normal root build copies it unchanged. Asset URLs honor the nested base, and integrated Zerra return/enquiry links use the current origin. No new root dependencies, lockfile changes, remote pushes or deployment. The independent 4189 preview output is preserved.

**Verification:** Candidate export build/typecheck, final root client/SSG/prerender build, root TypeScript check, three route tests, SEO build contract and diff whitespace checks passed. All 25 Royal Cuts Chrome checks passed against the integrated local Cloudflare route with exit 0 (2.4 minutes), covering responsive layouts, booking, carousels, 3D and automated accessibility. A separate integration run at 1440/768/390 verified the thumbnail link, desktop tilt/blur/zoom/label reveal, booking CTA, new studio asset, return-page style restoration and legacy URL/query/hash forwarding. No page errors or local HTTP failures. Exact exported files match the built site's demo files. Final captures inspected: `integrated-work-*.png`, `integrated-work-hover-1440.png`, `integrated-hero-*.png`, `integrated-studio-*.png`; readbacks in `integration-checks.json`. The full suite used the list reporter, so older `browser-tests.json` is historical.

The first integration test sampled return-page styles before the stylesheet loaded; the corrected check waits for style restoration and passed. Vite-only preview did not resolve the static directory entry, so final verification and owner preview use the local Cloudflare runtime at http://127.0.0.1:8090/our-work. Development preview and full Cloudflare production are distinct; nothing has been deployed. See README for export/preview commands.
