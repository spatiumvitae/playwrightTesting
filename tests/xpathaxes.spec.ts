import {test, expect, Locator} from '@playwright/test';

test("xpath axes", async({page})=>{
    await page.goto("https://www.w3schools.com/html/html_tables.asp");


    // 1. self axis - select <td> element that contains 'Germany'
    const germanyCell : Locator = page.locator("//td[text()='Germany']/self::td");
    await expect(germanyCell).toHaveText("Germany");
  
    
    // 2. parent axis - select the parent <tr> of the <td> that contains 'Germany'
    const parentRow : Locator = page.locator("//td[text()='Germany']/parent::tr");
    await expect(parentRow).toContainText("Maria");

    console.log(await parentRow.textContent());
    // allTextContents is used when multiple elements are matched for the locator(css, xpath)
    


    // 3. child axis - get all <td> children of the second <tr> of the table
    const secondRowCells : Locator = page.locator("//table[@id='customers']//tr[2]/child::td"); // returns multiple elements
    await expect(secondRowCells).toHaveCount(3);


    // 4. ancestor axis - select the <table> ancestor of the <td> that contains 'Germany'
    const table:Locator = page.locator("//td[text()='Germany']/ancestor::table");
    await expect(table).toHaveAttribute("id", "customers");
    // id is attribute of table and custometrs is value of id attribute


    // 5. descendant axis - select all <td> descendants of the <table> with id 'customers'
    const allData:Locator = page.locator("//table[@id='customers']/descendant::td");
    await expect(allData).toHaveCount(18);


    // 6.folowing - siblings and children of sibling
    // get the <td> that comes after "Germany" in document order
    const follwoingCell:Locator = page.locator("//td[text()='Germany']/following::td[1]");
    console.log("First index after Germany: " + await follwoingCell.textContent());
    await expect(follwoingCell).toHaveText("Centro comercial Moctezuma")


    // 7. following-sibling - Get the <td> to the right of germany
    // const rightSibling:Locator = page.locator("//td[text()='Germany']/following-sibling::td");
    // await expect(rightSibling).toHaveCount(0); // Germany is the last column so no right sibling

    const rightSibling:Locator = page.locator("//td[normalize-space()='Maria Anders']/following-sibling::td");
    console.log("Right sibling of Maria Anders: " + await rightSibling.textContent());
    await expect(rightSibling).toHaveCount(1); // Maria Anders has 2 right siblings


    // 8. preceding - get the <td> that comes before 'Germany' in document order
    const precedingCell:Locator = page.locator("//td[normalize-space()='Germany']/preceding::td[1]");
    await expect(precedingCell).toHaveText("Maria Anders");

    // 9. preceding-sibling - get <td> to the left of Germany
    const leftSibling:Locator = page.locator("//td[normalize-space()='Germany']/preceding-sibling::td");
    await expect(leftSibling).toHaveCount(2); // Germany has 2 left siblings
    console.log("first left sibling of Germany: " + await leftSibling.first().textContent() + " last left sibling of Germany: " + await leftSibling.last().textContent());
    await expect(leftSibling.first()).toHaveText("Alfreds Futterkiste");
    await expect(leftSibling.last()).toHaveText("Maria Anders");  

})