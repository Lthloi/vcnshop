import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useSelector } from 'react-redux'
import LoadingApp from '../components/loading_app'
import { toast } from 'react-toastify'
import { useCheckIsAdminRole, useNavToRedirectLogin } from '../hooks/custom_hooks'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'
import { useTheme } from '@emotion/react'

const ProtectedRoute = ({ children, isAdminRoute }) => {
    const [isVerified, setIsVerified] = useState(false)
    const { auth: { isAuthenticated }, user, error } = useSelector(({ user }) => user)
    const navigate_to_login = useNavToRedirectLogin()
    const check_is_admin_role = useCheckIsAdminRole()

    const authHandler = () => {
        if (isAuthenticated) {
            if (isAdminRoute && !check_is_admin_role(user.role)) {
                toast.warning('You don\'t have permission to access this resource')
                navigate_to_login()
            }

            setIsVerified(true)
        } else if (error) {
            toast.warning('Session is expired or not a authenticated user!')
            navigate_to_login()
        }
    }

    useEffect(() => {
        authHandler()
    }, [isAuthenticated, user, error])

    if (isVerified)
        return children

    return (
        <LoadingApp />
    )
}

const ProtectedSection = ({ children }) => {
    const [status, setStatus] = useState(null)
    const { auth: { isAuthenticated }, error } = useSelector(({ user }) => user)
    const navigate_to_login = useNavToRedirectLogin()
    const theme = useTheme()

    const authHandler = () => {
        if (isAuthenticated) {
            setStatus('success')
        } else if (error) {
            setStatus('fail')
        }
    }

    useEffect(() => {
        authHandler()
    }, [isAuthenticated, error])

    if (status === null)
        return (
            <Box
                width="100%"
                boxSizing="border-box"
                padding="50px 30px"
                textAlign="center"
            >
                <CircularProgress
                    thickness={5}
                    size={50}
                    sx={{ color: 'black' }}
                />
            </Box>
        )
    else if (status === 'fail')
        return (
            <Box
                display="flex"
                alignItems="center"
                fontFamily={theme.fontFamily.nunito}
                padding="30px 20px"
                width="100%"
                boxSizing="border-box"
                color="red"
            >
                <span>Please login to access this resource</span>
                <LoginButton onClick={() => navigate_to_login()}>
                    Login
                </LoginButton>
            </Box>
        )

    return children
}

export {
    ProtectedRoute,
    ProtectedSection,
}

const LoginButton = styled('div')({
    color: 'white',
    backgroundColor: 'black',
    padding: '10px 20px',
    marginLeft: '10px',
    textDecoration: 'unset',
    borderRadius: '3px',
    border: '2px black solid',
    cursor: 'pointer',
    width: 'fit-content',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
    }
})