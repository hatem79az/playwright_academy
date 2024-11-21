// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('visual check', async ({page}) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveScreenshot() 
});
//Why sometimes it fails ?? for role ?? 
test('API section', async({page}) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'API' }).click();
  await expect(page.getByRole('heading', {level: 1,  name: 'Playwright Library' })).toBeVisible();

})

test('locators new', async({page}) => {
  await page.goto('https://playwright.dev/');
  await page.getByLabel('Search').click();
  await page.getByPlaceholder("Search docs").fill('locators');
  await page.waitForLoadState("networkidle");
  await page.getByPlaceholder("Search docs").press('Enter');
  await page.waitForTimeout(1500);
  await expect(page).toHaveScreenshot()
})
