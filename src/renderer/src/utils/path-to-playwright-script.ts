// src/renderer/src/utils/path-to-playwright-script.ts
import { chromium } from 'playwright';

export async function captureGoogleSearch(query: string): Promise<string> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.fill('input[name="q"]', query);
  await page.press('input[name="q"]', 'Enter');
  await page.waitForNavigation();
  const screenshotPath = `search-${query}.png`;
  await page.screenshot({ path: screenshotPath });
  await browser.close();
  return screenshotPath;
}
