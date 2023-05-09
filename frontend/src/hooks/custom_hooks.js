import { useLocation, useNavigate } from "react-router-dom"

const useFloatNumber = () => (number, number_length = 2) => Number(number.toFixed(number_length))

const useCurrencyKeyboard = () => (currency_letter) => {
    if (!currency_letter) return '$'
    else if (currency_letter === 'U') return '$'
}

const useCurrencyCode = () => (currency_letter) => {
    if (!currency_letter) return 'USD'
    else if (currency_letter === 'U') return 'USD'
}

//navigate to login route with query string is redirect
const useNavToRedirectLogin = () => {
    let redirect_route = useLocation().pathname
    let navigate = useNavigate()
    return () => {
        if (redirect_route !== '/') navigate('/auth/login?redirect=' + redirect_route.slice(1, redirect_route.length))
        else navigate('/auth/login')
    }
}

const useNumerToWords = () => (number, currency_code = 'USD') => {
    let oneToTwenty = [
        '', 'one ', 'two ', 'three ', 'four ', 'five ',
        'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ',
        'twelve ', 'thirteen ', 'fourteen ', 'fifteen ',
        'sixteen ', 'seventeen ', 'eighteen ', 'nineteen ',
    ]
    let tenth = [
        '', '', 'twenty', 'thirty', 'forty', 'fifty',
        'sixty', 'seventy', 'eighty', 'ninety',
    ]

    let numberStr = `${number}`

    let dot_index = numberStr.indexOf('.')
    let remainder = ''
    let remainder_in_words = ''

    if (dot_index > 0) {
        remainder = numberStr.slice(dot_index + 1, dot_index + 3) //length === 2

        if (remainder.length === 2) {
            let tenth_part = tenth[remainder[0] * 1]
            remainder_in_words = tenth_part ? tenth_part + ' ' + oneToTwenty[remainder[1] * 1] : oneToTwenty[remainder * 1]
        }
        else
            remainder_in_words = tenth[remainder[0] * 1] || 'ten '

        numberStr = numberStr.slice(0, dot_index)
    }

    if (numberStr.length > 7) return null

    let matcher = `0000000${numberStr}`.slice(-7).match(/^(\d{1})(\d{1})(\d{2})(\d{1})(\d{2})$/)
    if (!matcher) return null

    let words = ''

    if (numberStr * 1 === 0)
        words += 'zero'
    else {
        words += matcher[1] * 1 !== 0 ? (oneToTwenty[matcher[1]] || tenth[matcher[1][0]] + ' ' +
            oneToTwenty[matcher[1][1]]) + 'million ' : ''
        words += matcher[2] * 1 !== 0 ? (oneToTwenty[matcher[2]] || tenth[matcher[2][0]] + ' ' +
            oneToTwenty[matcher[2][1]]) + 'hundred ' : ''
        words += matcher[3] * 1 !== 0 ? (oneToTwenty[matcher[3]] || tenth[matcher[3][0]] + ' ' +
            oneToTwenty[matcher[3][1]]) + 'thousand ' : ''
        words += matcher[4] * 1 !== 0 ? (oneToTwenty[matcher[4]] || tenth[matcher[4][0]] + ' ' +
            oneToTwenty[matcher[4][1]]) + 'hundred ' : ''
        words += matcher[5] * 1 !== 0 ? (oneToTwenty[matcher[5]] || tenth[matcher[5][0]] + ' ' +
            oneToTwenty[matcher[5][1]]) : ''
    }

    if (currency_code === 'USD') 
        words += number > 1 ? ' dollars' : ' dollar'

    if (remainder.length > 0)
        words += ' and ' + remainder_in_words + (remainder * 1 > 1 ? ' cents' : ' cent')

    return words
}

export {
    useFloatNumber, useCurrencyKeyboard, useCurrencyCode,
    useNavToRedirectLogin, useNumerToWords,
}