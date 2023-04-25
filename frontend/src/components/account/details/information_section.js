import React, { useRef } from "react"
import { styled } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import RadioGroup from '@mui/material/RadioGroup'
import { FormControlLabel } from "@mui/material"
import { Radio } from "@mui/material"
import CancelIcon from '@mui/icons-material/Cancel'
import DateOfBirth from "./date_of_birth"
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import validator from 'validator'
import { useDispatch } from "react-redux"
import { updateProfile } from "../../../store/actions/user_actions"
import { CircularProgress } from "@mui/material"

const radio_style = {
    '&.Mui-checked': {
        color: 'black',
    },
}

const InformationSection = ({ loading, nameOfUser, email, gender, dateOfBirthDefault }) => {
    const { register, formState: { errors }, handleSubmit, setError } = useForm()
    const date_of_birth_ref = useRef()
    const dispatch = useDispatch()

    const inputs = [
        {
            label: 'Full Name',
            defaultValue: nameOfUser,
            required: false,
            maxLength: 25,
            warning: 'Full Name field mustn\'t contain special characters. And must be between 2 and 25 characters long.',
        }, {
            label: 'Email',
            defaultValue: email,
            required: true,
            maxLength: 35,
            warning: 'Please enter format of the email correctly!',
        },
    ]

    const saveChangeSubmit = (data, e) => {
        e.preventDefault()

        let isError = false
        let full_name_regex = /^([a-zA-Z0-9_\- ]){2,}$/

        if (data['Full Name'] !== '' && !full_name_regex.test(data['Full Name'])) {
            isError = true
            return setError('Full Name')
        }
        if (!validator.isEmail(data.Email)) {
            isError = true
            return setError('Email')
        }
        if (isError) return

        dispatch(updateProfile(data['Full Name'], data.Email, data.Gender, date_of_birth_ref.current))
    }

    return (
        <Information id="InformationSection">
            <Title>PERSONAL INFORMATION</Title>
            <HelperText>
                Feel free to edit any your detail below if you want to update your information. Note that the fields with * is required.
            </HelperText>

            <div style={{ width: '100%', margin: '20px 0 30px' }}><Dash /></div>

            <InformationForm onSubmit={handleSubmit(saveChangeSubmit)}>
                {
                    inputs.map(({ label, required, warning, maxLength }) => (
                        <FormGroup key={label}>
                            <Label htmlFor={label}>
                                <span>{label}</span>
                                {required && <span className="required">*</span>}
                            </Label>
                            <Input
                                id={label}
                                {...register(label, { required })}
                                type={label !== 'Password' ? 'text' : 'password'}
                                maxLength={maxLength}
                                autoComplete="on"
                            />
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

                <FormGroup>
                    <Label>Gender</Label>
                    <RadioGroup
                        row
                        defaultValue={gender}
                        sx={{ marginLeft: '5px' }}
                    >
                        <FormControlLabel sx={{ color: 'black' }} value="Female" control={<Radio {...register('Gender')} size="small" color="default" sx={radio_style} />} label="Female" />
                        <FormControlLabel sx={{ color: 'black' }} value="Male" control={<Radio {...register('Gender')} size="small" color="default" sx={radio_style} />} label="Male" />
                        <FormControlLabel sx={{ color: 'black' }} value="Other" control={<Radio {...register('Gender')} size="small" color="default" sx={radio_style} />} label="Other" />
                    </RadioGroup>
                </FormGroup>

                <DateOfBirth dateOfBirthRef={date_of_birth_ref} required={false} dateOfBirthDefault={dateOfBirthDefault} />

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
            </InformationForm>
        </Information>
    )
}

export default InformationSection

const Information = styled('div')(({ theme }) => ({
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
    '& span.dot_required': {
        display: 'inline-block',
        color: 'red',
        fontSize: '1em',
        transform: 'scale(1.2)',
    },
})

const Dash = styled('div')({
    height: '5px',
    width: '40px',
    margin: 'auto',
    backgroundColor: 'black',
})

const InformationForm = styled('form')({
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
    width: '100%',
})

const Label = styled('label')({
    display: 'flex',
    columnGap: '5px',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1.4em',
    fontWeight: 'bold',
    marginLeft: '5px',
    width: '55%',
    '& span.required': {
        color: 'red',
    },
})

const Input = styled('input')({
    width: '55%',
    backgroundColor: 'white',
    borderRadius: 'unset',
    border: '2px black solid',
    padding: '8px 15px',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1em',
    outline: 'unset',
    boxSizing: 'border-box',
})

const InputWarning = styled('div')({
    display: 'flex',
    columnGap: '3px',
    alignItems: 'center',
    marginTop: '3px',
    marginLeft: '3px',
    fontFamily: '"Nunito", "sans-serif"',
    color: 'red',
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
        '& svg': {
            color: 'black',
        }
    },
    '&:active': {
        backgroundColor: '#2D2D2D',
        color: 'white',
    }
})