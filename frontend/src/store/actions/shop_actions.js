import axios from 'axios'
import actionsErrorHandler from '../../utils/error_handler.js'
import {
    getShopRequest, getShopSuccess, getShopFail,
    createShopRequest, createShopSuccess, createShopFail,
    getShopsRequest, getShopsSuccess, getShopsFail,
} from '../reducers/shop_reducer.js'
import { EXPRESS_SERVER } from '../../utils/constants.js'
import { toast } from 'react-toastify'

const getShop = (shop_id) => async (dispatch) => {
    try {
        dispatch(getShopRequest())

        let api_to_get_shop
        let option = {}
        if (shop_id) api_to_get_shop = `/api/shop/getShop/${shop_id}`
        else {
            api_to_get_shop = '/api/shop/getShopForUser'
            option.withCredentials = true
        }

        let { data } = await axios.get(
            EXPRESS_SERVER + api_to_get_shop,
            option
        )

        dispatch(getShopSuccess({ shop: data.shop }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error)

        dispatch(getShopFail({ error: errorObject }))
    }
}

const createShop = (storeName, greeting, phone_number) => async (dispatch) => {
    try {
        dispatch(createShopRequest())

        let api_to_create_shop = '/api/shop/createShop'

        let { data } = await axios.post(
            EXPRESS_SERVER + api_to_create_shop,
            {
                storeName,
                greeting,
                phone_number,
            },
            { withCredentials: true }
        )

        dispatch(createShopSuccess({ shop: data.shop }))

        toast.success('Create a store successfully')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to create a store')

        toast.error(errorObject.client_message)

        dispatch(createShopFail({ error: errorObject }))
    }
}

const getShopsByAdmin = (...fields) => async (dispatch) => {
    try {
        dispatch(getShopsRequest())

        let api_to_get_shops = '/api/shop/getShopsByAdmin'

        if (fields.length > 1) {
            api_to_get_shops += `?${fields[0]}=true`
            for (let i = 1; i < fields.length; i++)
                api_to_get_shops += `&${fields[i]}=true`
        } else
            api_to_get_shops += `?${fields[0]}=true`

        let { data } = await axios.get(
            EXPRESS_SERVER + api_to_get_shops,
            { withCredentials: true }
        )

        dispatch(getShopsSuccess({ shops: data.list }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error)

        dispatch(getShopsFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

export {
    getShop, createShop, getShopsByAdmin,
}