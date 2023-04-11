import { toast } from 'react-toastify'
import {
    sendOTPRequest, sendOTPSuccess, sendOTPFail,
    verifyOTPRequest, verifyOTPSuccess, verifyOTPFail,
} from '../reducers/user_reducer.js'
import axios from 'axios'
import { EXPRESS_SERVER } from '../../utils/constants.js'
import actionsErrorHandler from '../../utils/error_handler.js'

const sendOTP = (email) => async (dispatch) => {
    try {
        dispatch(sendOTPRequest())

        let api_to_send_OTP = '/api/sendOTP'

        let { data } = await axios.post(
            EXPRESS_SERVER + api_to_send_OTP,
            { email },
            { withCredentials: true }
        )

        if (data.success) {
            dispatch(sendOTPSuccess())
            toast.success('OTP was sent!')
        } else {
            dispatch(sendOTPFail({ fail: data.fail }))
            toast.warning(data.fail)
        }
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to send OTP.')

        dispatch(sendOTPFail({ error: errorObject }))
        toast.error('Something went wrong on system, please try again some minutes later!')
    }
}

const verifyOTP = (OTP_code) => async (dispatch) => {
    try {
        dispatch(verifyOTPRequest())

        let api_to_verify_OTP = '/api/verifyOTP'

        let { data } = await axios.post(
            EXPRESS_SERVER + api_to_verify_OTP,
            { OTP_code },
            { withCredentials: true }
        )

        if (data.success) {
            dispatch(verifyOTPSuccess())
            toast.success('Verify OTP successfully!')
        } else {
            dispatch(verifyOTPFail({ fail: data.fail }))
            toast.warning(data.fail)
        }
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to verify OTP.')

        dispatch(verifyOTPFail({ error: errorObject }))
        toast.error('Something went wrong on system, please try again some minutes later!')
    }
}

export {
    sendOTP, verifyOTP,
}