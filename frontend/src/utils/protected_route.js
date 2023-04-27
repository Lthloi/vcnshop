import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../store/actions/user_actions'
import LoadingApp from '../components/loading_app'

const ProtectedRoute = ({ children }) => {
    const [auth, setAuth] = useState(false)
    const { user, error } = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.isAuthenticated) dispatch(getUser())
    }, [])

    useEffect(() => {
        if (user.isAuthenticated) setAuth(true)
        if (!user.isAuthenticated && error) navigate('/auth/login')
    }, [user.isAuthenticated, error])


    if (auth) return children

    return (
        <LoadingApp isAuthorization={true} />
    )
}

export default ProtectedRoute