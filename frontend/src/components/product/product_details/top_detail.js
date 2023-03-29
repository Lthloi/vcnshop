import React, { useMemo } from "react"
import { styled } from '@mui/material/styles'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import StorefrontIcon from '@mui/icons-material/Storefront'
import Rating from '@mui/material/Rating'

//for Name and Rating and Add to favourite and Shop Name and Stock and Description
const TopDetail = ({ product }) => {

    const description = useMemo(() => {
        if (product && product.description)
            return product.description.slice(0, 150)
        return ''
    }, [product])

    return (
        <TopDetailContainer>
            <ProductName>
                {product.name}
            </ProductName>

            <Reviews>
                <Rating
                    name="half-review-read" readOnly
                    defaultValue={0} precision={0.5}
                    value={product.review.average_rating * 1}
                />
                <ReviewCount title="View reviews">
                    <span>{(product.review.count_review)}</span>
                    <span>{(product.review.count_review) > 1 ? ' reviews' : ' review'}</span>
                </ReviewCount>
                <AddToFavourite title="Add this product to Favourite List">
                    <FavoriteBorderIcon sx={{ width: '0.9em', height: '0.9em', fontSize: '1.1em' }} />
                    <AddToFavouriteText>
                        Add To Wishlist
                    </AddToFavouriteText>
                </AddToFavourite>
            </Reviews>

            <Shop>
                <StorefrontIcon />
                <ShopName className="ShopName" title="Visit this shop">
                    {'Shop: ' + product.shop.name}
                </ShopName>
                <InStock
                    title={product.stock > 0 ? `Left ${product.stock} products` : 'Out of stock'}
                    sx={{ backgroundColor: product.stock > 0 ? '#6ce26c' : '#ff6161' }}
                >
                    {product.stock > 0 ? 'In Stock [' + product.stock + ']' : 'Out of stock'}
                </InStock>
            </Shop>

            <DescriptionContainer>
                <DetailTitles className="Desc">
                    Description
                </DetailTitles>
                <Description>
                    <span>{description}</span>
                    <ReadMore>
                        <span>...</span><span>Read More</span>
                    </ReadMore>
                </Description>
            </DescriptionContainer>
        </TopDetailContainer>
    )
}

export default TopDetail

const nunito_font = {
    fontFamily: '"Nunito", "sans-serif"',
}

const TopDetailContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
})

const ProductName = styled('div')({
    fontFamily: '"Work Sans", sans-serif',
    fontWeight: 'bold',
    fontSize: '1.5em',
})

const Reviews = styled('div')({
    ...nunito_font,
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
})

const ReviewCount = styled('div')({
    ...nunito_font,
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const AddToFavourite = styled('div')({
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    transition: 'background-color 0.2s',
    padding: '3px 5px',
    cursor: 'pointer',
    marginLeft: '10px',
    columnGap: '3px',
    border: '1px black solid',
    '&:hover': {
        backgroundColor: '#fedddd',
    }
})

const AddToFavouriteText = styled('div')({
    ...nunito_font,
    fontSize: '0.9em',
})

const Shop = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    width: 'fit-content',
})

const ShopName = styled('div')({
    fontFamily: '"Finlandica","sans-serif"',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    },
})

const InStock = styled('div')({
    fontFamily: '"Finlandica","sans-serif"',
    fontSize: '0.9em',
    fontWeight: 'bold',
    borderRadius: '10px',
    padding: '3px 10px',
    marginLeft: '10px',
})

const DescriptionContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '3px',
    margin: '0',
})

const Description = styled('p')({
    margin: '0',
    '& span': {
        ...nunito_font,
        whiteSpace: 'pre-line',
        lineHeight: '1.3em',
        fontSize: '0.9em',
    },
})

const ReadMore = styled('button')({
    border: 'unset',
    backgroundColor: 'unset',
    cursor: 'pointer',
    color: '#f87fa8',
    fontWeight: 'bold',
    fontSize: '0.95em',
    '& span:last-child': {
        fontWeight: 'normal',
        fontSize: '0.9em',
    },
    '&:hover span:last-child': {
        textDecoration: 'underline',
    }
})

const DetailTitles = styled('h2')({
    ...nunito_font,
    fontSize: '1.1em',
    margin: '0',
    fontWeight: 'bold',
})