// popups are when u click on a button and it opens the new page in a new window
// It also belongs to the same context and same browser

import {test, expect} from '@playwright/test'

test('handle popups', async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://testautomationpractice.blogspot.com/');
    // multiple popups
    const[popup1] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('#PopUp').click()
    ]);

    const[popup2] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('#PopUp').click()
    ]);


    const allPopupWindows = context.pages();
    console.log("Number of pages/windows : ", allPopupWindows.length); 

    console.log(allPopupWindows[0].url()); 
    console.log(allPopupWindows[1].url());
    console.log(allPopupWindows[2].url());

    for(const pw of allPopupWindows){
        const title = await pw.title();
        if(title.includes('Playwright')){
            await pw.locator(".getStarted_Sjon").click();
            await pw.close(); //Closes the playwright popup window
        }
    }

})