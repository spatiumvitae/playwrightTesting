import {test, expect, Locator} from '@playwright/test';

test("Xpath demo playwright", async({page})=>{


    await page.goto("https://demowebshop.tricentis.com/");

    //1. Absolute Xpath
    // const logo = page.locator("//html[1]/body[1]/div[4]/div[1]/div[4]/div[3]/div[1]/div[1]/div[1]/div[1]/a[2]");
    // ts will infer Locator type
    // await expect(logo).toBeVisible();


    //2. Relative Xpath
    const relativeLogo:Locator = page.locator("//a[@href='https://academy.tricentis.com']");
    await expect(relativeLogo).toBeVisible();


    //3. contains() function in Xpath
    const products = page.locator("//h2/a[contains(@href, 'computer')]")
    //return type is always Locator itself, It does not return array
    //products contains group of elements
    const productsCount = await products.count();
    //above we have captured the products but hgere we are doing an action so await is required
    console.log("No of computer related products");
    expect(productsCount).toBeGreaterThan(0);
    // Here we are just comparing the count so no await is required


    //display the name of the first product
    // console.log(products.textContent());
    // Error : strict mode will give error because products contains multiple elements
    // When ever you are trying to perdorm an action on the locator which is matching with more than one element
    console.log("First computer related product", products.first().textContent());
    console.log("Last computer related product", products.last().textContent());
    console.log("Nth computer related product", products.nth(2).textContent());
    // nth is is zero based index
// textContent() returns promise so we need to await
// textContent() returns string or null for single element
    
    let productTitles = await products.allTextContents();
    // This will return array of string containing text of all the matched elements
    // group of elements
    for(let pt of productTitles) 
    {
        console.log("Product title: " + pt);
    }



    // 4) startswith() function in Xpath
    const buildingProducts:Locator = page.locator("//h2/a[starts-with(@href, '/build')]");
    const count:number = await buildingProducts.count();
    expect(count).toBeGreaterThan(0);


    // 5) text() or . function in Xpath
    // mormalize-space() is used to trim leading and trailing spaces in text
    const register = page.locator("//a[text()='Register']");
    // //a[.='Register']
    // //a[normalize-space()='Register']
    await expect(register).toBeVisible();
    // toBeVisible() returns promise so await is required



    // 6) position(), last() functions in Xpath
    const lastProduct:Locator = page.locator("//div[@class='column follow-us']//li[last()]");
    const thirdProduct:Locator = page.locator("//div[@class='column follow-us']//li[position()=3]");
    // position is 1 based index
    const firstProdcut:Locator = page.locator("//div[@class='column follow-us']//li[1]");
    // indexing starts from 1 in xpath

    await expect(lastProduct).toBeVisible();
    console.log("Text content of last element: ", await lastProduct.textContent());
    




})