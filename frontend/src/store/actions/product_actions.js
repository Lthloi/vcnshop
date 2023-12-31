import axios from 'axios'
import {
    getProductsRequest, getProductsSuccess, getProductsFail, //search of products
    getProductRequest, getProductSuccess, getProductFail, //product detail
    newReviewRequest, newReviewSuccess, newReviewFail,
    getReviewsRequest, getReviewsSuccess, getReviewsFail,
    createNewProductRequest, createNewProductSuccess, createNewProductFail,
    updateProductRequest, updateProductSuccess, updateProductFail,
    deleteProductRequest, deleteProductSuccess, deleteProductFail,
    getWomenSProductsRequest, getWomenSProductsSuccess, getWomenSProductsFail,
    getMenSProductsRequest, getMenSProductsSuccess, getMenSProductsFail,
    getOverviewRequest, getOverviewSuccess, getOverviewFail,
} from '../reducers/product_reducer.js'
import { toast } from 'react-toastify'
import axiosErrorHandler from '../../utils/axios_error_handler.js'
import {
    LIMIT_GET_COMMENTS, MAX_PRICE_PORDUCT,
    LIMIT_GET_PRODUCTS_DEFAULT, MAX_STOCK,
} from '../../configs/constants.js'
import FileUploadFilter from '../../utils/file_upload_filter.js'
import { redirectAfterSeconds } from '../../utils/redirect_handler.js'
import {
    create_product_api,
    update_product_api,
    delete_product_api,
    get_products_api,
    get_product_api,
    new_review_api,
    get_reviews_api,
    get_products_by_admin_api,
} from '../../apis/product_apis.js'
import {
    find_orders_with_productId_api,
} from '../../apis/order_apis.js'

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
    product_data.set('description', JSON.stringify(description))

    if (images.length > 0) {
        let file_filter = new FileUploadFilter()

        for (let file of images) {
            file_filter.setFile(file)
            if (!file_filter.mimetypeIsValid())
                return toast.error(file_filter.getInvalidMessage())
            if (!file_filter.sizeIsValid())
                return toast.error(file_filter.getInvalidMessage())

            product_data.append('images', file)
        }
    }

    try {
        dispatch(createNewProductRequest())

        await axios.post(
            create_product_api,
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
        let errorObject = axiosErrorHandler(error)

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
    product_data.set('productId', productId)
    if (colors.length > 0)
        product_data.set('colors', JSON.stringify(colors))
    if (sizes.length > 0)
        product_data.set('sizes', JSON.stringify(sizes))
    if (stock)
        product_data.set('stock', stock)
    if (description)
        product_data.set('description', JSON.stringify(description)) // using JSON.stringify for consistent length of description between frontend and backend

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

        await axios.post(
            update_product_api,
            product_data,
            {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        )

        dispatch(updateProductSuccess())

        toast.success('Update Product Successfully!')

        redirectAfterSeconds(1000, { isReload: true })
    } catch (error) {
        let errorObject = axiosErrorHandler(error)

        toast.error(errorObject.message)

        dispatch(updateProductFail({ error: errorObject }))
    }
}

const deleteProduct = (product_id) => async (dispatch) => {
    try {
        dispatch(deleteProductRequest())

        let { data } = await axios.get(
            find_orders_with_productId_api,
            {
                withCredentials: true,
                params: {
                    productId: product_id,
                }
            }
        )

        if (data.orders && data.orders.length > 0 && data.orders.find(({ order_status }) => order_status === 'uncompleted' || order_status === 'processing' || order_status === 'delivering')) {
            dispatch(deleteProductFail())

            toast.error("Can't delete the product now has an order")

            return
        }
    } catch (error) {
        let errorObject = axiosErrorHandler(error)
        toast.error(errorObject.message)

        dispatch(deleteProductFail({ error: errorObject }))

        return
    }

    try {
        await axios.delete(delete_product_api + product_id, { withCredentials: true })

        dispatch(deleteProductSuccess())

        toast.success('Delete the product successfully')
    } catch (error) {
        let errorObject = axiosErrorHandler(error)

        toast.error(errorObject.message)

        dispatch(deleteProductFail({ error: errorObject }))
    }
}

const getProducts = (
    limit = LIMIT_GET_PRODUCTS_DEFAULT, category, keyword, rating = 0,
    price = [0, MAX_PRICE_PORDUCT], page = 1, targetGender, shopId,
    stock = [0, MAX_STOCK], sort,
) => async (dispatch) => {
    try {
        dispatch(getProductsRequest())

        let query = {
            limit,
            rating,
            page,
            price: {
                gte: price[0],
                lte: price[1],
            },
            stock: {
                gte: stock[0],
                lte: stock[1],
            },
        }

        if (keyword)
            query.keyword = keyword
        if (category)
            query.category = [category]
        if (shopId)
            query.shopId = shopId
        if (targetGender)
            query.targetGender = [targetGender]
        if (sort) {
            query.sort = {
                name: sort.name,
                type: sort.type,
            }
        }

        let { data } = await axios.get(
            get_products_api,
            { params: query }
        )

        dispatch(getProductsSuccess({
            products: data.products,
            countProducts: data.countProducts,
            currentPage: page || 1,
        }))
    } catch (error) {
        let errorObject = axiosErrorHandler(error, 'Error Warning: fail to get products.')

        dispatch(getProductsFail({ error: errorObject }))
    }
}

const getWomenSProducts = (limit = LIMIT_GET_PRODUCTS_DEFAULT, page, sort) => async (dispatch) => {
    try {
        dispatch(getWomenSProductsRequest())

        let query = {
            limit,
            targetGender: ['Female'],
            page,
            sort: {
                name: sort.name,
                type: sort.type,
            },
        }

        let { data } = await axios.get(
            get_products_api,
            { params: query }
        )

        dispatch(getWomenSProductsSuccess({ products: data.products }))
    } catch (error) {
        let errorObject = axiosErrorHandler(error, 'Error Warning: fail to get products.')

        dispatch(getWomenSProductsFail({ error: errorObject }))
    }
}

const getMenSProducts = (limit = LIMIT_GET_PRODUCTS_DEFAULT, page, sort) => async (dispatch) => {
    try {
        dispatch(getMenSProductsRequest())

        let query = {
            limit,
            targetGender: ['Male'],
            page,
            sort: {
                name: sort.name,
                type: sort.type,
            },
        }

        let { data } = await axios.get(
            get_products_api,
            { params: query }
        )

        dispatch(getMenSProductsSuccess({ products: data.products }))
    } catch (error) {
        let errorObject = axiosErrorHandler(error, 'Error Warning: fail to get products.')

        dispatch(getMenSProductsFail({ error: errorObject }))
    }
}

const getProductsOverview = (limit = LIMIT_GET_PRODUCTS_DEFAULT, category, page, sort) => async (dispatch) => {
    try {
        dispatch(getOverviewRequest())

        let query = {
            limit,
            page,
            sort: {
                name: sort.name,
                type: sort.type,
            },
            category,
        }

        let { data } = await axios.get(
            get_products_api,
            { params: query }
        )

        dispatch(getOverviewSuccess({ products: data.products }))
    } catch (error) {
        let errorObject = axiosErrorHandler(error)

        dispatch(getOverviewFail({ error: errorObject }))
    }
}

const getProductDetail = (product_id) => async (dispatch) => {
    try {
        dispatch(getProductRequest())

        let { data } = await axios.get(get_product_api + product_id)

        dispatch(getProductSuccess({ product: data.product }))
    } catch (error) {
        let errorObject = axiosErrorHandler(error, 'Error Warning: fail to get product detail.')

        dispatch(getProductFail({ error: errorObject }))
    }
}

const getReviews = (productId, page = 1, limit = LIMIT_GET_COMMENTS) => async (dispatch) => {
    try {
        dispatch(getReviewsRequest())

        let { data } = await axios.get(
            get_reviews_api,
            {
                params: {
                    productId,
                    page,
                    limit,
                }
            }
        )

        dispatch(getReviewsSuccess({ reviews: data.reviews }))
    } catch (error) {
        let errorObject = axiosErrorHandler(error, 'Error Warning: fail to get review.')

        dispatch(getReviewsFail({ error: errorObject }))
    }
}

const newReview = ({ productId, images, rating, title, comment }) => async (dispatch) => {
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

    try {
        dispatch(newReviewRequest())

        let { data } = await axios.post(
            new_review_api,
            reviewData,
            {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
                params: {
                    productId,
                }
            },
        )

        dispatch(newReviewSuccess({
            newReview: data.newReview,
            newAverageRating: data.newAverageRating,
            newCountReview: data.newCountReview,
        }))

        toast.success('Write a review successfully')
    } catch (error) {
        let errorObject = axiosErrorHandler(error)

        toast.error(errorObject.message)

        dispatch(newReviewFail({ error: errorObject }))
    }
}

const getProductsByAdmin = (...fields) => async (dispatch) => {
    try {
        dispatch(getProductsRequest())

        let query = {}

        for (let field of fields)
            query[field] = 'true'

        let { data } = await axios.get(
            get_products_by_admin_api,
            {
                withCredentials: true,
                params: query,
            }
        )

        dispatch(getProductsSuccess({ products: data.list }))
    } catch (error) {
        let errorObject = axiosErrorHandler(error)

        dispatch(getProductsFail({ error: errorObject }))
    }
}

export {
    getProducts, getWomenSProducts, getMenSProducts,
    getReviews, getProductDetail, newReview,
    getProductsByAdmin, createNewProduct,
    updateProduct, deleteProduct, getProductsOverview,
}