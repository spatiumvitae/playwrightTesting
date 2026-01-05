import {test, expect} from '@playwright/test'

test("Booking.com date picker", async({page})=>{
    await page.goto('https://www.booking.com/');

    // click on the datepuicker field to open the calender
    await page.getByText('Check-in date').hover();
    await page.getByText('Check-in date').click();

    // check in date selection
    let checkinYear = "2026";
    let checkinMonth = "March";
    let checkinDay = "27";

    while(true){
        const checkInMonthYear:any = await page.locator("h3[aria-live='polite']").first().textContent();
        const currentMonth = checkInMonthYear.split(" ")[0];
        const currentYear = checkInMonthYear.split(" ")[1];

        if(currentMonth === checkinMonth && currentYear === checkinYear){
            break;
        }else{
            await page.locator("button[aria-label='Next month']").click();
        }
    }

    // select date
    let allDates = await page.locator(".d7bd90e008").first().locator('td').all();
    let checkindateSelected = false;

    for(let date of allDates){
        const dateText = await date.innerText();
        if(dateText == checkinDay){
            await date.click();
            checkindateSelected = true;
            break;
        }
    }
    expect(checkindateSelected).toBeTruthy();

    // check out date
    let checkoutYear = "2026";
    let checkoutMonth = "March";
    let checkoutDay = "28";

    while(true){
        const checkoutMonthYear = await page.locator("h3[aria-live='polite']").nth(0).innerText();
        const currentMonth = checkoutMonthYear.split(" ")[0];
        const currentYear = checkoutMonthYear.split(" ")[1];

        if(currentMonth === checkoutMonth && currentYear === checkoutYear){
            break;
        }else{
            await page.locator("button[aria-label='Next month']").click();
        }
    }
    allDates = await page.locator(".d7bd90e008").first().locator('td').all();
    let checkoutdateSelected = false;

    for(let date of allDates){
        const dateText = await date.innerText();
        if(dateText == checkoutDay){
            await date.click();
            checkoutdateSelected = true;
            break;
        }
    }
    expect(checkoutdateSelected).toBeTruthy();


})