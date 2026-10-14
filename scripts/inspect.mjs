import { chromium } from '@playwright/test'

const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader'] })
const widths = process.argv.slice(2).map(Number).filter(Boolean)
for (const width of widths.length ? widths : [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 960 }, deviceScaleFactor: 1 })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('http://127.0.0.1:5173', { waitUntil: 'networkidle' })
  await page.locator('h1').waitFor()
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1300)
  const layout = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, canvas: !!document.querySelector('canvas'), heading: document.querySelector('h1')?.textContent }))
  await page.screenshot({ path: `C:/Users/karth/AppData/Local/Temp/opencode/portfolio-${width}.png`, fullPage: process.argv.includes('--full') })
  if (process.argv.includes('--tour')) {
    for (const section of ['about', 'skills', 'projects', 'store', 'contact']) {
      await page.locator(`#${section}`).evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY - 100))
      await page.waitForTimeout(900)
      await page.screenshot({ path: `C:/Users/karth/AppData/Local/Temp/opencode/portfolio-${width}-${section}.png` })
    }
    if (width > 900) {
      await page.locator('.project-cylinder').evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY + 700))
      await page.waitForTimeout(1000)
      await page.screenshot({ path: `C:/Users/karth/AppData/Local/Temp/opencode/portfolio-${width}-cylinder.png` })
    }
  }
  console.log(JSON.stringify({ width, ...layout, errors }))
  await page.close()
}
await browser.close()
