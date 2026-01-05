import {test, expect} from '@playwright/test';

test("Verify page title", async({page})=>{

    await page.goto("http://www.automationpractice.pl/index.php");
    
    let title : string = await page.title(); //returns the title of the page
    console.log("Page title is: " + title);

    await expect(page).toHaveTitle("My Shop");
})