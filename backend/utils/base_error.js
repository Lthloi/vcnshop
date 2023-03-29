class BaseError extends Error {
    constructor(message, statusCode, name) {
        super(message)

        this.name = name || this.name
        this.message = message
        this.statusCode = statusCode
        this.createdAt = new Date()

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseError)
        }
    }
}

export default BaseError