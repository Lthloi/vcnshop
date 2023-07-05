const actionsErrorHandler = (error, client_message = 'Something went wrong, please try again minutes later') => {
    let errorObject = {
        originalError: error,
        statusCode: 500,
        message: '',
        isUserError: false,
        client_message,
    }

    let response_of_error = error.response

    if (response_of_error) { //if is error that due to server create

        errorObject.statusCode = response_of_error.status

        let data_of_response = response_of_error.data

        if (data_of_response.isUserError) //check if status error
            errorObject.isUserError = true

        errorObject.message = data_of_response.message //if not a status error

    } else if (error.request) {
        errorObject.statusCode = 502
        errorObject.message = 'Bad network or error from server.'
    } else
        errorObject.message = error.message

    return errorObject
}

export default actionsErrorHandler