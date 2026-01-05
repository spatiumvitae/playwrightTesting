import {test, expect} from '@playwright/test'

test("Assertions - Hard vs Soft", async({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");

    // Hard Assertion
    // Even if one of the assertion gets failed, rest of the code will be terminated
    // await expect(page).toHaveTitle("Demo Web shop"); //failed
    // await expect(page).toHaveURL("https://demowebshop.tricentis.com/"); 

    // const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
    // await expect(logo).toBeVisible();
    // all the above assertions are auto retrying till timeout (default 5 seconds), logo is also a locator not a value



    // soft assertions
    await expect.soft(page).toHaveTitle("Demo Web shop");//failed
    await expect.soft(page).toHaveURL("https://demowebshop.tricentis.com/"); 

    const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
    await expect.soft(logo).toBeVisible();

    await page.waitForTimeout(3000);
})