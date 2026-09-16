const { chromium, expect } = require('../royal-cuts-rebuild/node_modules/@playwright/test');
const AxeBuilder = require('../royal-cuts-rebuild/node_modules/@axe-core/playwright').default;
const fs = require('node:fs');
const base = process.env.BASE_URL || 'http://127.0.0.1:8090';
const out = process.env.EVIDENCE_DIR || 'output/startup-automation';
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: 950 }, reducedMotion: 'reduce' });
      const page = await context.newPage(); page.setDefaultTimeout(15000);
      const posts = [], errors = [], violations = [];
      page.on('request', r => { if (!['GET', 'HEAD'].includes(r.method())) posts.push(`${r.method()} ${r.url()}`); });
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(base + '/our-work/tech-demo');
      await page.locator('a[href$="get-started?plan=growth"]').click();
      await expect(page.locator('.tech-setup-kicker')).toContainText('Growth plan preview');
      await page.reload(); await expect(page.locator('.tech-setup-kicker')).toContainText('Growth plan preview');
      await page.screenshot({ path: `${out}/setup-${width}.png`, fullPage: true });
      for (const [source, outcome, result] of [
        ['Linear', 'Escalate an urgent issue', 'ENG-128 needs attention'],
        ['Linear', 'Share a resolved issue', 'ENG-128 is complete'],
        ['Stripe', 'Flag a failed payment', 'could not be completed'],
        ['Stripe', 'Share a new subscription', 'has started a Growth subscription'],
      ]) {
        const radio = page.getByRole('radio', { name: new RegExp(`^${source}`) });
        await radio.focus(); await page.keyboard.press('Space'); await expect(radio).toBeChecked();
        await page.getByRole('button', { name: 'Use sample tools' }).click();
        await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
        await expect(page.locator('.tech-connected-stack')).toContainText(source);
        await page.getByRole('radio', { name: new RegExp(`^${outcome}`) }).check();
        await page.getByRole('button', { name: 'Preview workflow' }).click();
        await expect(page.getByRole('heading', { name: 'Test your first automation.' })).toBeFocused();
        await expect(page.getByRole('status')).toContainText('No sample events processed');
        await page.getByRole('button', { name: 'Run sample event', exact: true }).click();
        await expect(page.getByRole('status')).toContainText('1 event processed');
        await expect(page.locator('.tech-message-body')).toContainText(result);
        await expect(page.locator('.tech-message-caption')).toContainText('not sent to Slack');
        await page.getByRole('button', { name: 'Run another sample' }).click();
        await expect(page.getByRole('status')).toContainText('2 events processed');
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        if (outcome === 'Escalate an urgent issue') {
          const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          violations.push(...axe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })));
          await page.screenshot({ path: `${out}/result-${width}.png`, fullPage: true });
        }
        await page.getByRole('button', { name: 'Edit workflow' }).click();
        await expect(page.getByRole('radio', { name: new RegExp(`^${outcome}`) })).toBeChecked();
        await page.getByRole('button', { name: 'Back to tools' }).click();
        await expect(page.getByRole('radio', { name: new RegExp(`^${source}`) })).toBeChecked();
      }
      await page.goto(base + '/our-work/tech-demo/get-started?preview=1');
      await expect(page.getByRole('heading', { name: 'Test your first automation.' })).toBeVisible();
      await page.reload(); await expect(page.getByRole('heading', { name: 'Test your first automation.' })).toBeVisible();
      await page.getByRole('button', { name: 'Run sample event', exact: true }).click();
      await page.getByRole('button', { name: 'Try a different workflow' }).click();
      await expect(page.getByRole('heading', { name: 'Connect your tools.' })).toBeFocused();
      await page.getByRole('button', { name: 'Use sample tools' }).click();
      await page.getByRole('button', { name: 'Preview workflow' }).click();
      await expect(page.getByRole('status')).toContainText('No sample events processed');
      await page.getByRole('link', { name: '← Back to StartUp', exact: true }).click();
      await expect(page.locator('#top h1')).toHaveText(/Ship\s+faster.*Scale\s+smarter/s);
      results.push({ width, posts, errors, violations });
      expect(posts).toEqual([]); expect(errors).toEqual([]); expect(violations).toEqual([]);
      await context.close();
    }
    console.log('StartUp sample integrations, four automation outcomes, run results, keyboard flow, edit/back/reset and query reload pass at 1440/390/320.');
  } finally { fs.writeFileSync(`${out}/startup-journey.json`, JSON.stringify(results, null, 2)); await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
