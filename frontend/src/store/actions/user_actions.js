import { toast } from 'react-toastify'
import {
    registerRequest, registerSuccess, registerFail,
    loginRequest, loginSuccess, loginFail,
    forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail,
    getUserRequest, getUserSuccess, getUserFail,
    logoutSuccess,
} from '../reducers/user_reducer.js'
import axios from 'axios'
import { EXPRESS_SERVER } from '../../utils/constants.js'
import actionsErrorHandler from '../../utils/error_handler.js'

const sendRegisterOTP = (email) => async (dispatch) => {
    try {
        dispatch(registerRequest())

        let api_to_send_OTP = '/api/sendRegisterOTP'

        await axios.post(EXPRESS_SERVER + api_to_send_OTP, { email })

        dispatch(registerSuccess({ registerStep: 2 }))
        toast.success('OTP was sent!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to send OTP, please try again some minutes later!')

        dispatch(registerFail({ error: errorObject }))

        if (errorObject.isUserError) toast.warning(errorObject.message)
        else toast.error(errorObject.message)
    }
}

const verifyRegisterOTP = (OTP_code, email) => async (dispatch) => {
    try {
        dispatch(registerRequest())

        let api_to_verify_OTP = '/api/verifyOTP'

        await axios.post(EXPRESS_SERVER + api_to_verify_OTP, { OTP_code, email })

        dispatch(registerSuccess({ registerStep: 3 }))
        toast.success('Verify OTP successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to verify OTP, please try again some minutes later!')

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

        dispatch(registerSuccess({ registerStep: 3, isAuthenticated: true }))
        toast.success('Register successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to complete register, please try again some minutes later!')

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

        dispatch(forgotPasswordSuccess({ forgotPasswordStep: 2 }))
        toast.success('OTP was sent!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to send OTP, please try again some minutes later!')

        dispatch(forgotPasswordFail({ error: errorObject }))

        if (errorObject.isUserError) toast.warning(errorObject.message)
        else toast.error(errorObject.message)
    }
}

const verifyOTPOfForgotPassword = (OTP_code, email) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest())

        let api_to_verify_OTP = '/api/verifyOTP'

        await axios.post(EXPRESS_SERVER + api_to_verify_OTP, { OTP_code, email })

        dispatch(forgotPasswordSuccess({ forgotPasswordStep: 3 }))
        toast.success('Verify OTP successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to verify OTP, please try again some minutes later!')

        dispatch(forgotPasswordFail({ error: errorObject }))

        if (errorObject.isUserError) {
            toast.warning(errorObject.message)
            if (errorObject.statusCode === 408) setTimeout(() => { window.location.reload() }, 2000)
        } else
            toast.error(errorObject.message)
    }
}

//only for register period
const resetPassword = (email, new_password) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest())

        let api_to_reset_password = '/api/resetPassword'

        await axios.post(
            EXPRESS_SERVER + api_to_reset_password,
            { newPassword: new_password, email },
            { withCredentials: true }
        )

        dispatch(forgotPasswordSuccess({ forgotPasswordStep: 3, isAuthenticated: true }))
        toast.success('Reset Password Successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to reset password, please try again some minutes later!')

        dispatch(forgotPasswordFail({ error: errorObject }))

        if (errorObject.isUserError) {
            toast.warning(errorObject.message)
            if (errorObject.statusCode === 408) setTimeout(() => { window.location.reload() }, 2000)
        } else
            toast.error(errorObject.message)
    }
}

const getUser = () => async (dispatch) => {
    try {
        dispatch(getUserRequest())

        let api_to_get_user = '/api/getUser'

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_user, { withCredentials: true })

        dispatch(getUserSuccess({ ...data.user }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error)

        dispatch(getUserFail({ error: errorObject }))
    }
}

const updateUserAvatar = (avatar) => async (dispatch) => {
    try {
        let formData = new FormData()
        formData.set('avatarImage', avatar)

        let api_to_update_avatar = '/api/updateUserAvatar'

        let { data } = await axios.put(EXPRESS_SERVER + api_to_update_avatar, formData, { withCredentials: true })

        dispatch(getUserSuccess({ avatar: data.avatarUrl }))

        toast.success('Update user avatar successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to update avatar, please try again some minutes later!')

        dispatch(getUserFail({ error: errorObject }))

        if (errorObject.isUserError) {
            toast.warning(errorObject.message)
        } else
            toast.error(errorObject.message)
    }
}

const updateProfile = (nameOfUser, email, gender, dateOfBirth) => async (dispatch) => {
    try {
        dispatch(getUserRequest())

        let api_to_update_avatar = '/api/updateProfile'

        await axios.put(
            EXPRESS_SERVER + api_to_update_avatar,
            { nameOfUser, email, gender, dateOfBirth },
            { withCredentials: true }
        )

        dispatch(getUserSuccess({ name: nameOfUser, email, gender, date_of_birth: dateOfBirth }))

        toast.success('Update profile successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to update profile, please try again some minutes later!')

        dispatch(getUserFail({ error: errorObject }))

        if (errorObject.isUserError) {
            toast.warning(errorObject.message)
        } else
            toast.error(errorObject.message)
    }
}

const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch(getUserRequest())

        let api_to_update_avatar = '/api/changePassword'

        await axios.put(
            EXPRESS_SERVER + api_to_update_avatar,
            { oldPassword, newPassword },
            { withCredentials: true }
        )

        dispatch(getUserSuccess())

        toast.success('Change password successfully!')
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Fail to update profile, please try again some minutes later!')

        dispatch(getUserFail({ error: errorObject }))

        if (errorObject.isUserError) {
            toast.warning(errorObject.message)
        } else
            toast.error(errorObject.message)
    }
}

const logoutUser = () => async (dispatch) => {
    try {
        let api_to_logout = '/api/logoutUser'

        await axios.post(EXPRESS_SERVER + api_to_logout, {}, { withCredentials: true })

        window.open('/', '_self')

        dispatch(logoutSuccess())
    } catch (error) {
        toast.error('Fail to logout, please try again some minutes later!')
    }
}

export {
    sendRegisterOTP, verifyRegisterOTP, completeRegister,
    loginUser,
    forgotPassword, verifyOTPOfForgotPassword, resetPassword,
    getUser,
    updateUserAvatar, updateProfile, changePassword,
    logoutUser,
}