import axios from 'axios'
import {
    getProductsRequest, getProductsSuccess, getProductsFail, //search of products
    getTopWeekRequest, getTopWeekSuccess, getTopWeekFail,
    getBestSellingRequest, getBestSellingSuccess, getBestSellingFail,
    getProductDetailRequest, getProductDetailSuccess, getProductDetailFail, //product detail
    newReviewRequest, newReviewSuccess, newReviewFail,
    getReviewsRequest, getReviewsSuccess, getReviewsFail,
    createNewProductRequest, createNewProductSuccess, createNewProductFail,
} from '../reducers/product_reducer.js'
import { toast } from 'react-toastify'
import actionsErrorHandler from '../../utils/error_handler.js'
import {
    EXPRESS_SERVER, LIMIT_GET_COMMENTS, MAX_PRICE_PORDUCT, LIMIT_GET_PRODUCTS_DEFAULT,
} from '../../utils/constants.js'
import FileUploadFilter from '../../utils/file_upload_filter.js'

const createNewProduct = (
    productName,
    category,
    targetGender,
    price,
    options,
    stock,
    shop,
    description,
    brand,
    productType
) => async (dispatch) => {
    try {
        dispatch(createNewProductRequest())

        let api_to_create_new_product = '/api/product/createProduct'

        await axios.post(
            EXPRESS_SERVER + api_to_create_new_product,
            {
                productName,
                category,
                targetGender,
                price,
                options,
                stock,
                shop,
                description,
                brand,
                productType
            },
            { withCredentials: true }
        )

        dispatch(createNewProductSuccess())
    } catch (error) {
        let errorObject = actionsErrorHandler(error)

        toast.error(errorObject.message)

        dispatch(createNewProductFail({ error: errorObject }))
    }
}

const getProducts = (
    limit = LIMIT_GET_PRODUCTS_DEFAULT, category, keyword, rating = 0,
    price = [0, MAX_PRICE_PORDUCT], pagination = 1, targetGender, type,
) => async (dispatch) => {
    try {
        dispatch(getProductsRequest())

        let api_to_getProducts =
            '/api/product/getProducts?' + (category ? 'category=' + category : '') +
            (keyword ? '&keyword=' + keyword : '') + '&pagination=' + pagination +
            '&limit=' + limit + '&rating=' + rating +
            '&price[gte]=' + price[0] + '&price[lte]=' + price[1] +
            (targetGender ? '&targetGender=' + targetGender : '') + (type ? '&type=' + type : '')

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
            '/api/product/getProducts?limit=' + limit + '&pagination=' + pagination

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
            '/api/product/getProducts?limit=' + limit + '&pagination=' + pagination +
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

        let api_to_getProductDetail = '/api/product/getProduct/' + product_id
        let { data } = await axios.get(EXPRESS_SERVER + api_to_getProductDetail)

        dispatch(getProductDetailSuccess({ product: data.product }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get product detail.')

        dispatch(getProductDetailFail({ error: errorObject }))
    }
}

const getReviews = (productId, pagination = 1, limit = LIMIT_GET_COMMENTS) => async (dispatch) => {
    try {
        dispatch(getReviewsRequest())

        let api_to_get_review =
            '/api/product/getReviews?productId=' + productId + '&pagination=' + pagination +
            '&limit=' + limit

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_review)

        dispatch(getReviewsSuccess({ reviews: data.reviews }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get review.')

        dispatch(getReviewsFail({ error: errorObject }))
    }
}

const newReview = (productId, images, rating, title, comment, current_reviews) => async (dispatch) => {
    let reviewData = new FormData()
    if (images.length > 0) {
        let file_upload_filter
        for (let file of images) {
            file_upload_filter = new FileUploadFilter(file)
            if (!file_upload_filter.mimetypeIsValid())
                return toast.error(file_upload_filter.invalidMessage)
            if (!file_upload_filter.sizeIsValid())
                return toast.error(file_upload_filter.invalidMessage)

            reviewData.append('images', file)
        }
    }

    reviewData.set('rating', rating)
    reviewData.set('title', title)
    reviewData.set('comment', comment)
    reviewData.set('currentReviews', JSON.stringify(current_reviews))

    try {
        dispatch(newReviewRequest())

        let api_to_make_new_review = '/api/product/newReview?productId=' + productId

        let { data } = await axios.post(
            EXPRESS_SERVER + api_to_make_new_review,
            reviewData,
            {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            },
        )

        dispatch(newReviewSuccess({
            newReview: data.newReview,
            newAverageRating: data.newAverageRating,
            newCountReview: data.newCountReview,
        }))

        toast.success('Success to submit the new review')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to make new review.')

        toast.error(errorObject.message)

        dispatch(newReviewFail({ error: errorObject }))
    }
}

const getProductsByAdmin = (...fields) => async (dispatch) => {
    try {
        dispatch(getProductsRequest())

        let api_to_get_products = '/api/product/getProductsByAdmin'

        if (fields.length > 1) {
            api_to_get_products += `?${fields[0]}=true`
            for (let i = 1; i < fields.length; i++)
                api_to_get_products += `&${fields[i]}=true`
        } else
            api_to_get_products += `?${fields[0]}=true`

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_products, { withCredentials: true })

        dispatch(getProductsSuccess({ products: data.list }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error)

        dispatch(getProductsFail({ error: errorObject }))
    }
}

export {
    getProducts, getBestSelling, getTopWeek,
    getReviews, getProductDetail, newReview,
    getProductsByAdmin, createNewProduct,
}