import { createSlice, current } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        countProduct: 0,
        search: {
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
        productDetail: {
            product: {},
            reviewsState: {
                loading: false,
                error: null,
                reviews: [],
            },
            loading: false,
            error: null,
            newReviewProcessing: false,
        },
    },
    reducers: {
        getProductsRequest: (state, action) => {
            state.search.error = null
            state.search.loading = true
        },
        getProductsSuccess: (state, action) => {
            state.search.products = action.payload.products
            state.countProduct = action.payload.countProduct
            state.search.loading = false
        },
        getProductsFail: (state, action) => {
            state.search.error = action.payload.error
            state.search.loading = false
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


        getProductDetailRequest: (state, action) => {
            state.productDetail.error = null
            state.productDetail.newReviewProcessing = false
            state.productDetail.loading = true
        },
        getProductDetailSuccess: (state, action) => {
            state.productDetail.product = action.payload.product
            state.productDetail.loading = false
        },
        getProductDetailFail: (state, action) => {
            state.productDetail.error = action.payload.error
            state.productDetail.loading = false
        },


        getReviewRequest: (state, action) => {
            state.productDetail.reviewsState.error = null
            state.productDetail.reviewsState.loading = true
        },
        getReviewSuccess: (state, action) => {
            state.productDetail.reviewsState.reviews = action.payload.reviews
            state.productDetail.reviewsState.loading = false
        },
        getReviewFail: (state, action) => {
            state.productDetail.reviewsState.error = action.payload.error
            state.productDetail.reviewsState.loading = false
        },


        newReviewRequest: (state, action) => {
            state.productDetail.newReviewProcessing = true
        },
        newReviewSuccess: (state, action) => {
            let { newReview, newAverageRating, newCountReview } = action.payload

            let current_reviews = current(state).reviewsState.reviews.filter(({ email }) => email !== newReview.email)

            state.productDetail.reviewsState.reviews = [newReview, ...current_reviews]

            state.productDetail.product.review.average_rating = newAverageRating
            state.productDetail.product.review.count_review = newCountReview

            state.productDetail.newReviewProcessing = false
        },
        newReviewFail: (state, action) => {
            state.productDetail.newReviewProcessing = false
        },
    }
})

export const {
    getProductsRequest, getProductsSuccess, getProductsFail,
    getTopWeekRequest, getTopWeekSuccess, getTopWeekFail,
    getBestSellingRequest, getBestSellingSuccess, getBestSellingFail,
    getProductDetailRequest, getProductDetailSuccess, getProductDetailFail,
    newReviewRequest, newReviewSuccess, newReviewFail,
    getReviewRequest, getReviewSuccess, getReviewFail,
} = productsSlice.actions

export default productsSlice.reducer