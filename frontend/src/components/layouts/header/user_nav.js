import React from "react"
import { styled } from '@mui/material/styles'
import { useSelector } from "react-redux"
import PersonIcon from '@mui/icons-material/Person'
import { useNavToRedirectLogin } from "../../../hooks/custom_hooks"
import { CircularProgress } from "@mui/material"
import Tooltip from '@mui/material/Tooltip'

const UserNav = () => {
    const { user: { isAuthenticated }, error } = useSelector(({ user }) => user)
    const navigate = useNavToRedirectLogin()

    if (isAuthenticated)
        return (
            <Tooltip title="Account">
                <PersonIconWrapper href="/account">
                    <StyledPersonIcon />
                </PersonIconWrapper>
            </Tooltip>
        )
    else if (!isAuthenticated && error)
        return (
            <>
                <AuthBtn onClick={() => navigate()}>
                    Sign In
                </AuthBtn>
                <AuthBtn href="/auth/register">
                    Sign Up
                </AuthBtn>
            </>
        )
    else
        return (
            <CircularProgress
                size={15}
                thickness={5}
                sx={{ color: 'white' }}
            />
        )
}

export default UserNav

const AuthBtn = styled('a')({
    color: 'white',
    fontFamily: 'nunito',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'unset',
    '&:hover': {
        color: '#51fff6',
        textDecoration: 'underline',
    },
})

const PersonIconWrapper = styled('a')({
    display: 'flex',
    alignItems: 'center',
    padding: '3px',
    borderRadius: '50%',
    ':hover': {
        outline: '2px #51fff6 solid',
    }
})

const StyledPersonIcon = styled(PersonIcon)({
    fontSize: '1.8em',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'unset',
})