import { $ } from '@wdio/globals'
import Page from './page.js';
import { customerUserName, customerPassword} from '../../test/specs/fixtures.js'

class LoginPage extends Page {
   
    get inputUsername () {
        return $('#userName');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }
    get loginButton () {
        return $('#login');
    }

    get headline () { 
        return $('h1')};

    
    get logoutButton () {
        return $('#submit')};

 
    async login () {
        await browser.url('demoqa.com/login')
        await this.inputUsername.setValue(customerUserName);
        await this.inputPassword.setValue(customerPassword);

        await (await this.loginButton).waitForClickable();
        await this.loginButton.click();
    }

    async logout () {
        await (await this.logoutButton).waitForClickable();
        await this.logoutButton.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

export default new LoginPage();
