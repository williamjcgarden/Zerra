const { chromium, expect } = require('../royal-cuts-rebuild/node_modules/@playwright/test');
const AxeBuilder = require('../royal-cuts-rebuild/node_modules/@axe-core/playwright').default;
const fs = require('node:fs');
const base = process.env.BASE_URL || 'http://127.0.0.1:8090';
const out = process.env.EVIDENCE_DIR || 'output/startup-signup';
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: 950 }, reducedMotion: 'reduce' });
      const page = await context.newPage(); page.setDefaultTimeout(15000);
      const posts = [], errors = [], violations = [], scripts = [];
      page.on('request', r => { if (!['GET', 'HEAD'].includes(r.method())) posts.push(`${r.method()} ${r.url()}`); if(r.resourceType()==='script') scripts.push(r.url()); });
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(base + '/our-work/tech-demo');
      await page.locator('#top h1').waitFor();
      expect(scripts.some(url => /\/GetStarted-/.test(url))).toBe(false);
      await page.locator('#top').getByRole('link', { name: 'Start free trial', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'Simple plans. Honest pricing.', level: 1 })).toBeVisible();
      expect(scripts.some(url => /\/GetStarted-/.test(url))).toBe(true);
      await expect(page.getByRole('button', { name: /^Choose (Starter|Growth|Enterprise)$/ })).toHaveCount(3);
      await page.screenshot({ path: `${out}/plans-${width}.png`, fullPage: true });
      for (const [plan, price] of [['Growth', '$49/mo'], ['Starter', '$0/mo'], ['Enterprise', 'Custom pricing']]) {
        await page.getByRole('button', { name: `Choose ${plan}`, exact: true }).click();
        await expect(page.getByRole('heading', { name: 'Set up your workflows and seats.' })).toBeFocused();
        await expect(page.locator('.tech-selected-plan')).toContainText(`${plan}${price}`);
        const customer = page.getByRole('checkbox', { name: /^Customer follow-up/ });
        await customer.uncheck();
        await expect(page.getByRole('button', { name: 'Continue to trial' })).toBeDisabled();
        const payment = page.getByRole('checkbox', { name: /^Payment alerts/ });
        await payment.focus(); await page.keyboard.press('Space'); await expect(payment).toBeChecked();
        if(plan === 'Growth') {
          await page.getByRole('spinbutton', { name: 'Team seats' }).fill('11');
          await page.getByRole('button', { name: 'Continue to trial' }).click();
          await expect(page.getByRole('heading', { name: 'Set up your workflows and seats.' })).toBeVisible();
        }
        await page.getByRole('spinbutton', { name: 'Team seats' }).fill(plan === 'Enterprise' ? '25' : '3');
        await page.getByRole('button', { name: 'Continue to trial' }).click();
        await expect(page.getByRole('heading', { name: 'Start your trial.', level: 1 })).toBeFocused();
        await expect(page.locator('.tech-trial-review')).toContainText(price);
        await expect(page.locator('.tech-trial-review')).toContainText('Payment alerts');
        await page.getByRole('button', { name: 'Edit setup' }).click();
        await expect(payment).toBeChecked();
        await expect(page.getByRole('spinbutton', { name: 'Team seats' })).toHaveValue(plan === 'Enterprise' ? '25' : '3');
        await page.getByRole('button', { name: 'Continue to trial' }).click();
        if(plan==='Growth') await page.screenshot({ path: `${out}/trial-${width}.png`, fullPage: true });
        await page.getByRole('button', { name: 'Start trial', exact: true }).click();
        await expect(page.getByRole('heading', { name: 'This is just a demo.', level: 1 })).toBeFocused();
        await expect(page.getByText('Talk to Zerra if you want to build your own software site.', { exact: true })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Talk to Zerra', exact: true })).toHaveAttribute('href', '/?enquiry=website');
        await expect(page.locator('.tech-demo-finish')).toContainText('No trial has been started');
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        if(plan==='Growth') {
          const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
          violations.push(...axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})));
          await page.screenshot({ path: `${out}/finish-${width}.png`, fullPage: true });
          await page.getByRole('link', { name: 'Talk to Zerra', exact: true }).click();
          await expect(page).toHaveURL(/\/\?enquiry=website$/);
          await expect(page.getByRole('dialog')).toBeVisible();
        }
        await page.goto(base + '/our-work/tech-demo/get-started');
      }
      await page.goto(base + '/our-work/tech-demo/get-started?plan=growth');
      await expect(page.locator('.tech-selected-plan')).toContainText('Growth');
      await page.reload(); await expect(page.locator('.tech-selected-plan')).toContainText('Growth');
      await page.getByRole('button', { name: 'Change plan' }).click();
      await expect(page.getByRole('heading', { name: 'Simple plans. Honest pricing.', level: 1 })).toBeFocused();
      await page.goto(base + '/our-work/tech-demo/get-started?preview=1');
      await expect(page.getByRole('heading', { name: 'Simple plans. Honest pricing.', level: 1 })).toBeVisible();
      await page.getByRole('link', { name: '← Back to StartUp', exact: true }).click();
      await expect(page.locator('#top h1')).toHaveText(/Ship\s+faster.*Scale\s+smarter/s);
      results.push({width,posts,errors,violations});
      expect(posts).toEqual([]); expect(errors).toEqual([]); expect(violations).toEqual([]);
      await context.close();
    }
    console.log('Start Free Trial → pricing → all three plans → workflows/seats → trial → Zerra demo message passes at 1440/390/320; lazy loading, validation, back/edit and plan query reload verified.');
  } finally { fs.writeFileSync(`${out}/startup-journey.json`, JSON.stringify(results,null,2)); await browser.close(); }
})().catch(e=>{console.error(e);process.exitCode=1});
