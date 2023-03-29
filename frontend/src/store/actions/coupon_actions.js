import axios from 'axios'
import actionsErrorHandler from '../../utils/error_handler'
import {
    getCouponsRequest, getCouponsSuccess, getCouponsFail,
    checkCouponRequest, checkCouponSuccess, checkCouponFail,
} from '../reducers/coupons_reducer'
import { EXPRESS_SERVER } from '../../utils/constants.js'
import { toast } from 'react-toastify'

const getCoupons = (picked_coupon_codes = []) => async (dispatch, getState) => {
    try {
        dispatch(getCouponsRequest())
        
        let api_to_get_coupons = '/api/getCoupons/' + localStorage.getItem('usernameVCNShop')

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_coupons)

        dispatch(getCouponsSuccess({
            new_coupons: data.coupons,
            cartItems: getState().cart.cartItems,
            pickedCodes: picked_coupon_codes.length > 0 ? picked_coupon_codes : [],
        }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get coupons.')

        dispatch(getCouponsFail({ error: errorObject }))
    }
}

const confirmCoupons = (coupon_codes = []) => async (dispatch, getState) => {
    try {
        dispatch(checkCouponRequest())

        let api_to_confirm = '/api/getCoupons/' + localStorage.getItem('usernameVCNShop')

        let { data } = await axios.get(EXPRESS_SERVER + api_to_confirm)

        dispatch(checkCouponSuccess({
            picked_codes: coupon_codes,
            new_coupons: data.coupons,
            cartItems: getState().cart.cartItems,
        }))

        toast.success('Applied coupons you chose!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to confirm coupons.')

        dispatch(checkCouponFail({ error: errorObject }))

        toast.error(errorObject.message)
    }
}

const cancelPickCoupons = (type) => async (dispatch) => {
    try {
        dispatch(checkCouponSuccess({ type }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to cancel pick coupon.')

        dispatch(checkCouponFail({ error: errorObject }))
    }
}

export {
    getCoupons, confirmCoupons, cancelPickCoupons,
}