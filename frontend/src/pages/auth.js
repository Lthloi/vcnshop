import React, { useState } from "react"
import { createTheme, styled } from '@mui/material/styles'
import Mascot from '../assets/images/VCNShop_Mascot.png'
import TermsOfUse from "../components/terms_of_use"
import { NavLink } from "react-router-dom"
import LoginSection from '../components/auth/login'
import RegisterSection from '../components/auth/register/register'
import ForgotPasswordSection from '../components/auth/forgot_password'
import { Route, Routes } from "react-router-dom"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

const Auth = () => {
    const [openTermsOfUseDialog, setOpenTermsOfUseDialog] = useState(false)

    const handleOpenTermsOfUseDialog = (open) => setOpenTermsOfUseDialog(open)

    return (
        <AuthArea id="AuthArea">
            <TermsOfUse
                openDialog={openTermsOfUseDialog}
                handleOpenDialog={handleOpenTermsOfUseDialog}
            />

            <Layout>
                <HeaderContainer>
                    <Header>WELCOME TO VCN SHOP</Header>
                    <Navigation>
                        <Nav to="/">Home</Nav>
                        <Nav onClick={() => handleOpenTermsOfUseDialog(true)}>
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

            <Routes>
                <Route path='/' element={<LoginSection authTheme={customTheme.auth_section_background} />} />
                <Route path='/login' element={<LoginSection authTheme={customTheme.auth_section_background} />} />
                <Route path='/register' element={<RegisterSection authTheme={customTheme.auth_section_background} />} />
                <Route path='/forgotPassword' element={<ForgotPasswordSection authTheme={customTheme.auth_section_background} />} />
            </Routes>
        </AuthArea>
    )
}

export default Auth

const customTheme = createTheme({
    auth_section_background: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '40%',
        height: '100%',
        padding: '20px 40px 30px',
        boxSizing: 'border-box',
        backgroundColor: '#242424',
    },
})

const AuthArea = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '10px',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
})

const Layout = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '60%',
    height: '100%',
    padding: '40px',
    paddingTop: '30px',
    boxSizing: 'border-box',
})

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