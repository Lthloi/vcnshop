import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getUser } from '../store/actions/user_actions'

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user.isAuthenticated) dispatch(getUser())
    }, [])

    if (user.isAuthenticated)
        return children
    else
        return <Navigate to={'/auth/login'} replace={true} />
}

export default ProtectedRoute