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
    await app.login.navigate();
    await app.login.performLogin('standard_user', 'secret_sauce');
    });

test.describe('Saucedemo app basic tests', () => {
    test('should login successfully', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        // await app.login.navigate();
        // await app.login.performLogin('standard_user', 'secret_sauce');

        await expect(app.inventory.headerTitle).toBeVisible();

        expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    test('should add and remove product from the cart', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        // await app.login.navigate();
        // await app.login.performLogin('standard_user', 'secret_sauce');
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
        // await app.login.navigate();
        // await app.login.performLogin('standard_user', 'secret_sauce');

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
        const expectedSortedResultAz = [...namesBeforeSort].sort();
        const expectedSortedResultZa = [...namesBeforeSort].sort((a, b) => b.localeCompare(a));

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
});
