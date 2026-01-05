// iframes are embedded in the current website without disturbing the existing content
/* Examples of iframes:
    - ads
    - videos
    - widgets like chat support, google maps etc

*/

// an iframe is an HTML document embedded inside another HTML document

import {test, expect, FrameLocator, Frame} from '@playwright/test';

test("Frames demo", async({page})=>{

    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frames:Frame[] = page.frames(); // returns an array of frames in the page
    console.log("Number of frames in the page: " + frames.length);




    // ------Approach 1 : Using page.frame()-------
    const frame_1 = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_1.html"});
// this variable may contain the type Frame or null

    if(frame_1){ // if frame value is not null
        // frame_1.locator("input[name='mytext1']").fill("karthik");
        await frame_1.fill("input[name='mytext1']", "karthik");
    }
    else{
        console.log("Frame not found");
    }
    // IF ELSE is used to avoid null pointer exception
    // It is strictly recommended to use IF ELSE while working with frames

    await page.waitForTimeout(2000);


    
    
    // ------Approach 2 : Using FrameLocator-------

    const inputBox = page.frameLocator("frame[src='frame_1.html']").locator("input[name='mytext1']");
    await inputBox.fill("Selenium");
    // using page.frame() you can only use name or url attribute to locate the frame
    // but using FrameLocator you can use any locator strategy to locate the frame
    await page.waitForTimeout(2000);

})



// Handle inner frames or nested frames

test.only("inner/child frames demo", async({page})=>{

    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame3 = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"})
    
    if(frame3){
        await frame3.locator("input[name='mytext3']").fill("welcome")
        // Finding the child frames
        const childFrames = frame3.childFrames();
        console.log("Number of child frames in frame 3 : " + childFrames.length);
        // since childframes is an array of frames, we can use index to access each frame
        const radio = childFrames[0].getByLabel("I am a human"); 
        await radio.check();
        await expect(radio).toBeChecked();   
    }
    
    else{
        console.log("Frame 3 is not found");
    }

    await page.waitForTimeout(2000);

})



// we need to capture the frame reference first using page.frame() or page.frameLocator()
// then we can perform any action inside the frame using the frame reference variable
// like frame.locator(), frame.click(), frame.fill() etc

