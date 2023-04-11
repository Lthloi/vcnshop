import React, { useRef, useState } from "react"
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
import { useDispatch, useSelector } from 'react-redux'
import { sendOTP } from "../../../store/actions/user_actions"

const RegisterSection = () => {
    const { user: { receivedOTP }, loading } = useSelector(({ user }) => user)
    const [openProblemSection, setOpenProblemSection] = useState(false)
    const email_input_ref = useRef()
    const dispatch = useDispatch()

    const timeToResendOTP = 120

    const handleOpenProblemSection = open => setOpenProblemSection(open)

    const sendOTPSubmit = (e) => {
        let email = email_input_ref.current.value
        if (email.length === 0) return toast.warning('Please enter your email!')
        let email_regex = /^[a-zA-Z0-9]+([\\._\\-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\\.\\-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/
        if (!email_regex.test(email))
            return toast.warning('Please enter format of email correctly!')

        dispatch(sendOTP(email))
    }

    return (
        <RegisterSectionArea id="RegisterSectionArea">

            <ProblemSection
                open={openProblemSection}
                handleOpen={handleOpenProblemSection}
            />

            <FormContainer>
                <FormTitle>Register</FormTitle>
                {
                    receivedOTP ?
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
                                        ref={email_input_ref}
                                        type="email"
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
                        loading ?
                            <SendOTPBtn>
                                <CircularProgress sx={{ color: 'black', }}
                                    size={18} thickness={6}
                                />
                            </SendOTPBtn>
                            :
                            receivedOTP ?
                                <ResendOTP secondsStarter={timeToResendOTP} />
                                :
                                <SendOTPBtn onClick={sendOTPSubmit}>
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

const FormContainer = styled('div')({

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