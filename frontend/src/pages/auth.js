import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import background_auth_page from '../assets/images/background_auth/background_auth_page.jpg'
import background_auth_section from '../assets/images/background_auth/background_auth_section.jpg'
import Paper from '@mui/material/Paper'
import TermsOfUse from "../components/terms_of_use"
import { NavLink } from "react-router-dom"
import LoginSection from '../components/auth/login'
import RegisterSection from '../components/auth/register/register'
import ForgotPasswordSection from '../components/auth/forgot_password'
import NewPasswordSection from '../components/auth/new_password'
import ProvideInfoSection from '../components/auth/provide_info/provide_info'
import { Route, Routes } from "react-router-dom"

const Auth = () => {
    const [termsOfUseDialog, setTermsOfUseDialog] = useState(false)

    const handleOpenTermsOfUseDialog = (open) => {
        setTermsOfUseDialog(open)
    }

    return (
        <AuthArea id="AuthArea">

            <TermsOfUse openDialog={termsOfUseDialog}
                handleOpenDialog={handleOpenTermsOfUseDialog}
            />

            <AuthSection elevation={5}>
                <TextAndImage id="TextAndImage">
                    <Desc>
                        Create lifestyle in your way.<br />
                        Shopping and enjoy the moment.<br />
                        Simply and smoothly.
                    </Desc>
                    <Visit to="/">
                        VISIT VCN SHOP
                    </Visit>
                    <BottomText>
                        <Text to="/">
                            Home
                        </Text>
                        <Text
                            onClick={() => handleOpenTermsOfUseDialog(true)}
                        >
                            Terms Of Use
                        </Text>
                        <Text>About Us</Text>
                    </BottomText>
                </TextAndImage>

                <Routes>
                    <Route path='/login' element={<LoginSection />} />
                    <Route path='/register' element={<RegisterSection />} />
                    <Route path='/forgotPassword' element={<ForgotPasswordSection />} />
                    <Route path='/newPassword' element={<NewPasswordSection />} />
                    <Route path='/provideInfo' element={<ProvideInfoSection />} />
                </Routes>

            </AuthSection>
        </AuthArea>
    )
}

export default Auth

const AuthArea = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${background_auth_page})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        backgroundColor: '#0000008c',
    }
})

const AuthSection = styled(Paper)({
    display: 'flex',
    width: '85vw',
    height: '80vh',
    backgroundColor: 'white',
    position: 'relative',
    backgroundImage: `url(${background_auth_section})`,
    backgroundSize: '60% 102%',
    overflowY: 'hidden',
})

const TextAndImage = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    zIndex: '1',
    width: '62%',
    padding: '0 50px',
    boxSizing: 'border-box',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        backgroundColor: '#00000073',
    }
})

const Desc = styled('div')({
    position: 'relative',
    zIndex: '10',
    fontFamily: '"Nunito", "sans-serif"',
    color: 'white',
    fontSize: '1.8em',
    fontWeight: 'bold',
    textShadow: '2px 2px black',
})

const Visit = styled(NavLink)({
    position: 'relative',
    color: 'black',
    zIndex: '10',
    padding: '8px 28px',
    backgroundColor: 'white',
    borderRadius: '3px',
    width: 'fit-content',
    marginTop: '20px',
    fontWeight: 'bold',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9em',
    cursor: 'pointer',
    boxShadow: '3px 3px black',
    textDecoration: 'unset',
    '&:active': {
        top: '3px',
        left: '3px',
        boxShadow: 'unset',
    }
})

const BottomText = styled('div')({
    display: 'flex',
    position: 'absolute',
    bottom: '30px',
    left: '5%',
})

const Text = styled(NavLink)({
    marginLeft: '45px',
    width: 'max-content',
    fontWeight: 'bold',
    fontFamily: '"Nunito", "sans-serif"',
    fontStyle: 'italic',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'unset',
    '&:hover': {
        textDecoration: 'underline',
    }
})