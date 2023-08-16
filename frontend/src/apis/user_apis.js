import { EXPRESS_SERVER } from "../configs/constants"

const get_user_api = EXPRESS_SERVER + '/api/user/getUser/'
const update_user_avatar_api = EXPRESS_SERVER + '/api/user/updateUserAvatar/'
const update_profile_api = EXPRESS_SERVER + '/api/user/updateProfile/'
const change_password_api = EXPRESS_SERVER + '/api/user/changePassword/'
const get_users_by_admin_api = EXPRESS_SERVER + '/api/user/getUsersByAdmin/'
const get_user_location_api = EXPRESS_SERVER + '/api/user/getUserLocation/'

export {
    get_user_api,
    update_user_avatar_api,
    update_profile_api,
    change_password_api,
    get_users_by_admin_api,
    get_user_location_api,
}