import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: {},
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


        getOrderRequest: (state, action) => {
            state.loading = true
            state.error = null
        },
        getOrderSuccess: (state, action) => {
            state.loading = false
            state.order = action.payload.order
        },
        getOrderFail: (state, action) => {
            state.loading = false
            state.error = action.payload.error
        },
    }
})

export const {
    createNewOrderRequest, createNewOrderSuccess, createNewOrderFail,
    getOrderRequest, getOrderSuccess, getOrderFail,
} = orderSlice.actions

export default orderSlice.reducer