import React from "react"
import { styled } from '@mui/material/styles'
import background_introduce from '../../assets/images/background_introduce.jpg'

const Introduce = ({ scrollRef }) => {
    const scrollToTopWeek = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', })
    }
    
    return (
        <IntroduceArea id="IntroduceArea">
            <IntroduceContainer>
                <BackgroundIntroduce src={background_introduce} />
                <WelcomeText>Welcome to VCN Shop</WelcomeText>
                <IntroduceTextContainer id="IntroduceTextContainer">
                    <SmallTitle>
                        Experience the luxurious lifestyle of foxes
                    </SmallTitle>
                    <BiggerTitle
                        sx={{ fontFamily: '"Tourney", "cursive"', }}
                    >
                        <span>Fox </span>
                        <span style={{
                            fontFamily: '"Rubik Dirt", "cursive"',
                            fontSize: '0.5em',
                            fontWeight: 'normal',
                        }}>
                            x
                        </span>
                        <span style={{ fontFamily: '"Kalam", "cursive"', }}>
                            {' Lifstyle'}
                        </span>
                    </BiggerTitle>
                    <ShoppingNowBtn onClick={() => scrollToTopWeek()}>
                        Shopping Now
                    </ShoppingNowBtn>
                </IntroduceTextContainer>
            </IntroduceContainer>
        </IntroduceArea>
    )
}

export default Introduce

const IntroduceArea = styled('div')({

})

const IntroduceContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowX: 'hidden',
    position: 'relative',
})

const WelcomeText = styled('h1')({
    color: 'white',
    position: 'absolute',
    top: '10px',
    left: '45px',
    fontFamily: '"Fasthand", "cursive"',
    fontSize: '4em',
    margin: '0',
})

const BackgroundIntroduce = styled('img')({
    width: '100vw',
})

const IntroduceTextContainer = styled('div')({
    position: 'absolute',
    top: '22%',
    left: '6%',
    padding: '5px 0 10px 20px',
    borderLeft: '5px white solid',
})

const SmallTitle = styled('h3')({
    color: 'white',
    margin: '0',
    fontFamily: '"Roboto", "sans-serif"',
    fontSize: '1.5em',
    fontWeight: 'normal',
    letterSpacing: '3px',
    wordSpacing: '5px',
})

const BiggerTitle = styled('h1')({
    color: 'white',
    margin: '0',
    marginTop: '30px',
    fontFamily: '"Roboto", "sans-serif"',
    fontSize: '3.5em',
    letterSpacing: '3px',
    wordSpacing: '5px',
})

const ShoppingNowBtn = styled('button')({
    color: 'white',
    padding: '10px 20px',
    backgroundColor: 'black',
    border: '1px white solid',
    borderRadius: '5px',
    marginTop: '30px',
    cursor: 'pointer',
    fontFamily: '"Roboto", "sans-serif"',
    fontSize: '1em',
    fontWeight: 'bold',
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.1)',
    }
})