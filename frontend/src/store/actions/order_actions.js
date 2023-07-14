import axios from 'axios'
import {
    completeOrderRequest, completeOrderSuccess, completeOrderFail,
    getOrderRequest, getOrderSuccess, getOrderFail,
    getOrdersRequest, getOrdersSuccess, getOrdersFail,
} from '../reducers/order_reducer.js'
import { toast } from 'react-toastify'
import actionsErrorHandler from '../../utils/error_handler.js'
import {
    LIMIT_GET_ORDERS, EXPRESS_SERVER,
} from '../../utils/constants.js'
import { redirectAfterSeconds } from '../../utils/action_features.js'

const completePlaceOrder = ({ orderId, paymentMethod, paymentId }) => async (dispatch) => {
    try {
        dispatch(completeOrderRequest())

        let api_to_create_new_order = '/api/order/completePlaceOrder'

        await axios.put(
            EXPRESS_SERVER + api_to_create_new_order,
            {
                orderId,
                paymentMethod,
            },
            { withCredentials: true },
        )

        dispatch(completeOrderSuccess())

        toast.success('Order Successfully Placed!')

        redirectAfterSeconds(1000, { href: '/checkout/success?payment_intent=' + paymentId })
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to complete the order.')

        dispatch(completeOrderFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

const getOrder = (paymentId, orderId) => async (dispatch) => {

    if (paymentId && orderId) return

    try {
        dispatch(getOrderRequest())

        let api_to_get_order = '/api/order/getOrder' + (paymentId ? '?paymentId=' + paymentId : '') + (orderId ? '?orderId=' + orderId : '')

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_order, { withCredentials: true })

        dispatch(getOrderSuccess({ order: data.order }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get order.')

        dispatch(getOrderFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

const getOrders = (page = 1, limit = LIMIT_GET_ORDERS, payment_status = null) => async (dispatch) => {
    try {
        dispatch(getOrdersRequest())

        let api_to_get_orders = '/api/order/getOrders?page=' + page + '&limit=' + limit +
            (payment_status ? '&paymentStatus=' + payment_status : '')

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_orders, { withCredentials: true })

        dispatch(getOrdersSuccess({
            orders: data.orders,
            countOrders: data.countOrders,
            currentPage: page || 1,
            currentTab: payment_status,
        }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error)

        dispatch(getOrdersFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

const getOrdersForShop = (limit = LIMIT_GET_ORDERS, page = 1, order_status) => async (dispatch) => {
    try {
        dispatch(getOrdersRequest())

        let api_to_get_orders = '/api/order/getOrdersForShop?&limit=' + limit + '&page=' + page +
            (order_status ? '&orderStatus=' + order_status : '')

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_orders, { withCredentials: true })

        dispatch(getOrdersSuccess({
            orders: data.orders,
            countOrders: data.orders.length,
            currentPage: page,
            currentTab: null,
        }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get orders.')

        dispatch(getOrdersFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

const getOrderDetailForShop = (orderId) => async (dispatch) => {
    try {
        dispatch(getOrderRequest())

        let api_to_get_order = '/api/order/getOneOrderForShop'

        let { data } = await axios.get(
            EXPRESS_SERVER + api_to_get_order,
            {
                withCredentials: true,
                params: {
                    orderId
                },
            }
        )

        dispatch(getOrderSuccess({ order: data.order }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get order.')

        dispatch(getOrderFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

const getOrdersByAdmin = (...fields) => async (dispatch) => {
    try {
        dispatch(getOrdersRequest())

        let api_to_get_orders = '/api/order/getOrdersByAdmin'

        if (fields.length > 1) {
            api_to_get_orders += `?${fields[0]}=true`
            for (let i = 1; i < fields.length; i++)
                api_to_get_orders += `&${fields[i]}=true`
        } else
            api_to_get_orders += `?${fields[0]}=true`

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_orders, { withCredentials: true })

        dispatch(getOrdersSuccess({ orders: data.list }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error)

        dispatch(getOrdersFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

export {
    completePlaceOrder, getOrder, getOrders,
    getOrdersByAdmin, getOrdersForShop, getOrderDetailForShop,
}