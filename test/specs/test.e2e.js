import { expect } from '@wdio/globals'
import {customerFirstName, customerLastName, customerUserName, customerPassword, loggedUser, wrongMessage} from '../../test/specs/fixtures.js'
import loginPage from '../pageobjects/login.page.js'


describe('Demoqa Login Page', async () => {

    beforeEach (async() =>
    { 
        await browser.url('demoqa.com/login');
    });

    it('should open login page', async () => {
        await browser.url('demoqa.com/login')

        const title = await $('h2');
        await expect (await title.getText()).toContain('Welcome,');

        const customerUserNameField =  await $('input[id="userName"]');
        await expect(customerUserNameField).toBeDisplayed();
        await expect(customerUserNameField).toBeEnabled();

        const customerPasswordField = await $('input[id="password"]');
        await expect(customerPasswordField).toBeDisplayed();
        await expect(customerPasswordField).toBeEnabled();

        const loginButton = await $('#login');
        await expect(loginButton).toBeClickable();

        const newUserButton = await $('#newUser');
        await expect(newUserButton).toBeClickable();
        
    });

    it('should register new customer', async () => {
        await browser.url('demoqa.com/register')
        const headline = $('h1')
        await expect (await headline.getText()).toEqual('Register');
        const customerFirstNameField =  await $('input[id="firstname"]');
        await customerFirstNameField.setValue(customerFirstName);
        const customerLastNameField =  await $('input[id="lastname"]');
        await customerLastNameField.setValue(customerLastName);
        const customerUserNameField =  await $('input[id="userName"]');
        await customerUserNameField.setValue(customerUserName);
        const customerPasswordField = await $('input[id="password"]');
        await customerPasswordField.setValue(customerPassword);
        await browser.pause(1000);
        
        // reCaptcha picture - don´t know how to proceed :-/
        // const registerButton =  await $('#register');
        // await expect(registerButton).toBeClickable();
        // await registerButton.click();
        // await browser.pause(1000);
        // const currentLoggedCustomer = await $('').getText();
        // await expect (currentLoggedCustomer).toEqual(loggedCustomer);
    });

    it('should redirect to login', async () => {
        await browser.url('demoqa.com/register');
        const headline = $('h1');
        await expect (await headline.getText()).toEqual('Register');
        const redirButton = $('#gotologin');
        await expect(redirButton).toBeClickable();
        await redirButton.click();
        await browser.pause(1000) //poor internet connection
        await expect(await headline.getText()).toEqual('Login');
    });

    it('should redirect to register', async () => {
        await browser.url('demoqa.com/login');
        const headline = $('h1');
        await expect (await headline.getText()).toEqual('Login');
        const newUserButton = $('#newUser');
        await newUserButton.waitForClickable(1000);
        await expect(newUserButton).toBeClickable();
        await newUserButton.click();
        await browser.pause(1000) //poor internet connection
        await expect(await headline.getText()).toEqual('Register');
    });

    it ('should not login user with wrong password', async () => {
        await browser.url('demoqa.com/login');
        const headline = $('h1');
        await expect (await headline.getText()).toEqual('Login');
        
        const customerUserNameField = await $('input[id="userName"]');
        await customerUserNameField.setValue(customerFirstName);

        const customerPasswordField = await $('input[id ="password"]');
        await customerPasswordField.setValue('123');

        const loginButton = await $('#login');
        await loginButton.waitForClickable({ timeout: 3000 });
        await expect (loginButton).toBeClickable();
        await loginButton.click(); 

        await browser.pause(1000); //poor internet connection

        const wrongCredentials = $('#name');
        await expect (await wrongCredentials.getText()).toEqual(wrongMessage);
    });

    it('should not login user with wrong user name', async () =>{
        await browser.url('demoqa.com/login');
        const headline = $('h1');
        await expect (await headline.getText()).toEqual('Login');
        const customerUserNameField = await $('input[id="userName"]');
        await customerUserNameField.setValue('jajin');

        const customerPasswordField = $('input[id="password"]');
        await customerPasswordField.setValue(customerPassword);
        const loginButton = $('#login');
        await expect (loginButton).toBeClickable();
        (await loginButton).click();

        await browser.pause(1000)

        const wrongCredentials = $('#name');
        await expect (await wrongCredentials.getText()).toEqual(wrongMessage);

    });

    it('should login user with valid Credentials', async () =>{
        await browser.url('demoqa.com/login')
        await browser.saveScreenshot('login_page.png');

        await loginPage.login();

        await browser.pause(1000) //poor internet connection
        
        // succesfully logged user check
        
        // await expect (await headline.getText()).toEqual('Profile');  page has been changed, Profile headline is not avalaible anymore

        const currentLoggedUser = $('#userName-value')  ;
        await expect (await currentLoggedUser.getText()).toEqual(loggedUser);
   
    });

    it ('should logout logged user', async ()=>{
        //loggged from previous test
         await browser.url('demoqa.com/books')
         await browser.saveScreenshot('login_page.png');

         await browser.pause(1000) //poor internet connection
        
        // use only for sigle test 
        // await loginPage.login();

        //logout
       
        await loginPage.logout();

        const headline = await $('h1');
        await expect (await headline.getText()).toEqual('Login');


    });
   
   


})


