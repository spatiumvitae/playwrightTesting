import {test, expect} from '@playwright/test'
import path from 'path';

test('Screenshots demo', async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")

    // await page.screenshot({path:'screenshots/homepage.png'});
    // you need to give the path, homepage.png is the name of the ss
    // this will override the previous ss
    // so we sill use some timestamp

    //page screenshot
    const timeStamp = Date.now();//returns current date and time
    await page.screenshot({path:'screenshots/'+'homepage'+timeStamp+'.png'});

    //full page screenshot -- untill footer
    await page.screenshot({path:'screenshots/'+'homepage'+timeStamp+'.png', fullPage:true});

    // screenshot of an element
    const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
    logo.screenshot({path:'screenshots/'+'logo'+timeStamp+'.png'})

    await page.locator(".product-grid.home-page-product-grid").screenshot({path:'screenshots/'+'featuredproduct'+timeStamp+'.png'})

})
    // for chnaging globally - go to config.ts and in the use block 
    // screenshot:'only-in-failure'
    // It will save under test-results folder by default
test.only('Screenshots demo using config file', async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@xyz');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');    
})
