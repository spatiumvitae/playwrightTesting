import {Page, Locator} from '@playwright/test';

export class CartPage{
    private readonly page:Page;
    private readonly productNameInCartSelector:Promise<Array<Locator>>;

    constructor(page:Page){
        this.page = page;
        this.productNameInCartSelector = this.page.locator("#tbodyid tr td:nth-child(2)").all();
    }

    async checkProductInCart(productName:string) : Promise<boolean>{
        const products = this.productNameInCartSelector;
        for(const product of await products)
        {
            const name:any = (await product.textContent())?.trim();
            console.log(name);
            if(name == productName){
                return true;
            }
        }
        return false;
    }
     
}