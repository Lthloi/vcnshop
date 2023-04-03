// file for features

const debounce = (fnc, delay) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fnc(...args), delay)
    }
}

const getFloatNumber = (number = 0, remainder_size = 2) => {
    return number.toFixed(remainder_size) * 1
}

const convertPriceToPriceString = (cost = 0, currency = 'U') => {
    if (currency === 'U') return '$' + cost
    //...
}

export {
    debounce, getFloatNumber, convertPriceToPriceString,
}