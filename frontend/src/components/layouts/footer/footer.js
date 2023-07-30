import React from "react"
import { styled } from '@mui/material/styles'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import footer_background_image from '../../../assets/images/footer_background_image.jpg'
import foxLogoWhite from '../../../assets/images/logo_app_white.svg'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import MailIcon from '@mui/icons-material/Mail'
import TelegramIcon from '@mui/icons-material/Telegram'
import cash from '../../../assets/images/payment_methods/cash.jpg'
import visa from '../../../assets/images/payment_methods/visa.jpg'
import mastercard from '../../../assets/images/payment_methods/mastercard.jpg'
import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material"
import { useTheme } from "@emotion/react"
import { NavLink } from "react-router-dom"

const social_icon_style = {
    color: 'white',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.2)',
    }
}

const style_for_title_icons = {
    color: 'white'
}

const menu_navigation = [
    {
        title: 'About us',
        list: [
            { text: 'Terms of use', action: '/termOfUse' },
            { text: 'FAQ', },
            { text: 'Blogs', },
            { text: 'News', },
        ]
    }, {
        title: 'Partner',
        list: [
            { text: 'VCN Travel Look', },
            { text: 'VCN E-Net', },
            { text: 'VCN VLy', },
        ]
    }, {
        title: 'Fast Menu',
        list: [
            { text: 'Men\'s clothing', },
            { text: 'Women\'s clothing', },
            { text: 'Sneaker', },
            { text: 'Suit', },
            { text: 'Unisex', },
        ]
    }, {
        title: 'Contact',
        list: [
            {
                icon: <LocationOnIcon sx={style_for_title_icons} />,
                text: '9th floor of FoxLand Building, 106 Nguyen Van Tien, Bien Hoa - Dong Nai',
            }, {
                icon: <PhoneIcon sx={style_for_title_icons} />,
                text: '(0838) 686 886 986',
            }, {
                icon: <MailIcon sx={style_for_title_icons} />,
                text: 'vcnshop@foxcor.com',
            }, {
                icon: <TelegramIcon sx={style_for_title_icons} />,
                text: '+84 338-988-338',
            }
        ]
    },
]

const payment_methods = [
    { name: 'Visa', img: visa },
    { name: 'Mastercard', img: mastercard },
    { name: 'Cash', img: cash },
]

const SocialNetworks = () => {
    const theme = useTheme()

    return (
        <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            padding="15px 30px"
            bgcolor="#3facb1"
        >
            <Typography
                fontFamily={theme.fontFamily.kanit}
                color="white"
                fontSize="1.3em"
                fontWeight="bold"
            >
                Contact us on social networks!
            </Typography>

            <Stack
                flexDirection="row"
                alignItems="center"
                columnGap="30px"
            >
                <Tooltip title="Facebook">
                    <FacebookIcon sx={social_icon_style} />
                </Tooltip>
                <Tooltip title="YouTube">
                    <YouTubeIcon sx={social_icon_style} />
                </Tooltip>
                <Tooltip title="Instagram">
                    <InstagramIcon sx={social_icon_style} />
                </Tooltip>
                <Tooltip title="Twitter">
                    <TwitterIcon sx={social_icon_style} />
                </Tooltip>
            </Stack>
        </Stack>
    )
}

const LogoSection = () => {
    const theme = useTheme()

    return (
        <Box
            width="23%"
            fontFamily={theme.fontFamily.nunito}
        >
            <Stack
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
            >
                <LogoImg src={foxLogoWhite} />

                <Box
                    marginLeft="10px"
                >
                    <Typography
                        fontFamily="inherit"
                        color="white"
                        fontWeight="bold"
                    >
                        VCN Shop
                    </Typography>
                    <Typography
                        fontSize="0.8em"
                        fontFamily="inherit"
                        color="white"
                    >
                        Shopping Too Easy
                    </Typography>
                </Box>

            </Stack>

            <Stack
                marginTop="20px"
                color="white"
                fontSize="1.2em"
            >
                <span>
                    VCN Shop is an online clothing store and a branch in
                    Dong Nai of the international e-commerce group Fox COR
                    based in HCM City.
                </span>
                <span>Thank for VCN VLy distribution center of goods and services.</span>
            </Stack>
        </Box>
    )
}

const Nav = ({ title, list }) => {
    const theme = useTheme()

    return (
        <NavSection>
            <Typography
                component="h2"
                margin="0"
                paddingBottom="7px"
                color="white"
                fontFamily={theme.fontFamily.kanit}
                borderBottom="3px #3FACB1 solid"
                width="fit-content"
                fontWeight="bold"
                fontSize="1.3em"
            >
                {title}
            </Typography>

            {
                list.map(({ icon, text, action }) => (
                    <Stack
                        key={text}
                        flexDirection="row"
                        alignItems="center"
                        marginTop="20px"
                    >

                        {
                            icon &&
                            <Box
                                marginRight="10px"
                                sx={{ cursor: 'pointer' }}
                            >
                                {icon}
                            </Box>
                        }

                        <Box
                            fontFamily={theme.fontFamily.nunito}
                            color="white"
                        >
                            {
                                action ?
                                    <Typography
                                        component={NavLink}
                                        to={action}
                                        sx={{
                                            cursor: 'pointer',
                                            fontFamily: "inherit",
                                            color: "inherit",
                                            textDecoration: 'none',
                                            '&:hover': { color: '#9ffaff' }
                                        }}
                                    >
                                        {text}
                                    </Typography>
                                    :
                                    <Typography
                                        fontFamily="inherit"
                                    >
                                        {text}
                                    </Typography>
                            }
                        </Box>

                    </Stack>
                ))
            }
        </NavSection>
    )
}

const MenuNav = () => {

    return (
        <Stack
            bgcolor="black"
            padding="0 20px"
            position="relative"
            sx={{
                backgroundImage: `url(${footer_background_image})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >

            <Box
                className="Footer-Modal-Base"
                position="absolute"
                zIndex="1"
                top="0"
                left="0"
                right="0"
                bottom="0"
                bgcolor="#00000087"
            />

            <Stack
                position="relative"
                zIndex="2"
            >

                <Stack
                    justifyContent="space-between"
                    flexDirection="row"
                    padding="40px 20px"
                >
                    <LogoSection />

                    <Nav title={menu_navigation[0].title} list={menu_navigation[0].list} />
                    <Nav title={menu_navigation[1].title} list={menu_navigation[1].list} />
                    <Nav title={menu_navigation[2].title} list={menu_navigation[2].list} />
                    <Nav title={menu_navigation[3].title} list={menu_navigation[3].list} />
                </Stack>

                <Divider flexItem variant="middle" sx={{ backgroundColor: 'rgba(255,255,255,.3)' }} />

                <PaymentMethods />

            </Stack>
        </Stack>
    )
}

const PaymentMethods = () => {
    const theme = useTheme()

    return (
        <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            bgcolor="transparent"
            padding="20px"
        >
            <Typography
                fontFamily={theme.fontFamily.nunito}
                fontSize="0.8em"
                color="white"
            >
                &copy; 2023 VCN Shop - FOX E-commerce Corporation
            </Typography>
            <Stack
                flexDirection="row"
                columnGap="20px"
                paddingRight="30px"
            >
                {
                    payment_methods.map(({ name, img }) => (
                        <Tooltip
                            key={name}
                            title={name}
                            placement="top"
                        >
                            <Method src={img} />
                        </Tooltip>
                    ))
                }
            </Stack>
        </Stack>
    )
}

const Footer = () => {
    return (
        <Box
            component="div"
            id="FooterSection"
            marginTop="30px"
        >

            <SocialNetworks />

            <MenuNav />

        </Box>
    )
}

export default Footer

const LogoImg = styled('img')({
    height: '100px',
})

const NavSection = styled('div')({
    width: '12vw',
    marginLeft: '10px',
    '&:last-child': {
        width: '22vw',
        '& h2': {
            marginLeft: '32px',
        }
    }
})

const Method = styled('img')({
    height: '25px',
    width: '40px',
})