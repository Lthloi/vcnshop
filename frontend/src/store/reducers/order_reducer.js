import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        order: {},
        orders: [],
        countOrder: 0,
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


        getOrdersRequest: (state, action) => {
            state.loading = true
            state.error = null
        },
        getOrdersSuccess: (state, action) => {
            state.loading = false
            state.orders = action.payload.orders
            state.countOrder = action.payload.countOrder
        },
        getOrdersFail: (state, action) => {
            state.loading = false
            state.error = action.payload.error
        }
    }
})

export const {
    createNewOrderRequest, createNewOrderSuccess, createNewOrderFail,
    getOrderRequest, getOrderSuccess, getOrderFail,
    getOrdersRequest, getOrdersSuccess, getOrdersFail,
} = orderSlice.actions

export default orderSlice.reducer