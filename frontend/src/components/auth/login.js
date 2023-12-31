import React, { useState, useEffect, useCallback } from "react"
import { styled } from '@mui/material/styles'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import OAuth from "./OAuth"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../store/actions/user_actions"
import validator from 'validator'
import { toast } from "react-toastify"
import CircularProgress from '@mui/material/CircularProgress'
import { useForm } from "react-hook-form"
import UndoIcon from '@mui/icons-material/Undo'
import { Tooltip, Typography, IconButton, Stack, Box } from '@mui/material'
import { useGetQueryValue } from "../../hooks/custom_hooks"
import { redirectAfterSeconds } from '../../utils/redirect_handler'

const form_group_icon_style = { color: 'white', marginLeft: '10px' }

const auto_account = {
    user: {
        email: 'luongthanhloi000@gmail.com',
        password: 'asd123C',
    },
    admin: {
        email: 'codevoicainay@gmail.com',
        password: 'Adminvcnshop095',
    }
}

const AutoAccountButton = ({ handleSetAutoAccount }) => {
    const [getAccountBtn, setGetAccountBtn] = useState(false)

    const style_for_btn = {
        padding: '10px 25px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
    }

    return (
        <Stack columnGap="10px" flexDirection="row" marginTop="20px" alignItems="center">
            {
                getAccountBtn ?
                    <>
                        <button
                            style={style_for_btn}
                            onClick={() => handleSetAutoAccount('user')}
                            type="button"
                        >
                            For User
                        </button>
                        <button
                            style={style_for_btn}
                            onClick={() => handleSetAutoAccount('admin')}
                            type="button"
                        >
                            For Admin
                        </button>
                        <Tooltip arrow title="Back">
                            <IconButton onClick={() => setGetAccountBtn(false)} sx={{ border: '1px gray solid' }}>
                                <UndoIcon sx={{ color: 'white', fontSize: '0.75em' }} />
                            </IconButton>
                        </Tooltip>
                    </>
                    :
                    <button style={style_for_btn} onClick={() => setGetAccountBtn(true)}>
                        Get An Accnount
                    </button>
            }
        </Stack>
    )
}

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, setValue } = useForm()
    const { auth: { loginStep }, loading } = useSelector(({ user }) => user)
    const dispatch = useDispatch()
    const query_value_getter = useGetQueryValue()

    const handle_login_redirect = () => {
        let redirect = query_value_getter(undefined, 'redirect')

        if (redirect)
            redirect = '/' + redirect
        else
            redirect = '/account'

        return redirectAfterSeconds(1000, { isReload: false, href: redirect })
    }

    useEffect(() => {
        if (loginStep === 2) {
            toast.success('Register successfully!')

            let timeout = handle_login_redirect()

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

    const handleSetAutoAccount = useCallback((role) => {
        if (role === 'user') {
            setValue('Email', auto_account.user.email)
            setValue('Password', auto_account.user.password)
        } else {
            setValue('Email', auto_account.admin.email)
            setValue('Password', auto_account.admin.password)
        }
    }, [])

    return (
        <LoginSection id="LoginSectionArea">

            <form onSubmit={handleSubmit(loginSubmit)} action="#">

                <Typography
                    fontWeight='bold'
                    fontSize='2em'
                    color='white'
                    margin='10px 0 15px'
                    component="h2"
                >
                    Sign In
                </Typography>

                <FormGroup>
                    <EmailIcon sx={form_group_icon_style} />
                    <Input
                        {...register('Email')}
                        type="email"
                        id="email"
                        placeholder=" "
                        onKeyDown={catchEnterKey}
                        autoComplete="on"
                    />
                    <Label htmlFor="email">Enter your e-mail</Label>
                </FormGroup>

                <FormGroup sx={{ marginTop: '30px' }}>
                    <LockIcon sx={form_group_icon_style} />
                    <Input
                        {...register('Password')}
                        id="password"
                        placeholder=" "
                        type={showPassword ? "text" : "password"}
                        onKeyDown={catchEnterKey}
                        autoComplete="on"
                    />
                    <Label htmlFor="password">Enter your password</Label>
                    <Box
                        onClick={() => handleShowPassword()}
                        component="div"
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        marginRight='5px'
                        sx={{ cursor: 'pointer' }}
                    >
                        {
                            showPassword ?
                                <VisibilityIcon sx={{ color: 'white' }} />
                                :
                                <VisibilityOffIcon sx={{ color: 'white' }} />
                        }
                    </Box>
                </FormGroup>

                <Stack marginTop="20px" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <ForgotPassword to="/auth/forgotPassword">
                        Forgot Password ?
                    </ForgotPassword>

                    <Box
                        display="flex"
                        fontSize='1em'
                        fontWeight='bold'
                        backgroundColor='#00b0a7'
                        padding='10px 20px'
                        borderRadius='5px'
                        border='1px black solid'
                        height='40px'
                        component="button"
                        sx={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        {
                            loading ?
                                <CircularProgress
                                    sx={{ color: 'black', margin: 'auto' }}
                                    size={19}
                                    thickness={6}
                                />
                                : <span>Login</span>
                        }
                    </Box>
                </Stack>

                <AutoAccountButton handleSetAutoAccount={handleSetAutoAccount} />

            </form>

            <SignUp>
                <span>Don't have an account ? </span>
                <NavLink
                    className="NavLink"
                    to="/auth/register"
                >
                    Sign Up.
                </NavLink>
            </SignUp>

            <OAuth />

        </LoginSection>
    )
}

export default Login

const LoginSection = styled('div')(({ theme }) => ({
    ...theme.auth_background,
    fontFamily: theme.fontFamily.nunito,
    [theme.breakpoints.down('md')]: {
        minWidth: '100%',
        padding: '20px',
    }
}))

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
        top: '-40%',
        left: '12%',
        backgroundColor: '#00B0A7',
        color: 'black',
    }
})

const ForgotPassword = styled(NavLink)({
    color: 'red',
    fontSize: '0.9em',
    cursor: 'pointer',
    textDecoration: 'unset',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const SignUp = styled('div')(({ theme }) => ({
    color: 'white',
    marginTop: '10px',
    '& .NavLink': {
        color: 'yellow',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'inherit',
        '&:hover': {
            textDecoration: 'underline',
        }
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9em',
    }
}))