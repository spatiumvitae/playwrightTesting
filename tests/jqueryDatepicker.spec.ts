import {test, expect, Locator, Page} from '@playwright/test'

//ts function
async function selectDate(targetYear:string, targetMonth:string, targetDate:string, page:Page, isFuture:boolean){
     while(true){//this while loop selects the expected month and year
        const currentMonth = await page.locator(".ui-datepicker-month").textContent()??"";
        const currentYear = await page.locator(".ui-datepicker-year").textContent()??"";
        
// we will compare the current month and year in the calender with our desired month and year
// we will click next or prev accordingly
// since we don't know the terminating condition, we use while(true)
        if(currentMonth === targetMonth && currentYear === targetYear){
            break;
        }

        if(isFuture){
            //Future date
            await page.locator("span:has-text('Next')").click();//clicking on next button
        }else{
            // past
            await page.locator("span:has-text('Prev')").click();//clicking on prev button
        }
    }

    const allDates = await page.locator(".ui-datepicker-calendar td").all();
    for(let dt of allDates){
        const dateText = await dt.innerText();
        if(dateText === targetDate){
            await dt.click();
            break;
        }
    }

}








test('Jquery datepickers', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')

    const dateInput:Locator = page.locator("#datepicker");
    await expect(dateInput).toBeVisible();
    // Approach 1 : using fill() method
    // dateInput.fill("06/20/2004") //mm/dd/yyyy
    // fill method will be working most of the times for the input tag calenders



// Approach 2 : Using date picker
    await dateInput.click();
    // select future target date
    // const year = '2027';
    // const month = 'March';
    // const date = '25';


    // select past target date
    const year = '2023';
    const month = 'March';
    const date = '27';
    selectDate(year, month, date, page, false);
    
    const expectedDate = '03/27/2023'
    await expect(dateInput).toHaveValue(expectedDate);

    await page.waitForTimeout(5000);

})