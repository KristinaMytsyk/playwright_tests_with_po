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

    // const pricesBeforeSort = await app.inventory.getAllPrices();

    // async expectedSortedResuls() {
    //     const expectedSortedResultHilo = pricesBeforeSort
    //         .map((price) => {
    //             const priceWithoutDollar = price.slice(1);
    //             return Number(priceWithoutDollar);
    //         })
    //         .sort((a, b) => b - a)
    //         .map((price) => `$${price}`);
    //     return expectedSortedResultHilo;
    // }

}
