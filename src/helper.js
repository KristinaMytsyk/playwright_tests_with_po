/* eslint-disable semi */

// Хелпер для обчислення очікуваних цін після сортування
export function getExpectedSortedPrices(prices, sortOrder) {
    const numericPrices = prices.map(price => Number(price.slice(1)));

    const sortedPrices = sortOrder === 'hilo'
        ? numericPrices.sort((a, b) => b - a)
        : numericPrices.sort((a, b) => a - b);

    return sortedPrices.map(price => `$${price}`);
}

// Хелпер для обчислення очікуваних імен після сортування
export function getExpectedSortedNames(names, sortOrder) {
    return sortOrder === 'az'
        ? [...names].sort()
        : [...names].sort((a, b) => b.localeCompare(a));
}
