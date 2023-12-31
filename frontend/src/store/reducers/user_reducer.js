import { createSlice, current } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        auth: {
            registerStep: 1,
            forgotPasswordStep: 1,
            loginStep: 1,
            isAuthenticated: false,
        },
        loading: false,
        error: null,
        users: [],
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

            state.auth.isAuthenticated = true
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
            state.auth.registerStep = action.payload.registerStep
            if (action.payload.isAuthenticated)
                state.auth.isAuthenticated = true
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
            state.auth.loginStep = action.payload.loginStep
            state.auth.isAuthenticated = true
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
            state.auth.forgotPasswordStep = action.payload.forgotPasswordStep
            if (action.payload.isAuthenticated)
                state.auth.isAuthenticated = true
            state.loading = false
        },
        forgotPasswordFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },


        logoutSuccess: (state, action) => {
            state.auth.isAuthenticated = false
        },


        getUsersByAdminRequest: (state, action) => {
            state.loading = true
            state.error = null
        },
        getUsersByAdminSuccess: (state, action) => {
            state.loading = false
            state.users = action.payload.users
        },
        getUsersByAdminFail: (state, action) => {
            state.loading = false
            state.error = action.payload.error
        }
    },
})

export const {
    registerRequest, registerSuccess, registerFail,
    loginRequest, loginSuccess, loginFail,
    forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail,
    getUserRequest, getUserSuccess, getUserFail,
    logoutSuccess,
    getUsersByAdminRequest, getUsersByAdminSuccess, getUsersByAdminFail,
} = userSlice.actions

export default userSlice.reducer