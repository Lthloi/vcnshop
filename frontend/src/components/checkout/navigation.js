import React from "react"
import { styled } from '@mui/material/styles'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {
    const navigate = useNavigate()
    
    return (
        <NavigationSection id="NavigationSection">
            <GoBackIconContainer>
                <Wrapper onClick={() => navigate(-1)}>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <GoBackIcon />
                        <GoBackText>BACK TO CART</GoBackText>
                    </div>
                </Wrapper>
            </GoBackIconContainer>
            <Title>CHECKOUT</Title>
        </NavigationSection>
    )
}

export default Navigation

const NavigationSection = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px',
    position: 'relative',
}))

const GoBackIconContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    position: 'absolute',
    left: '0',
    top: '0',
    paddingLeft: '15px',
})

const Wrapper = styled('div')({
    position: 'relative',
    '&::after': {
        content: '""',
        height: '3px',
        width: '0',
        backgroundColor: 'black',
        position: 'absolute',
        top: '100%',
        right: '0',
        transition: 'width 0.2s',
    },
    '&:hover::after': {
        width: '100%',
    },
})

const GoBackIcon = styled(ExpandCircleDownIcon)({
    height: '100%',
    transform: 'rotate(90deg)',
    transition: 'transform 0.2s',
    margin: 'auto',
})

const GoBackText = styled('div')({
    fontFamily: '"Roboto", "sans-serif"',
    fontSize: '1.5em',
    transform: 'scaleX(0.9)',
})

const Title = styled('div')({
    fontFamily: '"Roboto", "sans-serif"',
    fontSize: '2.5em',
    fontWeight: 'bold',
    letterSpacing: '3px',
})