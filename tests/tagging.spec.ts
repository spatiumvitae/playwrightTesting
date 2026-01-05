import { test, expect } from '@playwright/test'

/*
1. Run all sanity tests:
    npx playwright test tagging --grep "@sanity"

2. Run all regression tests:
    npx playwright test tagging --grep "@regression"

3. Run tests which are belongs to both sanity and regression
    write a regex
    (?=.*sanity) it will make sure only regression is present
    (?=.*regression)
    (?=.*sanity)(?=.*regression)
    npx playwright test tagging --grep "(?=.*@sanity)(?=.*@regression)"

4. Run tests belong to either sanity or regression
    npx playwright test --grep "@sanity|@regression"

5. Run all tests other than sanity
    npx playwright test tagging --grep-invert "@sanity"

grep will pick all the tests that is matching with the tag name
grep-invert will pick up all the tests that are other than the matching tag


6. Run all sanity other than regression
    npx playwright test tagging --grep "@sanity" --grep-invert "@regression"
*/

// test("@sanity @regression Check the title of home page", async({page})=>{
//     await page.goto("www.google.com")
//     await expect(page).toHaveTitle("Google");
// })

// this is preferable
test("Check the title of google", { tag: '@sanity' }, async ({ page }) => {
    await page.goto("https://www.google.com")
    await expect(page).toHaveTitle("Google");
})

test('check navigation to store page', { tag: '@regression' }, async ({ page }) => {
    await page.goto("https://www.google.com")
    await page.getByText('Store').click();
})

test('check end of the year sale', { tag: ["@sanity", "@regression"] }, async ({ page }) => {
    await page.goto("https://www.google.com")
    await page.getByText('Store').click();
    await expect(page.locator('div').filter({ hasText: 'End of Year Sale' }).first()).toContainText('End of Year Sale');
})

