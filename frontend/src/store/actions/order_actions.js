import axios from 'axios'
import {
    createNewOrderRequest, createNewOrderSuccess, createNewOrderFail,
} from '../reducers/order_reducer.js'
import { EXPRESS_SERVER } from '../../utils/constants.js'
import { toast } from 'react-toastify'
import actionsErrorHandler from '../../utils/error_handler.js'

const createNewOrder = ({
    shipping_info,
    items_of_order,
    payment_info,
    price_of_items,
    tax_fee,
    shipping_fee,
    total_to_pay,
}, step_after_complete_payment) => async (dispatch) => {
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
            },
            { withCredentials: true },
        )

        dispatch(createNewOrderSuccess())

        window.open('/checkout?step=' + step_after_complete_payment, '_self')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to create new order.')

        dispatch(createNewOrderFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

export {
    createNewOrder,
}