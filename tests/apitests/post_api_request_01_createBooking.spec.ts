/*
Test : create booking
Request type : post
request body : static

 */


import { test, expect } from "@playwright/test"

test('Create Post request using static body', async ({ request }) => {
    const requestBody = {
        firstname: "valiveti",
        lastname: "karthi",
        totalprice: 118,
        depositpaid: true,
        bookingdates: {
            checkin: "2025-12-22",
            checkout: "2025-12-25"
        },
        additionalneeds: "chess"
    }

    //send post request(one param is url and other is the request body)
    // You can set the base url in config.ts file
    const response = await request.post("/booking", {data:requestBody});
    const responseBody = await response.json();
    console.log(responseBody);

    // validate the status code
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody).toHaveProperty("booking.additionalneeds");

    //validate booking details
    expect(responseBody.booking).toMatchObject({
        firstname: "valiveti",
        lastname: "karthi",
        totalprice: 118,
        depositpaid: true,
        additionalneeds: "chess"
    });

    expect(responseBody.booking.bookingdates).toMatchObject({
        checkin: "2025-12-22",
        checkout: "2025-12-25"
    })
})