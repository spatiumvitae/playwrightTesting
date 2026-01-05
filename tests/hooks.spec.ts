import {test, expect} from '@playwright/test'

test.beforeAll("before all", async()=>{
    console.log("This is before all hook - setup");
})

test.afterAll("after all", async()=>{
    console.log("This is after all hook - teardown");
})  

test.beforeEach("before each", async()=>{
    console.log("This is before each hook - login");
})

test.afterEach("after each", async()=>{
    console.log("This is after each hook - logout");
})

test('Test1', async()=>{
    // login 
    console.log("This is Test1");
    // logout
});

test('Test2', async()=>{
    // login
    console.log("This is Test2");
    // logout
});


// suppose you need to perform login and logout for each test
// Instead of writing login and logout code in each test, we can use hooks
