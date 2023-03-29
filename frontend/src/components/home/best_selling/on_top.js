import React from "react"
import { styled } from '@mui/material/styles'
import OnTopAboveImg from '../../../assets/images/homePage_onTop/above_on_top.png'
import OnTopUnderImg from '../../../assets/images/homePage_onTop/under_on_top.png'
import Paper from '@mui/material/Paper'
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'

const OnTop_info = {
    top_trending: {
        title: 'Norwegian Sweater',
        desc:
            `Even if this style was considered timeless for a long time,
            we unfortunately have to put the classic Norwegian pattern on the list.
            Of course, there are still a few small versions of these sweaters today,
            but hardly anyone would wear the classic Norwegian pattern today.
            Other models have since overtaken it.`,
    },
    top_search: {
        title: 'Pullover Hoodie',
        desc:
            `The pullover hoodie has long been associated with the collegiate
            athletic look. Vans, Nike, and Urban Outfitters have made the classic
            pullover sweatshirt the daily choice for fashion-conscious consumers.
            Hooded sweatshirts are truly the outerwear piece that can do it all.`,
    }
}

const OnTop = () => {
    return (
        <OnTopArea id="OnTopArea">
            <AboveOnTopContainer>
                <ImgContainer>
                    <HorizonText sx={{ marginBottom: '-3px', }}>
                        TOP TRENDING
                    </HorizonText>
                    <ImgAndTextContainer>
                        <VerticalText>
                            TOP TRENDING
                        </VerticalText>
                        <ImgWrapper elevation={5}>
                            <Img src={OnTopAboveImg} />
                        </ImgWrapper>
                    </ImgAndTextContainer>
                </ImgContainer>
                <DescContainer >
                    <Title className="above_title">
                        {OnTop_info.top_trending.title}
                    </Title>
                    <Desc>
                        {OnTop_info.top_trending.desc}
                    </Desc>
                    <ArrowIconWrapper title="Show more...">
                        <StyledTrendingFlatIcon />
                    </ArrowIconWrapper>
                </DescContainer>
            </AboveOnTopContainer>

            <UnderOnTopContainer>
                <DescContainer >
                    <Title className="under_title">
                        {OnTop_info.top_search.title}
                    </Title>
                    <Desc >
                        {OnTop_info.top_search.desc}
                    </Desc>
                    <ArrowIconWrapper title="Show more...">
                        <StyledTrendingFlatIcon />
                    </ArrowIconWrapper>
                </DescContainer>
                <ImgContainer>
                    <ImgAndTextContainer sx={{ justifyContent: 'right', }}>
                        <ImgWrapper elevation={5}>
                            <Img src={OnTopUnderImg} />
                        </ImgWrapper>
                        <VerticalText>
                            TOP SEARCH
                        </VerticalText>
                    </ImgAndTextContainer>
                    <HorizonText>
                        TOP SEARCH
                    </HorizonText>
                </ImgContainer>
            </UnderOnTopContainer>
        </OnTopArea>
    )
}

export default OnTop

const OnTopArea = styled('div')({
    marginTop: '20px',
    padding: '0 20px',
})

const AboveOnTopContainer = styled('div')({
    display: 'flex',
})

const ImgContainer = styled('div')({
    minWidth: '50%',
    overflow: 'hidden',
})

const HorizonText = styled('div')({
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: '2.5em',
    transform: 'scaleY(0.8)',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
})

const ImgAndTextContainer = styled('div')({
    display: 'flex',
})

const VerticalText = styled('div')({
    fontFamily: 'arial',
    fontWeight: 'bold',
    fontSize: '2.5em',
    transform: 'scaleX(0.9)',
    writingMode: 'vertical-rl',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
})

const ImgWrapper = styled(Paper)({
    height: '90vh',
    cursor: 'pointer',
})

const Img = styled('img')({
    height: '100%',
})

const DescContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 20px',
})

const Title = styled('h2')({
    margin: '5px 0',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '2em',
    position: 'relative',
    textAlign: 'center',

    '&.above_title': {

        '&::after': {
            content: '""',
            height: '40%',
            width: '100%',
            position: 'absolute',
            bottom: '0',
            zIndex: '-1',
            right: '-5px',
            backgroundColor: '#00e5ff',
        }
    },

    '&.under_title': {

        '&::after': {
            content: '""',
            height: '40%',
            width: '100%',
            position: 'absolute',
            bottom: '0',
            zIndex: '-1',
            left: '-5px',
            backgroundColor: '#00ffb3',
        }
    },
})

const Desc = styled('p')({
    margin: '5px 0',
    fontFamily: 'nunito',
    fontSize: '1.2rem',
    textAlign: 'center',
})

const ArrowIconWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
})

const StyledTrendingFlatIcon = styled(TrendingFlatIcon)({
    color: 'black',
    width: '2.5em',
    height: '2.1em',
    borderRadius: '5px',
    padding: '0px 5px',
    cursor: 'pointer',
    boxShadow: '0px 1px 1px grey',
    transition: 'box-shadow 0.2s',
    '&:hover': {
        boxShadow: '0px 3px 5px grey',
    }
})

const UnderOnTopContainer = styled('div')({
    display: 'flex',
    marginTop: '5px',
})