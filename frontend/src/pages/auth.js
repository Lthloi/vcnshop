import React from "react"
import { createTheme, styled } from '@mui/material/styles'
import Mascot from '../assets/images/VCNShop_Mascot.png'
import { NavLink } from "react-router-dom"
import Login from '../components/auth/login'
import Register from '../components/auth/register/register'
import ForgotPassword from '../components/auth/forgot_password'
import { Route, Routes } from "react-router-dom"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { ThemeProvider } from "@mui/material/styles"

const Auth = () => {

    return (
        <AuthPage id="AuthPage">

            <Layout>
                <HeaderContainer>
                    <Header>WELCOME TO VCN SHOP</Header>
                    <Navigation>
                        <Nav to="/">Home</Nav>
                        <Nav to="/termOfuse">
                            Term Of Use
                        </Nav>
                        <Nav to="/faq">
                            FAQ
                        </Nav>
                    </Navigation>
                    <Text>
                        <span>Create lifestyle in your way.</span>
                        <StyledDoneIcon />
                    </Text>
                    <Text>
                        <span>Shopping and enjoy the moment.</span>
                        <StyledDoneIcon />
                    </Text>
                    <Text>
                        <span>Simply and smoothly.</span>
                        <StyledDoneIcon />
                    </Text>
                </HeaderContainer>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <MascotImage src={Mascot} alt="VCN Shop Mascot" className="flip" />
                    <MascotImage src={Mascot} alt="VCN Shop Mascot" />
                </div>
            </Layout>

            <ThemeProvider theme={AuthBackgroundTheme}>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forgotPassword' element={<ForgotPassword />} />
                </Routes>
            </ThemeProvider>

        </AuthPage>
    )
}

export default Auth

const AuthBackgroundTheme = createTheme({
    auth_background: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '40%',
        minHeight: '100%',
        padding: '20px 40px 30px',
        boxSizing: 'border-box',
        backgroundColor: '#242424',
    },
})

const AuthPage = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '10px',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    [theme.breakpoints.down('lg')]: {
        justifyContent: 'center',
        backgroundColor: '#242424',
    },
}))

const Layout = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '60%',
    height: '100%',
    padding: '40px',
    paddingTop: '30px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('lg')]: {
        display: 'none',
    },
}))

const HeaderContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: '10px',
})

const Header = styled('div')({
    fontFamily: '"Kanit", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '3em',
})

const Navigation = styled('div')({
    display: 'flex',
    columnGap: '40px',
})

const Nav = styled(NavLink)({
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '0.9em',
    color: 'black',
    textDecoration: 'unset',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const Text = styled('div')({
    display: 'flex',
    columnGap: '10px',
    alignItems: 'center',
    marginTop: '10px',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.2em',
    fontWeight: 'bold',
})

const StyledDoneIcon = styled(CheckCircleOutlineIcon)({
    fontSize: '1.2em',
})

const MascotImage = styled('img')({
    color: 'black',
    height: '15em',
    '&.flip': {
        transform: 'rotateY(180deg)',
    }
})