import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
// class name               // file path
import {LoginPage} from '../pages/LoginPage';
import {CartPage} from '../pages/CartPage';

test("User can login amd add product to the cart", async({page})=>{
    page.goto("https://demoblaze.com/");

    const loginPage = new LoginPage(page);
    await loginPage.performLogin("pavanol", "test@123")

// Homepage
    const homePage = new HomePage(page);
    await homePage.addProductToCart("Samsung galaxy s6");
    await page.waitForTimeout(2000);
    await homePage.goToCart();
    await page.waitForTimeout(2000);


    // Cart Page
    const cartPage = new CartPage(page);
    const isProductInCart = await cartPage.checkProductInCart("Samsung galaxy s6");
    expect(isProductInCart).toBe(true);

})