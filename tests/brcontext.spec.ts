import {test, expect, Page, chromium} from '@playwright/test'

// Browser ---> Context ----> pages

// Browser ---> chromium, firefox, webkit

// context --> We can have multiple contexts for multiple users/apps for the same browser
// provide a way to operate multiple independent browser sessions

// page --> new Tab, window, popup


// async({page}), In this case which browser and context is taken?
// It will be taken by default from the config.ts
// By default page contains a context which is default context
// when uu pass page fixture => abive things will happen

test('Browser context demo', async()=>{
    const browser = await chromium.launch();
    // create your own browser
    // if you pass the browser fixture in async() param, you can remove above line and dedfault browser will be used according to the configuration.
    const context = await browser.newContext();
    // creates a context for that particular browser in config file
    
    const page1 = await context.newPage(); 
    const page2 = await context.newPage();
    // creating 2 pages with the same context

    console.log('No of pages created', context.pages().length);

    await page1.goto("https://playwright.dev/");
    await expect(page1).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');

    await page2.goto("https://www.selenium.dev/");
    await expect(page2).toHaveTitle('Selenium');

    await page1.waitForTimeout(5000);
    await page2.waitForTimeout(5000);

})