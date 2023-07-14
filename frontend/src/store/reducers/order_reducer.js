import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        currentPage: 1,
        currentTab: null,
        order: {},
        orders: [],
        countOrders: 0,
        loading: false,
        error: null,
        paymentCompleted: false
    },
    reducers: {
        completeOrderRequest: (state, action) => {
            state.loading = true
            state.error = null
            state.paymentCompleted = false
        },
        completeOrderSuccess: (state, action) => {
            state.loading = true
            state.paymentCompleted = true
        },
        completeOrderFail: (state, action) => {
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

            let { currentPage, countOrders, currentTab } = action.payload
            state.countOrders = countOrders
            state.currentPage = currentPage
            state.currentTab = currentTab
        },
        getOrdersFail: (state, action) => {
            state.loading = false
            state.error = action.payload.error
        }
    }
})

export const {
    completeOrderRequest, completeOrderSuccess, completeOrderFail,
    getOrderRequest, getOrderSuccess, getOrderFail,
    getOrdersRequest, getOrdersSuccess, getOrdersFail,
} = orderSlice.actions

export default orderSlice.reducer