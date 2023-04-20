import { toast } from 'react-toastify'
import {
    registerRequest, registerSuccess, registerFail,
    loginRequest, loginSuccess, loginFail,
    forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail,
} from '../reducers/user_reducer.js'
import axios from 'axios'
import { EXPRESS_SERVER } from '../../utils/constants.js'
import actionsErrorHandler from '../../utils/error_handler.js'

const sendOTP = (email) => async (dispatch) => {
    try {
        dispatch(registerRequest())

        let api_to_send_OTP = '/api/sendRegisterOTP'

        await axios.post(EXPRESS_SERVER + api_to_send_OTP, { email })

        dispatch(registerSuccess({ registerStep: 2 }))
        toast.success('OTP was sent!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Something went wrong on system, please try again some minutes later!')

        dispatch(registerFail({ error: errorObject }))

        if (errorObject.isUserError) toast.warning(errorObject.message)
        else toast.error(errorObject.message)
    }
}

const verifyOTP = (OTP_code, email) => async (dispatch) => {
    try {
        dispatch(registerRequest())

        let api_to_verify_OTP = '/api/verifyRegisterOTP'

        await axios.post(EXPRESS_SERVER + api_to_verify_OTP, { OTP_code, email })

        dispatch(registerSuccess({ registerStep: 3 }))
        toast.success('Verify OTP successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Something went wrong on system, please try again some minutes later!')

        dispatch(registerFail({ error: errorObject }))

        if (errorObject.isUserError) {
            toast.warning(errorObject.message)
            if (errorObject.statusCode === 408) setTimeout(() => { window.location.reload() }, 2000)
        } else
            toast.error(errorObject.message)
    }
}

const completeRegister = (name, email, password, gender) => async (dispatch) => {
    try {
        dispatch(registerRequest())

        let api_to_complete_register = '/api/completeRegister'

        await axios.post(
            EXPRESS_SERVER + api_to_complete_register,
            { name, email, password, gender },
            { withCredentials: true }
        )

        dispatch(registerSuccess({ registerStep: 4 }))
        toast.success('Register successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to register, please try again some minutes later!')

        dispatch(registerFail({ error: errorObject }))

        if (errorObject.isUserError) {
            toast.warning(errorObject.message)
            if (errorObject.statusCode === 408) setTimeout(() => { window.location.reload() }, 2000)
        } else
            toast.error(errorObject.message)
    }
}

const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest())

        let api_to_login = '/api/loginUser'

        await axios.post(
            EXPRESS_SERVER + api_to_login,
            { email, password },
            { withCredentials: true }
        )

        dispatch(loginSuccess({ loginStep: 2 }))
        toast.success('Login successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to login, please try again some minutes later!')

        dispatch(loginFail({ error: errorObject }))

        if (errorObject.isUserError) toast.warning(errorObject.message)
        else toast.error(errorObject.message)
    }
}

const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest())

        let api_of_forgot_password = '/api/forgotPassword'

        await axios.post(EXPRESS_SERVER + api_of_forgot_password, { email })

        dispatch(forgotPasswordSuccess())
        toast.success('OTP was sent!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to send OTP, please try again some minutes later!')

        dispatch(forgotPasswordFail({ error: errorObject }))

        if (errorObject.isUserError) toast.warning(errorObject.message)
        else toast.error(errorObject.message)
    }
}

export {
    sendOTP, verifyOTP, completeRegister,
    loginUser, forgotPassword,
}