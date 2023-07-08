import { createSlice, current } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems'))
            :
            [],
        shippingInfo: localStorage.getItem('shippingInfo') ?
            JSON.parse(localStorage.getItem('shippingInfo'))
            :
            null,
        loading: false,
        error: null,
    },
    reducers: {
        addProductToCartRequest: (state) => {
            state.loading = true
            state.error = null
        },
        addProductToCartSuccess: (state, action) => {
            let { product_to_add } = action.payload
            let current_cartItems = current(state).cartItems

            let existing_product = current_cartItems.find(({ _id }) => product_to_add._id === _id)
            if (existing_product) {
                product_to_add.quantity++

                current_cartItems = current_cartItems.filter(({ _id }) => _id !== product_to_add._id)
            }

            state.cartItems = [product_to_add, ...current_cartItems]
            state.loading = false
        },
        addProductToCartFail: (state, action) => {
            state.error = action.payload.error || null
            state.loading = false
        },


        changeQuantityRequest: (state, action) => {
            let { productId, option } = action.payload

            state.cartItems = current(state).cartItems.map((item) => {
                if (item._id === productId) return ({ ...item, quantity: item.quantity + option })
                else return item
            })
        },
        changeQuantityFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },


        removeItem: (state, action) => {
            let { productId } = action.payload

            state.cartItems = current(state).cartItems.filter(({ _id }) => _id !== productId)
        },
    },
})

export const {
    addProductToCartRequest, addProductToCartSuccess, addProductToCartFail,
    changeQuantityRequest, changeQuantityFail,
    removeItem,
    initPaymentRequest, initPaymentSuccess, initPaymentFail,
} = cartSlice.actions

export default cartSlice.reducer