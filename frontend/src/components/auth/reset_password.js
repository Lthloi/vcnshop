import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import { useForm } from "react-hook-form"
import CancelIcon from '@mui/icons-material/Cancel'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CircularProgress from '@mui/material/CircularProgress'
import { useDispatch } from "react-redux"
import { resetPassword } from "../../store/actions/user_actions"

const show_password_icon_style = {
    color: 'white',
    cursor: 'pointer',
    transform: 'scale(0.8)',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.1)',
    }
}

const RenderInputWarning = (order) => {
    let warning_text
    if (order === 1)
        warning_text = 'Password must be between 6 and 20 characters long. And must contain at least one capital letter and one number and one lowercase letter.'
    if (order === 2)
        warning_text = 'Password doesn\'t match.'
    return (
        <Warning>
            <CancelIcon sx={{ height: '0.7em', color: 'red' }} />
            <InputWarningText>{warning_text}</InputWarningText>
        </Warning>
    )
}

const ResetPasswordSection = ({ emailWasTyped, loading }) => {
    const { register, formState: { errors }, handleSubmit, setError } = useForm()
    const [showPassword, setshowPassword] = useState(false)
    const dispatch = useDispatch()

    const handleHideShowPassword = () => setshowPassword(pre => !pre)

    const resetPasswordSubmit = (data, e) => {
        e.preventDefault()

        let password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s).{6,}$/

        let new_password = data.NewPassword

        if (!password_regex.test(new_password))
            return setError('NewPassword')
        if (data.confirmPassword !== new_password)
            return setError('confirmPassword')

        dispatch(resetPassword(emailWasTyped, new_password))
    }

    const cancelResetPassword = () => {
        window.open('/auth/login', '_self')
    }

    return (
        <NewPasswordForm
            onSubmit={handleSubmit(resetPasswordSubmit)}
            id="NewPasswordForm"
        >
            <Title>New Password</Title>
            <Desc>
                You need to update your password every time you get a recover password code.
                All this because of safety of your account. Thanks!
            </Desc>

            <Divider sx={{ borderColor: '#858585', marginTop: '10px' }} />

            <FormGroup>
                <NewPasswordInputWrapper>
                    <NewPasswordInput
                        label="Enter a new password"
                        variant="standard"
                        {...register('NewPassword')}
                        fullWidth
                        type={showPassword ? "text" : "password"}
                    />
                    <ShowPasswordIconInputWrapper>
                        {
                            showPassword ?
                                <VisibilityIcon
                                    onClick={handleHideShowPassword}
                                    sx={show_password_icon_style}
                                />
                                :
                                <VisibilityOffIcon
                                    onClick={handleHideShowPassword}
                                    sx={show_password_icon_style}
                                />
                        }
                    </ShowPasswordIconInputWrapper>
                </NewPasswordInputWrapper>

                {errors.NewPassword && RenderInputWarning(1)}

            </FormGroup>

            <FormGroup>
                <ReEnterNewPasswordInputWrapper>
                    <ReEnterNewPasswordInput
                        label="Re-enter the new password"
                        variant="standard"
                        {...register('confirmPassword')}
                        fullWidth
                        type={showPassword ? "text" : "password"}
                    />
                    <ShowPasswordIconInputWrapper>
                        {
                            showPassword ?
                                <VisibilityIcon
                                    onClick={handleHideShowPassword}
                                    sx={show_password_icon_style}
                                />
                                :
                                <VisibilityOffIcon
                                    onClick={handleHideShowPassword}
                                    sx={show_password_icon_style}
                                />
                        }
                    </ShowPasswordIconInputWrapper>
                </ReEnterNewPasswordInputWrapper>

                {errors.confirmPassword && RenderInputWarning(2)}

            </FormGroup>

            <SubmitBtnContainer>
                <CancleBtn
                    onClick={cancelResetPassword}
                    type="button"
                >
                    Cancle Update
                </CancleBtn>
                <SubmitBtn type="submit">
                    {
                        loading ?
                            <CircularProgress
                                sx={{ color: 'black', margin: 'auto' }}
                                size={18}
                                thickness={6}
                            />
                            : <span>Update Password</span>
                    }
                </SubmitBtn>
            </SubmitBtnContainer>
        </NewPasswordForm>
    )
}

export default ResetPasswordSection

const NewPasswordForm = styled('form')({
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
    overflowY: 'auto',
})

const Title = styled('h2')({
    color: 'white',
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.5em',
    fontWeight: 'bold',
    width: 'fit-content',
    position: 'relative',
    textShadow: '2px 2px #893bff ',
    marginTop: '10px',
})

const Desc = styled('p')({
    margin: '0',
    marginTop: '10px',
    fontFamily: 'nunito',
    fontSize: '0.9em',
    fontStyle: 'italic',
    color: 'white',
    textAlign: 'center',
})

const FormGroup = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '15px',
})

const NewPasswordInputWrapper = styled('div')({
    position: 'relative',
    width: '100%',
})

const NewPasswordInput = styled(TextField)({
    '&.MuiTextField-root': {
        '& label.css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root': {
            color: 'grey',
        },
        '& label.MuiInputLabel-shrink': {
            color: '#a956ffb5',
        },
        '& label.MuiInputLabel-standard.Mui-focused': {
            color: '#a956ffb5',
        },
    },
    '& .MuiInputBase-root': {
        '&:hover:not(.Mui-disabled)::before': {
            borderBottom: '1.5px white solid',
        },
        '&::before': {
            borderBottom: '1.5px white solid',
        },
        '&::after': {
            borderBottom: '2px #893bff solid',
        },
        '& input': {
            color: 'white',
            padding: '5px 10px',
        },
    }
})

const ShowPasswordIconInputWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    right: '9px',
    height: '100%',
})

const Warning = styled('span')({
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
})

const InputWarningText = styled('p')({
    color: 'red',
    fontFamily: 'nunito',
    fontSize: '0.8em',
    margin: '0',
    height: 'min-content',
})

const ReEnterNewPasswordInputWrapper = styled('div')({
    position: 'relative',
    width: '100%',
})

const ReEnterNewPasswordInput = styled(NewPasswordInput)({

})

const SubmitBtnContainer = styled('div')({
    display: 'flex',
    columnGap: '3px',
    marginTop: '20px',
})

const CancleBtn = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    flex: '1',
    borderRadius: '20px',
    padding: '5px',
    fontSize: '1.1em',
    fontFamily: 'nunito',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0px 5px grey',
    boxSizing: 'border-box',
    border: '2px black solid',
    position: 'relative',
    '&:hover': {
        top: '-3px',
        boxShadow: '0px 8px grey',
    },
    '&:active': {
        top: '5px',
        boxShadow: 'unset',
    }
})

const SubmitBtn = styled(CancleBtn)({

})