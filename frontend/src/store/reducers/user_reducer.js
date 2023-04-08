import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'shop',
    initialState: {
        user: {},
        loading: false,
        error: null,
    },
    reducers: {
        sendOTPRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        sendOTPSuccess: (state, action) => {

        },
        sendOTPFail: (state, action) => {

        },
        registerRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        registerSuccess: (state, action) => {

            state.loading = false
        },
        registerFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },
    },
})

export const {
    registerRequest, registerSuccess, registerFail,
} = userSlice.actions

export default userSlice.reducer