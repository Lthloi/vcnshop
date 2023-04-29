import { createSlice, current } from '@reduxjs/toolkit'

const defaultValues = {
    registerStep: 1,
    forgotPasswordStep: 1,
    loginStep: 1,
    isAuthenticated: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: defaultValues,
        loading: false,
        error: null,
    },
    reducers: {
        getUserRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        getUserSuccess: (state, action) => {
            let update_account = action.payload
            if (update_account) {
                let current_user = current(state).user
                state.user = {
                    ...current_user,
                    ...update_account,
                }
            }

            state.user.isAuthenticated = true
            state.loading = false
        },
        getUserFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },


        registerRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        registerSuccess: (state, action) => {
            state.user.registerStep = action.payload.registerStep
            if (action.payload.isAuthenticated)
                state.user.isAuthenticated = true
            state.loading = false
        },
        registerFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },


        loginRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.user.loginStep = action.payload.loginStep
            state.user.isAuthenticated = true
            state.loading = false
        },
        loginFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },


        forgotPasswordRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        forgotPasswordSuccess: (state, action) => {
            state.user.forgotPasswordStep = action.payload.forgotPasswordStep
            if (action.payload.isAuthenticated)
                state.user.isAuthenticated = true
            state.loading = false
        },
        forgotPasswordFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },


        logoutSuccess: (state, action) => {
            state.error = null
            state.user = defaultValues
        },
    },
})

export const {
    registerRequest, registerSuccess, registerFail,
    loginRequest, loginSuccess, loginFail,
    forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail,
    getUserRequest, getUserSuccess, getUserFail,
    logoutSuccess,
} = userSlice.actions

export default userSlice.reducer