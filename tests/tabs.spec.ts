import {test, expect, chromium} from 'playwright/test'

test('handle tabs', async()=>{
    const browser = await chromium.launch();
    // create your own browser
    // if you pass the browser fixture in async() param, you can remove above line and dedfault browser will be used according to the configuration.
    const context = await browser.newContext();
    // creates a context for that particular browser in config file
    
    const parentPage = await context.newPage(); 
    await parentPage.goto('https://testautomationpractice.blogspot.com/');
    
    // context.waitForEvent('page'); //promise can be pending, fulfilled, rejected
    // parentPage.locator("button:has-text('New Tab')").click(); //opens new tab
    
    // if we put waitforevent before clicking on the new tab button, promise will be pending
    // It will be waiting for click if we used async mode; if we use sync mode there will be no sync between the 2 statements
    
    // if we put waitforevent after clicking on the new tab button, it can't be able to catch the event that is happened already

    // so we have to trigger this context.waitForEvent('page') whenever you click the button that opens a new tab

    // promise.all() takes array of promises and execute them
    // It takes the parameters as an array
    // It runs the statements parallely
    // It will return a promise once promises of the statements inside fulfilled

    const [childPage] = await Promise.all([
        context.waitForEvent('page'),
        parentPage.locator("button:has-text('New Tab')").click()
    ])

    //[childpage] because the return type of promise.all(), Ignore the void

    


    //approach 1 : context.pages() stores the pages and you can iterate
    const pages = context.pages();//returns an array
    console.log("NUMBER OF PAGES CREATED : ", pages.length)
    console.log("title of the parent page:", await pages[0].title());
    console.log("url of the child page:", pages[1].url());





    // approach 2 : alternate
    console.log("title of the parent page:", await parentPage.title());
    console.log("TITLE of the child page", await childPage.title())

    // when to use what approach?
    // use approach 2 when you have only 2 pages
    // use approach 1 when there are multiple pages
    
    

})







