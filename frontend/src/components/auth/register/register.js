import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import 'react-phone-number-input/style.css'
import ProblemSection from "../../problem_section"
import OTPInput from "./OTP_input"
import BottomForm from "../bottom_form"
import "react-toastify/dist/ReactToastify.css"
import CircularProgress from '@mui/material/CircularProgress'
import ResendOTP from "./resend_OTP"
import { NavLink } from "react-router-dom"
import { toast } from 'react-toastify'
import EmailIcon from '@mui/icons-material/Email'

const RegisterSection = () => {
    
    const [openProblemSection, setOpenProblemSection] = useState(false)
    
    const timeToResendOTP = 120

    const handleOpenProblemSection = open => {
        setOpenProblemSection(open)
    }

    const sendOTP = (e) => {
        try {
            e.preventDefault()
            setSendOTPInProgress(true)
            setTimeout(() => {
                setSendOTPInProgress(false)
                setOTPWasSent(true)
                toast.success('OTP was sent!')
            }, 1000)
        } catch (err) {
            toast.error('Fail to send OTP!')
        }
    }

    return (
        <RegisterSectionArea id="RegisterSectionArea">

            <ProblemSection
                open={openProblemSection}
                handleOpen={handleOpenProblemSection}
            />

            <FormContainer action="#" method="post" onSubmit={sendOTP}>
                <FormTitle>Register</FormTitle>
                {
                    OTPWasSent ?
                        <OTPInput />
                        :
                        <>
                            <FormGroup>
                                <Label htmlFor="StyledPhoneInput">
                                    Enter your email here
                                </Label>
                                <div style={{ display: 'flex', columnGap: '10px' }}>
                                    <EmailIcon sx={{ color: 'white' }} />
                                    <EmailInput
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email here..."
                                    />
                                </div>
                            </FormGroup>
                            <HelperText>
                                An OTP code will be sent to your email to verify.
                            </HelperText>
                        </>
                }
                <SendOTPArea>
                    <Problems onClick={() => handleOpenProblemSection(true)}>
                        Have problem ?
                    </Problems>
                    {
                        sendOTPInProgress ?
                            <SendOTPBtn>
                                <CircularProgress sx={{ color: 'black', }}
                                    size={18} thickness={6}
                                />
                            </SendOTPBtn>
                            :
                            OTPWasSent ?
                                <ResendOTP secondsStarter={timeToResendOTP} />
                                :
                                <SendOTPBtn>
                                    Send OTP
                                </SendOTPBtn>
                    }
                </SendOTPArea>
            </FormContainer>

            <SignIn >
                <span>Already have an account ? </span>
                <NavLink to="/auth/login" className="NavLink">
                    Sign In.
                </NavLink>
            </SignIn>

            <BottomForm />

        </RegisterSectionArea>
    )
}

export default RegisterSection

const RegisterSectionArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '45%',
    height: '100%',
    position: 'absolute',
    zIndex: '2',
    right: '0',
    padding: '20px 40px 30px',
    boxSizing: 'border-box',
    backgroundColor: '#1c1c1c',
})

const FormContainer = styled('form')({

})

const FormTitle = styled('h2')({
    fontFamily: '"Roboto", "sans-serif"',
    fontWeight: '500',
    fontSize: '2em',
    color: 'white',
    margin: '10px 0 15px',
})

const FormGroup = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    rowGap: '10px',
    borderBottom: '1px #00b0a7 solid',
    paddingBottom: '3px',
})

const Label = styled('label')({
    color: 'white',
    fontFamily: '"Roboto", "sans-serif"',
    fontWeight: '500',
    padding: '2px',
})

const EmailInput = styled('input')({
    padding: '0',
    border: 'unset',
    fontSize: '1.1em',
    outline: 'unset',
    backgroundColor: '#1c1c1c',
    color: 'white',
    width: '100%',
})

const HelperText = styled('p')({
    margin: '5px 0 10px',
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
    color: 'white',
    fontSize: '0.8em',
    marginTop: '10px',
})

const SendOTPArea = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5px',
})

const Problems = styled('div')({
    fontFamily: '"Roboto", "sans-serif"',
    color: '#d32f2f',
    fontSize: '0.9em',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const SendOTPBtn = styled('button')({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#00b0a7',
    padding: '7px 10px',
    borderRadius: '5px',
    border: '1px black solid',
})

const SignIn = styled('div')({
    color: 'white',
    fontFamily: '"Nunito", "sans-serif"',
    '& .NavLink': {
        color: 'yellow',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'unset',
        '&:hover': {
            textDecoration: 'underline',
        }
    }
})