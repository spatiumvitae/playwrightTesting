import {Locator, Page} from "@playwright/test";

export class LoginPage{

    // define the varialbes - private and readonly
    private readonly page : Page;
    private readonly loginLink : Locator;
    private readonly userNameInput : Locator;
    private readonly passwordInput : Locator;
    private readonly loginButton : Locator;

    // constructor
    constructor(page:Page){ // this page is coming from test method
        // Whenever we are referencing instance variables we need to use this keyword
        this.page = page;
        this.loginLink = page.getByRole('link', {name : 'Log in'});
        this.userNameInput = page.locator("input#loginusername");
        this.passwordInput = page.locator("input#loginpassword");
        this.loginButton = page.locator("button[onclick='logIn()']");
    }

    // action methods

    // for every element we need to implement action method
    // Every action method is asynchronus, becuase we will be using await keyword inside the method
    // why?every locator returns a promise 
// You can also have conditional action methods but never include assertions 

    async clickLoginLink(): Promise<void>
    {
        // await this.loginLink.waitFor({state : 'visible'});
        // await this.loginLink.dispatchEvent('click'); 

        await this.loginLink.hover(); 
        // await this.page.waitForTimeout(500); // Small wait for animation
        // await this.page.waitForLoadState('domcontentloaded'); // or 'networkidle'
        await this.loginLink.click();
    }

    async enterUserName(userName:string) : Promise<void>
    {
        await this.userNameInput.fill(userName);
    }

    async enterPassword(password:string) : Promise<void>
    {
        await this.passwordInput.fill(password);
    }

    async clickOnLoginButton() : Promise<void>
    {
        await this.loginButton.click();
    }

    async performLogin(userName:string, password:string):Promise<void>{
        await this.clickLoginLink();
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickOnLoginButton();    
    }


}