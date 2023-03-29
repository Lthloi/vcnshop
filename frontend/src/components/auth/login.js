import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import BottomForm from "./bottom_form"
import { NavLink } from "react-router-dom"

const LoginSection = () => {
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword(!showPassword)

    return (
        <LoginSectionArea id="LoginSectionArea">
            <LoginSectionForm action="#" method="post">
                <FormTitle>
                    Sign In
                </FormTitle>
                <EmailFormGroup>
                    <AccountBoxIcon
                        sx={{ color: 'white', position: 'absolute', left: '15px', top: '18px', }}
                    />
                    <EmailInput
                        type="email"
                        id="email"
                        placeholder=" "
                        name="Email"
                    />
                    <EmailLabel htmlFor="email">
                        E-mail or Phone Number
                    </EmailLabel>
                </EmailFormGroup>
                <PasswordFormGroup>
                    <ShowPasswordIconWrapper onClick={() => handleShowPassword()}>
                        {
                            showPassword ?
                                <VisibilityIcon sx={{ color: 'white' }} />
                                :
                                <VisibilityOffIcon sx={{ color: 'white' }} />
                        }
                    </ShowPasswordIconWrapper>
                    <LockIcon
                        sx={{ color: 'white', position: 'absolute', left: '15px', top: '18px', }}
                    />
                    <PasswordInput id="password" placeholder=" " name="Password"
                        type={showPassword ? "text" : "password"}
                    />
                    <PasswordLabel htmlFor="password">
                        Password
                    </PasswordLabel>
                </PasswordFormGroup>
                <ForgotPasswordArea>
                    <ForgotPassword to="/auth/forgotPassword">
                        Forgot Password ?
                    </ForgotPassword>
                    <SignInBtn type="submit">Login</SignInBtn>
                </ForgotPasswordArea>
            </LoginSectionForm>
            <SignUp>
                <span>Don't have an account ? </span>
                <NavLink className="NavLink"
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
})

const Label = styled('label')({
    color: 'grey',
    fontFamily: '"Roboto", "sans-serif"',
    fontWeight: '500',
    padding: '2px 12px',
    position: 'absolute',
    top: '18px',
    left: '40px',
    transition: 'top 0.3s , left 0.3s , background-color 0.3s ease-in , color 0.3s ease-in',
    borderRadius: '3px',
    cursor: 'text',
})

const Input = styled('input')({
    marginTop: '7px',
    width: '100%',
    fontSize: '1.1em',
    padding: '12px 46px 10px',
    boxSizing: 'border-box',
    border: '1.5px #33b8b6 solid',
    borderRadius: '5px',
    outline: 'unset',
    backgroundColor: 'transparent',
    color: 'white',
    '&:focus ~ label , :not(:placeholder-shown) ~ label': {
        top: '-8px',
        left: '50px',
        backgroundColor: '#33b8b6',
        color: 'black',
    }
})

const LoginSectionArea = styled('div')({
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
    marginTop: '35px',
})

const ShowPasswordIconWrapper = styled('div')({
    position: 'absolute',
    top: '18px',
    right: '15px',
    cursor: 'pointer',
})

const PasswordLabel = styled(Label)({

})

const PasswordInput = styled(Input)({

})

const ForgotPasswordArea = styled('div')({
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
    border: 'unset',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#953bff',
    padding: '8px 30px',
    borderRadius: '5px',
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