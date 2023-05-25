import axios from 'axios'
import {
    createNewOrderRequest, createNewOrderSuccess, createNewOrderFail,
    getOrderRequest, getOrderSuccess, getOrderFail,
    getOrdersRequest, getOrdersSuccess, getOrdersFail,
} from '../reducers/order_reducer.js'
import { EXPRESS_SERVER } from '../../utils/constants.js'
import { toast } from 'react-toastify'
import actionsErrorHandler from '../../utils/error_handler.js'
import { LIMIT_GET_ORDERS } from '../../utils/constants.js'

const createNewOrder = (order_info, step_after_complete_payment) => async (dispatch) => {
    try {
        dispatch(createNewOrderRequest())

        let api_to_create_new_order = '/api/newOrder'

        await axios.post(
            EXPRESS_SERVER + api_to_create_new_order,
            {
                shipping_info: order_info.shipping_info,
                items_of_order: order_info.items_of_order,
                payment_info: order_info.payment_info,
                price_of_items: order_info.price_of_items,
                tax_fee: order_info.tax_fee,
                shipping_fee: order_info.shipping_fee,
                total_to_pay: order_info.total_to_pay,
            },
            { withCredentials: true },
        )

        dispatch(createNewOrderSuccess())

        window.open('/checkout?step=' + step_after_complete_payment + '&payment_intent=' + order_info.payment_info.id, '_self')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to create new order.')

        dispatch(createNewOrderFail({ error: errorObject }))

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
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to create new order.')

        dispatch(getOrderFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

const getOrders = (page, limit = LIMIT_GET_ORDERS) => async (dispatch) => {
    try {
        dispatch(getOrdersRequest())

        let api_to_get_orders = '/api/getOrders?page=' + page + '&limit=' + limit

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_orders, { withCredentials: true })

        dispatch(getOrdersSuccess({ orders: data.orders, countOrder: data.countOrder }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to create new order.')

        dispatch(getOrdersFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

export {
    createNewOrder, getOrder, getOrders,
}