import { createSlice, current } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems"))
            :
            [],
        loading: false,
        error: false,
    },
    reducers: {
        addProductToCartRequest: (state) => {
            state.loading = true
            state.error = false
        },
        addProductToCartSuccess: (state, action) => {
            let { addProduct, productStock, currentQuantity } = action.payload
            let current_cartItems = current(state).cartItems

            if (currentQuantity) {
                addProduct.quantity = currentQuantity + 1 > productStock ? productStock : currentQuantity + 1

                current_cartItems = current_cartItems.filter(({ _id }) => _id !== addProduct._id)
            }

            state.cartItems = [addProduct, ...current_cartItems]

            state.loading = false
        },
        addProductToCartFail: (state, action) => {
            state.error = action.payload.error || false
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
        removeItemFromCartRequest: (state, action) => {
            let { productId } = action.payload

            state.cartItems = current(state).cartItems.filter(({ _id }) => _id !== productId)
        },
        removeItemFromCartFail: (state, action) => {
            state.error = action.payload.error
        }
    },
})

export const {
    addProductToCartRequest, addProductToCartSuccess, addProductToCartFail,
    changeQuantityRequest, changeQuantityFail,
    removeItemFromCartRequest, removeItemFromCartFail,
} = cartSlice.actions

export default cartSlice.reducer