const axiosErrorHandler = (error, client_message = 'Something went wrong, please try again minutes later') => {
    const errorObject = {
        originalError: error,
        statusCode: 500,
        message: '',
        isUserError: false,
        client_message: client_message,
    }

    let response_of_error = error.response

    if (response_of_error) { //if error was made by server at backend

        errorObject.statusCode = response_of_error.status //update error status

        let data_of_response = response_of_error.data

        if (data_of_response.isUserError) //check if is error due to user or not
            errorObject.isUserError = true

        errorObject.message = data_of_response.message  //update error message

    } else if (error.request) { //The request was made but no response was received
        errorObject.statusCode = 502
        errorObject.message = 'Bad network or error from server.'
    } else { //Something happened in setting up the request that triggered an Error
        errorObject.message = error.message
    }

    return errorObject
}

export default axiosErrorHandler