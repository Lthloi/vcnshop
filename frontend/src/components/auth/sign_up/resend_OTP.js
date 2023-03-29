import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'

const ResendOTP = ({ secondsStarter }) => {
    const [countdown, setCountdown] = useState(secondsStarter)

    useEffect(() => {
        if (countdown && countdown > 0) {
            let timer = setTimeout(() => {
                setCountdown(pre => pre - 1)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    const convertToWords = () => {
        let minutes = (countdown / 60).toFixed(0) * 1
        let seconds = (countdown % 60).toFixed(0) * 1
        let timing =
            (minutes < 10 ? '0' + minutes : minutes) + ':' +
            (seconds < 10 ? '0' + seconds : seconds)
        return timing
    }

    return (
        <ResendOTPBtn id="ResendOTPBtn"
            sx={countdown > 0 ?
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