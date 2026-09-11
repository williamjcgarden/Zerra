# Dovetail — local marketing refinement and fourth-demo review

September 11, 2026. **LOCAL VERIFIED / OWNER REVIEW. Standalone source is locally committed; Zerra remains uncommitted. Nothing pushed or deployed.**

## Outcome

William selected Dovetail and authorized the five main marketing changes and full local change plan. The standalone concept is updated at localhost:8090. Zerra's built local preview adds Dovetail at http://localhost:8080/our-work/dovetail-demo. Barber, landscaping and tech remain in the portfolio; barber redesign is deferred.

1. Dovetail identity across wordmarks, metadata, favicon, social/portfolio preview and garment applications. Fraunces branding, Newsreader editorial headings, Instrument Sans utilities and the geometric bird mark retained. Reusable plum/black/reverse embedded-font SVG masters and identity specimens saved.
2. A wardrobe proposition with specific section copy and product titles: Boxy Crew, Hooded Parka, Double-Knee Work Pant and Six-Panel Cap. Featured cards retain their exact product destinations; all listed sizes remain available. Nine products, prices, IDs and saved-cart key preserved.
3. Three outfit boards and nine individual product links. Actual ochre catalog colour replaces the draft's sand wording. Homepage composition combines the work pant, crew and cap.
4. Restrained Zerra concept/return strip and proof section; enquiry links open the existing host quote panel through `/?enquiry=website`. No enquiry submitted, no lead receipt claimed, no new offer or outcome claims.
5. Six new Dovetail garment image masters, optimized 480/960 derivatives and provenance. Original masters remain; bird-only marks on tee, crew and tote retained. Unused legacy collection assets are historical, not active imagery.

## Integration

`src/demos/dovetail` is a scoped React Router adaptation of the canonical standalone source. It is not a localhost iframe or wholesale host replacement. Media/fonts are namespaced; CSS selectors/keyframes are scoped; Radix dialogs remain inside the demo wrapper. Only the missing accessible-dialog dependency was added. Existing demo sources are untouched.

All nine product paths, story, help and checkout are prerendered. Scoped 404 HTML files preserve real HTTP 404 responses and Dovetail recovery for unknown pages/products. Host SEO build checks pass. Demo pages remain noindex. Portfolio is two columns below 1024px and four from 1024px, with one link per image card.

A related mobile enquiry check found the host's existing server/client atmosphere mismatch. Atmosphere selection now occurs after hydration, then renders either the mobile still or the desktop video. Touch landscape retains the still; desktop does not request it. No production settings changed.

## September 11 — implementation correction audit

The visible white strip on the Dovetail card was embedded in the preview image's final columns. The corrected 1024×640 preview is in the host and standalone source; the source asset change is local commit `041314e`. The card itself keeps native lazy image loading.

Dovetail is now separated from Zerra's initial application bundle. Its route module, CSS, fonts, catalog and product media load after entry; the only Dovetail request while the card is visible is `/demos/dovetail/preview.webp`. A static catalog import in the prerender manifest was replaced with a compact product-ID list that is regression-checked against the catalog. Built `index.html` has no Dovetail module preload.

The audit restored the original compact shared BackToZerra control, added its navigation landmark, placed Dovetail's skip link inside the header, kept Help and Checkout agency links in the local Zerra experience, and added dialog semantics, Escape handling and initial close-button focus to the existing contact panel. Seven unreferenced duplicate files with ` 2` suffixes were moved intact to `/tmp/dovetail-integration-duplicate-files-2026-09-11`.

Current verification: 25 tests, production client/SSG/prerender build, lint with 0 errors / 12 existing Fast Refresh warnings and `git diff --check` pass. A parser checked 500 Dovetail rule groups / 532 selectors with zero unscoped selectors. Chrome checked 320/390/768/1024/1440 layouts, one link per card, click-only Dovetail module loading, shared return behavior, direct routes, real 404s, local enquiry opening and a zero-violation mobile axe scan. The corrected desktop screenshot has no white strip. Zerra remains uncommitted pending owner review.

## Evidence

- Standalone: 50 unit tests pass; TypeScript, build and lint pass (0 errors / 7 existing Fast Refresh warnings).
- Host: 24 tests pass, including catalog deep-link retention, escaped navigation, server-rendered product/404 content and mobile-safe enquiry landing HTML. TypeScript, full client/SSG/prerender build, SEO build checks and diff whitespace checks pass.
- Host full lint: 0 errors / 12 Fast Refresh warnings, including four in the newly adapted cart/navigation modules. These do not establish runtime failure; no suppressions or unrelated refactors added.
- Main browser pass: **138 checks, zero page errors** across standalone and built integration; 320/390/768/1024/1440 widths, all products, exact featured-card navigation, XS in bag, saved bag after refresh, checkout completion, three outfits, search, repeated closing CTA, real-status 404 recovery, enquiry entry and retained demos.
- Eight axe scans (desktop/mobile home and open bags in both contexts): zero violations. This is automated evidence, not complete accessibility certification.
- Separate second review: **12 checks** pass: touch landscape/no video/overflow, mobile enquiry without MP4 requests, desktop video and pause, editorial motion, quick-view focus/Escape, price sorting, product zoom, all nine outfit URLs, return-to-Zerra removal of the demo wrapper, mobile portfolio capture and no page errors.
- Main suite passed before the final touch-landscape media-query refinement; the second suite and final build/type/unit checks cover that final change. Image and logo masters were visually inspected; hero, story, portfolio and identity screenshots inspected.

Detailed reports, runners, logs and screenshots: `/Users/wgiar/projects/nocturn-studios/docs/qa-dovetail-2026-09-11/`. Canonical direction: Obsidian `NOCTURN Brand Review and Rebrand Plan`; canonical owner action: `NOCTURN Clothing Demo`.

## Local preview / continuation

Standalone source remains `/Users/wgiar/projects/nocturn-studios`; original running dev preview stays on 8090. Built host source is `/Users/wgiar/Desktop/zerra-elevate-main`; local runtime on 8080 uses `/tmp/dovetail-preview.wrangler.json` with absolute `dist` asset directory and `/tmp/dovetail-local-state` persistence. Keeping runtime files outside the watched build directory avoids Wrangler's local reload loop. A Vite-only preview was used temporarily for diagnosis; its template-comment hydration errors are not built-site results.

For later standalone-to-host refinements, port the narrowly changed components and keep namespaced imports/media paths, navigation adaptation, portal container and CSS scoping intact. Do not rerun temporary integration scripts over existing host work. Review both sources' dirty state first.

## Remaining gates

**Known brand overlap:** [Dovetail Workwear](https://dovetailworkwear.com/pages/about-us) is an existing apparel business, verified September 11 and disclosed before local implementation. This local fictional name selection is not public clearance. Resolve identity/confusion concerns before release; no affiliation or legal availability claimed.

William reviews the local result next. Deployment remains a separate unapproved action. No real-device Safari/assistive-technology certification, user recall/positioning study, garment manufacture, real commerce integration or form delivery test is claimed. Existing source/media provenance and publication-rights questions remain relevant. No invented conversion rating or revenue evidence.

> September 11 latest direction: after the initial integration overstep and rollback, William explicitly said to leave the local integration in place. It has been restored as the fourth portfolio demo, retaining its first-card placement and all existing demos. Standalone preview: localhost:8090; integrated preview: localhost:8080/our-work/dovetail-demo. William may continue refining Dovetail. No push, commit or Cloudflare deployment is authorized or performed.

## September 11 — Studio layout and wardrobe entrance follow-up

LOCAL VERIFIED / OWNER REVIEW. Studio now opens with “About the studio.” and “Relaxed clothing. Considered together.” A product-led hero, three numbered design principles, colour palette, blue outfit section and dedicated “Imagined by Zerra Studios” concept section replace the previous layout. Fictional brand, illustrative products/prices and no-payment disclosure remain. Approved Fraunces / Newsreader / Instrument Sans split preserved.

The homepage “The wardrobe approach” images drop in once on scroll with 0/300/600ms delays and 720ms entrances. Separate translate animation preserves existing rotation/parallax. Reduced motion leaves all images visible; cleanup cancels active animation. No animation dependency added.

Evidence: standalone 51 unit tests and TypeScript pass; lint has 0 errors / 7 existing Fast Refresh warnings. Both production builds pass; host 24 tests pass. The final integrated build includes the corrected accessible palette label. Browser report records 23 checks across both local previews, including Studio widths 320/390/768/1440, four axe scans with no violations, anchor navigation, desktop timing/once-only entrance and reduced-motion behavior; no page errors. Desktop and mobile screenshots visually inspected. This is local Chrome evidence, not physical-device or deployment verification. Saved screenshots and report: standalone `docs/qa-studio-2026-09-11/`.


## September 11 — portfolio layout and commit boundary

Standalone Dovetail committed as `aed3590`; host intentionally uncommitted pending William's visual approval. Buttons below each preview use the existing demo routes; E-commerce identifies Dovetail. Grid uses two columns below 1024px and four on desktop. Shared BackToZerra component is reused unchanged outside the Dovetail CSS wrapper; the concept strip reserves room for the control. Build and 24 tests pass. Chrome checks at 320/390/768/1024/1440, entry/return and six Dovetail routes pass with no page errors or mobile overflow. Screenshots inspected. Review localhost:8080/our-work. Nothing pushed or deployed.

## Owner correction: identical cards and return branding

Removed unnecessary secondary buttons beneath all previews and Dovetail-only metadata; each card has exactly one link. Shared return control explicitly uses Inter and always shows ZERRA across all four demos. Dovetail code/poster preload near the visible card; host scroll waits for mounted Dovetail. 24 tests/build pass; browser verifies five grid widths, six routes, identical computed return styles across all four demos, and cache-disabled entry with no page errors. Host stays uncommitted; no push/deploy.

## Click-only loading and labels — September 11

Removed the preceding viewport code/poster preloader after William reported homepage lag. Card thumbnail remains the only demo visual fetched before click. E-commerce is non-wrapping with mobile-sized type; tech label is Software. Fresh browser contexts at 320/390/1440 verified no Dovetail route chunk/media/font requests before click (including hover/focus), then successful entry after click. Build and 24 tests pass. Zerra remains uncommitted; nothing pushed/deployed.
