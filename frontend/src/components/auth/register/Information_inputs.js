import React, { useState, } from "react"
import { styled } from '@mui/material/styles'
import ClearIcon from '@mui/icons-material/Clear'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DateOfBirth from "./date_of_birth_inputs"
import CancelIcon from '@mui/icons-material/Cancel'

const inputs = [
    {
        label: 'Full Name',
        required: false,
        max_length: 25,
        helper_text: 'We will use this one to display to other members.',
        pattern: /^([a-zA-Z0-9_\- ]){2,}$/,
        warning:
            `Full Name field mustn't contain special characters. 
            And must be between 2 and 25 characters long.`,
    }, {
        label: 'Email',
        required: true,
        max_length: 35,
        helper_text: 'Receive mail for events, order track, recover password, etc.',
        pattern: /^[a-zA-Z0-9]+([\\._\\-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\\.\\-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/,
        warning: `Please enter format of email correctly.`,
    }, {
        label: 'Password',
        required: true,
        max_length: 20,
        helper_text: 'Use this one with email or phone number to login',
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,}$/,
        warning:
            `Password must be between 6 and 20 characters long. 
            And can contain only capital letters and .`,
    },
]

const input_icon_style = {
    color: 'white',
    cursor: 'pointer',
    transform: 'scale(0.8)',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.1)',
    }
}

const RenderInputWarnings = (input_warning) => {
    return (
        <>
            <CancelIcon sx={{ height: '0.7em', color: 'red', }} />
            <InputWarningText>{input_warning}</InputWarningText>
        </>
    )
}

const InformationInputs = ({ register, errors, reset }) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword(!showPassword)

    const clearInput = (input_label) => {
        reset({
            [input_label]: ''
        }, {
            keepErrors: false,
            keepDirty: false,
        })
    }

    return (
        <InputsContainer id="InputsContainer">
            {
                inputs.map(({ label, helper_text, required, max_length, pattern, warning }) => (
                    <InfoFormGroup key={label}>
                        <InfoLabelContainer>
                            <InfoLabel htmlFor={label}>
                                {label}
                            </InfoLabel>
                            {required && <span className="force">*</span>}
                        </InfoLabelContainer>
                        <InfoInputWrapper>
                            <InfoInput
                                id={label} //input
                                name={label}
                                type={label === 'Password' ?
                                    showPassword ? 'text' : 'password' : 'text'}
                                {...register(label,
                                    {
                                        pattern: pattern,
                                        required: required,
                                    }
                                )}
                                maxLength={max_length}
                            />
                            <ArrowIconWrapper className="ArrowIconWrapper">
                                <ArrowRightIcon
                                    sx={{
                                        color: 'white',
                                        width: '1.2em',
                                        height: '1.2em',
                                    }}
                                />
                            </ArrowIconWrapper>
                            <IconInputWrapper>
                                {
                                    label === 'Password' ?
                                        showPassword ?
                                            <VisibilityIcon sx={input_icon_style}
                                                onClick={handleShowPassword}
                                            />
                                            :
                                            <VisibilityOffIcon sx={input_icon_style}
                                                onClick={handleShowPassword}
                                            />
                                        :
                                        <ClearIcon sx={input_icon_style}
                                            onClick={() => clearInput(label)}
                                        />
                                }
                            </IconInputWrapper>
                        </InfoInputWrapper>
                        <HelperText>
                            {helper_text}
                        </HelperText>
                        {
                            errors[label] &&
                            <InputWarningContainer className="InputWarningContainer">
                                {
                                    label === 'Full Name' && warning ?
                                        RenderInputWarnings(warning)
                                        : label === 'Email' && warning ?
                                            RenderInputWarnings(warning)
                                            : label === 'Password' && warning &&
                                            RenderInputWarnings(warning)
                                }
                            </InputWarningContainer>
                        }
                    </InfoFormGroup>
                ))
            }

            <DateOfBirth />

        </InputsContainer>
    )
}

export default InformationInputs

const InputsContainer = styled('div')({
    margin: '20px 0 0',
})

const InfoFormGroup = styled('div')({
    '&:not(:first-of-type)': {
        marginTop: '20px',
    }
})

const InfoLabelContainer = styled('div')({
    display: 'flex',
    '& span.force': {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '1.2em',
    }
})

const InfoLabel = styled('label')({
    display: 'block',
    width: 'fit-content',
    color: 'white',
    margin: '0px 5px 3px',
    fontWeight: 'bold',
    fontFamily: 'arial',
})

const InfoInputWrapper = styled('div')({
    position: 'relative',
})

const InfoInput = styled('input')({
    color: 'white',
    margin: '0',
    outline: 'unset',
    padding: '8px 30px 8px 10px',
    fontSize: '0.9em',
    border: '1.5px #00faff solid',
    borderRadius: '3px',
    width: '100%',
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

const IconInputWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    right: '9px',
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