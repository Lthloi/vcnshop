import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
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
            state.user.receivedOTP = true
            state.loading = false
        },
        sendOTPFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },
        verifyOTPRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        verifyOTPSuccess: (state, action) => {
            state.loading = false
        },
        verifyOTPFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },
        // registerRequest: (state, action) => {
        //     state.error = null
        //     state.loading = true
        // },
        // registerSuccess: (state, action) => {

        //     state.loading = false
        // },
        // registerFail: (state, action) => {
        //     state.error = action.payload.error
        //     state.loading = false
        // },
    },
})

export const {
    sendOTPRequest, sendOTPSuccess, sendOTPFail,
    verifyOTPRequest, verifyOTPSuccess, verifyOTPFail,
} = userSlice.actions

export default userSlice.reducer