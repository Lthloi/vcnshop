import { createSlice, current } from '@reduxjs/toolkit'

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
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
    reducers: {
        getProductDetailRequest: (state, action) => {
            state.error = null
            state.newReviewProcessing = false
            state.loading = true
        },
        getProductDetailSuccess: (state, action) => {
            state.product = action.payload.product
            state.loading = false
        },
        getProductDetailFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },


        getReviewRequest: (state, action) => {
            state.reviewsState.error = null
            state.reviewsState.loading = true
        },
        getReviewSuccess: (state, action) => {
            state.reviewsState.reviews = action.payload.reviews
            state.reviewsState.loading = false
        },
        getReviewFail: (state, action) => {
            state.reviewsState.error = action.payload.error
            state.reviewsState.loading = false
        },

        
        newReviewRequest: (state, action) => {
            state.newReviewProcessing = true
        },
        newReviewSuccess: (state, action) => {
            let { newReview, newAverageRating, newCountReview } = action.payload

            let current_reviews = current(state).reviewsState.reviews.filter(({ email }) => email !== newReview.email)

            state.reviewsState.reviews = [newReview, ...current_reviews]

            state.product.review.average_rating = newAverageRating
            state.product.review.count_review = newCountReview

            state.newReviewProcessing = false
        },
        newReviewFail: (state, action) => {
            state.newReviewProcessing = false
        },
    },
})

export const {
    getProductDetailRequest, getProductDetailSuccess, getProductDetailFail,
    newReviewRequest, newReviewSuccess, newReviewFail,
    getReviewRequest, getReviewSuccess, getReviewFail,
} = productDetailSlice.actions

export default productDetailSlice.reducer