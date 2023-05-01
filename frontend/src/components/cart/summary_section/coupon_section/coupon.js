import React from "react"
import { styled } from '@mui/material/styles'
import { convertPriceToPriceString } from "../../../../utils/debounce"
import { useCurrencyKeyboard } from "../../../../hooks/custom_hooks"
import ErrorIcon from '@mui/icons-material/Error'

const Coupon = ({ coupon, pickCoupon, category, defaultChecked, cartIsEmpty }) => {
    const { name, type, cost, currency, image, describe, code, isApplicable, expired, outOfStock } = coupon

    const IsWarning = () => cartIsEmpty || !isApplicable

    const handleWarning = () => {
        if (!IsWarning()) return

        let text_warning = ''

        if (cartIsEmpty) text_warning = 'Cart is empty'
        else if (expired) text_warning = 'Out Of Date'
        else if (outOfStock) text_warning = 'Has Run Out'
        else if (!isApplicable) text_warning = 'Only applicable to certain specific products'

        return (
            <Warning>
                <ErrorIcon sx={{ color: '#ff8181', width: '0.8em', height: '0.8em' }} />
                <span>{text_warning}</span>
            </Warning>
        )
    }

    return (
        <div>
            <CouponContainer
                className="CouponContainer"
                sx={IsWarning() ? { opacity: '0.6', borderColor: 'gray', pointerEvents: 'none' } : {}}
            >

                <CouponImg src={image} />

                <CouponInfo>
                    <CouponName>{name}</CouponName>
                    <CouponDesc title={describe}>
                        {describe}
                    </CouponDesc>
                    <CouponType>{type}</CouponType>
                </CouponInfo>

                <Cost>{cost + useCurrencyKeyboard(currency)}</Cost>

                <CheckboxWrapper className="CheckboxWrapper">
                    <PickCouponButton
                        type="radio"
                        name={category}
                        onChange={() => pickCoupon(category, code)}
                        checked={defaultChecked}
                    />
                    <span className="pick_coupon_button_layout_wrapper">
                        <span className="pick_coupon_button_layout"></span>
                    </span>
                </CheckboxWrapper>
            </CouponContainer>

            {handleWarning()}
        </div>
    )
}

export default Coupon

const CouponContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    width: '30vw',
    padding: '10px',
    columnGap: '10px',
    border: '2px black solid',
    boxSizing: 'border-box',
})

const CouponImg = styled('img')({
    height: '70px',
    cursor: 'pointer',
})

const CouponInfo = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '55%',
})

const CouponName = styled('h2')({
    margin: '0',
    fontSize: '1em',
    fontFamily: '"Nunito", "sans-serif"',
    cursor: 'pointer',
    width: 'fit-content',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const CouponDesc = styled('p')({
    margin: '0',
    fontSize: '0.8em',
    fontFamily: '"Nunito", "sans-serif"',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
})

const CouponType = styled('div')({
    padding: '3px 8px',
    backgroundColor: 'pink',
    borderRadius: '5px',
    width: 'fit-content',
    fontSize: '0.8em',
    fontFamily: '"Nunito", "sans-serif"',
})

const Cost = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1em',
    padding: '10px',
    width: '50px',
    boxSizing: 'border-box',
    backgroundColor: 'pink',
})

const CheckboxWrapper = styled('div')({
    display: 'flex',
    position: 'relative',
    '& span.pick_coupon_button_layout_wrapper': {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'absolute',
        '& span.pick_coupon_button_layout': {
            width: '1.2em',
            height: '1.2em',
            backgroundColor: 'unset',
            border: '2px black solid',
            boxSizing: 'border-box',
            padding: '2.5px',
            margin: 'auto',
            zIndex: '1',
            borderRadius: '50%',
            backgroundClip: 'content-box',
        }
    },
})

const PickCouponButton = styled('input')({
    width: '1.4em',
    height: '1.4em',
    margin: 'auto',
    cursor: 'pointer',
    position: 'relative', //set relative for set zindex higher span layout
    zIndex: '2',
    opacity: '0',
    '&:checked ~ span.pick_coupon_button_layout_wrapper': {
        '& span.pick_coupon_button_layout': {
            backgroundColor: 'black',
        }
    },
    '&.active': {

    }
})

const Warning = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ff6060',
    fontSize: '0.9em',
    fontFamily: '"Nunito", "sans-serif"',
    columnGap: '5px',
    padding: '5px',
    backgroundColor: '#ffe1e1',
})