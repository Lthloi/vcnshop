import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        loading: false,
        error: null,
        fail: null,
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
            if (action.payload.error)
                state.error = action.payload.error
            else
                state.fail = action.payload.fail
            state.loading = false
        },


        verifyOTPRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        verifyOTPSuccess: (state, action) => {
            state.user.successToVerifyOTP = true
            state.loading = false
        },
        verifyOTPFail: (state, action) => {
            if (action.payload.error)
                state.error = action.payload.error
            else
                state.fail = action.payload.fail
            state.loading = false
        },


        completeRegisterRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        completeRegisterSuccess: (state, action) => {
            state.user.isAuthenticated = true
            state.loading = false
        },
        completeRegisterFail: (state, action) => {
            if (action.payload.error)
                state.error = action.payload.error
            else
                state.fail = action.payload.fail
            state.loading = false
        },


        loginRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.user.isAuthenticated = true
            state.loading = false
        },
        loginFail: (state, action) => {
            if (action.payload.error)
                state.error = action.payload.error
            else
                state.fail = action.payload.fail
            state.loading = false
        },
    },
})

export const {
    sendOTPRequest, sendOTPSuccess, sendOTPFail,
    verifyOTPRequest, verifyOTPSuccess, verifyOTPFail,
    completeRegisterRequest, completeRegisterSuccess, completeRegisterFail,
    loginRequest, loginSuccess, loginFail,
} = userSlice.actions

export default userSlice.reducer