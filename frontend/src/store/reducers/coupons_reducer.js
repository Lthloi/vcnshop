import { createSlice, current } from '@reduxjs/toolkit'

const updateCouponsAreApplicable = (cartItems = [], coupons = []) => {
    let coupons_are_updated_with_applicable = coupons.map((coupon) => {
        let { apply_for: { all, shop_username, product_skus }, outOfStock, expired } = coupon

        if (outOfStock || expired) return ({ ...coupon, isApplicable: false })

        if (all) return ({ ...coupon, isApplicable: true })

        let shop_is_exist = cartItems.find(({ shop }) => shop.username === shop_username)
        if (!shop_is_exist) return ({ ...coupon, isApplicable: false })

        if (product_skus.length === 0) return ({ ...coupon, isApplicable: true })

        let sku_is_exist = cartItems.some(({ sku }) => product_skus.includes(sku))
        if (sku_is_exist) return ({ ...coupon, isApplicable: true })

        return ({ ...coupon, isApplicable: false })
    })

    return coupons_are_updated_with_applicable
}

const sortPickedCoupons = (picked_codes = [], current_coupons = []) => {
    let picked_coupons = []

    let non_picked_coupons = current_coupons.filter((coupon) => {
        let existCouponIsPicked = picked_codes.includes(coupon.code)
        if (existCouponIsPicked) picked_coupons.push(coupon)
        return !existCouponIsPicked
    })

    return picked_coupons.concat(non_picked_coupons)
}

export const couponsSlice = createSlice({
    name: 'coupons',
    initialState: {
        coupons: [],
        pickedCoupons: [],
        error: null,
        loading: false,
        checking: false,
    },
    reducers: {
        getCouponsRequest: (state) => {
            state.error = null
            state.loading = true
        },
        getCouponsSuccess: (state, action) => {
            let { new_coupons, cartItems, pickedCodes } = action.payload

            let update_coupons_are_applicable = updateCouponsAreApplicable(cartItems, new_coupons)

            if (pickedCodes.length > 0)
                state.coupons = sortPickedCoupons(pickedCodes, update_coupons_are_applicable)
            else
                state.coupons = update_coupons_are_applicable

            state.loading = false
        },
        getCouponsFail: (state, action) => {
            state.error = action.payload.error
            state.loading = false
        },


        checkCouponRequest: (state) => {
            state.error = null
            state.checking = true
        },
        checkCouponSuccess: (state, action) => {
            let { picked_codes, type: type_to_cancel, new_coupons, cartItems } = action.payload

            if (!type_to_cancel) {
                let update_coupons_are_applicable = updateCouponsAreApplicable(cartItems, new_coupons)

                state.coupons = sortPickedCoupons(picked_codes, update_coupons_are_applicable)

                state.pickedCoupons = current(state).coupons.filter(({ code }) => picked_codes.includes(code))
            } else {
                if (type_to_cancel === 'Shipping')
                    state.pickedCoupons = current(state).pickedCoupons.filter(({ type }) => type !== 'Shipping')
                else
                    state.pickedCoupons = current(state).pickedCoupons.filter(({ type }) => type === 'Shipping')
            }

            state.checking = false
        },
        checkCouponFail: (state, action) => {
            state.error = action.payload.error
            state.checking = false
        },

        
        resetPickedCoupons: (state) => {
            state.pickedCoupons = []
        },
    },
})

export const {
    getCouponsRequest, getCouponsSuccess, getCouponsFail,
    checkCouponRequest, checkCouponSuccess, checkCouponFail,
    resetPickedCoupons,
} = couponsSlice.actions

export default couponsSlice.reducer