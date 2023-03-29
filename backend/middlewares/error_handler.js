const ErrorHandler = (err, req, res, next) => {
    //init error original detail
    let newError = {
        statusCode: err.statusCode || 500,
        name: err.name,
        message: err.message || "Internal Server Error",
        trace: err.stack || 'Unknown',
        createdAt: err.createdAt || new Date(),
    }

    //mongoose error due to casting
    if (err.name === 'CastError') {
        newError = {
            ...newError,
            message: 'Path: ' + err.path + err.message,
            statusCode: 400,
        }
    }

    //mongoose error due to duplicate key
    if (err.code === 1100) {
        newError = {
            ...newError,
            message: 'Mongoose duplicate key 1100',
            statusCode: 400,
        }
    }

    return res.status(newError.statusCode).json({
        name: newError.name,
        message: newError.message,
        trace: newError.trace,
        createdAt: newError.createdAt,
    })
}

export default ErrorHandler