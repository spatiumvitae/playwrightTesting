import { test, expect } from '@playwright/test'

const loginTestData: string[][] = [
    ["laura.taylor1234@example.com", "test123", "valid"],
    ["invaliduser@example.com", "test321", "invalid"],
    ["validuser@example.com", "testxyz", "invalid"],
    ["", "", "invalid"],
];

for (const [email, password, validity] of loginTestData) {
    test.describe('Login data driven test', async () => {
        test(`Login Test for ${email} and ${password}`, async ({ page }) => {
            await page.goto("https://demowebshop.tricentis.com/login");
            await page.locator("#Email").fill(email);
            await page.locator("#Password").fill(password);
            await page.locator('input[value="Log in"]').click();

            if (validity.toLowerCase() === 'valid') {
                const logoutLink = page.locator('a[href="/logout"]');
                await expect(logoutLink).toBeVisible({ timeout: 5000 })
            } else {
                const errorMsg = page.locator(".validation-summary-errors");
                await expect(errorMsg).toBeVisible({ timeout: 5000 });
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login')
            }

        })
    })

}

