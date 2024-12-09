/* eslint-disable semi */

// helper for calculating expected prices after sorting
export function getExpectedSortedPrices(prices, sortOrder) {
    const numericPrices = prices.map(price => Number(price.slice(1)));

    const sortedPrices = sortOrder === 'hilo'
        ? numericPrices.sort((a, b) => b - a)
        : numericPrices.sort((a, b) => a - b);

    return sortedPrices.map(price => `$${price}`);
}

// helper for calculating expected names after sorting
export function getExpectedSortedNames(names, sortOrder) {
    return sortOrder === 'az'
        ? [...names].sort()
        : [...names].sort((a, b) => b.localeCompare(a));
}

// helper for generating three unique indexes
export function getUniqueIndexes(productCount) {
    const randomIndexes = new Set();
    const uniqueIndexesCount = Math.min(3, productCount);
    while (randomIndexes.size < uniqueIndexesCount) {
        const randomIndex = Math.floor(Math.random() * productCount);
        randomIndexes.add(randomIndex);
    };
    return randomIndexes;
}

// helper for calculate the expected ItemTotal, TaxAmount, TotalPrice
export function calculateTotalPrice(expectedItemTotal) {
    const tax = 0.08;
    let expectedTaxAmount = (expectedItemTotal * tax).toFixed(2);
    let numberExpectedTaxAmount = Number(expectedTaxAmount);

    let expectedTotalPrice = (expectedItemTotal + numberExpectedTaxAmount).toFixed(2);

    expectedItemTotal = `Item total: $${expectedItemTotal}`;
    expectedTaxAmount = `Tax: $${expectedTaxAmount}`;
    expectedTotalPrice = `Total: $${expectedTotalPrice}`;
    return {
        expectedItemTotal,
        expectedTaxAmount,
        expectedTotalPrice,
    };
}

// helper for price parsing
export function parsePrices(allPrices) {
    return allPrices.map((price) => {
        const priceWithoutDollar = price.slice(1);
        return Number(priceWithoutDollar);
    });
}

// helper for calculating item total
export function calculateItemTotal(allPrices) {
    const numbersAllPrices = parsePrices(allPrices);
    let expectedItemTotal = 0;
        for (let number of numbersAllPrices) {
            expectedItemTotal += number;
        };
    return expectedItemTotal;
}
