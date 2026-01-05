import { test, expect } from '@playwright/test'


test('Get booking details by id', async ({ request }) => {
    const bookingId = 1; // we can pass id as path parameter
    //base url is already configured in the config file, we just need to give end point
    const response = await request.get(`/booking/${bookingId}`)
    // after / 'booking' is called end point and /1 is called path parameter
    // $ extracts the value, {} is how you store

    //parse the response and print
    const responseBody = await response.json();
    console.log(responseBody);

    //add assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
})


test.only('Get booking details by name', async ({ request }) => {
    const firstname = "Jim"; // pass first name and last name as query params
    const lastname = "Brown";
    // params is only meant for query parameters
    const response = await request.get("booking", { params: { firstname, lastname } })

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    // respone should not be empty
    expect(responseBody.length).toBeGreaterThan(0);


    for(const item of responseBody)
    {
        expect(item).toHaveProperty('bookingid')
        expect(typeof item.bookingid).toBe('number');
        expect(item.bookingid).toBeGreaterThan(0);
    }



    
})