import{Selector,t} from 'testcafe'

class CartPage{
    constructor(){
        this.termslebel=Selector('input#termsofservice')
        this.cartTotal=Selector('td.cart-total-right')
        this.checkoutButton=Selector("button[id='checkout']")
    }
}

export default new CartPage();