const actionsErrorHandler = (error, message) => {
    let errorObject = {
        message: message,
        error,
    }

    if (error.response && error.response.data && error.response.data.message) {
        errorObject.message += ' Status ' + error.response.status + '. ' +
            error.response.data.message
    } else
        errorObject.message += ' ' + error.message

    return errorObject
}

export default actionsErrorHandler