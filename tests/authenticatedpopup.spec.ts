// popups are when u click on a button and it opens the new page in a new window
// It also belongs to the same context and same browser

import {test, expect} from '@playwright/test'

test('authenticated popups', async({browser})=>{

    // const context = await browser.newContext();
    // const page = await context.newPage();

    // Approach 1 : pass username and password directly along url
    // https://username:password@the-internet.herokuapp.com/basic_auth
   
   
    // await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');

    // await page.waitForLoadState();//wait for page loaded completeky

    // await expect(page.locator("p:has-text('Congratulations')")).toBeVisible();
    // await page.waitForTimeout(5000);



    // Approach 2 : pass credentials along browser context
    const context = await browser.newContext(
        {httpCredentials:{username:"admin", password:"admin"}}
    );
    const page = await context.newPage();
    await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');

    await page.waitForLoadState();//wait for page loaded completeky

    await expect(page.locator("p:has-text('Congratulations')")).toBeVisible();
    await page.waitForTimeout(5000);
    


    

})