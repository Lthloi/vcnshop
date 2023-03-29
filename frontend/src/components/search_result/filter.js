import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import Rating from '@mui/material/Rating'
import { toast } from "react-toastify"
import { useForm } from 'react-hook-form'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from "@mui/material/Collapse"
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { useDispatch } from "react-redux"
import { getProducts } from "../../store/actions/product_actions"
import { MAX_PRICE_PORDUCT } from "../../utils/constants"
import Category from "./category"

const Filter = ({ productsLoading, filterDataRef }) => {
    const { register, formState: { errors }, handleSubmit, setError } = useForm()
    const [filterCollapse, setFilterCollapse] = useState({
        Category: true, Rating: true, Price: true,
    })
    const [ratingValue, setRatingValue] = useState(0)
    const dispatch = useDispatch()

    const submitFilter = (newFilterData, e) => {
        if (e) e.preventDefault()

        if (newFilterData.priceFilter && newFilterData.priceFilter * 1 > MAX_PRICE_PORDUCT) {
            setError('price')
            return toast.warning('Can\'t apply, please check again')
        }

        let set_filter_data = filterDataRef.current

        if (newFilterData.rating || newFilterData.rating === 0)
            set_filter_data.rating = newFilterData.rating
        if (newFilterData.price || newFilterData.price === 0)
            set_filter_data.price = [(newFilterData.price || 0) * 1, MAX_PRICE_PORDUCT]
        if (newFilterData.for) set_filter_data.for = newFilterData.for
        if (newFilterData.type)
            set_filter_data.type = newFilterData.type.length > 0 ? newFilterData.type : null

        filterDataRef.current = set_filter_data

        dispatch(getProducts(
            set_filter_data.limit, set_filter_data.category,
            set_filter_data.keyword, set_filter_data.rating,
            set_filter_data.price, 1,
            set_filter_data.for, set_filter_data.type,
        ))
    }

    const expandMoreFilterTab = (tab_title) => {
        setFilterCollapse(pre => ({ ...pre, [tab_title]: !pre[tab_title] }))
    }

    const switchRatingValue = (e, newRating) => {
        if (!newRating) newRating = 0
        setRatingValue(newRating)
        submitFilter({ rating: newRating })
    }

    const RenderFilterTitle = (title) => (
        <FilterTitle onClick={() => expandMoreFilterTab(title)}>
            <span>{title}</span>
            <ExpandMoreIcon sx={{
                transition: 'transform 0.2s',
                transform: filterCollapse[title] ? 'rotate(-90deg)' : 'rotate(0deg)',
            }} />
        </FilterTitle>
    )

    return (
        <FilterArea id="ProductsFilterArea" action=""
            onSubmit={handleSubmit(submitFilter)}
        >
            {productsLoading && <PreventFilter />}

            <Title>
                <FilterAltIcon /><span>Filter</span>
            </Title>

            <Category
                openCategoryCollapse={filterCollapse.Category}
                submitFilter={submitFilter}
                RenderFilterTitle={RenderFilterTitle}
            />

            <Hr />

            <RatingFilter>
                {RenderFilterTitle('Rating')}
                <StyledCollapse in={filterCollapse.Rating}>
                    <Rating
                        value={ratingValue} precision={0.5}
                        onChange={switchRatingValue}
                    />
                    <RatingFilterText>
                        {'From ' + ratingValue + (ratingValue > 1 ? ' stars' : ' star')}
                    </RatingFilterText>
                </StyledCollapse>
            </RatingFilter>

            <Hr />

            <PriceFilter>
                {RenderFilterTitle('Price')}
                <StyledCollapse in={filterCollapse.Price}>
                    <PriceFilterText>
                        You're searching products with price from:
                    </PriceFilterText>
                    <PriceFilterInputContainer>
                        <PriceFilterInput
                            maxLength={5}
                            {...register('price', {
                                required: true,
                                pattern: /^[0-9]+(\.[0-9]+)?$/,
                            })}
                        />
                        <Currency>USD</Currency>
                    </PriceFilterInputContainer>
                    {
                        errors.price &&
                        <PriceWarning>
                            Please enter a number smaller than or equal 25000.
                        </PriceWarning>
                    }
                    <PriceApplyButton>
                        Apply
                    </PriceApplyButton>
                </StyledCollapse>
            </PriceFilter>
        </FilterArea>
    )
}

export default Filter

const FilterTitle = styled('h2')({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0',
    fontSize: '1.2em',
    fontFamily: '"Nunito","sans-serif"',
    padding: '10px',
    paddingLeft: '15px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#e1eeff',
    },
})

const FilterArea = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    width: '25%',
    height: 'fit-content',
    padding: '15px',
    borderRight: '1px #939393 solid',
    position: 'relative',
    zIndex: '1',
}))

const PreventFilter = styled('div')({
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '10',
})

const Title = styled('h2')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    fontFamily: '"Work Sans", sans-serif',
    borderBottom: '1px #939393 solid',
    margin: '0',
    paddingBottom: '10px',
})

const StyledCollapse = styled(Collapse)({
    padding: '0 15px',
    paddingLeft: '25px',
})

const Hr = styled('div')({
    height: '0.5px',
    backgroundColor: '#939393',
    width: '100%',
})

const RatingFilter = styled('div')({

})

const RatingFilterText = styled('p')({
    margin: '0',
    fontFamily: '"Nunito","sans-serif"',
    fontSize: '0.9em',
    marginLeft: '5px',
})

const PriceFilter = styled('div')({

})

const PriceFilterText = styled('p')({
    margin: '0',
    fontFamily: '"Nunito","sans-serif"',
})

const PriceFilterInputContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    columnGap: '5px',
})

const PriceFilterInput = styled('input')({
    outline: 'unset',
    width: '100%',
    padding: '5px 10px',
    boxSizing: 'border-box',
    border: '1px gray solid',
})

const Currency = styled('span')({
    fontFamily: '"Nunito","sans-serif"',
})

const PriceWarning = styled('span')({
    display: 'block',
    fontFamily: '"Nunito","sans-serif"',
    color: 'red',
    marginTop: '3px',
})

const PriceApplyButton = styled('button')({
    width: '100%',
    padding: '5px 10px',
    backgroundColor: 'black',
    color: 'white',
    marginTop: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'pink',
        color: 'black',
    },
    '&:active': {
        backgroundColor: 'black',
        color: 'white',
    }
})