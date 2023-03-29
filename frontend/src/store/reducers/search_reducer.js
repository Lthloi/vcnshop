import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        suggestions: {},
        loading: false,
        error: false,
    },
    reducers: {
        getSuggestionsRequest: (state, action) => {
            state.error = false
            state.loading = true
        },
        getSuggestionsSuccess: (state, action) => {
            state.suggestions = action.payload.suggestions
            state.loading = false
        },
        getSuggestionsFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },
    },
})

export const {
    getSuggestionsRequest, getSuggestionsSuccess, getSuggestionsFail,
} = searchSlice.actions

export default searchSlice.reducer