import React from "react"
import { styled } from '@mui/material/styles'

const CouponDetail = ({ handleOpenCouponDetail, detail }) => {
    const { name, description, type, quantity, cost, img, describe, code, expireAt } = detail

    return (
        <>
            <ModalBase onClick={() => handleOpenCouponDetail(false)} className="Coupon_detail_modalbase" />

            <CouponDetailContainer className="Coupon_detail_container">
                <Name>{name}</Name>
                <Code>{code}</Code>
                <Expire>{expireAt}</Expire>
            </CouponDetailContainer>
        </>
    )
}

export default CouponDetail

const ModalBase = styled('div')({
    display: 'flex',
    backgroundColor: '#00000094',
    position: 'fixed',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    zIndex: '98',
})

const CouponDetailContainer = styled('div')({
    position: 'fixed',
    top: '50px',
    bottom: '50px',
    right: '200px',
    left: '200px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    zIndex: '99',
})

const Name = styled('div')({

})

const Code = styled('div')({

})

const Expire = styled('div')({

})