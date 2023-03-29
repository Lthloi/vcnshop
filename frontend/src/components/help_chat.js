import React from "react"
import { styled } from '@mui/material/styles'
import TextsmsIcon from '@mui/icons-material/Textsms'

const HelpChat = () => {
    return (
        <HelpChatContainer id="HelpChatContainer">
            <HelpChatWrapper>
                <StyledTextsmsIcon />
            </HelpChatWrapper>
        </HelpChatContainer>
    )
}

export default HelpChat

const HelpChatContainer = styled('div')(({ theme }) => ({
    position: 'fixed',
    zIndex: '99',
    left: '20px',
    bottom: '20px',
    boxSizing: 'border-box',
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    backgroundColor: 'black',
    border: '2px white solid',
    cursor: 'pointer',
}))

const HelpChatWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
})

const StyledTextsmsIcon = styled(TextsmsIcon)({
    color: 'white',
    width: '1.2em',
    height: '1.2em',
})