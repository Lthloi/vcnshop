import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import { getFloatNumber } from '../../../utils/methods.js'
import { sendOTP } from "../../../store/actions/user_actions.js"
import { useDispatch } from "react-redux"

const ResendOTP = ({ secondsStarter, emailWasTyped }) => {
    const [countdown, setCountdown] = useState(secondsStarter)
    const dispatch = useDispatch()

    useEffect(() => {
        if (countdown && countdown > 0) {
            let timer = setTimeout(() => {
                setCountdown(pre => pre - 1)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    const convertToWords = () => {
        let minutes = getFloatNumber(countdown / 60, 0)
        let seconds = getFloatNumber(countdown % 60, 0)
        let timing = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
        return timing
    }

    const resendOTP = () => {
        dispatch(sendOTP(emailWasTyped))
    }

    return (
        <ResendOTPBtn
            id="ResendOTPBtn"
            onClick={resendOTP}
            sx={
                countdown > 0 ?
                    { opacity: '0.6', pointerEvents: 'none', }
                    :
                    { opacity: '1', pointerEvents: 'initial', }
            }
        >
            {
                countdown > 0 &&
                <Countdown>
                    {convertToWords()}
                </Countdown>
            }
            <Text> Resend OTP</Text>
        </ResendOTPBtn>
    )
}

export default ResendOTP

const ResendOTPBtn = styled('button')({
    display: 'flex',
    alignItems: 'center',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    backgroundColor: '#00b0a7',
    padding: '7px 10px',
    borderRadius: '5px',
    border: '1px black solid',
})

const Countdown = styled('div')({
    fontFamily: 'sans-serif',
    fontSize: '1em',
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginRight: '5px',
})

const Text = styled('div')({
    fontFamily: 'sans-serif',
    fontSize: '1em',
    fontWeight: 'bold',
})