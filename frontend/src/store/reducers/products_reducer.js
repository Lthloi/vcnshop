import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        countProduct: 0,
        productsSearch: {
            loading: false,
            error: null,
            products: [],
        },
        topWeek: {
            loading: false,
            error: null,
            products: [],
        },
        bestSelling: {
            loading: false,
            error: null,
            products: [],
        },
    },
    reducers: {
        getProductsRequest: (state, action) => {
            state.productsSearch.error = null
            state.productsSearch.loading = true
        },
        getProductsSuccess: (state, action) => {
            state.productsSearch.products = action.payload.products
            state.countProduct = action.payload.countProduct
            state.productsSearch.loading = false
        },
        getProductsFail: (state, action) => {
            state.productsSearch.error = action.payload.error
            state.productsSearch.loading = false
        },


        getTopWeekRequest: (state, action) => {
            state.topWeek.error = null
            state.topWeek.loading = true
        },
        getTopWeekSuccess: (state, action) => {
            state.topWeek.products = action.payload.products
            state.topWeek.loading = false
        },
        getTopWeekFail: (state, action) => {
            state.topWeek.error = action.payload.error
            state.topWeek.loading = false
        },

        
        getBestSellingRequest: (state, action) => {
            state.bestSelling.error = null
            state.bestSelling.loading = true
        },
        getBestSellingSuccess: (state, action) => {
            state.bestSelling.products = action.payload.products
            state.bestSelling.loading = false
        },
        getBestSellingFail: (state, action) => {
            state.bestSelling.error = action.payload.error
            state.bestSelling.loading = false
        },
    }
})

export const {
    getProductsRequest, getProductsSuccess, getProductsFail,
    getTopWeekRequest, getTopWeekSuccess, getTopWeekFail,
    getBestSellingRequest, getBestSellingSuccess, getBestSellingFail,
} = productsSlice.actions

export default productsSlice.reducer