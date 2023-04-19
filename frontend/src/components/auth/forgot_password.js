import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import { useForm } from "react-hook-form"
import ProblemSection from "../problem_section"
import BottomForm from "./bottom_form"
import CancelIcon from '@mui/icons-material/Cancel'
import Divider from '@mui/material/Divider'
import ClearIcon from '@mui/icons-material/Clear'
import "react-toastify/dist/ReactToastify.css"
import CircularProgress from '@mui/material/CircularProgress'
import { NavLink } from "react-router-dom"
import { toast } from 'react-toastify'
import validator from "validator"

const ForgotPasswordSection = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [onFocus, setOnFocus] = useState(false)
    const [openProblemSection, setOpenProblemSection] = useState(false)
    const [submitInProgress, setSubmitInProgress] = useState(false)

    const handleOpenProblemSection = (open) => {
        setOpenProblemSection(open)
    }

    const handleOnFocus = (focus) => {
        setOnFocus(focus)
    }

    const clearInput = (input_name) => {
        reset({
            [input_name]: ''
        }, {
            keepErrors: false,
            keepDirty: false,
        })
    }

    const checkSubmit = (data, e) => {
        setSubmitInProgress(true)
        setTimeout(() => {
            setSubmitInProgress(false)
            toast.success('Recover code was sent!')
        }, 1000)
    }

    const checkError = (error, e) => {
        toast.error('Fail to send recover code!')
    }

    return (
        <ForgotPasswordArea>

            <ProblemSection open={openProblemSection}
                handleOpen={handleOpenProblemSection}
            />

            <FormContainer id="FormContainer" method="post" action="#"
                onSubmit={handleSubmit(checkSubmit, checkError)}
            >
                <Title>Forgot Password</Title>
                <Desc>
                    Use your email or phone number to recover password.
                    We will send an four-digit code to that and then please
                    typing the code to recover. Thanks!
                </Desc>

                <Divider sx={{ backgroundColor: '#999999' }} />

                <FormGroup>
                    <Label htmlFor="RecoverPasswordInput">Enter your email</Label>
                    <InputWrapper>
                        <Input
                            type="text"
                            id="RecoverPasswordInput"
                            {...register("recover")}
                            placeholder={onFocus ? "" : "Enteremail or phone number here..."}
                            onFocus={() => handleOnFocus(true)}
                            onBlur={() => handleOnFocus(false)}
                        />
                        <ClearIconWrapper>
                            <StyledClearIcon onClick={() => clearInput('recover')} />
                        </ClearIconWrapper>
                    </InputWrapper>
                    {
                        errors.recover &&
                        <TypingWarning>
                            <CancelIcon sx={{ height: '0.7em', color: 'red', }} />
                            <TypingWarningText>Email is not valid</TypingWarningText>
                        </TypingWarning>
                    }
                </FormGroup>
                <SubmitBtnContainer>
                    <SignInBtn onClick={() => handleOpenProblemSection(true)}>
                        Have problem ?
                    </SignInBtn>
                    <SubmitBtn>
                        {
                            submitInProgress ?
                                <CircularProgress sx={{ color: 'black', margin: 'auto', }}
                                    size={18} thickness={6}
                                />
                                : <span>Send recover code</span>
                        }
                    </SubmitBtn>
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

const FormContainer = styled('form')({

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

const TypingWarning = styled('span')({
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
})

const TypingWarningText = styled('p')({
    margin: '0',
    color: 'red',
    fontSize: '0.8em',
    fontFamily: 'nunito',
})

const SubmitBtnContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    marginTop: '10px',
})

const SignInBtn = styled('div')({
    color: 'red',
    fontSize: '1em',
    fontFamily: 'nunito',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const SubmitBtn = styled('button')({
    display: 'flex',
    width: 'fit-content',
    padding: '5px 12px',
    backgroundColor: '#00ffe6',
    border: '2px black solid',
    borderRadius: '20px',
    fontFamily: 'arial',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0px 4px grey',
    position: 'relative',
    bottom: '0',
    left: '0',
    transition: 'background-color 0.3s',
    '&:hover': {
        color: 'black',
        backgroundColor: 'white',
    },
    '&:active': {
        bottom: '-4px',
        boxShadow: '0 0px grey',
    }
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