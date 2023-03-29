import React from "react"
import { styled } from '@mui/material/styles'
import OnTop from "./on_top"
import Stall from "./stall"
import CategoryStallBar from "./category_stall_bar"

const BestSelling = () => {
    return (
        <BestSellingArea>
            <BestSellingTitleArea id="BestSellingTitleArea">
                <BestSellingTitleContainer>
                    <VerticalBarSkewLeftContainer>
                        <VerticalBarSkewLeftSmaller className="VerticalBarSkewLeftSmaller" />
                        <VerticalBarSkewLeft className="VerticalBarSkew" />
                    </VerticalBarSkewLeftContainer>
                    <BestSellingTitleSkewLeft>
                        Most
                    </BestSellingTitleSkewLeft>
                    <BestSellingTitleSkewRight>
                        Sold
                    </BestSellingTitleSkewRight>
                    <VerticalBarSkewRightContainer>
                        <VerticalBarSkewRight className="VerticalBarSkew" />
                        <VerticalBarSkewRightSmaller className="VerticalBarSkewRightSmaller" />
                    </VerticalBarSkewRightContainer>
                </BestSellingTitleContainer>
            </BestSellingTitleArea>

            <OnTop />

            <CategoryStallBar />

            <Stall />
        </BestSellingArea>
    )
}

export default BestSelling

const BestSellingArea = styled('div')({
    marginTop: '60px',
})

const BestSellingTitleArea = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
})

const BestSellingTitleContainer = styled('div')({
    display: 'flex',
    height: '92px',
    transform: 'skew(-20deg)',
})

const VerticalBarSkewLeftContainer = styled('div')({
    display: 'flex',
    height: '100%',
    marginRight: '7px',
})

const VerticalBarSkewLeft = styled('div')({
    backgroundColor: 'black',
    width: '15px',
    height: '100%',
})

const VerticalBarSkewLeftSmaller = styled(VerticalBarSkewLeft)({
    width: '10px',
    marginRight: '5px',
})

const BestSellingTitleSkewLeft = styled('div')({
    backgroundColor: 'black',
    fontFamily: '"Roboto", "sans-serif"',
    fontSize: '3rem',
    color: 'white',
    padding: '15px 10px 15px 30px',
    textAlign: 'right',
    border: '3px black solid',
})

const BestSellingTitleSkewRight = styled(BestSellingTitleSkewLeft)({
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'left',
    padding: '15px 30px 15px 10px',
})

const VerticalBarSkewRightContainer = styled('div')({
    display: 'flex',
    height: '100%',
    marginLeft: '7px',
})

const VerticalBarSkewRight = styled('div')({
    backgroundColor: 'black',
    width: '15px',
    height: '100%',
})

const VerticalBarSkewRightSmaller = styled(VerticalBarSkewRight)({
    width: '10px',
    marginLeft: '5px',
})