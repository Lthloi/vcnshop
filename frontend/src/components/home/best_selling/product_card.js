import React from "react"
import { styled } from '@mui/material/styles'
import Rating from '@mui/material/Rating'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    const { _id, name, image_link, price, sold, review } = product

    return (
        <ProductCardsContainer>
            <ImgContainer elevation={3}>
                <ImgWrapper to={`/productDetail/${_id}`}>
                    <Img src={image_link} alt="Can't load"
                        loading="lazy"
                    />
                </ImgWrapper>
            </ImgContainer>
            <ProductInfo>
                <Name title={name} to={`/productDetail/${_id}`}>
                    {name}
                </Name>
                <RatingContainer>
                    <Rating name="half-rating-read" defaultValue={0}
                        precision={0.2} readOnly value={review.avetage_rating}
                        size="small" sx={{ color: '#ff2222', }}
                    />
                    <RatingNumber>
                        {review.avetage_rating > 0.2 ? review.avetage_rating : 0}
                    </RatingNumber>
                    <RatingCount>
                        ({review.count_reviews.toLocaleString('en', { useGrouping: true })})
                    </RatingCount>
                </RatingContainer>
                <SoldCount>
                    {'Sold: ' + sold.count}
                </SoldCount>
                <Price>
                    {'$' + price.value}
                </Price>
            </ProductInfo>
        </ProductCardsContainer>
    )
}

export default ProductCard

const ProductCardsContainer = styled('div')({
    padding: '10px',
    width: '100%',
    backgroundColor: '#ffcbcb',
    borderRadius: '10px',
    boxSizing: 'border-box',
})

const ImgContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    cursor: 'pointer',
    border: '2px white solid',
    overflow: 'hidden',
    '&:hover': {
        outline: '3px black solid',
    },
})

const ImgWrapper = styled(Link)({
    display: 'flex',
    width: '100%',
})

const Img = styled('img')({
    width: '100%',
    height: '270px',
})

const ProductInfo = styled('div')({
    paddingLeft: '5px',
    paddingRight: '5px',
})

const Name = styled(Link)({
    display: 'block',
    color: 'black',
    textDecoration: 'unset',
    width: 'fit-content',
    maxWidth: '100%',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1rem',
    marginTop: '10px',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const RatingContainer = styled('div')({
    display: 'flex',
    columnGap: '5px',
})

const RatingNumber = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9rem',
})

const RatingCount = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9rem',
})

const SoldCount = styled('div')({
    fontFamily: 'cursive',
    color: 'grey',
    fontSize: '0.9em',
    fontWeight: 'bold',
})

const Price = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9rem',
    marginTop: '5px',
    paddingLeft: '5px',
    backgroundColor: 'white',
    borderRadius: '5px',
})