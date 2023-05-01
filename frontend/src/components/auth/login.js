import React, { useState, useEffect } from "react"
import { styled } from '@mui/material/styles'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import BottomForm from "./bottom_form"
import { NavLink, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../store/actions/user_actions"
import validator from 'validator'
import { toast } from "react-toastify"
import CircularProgress from '@mui/material/CircularProgress'
import { useForm } from "react-hook-form"

const form_group_icon_style = { color: 'white', marginLeft: '10px' }

const LoginSection = ({ authTheme }) => {
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit } = useForm()
    const { user: { loginStep }, loading } = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    const search = useLocation().search

    useEffect(() => {
        if (loginStep === 2) {
            let redirect
            if (search && search.includes('redirect=')) redirect = search.split('redirect=')[1]

            let timeout = setTimeout(() => { window.open(redirect || '/account', '_self') }, 1000)

            return () => clearTimeout(timeout)
        }
    }, [loginStep])

    const handleShowPassword = () => setShowPassword(pre => !pre)

    const loginSubmit = (data, e) => {
        e.preventDefault()
        if (!data.Email || !data.Password) return toast.warning('Please don\'t empty the email and password input!')

        let email = data.Email.trim()
        if (!validator.isEmail(email)) return toast.warning('Please type format of the email correctly!')

        let password = data.Password
        if (password === '') return toast.warning('Please type the password!')

        dispatch(loginUser(email, password))
    }

    const catchEnterKey = (e) => {
        if (e.key === 'Enter') loginSubmit()
    }

    return (
        <LoginSectionArea id="LoginSectionArea" theme={authTheme}>
            <LoginSectionForm onSubmit={handleSubmit(loginSubmit)}>
                <FormTitle>Sign In</FormTitle>
                <EmailFormGroup>
                    <EmailIcon sx={form_group_icon_style} />
                    <EmailInput
                        {...register('Email')}
                        type="email"
                        id="email"
                        placeholder=" "
                        onKeyDown={catchEnterKey}
                        autoComplete="on"
                    />
                    <EmailLabel htmlFor="email">Enter your e-mail</EmailLabel>
                </EmailFormGroup>
                <PasswordFormGroup>
                    <LockIcon sx={form_group_icon_style} />
                    <PasswordInput
                        {...register('Password')}
                        id="password"
                        placeholder=" "
                        type={showPassword ? "text" : "password"}
                        onKeyDown={catchEnterKey}
                        autoComplete="on"
                    />
                    <PasswordLabel htmlFor="password">Enter your password</PasswordLabel>
                    <ShowPasswordIconWrapper onClick={() => handleShowPassword()}>
                        {
                            showPassword ?
                                <VisibilityIcon sx={{ color: 'white' }} />
                                :
                                <VisibilityOffIcon sx={{ color: 'white' }} />
                        }
                    </ShowPasswordIconWrapper>
                </PasswordFormGroup>
                <SubmitBtnContainer>
                    <ForgotPassword to="/auth/forgotPassword">Forgot Password ?</ForgotPassword>
                    <SignInBtn type="submit">
                        {
                            loading ?
                                <CircularProgress
                                    sx={{ color: 'black' }}
                                    size={19}
                                    thickness={6}
                                />
                                : <span>Login</span>
                        }
                    </SignInBtn>
                </SubmitBtnContainer>
            </LoginSectionForm>
            <SignUp>
                <span>Don't have an account ? </span>
                <NavLink
                    className="NavLink"
                    to="/auth/register"
                >
                    Sign Up.
                </NavLink>
            </SignUp>
            <BottomForm />
        </LoginSectionArea>
    )
}

export default LoginSection

const FormGroup = styled('div')({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    border: '1.5px #33b8b6 solid',
    columnGap: '10px',
    padding: '6px 0',
    paddingRight: '6px',
})

const Label = styled('label')({
    color: 'grey',
    fontSize: '0.9em',
    fontFamily: '"Roboto", "sans-serif"',
    fontWeight: '500',
    padding: '2px 12px',
    position: 'absolute',
    top: '24%',
    left: '10%',
    transition: 'top 0.3s , left 0.3s , background-color 0.3s ease-in , color 0.3s ease-in',
    borderRadius: '3px',
    cursor: 'text',
})

const Input = styled('input')({
    width: '100%',
    fontSize: '1.1em',
    padding: '5px 8px',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'unset',
    backgroundColor: 'transparent',
    color: 'white',
    '&:focus ~ label , :not(:placeholder-shown) ~ label': {
        top: '-33%',
        left: '12%',
        backgroundColor: '#00B0A7',
        color: 'black',
    }
})

const LoginSectionArea = styled('div')(({ theme }) => ({
    ...theme,
}))

const FormTitle = styled('h2')({
    fontFamily: '"Roboto", "sans-serif"',
    fontWeight: '500',
    fontSize: '2em',
    color: 'white',
    margin: '10px 0 15px',
})

const LoginSectionForm = styled('form')({

})

const EmailFormGroup = styled(FormGroup)({

})

const EmailLabel = styled(Label)({

})

const EmailInput = styled(Input)({

})

const PasswordFormGroup = styled(FormGroup)({
    marginTop: '20px',
})

const ShowPasswordIconWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: '5px',
})

const PasswordLabel = styled(Label)({

})

const PasswordInput = styled(Input)({

})

const SubmitBtnContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
})

const ForgotPassword = styled(NavLink)({
    fontFamily: '"Roboto", "sans-serif"',
    color: '#d32f2f',
    fontSize: '0.9em',
    cursor: 'pointer',
    textDecoration: 'unset',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const SignInBtn = styled('button')({
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

const SignUp = styled('div')({
    color: 'white',
    fontFamily: '"Nunito", "sans-serif"',
    '& .NavLink': {
        color: 'yellow',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'inherit',
        '&:hover': {
            textDecoration: 'underline',
        }
    }
})