/*
only -- only specific test is executed, if you put only for more tham 1 test
        all tests with only will get executed which is not the point

skip  -- skipping the test intentionally

fail  -- intentionally fail the test

fixme   -- it is like flagging, marking it to fix the test later

slow -- provides more time for timeout
*/

import {test, expect, chromium} from '@playwright/test';

// only
test('test1', async({page})=>{
    await page.goto("https://www.google.com/")
    await expect(page).toHaveTitle('Google')
})

test.skip('test2', async({page})=>{
    await page.goto("https://www.google.com/")
    await expect(page).toHaveTitle('Google')
})

// skip the test based on some condition
test('test3', async({page, browserName})=>{
    // browsername comes from config
    test.skip(browserName === 'chromium', 'this test is skipped')
    // 1st parameter is boolean condition
    await page.goto("https://www.google.com/")
    await expect(page).toHaveTitle('Google')
})

// fail
test.fail('test4', async({page})=>{
    await page.goto("https://www.google.com/")
    await expect(page).toHaveTitle('Google')
})

// fixme
test.fixme('test5', async({page})=>{
    await page.goto("https://www.google.com/")
    // asserion is not there
    // it will be skipped
})


//slow
test('test6', async({page})=>{
    test.slow();//triples the default timeout
    await page.goto("https://www.google.com/")
    await expect(page).toHaveTitle('Google')
})





