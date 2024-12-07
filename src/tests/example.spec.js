/* eslint-disable semi */
/* eslint-disable playwright/expect-expect */
import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { getExpectedSortedPrices, getExpectedSortedNames } from '../helper';

const sortOptions = {
    hilo: 'hilo',
    lohi: 'lohi',
    az: 'az',
    za: 'za',
}

test.beforeEach(async (
    /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
    await app.login.loginAsStandardUser();
    });

test.describe('Saucedemo app basic tests', () => {
    test('should login successfully', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await expect(app.inventory.headerTitle).toBeVisible();

        expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    test('should add and remove product from the cart', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.inventory.addItemToCartById(0);
        expect(await app.inventory.getNumberOfItemsInCart()).toBe('1');

        await app.inventory.shoppingCart.click();
        expect(await app.shoppingCart.cartItems.count()).toBeGreaterThanOrEqual(1);

        await app.shoppingCart.removeCartItemById(0);
        await expect(app.shoppingCart.cartItems).not.toBeAttached();
    });

    test('perform and verify sorting on the Inventory page', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app},
    ) => {
        // get all prices -> array of price
        const pricesBeforeSort = await app.inventory.getAllPrices();

        // sort all prices -> sorted array of prices -> expectedSortedResults
        // const expectedSortedResultHilo = pricesBeforeSort
        //     .map((price) => {
        //         const priceWithoutDollar = price.slice(1);
        //         return Number(priceWithoutDollar);
        //     })
        //     .sort((a, b) => b - a)
        //     .map((price) => `$${price}`);

        // const expectedSortedResultLohi = pricesBeforeSort
        //     .map((price) => {
        //         const priceWithoutDollar = price.slice(1);
        //         return Number(priceWithoutDollar);
        //     })
        //     .sort((a, b) => a - b)
        //     .map((price) => `$${price}`);
        const expectedSortedResultHilo = getExpectedSortedPrices(pricesBeforeSort, 'hilo');
        const expectedSortedResultLohi = getExpectedSortedPrices(pricesBeforeSort, 'lohi');

        // perform sort by clicking on page (hilo)
        await app.inventory.sortItems(sortOptions.hilo);

        // get all prices -> array of prices -> actualSortedResults
        const actualSortedResultsHilo = await app.inventory.getAllPrices();

        expect(actualSortedResultsHilo).toEqual(expectedSortedResultHilo);

        // perform sort by clicking on page (lohi)
        await app.inventory.sortItems(sortOptions.lohi);

        // get all prices -> array of prices -> actualSortedResults
        const actualSortedResultsLohi = await app.inventory.getAllPrices();

        expect(actualSortedResultsLohi).toEqual(expectedSortedResultLohi);

        // get all names -> array of name
        const namesBeforeSort = await app.inventory.getAllNames();

        // sort all names -> sorted array of names -> expectedSortedResults
        // const expectedSortedResultAz = [...namesBeforeSort].sort();
        // const expectedSortedResultZa = [...namesBeforeSort].sort((a, b) => b.localeCompare(a));
        const expectedSortedResultAz = getExpectedSortedNames(namesBeforeSort, 'az');
        const expectedSortedResultZa = getExpectedSortedNames(namesBeforeSort, 'za');

        // perform sort by clicking on page (az)
        await app.inventory.sortItems(sortOptions.az);

        // get all names -> array of names -> actualSortedResults
        const actualSortedResultsAz = await app.inventory.getAllNames();

        expect(actualSortedResultsAz).toEqual(expectedSortedResultAz);

        // perform sort by clicking on page (za)
        await app.inventory.sortItems(sortOptions.za);

        // get all names -> array of names -> actualSortedResults
        const actualSortedResultsZa = await app.inventory.getAllNames();

        expect(actualSortedResultsZa).toEqual(expectedSortedResultZa);
    });

    test('check Name, Description, and Price values of several added random products in the Shopping Cart', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        // get all the elements of the products
        const products = await app.inventory.product;
        const productCount = await products.count();

        // generate three unique indexes
        const randomIndexes = new Set();
        const uniqueIndexesCount = Math.min(3, productCount);
        while (randomIndexes.size < uniqueIndexesCount) {
            const randomIndex = Math.floor(Math.random() * productCount);
            randomIndexes.add(randomIndex);
        }

        // store information about selected products
        const selectedProducts = [];

        for (const index of randomIndexes) {
            const product = products.nth(index);
            const name = await product.getByTestId('inventory-item-name').textContent();
            const description = await product.getByTestId('inventory-item-desc').textContent();
            const price = await product.getByTestId('inventory-item-price').textContent();

            // add product to cart
            const addToCartButton = product.locator('[data-test^="add-to-cart"]');
            await addToCartButton.click();

            // store product data
            selectedProducts.push({ name, description, price });
        }

        // go to the shopping cart
        await app.inventory.shoppingCart.click();

        // check that the number of products in the cart meets the expectations
        const cartItems = await app.shoppingCart.cartItems;
        expect(await cartItems.count()).toBe(selectedProducts.length);

        // check every product in the cart
        for (let i = 0; i < selectedProducts.length; i++) {
            const cartItem = cartItems.nth(i);

            const cartName = await cartItem.getByTestId('inventory-item-name').textContent();
            const cartDescription = await cartItem.getByTestId('inventory-item-desc').textContent();
            const cartPrice = await cartItem.getByTestId('inventory-item-price').textContent();

            expect(cartName).toBe(selectedProducts[i].name);
            expect(cartDescription).toBe(selectedProducts[i].description);
            expect(cartPrice).toBe(selectedProducts[i].price);
        }
    });

    
    test('check info about several added random products and Total Price on the "Checkout: Overview" page', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        // get all the elements of the products
        const products = await app.inventory.product;
        const productCount = await products.count();

        // generate three unique indexes
        const randomIndexes = new Set();
        const uniqueIndexesCount = Math.min(3, productCount);
        while (randomIndexes.size < uniqueIndexesCount) {
            const randomIndex = Math.floor(Math.random() * productCount);
            randomIndexes.add(randomIndex);
        }

        // store information about selected products
        const selectedProducts = [];

        for (const index of randomIndexes) {
            const product = products.nth(index);
            const name = await product.getByTestId('inventory-item-name').textContent();
            const description = await product.getByTestId('inventory-item-desc').textContent();
            const price = await product.getByTestId('inventory-item-price').textContent();

            // add product to cart
            const addToCartButton = product.locator('[data-test^="add-to-cart"]');
            await addToCartButton.click();

            // store product data
            selectedProducts.push({ name, description, price });
        }

        // go to the shopping cart
        await app.inventory.shoppingCart.click();

        // Checkout: Add Information
        await app.shoppingCart.checkoutButton.click();

        // filling out the form
        await app.checkoutStepOne.firstName.fill('Kristina');
        await app.checkoutStepOne.lastName.fill('Mytsyk');
        await app.checkoutStepOne.postalCode.fill('49094');

        await app.checkoutStepOne.continueButton.click();

        // check every product on the "Checkout: Overview" page
        const checkoutItems = await app.checkoutStepTwo.cartItems;

        for (let i = 0; i < selectedProducts.length; i++) {
            const checkoutItem = checkoutItems.nth(i);

            const checkoutName = await checkoutItem.getByTestId('inventory-item-name').textContent();
            const checkoutDescription = await checkoutItem.getByTestId('inventory-item-desc').textContent();
            const checkoutPrice = await checkoutItem.getByTestId('inventory-item-price').textContent();

            expect(checkoutName).toBe(selectedProducts[i].name);
            expect(checkoutDescription).toBe(selectedProducts[i].description);
            expect(checkoutPrice).toBe(selectedProducts[i].price);
        }

        // verify calculated Total Price
        // get all prices
        const allPrices = await app.checkoutStepTwo.getAllPrices();

        const numbersAllPrices = allPrices
            .map((price) => {
                const priceWithoutDollar = price.slice(1);
                return Number(priceWithoutDollar);
            });

        // calculate the expected ItemTotal, TaxAmount, TotalPrice
        let expectedItemTotal = 0;
        for (let number of numbersAllPrices) {
            expectedItemTotal += number;
        };

        let tax = 0.08;
        let expectedTaxAmount = (expectedItemTotal * tax).toFixed(2);
        let numberExpectedTaxAmount = Number(expectedTaxAmount);

        let expectedTotalPrice = (expectedItemTotal + numberExpectedTaxAmount).toFixed(2);

        expectedItemTotal = `Item total: $${expectedItemTotal}`;
        expectedTaxAmount = `Tax: $${expectedTaxAmount}`;
        expectedTotalPrice = `Total: $${expectedTotalPrice}`;

        // get the actual ItemTotal, TaxAmount, TotalPrice
        const actualItemTotal = await app.checkoutStepTwo.itemTotal.textContent();
        const actualTaxAmount = await app.checkoutStepTwo.taxAmount.textContent();
        const actualTotalPrice = await app.checkoutStepTwo.totalPrice.textContent();

        // check the actual values of ItemTotal, TaxAmount, TotalPrice
        expect(actualItemTotal).toEqual(expectedItemTotal);
        expect(actualTaxAmount).toEqual(expectedTaxAmount);
        expect(actualTotalPrice).toEqual(expectedTotalPrice);
    })
});
