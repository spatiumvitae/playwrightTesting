import {test, expect} from "@playwright/test"
import fs from 'fs';

// Reading data from json
const json_path = "testdata/data.json";
const loginData:any = JSON.parse(fs.readFileSync(json_path, 'utf-8'));

// main test
test.describe('Login data driven test', async () => {
    for (const {email, password, validity} of loginData) {
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
    }

})