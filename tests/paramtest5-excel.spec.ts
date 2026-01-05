// npm install xlsx

/* We will convert the excel data to json


*/



import {test, expect} from "@playwright/test"
import fs from 'fs';
import * as XLSX from 'XLSX';

// reading excel
// file -->  workbook --> sheets --> rows & columns

const excelPath = 'testdata/dataExcel.xlsx';
const workBook = XLSX.readFile(excelPath);
const sheetName = workBook.SheetNames[0];
const workSheet = workBook.Sheets[sheetName];

//convert sheet to json
const loginData:any = XLSX.utils.sheet_to_json(workSheet);
console.log(loginData);
// main test
test.describe('Login data driven test', async()=> {
    for (const data of loginData) {
        test(`Login Excel Test for ${data.email} and ${data.password}`, async ({ page }) => {
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
