import {test, expect, Locator} from '@playwright/test'
import { executionAsyncId } from 'async_hooks';
import { text } from 'stream/consumers';

test('Text input actions', async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    const textBox:Locator = page.locator('input#name');
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    // i can aslo verify a `particular attributes of the tag
    const maxlength: string | null = await textBox.getAttribute('maxlength');
    expect(maxlength).toBe('15');

    //why didn't we used await here?
    // expect can be used in 2 ways - 
        // 1) expect on an element
        // 2) expect on a value
// maxlength is a value
// textBox is an element, whatever actions you perform on top of elements requires await
// asserions applied on values like maxlength won't return any promise, it returns void


// textbox / text input / input box
    await textBox.fill("robert greene");
// returns the input value of text box
    const enteredValue:String = await textBox.inputValue();
    console.log('Input value of the first name : ', enteredValue);
    expect(enteredValue).toBe("robert greene");
});


// Radio button
test('Radio button actions', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    const maleRadio:Locator = page.locator("#male");
    
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    // maleRadio.isChecked() //returns boolean value, its not assertion method
    expect(await maleRadio.isChecked()).toBe(false);

    // check
    await maleRadio.check();
    expect(await maleRadio.isChecked()).toBe(true);
    await expect(maleRadio).toBeChecked(); //preferable
})


// checkbox
test.only('Checkbox actions', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    // 1 SELECT SPECIFIC checkbox(sunday) using getBYLabel and asser
    const sundayCheck = page.getByLabel('Sunday');
    await sundayCheck.check();
    await expect(sundayCheck).toBeChecked();

})