import React from "react"
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import black_friday from '../../assets/images/sales/black_friday.jpg'
import flash_sale from '../../assets/images/sales/flash_sale.jpg'
import supper_sale from '../../assets/images/sales/supper_sale.jpg'
import free_shipping_max from '../../assets/images/sales/free_shipping.jpg'
import off_coupon from '../../assets/images/coupons/off_coupon.svg'
import free_shipping from '../../assets/images/coupons/free_shipping.svg'
import gift from '../../assets/images/coupons/gift.svg'
import cashback from '../../assets/images/coupons/cashback.svg'

const banners = [
    { id: 1, img: black_friday, },
    { id: 2, img: flash_sale, },
    { id: 3, img: supper_sale, },
    { id: 4, img: free_shipping_max, },
]

const coupons = [
    {
        id: 1, name: 'Coupons', logo: off_coupon, background_color: '#bbe2ff',
        desc: 'Get this coupon now and many more attractive discount codes!',
    }, {
        id: 2, name: 'Free Shipping', logo: free_shipping, background_color: '#ffcfcf',
        desc: 'Get this coupon now and many more attractive discount codes!',
    }, {
        id: 3, name: 'Gift', logo: gift, background_color: '#bbffc9',
        desc: 'Get this coupon now and many more attractive discount codes!',
    }, {
        id: 4, name: 'Cashback', logo: cashback, background_color: '#ffe7bb',
        desc: 'Get this coupon now and many more attractive discount codes!',
    },
]

const SalesAndCoupons = () => {
    return (
        <SalesAndCouponsArea id="SalesAndCouponsArea">
            <Title>
                Coupons and Big Sale
            </Title>
            <CouponsArea>
                {
                    coupons.map(({ id, name, logo, background_color, desc }) => (
                        <CouponsContainer key={id}
                            sx={{ backgroundColor: background_color }}
                        >
                            <CouponLogoWrapper>
                                <Logo src={logo} />
                            </CouponLogoWrapper>
                            <TextContainer>
                                <Name>
                                    {name}
                                </Name>
                                <Desc>
                                    {desc}
                                </Desc>
                            </TextContainer>
                        </CouponsContainer>
                    ))
                }
            </CouponsArea>
            <SalesArea>
                {
                    banners.length > 0 &&
                    banners.map(({ id, img }) => {
                        let longer_width = '60%'
                        let shorter_width = '38%'
                        if (id > 2) {
                            let temp = longer_width
                            longer_width = shorter_width
                            shorter_width = temp
                        }
                        return (
                            <BannerWrapper
                                key={id}
                                elevation={3}
                                sx={{ width: id % 2 === 0 ? longer_width : shorter_width, }}
                            >
                                <Banner src={img} alt="Can't load" />
                            </BannerWrapper>
                        )
                    })
                }
            </SalesArea>
        </SalesAndCouponsArea>
    )
}

export default SalesAndCoupons

const SalesAndCouponsArea = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '20px',
})

const Title = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    fontFamily: '"Rampart One", cursive',
    fontWeight: 'bold',
    fontSize: '2.5em',
    width: '100%',
    padding: '0 0 8px',
    boxSizing: 'border-box',
})

const CouponsArea = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '95%',
    rowGap: '10px',
    marginTop: '10px',
})

const CouponsContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '49%',
    columnGap: '10px',
    boxSizing: 'border-box',
    padding: '15px',
    borderRadius: '10px',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.03)',
    }
})

const CouponLogoWrapper = styled('div')({
    display: 'flex'
})

const Logo = styled('img')({
    height: '3em',
    margin: 'auto',
})

const TextContainer = styled('div')({

})

const Name = styled('h2')({
    fontFamily: 'nunito',
    fontSize: '1.4em',
    margin: '0',
})

const Desc = styled('p')({
    fontFamily: 'nunito',
    margin: '0',
})

const SalesArea = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: '10px',
    marginTop: '15px',
    width: '95%',
})

const BannerWrapper = styled(Paper)({
    height: '48vh',
    cursor: 'pointer',
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.02)',
    }
})

const Banner = styled('img')({
    width: '100%',
    height: '100%',
})