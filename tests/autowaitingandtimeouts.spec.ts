import {test, expect} from '@playwright/test'

test('Auto waiting and forcing', async({page})=>{
    test.setTimeout(60000); // set timeout for this particular test to 60 seconds
    await page.goto("https://demowebshop.tricentis.com/");
// By default Auto waiting works for actions and assertions
// What is auto waiting?
// Before performing any action, it will perform some actionability checks like visibility, enabled, stable etc.
// So, no need to write explicit wait conditions before actions

// Assertions - auto wait works
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
    await expect(page.locator('text=Welcome to our store')).toBeVisible();

// Actions - auto wait works
    await page.locator('#small-searchterms').fill("Laptop", {force: true});  //search box - force action(it will not do actionability checks)
    // fill is action
    await page.locator('.button-1.search-box-button').click({force: true, timeout : 10000}); // search button - force action
// we cannot force assertions, only actions can be forced
// By default actions have 30 seconds timeout and assertions have 5 seconds timeout
// If the action cannot be performed within the timeout period, it will throw timeout errors


// test timeout  - how long a single test is allowed to run
// You can set test timeout in the config file 
// go to defineConfig and set timeout value
// example : timeout: 60000  (60 seconds)

// test.setTimeout() - to set timeout for a particular test
// This will override the timeout set in the config file for that particular test only

// Assertions timeout - how long an assertion is allowed to wait
// in config, go to defineConfig and set timeout value for assertion
// example : expect: { timeout: 10000 }  (10 seconds)

// action timeout - how long an action can take to perform
// By default action timeout is 30 seconds
// You can override action timeout for a particular action using 'timeout' property in the action method



})