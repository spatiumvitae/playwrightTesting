// alert(), confirm(), prompt() dialogs handling example

// https://playwright.dev/docs/dialogs

// 1) By default, dialogs are auto-dismissed by playwright, so u don't havr to handle them
// 2) However, you can register a listener for the 'dialog' event to handle dialogs manually
    // you can register a dialog handller before the action that triggers the dialog to eithr
    //  dialog.accept() or dialog.dismiss()

import {test, expect} from '@playwright/test';

test("Simple Dialog", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    // register a dialog handler that captures the event
    // before the action that triggers the dialog
    // 'dialog' is the event name
    // (dialog) is the callback function parameter that represents the dialog object
    page.on('dialog', (dialog)=>{
        console.log("Dialog type is", dialog.type());
        expect(dialog.type()).toContain("alert");
        console.log("Dialog message is", dialog.message());
        expect(dialog.message()).toContain("I am an alert box!")
        dialog.accept();
    });

    // click the button that triggers the alert dialog
    await page.locator("button#alertBtn").click();

    await page.waitForTimeout(2000);
})



test("Confirmation Dialog", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
        page.on('dialog', (dialog)=>{
        console.log("Dialog type is : ", dialog.type());
        expect(dialog.type()).toContain("confirm");
        console.log("Dialog message is : ", dialog.message());
        expect(dialog.message()).toContain("Press a button!");
        // dialog.accept(); // to click on ok button
        dialog.dismiss();   // to click on cancel button
    });

    // click the button that triggers the alert dialog
    await page.locator("#confirmBtn").click(); // opnes confirmation dialog
    const text:string = await page.locator("#demo").innerText();
    console.log("Output text : ", text)

    await expect(page.locator("#demo")).toHaveText("You pressed Cancel!");
    await page.waitForTimeout(2000);
})


test.only("Promt Dialog", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
        
    
    page.on('dialog', (dialog)=>{
        console.log("Dialog type is : ", dialog.type());
        expect(dialog.type()).toContain("prompt");
        console.log("Dialog message is : ", dialog.message());
        expect(dialog.message()).toContain("Please enter your name:");
        expect(dialog.defaultValue()).toContain("Harry Potter"); // checks default value in prompt input box
        dialog.accept('Karthik');  // to enter value and click ok button
        // dialog.accepts will accept a parameter to enter value in the prompt input box

    });

    // click the button that triggers the alert dialog
    await page.locator("#promptBtn").click(); // opens prompt dialog
    const text:string = await page.locator("#demo").innerText();
    console.log("Output text : ", text)
    await expect(page.locator("#demo")).toHaveText("Hello Karthik! How are you today?");
    await page.waitForTimeout(2000);
})