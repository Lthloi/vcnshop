import { createSlice, current } from '@reduxjs/toolkit'

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        product: {},
        reviewObject: {
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
            state.reviewObject.error = null
            state.reviewObject.loading = true
        },
        getReviewSuccess: (state, action) => {
            state.reviewObject.reviews = action.payload.reviews
            state.reviewObject.loading = false
        },
        getReviewFail: (state, action) => {
            state.reviewObject.error = action.payload.error
            state.reviewObject.loading = false
        },
        newReviewRequest: (state, action) => {
            state.newReviewProcessing = true
        },
        newReviewSuccess: (state, action) => {
            let { newReview, newAverageRating, newCountReview, newCountStar } = action.payload

            let current_reviews = current(state).reviewObject.reviews.filter(({ username }) => username !== newReview.username)

            state.reviewObject.reviews = [newReview, ...current_reviews]

            state.product.review.average_rating = newAverageRating
            state.product.review.count_review = newCountReview
            state.product.review.count_star = newCountStar

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