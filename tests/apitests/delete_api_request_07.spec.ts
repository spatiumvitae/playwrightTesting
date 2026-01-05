/*
1) Create new booking
2) get booking
3) update booking
4) delete booking

*/

import { test, expect } from '@playwright/test'
import fs from 'fs';
import { request } from 'http';
//utility function returns json file data
function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

test('Delete booking (end to end)', async({request})=>{

    // 1)create new booking
    const postRequestBody = await readJson('testdata/post_request_body.json')
    const postResponse = await request.post('/booking', 
        { 
            data: postRequestBody 
        });
    const postResponseBody = await postResponse.json();
    console.log(postResponseBody);
    const bookingid = postResponseBody.bookingid;
    console.log("Booking is created ....")
    console.log("Booking id is ====> ", bookingid)
        
    // 2)get booking
    const getResponse = await request.get(`/booking/${bookingid}`);
    const getResponseBody = await getResponse.json();
    console.log("Booking details are...");
    console.log(getResponseBody);


    // create token
    const tokenRequestBody = await readJson('testdata/token_request_body.json');
    const tokenRespone = await request.post('/auth', 
        {
            data: tokenRequestBody 
        });
    const tokenResponeBody = await tokenRespone.json();
    const token = tokenResponeBody.token;
    console.log("Token ======> ", token);

    // 3.update booking
    const updateRequestBody = await readJson('testdata/put_request_body.json');
    const updateResponse = await request.put(`/booking/${bookingid}`, 
        {
            data:updateRequestBody,
            headers:{
                "Cookie":`token=${token}`
            }
        });
    const updateResponseBody = await updateResponse.json();
    console.log(updateResponseBody);
    console.log("Booking details updated succesfully...")

    // 4. delete booking
    const deleteResponse = await request.delete(`/booking/${bookingid}`,
        {
            headers:{"Cookie" : `token=${token}`}
        }
    );
    // statusText extracts the raw text, look in the postman you'll understand
    expect(deleteResponse.statusText()).toBe("Created");
    expect(deleteResponse.status()).toBe(201)

    console.log("Bookings deleted succesfully")

})
