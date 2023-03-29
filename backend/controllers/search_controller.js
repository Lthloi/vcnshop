import searchModel from '../models/search_schema.js'
import BaseError from '../utils/base_error.js'

const getSearchSuggestions = async (req, res, next) => {
    try {
        let search = await searchModel.findOne({ type: 'suggestions', lang: 'EN' }).lean()
        if (!search) throw new BaseError('Suggestions not found', 404)

        res.status(200).json({
            suggestions: search.suggestions,
        })
    } catch (error) {
        next(error)
    }
}

export {
    getSearchSuggestions,
}