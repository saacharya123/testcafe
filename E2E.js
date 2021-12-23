import{ClientFunction,Selector,t} from 'testcafe';
import HomePage from './HomePage';
import ResgisterPage from './ResgisterPage';
import LoginPage from './LoginPage';
import CustomerPage from './CustomerPage';
import ProductDetailsPage from './ProductDetailsPage';
import CartPage from './CartPage';
import CheckOutPage from './CheckOutPage';
import SearchResultPage from './SearchResultPage';

const url='https://demo.nopcommerce.com/';
const getUrl=ClientFunction(() =>window.location.href);

var randomNumber=Math.floor(Math.random()*1000);
var userEmail='sandeep'+randomNumber+'@test.com';

fixture("E2E Fixture")
    .page(url)
test('Assert Home Page',async t =>{
    await t
    .expect(getUrl()).eql(url)
    .takeScreenshot()
    .expect(HomePage.subtitleHeader.exists).ok();
    console.log('Test Case1 passed')
});

test('Placing an Order',async t =>{
    await t
    .click(HomePage.RegisterLink)
    .expect(getUrl()).contains('register')
    .click(ResgisterPage.GenderOption)
    .typeText(ResgisterPage.FirstName,'Sandeep')
    .typeText(ResgisterPage.LastName,'Acharya')
    await ResgisterPage.selectDay('5');
    await ResgisterPage.selectMonth('November');
    await ResgisterPage.selectYear('1990');
    await t 
    .typeText(ResgisterPage.Email,userEmail)
    .typeText(ResgisterPage.Password,'1234567')
    .typeText(ResgisterPage.ConfirmPassword,'1234567')
    .click(ResgisterPage.ResgisterButton)
    .expect(ResgisterPage.SuccessfullMessage.exists).ok();
    console.log('Username is '+userEmail+' '+ 'and the password is 1234567')
    await HomePage.search('Apple MacBook Pro 13-inch');
    await t
    //SEARCH RESULTS
    .click(SearchResultPage.productTitle)
    .expect(getUrl()).contains('apple-macbook-pro-13-inch')
    //PRODUCT DEATILS
    .expect(ProductDetailsPage.productprice.exists).ok()
    .selectText(ProductDetailsPage.productQuantity).pressKey("delete")
    .typeText(ProductDetailsPage.productQuantity,'3')
    .click(ProductDetailsPage.addToCart)
    .expect(ProductDetailsPage.successMessage.exists).ok()
    .wait(3000)
    //CART AND CHECKOUT
    .click(HomePage.ShoppingCart)
    .click(CartPage.termslebel)
    .click(CartPage.checkoutButton)
    .expect(getUrl()).contains('checkout')
    //PLACE ORDER
    await CheckOutPage.selectCountry('Indian')
    await t
    .takeScreenshot()
    .typeText(CheckOutPage.cityList,'Berlin')
    .typeText(CheckOutPage.address1,'Get away street')
    .typeText(CheckOutPage.address2,'2nd line')
    .typeText(CheckOutPage.zipCode,'1234567')
    .typeText(CheckOutPage.phoneNumber,'1234545678')
    .click(CheckOutPage.countinueBtn)
    .click(CheckOutPage.nextDayOption)       
    .click(CheckOutPage.nextShippingBtn)    
    .click(CheckOutPage.nextPaymentBtn)      
    .click(CheckOutPage.nextconfirmBtn)      
    .click(CheckOutPage.confrimOrderBtn)
    .expect(CheckOutPage.orderConfirmationMessage.exists).ok()
    .click(CheckOutPage.viewOrderdetailLink)     
    //MY ACCOUNT
    .click(HomePage.MyAccountLink)
    .click(CustomerPage.ordersLink) 
    .takeScreenshot()
});


test('currency change testing ',async t =>{
    await
    HomePage.changeCurrency('Euro')
    await t.takeScreenshot()
});