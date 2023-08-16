import React from "react"
import Badge from '@mui/material/Badge'
import { Stack, styled, Typography, Box, Tooltip } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import foxLogoWhite from '../../../assets/images/logo_app_black.svg'
import MenuBar from "./menu_bar"
import Search from "./search"
import { useSelector } from "react-redux"
import UserNav from "./user_nav"
import { NavLink } from "react-router-dom"
import { useTheme } from "@emotion/react"
import ChangeLanguageBtn from "../../change_language_btn"
import { useTranslation } from "react-i18next"

const LeftSection = () => {
    const theme = useTheme()

    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            minHeight="100%"
            fontFamily={theme.fontFamily.nunito}
            position="absolute"
            top="0"
            left="30px"
            columnGap="20px"
        >

            <ChangeLanguageBtn />

            <Search />

        </Stack>
    )
}

const CenterSection = () => {
    const { t } = useTranslation('home_page')

    return (
        <Stack
            alignItems="center"
            rowGap="5px"
            padding="10px 0"
            component="a"
            href="/"
            sx={{ textDecoration: 'none', color: 'black' }}
            margin="auto"
        >

            <Logo src={foxLogoWhite} alt="App Logo" />

            <Stack alignItems="center" marginTop="5px">
                <Typography
                    component="h2"
                    margin="0"
                    lineHeight="1em"
                    fontSize="1.3em"
                    fontWeight="bold"
                    sx={{ cursor: 'pointer' }}
                >
                    VCN SHOP - FOX COR
                </Typography>
                <Typography
                    letterSpacing="1px"
                    marginTop="3px"
                    sx={{
                        cursor: 'pointer',
                        wordSpacing: '3px',
                    }}
                >
                    {t('Shopping Too Easy')}
                </Typography>
            </Stack>

        </Stack>
    )
}

const RightSection = () => {
    const numberOfCartItems = useSelector(({ cart }) => cart.cartItems.length)
    const { t } = useTranslation('home_page')

    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            columnGap="20px"
            position="absolute"
            minHeight="100%"
            top="0"
            right="30px"
        >

            <UserNav />

            <Tooltip title={t("Cart")}>
                <NavLink to="/cart">
                    <StyledBadge
                        badgeContent={numberOfCartItems}
                        color="default"
                        showZero
                    >
                        <ShoppingCartIcon sx={{ fill: 'black' }} />
                    </StyledBadge>
                </NavLink>
            </Tooltip>

        </Stack>
    )
}

const Navigation = () => {

    return (
        <Box
            component="div"
            id="Navigation-Header"
        >

            <Stack
                flexDirection="row"
                padding="10px 30px"
                position="relative"
            >

                <LeftSection />

                <CenterSection />

                <RightSection />

            </Stack>

            <MenuBar />

        </Box>
    )
}

export default Navigation

const Logo = styled('img')({
    height: '5em',
    width: '5em',
    cursor: 'pointer',
    color: 'white',
})

const StyledBadge = styled(Badge)({
    cursor: 'pointer',
    color: 'black',
    ' span.MuiBadge-anchorOriginTopRight': {
        backgroundColor: '#3FACB1'
    },
    '& svg': {
        transition: 'transform 0.2s',
    },
    '&:hover svg': {
        transform: 'scale(1.2)',
    },
})