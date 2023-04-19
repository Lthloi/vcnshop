import { toast } from 'react-toastify'
import {
    sendOTPRequest, sendOTPSuccess, sendOTPFail,
    verifyOTPRequest, verifyOTPSuccess, verifyOTPFail,
    completeRegisterRequest, completeRegisterSuccess, completeRegisterFail,
    loginRequest, loginSuccess, loginFail,
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
        )

        if (data.success) {
            dispatch(sendOTPSuccess())
            return toast.success('OTP was sent!')
        }

        dispatch(sendOTPFail({ fail: data.fail }))
        toast.warning(data.fail)
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
        )

        if (data.fail) {
            dispatch(verifyOTPFail({ fail: data.fail }))
            toast.warning(data.fail)
            if (data.OTPIsExpire) setTimeout(() => { window.location.reload() }, 2000)
            return
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
            { name, email, password, gender },
            { withCredentials: true }
        )

        if (data.fail) {
            dispatch(completeRegisterFail({ fail: data.fail }))
            toast.warning(data.fail)
            if (data.registerIsExpire) setTimeout(() => { window.location.reload() }, 2000)
            return
        }

        dispatch(completeRegisterSuccess())
        toast.success('Register successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to verify OTP.')

        dispatch(completeRegisterFail({ error: errorObject }))
        toast.error('Fail to register, please try again some minutes later!')
    }
}

const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest())

        let api_to_login = '/api/loginUser'

        let { data } = await axios.post(
            EXPRESS_SERVER + api_to_login,
            { email, password },
            { withCredentials: true }
        )

        if (data.fail) {
            dispatch(loginFail({ fail: data.fail }))
            return toast.warning(data.fail)
        }

        dispatch(loginSuccess())
        toast.success('Login successfully!')
    } catch (error) {

    }
}

export {
    sendOTP, verifyOTP, completeRegister,
    loginUser,
}