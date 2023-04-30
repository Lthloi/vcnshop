import React from "react"
import { styled } from '@mui/material/styles'

const Short = () => {
    return (
        <ShortSection id="Short">
            <Text>&copy; 2023 VCN Shop - FOX Relational E-commerce Corporation</Text>
            <Website>Oficial Website: https://www.vcnshop.new</Website>
        </ShortSection>
    )
}

export default Short

const ShortSection = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '80px',
    backgroundColor: '#f0f0f0',
    padding: '3px',
    width: '100%',
    boxSizing: 'border-box',
})

const Text = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.8em',
})

const Website = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.8em',
})