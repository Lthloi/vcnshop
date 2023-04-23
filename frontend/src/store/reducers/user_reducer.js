import { createSlice, current } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            registerStep: 1,
            forgotPasswordStep: 1,
            loginStep: 1,
            isAuthenticated: false,
        },
        loading: false,
        error: null,
    },
    reducers: {
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


        updateUserRequest: (state, action) => {
            state.error = null
            state.loading = true
        },
        updateUserSuccess: (state, action) => {
            let new_avatar = action.payload.newAvatar
            if (new_avatar) state.user.avatar = new_avatar

            let update_profile = action.payload.updateProfile
            if (update_profile) {
                let { nameOfUser, email, gender, dateOfBirth } = update_profile
                let current_user = current(state).user
                state.user = {
                    ...current_user,
                    name: nameOfUser,
                    email,
                    gender,
                    date_of_birth: dateOfBirth,
                }
            }

            state.loading = false
        },
        updateUserFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },
    },
})

export const {
    registerRequest, registerSuccess, registerFail,
    loginRequest, loginSuccess, loginFail,
    forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail,
    updateUserRequest, updateUserSuccess, updateUserFail,
} = userSlice.actions

export default userSlice.reducer