import axios from 'axios'
import actionsErrorHandler from '../../utils/error_handler.js'
import {
    getSuggestionsRequest, getSuggestionsSuccess, getSuggestionsFail,
} from '../reducers/search_reducer.js'
import { EXPRESS_SERVER } from '../../utils/constants.js'

const getSearchSuggestions = () => async (dispatch) => {
    try {
        dispatch(getSuggestionsRequest())

        let { data } = await axios.get(EXPRESS_SERVER + '/api/getSearchSuggestions')

        dispatch(getSuggestionsSuccess({ suggestions: data.suggestions }))
    } catch (error) {
        let errorObject = actionsErrorHandler(error, 'Error Warning: fail to get products.')

        dispatch(getSuggestionsFail({ error: errorObject }))
    }
}

export {
    getSearchSuggestions,
}