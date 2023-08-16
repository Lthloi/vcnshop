import React from "react"
import { styled } from '@mui/material/styles'
import { useSelector } from "react-redux"
import PersonIcon from '@mui/icons-material/Person'
import { useNavToRedirectLogin } from "../../../hooks/custom_hooks"
import { CircularProgress } from "@mui/material"
import Tooltip from '@mui/material/Tooltip'
import { useNavigate } from "react-router-dom"
import { Stack } from '@mui/material'
import { useTranslation } from "react-i18next"

const UserNav = () => {
    const { auth: { isAuthenticated }, error } = useSelector(({ user }) => user)
    const navigate_to_login = useNavToRedirectLogin()
    const navigate = useNavigate()
    const { t } = useTranslation('home_page')

    const handleAuthNavigate = (option) => {
        if (option === 'login')
            navigate_to_login()
        else if (option === 'register')
            navigate('/auth/register')
        else
            navigate('/account')
    }

    return (
        isAuthenticated ? (
            <Tooltip title={t("Account")}>
                <PersonIconWrapper onClick={() => handleAuthNavigate('account')}>
                    <PersonIcon sx={{ fontSize: '1.8em', color: 'black' }} />
                </PersonIconWrapper>
            </Tooltip>
        ) : !isAuthenticated && error ? (
            <Stack flexDirection="row" alignItems="center">
                <AuthBtn onClick={() => handleAuthNavigate('login')}>
                    {t('Sign In')}
                </AuthBtn>
                <AuthBtn onClick={() => handleAuthNavigate('register')}>
                    {t('Sign Up')}
                </AuthBtn>
            </Stack>
        ) :
            <CircularProgress
                size={15}
                thickness={5}
                sx={{ color: 'black' }}
            />
    )
}

export default UserNav

const AuthBtn = styled('span')(({ theme }) => ({
    fontFamily: theme.fontFamily.nunito,
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'unset',
    padding: '5px 15px',
    borderRadius: '10px',
    '&:hover': {
        backgroundColor: 'black',
        color: 'white',
    },
}))

const PersonIconWrapper = styled('span')({
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    borderRadius: '50%',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'black',
        '& svg': {
            color: 'white',
        }
    }
})