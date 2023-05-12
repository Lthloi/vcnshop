import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {
        createNewOrderRequest: (state, action) => {
            state.loading = true
            state.error = null
        },
        createNewOrderSuccess: (state, action) => {
            state.loading = true
        },
        createNewOrderFail: (state, action) => {
            state.loading = false
            state.error = action.payload.error
        },
    }
})

export const {
    createNewOrderRequest, createNewOrderSuccess, createNewOrderFail,
} = productsSlice.actions

export default productsSlice.reducer