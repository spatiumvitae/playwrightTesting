/*
CSS (Cascading Style Sheets)

html +  js + css
By taking help of any attribute of element we can create css locator

CSS is faster than xpath

2 types of css locators
1) absolute css locators
2) relative css locators

tag with id                 --> tag#id(example: input#email)
tag with class              --> tag.class (example: input.form-control)
tag with any other attribute   --> tag[attribute='value']  (example: input[type='email'])
tag with class and attribute    --> tag.class[attribute='value']  (example: input.form-control[type='email'])
tag with id and attribute       --> tag#id[attribute='value']  (example: input#email[type='email'])

IN all these things if tag is not known we can skip tag name and start with # or . or [
example: #email or .form-control or [type='email']

syntax to get the element using css locator/xpath
page.locator(css/xpath)

css locators do not support text based locators
css locators do not support traversing from child to parent - unidirectional
css locators do not support logical operators (and, or)
you can use commas to represent or condition in css locators


*/


import {test, expect, Locator} from "@playwright/test";
test("Verify CSS Locators", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    //tag#id
    // const searchBox:Locator = page.locator("input#small-searchterms");
    // await searchBox.fill("Laptop");
    await expect(page.locator("input#small-searchterms")).toBeVisible(); 
    await page.locator("input#small-searchterms").fill("Computers");


    // tag.class  
    await page.locator("input.search-box-text").fill("Tablets");
    //class="search-box-text ui-autocomplete-input", 
    // if there's a space in class name you can only one class name
    // await page.locator("input.ui-autocomplete-input").fill("Tablets");

    
    
    // tag[attribute='value']
    await page.locator("input[name='q']").fill("Keyboards");

    // tag.class[attribute='value']
    await page.locator("input.search-box-text[value='Search store']").fill("Mouse");

    // tag#id[attribute='value']
    await page.locator("input#small-searchterms[name='q']").fill("Pens");


    await page.waitForTimeout(3000);

    // text
    await expect(page.locator("a:has-text('Register')")).toBeVisible();
    await page.locator("text=Computers").click();

})