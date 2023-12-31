import axios from 'axios'
import axiosErrorHandler from '../../utils/axios_error_handler.js'
import {
    getShopRequest, getShopSuccess, getShopFail,
    createShopRequest, createShopSuccess, createShopFail,
    getShopsRequest, getShopsSuccess, getShopsFail,
} from '../reducers/store_reducer.js'
import { toast } from 'react-toastify'
import {
    get_shop_api,
    get_shops_by_admin_api,
    create_shop_api,
} from '../../apis/shop_apis.js'

const getShop = () => async (dispatch) => {
    try {
        dispatch(getShopRequest())

        let { data } = await axios.get(
            get_shop_api,
            { withCredentials: true }
        )

        dispatch(getShopSuccess({ shop: data.shop }))
    } catch (error) {
        let errorObject = axiosErrorHandler(error)

        dispatch(getShopFail({ error: errorObject }))
    }
}

const createShop = (storeName, greeting, phone_number) => async (dispatch) => {
    try {
        dispatch(createShopRequest())

        let { data } = await axios.post(
            create_shop_api,
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
        let errorObject = axiosErrorHandler(error, 'Fail to create a store')

        toast.error(errorObject.client_message)

        dispatch(createShopFail({ error: errorObject }))
    }
}

const getShopsByAdmin = (...fields) => async (dispatch) => {
    try {
        dispatch(getShopsRequest())

        let query = {}

        for (let field of fields)
            query[field] = 'true'

        let { data } = await axios.get(
            get_shops_by_admin_api,
            {
                withCredentials: true,
                params: query,
            }
        )

        dispatch(getShopsSuccess({ shops: data.list }))
    } catch (error) {
        let errorObject = axiosErrorHandler(error)

        dispatch(getShopsFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

export {
    getShop, createShop, getShopsByAdmin,
}