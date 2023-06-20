import { createSlice, current } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'product',
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
                newReviewProcessing: false,
            },
            loading: false,
            error: null,
        },
    },
    reducers: {
        createNewProductRequest: (state, action) => {
            state.productDetail.loading = true
            state.productDetail.error = null
        },
        createNewProductSuccess: (state, action) => {
            state.productDetail.loading = false
        },
        createNewProductFail: (state, action) => {
            state.productDetail.loading = false
            state.productDetail.error = action.payload.error
        },


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
            state.productDetail.reviewsState.newReviewProcessing = false
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


        getReviewsRequest: (state, action) => {
            state.productDetail.reviewsState.error = null
            state.productDetail.reviewsState.loading = true
        },
        getReviewsSuccess: (state, action) => {
            state.productDetail.reviewsState.reviews = action.payload.reviews
            state.productDetail.reviewsState.loading = false
        },
        getReviewsFail: (state, action) => {
            state.productDetail.reviewsState.error = action.payload.error
            state.productDetail.reviewsState.loading = false
        },


        newReviewRequest: (state, action) => {
            state.productDetail.reviewsState.newReviewProcessing = true
            state.productDetail.reviewsState.error = null
        },
        newReviewSuccess: (state, action) => {
            let { newReview, newAverageRating, newCountReview } = action.payload
            let update_reviews = current(state).productDetail.reviewsState.reviews
                .filter(({ user_id }) => user_id !== newReview.user_id)

            state.productDetail.reviewsState.newReviewProcessing = false

            state.productDetail.reviewsState.reviews = [newReview, ...update_reviews]

            state.productDetail.product.review.average_rating = newAverageRating
            state.productDetail.product.review.count_review = newCountReview
        },
        newReviewFail: (state, action) => {
            state.productDetail.reviewsState.newReviewProcessing = false
            state.productDetail.reviewsState.error = action.payload.error
        },
    }
})

export const {
    getProductsRequest, getProductsSuccess, getProductsFail,
    getTopWeekRequest, getTopWeekSuccess, getTopWeekFail,
    getBestSellingRequest, getBestSellingSuccess, getBestSellingFail,
    getProductDetailRequest, getProductDetailSuccess, getProductDetailFail,
    newReviewRequest, newReviewSuccess, newReviewFail,
    getReviewsRequest, getReviewsSuccess, getReviewsFail,
    createNewProductRequest, createNewProductSuccess, createNewProductFail,
} = productsSlice.actions

export default productsSlice.reducer