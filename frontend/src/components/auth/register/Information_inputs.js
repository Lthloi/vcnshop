import React, { useState, } from "react"
import { styled } from '@mui/material/styles'
import ClearIcon from '@mui/icons-material/Clear'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import CancelIcon from '@mui/icons-material/Cancel'
import RadioGroup from '@mui/material/RadioGroup'
import { FormControlLabel } from "@mui/material"
import { Radio } from "@mui/material"

const inputs = [
    {
        label: 'Full Name',
        required: false,
        max_length: 25,
        helper_text: 'We will use this one to display to other members.',
        warning: 'Full Name field mustn\'t contain special characters. And must be between 2 and 25 characters long.',
    }, {
        label: 'Password',
        required: false,
        max_length: 20,
        helper_text: 'Use this one with your email to login',
        warning: 'Password must be between 6 and 20 characters long. And must contain at least one capital letter and one number and one lowercase letter.',
    }, {
        label: 'Retype Password',
        required: false,
        max_length: 20,
        helper_text: 'Must match the typed password',
        warning: 'Not match the typed password',
    }
]

const input_icon_style = {
    color: 'white',
    cursor: 'pointer',
    transform: 'scale(0.8)',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.1)',
    },
}

const radio_style = {
    color: 'white',
    '&.Mui-checked': {
        color: '#00faff',
    },
}

const RenderInputWarnings = (input_warning) => {
    return (
        <>
            <CancelIcon sx={{ height: '0.7em', color: 'red', }} />
            <InputWarningText>{input_warning}</InputWarningText>
        </>
    )
}

const InformationInputs = ({ register, errors, reset, emailWasTyped }) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword(pre=>!pre)

    const clearInput = (input_label) => {
        reset({
            [input_label]: '',
        }, {
            keepErrors: false,
            keepDirty: false,
        })
    }

    return (
        <InputsArea id="InputsArea">
            <InputFormGroup sx={{ opacity: '0.6' }}>
                <InputLabelContainer>
                    <InputLabel>Email</InputLabel>
                </InputLabelContainer>
                <InputContainer>
                    <Input value={emailWasTyped} readOnly />
                </InputContainer>
                <HelperText>Email you provided</HelperText>
            </InputFormGroup>
            {
                inputs.map(({ label, helper_text, required, max_length, warning }) => (
                    <InputFormGroup key={label}>
                        <InputLabelContainer>
                            <InputLabel htmlFor={label}>
                                {label}
                            </InputLabel>
                            {required && <span className="force">*</span>}
                        </InputLabelContainer>
                        <InputContainer>
                            <Input
                                autoComplete="on"
                                id={label} //input
                                maxLength={max_length}
                                type={label !== 'Password' && label !== 'Retype Password' ? 'text' : showPassword ? 'text' : 'password'}
                                {...register(label, { required })}
                            />
                            <ArrowIconWrapper className="ArrowIconWrapper">
                                <ArrowRightIcon sx={{ color: 'white', width: '1.2em', height: '1.2em' }} />
                            </ArrowIconWrapper>
                            <InputIconWrapper>
                                {
                                    label !== 'Password' && label !== 'Retype Password' ? (
                                        <ClearIcon
                                            sx={input_icon_style}
                                            onClick={() => clearInput(label)}
                                        />
                                    ) : showPassword ? (
                                        <VisibilityIcon
                                            sx={input_icon_style}
                                            onClick={handleShowPassword}
                                        />
                                    ) :
                                        <VisibilityOffIcon
                                            sx={input_icon_style}
                                            onClick={handleShowPassword}
                                        />
                                }
                            </InputIconWrapper>
                        </InputContainer>
                        <HelperText>{helper_text}</HelperText>
                        {
                            errors[label] &&
                            <InputWarningContainer className="InputWarningContainer">
                                {label === 'Full Name' && RenderInputWarnings(warning)}
                                {label === 'Password' && RenderInputWarnings(warning)}
                                {label === 'Retype Password' && RenderInputWarnings(warning)}
                            </InputWarningContainer>
                        }
                    </InputFormGroup>
                ))
            }

            <InputFormGroup>
                <InputLabelContainer sx={{ fontSize: '1.1em' }}>
                    <InputLabel>Gender</InputLabel>
                </InputLabelContainer>
                <RadioGroup
                    row
                    defaultValue={'Female'}
                    sx={{ marginLeft: '5px' }}
                >
                    <FormControlLabel sx={{ color: 'white' }} value="Female" control={<Radio {...register('Gender')} size="small" color="default" sx={radio_style} />} label="Female" />
                    <FormControlLabel sx={{ color: 'white' }} value="Male" control={<Radio {...register('Gender')} size="small" color="default" sx={radio_style} />} label="Male" />
                    <FormControlLabel sx={{ color: 'white' }} value="Other" control={<Radio {...register('Gender')} size="small" color="default" sx={radio_style} />} label="Other" />
                </RadioGroup>
            </InputFormGroup>

        </InputsArea>
    )
}

export default InformationInputs

const InputsArea = styled('div')({
    margin: '20px 0 0',
})

const InputFormGroup = styled('div')({
    '&:not(:first-of-type)': {
        marginTop: '20px',
    }
})

const InputLabelContainer = styled('div')({
    display: 'flex',
    '& span.force': {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '1.2em',
    }
})

const InputLabel = styled('label')({
    display: 'block',
    width: 'fit-content',
    color: 'white',
    margin: '0px 5px 3px',
    fontWeight: 'bold',
    fontFamily: 'arial',
})

const InputContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    border: '1.5px #00faff solid',
    boxSizing: 'border-box',
    padding: '5px',
    paddingRight: '8px',
})

const Input = styled('input')({
    color: 'white',
    margin: '0',
    outline: 'unset',
    fontSize: '0.9em',
    border: 'none',
    paddingLeft: '5px',
    width: '90%',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    letterSpacing: '1px',
    '&:hover , :focus': {
        borderRightWidth: '6px',
    },
    '&:focus ~ .ArrowIconWrapper': {
        display: 'flex',
    }
})

const ArrowIconWrapper = styled('div')({
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
    left: '-25px',
    top: '0',
})

const HelperText = styled('div')({
    color: 'white',
    fontSize: '0.8em',
    fontStyle: 'italic',
    fontFamily: 'nunito',
    marginTop: '4px',
    marginLeft: '3px',
})

const InputIconWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
})

const InputWarningContainer = styled('span')({
    display: 'flex',
    alignItems: 'center',
    marginTop: '3px',
})

const InputWarningText = styled('p')({
    color: 'red',
    fontFamily: 'nunito',
    fontSize: '0.8em',
    margin: '0',
    height: 'min-content',
})