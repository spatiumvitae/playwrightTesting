import {test, expect} from '@playwright/test'

//test data
const searchItems:string[] = ['laptop', 'Gift card', 'smartphone', 'monitor']

// using for-of loop

/*
for(const item of searchItems)
{
    test(`search test for ${item}`, async({page})=>{
        await page.goto("https://demowebshop.tricentis.com/");
        await page.locator("#small-searchterms").fill(item);
        await page.locator("input[value='Search']").click();
        await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, {ignoreCase:true});
    });
}
*/

// using for each function
/*
searchItems.forEach((item)=>{
    test(`search test for ${item}`, async({page})=>{
        await page.goto("https://demowebshop.tricentis.com/");
        await page.locator("#small-searchterms").fill(item);
        await page.locator("input[value='Search']").click();
        await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, {ignoreCase:true});
    });
})
*/
// even though test is one, playwright treats it like 4 tests
// when there are multiple tests we can put them in describe block

test.describe("searching items", async()=>{
    searchItems.forEach((item)=>{
        test(`search test for ${item}`, async({page})=>{
            await page.goto("https://demowebshop.tricentis.com/");
            await page.locator("#small-searchterms").fill(item);
            await page.locator("input[value='Search']").click();
            await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, {ignoreCase:true});
        });
    })
})