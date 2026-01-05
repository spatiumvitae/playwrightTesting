import {Page, Locator} from '@playwright/test';

export class HomePage{
    private readonly page : Page;
    private readonly productsList : Promise<Array<Locator>>;
    private readonly addToCartButton : Locator;
    private readonly cartLink : Locator;
    
    
    constructor(page : Page)
    {
        this.page = page;
        this.productsList = this.page.locator("h4.card-title").all();
        // all() returns a promise of array of locators
        this.addToCartButton = this.page.locator("a:has-text('Add to cart')");
        this.cartLink = this.page.locator("a#cartur");
    } 


    async addProductToCart(productName : string) : Promise<void>
    {
        const productElements = await this.productsList;
        
        for(const productElement of productElements)
        {
            const name = await productElement.textContent();
            if(name?.trim() === productName){
                await productElement.click();
                break; 
            }
        }

        // handle the alert popup
        this.page.once('dialog', async(dialog)=>{
            if(dialog.message().includes("added")){
                await dialog.accept();
            }
        });

        await this.addToCartButton.click();
    }

    async goToCart():Promise<void>
    {
        await this.cartLink.hover();
        await this.page.waitForLoadState('domcontentloaded'); // or 'networkidle'
        await this.cartLink.click();
    }


}