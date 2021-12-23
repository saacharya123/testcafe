import { Selector,t } from "testcafe";
class LoginPage{
    constructor(){
        this.EmailInput=Selector('#Email');
        this.PasswordInput=Selector('#Password');
        //this.submitButton=Selector('input.button-1.login-button');
        this.submitButton=Selector('button').withText('LOG IN')
        this.AccountHeader=Selector('strong').withText('Returning Customer');
    }

}

export default new LoginPage();