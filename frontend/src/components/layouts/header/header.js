import React from "react"
import { styled } from '@mui/material/styles'
import Notice from './notice'
import Navigation from './navigation'

const Header = () => {
    return (
        <HeaderArea id="HeaderArea">
            <Notice />
            <Navigation />
        </HeaderArea>
    )
}

export default Header

const HeaderArea = styled('div')(({ theme }) => ({
    
}))