import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import { useForm } from "react-hook-form"
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CancelIcon from '@mui/icons-material/Cancel'
import { changePassword } from "../../../store/actions/user_actions"
import { useDispatch } from 'react-redux'
import { CircularProgress } from "@mui/material"

const inputs = [
    {
        label: 'The Old Password',
        required: true,
        maxLength: 25,
        warning: 'Please enter the old password.',
    }, {
        label: 'New Password',
        required: true,
        maxLength: 35,
        warning: 'Password must be between 6 and 20 characters long. And must contain at least one capital letter and one number and one lowercase letter.',
    }, {
        label: 'Retype The New Password',
        required: true,
        maxLength: 35,
        warning: 'Doen\'t Match',
    },
]

const password_style = {
    marginRight: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.2)',
    }
}

const ChangePassword = ({ loading }) => {
    const { register, formState: { errors }, handleSubmit, setError } = useForm()
    const [showPassword, setShowPassword] = useState([false, false, false])
    const dispatch = useDispatch()

    const handleHideShowPassword = (index) => {
        if (index !== 0) setShowPassword(pre => [pre[0], !pre[1], !pre[2]])
        else setShowPassword(pre => [!pre[0], pre[1], pre[2]])
    }

    const changePasswordSubmit = (data, e) => {
        e.prentDefault()

        let isError = false
        let password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s).{6,}$/

        if (!password_regex.test(data['New Password'])) {
            isError = true
            setError('New Password')
        }
        if (data['New Password'] !== data['Retype The New Password']) {
            isError = true
            setError('Retype The New Password')
        }
        if (isError) return

        dispatch(changePassword(data['The Old Password'], data['New Password']))
    }

    return (
        <ChangePasswordSection id="ChangePasswordSection">
            <Title>CHANGE YOUR PASSWORD</Title>
            <HelperText>
                We suggest you update your password one time per six months. Note that the fields with * is required.
            </HelperText>

            <div style={{ width: '100%', margin: '20px 0 30px' }}><Dash /></div>

            <ChangePasswordForm onSubmit={handleSubmit(changePasswordSubmit)}>
                {
                    inputs.map(({ label, required, maxLength, warning }, index) => (
                        <FormGroup key={label}>
                            <Label htmlFor={label}>
                                <span>{label}</span>
                                {required && <span className="required">*</span>}
                            </Label>
                            <InputContainer>
                                <Input
                                    id={label}
                                    {...register(label, { required })}
                                    type={showPassword[index] ? 'text' : 'password'}
                                    maxLength={maxLength}
                                    autoComplete="on"
                                />
                                {
                                    showPassword[index] ?
                                        <VisibilityIcon
                                            sx={password_style}
                                            onClick={() => handleHideShowPassword(index)}
                                        />
                                        :
                                        <VisibilityOffIcon
                                            sx={password_style}
                                            onClick={() => handleHideShowPassword(index)}
                                        />
                                }
                            </InputContainer>
                            {
                                errors[label] &&
                                <InputWarning>
                                    <CancelIcon sx={{ color: 'red', fontSize: '1em' }} />
                                    <span>{warning}</span>
                                </InputWarning>
                            }
                        </FormGroup>
                    ))
                }

                <SaveChangeBtn type="submit" title="Click to save the change">
                    {
                        loading ?
                            <CircularProgress
                                sx={{ color: 'white' }}
                                size={24}
                                thickness={7}
                            />
                            :
                            <>
                                <SaveAltIcon />
                                <span>Save Change</span>
                            </>
                    }
                </SaveChangeBtn>
            </ChangePasswordForm>
        </ChangePasswordSection>
    )
}

export default ChangePassword

const ChangePasswordSection = styled('div')(({ theme }) => ({
    backgroundColor: '#F5F5F5',
    padding: '20px 30px 40px',
    boxSizing: 'border-box',
    width: '100%',
}))

const Title = styled('h2')({
    margin: '10px 0',
    width: '100%',
    textAlign: 'center',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '2.2em',
})

const HelperText = styled('p')({
    margin: '0',
    fontSize: '0.9em',
    textAlign: 'center',
    fontFamily: '"Kanit", "sans-serif"',
})

const Dash = styled('div')({
    height: '5px',
    width: '40px',
    margin: 'auto',
    backgroundColor: 'black',
})

const ChangePasswordForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    width: '100%',
})

const FormGroup = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    columnGap: '5px',
    padding: '5px',
    width: '50%',
})

const Label = styled('label')({
    display: 'flex',
    columnGap: '5px',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1.4em',
    fontWeight: 'bold',
    marginLeft: '5px',
    width: '100%',
    '& span.required': {
        color: 'red',
    },
})

const InputContainer = styled('div')({
    display: 'flex',
    columnGap: '5px',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    border: '2px black solid',
    boxSizing: 'border-box',
    backgroundColor: 'white',
})

const Input = styled('input')({
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 'unset',
    border: 'none',
    padding: '8px 15px',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1em',
    outline: 'unset',
    boxSizing: 'border-box',
})

const InputWarning = styled('div')({
    display: 'flex',
    columnGap: '5px',
    alignItems: 'center',
    fontFamily: '"Nunito", "sans-serif"',
    color: 'red',
    marginTop: '3px',
    marginLeft: '3px',
})

const SaveChangeBtn = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '10px',
    border: '2px #2D2D2D solid',
    backgroundColor: '#2D2D2D',
    margin: '0 auto',
    boxSizing: 'border-box',
    width: 'fit-content',
    padding: '10px 35px',
    color: 'white',
    borderRadius: '30px',
    marginTop: '20px',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1em',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
    },
    '&:active': {
        backgroundColor: '#2D2D2D',
        color: 'white',
    }
})