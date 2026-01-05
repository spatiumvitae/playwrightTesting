import {test, expect, Page} from '@playwright/test'

/*
open app 

login -- beforeEach
    find product
logout  -- afterEach

login
    add to cart
logout

*/

// open app and close app will be one time implemented using before all and after all
// login and logout will be implemented using before each and after each
// findproduct and addtocart are the main tests


// we cannot pass page fixture for every hook, so we will create a global page variable
// If we pass page in beforeAll, and afterAll, there will be a conflict
// beforeAll has its own page so does afterAll
// to avoid that we will create a global page variable
let page:Page;

test.beforeAll('before all', async({browser})=>{
   page = await browser.newPage();//bydefault context is created when new page is created
   await page.goto("https://www.demoblaze.com/index.html");
})

test.afterAll('after all', async()=>{
    await page.close();
})

test.beforeEach('before each', async()=>{
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("pavanol");
    await page.locator("#loginpassword").fill("test@123");
    await page.locator("button:has-text('Log in')").click();
})

test.afterEach('after each', async()=>{
    await page.locator("#logout2").click();
});


test("find product", async()=>{
    const products = await page.locator('.hrefch').all();
    expect(products.length).toBe(9);
})

test("add product to cart", async()=>{
    await page.locator(".hrefch", {hasText:"Samsung galaxy s6"}).click();

    page.once('dialog', async(dialog)=>{
        expect(dialog.message()).toContain('added');
        await dialog.accept();
    });
})
