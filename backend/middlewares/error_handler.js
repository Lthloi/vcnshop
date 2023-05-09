import { IP2_ERROR } from '../utils/constant.js'

const ErrorHandler = (err, req, res, next) => {
    //init error original detail
    let setError = {
        statusCode: err.statusCode || 500,
        name: err.name,
        message: err.message || "Internal Server Error",
        trace: err.stack || 'Unknown',
        createdAt: err.createdAt || new Date(),
        isUserError: err.isUserError || false,
    }

    //mongoose error due to casting
    if (setError.name === 'ValidationError')
        setError = {
            ...setError,
            message: 'Invalid data type for mongoose: ' + err.message,
            statusCode: 400,
        }

    //ip2 error
    if (setError.name === IP2_ERROR) {
        if (setError.statusCode === 10001) setError.message = 'Invalid IP address.'
        setError.statusCode = 500
    }

    res.status(setError.statusCode).json({
        name: setError.name,
        message: setError.message,
        trace: setError.trace,
        createdAt: setError.createdAt,
        isUserError: setError.isUserError,
    })
}

export default ErrorHandler