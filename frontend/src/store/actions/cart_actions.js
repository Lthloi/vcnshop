import axios from 'axios'
import {
    addProductToCartRequest, addProductToCartSuccess, addProductToCartFail,
    changeQuantityRequest, changeQuantityFail,
    removeItemFromCartExecute,
} from '../../store/reducers/cart_reducer'
import { toast } from 'react-toastify'
import actionsErrorHandler from '../../utils/error_handler'
import { EXPRESS_SERVER } from '../../utils/constants.js'

const addProductToCart = (product_id, options) => async (dispatch, getState) => {
    try {
        dispatch(addProductToCartRequest())

        let api_to_get_product = '/api/product/getProduct/' + product_id

        let { data: { product: productData } } = await axios.get(EXPRESS_SERVER + api_to_get_product)

        if (productData.stock === 0) {
            dispatch(addProductToCartFail({}))
            return toast.warning('The product has run out')
        }

        let existedProduct = getState().cart.cartItems.find(({ _id }) => product_id === _id)

        if (existedProduct && existedProduct.quantity >= productData.stock) {
            dispatch(addProductToCartFail({}))
            return toast.warning('The quantity of product in your cart is greater than in stock now')
        }

        let add_product = {
            _id: product_id,
            sku: productData.sku,
            image_link: productData.image_link,
            name: productData.name,
            size: options ? options.size : productData.options.size[0],
            color: options ? options.color : productData.options.color[0],
            shop: {
                name: productData.shop.name,
                username: productData.shop.username
            },
            cost: productData.price.value,
            quantity: 1,
            stock: productData.stock,
        }

        dispatch(addProductToCartSuccess({
            addProduct: add_product,
            productStock: productData.stock,
            currentQuantity: existedProduct ? existedProduct.quantity : null,
        }))

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

        toast.success('Add the product to cart successfully')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to add product to cart.')

        dispatch(addProductToCartFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

const changeQuantity = (product_id, option) => async (dispatch, getState) => {
    try {
        dispatch(changeQuantityRequest({ productId: product_id, option }))

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        let errorObject = actionsErrorHandler(
            error, 'Error Warning: fail to change quantity from cart.'
        )

        dispatch(changeQuantityFail({ error: errorObject }))
    }
}

const removeItemFromCart = (product_id) => async (dispatch, getState) => {
    dispatch(removeItemFromCartExecute({ productId: product_id }))

    let current_cartItems = getState().cart.cartItems

    localStorage.setItem('cartItems', JSON.stringify(current_cartItems))
}

export {
    addProductToCart, removeItemFromCart, changeQuantity,
}