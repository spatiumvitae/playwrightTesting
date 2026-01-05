/*

pre-requisites : 
    data: json file
    create  a token
1) create a new booking (post)----> returns bookingId
2) Partial update booking (Patch) // required token

*/

import { test, expect } from '@playwright/test'
import fs from 'fs';
import { request } from 'http';
//utility function returns json file data
function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

test('Partial update booking (Patch)', async ({ request }) => {

    // 1)create booking
    const requestBody = await readJson('testdata/post_request_body.json')
    const createResponse = await request.post('/booking', { data: requestBody });
    expect(createResponse.ok()).toBeTruthy();

    const responseJson = await createResponse.json();
    const bookingid = responseJson.bookingid; // extracting booking id
    console.log("Booking id =====>", bookingid);


    // 2)partial Update the booking

    //create a token
    const tokenRequestBody = await readJson('testdata/token_request_body.json');
    const tokenRespone = await request.post('/auth', { data: tokenRequestBody });
    expect(tokenRespone.ok()).toBeTruthy();

    const tokenResponeBody = await tokenRespone.json();
    const token = tokenResponeBody.token;
    console.log("Token ======> ", token);


    //sending update
    const patchRequestBody = await readJson('testdata/patch_request_body.json');
    const partialUpdateResponse = await request.patch(`/booking/${bookingid}`, 
        {
            data:patchRequestBody,
            headers:{
                "Cookie":`token=${token}`
            }
        });
    expect(partialUpdateResponse.ok()).toBeTruthy();
    expect(partialUpdateResponse.status()).toBe(200);

    const partialUpdateResponseBody = await partialUpdateResponse.json();
    console.log(partialUpdateResponseBody);
    console.log("Booking details updated succesfully...")
})
