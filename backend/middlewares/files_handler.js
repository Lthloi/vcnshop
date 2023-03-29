import BaseError from "../utils/base_error.js"

const filesHandler = async (req, res, next) => {
    try {
        let { files } = req
        if (!files) throw new BaseError(`File data doesn't exist`, 400)

        if (!files.images && !files.files && !files.file)
            throw new BaseError(`Properties of file's data doesn't exist`, 400)

        next()

    } catch (error) {
        next(error)
    }
}

export default filesHandler