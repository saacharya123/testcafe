import{ClientFunction,Selector} from 'testcafe';
import HomePage from './HomePage';
import ResgisterPage from './ResgisterPage';
import LoginPage from './LoginPage';
import CustomerPage from './CustomerPage';

const dataset=require('./data/data.json');
const url='https://demo.nopcommerce.com/';
const getUrl=ClientFunction(() =>window.location.href);

var randomNumber=Math.floor(Math.random()*1000);
var userEmail='sandeep'+randomNumber+'@test.com';

fixture("Registration Fixture")
    .page(url)
test('Assert Home Page',async t =>{
    await t
        .expect(getUrl()).eql(url)
        .takeScreenshot()
        .expect(HomePage.subtitleHeader.exists).ok();
        console.log('Test Case1 passed')
        

});

dataset.forEach(data =>{

test('User Registartion and Log in test',async t =>{
    await t
    .click(HomePage.RegisterLink)
    .expect(getUrl()).contains('register')
    .click(ResgisterPage.GenderOption)
    .typeText(ResgisterPage.FirstName,data.firstName)
    .typeText(ResgisterPage.LastName,data.lastName)
    await ResgisterPage.selectDay(data.birthDay);
    await ResgisterPage.selectMonth(data.birthMonth);
    await ResgisterPage.selectYear(data.birthYear);
    await t 
    .typeText(ResgisterPage.Email,data.eMail+randomNumber+'@test.com')
    .typeText(ResgisterPage.Password,data.password)
    .typeText(ResgisterPage.ConfirmPassword,data.password)
    .click(ResgisterPage.ResgisterButton)
    .expect(ResgisterPage.SuccessfullMessage.exists).ok()
    .takeScreenshot()
    //Logout
    .click(HomePage.LogOutLink)
    .takeScreenshot()
    //Login
    .click(HomePage.LoginLink)
    .expect(LoginPage.AccountHeader.exists).ok()
    .typeText(LoginPage.EmailInput,data.eMail+randomNumber+'@test.com')
    .typeText(LoginPage.PasswordInput,data.password)
    .click(LoginPage.submitButton)
    .takeScreenshot()
    //GO TO MY ACCOUNT
    .click(HomePage.MyAccountLink)
    //CHECK ORDER IS DISPLAYED
    .expect( CustomerPage.ordersLink.exists).ok()
    .click(CustomerPage.ordersLink)
    .expect(CustomerPage.noOrdersLabel.exists).ok()
    console.log('Test Case2 passed')

    console.log('Username is '+data.eMail+randomNumber+'@test.com'+' '+ 
                'and the password is ' + data.password)
})
});
test('log in failure', async t =>{
    await t
    .click(HomePage.LoginLink)
    .expect(LoginPage.AccountHeader.exists).ok()
    .typeText(LoginPage.EmailInput,userEmail)
    .typeText(LoginPage.PasswordInput,'123456')
    .click(LoginPage.submitButton)
    const ErrorMessage=Selector('div.message-error.validation-summary-errors').withText('Login was unsuccessful. Please correct the errors');
    await t.expect(ErrorMessage.exists).ok()
    console.log(await ErrorMessage.textContent)
    console.log('Test Case 3 is Passed')
    await t.takeScreenshot();

})