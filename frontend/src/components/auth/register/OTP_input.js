import React, { useEffect, useMemo, useRef, useState } from "react"
import { styled } from '@mui/material/styles'
import ClearIcon from '@mui/icons-material/Clear'

const VALID_DEGIT = /^\d+$/

const OTPInput = () => {
    const [OTPInputValue, setOTPInputValue] = useState('')
    const OTPInputContainerRef = useRef()

    const input_values = useMemo(() => {
        let temp_values = OTPInputValue.split('')
        let main_values = []
        for (let i = 0; i < 4; i++) {
            let char = temp_values[i]
            if (VALID_DEGIT.test(char)) {
                main_values.push(char)
            } else {
                main_values.push('')
            }
        }
        return main_values
    }, [OTPInputValue])

    useEffect(() => {
        OTPInputContainerRef.current.firstElementChild.focus()
    }, [])

    const handlePressKey = (e) => {
        let target = e.target
        let entered_value = target.value
        let key_event = e.key
        let previousElementSibling = target.previousElementSibling
        let nextElementSibling = target.nextElementSibling
        if (key_event === 'Backspace' && entered_value === '') {
            if (previousElementSibling) {
                previousElementSibling.focus()
            }
            return
        }
        if (key_event === 'ArrowRight' || key_event === 'ArrowDown') {
            e.preventDefault()
            if (nextElementSibling) {
                nextElementSibling.focus()
            }
            return
        }
        if (key_event === 'ArrowLeft' || key_event === 'ArrowUp') {
            e.preventDefault()
            if (previousElementSibling) {
                previousElementSibling.focus()
            }
        }
    }

    const handleOnChangeInput = (e, index) => {
        let target = e.target
        let entered_value = target.value.trim()
        let nextElementSibling = target.nextElementSibling
        if (!VALID_DEGIT.test(entered_value) && entered_value !== '') {
            return
        }
        if (entered_value === '' && nextElementSibling && nextElementSibling.value !== '') {
            entered_value = '#'
        }
        let new_value =
            `${OTPInputValue.substring(0, index)}${entered_value}${OTPInputValue.substring(index + 1)}`
        if (new_value.length > 4) return
        setOTPInputValue(new_value)
        if (entered_value === '' || entered_value === '#') return
        if (entered_value.length === 4) {
            target.blur()
            return
        }
        if (nextElementSibling) {
            nextElementSibling.focus()
        }
    }

    const handleOnFocus = (e) => {
        let target = e.target
        let target_value = target.value
        target.setSelectionRange(0, target.value.length)
        let previousElementSibling = target.previousElementSibling
        if (previousElementSibling && previousElementSibling.value === '' &&
            target_value === '') {
            previousElementSibling.focus()
        }
    }

    const clearInput = () => {
        setOTPInputValue('')
        OTPInputContainerRef.current.firstElementChild.focus()
    }

    return (
        <VerifyOTPFormGroup id="VerifyOTPFormGroup">
            <Label>Enter the OTP code here...</Label>

            <input id="HiddenOTPToGetValue" style={{ display: 'none', }}
                name="HiddenOTPInput"
            />

            <OTPInputContainer ref={OTPInputContainerRef}>
                {
                    input_values.map((items, index) => (
                        <OTPInputs
                            key={index}
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            pattern="\d{1}"
                            maxLength={6}
                            className="otp_input"
                            value={items}
                            onChange={(e) => handleOnChangeInput(e, index)}
                            onKeyDown={handlePressKey}
                            onFocus={handleOnFocus}
                        />
                    ))
                }
                <div style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: '-10px',
                    bottom: '0',
                }}
                >
                    <ClearInputWrapper onClick={() => clearInput()}
                        title="Clear"
                    >
                        <ClearIcon sx={{ color: 'white', }} />
                    </ClearInputWrapper>
                </div>
            </OTPInputContainer>
            <Saying>
                A four-digit OTP code was sent to your phone.
                Please check message and type the code into above.
            </Saying>
        </VerifyOTPFormGroup>
    )
}

export default OTPInput

const VerifyOTPFormGroup = styled('div')({
    marginTop: '20px',
})

const Label = styled('label')({
    display: 'block',
    width: 'fit-content',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    padding: '3px 10px',
    backgroundColor: '#33b8b6',
    borderRadius: '5px',
})

const OTPInputContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '5px 20px 8px',
    margin: '0 auto',
    marginTop: '8px',
    width: '60%',
    position: 'relative',
    borderBottom: '1.5px #33b8b6 solid',
})

const OTPInputs = styled('input')({
    width: '42px',
    height: '42px',
    padding: '0 3px',
    boxSizing: 'border-box',
    border: '1.5px black solid',
    borderRadius: '3px',
    textAlign: 'center',
    outline: 'unset',
    margin: '0',
    fontSize: '1.2em',
    fontWeight: 'bold',
    '&::selection': {
        background: '#33b8b6',
    },
    '&:hover': {
        outline: '3px white solid',
    },
    '&:focus': {
        outline: '3px #33b8b6 solid',
    },
})

const ClearInputWrapper = styled('div')({
    width: '1.5em',
    height: '1.5em',
    cursor: 'pointer',
    padding: '3px',
    borderRadius: '50%',
    '&:hover': {
        backgroundColor: '#80808061',
    }
})

const Saying = styled('p')({
    margin: '0',
    marginTop: '5px',
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
    color: 'white',
    fontSize: '0.8em',
})