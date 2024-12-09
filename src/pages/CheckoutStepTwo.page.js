import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutStepTwoPage extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    cartItemSelector = '.cart_item';

    cartItems = this.page.locator(this.cartItemSelector);

    pricesElements = this.page.getByTestId('inventory-item-price');

    itemTotal = this.page.getByTestId('subtotal-label');

    taxAmount = this.page.getByTestId('tax-label');

    totalPrice = this.page.getByTestId('total-label');

    async getAllPrices() {
        return this.pricesElements.allTextContents();
    }
}
