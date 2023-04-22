import React from "react"
import { styled } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import RadioGroup from '@mui/material/RadioGroup'
import { FormControlLabel } from "@mui/material"
import { Radio } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CancelIcon from '@mui/icons-material/Cancel'
import DateOfBirth from "./date_of_birth"
import SaveAltIcon from '@mui/icons-material/SaveAlt'

const inputs = [
    {
        label: 'Full Name',
        required: false,
        maxLength: 25,
        warning: 'Full Name field mustn\'t contain special characters. And must be between 2 and 25 characters long.',
    }, {
        label: 'Email',
        required: true,
        maxLength: 35,
        warning: 'Please enter format of the email correctly!',
    }, {
        label: 'Password',
        required: true,
        maxLength: 20,
        warning: 'Password must be between 6 and 20 characters long. And must contain at least one capital letter and one number and one lowercase letter.',
    }, {
        label: 'Retype Password',
        required: true,
        maxLength: 20,
        warning: 'Password doesn\'t match',
    },
]

const radio_style = {
    '&.Mui-checked': {
        color: 'black',
    },
}

const InformationSection = () => {
    let full_name_regex = /^([a-zA-Z0-9_\- ]){2,}$/
    let password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*\s).{6,}$/
    const { register, formState: { errors }, handleSubmit } = useForm()

    return (
        <Information id="InformationSection">
            <Title>PERSONAL INFORMATION</Title>
            <HelperText>
                <span>Feel free to edit any your detail below if you want to update your information.</span>
                <span> Note that the fields with </span>
                <span className="dot_required">*</span>
                <span> is required.</span>
            </HelperText>

            <div style={{ width: '100%', margin: '20px 0 30px' }}><Dash /></div>

            <InformationForm>
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
                                <InputWarning>{warning}</InputWarning>
                            }
                        </FormGroup>
                    ))
                }

                <FormGroup>
                    <Label>Gender</Label>
                    <RadioGroup
                        row
                        defaultValue={'Female'}
                        sx={{ marginLeft: '5px' }}
                    >
                        <FormControlLabel sx={{ color: 'black' }} value="Female" control={<Radio {...register('Gender')} size="small" color="default" sx={radio_style} />} label="Female" />
                        <FormControlLabel sx={{ color: 'black' }} value="Male" control={<Radio {...register('Gender')} size="small" color="default" sx={radio_style} />} label="Male" />
                        <FormControlLabel sx={{ color: 'black' }} value="Other" control={<Radio {...register('Gender')} size="small" color="default" sx={radio_style} />} label="Other" />
                    </RadioGroup>
                </FormGroup>

                <DateOfBirth />

                <SaveChangeBtn type="submit" title="Click to save the change">
                    <SaveAltIcon />
                    <span>Save Change</span>
                </SaveChangeBtn>
            </InformationForm>
        </Information>
    )
}

export default InformationSection

const Information = styled('div')(({ theme }) => ({
    backgroundColor: '#F5F5F5',
    padding: '20px 30px',
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

const HelperText = styled('div')({
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
    fontSize: '1.1em',
    outline: 'unset',
    boxSizing: 'border-box',
})

const InputWarning = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    color: 'red',
})

const SaveChangeBtn = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '10px',
    border: 'none',
    backgroundColor: '#2D2D2D',
    margin: '0 auto',
    width: 'fit-content',
    padding: '10px 35px',
    color: 'white',
    borderRadius: '30px',
    marginTop: '20px',
    fontFamily: '"Kanit", "sans-serif"',
    fontSize: '1em',
    cursor: 'pointer',
})