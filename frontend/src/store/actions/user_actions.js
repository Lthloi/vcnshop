const sendOTP = (email) => async (dispatch) => {
    try {
        dispatch(sendOTPRequest())

        let api_to_get_shop = '/api/sendOTP?email=' + email

        let { data } = await axios.get(EXPRESS_SERVER + api_to_get_shop)

        if (data.success)
            dispatch(sendOTPSuccess())
        else
            dispatch(sendOTPFail({ fail: data.fail }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to .')

        dispatch(sendOTPFail({ error: errorObject }))
    }
}