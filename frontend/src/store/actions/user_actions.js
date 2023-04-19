import { toast } from 'react-toastify'
import {
    sendOTPRequest, sendOTPSuccess, sendOTPFail,
    verifyOTPRequest, verifyOTPSuccess, verifyOTPFail,
    completeRegisterRequest, completeRegisterSuccess, completeRegisterFail,
} from '../reducers/user_reducer.js'
import axios from 'axios'
import { EXPRESS_SERVER } from '../../utils/constants.js'
import actionsErrorHandler from '../../utils/error_handler.js'

const sendOTP = (email) => async (dispatch) => {
    try {
        dispatch(sendOTPRequest())

        let api_to_send_OTP = '/api/sendRegisterOTP'

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

const verifyOTP = (OTP_code, email) => async (dispatch) => {
    try {
        dispatch(verifyOTPRequest())

        let api_to_verify_OTP = '/api/verifyRegisterOTP'

        let { data } = await axios.post(
            EXPRESS_SERVER + api_to_verify_OTP,
            { OTP_code, email },
            { withCredentials: true }
        )

        if (data.fail) {
            dispatch(verifyOTPFail({ fail: data.fail }))
            return toast.warning(data.fail)
        }

        dispatch(verifyOTPSuccess())
        toast.success('Verify OTP successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to verify OTP.')

        dispatch(verifyOTPFail({ error: errorObject }))
        toast.error('Something went wrong on system, please try again some minutes later!')
    }
}

const completeRegister = (name, email, password, gender) => async (dispatch) => {
    try {
        dispatch(completeRegisterRequest())

        let api_to_complete_register = '/api/completeRegister'

        let { data } = await axios.post(
            EXPRESS_SERVER + api_to_complete_register,
            { name, email, password, gender }
        )

        if (data.fail) {
            dispatch(completeRegisterFail(data.fail))
            return toast.warning(data.fail)
        }

        dispatch(completeRegisterSuccess())
        toast.warning('Register successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to verify OTP.')

        dispatch(completeRegisterFail({ error: errorObject }))
        toast.error('Fail to register, please try again some minutes later!')
    }
}

export {
    sendOTP, verifyOTP, completeRegister,
}