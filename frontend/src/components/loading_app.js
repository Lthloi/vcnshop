import React, { useEffect } from "react"
import { styled } from '@mui/material/styles'
import foxLogoBlack from '../assets/images/logo_app_black.svg'

const LoadingApp = () => {

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => document.body.style.overflow = 'unset'
    }, [])

    return (
        <LoadingAppModalBase id="LoadingApp" >
            <ImageAnimationContainer>

                <CircularAnimation />

                <Image src={foxLogoBlack} />

            </ImageAnimationContainer>
        </LoadingAppModalBase>
    )
}

export default LoadingApp

const LoadingAppModalBase = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    zIndex: '100',
    backgroundColor: 'white',
}))

const ImageAnimationContainer = styled('div')({
    padding: '30px',
    border: '5px transparent solid',
    position: 'relative',
    borderRadius: '50%',
    width: '85px',
    height: '85px',
})

const CircularAnimation = styled('div')({
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderTop: '5px black solid',
    boxSizing: 'border-box',
    borderRadius: '50%',
    animation: 'circular-animation 2s infinite',
    '@keyframes circular-animation': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '25%': {
            transform: 'rotate(90deg)',
        },
        '50%': {
            transform: 'rotate(180deg)',
        },
        '75%': {
            transform: 'rotate(270deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    }
})

const Image = styled('img')({
    width: '100%',
    height: '100%',
    color: 'black',
})