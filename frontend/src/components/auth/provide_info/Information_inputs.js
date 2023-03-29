import React, { useState, } from "react"
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import ClearIcon from '@mui/icons-material/Clear'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import DateOfBirth from "./date_of_birth_inputs"
import CancelIcon from '@mui/icons-material/Cancel'

const inputs_detail = [
    {
        name: 'Full Name',
        required: true,
        helper_text: 'We will use this one to display to other members.',
        pattern: /^(?=.*?[a-zA-Z]).{2,22}$/,
        warning: `Full Name field can't be empty or too short`,
    }, {
        name: 'Email',
        required: true,
        helper_text: 'Receive mail for events, order track, recover password, etc.',
        pattern: /^[\w-]{2,}@([a-z]{2,12}\.){1,5}[a-z]{2,5}$/,
        warning: `Please enter correct email format`,
    }, {
        name: 'Password',
        required: true,
        helper_text: 'Use this one with email or phone number to login',
        pattern: /^(?=.*?[A-Z]).{6,20}$/,
        warning:
            `Password must be between 6 and 20 
            characters long and must contain at
            least one capital letter`,
    }, {
        name: 'Address',
        required: false,
        helper_text: 'Set this address to default delivery address',
        pattern: /./,
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
            <CancelIcon
                sx={{
                    height: '0.7em',
                    color: 'red',
                }}
            />
            <InputWarningText>
                {input_warning}
            </InputWarningText>
        </>
    )
}

const InformationInputs = ({ register, errors, reset }) => {

    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword(!showPassword)

    const clearInput = (input_name) => {
        reset({
            [input_name]: ''
        }, {
            keepErrors: false,
            keepDirty: false,
        })
    }

    return (
        <InputsContainer id="InputsContainer">
            {
                inputs_detail.map(({ name, helper_text, required, pattern, warning }) => (
                    <InfoFormGroup key={name}>
                        <InfoLabelContainer>
                            <InfoLabel htmlFor={name}>
                                {name}
                            </InfoLabel>
                            {
                                required && <span className="force">*</span>
                            }
                        </InfoLabelContainer>
                        <InfoInputWrapper>
                            <InfoInput
                                id={name} //input
                                name={name}
                                type={name === 'Password' ?
                                    showPassword ? 'text' : 'password' : 'text'}
                                {...register(name,
                                    {
                                        pattern: pattern,
                                        required: required,
                                    }
                                )}
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
                                    name === 'Password' ?
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
                                            onClick={() => clearInput(name)}
                                        />
                                }
                            </IconInputWrapper>
                        </InfoInputWrapper>
                        <HelperText>
                            {
                                name === 'Address' &&
                                <SetAddressDefaultOrder>
                                    <Checkbox color="default" size="small"
                                        sx={{
                                            color: '#00fffb',
                                            width: '1em',
                                            height: '1em',
                                        }}
                                        id="SetAddressDefaultBox"
                                    />
                                    <CheckboxLabel htmlFor="SetAddressDefaultBox">
                                        {helper_text}
                                    </CheckboxLabel>
                                </SetAddressDefaultOrder>
                            }
                            {!(name === 'Address') && helper_text}
                        </HelperText>
                        {
                            errors[name] &&
                            <InputWarningContainer className="InputWarningContainer">
                                {
                                    name === 'Full Name' && warning ?
                                        RenderInputWarnings(warning)
                                        : name === 'Email' && warning ?
                                            RenderInputWarnings(warning)
                                            : name === 'Password' && warning &&
                                            RenderInputWarnings(warning)
                                }
                            </InputWarningContainer>
                        }
                    </InfoFormGroup>
                )
                )
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

const SetAddressDefaultOrder = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
    marginLeft: '3px',
})

const CheckboxLabel = styled('label')({
    color: 'white',
    fontStyle: 'italic',
    fontFamily: 'nunito',
    fontSize: '1em',
    margin: '0',
    marginLeft: '5px',
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