/*
Test : create booking
Request type : post
request body : random dynamic date

pre requisite : faker-js
npm install @faker-js/faker

Install luxon - datesand times
npm install luxon
 */


import { test, expect } from "@playwright/test"
import {faker} from '@faker-js/faker';
import {DateTime} from 'luxon';

test('Create Post request using static body', async ({ request }) => {
    
    //data generation using faker library
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalPrice = faker.number.int({min:100, max:5000});
    const  depositPaid = faker.datatype.boolean();

    const chekcinDate = DateTime.now().toFormat('yyyy-MM-dd');
    const chekcoutDate = DateTime.now().plus({days:5}).toFormat('yyyy-MM-dd')

    const additionalNeeds = 'f1 tv'

    //request body(faker library)
    const requestBody = {
        firstname: firstname,
        lastname: lastname,
        totalprice: totalPrice,
        depositpaid: depositPaid,
        bookingdates: {
            checkin: chekcinDate,
            checkout: chekcoutDate
        },
        additionalneeds: additionalNeeds
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
    const booking = responseBody.booking;

    expect(booking).toMatchObject({
        firstname: requestBody.firstname,
        lastname: requestBody.lastname,
        totalprice: requestBody.totalprice,
        depositpaid: requestBody.depositpaid,
        additionalneeds: requestBody.additionalneeds
    });

    expect(booking.bookingdates).toMatchObject({
        checkin: requestBody.bookingdates.checkin,
        checkout: requestBody.bookingdates.checkout
    });
})