import React from "react"
import { styled } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import Navigation from "../components/account/navigation"
import Avatar from "../components/account/avatar"
import ScrollToTopBtn from "../components/scroll_top_top_btn"
import { Route, Routes } from "react-router-dom"
import Information from "../components/account/details/information_section"
import MyOrders from "../components/account/details/my_orders"
import ChangePassword from "../components/account/details/change_password"

const Account = () => {
    return (
        <AccountPage id="AccountPage">
            <PageTitleContainer>
                <PersonIcon sx={{ width: '1.4em', height: '1.4em' }} />
                <Title>Account</Title>
            </PageTitleContainer>

            <NavigationAndDetail>
                <AvatarAndNavigation>
                    <Avatar nameOfUser={'mmmmmmmm'} />
                    <Navigation />
                </AvatarAndNavigation>

                <DetailsContainer>
                    <Routes>
                        <Route path="/information" element={<Information />} />
                        <Route path="/myOrders" element={<MyOrders />} />
                        <Route path="/changePassword" element={<ChangePassword />} />
                    </Routes>
                </DetailsContainer>
            </NavigationAndDetail>

            <ScrollToTopBtn />
        </AccountPage>
    )
}

export default Account

const AccountPage = styled('div')(({ theme }) => ({
    marginTop: '20px',
    width: '100%',
    padding: '0 50px',
    boxSizing: 'border-box',
}))

const PageTitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    borderBottom: '2px black solid',
})

const Title = styled('h2')({
    margin: '0',
    fontFamily: 'Kanit, "sans-serif"',
    fontSize: '1.8em',
})

const NavigationAndDetail = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '20px',
    marginTop: '10px',
    width: '100%',
})

const AvatarAndNavigation = styled('div')({
    width: '30%',
})

const DetailsContainer = styled('div')({
    width: '100%',
})