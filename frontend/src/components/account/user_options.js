import React from "react"
import { styled } from '@mui/material/styles'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AllInboxIcon from '@mui/icons-material/AllInbox'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from "react-router-dom"
import PasswordIcon from '@mui/icons-material/Password'
import { useDispatch } from "react-redux"
import { logoutUser } from "../../store/actions/user_actions"

const icon_style = { color: 'black' }

const navigation_list = [
    { label: 'Information', icon: <AccountCircleIcon sx={icon_style} />, href: '/information' },
    { label: 'Change Password', icon: <PasswordIcon sx={icon_style} />, href: '/changePassword' },
    { label: 'My Orders', icon: <AllInboxIcon sx={icon_style} />, href: '/myOrders' },
    { label: 'Log Out', icon: <LogoutIcon sx={icon_style} />, href: -1 },
]

const Navigation = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNavigation = (href) => {
        if (href === -1) {
            dispatch(logoutUser())
        } else
            navigate('/account' + href)
    }

    return (
        <NavigationSection id="NavigationArea">
            {
                navigation_list.map(({ label, icon, href }) => (
                    <ItemContainer
                        key={label}
                        onClick={() => handleNavigation(href)}
                    >
                        {icon}
                        <Text>{label}</Text>
                    </ItemContainer>
                ))
            }
        </NavigationSection>
    )
}

export default Navigation

const NavigationSection = styled('div')(({ theme }) => ({

}))

const ItemContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '8px',
    backgroundColor: '#F5F5F5',
    padding: '15px 20px',
    cursor: 'pointer',
    borderTop: '1px #d1d1d1 solid',
    '&:last-child': {
        borderBottom: '1px #d1d1d1 solid',
    },
    '&:hover label': {
        textDecoration: 'underline',
    },
})

const Text = styled('label')({
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1.1em',
    cursor: 'pointer',
})