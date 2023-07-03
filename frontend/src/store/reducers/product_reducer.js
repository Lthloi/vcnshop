import { createSlice, current } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'product',
    initialState: {
        countProducts: 0,
        currentPage: 1,
        loading: false,
        error: null,
        products: [],

        reviewsState: {
            loading: false,
            error: null,
            reviews: [],
            newReviewProcessing: false,
        },
        productDetail: {
            product: {},
            loading: false,
            error: null,
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
        createNewProductRequest: (state, action) => {
            state.productDetail.loading = true
            state.productDetail.error = null
        },
        createNewProductSuccess: (state, action) => {
            state.productDetail.loading = false

            // let product = action.payload.product
            // let current_products = current(state).products
            // state.products = [product, ...current_products]
        },
        createNewProductFail: (state, action) => {
            state.productDetail.loading = false
            state.productDetail.error = action.payload.error
        },


        updateProductRequest: (state, action) => {
            state.productDetail.loading = true
            state.productDetail.error = null
        },
        updateProductSuccess: (state, action) => {
            state.productDetail.loading = false

            // let products = current(state).products
            // let updated_product = action.payload.product
            // for (let product of products)
            //     if (product._id === updated_product._id)
            //         product = { ...product, ...updated_product }

            // state.products = products
        },
        updateProductFail: (state, action) => {
            state.productDetail.loading = false
            state.productDetail.error = action.payload.error
        },


        getProductsRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        getProductsSuccess: (state, action) => {
            state.products = action.payload.products
            state.countProducts = action.payload.countProducts
            state.currentPage = action.payload.currentPage
            state.loading = false
        },
        getProductsFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
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


        getProductRequest: (state, action) => {
            state.productDetail.error = null
            state.reviewsState.newReviewProcessing = false
            state.productDetail.loading = true
        },
        getProductSuccess: (state, action) => {
            state.productDetail.product = action.payload.product
            state.productDetail.loading = false
        },
        getProductFail: (state, action) => {
            state.productDetail.error = action.payload.error
            state.productDetail.loading = false
        },


        getReviewsRequest: (state, action) => {
            state.reviewsState.error = null
            state.reviewsState.loading = true
        },
        getReviewsSuccess: (state, action) => {
            state.reviewsState.reviews = action.payload.reviews
            state.reviewsState.loading = false
        },
        getReviewsFail: (state, action) => {
            state.reviewsState.error = action.payload.error
            state.reviewsState.loading = false
        },


        newReviewRequest: (state, action) => {
            state.reviewsState.newReviewProcessing = true
            state.reviewsState.error = null
        },
        newReviewSuccess: (state, action) => {
            let { newReview, newAverageRating, newCountReview } = action.payload
            let update_reviews = current(state).reviewsState.reviews
                .filter(({ user_id }) => user_id !== newReview.user_id)

            state.reviewsState.newReviewProcessing = false

            state.reviewsState.reviews = [newReview, ...update_reviews]

            state.productDetail.product.review.average_rating = newAverageRating
            state.productDetail.product.review.count_review = newCountReview
        },
        newReviewFail: (state, action) => {
            state.reviewsState.newReviewProcessing = false
            state.reviewsState.error = action.payload.error
        },
    }
})

export const {
    getProductsRequest, getProductsSuccess, getProductsFail,
    getTopWeekRequest, getTopWeekSuccess, getTopWeekFail,
    getBestSellingRequest, getBestSellingSuccess, getBestSellingFail,
    getProductRequest, getProductSuccess, getProductFail,
    newReviewRequest, newReviewSuccess, newReviewFail,
    getReviewsRequest, getReviewsSuccess, getReviewsFail,
    createNewProductRequest, createNewProductSuccess, createNewProductFail,
    updateProductRequest, updateProductSuccess, updateProductFail,
} = productsSlice.actions

export default productsSlice.reducer