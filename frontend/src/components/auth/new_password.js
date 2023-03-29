import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import { useForm } from "react-hook-form"
import CancelIcon from '@mui/icons-material/Cancel'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import "react-toastify/dist/ReactToastify.css"
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'

const show_password_icon_style = {
    color: 'white',
    cursor: 'pointer',
    transform: 'scale(0.8)',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.1)',
    }
}

const RenderInputWarning = (input_name) => {
    let warning_text
    if (input_name === 'NewPassword')
        warning_text =
            `Password must be between 6 and 20 
            characters long and must contain at
            least one capital letter`
    if (input_name === 'ReEnterNewPassword')
        warning_text = `Password doesn't match`
    return (
        <Warning>
            <CancelIcon sx={{ height: '0.7em', color: 'red', }} />
            <InputWarningText>
                {warning_text}
            </InputWarningText>
        </Warning>
    )
}

const NewPasswordSection = () => {
    const { register, formState: { errors }, handleSubmit, setError } = useForm()
    const [showPasswordAbove, setshowPasswordAbove] = useState(false)
    const [showPasswordUnder, setShowPasswordUnder] = useState(false)
    const [changePasswordInProgress, setChangePasswordInProgress] = useState(false)

    const handleShowPasswordAbove = () => setshowPasswordAbove(!showPasswordAbove)
    const handleShowPasswordUnder = () => setShowPasswordUnder(!showPasswordUnder)

    const checkSubmit = (data, e) => {
        let new_password = data.NewPassword
        let re_enter_password = data.ReEnterNewPassword
        if (new_password === re_enter_password) {
            setChangePasswordInProgress(true)
            setTimeout(() => {
                toast.success('Change password successfully!')
                e.target.submit()
            }, 1000)
            return
        }
        setError('ReEnterNewPassword')
    }

    return (
        <NewPasswordForm action="#" method="post"
            onSubmit={handleSubmit(checkSubmit)}
            id="NewPasswordForm"
        >
            <Title>New Password</Title>
            <Desc>
                You need to update your password every after password recover.
                All this because of safety of your account. Thanks!
            </Desc>

            <Divider sx={{ borderColor: '#858585', marginTop: '10px', }} />

            <FormGroup>
                <NewPasswordInputWrapper>
                    <NewPasswordInput name="NewPassword" //input above
                        label="Enter a new password" variant="standard"
                        {...register('NewPassword', {
                            required: true,
                            pattern: /^(?=.*?[A-Z]).{6,20}$/,
                        })}
                        fullWidth
                        type={showPasswordAbove ? "text" : "password"}
                    />
                    <ShowPasswordIconInputWrapper>
                        {showPasswordAbove ?
                            <VisibilityIcon onClick={handleShowPasswordAbove}
                                sx={show_password_icon_style}
                            />
                            :
                            <VisibilityOffIcon onClick={handleShowPasswordAbove}
                                sx={show_password_icon_style}
                            />
                        }
                    </ShowPasswordIconInputWrapper>
                </NewPasswordInputWrapper>
                {errors.NewPassword && RenderInputWarning('NewPassword')}
            </FormGroup>

            <FormGroup>
                <ReEnterNewPasswordInputWrapper>
                    <ReEnterNewPasswordInput //input under
                        name="ReEnterNewPassword"
                        label="Re-enter the new password" variant="standard"
                        {...register('ReEnterNewPassword')}
                        fullWidth
                        type={showPasswordUnder ? "text" : "password"}
                    />
                    <ShowPasswordIconInputWrapper>
                        {showPasswordUnder ?
                            <VisibilityIcon onClick={handleShowPasswordUnder}
                                sx={show_password_icon_style}
                            />
                            :
                            <VisibilityOffIcon onClick={handleShowPasswordUnder}
                                sx={show_password_icon_style}
                            />
                        }
                    </ShowPasswordIconInputWrapper>
                </ReEnterNewPasswordInputWrapper>
                {
                    errors.ReEnterNewPassword &&
                    RenderInputWarning('ReEnterNewPassword')
                }
            </FormGroup>

            <SubmitBtnContainer>
                <CancleBtn type="button">
                    Cancle Update
                </CancleBtn>
                <SubmitBtn>
                    {changePasswordInProgress ?
                        <CircularProgress sx={{ color: 'black', margin: 'auto', }}
                            size={18} thickness={6}
                        />
                        : <span>Update Password</span>
                    }
                </SubmitBtn>
            </SubmitBtnContainer>
        </NewPasswordForm>
    )
}

export default NewPasswordSection

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