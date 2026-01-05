import {test, expect} from '@playwright/test';

test("Verify page url", async({page})=>{

    await page.goto("http://www.automationpractice.pl/index.php");
    
    let url : string = await page.url(); //returns the title of the page
    console.log("Page url is: " + url);

    await expect(page).toHaveURL(/automationpractice/);
})