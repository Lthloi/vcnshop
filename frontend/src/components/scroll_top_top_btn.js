import React, { useState } from "react"
import { createTheme, styled } from '@mui/material/styles'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

const ScrollToTopBtn = () => {
    const [open, setOpen] = useState(false)
    const showScrollToTopBtn = () => {
        window.scrollY > 100 ? setOpen(true) : setOpen(false)
    }
    window.addEventListener('scroll', showScrollToTopBtn)
    return (
        <ScrollToTopContainer id="ScrollToTopContainer" theme={customTheme}
            sx={{
                bottom: open ? '20px' : `-${customTheme.primary.height_of_scroll_to_top_btn + 5}px`,
            }}
            onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}
            onDoubleClick={() => window.scroll({ top: 0, behavior: 'auto' })}
        >
            <ScrollToTopWrapper theme={customTheme}>
                <StyledDoubleArrowIcon />
            </ScrollToTopWrapper>
        </ScrollToTopContainer>
    )
}

export default ScrollToTopBtn

const customTheme = createTheme({
    primary: {
        height_of_scroll_to_top_btn: 50,
        font_of_scroll_to_top_btn: '"Nunito", "sans-serif"',
    }
})

const ScrollToTopContainer = styled('div')(({ theme }) => ({
    width: `${theme.primary.height_of_scroll_to_top_btn}px`,
    height: `${theme.primary.height_of_scroll_to_top_btn}px`,
    position: 'fixed',
    right: '20px',
    borderRadius: '50%',
    padding: '2px',
    backgroundColor: '#bbb9b9',
    transition: 'bottom 0.3s',
    boxSizing: 'border-box',
    cursor: 'pointer',
    border: '2px black solid',
    zIndex: '99',
    opacity: '0.3',
    '&:hover': {
        opacity: '1',
        '& svg.MuiSvgIcon-root': {
            animationPlayState: 'running',
            animationDuration: '0.8s',
        }
    }
}))

const ScrollToTopWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: theme.primary.font_of_scroll_to_top_btn,
    fontSize: '0.9em',
    fontWeight: 'bold',
    textAlign: 'center',
    overflow: 'hidden',
    borderRadius: '50%',
    width: '100%',
    height: '100%',
}))

const StyledDoubleArrowIcon = styled(DoubleArrowIcon)(({ theme }) => ({
    color: 'black',
    transform: 'rotate(-90deg)',
    width: '1.2em',
    height: '1.2em',
    animation: 'SlideArrow 0s paused infinite linear',
    '@keyframes SlideArrow': {
        'from': {
            transform: 'translateY(100%) rotate(-90deg)',
        },
        'to': {
            transform: 'translateY(-100%) rotate(-90deg)',
        }
    },
}))