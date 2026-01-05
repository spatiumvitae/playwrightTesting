import {test, expect, Locator} from '@playwright/test';

test("Handle dynamic elements", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    for(let i = 1; i<=5; i++)
    {
        let button : Locator = page.locator("//button[text()='START' or text()='STOP']");
        // Locate the button using CSS selector
        // cont button = page.locator("button[name='start'], button[name='stop']");

        // Using playwright specific locators to handle dynamic elements
        // const button = page.getByRole('button', {name: /start|stop/});
        // reegex in playwright is enclosed within / /
        await button.click();
        await page.waitForTimeout(2000);
    }

})


