import axios from 'axios'
import actionsErrorHandler from '../../utils/error_handler.js'
import {
    getShopRequest, getShopSuccess, getShopFail,
} from '../reducers/shop_reducer.js'
import { EXPRESS_SERVER } from '../../utils/constants.js'

const getShop = (username_shop) => async (dispatch) => {
    try {
        dispatch(getShopRequest())

        let api_to_get_shop = '/api/shop/getShop/' + username_shop

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_shop)

        dispatch(getShopSuccess({ shop: data.shop }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get shop.')

        dispatch(getShopFail({ error: errorObject }))
    }
}

export {
    getShop,
}