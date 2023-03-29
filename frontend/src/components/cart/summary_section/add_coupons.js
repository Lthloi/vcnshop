import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import { useSelector } from "react-redux"
import CouponsSection from "./coupon_section/coupons_section"
import AddIcon from '@mui/icons-material/Add'
import { CircularProgress } from "@mui/material"

const AddCoupons = ({ cartItemsLength }) => {
    const { pickedCoupons, error, checking } = useSelector(({ coupons }) => coupons)
    const [openCouponSection, setOpenCouponSection] = useState(false)

    const picked_coupon_object = { Shipping: null, Other: null }
    const [pickedCouponObject, setPickedCouponObject] = useState(picked_coupon_object)

    useEffect(() => {
        if (pickedCoupons.length === 0)
            setPickedCouponObject(picked_coupon_object)
    }, [pickedCoupons])

    const handleOpenCouponSection = (open) => {
        setOpenCouponSection(open)
    }

    return (
        <AddCouponsContainer id="AddCouponsContainer">
            {
                openCouponSection &&
                <CouponsSection
                    setPickedCouponObject={setPickedCouponObject}
                    pickedCouponObject={pickedCouponObject}
                    cartIsEmpty={cartItemsLength === 0 ? true : false}
                    openCouponSection={openCouponSection}
                    handleOpenCouponSection={handleOpenCouponSection}
                />
            }

            <CouponTitle>COUPONS</CouponTitle>
            <HelperText>
                Add an available coupons by click at this plus button.
            </HelperText>
            <AddCouponBtnWrapper
                title="Add Coupons Now"
                onClick={() => handleOpenCouponSection(true)}
            >
                <AddIcon sx={{ width: '1.1em', height: '1.1em', color: 'white' }} />
                <span>Add Coupons</span>
            </AddCouponBtnWrapper>
            <CouponResults>
                {
                    checking ?
                        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress size={25} thickness={8} sx={{ color: 'black' }} />
                        </div>
                        :
                        error && <Warning>{'Warning: ' + error.message}</Warning>
                }
                {pickedCoupons && pickedCoupons.length > 0 && <ResultTitle>You added:</ResultTitle>}
                {
                    pickedCoupons && pickedCoupons.length > 0 &&
                    pickedCoupons.map(({ _id, name, describe, image, cost }) => (
                        <ResultCoupon
                            title="View detail of this coupon"
                            key={_id}
                            sx={{ backgroundImage: `url(${image})` }}
                        >
                            <CouponInfoContainer>
                                <CouponName>{name}</CouponName>
                                <CouponDescribe>{describe}</CouponDescribe>
                            </CouponInfoContainer>
                            <CostCoupon title="Coupon cost">
                                {cost.currency === 'U' ? '$' + cost.value : '%' + cost.value}
                            </CostCoupon>
                        </ResultCoupon>
                    ))
                }
            </CouponResults>
        </AddCouponsContainer>
    )
}

export default AddCoupons

const AddCouponsContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
})

const CouponTitle = styled('h2')({
    fontFamily: '"Kanit", "sans-serif"',
    transform: 'scaleY(0.8)',
    margin: '0',
})

const HelperText = styled('p')({
    fontSize: '0.9em',
    fontFamily: '"Nunito", "sans-serif"',
    margin: '0',
})

const AddCouponBtnWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'black',
    cursor: 'pointer',
    borderRadius: '5px',
    color: 'white',
    columnGap: '10px',
    padding: '5px',
    fontFamily: '"Nunito", "sans-serif"',
    boxSizing: 'border-box',
    marginTop: '5px',
    fontSize: '0.9em',
})

const CouponResults = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '6px',
})

const Warning = styled('div')({
    fontSize: '0.8em',
    fontWeight: 'bold',
    fontFamily: '"Nunito", "sans-serif"',
    marginTop: '10px',
    color: 'red',
})

const ResultTitle = styled('h2')({
    color: 'black',
    margin: '0',
    marginTop: '10px',
    fontSize: '0.95em',
    fontFamily: '"Nunito", "sans-serif"',
    borderBottom: '2px black solid',
    width: 'fit-content',
})

const ResultCoupon = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px',
    boxSizing: 'border-box',
    backgroundRepeat: 'repeat',
    backgroundSize: 'contain',
    opacity: '0.5',
    columnGap: '10px',
    cursor: 'pointer',
    marginTop: '3px',
})

const CouponInfoContainer = styled('div')({
    backgroundColor: 'white',
    padding: '5px 12px',
    marginLeft: '5px',
    width: '100%',
})

const CouponName = styled('h2')({
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1em',
})

const CouponDescribe = styled('div')({
    fontSize: '0.8em',
    fontFamily: '"Nunito", "sans-serif"',
})

const CostCoupon = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '17%',
    fontFamily: '"Nunito", "sans-serif"',
    backgroundColor: 'white',
    marginRight: '5px',
    fontWeight: 'bold',
    fontSize: '1.1em',
})