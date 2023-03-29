import React from "react"
import { styled } from '@mui/material/styles'

const Header = ({ keyword, resultCount }) => {
    return (
        <HeaderArea id="HeaderArea">
            <Container>
                <Title>Your Search Results For:</Title>
                <KeywordResult>{keyword}</KeywordResult>
            </Container>
            <ResultCount>
                {resultCount + (resultCount > 1 ? ' Results Found' : ' Result Found')}
            </ResultCount>
        </HeaderArea>
    )
}

export default Header

const HeaderArea = styled('div')(({ theme }) => ({
    rowGap: '5px',
    marginTop: '20px',
}))

const Container = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ededed',
    width: '100%',
    padding: '15px',
    boxSizing: 'border-box',
})

const Title = styled('div')({
    fontFamily: '"Roboto", "sans-serif"',
    color: '#858585',
})

const KeywordResult = styled('h2')({
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
})

const ResultCount = styled('div')({
    fontFamily: '"Lato", "sans-serif"',
    fontSize: '0.9em',
    marginTop: '10px',
    color: 'gray',
    backgroundColor: '#ededed',
    padding: '5px',
    textAlign: 'center',
})