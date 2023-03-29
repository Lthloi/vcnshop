import { createSlice } from '@reduxjs/toolkit'

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        shop: {},
        loading: false,
        error: false,
    },
    reducers: {
        getShopRequest: (state, action) => {
            state.error = false
            state.loading = true
        },
        getShopSuccess: (state, action) => {
            state.shop = action.payload.shop
            state.loading = false
        },
        getShopFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },
    },
})

export const {
    getShopRequest, getShopSuccess, getShopFail,
} = shopSlice.actions

export default shopSlice.reducer