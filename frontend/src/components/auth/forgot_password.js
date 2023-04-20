import React, { useEffect, useRef, useState } from "react"
import { styled } from '@mui/material/styles'
import ProblemSection from "../problem_section"
import BottomForm from "./bottom_form"
import Divider from '@mui/material/Divider'
import ClearIcon from '@mui/icons-material/Clear'
import "react-toastify/dist/ReactToastify.css"
import CircularProgress from '@mui/material/CircularProgress'
import { NavLink } from "react-router-dom"
import { toast } from 'react-toastify'
import validator from "validator"
import { useDispatch, useSelector } from "react-redux"
import NewPasswordSection from "./new_password"

const ForgotPasswordSection = () => {
    const [openProblemSection, setOpenProblemSection] = useState(false)
    const email_input_ref = useRef()
    const { user: { forgotPasswordStep }, loading } = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (forgotPasswordStep === 3) {
            let timeout = setTimeout(() => {
                window.open('/account', '_self')
            }, 2000)
            return () => clearTimeout(timeout)
        }
    }, [forgotPasswordStep])

    const handleOpenProblemSection = (open) => {
        setOpenProblemSection(open)
    }

    const clearInput = () => email_input_ref.current.value = ''

    const forgotPasswordSubmit = () => {
        let email = email_input_ref.current.value
        if (!validator.isEmail(email))
            return toast.warning('Please enter format of the email correctly!')

        dispatch()
    }

    const catchEnterKey = (e) => {
        if (e.key === 'Enter') forgotPasswordSubmit()
    }

    return (
        forgotPasswordStep === 2 ? (
            <NewPasswordSection />
        ) :
            <ForgotPasswordArea>

                <ProblemSection
                    open={openProblemSection}
                    handleOpen={handleOpenProblemSection}
                />

                <FormContainer>
                    <Title>Forgot Password</Title>
                    <Desc>
                        Use your email to recover your password.
                        We will send an four-digit code to that and then please
                        typing the code to recover. Thanks!
                    </Desc>

                    <Divider sx={{ backgroundColor: '#999999' }} />

                    <FormGroup>
                        <Label htmlFor="RecoverPasswordInput">Enter your email</Label>
                        <InputWrapper>
                            <Input
                                ref={email_input_ref}
                                type="text"
                                placeholder="Enteremail or phone number here..."
                                onKeyDown={catchEnterKey}
                            />
                            <ClearIconWrapper>
                                <StyledClearIcon onClick={clearInput} />
                            </ClearIconWrapper>
                        </InputWrapper>
                    </FormGroup>
                    <SubmitBtnContainer>
                        <ProblemBtn onClick={() => handleOpenProblemSection(true)}>
                            Have problem ?
                        </ProblemBtn>
                        <SendRecoverCode onClick={forgotPasswordSubmit}>
                            {
                                loading ?
                                    <CircularProgress
                                        sx={{ color: 'black', margin: 'auto' }}
                                        size={18}
                                        thickness={6}
                                    />
                                    : <span>Send recover code</span>
                            }
                        </SendRecoverCode>
                    </SubmitBtnContainer>
                </FormContainer>
                <SignIn>
                    <span>Already have an account ? </span>
                    <NavLink to="/auth/login" className="NavLink">
                        Sign In.
                    </NavLink>
                </SignIn>
                <BottomForm />
            </ForgotPasswordArea>
    )
}

export default ForgotPasswordSection

const ForgotPasswordArea = styled('div')({
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

const Title = styled('h2')({
    margin: '0',
    marginTop: '10px',
    fontFamily: 'arial',
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
    width: 'fit-content',
    paddingBottom: '8px',
    '&::after': {
        content: '""',
        height: '5px',
        width: '100%',
        backgroundColor: '#893bff',
        position: 'absolute',
        bottom: '0',
        left: '15px',
    }
})

const Desc = styled('p')({
    margin: '10px 0',
    textAlign: 'center',
    fontFamily: 'nunito',
    color: 'white',
})

const FormGroup = styled('div')({
    marginTop: '15px',
})

const Label = styled('label')({
    width: 'fit-content',
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: '1.1em',
    color: 'white',
    marginLeft: '5px',
})

const InputWrapper = styled('div')({
    marginTop: '5px',
    position: 'relative',
})

const Input = styled('input')({
    backgroundColor: 'transparent',
    border: '2px #00ffe6 solid',
    outline: 'unset',
    fontSize: '1em',
    color: 'white',
    padding: '8px 15px',
    paddingRight: '30px',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '5px',
    '&:focus': {
        borderRightWidth: '10px',
    }
})

const ClearIconWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    right: '12px',
    height: '100%',
})

const StyledClearIcon = styled(ClearIcon)({
    color: 'white',
    cursor: 'pointer',
    transform: 'scale(0.8)',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.1)',
    }
})

const SubmitBtnContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
})

const ProblemBtn = styled('div')({
    color: 'red',
    fontSize: '1em',
    fontFamily: 'nunito',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const SendRecoverCode = styled('button')({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#00b0a7',
    padding: '7px 15px',
    borderRadius: '5px',
    border: '1px black solid',
    height: '35px',
})

const SignIn = styled('div')({
    color: 'white',
    fontFamily: 'nunito',
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