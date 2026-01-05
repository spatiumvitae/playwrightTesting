import {test, expect} from '@playwright/test';

test.describe("Group 1", async()=>{
    
    test('Test1', async()=>{
        console.log("This is Test1");
    });

    test('Test2', async()=>{
        console.log("This is Test2");
    });
})



test.describe("Group2", async()=>{

    test('Test3', async()=>{
        console.log("This is Test3");
    })

    test('Test4', async()=>{
        console.log("This is Test4");
    })
})


// By default playwright will execute tests in parallel mode
// in config file you can set fullyParallel: false to run tests in serial mode
// Or you can use test.describe.serial to run a group of tests in serial mode


// to run the specific group use npx playwright test --grep "Group 1"