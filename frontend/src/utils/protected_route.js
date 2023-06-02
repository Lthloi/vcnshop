import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingApp from '../components/loading_app'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavToRedirectLogin } from '../hooks/custom_hooks'

const ProtectedRoute = () => {
    const [isVerified, setIsVerified] = useState(false)
    const { user: { isAuthenticated }, error } = useSelector(({ user }) => user)
    const navigate_to_login = useNavToRedirectLogin()

    useEffect(() => {
        if (isAuthenticated) setIsVerified(true)
        if (!isAuthenticated && error) {
            toast.warning('Session is expired or not a authenticated user!')
            navigate_to_login()
        }
    }, [isAuthenticated, error])


    if (isVerified) return <Outlet />

    return (
        <LoadingApp isAuthorization={true} />
    )
}

export default ProtectedRoute