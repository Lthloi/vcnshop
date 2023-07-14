import axios from 'axios'
import {
    getProductsRequest, getProductsSuccess, getProductsFail, //search of products
    getTopWeekRequest, getTopWeekSuccess, getTopWeekFail,
    getBestSellingRequest, getBestSellingSuccess, getBestSellingFail,
    getProductRequest, getProductSuccess, getProductFail, //product detail
    newReviewRequest, newReviewSuccess, newReviewFail,
    getReviewsRequest, getReviewsSuccess, getReviewsFail,
    createNewProductRequest, createNewProductSuccess, createNewProductFail,
    updateProductRequest, updateProductSuccess, updateProductFail,
    deleteProductRequest, deleteProductSuccess, deleteProductFail,
} from '../reducers/product_reducer.js'
import { toast } from 'react-toastify'
import actionsErrorHandler from '../../utils/error_handler.js'
import {
    EXPRESS_SERVER, LIMIT_GET_COMMENTS, MAX_PRICE_PORDUCT,
    LIMIT_GET_PRODUCTS_DEFAULT, MAX_STOCK,
} from '../../utils/constants.js'
import FileUploadFilter from '../../utils/file_upload_filter.js'
import { redirectAfterSeconds } from '../../utils/action_features.js'

const createNewProduct = (
    productName,
    category,
    targetGender,
    price,
    { colors, sizes },
    stock,
    description,
    images
) => async (dispatch) => {

    let product_data = new FormData()
    product_data.set('productName', productName)
    product_data.set('category', category)
    product_data.set('targetGender', targetGender)
    product_data.set('price', price)
    product_data.set('colors', JSON.stringify(colors))
    product_data.set('sizes', JSON.stringify(sizes))
    product_data.set('stock', stock)
    product_data.set('description', description)

    if (images.length > 0) {
        let file_upload_filter = new FileUploadFilter()
        for (let file of images) {
            file_upload_filter.setFile(file)
            if (!file_upload_filter.mimetypeIsValid())
                return toast.error(file_upload_filter.invalidMessage)
            if (!file_upload_filter.sizeIsValid())
                return toast.error(file_upload_filter.invalidMessage)

            product_data.append('images', file)
        }
    }

    try {
        dispatch(createNewProductRequest())

        let api_to_create_new_product = '/api/product/createProduct'

        await axios.post(
            EXPRESS_SERVER + api_to_create_new_product,
            product_data,
            {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        )

        dispatch(createNewProductSuccess())

        toast.success('Add Product Successfully!')

        redirectAfterSeconds(1000, { isReload: true })
    } catch (error) {
        let errorObject = actionsErrorHandler(error)

        toast.error(errorObject.message)

        dispatch(createNewProductFail({ error: errorObject }))
    }
}

const updateProduct = (
    sizes,
    colors,
    stock,
    description,
    productId,
    images
) => async (dispatch) => {

    let product_data = new FormData()
    if (colors.length > 0) product_data.set('colors', JSON.stringify(colors))
    if (sizes.length > 0) product_data.set('sizes', JSON.stringify(sizes))
    if (stock) product_data.set('stock', stock)
    if (description) product_data.set('description', JSON.stringify(description)) // using JSON.stringify for consistent length of description between frontend and backend

    if (images.length > 0) {
        let file_upload_filter = new FileUploadFilter()
        for (let file of images) {
            file_upload_filter.setFile(file)
            if (!file_upload_filter.mimetypeIsValid())
                return toast.error(file_upload_filter.invalidMessage)
            if (!file_upload_filter.sizeIsValid())
                return toast.error(file_upload_filter.invalidMessage)

            product_data.append('images', file)
        }
    }

    try {
        dispatch(updateProductRequest())

        let api_to_update_product = '/api/product/updateProduct?productId=' + productId

        await axios.post(
            EXPRESS_SERVER + api_to_update_product,
            product_data,
            {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        )

        dispatch(updateProductSuccess())

        toast.success('Update Product Successfully!')

        redirectAfterSeconds(1000, { isReload: true })
    } catch (error) {
        let errorObject = actionsErrorHandler(error)

        toast.error(errorObject.message)

        dispatch(updateProductFail({ error: errorObject }))
    }
}

const deleteProduct = (product_id) => async (dispatch) => {
    try {
        dispatch(deleteProductRequest())

        let api_to_get_order = '/api/order/findOrdersWithProductId?productId=' + product_id

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_order, { withCredentials: true })

        if (data.orders.length > 0) {
            dispatch(deleteProductFail())

            toast.error("Can't delete the product now has an order")

            return
        }
    } catch (error) {
        let errorObject = actionsErrorHandler(error)
        toast.error(errorObject.message)

        dispatch(deleteProductFail({ error: errorObject }))

        return
    }

    try {
        let api_to_delete_product = '/api/product/deleteProduct/' + product_id

        await axios.delete(EXPRESS_SERVER + api_to_delete_product, { withCredentials: true })

        dispatch(deleteProductSuccess())

        toast.success('Delete the product successfully')
    } catch (error) {
        let errorObject = actionsErrorHandler(error)

        toast.error(errorObject.message)

        dispatch(deleteProductFail({ error: errorObject }))
    }
}

const getProducts = (
    limit = LIMIT_GET_PRODUCTS_DEFAULT, category, keyword, rating = 0,
    price = [0, MAX_PRICE_PORDUCT], page = 1, targetGender, shopId,
    stock = [0, MAX_STOCK],
) => async (dispatch) => {
    try {
        dispatch(getProductsRequest())

        let api_to_getProducts =
            '/api/product/getProducts?limit=' + limit + '&rating=' + rating +
            (keyword ? '&keyword=' + keyword : '') + '&page=' + page +
            (category ? 'category=' + category : '') + (shopId ? '&shopId=' + shopId : '') +
            '&price[gte]=' + price[0] + '&price[lte]=' + price[1] +
            (targetGender ? '&targetGender=' + targetGender : '') +
            '&stock[gte]=' + stock[0] + '&stock[lte]=' + stock[1]

        let { data } = await axios.get(EXPRESS_SERVER + api_to_getProducts)

        dispatch(getProductsSuccess({
            products: data.products,
            countProducts: data.countProducts,
            currentPage: page || 1,
        }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get products.')

        dispatch(getProductsFail({ error: errorObject }))
    }
}

const getTopWeek = (limit = 9, page = 1) => async (dispatch) => {
    try {
        dispatch(getTopWeekRequest())

        let api_to_getTopWeek =
            '/api/product/getProducts?limit=' + limit + '&page=' + page

        let { data } = await axios.get(EXPRESS_SERVER + api_to_getTopWeek)

        dispatch(getTopWeekSuccess({ products: data.products }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get top week.')

        dispatch(getTopWeekFail({ error: errorObject }))
    }
}

const getBestSelling = (limit = 20, page = 1) => async (dispatch) => {
    try {
        dispatch(getBestSellingRequest())

        let api_to_getBestSelling =
            '/api/product/getProducts?limit=' + limit + '&page=' + page +
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
        dispatch(getProductRequest())

        let api_to_getProduct = '/api/product/getProduct/' + product_id
        let { data } = await axios.get(EXPRESS_SERVER + api_to_getProduct)

        dispatch(getProductSuccess({ product: data.product }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get product detail.')

        dispatch(getProductFail({ error: errorObject }))
    }
}

const getReviews = (productId, page = 1, limit = LIMIT_GET_COMMENTS) => async (dispatch) => {
    try {
        dispatch(getReviewsRequest())

        let api_to_get_review =
            '/api/product/getReviews?productId=' + productId + '&page=' + page +
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
        let file_upload_filter = new FileUploadFilter()
        for (let file of images) {
            file_upload_filter.setFile(file)
            if (!file_upload_filter.mimetypeIsValid())
                return toast.error(file_upload_filter.invalidMessage)
            if (!file_upload_filter.sizeIsValid())
                return toast.error(file_upload_filter.invalidMessage)

            reviewData.append('images', file)
        }
    }

    reviewData.set('rating', rating)
    reviewData.set('title', title)
    reviewData.set('comment', JSON.stringify(comment))
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

        toast.success('Write a review successfully')
    } catch (error) {
        let errorObject = actionsErrorHandler(error)

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
    updateProduct, deleteProduct,
}