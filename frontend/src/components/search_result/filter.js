import React, { useState, useCallback } from "react"
import { styled } from '@mui/material/styles'
import { toast } from "react-toastify"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../store/actions/product_actions"
import { MAX_PRICE_PORDUCT } from "../../configs/constants"
import {
    Radio, RadioGroup, Collapse, Rating as RatingMUI,
    FormControl, FormControlLabel, Stack, Typography,
    Divider, Box, Tooltip,
} from "@mui/material"

const categories = {
    category: [
        'Shirt',
        'Pant',
        'Dress',
    ],
    target: [
        'Male',
        'Female',
        'Unisex',
    ],
}

const FilterContainer = ({ children, title }) => {
    const [collapse, setCollapse] = useState(true)

    return (
        <div>
            <Tooltip title={collapse ? 'Close' : 'Open'}>
                <FilterTitle onClick={() => setCollapse(pre => !pre)}>
                    <span>{title}</span>
                    <ExpandMoreIcon
                        sx={{
                            transition: 'transform 0.2s',
                            transform: collapse ? 'rotate(-90deg)' : 'rotate(0deg)',
                        }}
                    />
                </FilterTitle>
            </Tooltip>
            <StyledCollapse in={collapse}>
                {children}
            </StyledCollapse>
        </div>
    )
}

const Option = ({ category }) => (
    <OptionSection
        control={
            <Radio
                color="default"
                sx={{ padding: '5px', color: 'black' }}
            />
        }
        label={category}
        value={category}
    />
)

const SubCategory = ({ options, label, handleSubmitFilter }) => (
    <Stack marginTop="10px">
        <FormControl>
            <Typography
                display="flex"
                component="h2"
                alignItems="center"
                justifyContent="space-between"
                margin="0"
                fontSize="1em"
            >
                {label}
            </Typography>
            <RadioGroup
                name={label}
                onChange={handleSubmitFilter}
            >
                {
                    options.map((text) => (
                        <Option
                            category={text}
                            key={text}
                        />
                    ))
                }
            </RadioGroup>
        </FormControl>
    </Stack>
)

const Category = ({ handleSubmitFilter }) => {

    const pickCategory = (e) => {
        let category = e.target.value
        let label = e.target.name
        let field_to_filter

        if (label === 'Type')
            field_to_filter = 'category'
        else if (label === 'Target')
            field_to_filter = 'target'

        handleSubmitFilter({ [field_to_filter]: category })
    }

    return (
        <FilterContainer title={'Category'}>

            <SubCategory
                label={'Type'}
                options={categories.category}
                handleSubmitFilter={pickCategory}
            />

            <SubCategory
                label={'Target'}
                options={categories.target}
                handleSubmitFilter={pickCategory}
            />

        </FilterContainer>
    )
}

const Rating = ({ handleSubmitFilter }) => {
    const [rating, setRating] = useState(0)

    const switchRatingValue = (e, newRating) => {
        let new_rating = newRating || 0 // equal 0 when two consecutive time of selecting has the same value
        setRating(new_rating)

        handleSubmitFilter({ rating: new_rating })
    }

    return (
        <FilterContainer title={'Rating'}>
            <Box marginTop="10px">
                <RatingMUI
                    value={rating}
                    precision={0.5}
                    onChange={switchRatingValue}
                />
            </Box>

            <Typography component="p" fontSize="0.9em" margin="0" marginLeft="5px">
                {'From ' + rating + (rating > 1 ? ' stars' : ' star')}
            </Typography>
        </FilterContainer>
    )
}

const Price = ({ handleSubmitFilter }) => {
    const [warning, setWarning] = useState('')
    const [price, setPrice] = useState('')

    const submitPrice = () => {
        if (price * 1 > MAX_PRICE_PORDUCT)
            return setWarning(`Please enter a number smaller than or equal ${MAX_PRICE_PORDUCT}. Ex: 20.25`)
        if (price * 1 === 0)
            return setWarning('Please enter a number greater than zero. Ex: 0.15')

        handleSubmitFilter({ price: price })
    }

    const catchEnterKeyboard = e => e.key === 'Enter' && submitPrice()

    const inputFormatter = (e) => {
        let value = e.target.value
        let price_regex = /^[0-9]{0,}(\.){0,1}(\.[0-9]{1,2})?$/

        if (value === '')
            setPrice('')
        else if (price_regex.test(value))
            setPrice(value)
    }

    return (
        <FilterContainer title={'Price'}>
            <Box marginTop="10px">
                <Typography fontFamily="inherit" component="label" htmlFor="filter-price-search">
                    You're searching products with price from:
                </Typography>
            </Box>

            <Stack flexDirection="row" alignItems="center" marginTop="10px" columnGap="10px">
                <PriceFilterInput
                    value={price}
                    onChange={inputFormatter}
                    onKeyDown={catchEnterKeyboard}
                    id="filter-price-search"
                />
                <span>USD</span>
            </Stack>

            {
                warning &&
                <Typography
                    component="span"
                    display="block"
                    color="red"
                    marginTop="5px"
                    fontSize="0.8em"
                    fontFamily="inherit"
                >
                    {warning}
                </Typography>
            }

            <PriceApplyButton onClick={submitPrice}>
                Apply
            </PriceApplyButton>
        </FilterContainer>
    )
}

const Filter = ({ filterDataRef, handleSetFilterData }) => {
    const { loading } = useSelector(({ product }) => product)
    const dispatch = useDispatch()
    const filter_data = filterDataRef.current

    const dispatchSubmitFilter = (category, rating, price, target) => {
        dispatch(getProducts(
            filter_data.limit,
            category ? [category] : [filter_data.category],
            filter_data.keyword,
            (rating === 0 ? true : rating) ? rating : filter_data.rating,
            (price === 0 ? true : price) ? price : filter_data.price,
            1,
            target ? [target] : [filter_data.target],
        ))
    }

    const handleSubmitFilter = useCallback(({ price, rating, category, target }) => {
        if (price && price * 1 > MAX_PRICE_PORDUCT) {
            return toast.warning('Can\'t apply, please check again')
        }

        let set_filter_data = {}

        if (category)
            set_filter_data.category = category
        if (rating || rating === 0)
            set_filter_data.rating = rating
        if (price || price === 0)
            set_filter_data.price = [price * 1, MAX_PRICE_PORDUCT]
        if (target)
            set_filter_data.target = target

        handleSetFilterData(set_filter_data)

        dispatchSubmitFilter(
            set_filter_data.category,
            set_filter_data.rating,
            set_filter_data.price,
            set_filter_data.target
        )
    }, [dispatch, handleSetFilterData, filter_data])

    return (
        <FilterSection
            id="ProductsFilterArea"
            sx={loading ? { pointerEvents: 'none' } : {}}
        >

            <Typography
                display="flex"
                alignItems="center"
                columnGap="5px"
                borderBottom="1px #939393 solid"
                margin="0"
                paddingBottom="10px"
                fontSize="1.3em"
            >
                <FilterAltIcon />
                <span>Filter</span>
            </Typography>

            <Category handleSubmitFilter={handleSubmitFilter} />

            <Divider flexItem />

            <Rating handleSubmitFilter={handleSubmitFilter} />

            <Divider flexItem />

            <Price handleSubmitFilter={handleSubmitFilter} />

        </FilterSection>
    )
}

export default React.memo(Filter)

const FilterSection = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    width: '25%',
    height: 'fit-content',
    padding: '20px 15px',
    fontFamily: theme.fontFamily.nunito,
}))

const PriceFilterInput = styled('input')({
    outline: 'unset',
    width: '100%',
    padding: '5px 10px',
    boxSizing: 'border-box',
    border: '1px gray solid',
    '&:focus': {
        outline: '1px black solid',
    }
})

const PriceApplyButton = styled('button')({
    width: '100%',
    padding: '5px 10px',
    backgroundColor: 'black',
    color: 'white',
    marginTop: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: '2px black solid',
    borderRadius: '3px',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
    },
    '&:active': {
        backgroundColor: 'black',
        color: 'white',
    }
})

const StyledCollapse = styled(Collapse)({
    padding: '0 15px',
    paddingLeft: '25px',
})

const FilterTitle = styled('h2')({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0',
    fontSize: '1.2em',
    padding: '10px',
    paddingLeft: '15px',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,.05)',
    },
})

const OptionSection = styled(FormControlLabel)({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    paddingLeft: '5px',
    marginTop: '3px',
    cursor: 'pointer',
    '& .MuiFormControlLabel-label': {
        fontFamily: 'inherit',
    }
})