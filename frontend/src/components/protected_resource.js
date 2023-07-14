import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useSelector } from 'react-redux'
import LoadingApp from './loading_app'
import { toast } from 'react-toastify'
import { useCheckIsAdminRole, useNavToRedirectLogin } from '../hooks/custom_hooks'
import CircularProgress from '@mui/material/CircularProgress'

const status = {
    succeeded: 'succeeded',
    fail: 'fail',
}

const ProtectedResource = ({ children, isWithInternalComponent, isAdminRoute }) => {
    const [statusOfVerify, setstatusOfVerify] = useState(null)
    const { user: { isAuthenticated, role }, error } = useSelector(({ user }) => user)
    const navigate_to_login = useNavToRedirectLogin()
    const check_is_admin_role = useCheckIsAdminRole()

    useEffect(() => {
        if (isAuthenticated) {
            if (isAdminRoute && !check_is_admin_role(role)) {
                toast.warning('You don\'t have permission to access this resource')
                navigate_to_login()
            }
            setstatusOfVerify(status.succeeded)
        } else if (!isAuthenticated && error) {
            if (isWithInternalComponent)
                setstatusOfVerify(status.fail)
            else {
                toast.warning('Session is expired or not a authenticated user!')
                navigate_to_login()
            }
        }
    }, [isAuthenticated, error])

    if (statusOfVerify === status.succeeded)
        return children
    else if (statusOfVerify === status.fail && isWithInternalComponent)
        return (
            <InternalComponent>
                <span>Please login to access this resource</span>
                <LoginButton onClick={() => navigate_to_login()}>
                    Login
                </LoginButton>
            </InternalComponent>
        )

    if (!statusOfVerify && isWithInternalComponent)
        return (
            <InternalLoading>
                <CircularProgress
                    thickness={5}
                    size={50}
                    sx={{ color: 'black' }}
                />
            </InternalLoading>
        )

    return (
        <LoadingApp />
    )
}

export default ProtectedResource

const InternalComponent = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.fontFamily.nunito,
    padding: '30px 20px',
    width: '100%',
    boxSizing: 'border-box',
    color: 'red',
}))

const LoginButton = styled('div')({
    color: 'white',
    backgroundColor: 'black',
    padding: '10px 20px',
    marginLeft: '10px',
    textDecoration: 'unset',
    borderRadius: '3px',
    cursor: 'pointer',
    width: 'fit-content',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const InternalLoading = styled('div')({
    width: '100%',
    boxSizing: 'border-box',
    padding: '50px 30px',
    textAlign: 'center',
})