import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
const out='evidence';
async function seeAll(page:any){for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=650){await page.evaluate((v:number)=>scrollTo(0,v),y);await page.waitForTimeout(90);}await page.waitForTimeout(700);}

for(const width of [375,390,768,1024,1440]) test(`layout at ${width}px has no overflow and all assets load`,async({page})=>{
 const errors:string[]=[];const bad:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`);});

 await page.setViewportSize({width,height:width<768?844:1000});await page.goto(process.env.DEMO_PATH||'/');await page.waitForLoadState('networkidle');await seeAll(page);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 expect(await page.locator('img').evaluateAll(imgs=>imgs.every(x=>(x as HTMLImageElement).complete&&(x as HTMLImageElement).naturalWidth>0))).toBe(true);
 await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(700);await page.screenshot({path:`${out}/final-${width}-hero.png`});
 if(width===390||width===1440){await page.screenshot({path:`${out}/final-${width}-full.png`,fullPage:true});}
 expect(errors).toEqual([]);expect(bad).toEqual([]);
});

test('service selection, barber, date, review and demo completion work',async({page})=>{
 await page.goto(process.env.DEMO_PATH||'/');await page.getByRole('button',{name:'Book Specialty haircut, 45 CAD, 45 minutes',exact:true}).click();const d=page.getByRole('dialog',{name:'Choose your service'});await expect(d).toBeVisible();await expect(d.getByRole('button',{name:/Specialty haircut/})).toHaveAttribute('aria-pressed','true');
 await d.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByRole('group',{name:'Barbers'}).getByRole('button')).toHaveText(['Any barberNo preference','Ellis','Micah','Luca']);await page.screenshot({path:`${out}/simple-barbers-desktop.png`});await page.getByRole('button',{name:'Micah',exact:true}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();
 await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByRole('alert')).toHaveText('Choose an example day and time to continue.');
 await page.getByRole('group',{name:'Example dates',exact:true}).getByRole('button').first().click();await page.getByRole('button',{name:'10:30 AM',exact:true}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();
 const review=page.getByRole('dialog');await expect(review).toContainText('Micah');await expect(review).toContainText('45 minutes');await expect(review).toContainText('$45 CAD');await expect(review).toContainText('10:30 AM');await page.screenshot({path:`out/review.png`.replace('out/',`${out}/`)});
 await page.getByRole('button',{name:'Complete demo booking',exact:true}).click();await expect(page.getByText('No appointment has been booked.',{exact:true})).toBeVisible();await page.screenshot({path:`${out}/booking-complete.png`});
 await page.getByRole('button',{name:'Try another appointment',exact:false}).click();await expect(page.getByRole('heading',{name:'Choose your service'})).toBeVisible();await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByRole('alert')).toHaveText('Choose a service to continue.');
});

test('changing service invalidates the slot and barber preselection survives navigation',async({page})=>{
 await page.goto(process.env.DEMO_PATH||'/');await page.getByRole('button',{name:'Book with Ellis',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:/Regular haircut/}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByRole('button',{name:'Ellis',exact:true})).toHaveAttribute('aria-pressed','true');await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('group',{name:'Example dates',exact:true}).getByRole('button').first().click();await page.getByRole('button',{name:'9:00 AM',exact:true}).click();
 await page.getByRole('button',{name:'Back',exact:true}).click();await page.getByRole('button',{name:'Back',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:/Beard trim/}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByRole('button',{name:'Ellis',exact:true})).toHaveAttribute('aria-pressed','true');await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByRole('button',{name:'9:00 AM',exact:true})).toHaveAttribute('aria-pressed','false');await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByRole('alert')).toBeVisible();
});

test('gallery opens general booking; all service and barber buttons enter booking',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(process.env.DEMO_PATH||'/');await page.locator('#cuts').scrollIntoViewIfNeeded();await page.locator('#cuts').screenshot({path:`${out}/named-cuts-desktop.png`});await page.getByRole('button',{name:'Explore Bro flow',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('dialog').getByRole('button',{name:'Book an appointment',exact:true}).click();await expect(page.getByRole('dialog').locator('[aria-pressed="true"]')).toHaveCount(0);await page.keyboard.press('Escape');
 for(const name of ['Book Regular haircut, 35 CAD, 30 minutes','Book Specialty haircut, 45 CAD, 45 minutes','Book Haircut & beard, 55 CAD, 60 minutes','Book Beard trim, 25 CAD, 20 minutes','Book with Ellis','Book with Micah','Book with Luca']){await page.getByRole('button',{name,exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);}
 await page.setViewportSize({width:390,height:844});await page.locator('#cuts').scrollIntoViewIfNeeded();await page.locator('#cuts').screenshot({path:`${out}/named-cuts-mobile.png`});
});

test('keyboard focus stays in booking, Escape restores focus, and reduced motion disables 3D',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(process.env.DEMO_PATH||'/');const trigger=page.locator('.hero').getByRole('button',{name:'Book an appointment',exact:true});await trigger.click();for(let i=0;i<14;i++){await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('dialog[open]'))).toBe(true);}await page.keyboard.press('Escape');await expect(trigger).toBeFocused();await expect(page.locator('.pole-stage canvas')).toHaveCount(0);expect(await page.locator('.barber-grid>div').first().evaluate(el=>getComputedStyle(el).opacity)).toBe('1');expect(await page.locator('.hero h1>span').first().evaluate(el=>getComputedStyle(el).animationName)).toBe('none');await seeAll(page);await expect(page.getByRole('heading',{name:/PICK YOUR/})).toBeVisible();
});

test('mobile navigation, booking sheet, FAQ and concept links work',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto(process.env.DEMO_PATH||'/');await page.getByRole('button',{name:'Open navigation',exact:true}).click();await expect(page.getByRole('dialog',{name:'Navigation'})).toBeVisible();await page.getByRole('dialog').getByRole('link',{name:/Services/}).click();await expect(page).toHaveURL(/#services$/);await expect(page.locator('#mobile-navigation')).not.toBeVisible();
 await page.getByRole('button',{name:'Open navigation',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:'Book an appointment',exact:true}).click();await expect(page.getByRole('dialog',{name:'Choose your service'})).toBeVisible();await page.screenshot({path:`${out}/final-mobile-booking.png`});await page.getByRole('dialog').getByRole('button',{name:/Regular haircut/}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByRole('group',{name:'Barbers'}).getByRole('button')).toHaveText(['Any barberNo preference','Ellis','Micah','Luca']);await page.screenshot({path:`${out}/simple-barbers-mobile.png`});await page.keyboard.press('Escape');
 await page.getByText('Is this a real barbershop?',{exact:true}).click();await expect(page.getByText(/Royal Cuts is a fictional brand and website concept by Zerra Studios/)).toBeVisible();await expect(page.getByRole('link',{name:'Discuss your website with Zerra',exact:false})).toHaveAttribute('href',process.env.DEMO_PATH?'/?enquiry=website':'https://zerrastudios.com/?enquiry=website');
});

test('automated accessibility checks cover desktop page and active booking dialog',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(process.env.DEMO_PATH||'/');await seeAll(page);let results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();fs.writeFileSync(`${out}/axe-desktop.json`,JSON.stringify(results,null,2));expect(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 await page.locator('.hero').getByRole('button',{name:'Book an appointment',exact:true}).click();results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();fs.writeFileSync(`${out}/axe-booking.json`,JSON.stringify(results,null,2));expect(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});

test('the 3D pole animates and the pause control shows its static fallback',async({page})=>{
 await page.goto(process.env.DEMO_PATH||'/');await expect(page.locator('.pole-stage.is-ready canvas')).toHaveCount(1);await page.waitForTimeout(600);const first=await page.locator('.pole-stage').screenshot();await page.waitForTimeout(900);const second=await page.locator('.pole-stage').screenshot();expect(first.equals(second)).toBe(false);await page.getByRole('button',{name:'Pause motion',exact:true}).click();await expect(page.locator('.pole-stage canvas')).toHaveCount(0);await expect(page.locator('.pole-poster')).toBeVisible();await expect(page.getByRole('button',{name:'Play motion',exact:true})).toHaveAttribute('aria-pressed','true');
});

test('WebGL unavailable still leaves the poster and booking usable',async({page})=>{
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type:string,...args:any[]){if(type.includes('webgl'))return null;return (original as any).call(this,type,...args);} as any;});await page.goto(process.env.DEMO_PATH||'/');await page.waitForLoadState('networkidle');await expect(page.locator('.pole-stage canvas')).toHaveCount(0);await expect(page.locator('.pole-poster')).toBeVisible();await page.locator('.hero').getByRole('button',{name:'Book an appointment',exact:true}).click();await expect(page.getByRole('dialog',{name:'Choose your service'})).toBeVisible();
});

test('mobile page and booking have no automated WCAG A/AA violations',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto(process.env.DEMO_PATH||'/');await seeAll(page);let results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();fs.writeFileSync(`${out}/axe-mobile.json`,JSON.stringify(results,null,2));expect(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);await page.locator('.hero').getByRole('button',{name:'Book an appointment',exact:true}).click();results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();fs.writeFileSync(`${out}/axe-mobile-booking.json`,JSON.stringify(results,null,2));expect(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
});

test('example availability respects closed days and service duration before closing',async({page})=>{
 await page.goto(process.env.DEMO_PATH||'/');await page.getByRole('button',{name:'Book Haircut & beard, 55 CAD, 60 minutes',exact:true}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();const dates=page.getByRole('group',{name:'Example dates',exact:true});await expect(dates.getByRole('button',{name:/^(Sunday|Monday)/})).toHaveCount(0);await dates.getByRole('button',{name:/^Saturday/}).click();await expect(page.getByRole('button',{name:'4:30 PM',exact:true})).toHaveCount(0);await expect(page.getByRole('button',{name:'3:00 PM',exact:true})).toBeEnabled();
 await page.getByRole('button',{name:'Back',exact:true}).click();await page.getByRole('button',{name:'Back',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:/Beard trim/}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByRole('button',{name:'4:30 PM',exact:true})).toBeEnabled();
});
