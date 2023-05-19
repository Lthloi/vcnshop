import axios from 'axios'
import {
    createNewOrderRequest, createNewOrderSuccess, createNewOrderFail,
    getOrderRequest, getOrderSuccess, getOrderFail,
} from '../reducers/order_reducer.js'
import { EXPRESS_SERVER } from '../../utils/constants.js'
import { toast } from 'react-toastify'
import actionsErrorHandler from '../../utils/error_handler.js'

const createNewOrder = (
    {
        shipping_info,
        items_of_order,
        payment_info,
        price_of_items,
        tax_fee,
        shipping_fee,
        total_to_pay,
    },
    step_after_complete_payment,
    payment_intent_id,
) => async (dispatch) => {
    try {
        dispatch(createNewOrderRequest())

        let api_to_create_new_order = '/api/newOrder'

        await axios.post(
            EXPRESS_SERVER + api_to_create_new_order,
            {
                shipping_info,
                items_of_order,
                payment_info,
                price_of_items,
                tax_fee,
                shipping_fee,
                total_to_pay,
                payment_intent_id,
            },
            { withCredentials: true },
        )

        dispatch(createNewOrderSuccess())

        window.open('/checkout?step=' + step_after_complete_payment + '&payment_itent=' + payment_info.id, '_self')
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

        let api_to_get_order = '/api/getOrder' + (paymentId && '?paymentId=' + paymentId) + (orderId && '?orderId=' + orderId)

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_order)

        dispatch(getOrderSuccess({ order: data.order }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to create new order.')

        dispatch(getOrderFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

export {
    createNewOrder, getOrder,
}