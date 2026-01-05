import {test, expect} from '@playwright/test'

test('Auto waiting and forcing', async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

// 1. Auto retrying assertion (automatically retires untill it passes or timesout)
    // These assertions are used on locators or pages and are asynchronous, which means theyreturn a Promise, so you must use await.
    // Timeout for assertions is 5 seconds by default and is configurable
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
    await expect(page.locator('text=Welcome to our store')).toBeVisible();
    await expect(page.locator(".product-grid.home-page-product-grid strong")).toHaveText("Featured products");

// 2. Non-retrying assertions (executes immediately, no retry)
    // These assertions are used on values (like strings, booleans, numbers) and are synchronous, meaning they do not return a Promise, so you don’t need await.
    // Timeout is not applicable for non-retrying assertions as they execute immediately.
    const title = await page.title();
    expect(title).toBe("Demo Web Shop");
    const welcomeText = await page.locator('text=Welcome to our store').innerText();
    expect(welcomeText).toBe("Welcome to our store");

// 3. Negating matchers
    await expect(page.locator('text=Welcome to our store')).not.toBeVisible();// will keep retrying till timeout
    expect(welcomeText).not.toBe("Welcome to our store");// executes immediately, no auto retry
    

})