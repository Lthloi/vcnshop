class BaseError extends Error {
    constructor(message, statusCode, name, isUserError) {
        super(message)

        this.name = name || this.name
        this.message = message
        this.statusCode = statusCode
        this.createdAt = new Date()

        //status error includes errors that is not important such as: register timing out, user with the email is exist in database, etc
        this.isUserError = isUserError || false

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseError)
        }
    }
}

export default BaseError