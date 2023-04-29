import React from "react"
import { styled } from '@mui/material/styles'
import { useSelector } from "react-redux"
import PersonIcon from '@mui/icons-material/Person'

const AccountButton = () => {
    const { user: { isAuthenticated }, error } = useSelector(({ user }) => user)

    if (isAuthenticated)
        return (
            <PersonIconWrapper href="/account">
                <StyledPersonIcon titleAccess="Account" />
            </PersonIconWrapper>
        )
    else if (!isAuthenticated && error)
        return (
            <>
                <AuthBtn href="/auth/login">
                    Sign In
                </AuthBtn>
                <AuthBtn href="/auth/register">
                    Sign Up
                </AuthBtn>
            </>
        )
}

export default AccountButton

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