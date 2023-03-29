import React from "react"
import { styled } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'

const NewsLetter = () => {
    const { register, handleSubmit } = useForm()

    const checkSubmit = (data, e) => {
        toast.success('Subscribe successfully!')
    }

    const checkErrors = (data, e) => {
        toast.error('Fail to subscribe, please check!')
    }

    return (
        <NewsLetterArea id="NewsLetterArea">
            <NewLetterContainer>
                <Title>
                    Newsletter From Us
                </Title>
                <Saying>
                    Enter your email below to receive email toasts
                    from <b>VCN Shop - Fox COR</b> about
                    events and big sales. We guarantee not to
                    send too many emails and spam.
                </Saying>
                <Hr />
                <EmailInputForm id="EmailInputForm" action="#"
                    onSubmit={handleSubmit(checkSubmit, checkErrors)}
                >
                    <EmailInput
                        placeholder="Enter your email address..."
                        type="email"
                        {...register('email_input', { required: true })}
                    />
                    <SendIconWrapper type="submit">
                        <StyledSendIcon />
                    </SendIconWrapper>
                </EmailInputForm>
            </NewLetterContainer>
        </NewsLetterArea>
    )
}

export default NewsLetter

const NewsLetterArea = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
    backgroundColor: '#ececec',
    padding: '10px 0 20px',
})

const NewLetterContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
})

const Title = styled('h2')({
    margin: '0',
    textAlign: 'center',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '2em',
})

const Saying = styled('div')({
    marginTop: '5px',
    textAlign: 'center',
    fontFamily: '"Nunito", "sans-serif"',
})

const Hr = styled('span')({
    display: 'block',
    height: '5px',
    width: '50%',
    backgroundColor: 'black',
    marginTop: '15px',
})

const EmailInputForm = styled('form')({
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '30px',
    width: '35vw',
    height: '40px',
    overflow: 'hidden',
    marginTop: '20px',
    padding: '5px',
    boxShadow: '0px 4px 4px grey',
    backgroundColor: 'white',
})

const EmailInput = styled('input')({
    border: 'none',
    height: '100%',
    padding: '0 10px 0 20px',
    outline: 'none',
    marginLeft: '-2px',
    fontSize: '1.1em',
    fontFamily: '"Nunito", "sans-serif"',
    width: '100%',
    boxSizing: 'border-box',
})

const SendIconWrapper = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    cursor: 'pointer',
    borderRadius: '25px',
    backgroundColor: 'black',
    padding: '0 10px',
    overflow: 'hidden',
    '&:hover svg.MuiSvgIcon-root': {
        animationPlayState: 'running',
        animationDuration: '0.8s',
    }
})

const StyledSendIcon = styled(SendIcon)({
    color: 'white',
    padding: '5px 10px',
    height: '1.1em',
    width: '1.1em',
    animation: 'sending 0s paused infinite linear',
    marginRight: '-5px',
    '@keyframes sending': {
        'from': {
            transform: 'translateX(-100%)',
        },
        'to': {
            transform: 'translateX(100%)',
        }
    }
})