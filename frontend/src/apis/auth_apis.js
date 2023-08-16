import { EXPRESS_SERVER } from "../configs/constants"

const send_register_OTP_api = EXPRESS_SERVER + '/api/auth/sendRegisterOTP/'
const verify_OTP_api = EXPRESS_SERVER + '/api/auth/verifyOTP/'
const complete_register_api = EXPRESS_SERVER + '/api/auth/completeRegister/'
const login_user_api = EXPRESS_SERVER + '/api/auth/loginUser/'
const forgot_password_api = EXPRESS_SERVER + '/api/auth/forgotPassword/'
const reset_password_api = EXPRESS_SERVER + '/api/auth/resetPassword/'
const logout_user_api = EXPRESS_SERVER + '/api/auth/logoutUser/'
const google_sign_in_api = EXPRESS_SERVER + '/api/auth/googleSignIn/'
const get_google_oauth_info_api = EXPRESS_SERVER + '/api/auth/getGoogleOAuthInfo/'

export {
    send_register_OTP_api,
    verify_OTP_api,
    complete_register_api,
    login_user_api,
    forgot_password_api,
    reset_password_api,
    logout_user_api,
    google_sign_in_api,
    get_google_oauth_info_api,
}