class apiFeature {
    constructor() { }

    #is_falsy_and_non_zero(value) {
        return !value && value !== 0
    }

    check_falsy_numeric(value) {
        return this.#is_falsy_and_non_zero(value)
    }

    check_falsy_numerics(...values) {
        for (let value of values) {
            if (this.#is_falsy_and_non_zero(value))
                return true
        }

        return false
    }
}

const APIFeature = new apiFeature()

export default APIFeature