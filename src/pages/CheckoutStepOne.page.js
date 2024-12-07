import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutStepOnePage extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    firstName = this.page.getByTestId('firstName');

    lastName = this.page.getByTestId('lastName');

    postalCode = this.page.getByTestId('postalCode');

    continueButton = this.page.getByTestId('continue');
}
