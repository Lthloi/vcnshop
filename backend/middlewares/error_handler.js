const ErrorHandler = (err, req, res, next) => {
    //init error original detail
    let newError = {
        statusCode: err.statusCode || 500,
        name: err.name,
        message: err.message || "Internal Server Error",
        trace: err.stack || 'Unknown',
        createdAt: err.createdAt || new Date(),
        isUserError: err.isUserError || false,
    }

    //mongoose error due to casting
    if (err.name === 'ValidationError') {
        newError = {
            ...newError,
            message: 'Invalid data type for mongoose: ' + err.message,
            statusCode: 400,
        }
    }

    //mongoose error due to duplicate key
    if (err.code === 11000) {
        newError = {
            ...newError,
            message: 'Mongoose duplicate key 11000',
            statusCode: 400,
        }
    }

    res.status(newError.statusCode).json({
        name: newError.name,
        message: newError.message,
        trace: newError.trace,
        createdAt: newError.createdAt,
        isUserError: newError.isUserError,
    })
}

export default ErrorHandler