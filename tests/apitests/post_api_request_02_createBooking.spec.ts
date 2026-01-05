/*
Test : create booking
Request type : post
request body : json file
 */

import { test, expect } from "@playwright/test"
import fs from 'fs';

test('Create Post request using json file', async ({ request }) => {
    //read data from json(request body)
    const jsonFile = 'testdata/post_request_body.json';
    const requestBody:any = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'))



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
    const booking = responseBody.booking
    // instead of hard coding the values, you will get directly from the json file
    expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds
    });

    expect(responseBody.booking.bookingdates).toMatchObject({
        checkin: requestBody.bookingdates.checkin,
        checkout: requestBody.bookingdates.checkout
    })
})