import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingApp from '../components/loading_app'
import { toast } from 'react-toastify'
import { useCheckIsAdminRole, useCurrentRoute, useNavToRedirectLogin } from '../hooks/custom_hooks'

const ProtectedRoute = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false)
    const { user: { isAuthenticated, role }, error } = useSelector(({ user }) => user)
    const navigate_to_login = useNavToRedirectLogin()
    const current_route = useCurrentRoute()
    const check_is_admin_role = useCheckIsAdminRole()

    useEffect(() => {
        if (isAuthenticated) {
            if (current_route.includes('admin') && !check_is_admin_role(role)) {
                toast.warning('You don\'t have permission to access this resource')
                navigate_to_login()
            }
            setIsVerified(true)
        }
        if (!isAuthenticated && error) {
            toast.warning('Session is expired or not a authenticated user!')
            navigate_to_login()
        }
    }, [isAuthenticated, error])

    if (isVerified) return children

    return (
        <LoadingApp isAuthorization={true} />
    )
}

export default ProtectedRoute