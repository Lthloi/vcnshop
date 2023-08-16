import React from "react"
import { styled } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import Navigation from "../components/account/user_options"
import Avatar from "../components/account/avatar"
import ScrollToTopBtn from "../components/scroll_top_top_btn"
import { Route, Routes, NavLink } from "react-router-dom"
import Information from "../components/account/details/information"
import MyOrders from "../components/account/details/my_orders"
import ChangePassword from "../components/account/details/change_password"
import VCNShop_Mascot from '../assets/images/VCNShop_Mascot.png'
import OrderDetail from "../components/account/details/order_detail"
import StoreIcon from '@mui/icons-material/Store'
import { Box, Stack, Typography } from "@mui/material"
import { useTheme } from "@emotion/react"

const Greeting = () => {
    return (
        <Stack
            justifyContent="space-between"
            alignItems="center"
            rowGap="10px"
            bgcolor="F5F5F5"
            padding="20px 30px 40px"
            boxSizing="border-box"
            width="100%"
            height="100%"
        >
            <Typography fontSize="3em" component="h2" margin="0">
                Welcome to VCN Shop
            </Typography>
            <img src={VCNShop_Mascot} alt="VCN Shop Mascot" style={{ height: '220px' }} />
        </Stack>
    )
}

const GoToStore = () => {
    return (
        <Stack
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
            margin="20px 0"
        >
            <span></span>
            <NavToMyStore to="/myStore/Products">
                <StoreIcon />
                <span>My Store</span>
            </NavToMyStore>
        </Stack>
    )
}

const Account = () => {
    const theme = useTheme()

    return (
        <Box
            id="AccountPage"
            component="div"
            marginTop='20px'
            width='100%'
            padding='0 50px'
            boxSizing='border-box'
        >
            <Stack
                flexDirection="row"
                alignItems="center"
                columnGap="10px"
                borderBottom="2px black solid"
            >
                <PersonIcon sx={{ width: '1.4em', height: '1.4em' }} />
                <Typography component="h2" margin="0" fontSize="1.8em" fontFamily={theme.fontFamily.kanit}>
                    Account
                </Typography>
            </Stack>

            <GoToStore />

            <Stack
                flexDirection="row"
                justifyContent="space-between"
                columnGap="20px"
                marginTop="10px"
                width="100%"
            >
                <Stack width="30%">
                    <Avatar />
                    <Navigation />
                </Stack>

                <Stack width="100%">
                    <Routes>
                        <Route path="/" element={<Greeting />} />
                        <Route path="/information" element={<Information />} />
                        <Route path="/myOrders" element={<MyOrders />} />
                        <Route path="/changePassword" element={<ChangePassword />} />
                        <Route path="/myOrders/orderDetail/:orderId" element={<OrderDetail />} />
                    </Routes>
                </Stack>
            </Stack>

            <ScrollToTopBtn />
        </Box>
    )
}

export default Account

const NavToMyStore = styled(NavLink)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '5px',
    padding: '10px 25px',
    fontWeight: 'bold',
    fontSize: '1.1em',
    cursor: 'pointer',
    border: '2px black solid',
    textDecoration: 'unset',
    fontFamily: theme.fontFamily.kanit,
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
    }
}))