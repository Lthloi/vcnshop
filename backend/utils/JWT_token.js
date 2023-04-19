import UserModel from '../models/user_schema.js'

const { JWT_TOKEN_MAX_AGE_IN_DAY } = process.env

const sendJWTToken = (response, user_id) => {
    let user_instance = new UserModel({ _id: user_id })
    let JWT_token = user_instance.getJWTToken()

    let cookie_option = {
        maxAge: JWT_TOKEN_MAX_AGE_IN_DAY * 86400000,
        path: '/',
        httpOnly: true,
        //>>> fix this: change domain
        domain: 'localhost',
    }

    response.cookie('JWT_token', JWT_token, cookie_option)
}

export default sendJWTToken