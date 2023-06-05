import axios from 'axios'
import {
    completeOrderRequest, completeOrderSuccess, completeOrderFail,
    getOrderRequest, getOrderSuccess, getOrderFail,
    getOrdersRequest, getOrdersSuccess, getOrdersFail,
} from '../reducers/order_reducer.js'
import { EXPRESS_SERVER } from '../../utils/constants.js'
import { toast } from 'react-toastify'
import actionsErrorHandler from '../../utils/error_handler.js'
import { LIMIT_GET_ORDERS } from '../../utils/constants.js'

const completePlaceOrder = ({ orderId, paymentMethod, paymentId, paymentStatus }, step_after_complete_payment) => async (dispatch) => {
    try {
        dispatch(completeOrderRequest())

        let api_to_create_new_order = '/api/completePlaceOrder'

        await axios.post(
            EXPRESS_SERVER + api_to_create_new_order,
            {
                orderId,
                paymentId,
                paymentMethod,
                paymentStatus,
            },
            { withCredentials: true },
        )

        dispatch(completeOrderSuccess())

        window.open('/checkout?step=' + step_after_complete_payment + '&payment_intent=' + paymentId, '_self')
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

        let api_to_get_order = '/api/getOrder' + (paymentId ? '?paymentId=' + paymentId : '') + (orderId ? '?orderId=' + orderId : '')

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_order, { withCredentials: true })

        dispatch(getOrderSuccess({ order: data.order }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get order.')

        dispatch(getOrderFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

const getOrders = (page, limit = LIMIT_GET_ORDERS, payment_status) => async (dispatch) => {
    try {
        dispatch(getOrdersRequest())

        let api_to_get_orders = '/api/getOrders?page=' + page + '&limit=' + limit +
            (payment_status ? '&paymentStatus=' + payment_status : '')

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_orders, { withCredentials: true })

        dispatch(getOrdersSuccess({
            orders: data.orders,
            countOrder: data.countOrder,
            currentPage: page,
            currentTab: payment_status || 'all',
        }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get orders.')

        dispatch(getOrdersFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

export {
    completePlaceOrder, getOrder, getOrders,
}