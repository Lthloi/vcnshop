import React from "react"
import { styled } from '@mui/material/styles'
import { useSelector } from "react-redux"

const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector(({ cart }) => cart)

    const summary = sessionStorage.getItem('summary')

    return (
        <ConfirmOrderSection id="ConfirmOrderSection">
            <LeftContainer>
                <ShippingInfoSection>
                    <Title>SHIPPING INFO</Title>
                    {
                        shippingInfo && shippingInfo.Country &&
                        ['Address', 'City', 'State', 'Zip Code', 'Country', 'Phone'].map((item) => (
                            <ItemConatiner key={item}>
                                <ItemName>{item}</ItemName>
                                <ItemValue>{shippingInfo[item] || 'Not Provided'}</ItemValue>
                            </ItemConatiner>
                        ))
                    }
                </ShippingInfoSection>
                <CartItemsSection>
                    <Title>ITEMS</Title>
                    {
                        cartItems.map(({ name, cost, color, size, quantity, image_link }) => (
                            <ProductCard>
                                <ProductImg src={image_link} />
                                <ProductDetailContainer>
                                    <Detail>
                                        <DetailName>Name:</DetailName>
                                        <DetailValue>{name}</DetailValue>
                                    </Detail>
                                    <Detail>
                                        <DetailName>Cost:</DetailName>
                                        <DetailValue>{cost}</DetailValue>
                                    </Detail>
                                    <Detail>
                                        <DetailName>Color:</DetailName>
                                        <DetailValue>{color}</DetailValue>
                                    </Detail>
                                    <Detail>
                                        <DetailName>Size:</DetailName>
                                        <DetailValue>{size}</DetailValue>
                                    </Detail>
                                    <Detail>
                                        <DetailName>Quantity:</DetailName>
                                        <DetailValue>{quantity}</DetailValue>
                                    </Detail>
                                </ProductDetailContainer>
                            </ProductCard>
                        ))
                    }
                </CartItemsSection>
            </LeftContainer>

            <RightContainer>
                <SummarySection>

                </SummarySection>
            </RightContainer>
        </ConfirmOrderSection>
    )
}

export default ConfirmOrder

const ConfirmOrderSection = styled('div')(({ theme }) => ({
    width: '100%',
    marginTop: '30px',
}))

const LeftContainer = styled('div')({
    width: '55%'
})

const ShippingInfoSection = styled('div')({
    width: '100%',
})

const CartItemsSection = styled('div')({
    marginTop: '30px',
    width: '100%',
})

const ProductCard = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    width: '100%',
    marginBottom: '20px',
})

const ProductImg = styled('img')({
    height: '100px',
})

const ProductDetailContainer = styled('div')({
    width: '100%',
})

const Detail = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
})

const DetailName = styled('span')({

})

const DetailValue = styled('span')({

})

const RightContainer = styled('div')({

})

const SummarySection = styled('div')({

})

const Title = styled('div')({

})

const ItemConatiner = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
})

const ItemName = styled('span')({

})

const ItemValue = styled('span')({

})