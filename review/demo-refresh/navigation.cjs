const {chromium,expect}=require('../royal-cuts-rebuild/node_modules/@playwright/test');
const fs=require('node:fs');
const out=process.env.EVIDENCE_DIR||'output/demo-navigation';
fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];try{
for(const width of [1440,768,390,320]){
const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});page.setDefaultTimeout(10000);
for(const [name,path] of [['dovetail','/our-work/dovetail-demo'],['startup','/our-work/tech-demo'],['verdant','/our-work/landscaping-demo'],['royal','/demos/royal-cuts/']]){
await page.mouse.move(width-5,700);
await page.goto((process.env.BASE_URL||'http://127.0.0.1:8090')+path);await page.locator('h1').waitFor();
const brand={dovetail:'Dovetail',startup:'StartUp',verdant:'Verdant',royal:'Royal Cuts'}[name];
await expect(page).toHaveTitle(`${brand} | Zerra Studios Concept`);
const icon=page.locator('head link[rel=icon]');await expect(icon).toHaveCount(1);
const href=await icon.getAttribute('href');expect(href).not.toContain('/favicon-');
expect((await page.request.get(new URL(href,page.url()).href)).status()).toBe(200);
await page.evaluate(()=>document.fonts.ready);
const bar=page.locator(name==='dovetail'?'.demo-context':'.zerra-demo-context');await expect(bar).toHaveText('Fictional brand & website concept by Zerra Studios');
const back=page.getByRole('navigation',{name:'Demo navigation',exact:true}).getByRole('link',{name:'Back to Zerra',exact:true});
const layout=await bar.evaluate(el=>{const b=el.getBoundingClientRect(),t=el.querySelector('span').getBoundingClientRect(),s=getComputedStyle(el);return {x:b.x,y:b.y,height:b.height,textX:t.x,textY:t.y,font:s.fontSize,line:s.lineHeight,overflow:document.documentElement.scrollWidth>innerWidth}});
await expect.poll(async()=>(await back.boundingBox()).width).toBe(44);
const collapsed=await back.boundingBox();expect(collapsed.x).toBe(16);expect(collapsed.y).toBe(16);expect(collapsed.width).toBe(44);expect(layout.textX).toBe(72);expect(layout.overflow).toBe(false);
await back.hover();await expect.poll(async()=>(await back.boundingBox()).width).toBe(132);await page.mouse.move(width-5,700);await page.waitForTimeout(250);
await back.focus();await expect.poll(async()=>(await back.boundingBox()).width).toBe(132);await page.keyboard.press('Tab');await page.evaluate(()=>document.activeElement?.blur());await page.waitForTimeout(250);
await page.screenshot({path:`${out}/${name}-${width}.png`});
await back.click();await expect(page).toHaveURL(/\/our-work\/?$/);await expect(page.locator('head link[rel=icon]')).toHaveCount(3);results.push({name,width,...layout});
}
await page.close();}
fs.writeFileSync(`${out}/checks.json`,JSON.stringify(results,null,2));
console.log('All four demo disclosure bars, return controls, titles and favicon restoration pass at 1440/768/390/320.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
