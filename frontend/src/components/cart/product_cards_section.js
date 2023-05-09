import React from "react"
import { styled } from '@mui/material/styles'
import empty_cart from '../../assets/images/cart/empty_cart.svg'
import ProductCard from "./product_card"

const description_titles = [
    { title: 'Product', width: '20%', },
    { title: 'Detail', flex: '3', },
    { title: 'Quantity', flex: '1', },
    { title: 'Cost', flex: '1', },
    { title: 'Remove', flex: '1', },
]

const ProductCardsSection = ({ cartItems }) => {
    return (
        <ProductCardsSectionArea
            id="ProductCardsSectionArea"
            sx={cartItems.length > 0 ? { height: 'fit-content' } : { height: 'auto' }}
        >
            <DescriptionsCard>
                {description_titles.map(({ title, flex, width }) => (
                    <DescriptionsTitle
                        title={title}
                        key={title}
                        sx={flex ? { flex } : { width }}
                    >
                        {title}
                    </DescriptionsTitle>
                ))}
            </DescriptionsCard>

            {
                cartItems.length > 0 ?
                    cartItems.map((item) => (
                        <React.Fragment key={item._id}>
                            <ProductCard item={item} />
                        </React.Fragment>
                    ))
                    :
                    <EmptyCartContainer>
                        <EmptyImg src={empty_cart} />
                        <EmptyCartText>
                            THERE IS NO ITEM IN YOUR CART
                        </EmptyCartText>
                        <EmptyCartText className="desc">
                            Let's shop now and make up your cart!!
                        </EmptyCartText>
                        <EmptyCartBtn href="/">
                            Shopping Now
                        </EmptyCartBtn>
                    </EmptyCartContainer>
            }
        </ProductCardsSectionArea>
    )
}

export default ProductCardsSection

const ProductCardsSectionArea = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '65%',
    backgroundColor: '#f0f0f0',
}))

const DescriptionsCard = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    columnGap: '10px',
    padding: '10px',
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: 'black',
    marginBottom: '10px',
})

const DescriptionsTitle = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1.1em',
    textAlign: 'center',
    color: 'black',
    borderRadius: '5px',
    backgroundColor: 'white',
    padding: '2px 0',
    boxSizing: 'border-box',
})

const EmptyCartContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 'auto',
})

const EmptyImg = styled('img')({
    height: '20vh',
})

const EmptyCartText = styled('p')({
    display: 'block',
    fontFamily: '"Kanit", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1.5em',
    color: '#323232',
    margin: '0',
    marginTop: '10px',
    '&.desc': {
        display: 'block',
        fontFamily: '"Nunito", "sans-serif"',
        fontWeight: 'bold',
        fontSize: '0.9em',
        marginTop: '0px',
    }
})

const EmptyCartBtn = styled('a')({
    padding: '10px 20px',
    borderRadius: '10px',
    fontFamily: 'nunito',
    fontWeight: 'bold',
    fontSize: '1em',
    color: 'white',
    backgroundColor: 'black',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'transform 0.2s',
    textDecoration: 'unset',
    '&:hover': {
        transform: 'scale(1.05)',
    },
})