import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    productSort = this.page.getByTestId('product-sort-container');

    activeOption = this.page.getByTestId('active-option');

    pricesElements = this.page.getByTestId('inventory-item-price');

    namesElements = this.page.getByTestId('inventory-item-name');

    product = this.page.getByTestId('inventory-item');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async sortItems(sortOption) {
        await this.productSort.selectOption(sortOption);
    }

    async getAllPrices() {
        return this.pricesElements.allTextContents();
    }

    async getAllNames() {
        return this.namesElements.allTextContents();
    }

    async shoppingCartClick() {
        await this.shoppingCart.click();
    }

    async addedItemToCartInfoByIndex(randomIndexes) {
        const selectedProducts = [];

        for (const index of randomIndexes) {
            // get information about selected products
            const product = this.product.nth(index);
            const name = await product.getByTestId('inventory-item-name').textContent();
            const description = await product.getByTestId('inventory-item-desc').textContent();
            const price = await product.getByTestId('inventory-item-price').textContent();

            // add product to cart
            const addToCartButton = product.locator('[data-test^="add-to-cart"]');
            await addToCartButton.click();

            // store product data
            selectedProducts.push({ name, description, price });
        }
        return selectedProducts;
    }
}
