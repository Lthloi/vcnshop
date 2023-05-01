const useFloatNumber = () => {
    return (number, number_length = 2) => Number(number.toFixed(number_length))
}

const useCurrencyKeyboard = (currency_letter) => {
    if (!currency_letter) return '$'
    else if (currency_letter === 'U') return '$'
}

const useCurrencyCode = (currency_letter) => {
    if (!currency_letter) return 'USD'
    else if (currency_letter === 'U') return 'USD'
}

export {
    useFloatNumber, useCurrencyKeyboard, useCurrencyCode,
}