import React from "react"
import { styled } from '@mui/material/styles'
import not_found_404 from '../assets/images/not_found_404.png'
import { useNavigate } from "react-router-dom"

const NotFound404 = () => {
    const navigate = useNavigate()

    const navigatePage = (back) => {
        if (back) {
            return navigate(-1)
        }
        return navigate('/')
    }

    return (
        <NotFound404Page id="NotFound404Page">
            <ImgWrapper>
                <Img src={not_found_404} />
            </ImgWrapper>
            <Desc>
                <Title>Oops!</Title>
                <Text>
                    Either you aren't cool enough to visit this page or it doesn't exist...
                </Text>
                <Text>
                    I mean <span>"404 not found"</span>
                </Text>
                <ButtonContainer>
                    <Button onClick={() => navigatePage(false)}>
                        Back to Home page
                    </Button>
                    <Button onClick={() => navigatePage(true)}>
                        Back to previous page
                    </Button>
                </ButtonContainer>
            </Desc>
        </NotFound404Page>
    )
}

export default NotFound404

const NotFound404Page = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '10px',
    width: '99vw',
    height: '99vh',
}))

const ImgWrapper = styled('div')({
    height: '45vh',
})

const Img = styled('img')({
    height: '100%',
})

const Desc = styled('main')({

})

const Title = styled('h1')({
    fontFamily: '"Fontdiner Swanky", "cursive"',
    letterSpacing: '2px',
    margin: '0',
})

const Text = styled('p')({
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontWeight: 'bold',
    margin: '10px',
    '& span': {
        fontWeight: 'bold',
        fontSize: '1.2em',
    }
})

const ButtonContainer = styled('div')({
    display: 'flex',
    columnGap: '10px',
})

const Button = styled('button')({
    fontFamily: '"Fontdiner Swanky", "cursive"',
    fontSize: '1.1em',
    color: '#383838',
    border: 'none',
    backgroundColor: '#feadbb',
    padding: '10px 25px',
    marginTop: '10px',
    transform: 'skew(-5deg)',
    transition: 'background-color 0.2s ease, transform 0.2s ease, color 0.2s ease',
    cursor: 'pointer',
    position: 'relative',
    zIndex: '1',
    '&:hover': {
        backgroundColor: '#dc5080',
        transform: 'scale(1.15)',
        color: 'white',
        zIndex: '2',
    }
})