import axios from 'axios'
import {
    getProductsRequest, getProductsSuccess, getProductsFail, //products search
    getTopWeekRequest, getTopWeekSuccess, getTopWeekFail, //top week
    getBestSellingRequest, getBestSellingSuccess, getBestSellingFail, //best selling
} from '../reducers/products_reducer.js'
import {
    getProductDetailRequest, getProductDetailSuccess, getProductDetailFail, //product detail
    newReviewRequest, newReviewSuccess, newReviewFail,
    getReviewRequest, getReviewSuccess, getReviewFail,
} from '../reducers/product_detail_reducer.js'
import { toast } from 'react-toastify'
import actionsErrorHandler from '../../utils/error_handler.js'
import {
    EXPRESS_SERVER, LIMIT_GET_COMMENTS, MAX_PRICE_PORDUCT, LIMIT_GET_PRODUCTS_DEFAULT,
} from '../../utils/constants.js'

const getProducts = (
    limit = LIMIT_GET_PRODUCTS_DEFAULT, category, keyword, rating = 0,
    price = [0, MAX_PRICE_PORDUCT], pagination = 1, forWho, type,
) => async (dispatch) => {
    try {
        dispatch(getProductsRequest())

        let api_to_getProducts =
            '/api/getProducts?' + (category ? 'category=' + category : '') +
            (keyword ? '&keyword=' + keyword : '') + '&pagination=' + pagination +
            '&limit=' + limit + '&rating=' + rating +
            '&price[gte]=' + price[0] + '&price[lte]=' + price[1] +
            (forWho ? '&for=' + forWho : '') + (type ? '&type=' + type : '')

        let { data } = await axios.get(EXPRESS_SERVER + api_to_getProducts)

        dispatch(getProductsSuccess(
            { products: data.products, countProduct: data.countProduct }
        ))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get products.')

        dispatch(getProductsFail({ error: errorObject }))
    }
}

const getTopWeek = (limit = 9, pagination = 1) => async (dispatch) => {
    try {
        dispatch(getTopWeekRequest())

        let api_to_getTopWeek =
            '/api/getProducts?limit=' + limit + '&pagination=' + pagination +
            '&sort[name]=sold.in_a_week&sort[type]=' + -1

        let { data } = await axios.get(EXPRESS_SERVER + api_to_getTopWeek)

        dispatch(getTopWeekSuccess({ products: data.products }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get top week.')

        dispatch(getTopWeekFail({ error: errorObject }))
    }
}

const getBestSelling = (limit = 20, pagination = 1) => async (dispatch) => {
    try {
        dispatch(getBestSellingRequest())

        let api_to_getBestSelling =
            '/api/getProducts?limit=' + limit + '&pagination=' + pagination +
            '&sort[name]=sold.count&sort[type]=' + -1

        let { data } = await axios.get(EXPRESS_SERVER + api_to_getBestSelling)

        dispatch(getBestSellingSuccess({ products: data.products }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get best selling.')

        dispatch(getBestSellingFail({ error: errorObject }))
    }
}

const getProductDetail = (product_id) => async (dispatch) => {
    try {
        dispatch(getProductDetailRequest())

        let api_to_getProductDetail = '/api/getProduct/' + product_id
        let { data: productData } = await axios.get(EXPRESS_SERVER + api_to_getProductDetail)

        dispatch(getProductDetailSuccess({ product: productData.product }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get product detail.')

        dispatch(getProductDetailFail({ error: errorObject }))
    }
}

const getReviews = (productId, pagination = 1, limit = LIMIT_GET_COMMENTS) => async (dispatch) => {
    try {
        dispatch(getReviewRequest())

        let api_to_get_review =
            '/api/getReviews?productId=' + productId + '&pagination=' + pagination +
            '&limit=' + limit

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_review)

        dispatch(getReviewSuccess({ reviews: data.reviews }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get review.')

        dispatch(getReviewFail({ error: errorObject }))
    }
}

const newReview = (productId, reviewData) => async (dispatch) => {
    try {
        dispatch(newReviewRequest())

        let username = localStorage.getItem('usernameVCNShop') //get user from local

        let api_to_make_new_review = '/api/newReview/?productId=' + productId + '&username=' + username

        let { data } = await axios.post(
            EXPRESS_SERVER + api_to_make_new_review,
            reviewData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
        )

        dispatch(newReviewSuccess({
            newReview: data.newReview,
            newAverageRating: data.newAverageRating,
            newCountStar: data.newCountStar,
            newCountReview: data.newCountReview,
        }))

        toast.success('Success to submit the new review')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to make new review.')
        console.log('>>> errorObject >>>', errorObject)
        toast.error(errorObject.message)

        dispatch(newReviewFail())
    }
}

export {
    getProducts, getBestSelling, getTopWeek,
    getReviews, getProductDetail, newReview,
}