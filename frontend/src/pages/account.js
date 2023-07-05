import React from "react"
import { styled } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import Navigation from "../components/account/user_options"
import Avatar from "../components/account/avatar"
import ScrollToTopBtn from "../components/scroll_top_top_btn"
import { Route, Routes, NavLink } from "react-router-dom"
import InformationSection from "../components/account/details/information_section"
import MyOrders from "../components/account/details/my_orders"
import ChangePassword from "../components/account/details/change_password"
import { useSelector } from "react-redux"
import VCNShop_Mascot from '../assets/images/VCNShop_Mascot.png'
import OrderDetail from "../components/account/details/order_detail"
import StoreIcon from '@mui/icons-material/Store'

const Greeting = () => (
    <GreetingContainer>
        <GreetingText>Welcome to VCN Shop</GreetingText>
        <img src={VCNShop_Mascot} alt="VCN Shop Mascot" style={{ height: '220px' }} />
    </GreetingContainer>
)

const Account = () => {
    const { user, loading, error } = useSelector(({ user }) => user)

    return (
        <AccountPage id="AccountPage">
            <PageTitleContainer>
                <PersonIcon sx={{ width: '1.4em', height: '1.4em' }} />
                <Title>Account</Title>
            </PageTitleContainer>

            <MyStoreSection>
                <span></span>
                <NavToMyStore to="/myStore/Products">
                    <StoreIcon />
                    <span>My Store</span>
                </NavToMyStore>
            </MyStoreSection>

            {
                error ?
                    <Error>{error.message}</Error>
                    : user && user.name &&
                    <NavigationAndDetail>
                        <div style={{ width: '30%' }}>
                            <Avatar nameOfUser={user.name} userAvatar={user.avatar} loading={loading} />
                            <Navigation />
                        </div>

                        <div style={{ width: '100%' }}>
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
                                <Route path="/myOrders/orderDetail/:orderId" element={<OrderDetail />} />
                            </Routes>
                        </div>
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
    fontFamily: theme.fontFamily.kanit,
}))

const PageTitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    borderBottom: '2px black solid',
})

const Title = styled('h2')({
    margin: '0',
    fontSize: '1.8em',
})

const MyStoreSection = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    margin: '20px 0',
})

const NavToMyStore = styled(NavLink)({
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
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
    }
})

const Error = styled('div')({
    fontWeight: 'bold',
    color: 'red',
    padding: '30px 20px',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
    fontSize: '1.1em',
})

const NavigationAndDetail = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '20px',
    marginTop: '10px',
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
    fontSize: '3em',
    fontWeight: 'bold',
})