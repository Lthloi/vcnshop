const verifyEmail = async (req, res, next) => {
    try {
        let { name, username, email, password } = req.body
        // if(!username)
    } catch (error) {
        next(error)
    }
}

export {
    verifyEmail,
}