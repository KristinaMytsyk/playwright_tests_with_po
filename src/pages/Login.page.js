import { BasePage } from './Base.page';

const standardUser = {
    userName: 'standard_user',
    password: 'secret_sauce',
};
export class LoginPage extends BasePage {
    userNameInput = this.page.locator('#user-name');

    passwordInput = this.page.locator('#password');

    loginButton = this.page.locator('#login-button');

    async performLogin(userName, password) {
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginAsStandardUser() {
        await this.navigate();
        await this.performLogin(standardUser.userName, standardUser.password);
    }
}
