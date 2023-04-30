import React from "react"
import { styled } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import Navigation from "../components/account/user_options"
import Avatar from "../components/account/avatar"
import ScrollToTopBtn from "../components/scroll_top_top_btn"
import { Route, Routes } from "react-router-dom"
import InformationSection from "../components/account/details/information_section"
import MyOrders from "../components/account/details/my_orders"
import ChangePassword from "../components/account/details/change_password"
import { useSelector } from "react-redux"
import VCNShop_Mascot from '../assets/images/VCNShop_Mascot.png'

const Greeting = () => (
    <GreetingContainer>
        <GreetingText>Welcome to VCN Shop</GreetingText>
        <Mascot src={VCNShop_Mascot} alt="VCN Shop Mascot" />
    </GreetingContainer>
)

const Account = () => {
    const { user, loading } = useSelector(({ user }) => user)

    return (
        <AccountPage id="AccountPage">
            <PageTitleContainer>
                <PersonIcon sx={{ width: '1.4em', height: '1.4em' }} />
                <Title>Account</Title>
            </PageTitleContainer>

            {
                user && user.name &&
                <NavigationAndDetail>
                    <AvatarAndNavigation>
                        <Avatar nameOfUser={user.name} userAvatar={user.avatar} loading={loading} />
                        <Navigation />
                    </AvatarAndNavigation>

                    <DetailsContainer>
                        <Routes>
                            <Route path="/" element={<Greeting />} />
                            <Route
                                path="/information"
                                element={
                                    <InformationSection
                                        loading={loading}
                                        nameOfUser={user.name}
                                        email={user.email}
                                        gender={user.gender}
                                        dateOfBirthDefault={user.date_of_birth}
                                    />
                                }
                            />
                            <Route path="/myOrders" element={<MyOrders />} />
                            <Route path="/changePassword" element={<ChangePassword loading={loading} />} />
                        </Routes>
                    </DetailsContainer>
                </NavigationAndDetail>
            }

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

const GreetingContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '10px',
    backgroundColor: '#F5F5F5',
    padding: '20px 30px 40px',
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
})

const GreetingText = styled('div')({
    fontFamily: 'Kanit, "sans-serif"',
    fontSize: '3em',
    fontWeight: 'bold',
})

const Mascot = styled('img')({
    height: '220px',
})