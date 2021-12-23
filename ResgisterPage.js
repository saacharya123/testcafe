import { Selector,t } from "testcafe";

class ResgisterPage{
    constructor(){
        this.GenderOption=Selector('#gender-male')
        this.FirstName=Selector('#FirstName')
        this.LastName=Selector('#LastName')
        this.DateOfBirthDay=Selector('select[name="DateOfBirthDay"]')
        this.DateOfBirthMonth=Selector('select[name="DateOfBirthMonth"]')
        this.DateOfBirthYear=Selector('select[name="DateOfBirthYear"]')
        this.Email=Selector('#Email')
        this.Company=Selector('#Company')
        this.Password=Selector('#Password')
        this.ConfirmPassword=Selector('#ConfirmPassword')
        this.ResgisterButton=Selector('#register-button.button-1.register-next-step-button')
        this.SuccessfullMessage=Selector('div.result').withText('Your registration completed');
  
    }

    async selectDay(day){
        const DayOption=this.DateOfBirthDay.find('option');
        await t
        .click(this.DateOfBirthDay)
        .click(DayOption.withText(day))
    }

    async selectMonth(month){
        const MonthOption=this.DateOfBirthMonth.find('option');
        await t
        .click(this.DateOfBirthMonth)
        .click(MonthOption.withText(month))
    }

    async selectYear(year){
        const YearsOption=this.DateOfBirthYear.find('option');
        await t
        .click(this.DateOfBirthYear)
        .click(YearsOption.withText(year))
    }
}

export default new ResgisterPage();