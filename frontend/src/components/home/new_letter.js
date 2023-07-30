import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { Stack, Typography, CircularProgress, Box } from "@mui/material"
import { useTheme } from "@emotion/react"
import validator from 'validator'

const NewsLetter = () => {
    const { register, handleSubmit } = useForm()
    const theme = useTheme()
    const [submitting, setSubmitting] = useState()

    const submit = async (data, e) => {
        let email = data['Email']

        if (!email)
            return toast.warning('Please don\'t empty the email input!')
        if (!validator.isEmail(email))
            return toast.warning('Please enter email format correctly!')

        setSubmitting(true)

        await new Promise((resolve) => {
            setTimeout(() => { resolve() }, 2000)
        })

        setSubmitting(false)

        toast.success('Subscribe successfully!')
    }

    return (
        <Stack
            id="News-Letter-Section"
            component="div"
            alignItems="center"
            justifyContent="center"
            margin="100px 0 50px"
            fontFamily={theme.fontFamily.nunito}
        >

            <Typography
                component="h2"
                margin="0"
                fontFamily="inherit"
                textAlign="center"
                fontSize="2em"
                fontWeight="bold"
            >
                Newsletter From Us
            </Typography>

            <Typography
                textAlign="center"
                marginTop="15px"
                fontFamily="inherit"
                width="50%"
            >
                Enter your email below to receive email toasts
                from <b>VCN Shop - Fox COR</b> about
                events and big sales.
            </Typography>

            <Stack
                id="EmailInputForm"
                flexDirection="row"
                marginTop="15px"
            >

                <Box
                    bgcolor="rgba(0,0,0,.05)"
                    padding="10px 20px"
                >
                    <EmailInput
                        placeholder="Enter your email address..."
                        {...register('Email')}
                    />
                </Box>

                <SubmitBtn onClick={handleSubmit(submit)}>
                    {
                        submitting ?
                            <CircularProgress
                                thickness={5}
                                size={20}
                                sx={{ color: 'white' }}
                            />
                            :
                            <StyledSendIcon />
                    }
                </SubmitBtn>

            </Stack>

        </Stack>
    )
}

export default NewsLetter

const EmailInput = styled('input')({
    border: 'none',
    outline: 'none',
    fontSize: '1em',
    width: '250px',
    backgroundColor: 'transparent',
})

const SubmitBtn = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80px',
    cursor: 'pointer',
    backgroundColor: '#3FACB1',
    padding: '10px 0',
    overflow: 'hidden',
    position: 'relative',
    border: 'none',
    color: 'white',
    boxSizing: 'border-box',
    '&:hover svg.MuiSvgIcon-root': {
        animationPlayState: 'running',
        animationDuration: '0.8s',
    }
})

const StyledSendIcon = styled(SendIcon)({
    color: 'white',
    fontSize: '1.5em',
    animation: 'submitting_animate 0s paused infinite linear',
    '@keyframes submitting_animate': {
        'from': {
            transform: 'translateX(-40px)',
        },
        'to': {
            transform: 'translateX(40px)',
        }
    }
})