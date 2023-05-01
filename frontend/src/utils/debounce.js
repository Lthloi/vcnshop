const debounce = (fnc, delay) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => fnc(...args), delay)
    }
}

export default debounce