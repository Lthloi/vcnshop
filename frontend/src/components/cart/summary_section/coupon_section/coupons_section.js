import React, { useEffect, useRef } from "react"
import { styled } from '@mui/material/styles'
import Drawer from '@mui/material/Drawer'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCoupons, confirmCoupons, cancelPickCoupons,
} from "../../../../store/actions/coupon_actions"
import CircularProgress from '@mui/material/CircularProgress'
import Coupon from "./coupon"
import MoodBadIcon from '@mui/icons-material/MoodBad'
import { toast } from 'react-toastify'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const CouponsSection = ({
    openCouponSection, handleOpenCouponSection, cartIsEmpty,
    pickedCouponObject, setPickedCouponObject,
}) => {
    const { coupons, loading, error, checking } = useSelector(({ coupons }) => coupons)
    const coupon_section_ref = useRef()
    const dispatch = useDispatch()

    const getPickedCouponObjectList = () => Object.values(pickedCouponObject).filter((value) => !!value)

    useEffect(() => {
        if (!coupon_section_ref.current) return
        if (checking) coupon_section_ref.current.style.overflow = 'hidden'
        else coupon_section_ref.current.style.overflow = 'unset'
    }, [checking])

    useEffect(() => {
        dispatch(getCoupons(getPickedCouponObjectList()))
    }, [openCouponSection])

    const cancelAndPickCoupon = (coupon_type, code) => {
        if (code)
            setPickedCouponObject(pre => ({ ...pre, [coupon_type]: code }))
        else {
            if (coupon_type === 'Shipping' && !pickedCouponObject.Shipping) return
            if (coupon_type !== 'Shipping' && !pickedCouponObject.Other) return
            setPickedCouponObject(pre => ({ ...pre, [coupon_type]: null }))
            dispatch(cancelPickCoupons(coupon_type))
        }
    }

    const submitPickedCoupons = (confirm) => {
        if (!confirm) return handleOpenCouponSection(false)
        if (cartIsEmpty) return
        let pickedCoupon_list = getPickedCouponObjectList()
        if (pickedCoupon_list.length === 0) return toast.warn('Please pick at least one coupon!')
        dispatch(confirmCoupons(pickedCoupon_list))
    }

    const RenderCancelPickCouponBtn = (coupon_type) => (
        <CancelPickCouponsContainer>
            <CancelPickCouponBtn onClick={() => cancelAndPickCoupon(coupon_type)}>
                <CancelPickCouponIcon />
                <span>Cancel Pick</span>
            </CancelPickCouponBtn>
        </CancelPickCouponsContainer>
    )

    return (
        <CouponsSectionArea id="CouponsSectionArea"
            open={openCouponSection}
            anchor='right'
            onClose={() => submitPickedCoupons(false)}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} ref={coupon_section_ref}>
                {
                    checking &&
                    <ConfirmmingModalBase>
                        <CircularProgress size={25} thickness={6} sx={{ color: 'white' }} />
                    </ConfirmmingModalBase>
                }

                <CouponSectionTitle>COUPONS</CouponSectionTitle>
                <Preface>
                    <div>Pick coupons you want.</div>
                    <div style={{ display: 'block', width: '100%' }}>
                        You can only pick up to two coupons, one for shipping coupons,
                        one for other coupons. After picking, scroll down and confirm.
                    </div>
                </Preface>
                <Hr />
                {loading ? (
                    <Loading size={25} thickness={6} />
                ) : error ? (
                    <Error>{error.message}</Error>
                ) : coupons && coupons.length > 0 ?
                    <VouchersArea>
                        <VouchersAreaTitle>Shipping Coupons</VouchersAreaTitle>
                        <FreeShippingCoupons>
                            {coupons.map((coupon) => coupon.type === 'Shipping' &&
                                <React.Fragment key={coupon._id}>
                                    <Coupon
                                        cartIsEmpty={cartIsEmpty}
                                        coupon={coupon}
                                        pickCoupon={cancelAndPickCoupon}
                                        category="Shipping" //name of input
                                        defaultChecked={coupon.code === pickedCouponObject.Shipping}
                                    />
                                </React.Fragment>
                            )}
                        </FreeShippingCoupons>

                        {RenderCancelPickCouponBtn('Shipping')}

                        <Hr className="speperate_free_shipping_and_other" />

                        <VouchersAreaTitle>Other Coupons</VouchersAreaTitle>
                        <OtherCoupons>
                            {coupons.map((coupon) => coupon.type !== 'Shipping' &&
                                <React.Fragment key={coupon._id}>
                                    <Coupon
                                        cartIsEmpty={cartIsEmpty}
                                        coupon={coupon}
                                        pickCoupon={cancelAndPickCoupon}
                                        category="Other" //name of input
                                        defaultChecked={coupon.code === pickedCouponObject.Other}
                                    />
                                </React.Fragment>
                            )}
                        </OtherCoupons>

                        {RenderCancelPickCouponBtn('Other')}

                        <PickCount>
                            <span>* You picked </span><span><b>{getPickedCouponObjectList().length}</b></span>
                            <span>{getPickedCouponObjectList().length < 2 ? ' coupon.' : ' coupons.'}</span>
                        </PickCount>
                    </VouchersArea>
                    :
                    <EmptyCoupons>
                        <MoodBadIcon sx={{ height: '2.5em', width: '2.5em' }} />
                        <span>Oops!! You don't have any coupon.</span>
                    </EmptyCoupons>
                }
            </div>
            <ButtonArea>
                <Button onClick={() => submitPickedCoupons(false)}>
                    Cancle
                </Button>
                <Button onClick={() => submitPickedCoupons(true)}>
                    Confirm
                </Button>
            </ButtonArea>
        </CouponsSectionArea>
    )
}

export default CouponsSection

const CouponsSectionArea = styled(Drawer)({
    '& div.MuiPaper-root.MuiDrawer-paper': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        zIndex: '10',
    }
})

const ConfirmmingModalBase = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: '100px',
    width: '100%',
    height: '100vh',
})

const CouponSectionTitle = styled('h2')({
    margin: '0',
    fontFamily: '"Kanit", "sans-serif"',
})

const Preface = styled('div')({
    margin: 'auto',
    fontFamily: 'Nunito',
    width: '30vw',
    boxSizing: 'border-box',
    textAlign: 'center',
})

const Hr = styled('hr')({
    backgroundColor: 'black',
    borderWidth: '0',
    height: '3px',
    width: '50%',
    margin: '10px auto',
    '&.speperate_free_shipping_and_other': {
        marginTop: '20px',
    }
})

const VouchersArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
})

const Loading = styled(CircularProgress)({
    display: 'flex',
    padding: '20px 0',
    color: 'black',
    margin: 'auto',
})

const Error = styled('div')({
    color: 'red',
    fontFamily: '"Nunito", "sans-serif"',
    textAlign: 'center',
})

const VouchersAreaTitle = styled('h2')({
    margin: '0',
    marginLeft: '10px',
    fontFamily: '"Kanit", "sans-serif"',
    marginBottom: '5px',
})

const FreeShippingCoupons = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
})

const CancelPickCouponsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '5px',
    marginTop: '10px',
}))

const CancelPickCouponIcon = styled(HighlightOffIcon)({
    width: '0.8em',
    height: '0.8em',
    color: 'white',
})

const CancelPickCouponBtn = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    fontFamily: 'nunito',
    fontWeight: 'bold',
    fontSize: '1em',
    border: '2px white solid',
    cursor: 'pointer',
    padding: '15px 15px 15px 12px',
    width: 'fit-content',
    height: '36px',
    boxSizing: 'border-box',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
        outline: '2px black solid',
    }
})

const OtherCoupons = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
})

const PickCount = styled('p')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '0.9em',
    margin: '0',
    marginLeft: '10px',
    marginTop: '10px',
})

const EmptyCoupons = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.2em',
    rowGap: '5px',
})

const ButtonArea = styled('div')({
    display: 'flex',
    columnGap: '10px',
    width: '100%',
    marginTop: '10px',
})

const Button = styled('button')({
    display: 'flex',
    justifyContent: 'center',
    border: 'unset',
    borderRadius: '10px',
    backgroundColor: 'black',
    padding: '10px',
    width: '100%',
    boxSizing: 'border-box',
    color: 'white',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    letterSpacing: '2px',
    fontSize: '1em',
    cursor: 'pointer',
})