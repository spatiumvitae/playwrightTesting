/* pre requisite : Install the csv-parse module to read csv
 npm install csv-parse */

import {test, expect} from "@playwright/test"
import fs from 'fs';
import {parse} from 'csv-parse/sync';

// Reading data from csv
const csvPath = 'testdata/dataParams.csv';
const fileContent = fs.readFileSync(csvPath, 'utf-8')
// content is whole content from csv file
// we have to grab each and every line as one record
const records = parse(fileContent, {columns:true, skip_empty_lines:true})
console.log(records);


// main test
test.describe('Login data driven test', async()=> {
    for (const data of records) {
        test(`Login Test for ${data.email} and ${data.password}`, async ({ page }) => {
            await page.goto("https://demowebshop.tricentis.com/login");
            await page.locator("#Email").fill(data.email);
            await page.locator("#Password").fill(data.password);
            await page.locator('input[value="Log in"]').click();

            if (data.validity.toLowerCase() === 'valid') {
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



