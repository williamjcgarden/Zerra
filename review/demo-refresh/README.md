# Demo refresh verification

The original StartUp and Verdant designs are preserved. These checks cover their new button destinations and Zerra concept disclosures and its integration with Royal Cuts and Dovetail. They use the Playwright/axe dependencies pinned in `../royal-cuts-rebuild/package-lock.json`.

```sh
npm ci --prefix review/royal-cuts-rebuild
npm run build
npx wrangler dev --config dist/wrangler.json --local --port 8090 --persist-to /tmp/zerra-demo-state
node review/demo-refresh/audit.cjs
HEADLESS=1 node review/demo-refresh/regression.cjs
```

`BASE_URL` selects an alternate built preview or live site; `EVIDENCE_DIR` selects output. The audit checks all new routes at 1440, 390 and 320 pixels, image loading, horizontal overflow, empty/broken fragment links, page errors and WCAG A/AA rules (axe at 1440/390). The regression checks Dovetail's bag and simulated checkout, portfolio links/hover, Royal's booking entry and legacy redirect at desktop/mobile. No real enquiry, booking, signup or payment is sent.

`capture-thumbnails.cjs` captures the three updated homepages at 1920×900, suppressing browser scrollbar UI only during capture, then encodes 1024×480 WebP previews into the existing showcase asset paths. Review those images and rebuild the host after running it.

The guided-flow checks run separately:

```sh
node review/demo-refresh/startup-journey.cjs
node review/demo-refresh/verdant-journey.cjs
```

They cover preselection, multi-step form navigation, edit/restart, simulated completion, sample task state and mobile navigation. They also assert that no POST or other mutation request was sent, and run axe on the result state.

Use the built Cloudflare runtime for acceptance. The Vite-only preview serves the source HTML marker and can log development hydration warnings that do not represent the prerendered deployment; it also does not serve the standalone Royal Cuts directory entry.

The audit records existing color-contrast findings on the preserved Verdant homepage separately; these do not block the narrow button/disclosure update. New destination pages must pass every enabled axe rule. This is not a claim of full-site accessibility compliance.

`node review/demo-refresh/navigation.cjs` compares all four disclosure bars with Dovetail, tests hover/keyboard expansion and return navigation, and verifies brand-first titles, a single demo favicon and restoration of Zerra's icons at 1440/768/390/320px.
