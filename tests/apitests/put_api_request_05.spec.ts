/*

pre-requisites : 
    data: json file
    create  a token
1) create a new booking (post)----> returns bookingId
2) Update booking (Put) // required token

*/

import { test, expect } from '@playwright/test'
import fs from 'fs';
import { request } from 'http';
//utility function returns json file data
function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

test('Update booking (Put)', async ({ request }) => {

    // 1)create booking
    const requestBody = await readJson('testdata/post_request_body.json')
    const createResponse = await request.post('/booking', { data: requestBody });
    expect(createResponse.ok()).toBeTruthy();

    const responseJson = await createResponse.json();
    const bookingid = responseJson.bookingid; // extracting booking id
    console.log("Booking id =====>", bookingid);


    // 2)Update the booking id

    //create a token
    const tokenRequestBody = await readJson('testdata/token_request_body.json');
    const tokenRespone = await request.post('/auth', { data: tokenRequestBody });
    expect(tokenRespone.ok()).toBeTruthy();

    const tokenResponeBody = await tokenRespone.json();
    const token = tokenResponeBody.token;
    console.log("Token ======> ", token);


    //sending update
    const updateRequestBody = await readJson('testdata/put_request_body.json');
    const updateResponse = await request.put(`/booking/${bookingid}`, 
        {
            data:updateRequestBody,
            headers:{
                "Cookie":`token=${token}`
            }
        });
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);

    const updateResponseBody = await updateResponse.json();
    console.log(updateResponseBody);
    console.log("Booking details updated succesfully...")
})
