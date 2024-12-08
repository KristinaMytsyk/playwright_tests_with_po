import { BaseSwagLabPage } from './BaseSwagLab.page';

const userData = {
    firstName: 'Kristinar',
    lastName: 'Mytsyk',
    postalCode: '49094',
};

export class CheckoutStepOnePage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    firstName = this.page.getByTestId('firstName');

    lastName = this.page.getByTestId('lastName');

    postalCode = this.page.getByTestId('postalCode');

    continueButton = this.page.getByTestId('continue');

    async fillingOutForm(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async fillingOutFormWithUserData() {
        await this.fillingOutForm(userData.firstName, userData.lastName, userData.postalCode);
        await this.continueButton.click();
    }
}
