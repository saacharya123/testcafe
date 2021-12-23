import{Selector,t} from 'testcafe'

class CheckOutPage{
    constructor(){
        this.countryList=Selector("select[id='BillingNewAddress_CountryId']")
        this.cityList=Selector('#BillingNewAddress_City')
        this.address1=Selector('#BillingNewAddress_Address1')
        this.address2=Selector('#BillingNewAddress_Address2')
        this.zipCode=Selector('#BillingNewAddress_ZipPostalCode')
        this.phoneNumber=Selector('#BillingNewAddress_PhoneNumber')
       // this.countinueBtn=Selector('input.button-1.new-address-next-step-button')
       this.countinueBtn=Selector('button').withText('CONTINUE')
        this.nextDayOption=Selector("input[id='shippingoption_1']")
        this.nextShippingBtn=Selector('button').withText('CONTINUE') //Selector('input.button-1.shipping-method-next-step-button')
        this.nextPaymentBtn=Selector('button').withText('CONTINUE')//Selector('input.button-1.payment-method-next-step-button')
        this.nextconfirmBtn=Selector('button').withText('CONTINUE')//('input.button-1.payment-info-next-step-button')
        this.confrimOrderBtn=Selector('button').withText('CONFIRM')//('input.button-1.confirm-order-next-step-button')
        this.orderConfirmationMessage=Selector('strong').withText('Your order has been successfully processed!')
        this.viewOrderdetailLink=Selector('a').withText('Click here for order details.')

    }
    async selectCountry(country){
        const countryOption=this.countryList.find('option');
        await t
        .click(this.countryList)
        .click(countryOption.withText(country))
    }
}

export default new CheckOutPage();