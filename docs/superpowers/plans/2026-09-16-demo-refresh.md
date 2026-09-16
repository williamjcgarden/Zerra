# Demo journeys and Zerra attribution

Owner-corrected scope, 16 September 2026. The earlier full rebuild exceeded William's intent and was rejected. Both original homepages were restored from da5deac. Unpublished drafts are retained separately in review/demo-refresh/unpublished-drafts and must not ship.

## Goal
Keep the existing StartUp and Verdant designs. Give their dead-end demo buttons useful destination pages, add clear themed Zerra concept branding, fix the Royal Cuts thumbnail, then publish the scoped package together.

## Constraints
- Preserve both original homepage layouts, fonts, palette, hero media, section order and motion. No full redesign or wholesale copy rewrite.
- Add a themed fictional-brand top bar with an integrated Zerra return link; strengthen footer attribution and a few relevant copy/FAQ labels.
- StartUp Get Started, trial and plan CTAs open one matching-brand simulated setup/preview page. Watch demo may open an example state there.
- Verdant quote CTAs open a matching-brand project-brief page. Service Learn More buttons open a useful service detail page with quote preselection.
- Existing working links/interactions stay working. Replace generic notices; do not invent social/contact destinations.
- No actual accounts, enquiry submission, bookings or payments. No required personal data; clear simulation disclosure, useful result, back/edit/restart.
- Scoped CSS and existing dependencies. New pages keyboard/mobile accessible and SSR-safe. Preserve unrelated work, Dovetail and Royal behavior.

## Execution and verification
1. Scoped StartUp changes: TechDemo and src/demos/tech files only. Compare original/current homepage rendering to confirm design retained; verify button destinations, query preselection and complete flow.
2. Scoped Verdant changes: LandscapingDemo and src/demos/landscaping only. Same visual-preservation check; verify quote/service journeys and navigation.
3. Root integration: wildcard routes, exact new prerender paths, truthful noindex metadata, branded fallback, thumbnail capture without scrollbar. Root tests, typecheck, build/SEO, desktop/mobile rendered/axe checks, link and journey tests, independent review.
4. One combined release to existing Cloudflare zerra worker after all checks; verify live assets, routes and rendered journeys. Canonical release state belongs in Ai-brain Website Project note.

UI/UX and Impeccable are used for new-page craft and usability review. The explicit instruction to preserve existing brand design overrides generic aesthetic ban lists. No extra approval ceremony is needed to execute this narrowed scope. Deployment authorization remains, after verification.
