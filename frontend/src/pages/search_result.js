import React, { useCallback, useRef } from "react"
import { styled } from '@mui/material/styles'
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import Filter from "../components/search_result/filter"
import ScrollToTopBtn from '../components/scroll_top_top_btn'
import Pagination from '../components/search_result/pagination'
import { LIMIT_GET_PRODUCTS_DEFAULT } from "../configs/constants"
import { Stack, Typography } from '@mui/material'
import Products from "../components/search_result/products"

const Heading = () => {
    const { keyword } = useParams()
    const { countProducts } = useSelector(({ product }) => product)

    return (
        <Stack marginTop="20px">
            <Stack alignItems="center" bgcolor="rgba(0, 0, 0, .05)" width="100%" padding="15px" boxSizing="border-box">
                <Typography color="#858585">
                    Your Search Results For:
                </Typography>
                <Typography margin="0" component="h2">
                    {keyword}
                </Typography>
            </Stack>
            <Stack marginTop="10px" fontSize="0.9em" color="gray" padding="5px" textAlign="center">
                {countProducts + (countProducts > 1 ? ' Results Found' : ' Result Found')}
            </Stack>
        </Stack>
    )
}

const SearchResult = () => {
    const { keyword } = useParams()

    const filter_data_ref = useRef({
        limit: LIMIT_GET_PRODUCTS_DEFAULT,
        category: undefined,
        keyword: keyword,
        rating: undefined,
        price: undefined,
        pagination: 1,
        target: undefined,
    })

    const handleSetFilterData = useCallback((update_filter_data) => {
        let current_filter_data = filter_data_ref.current

        filter_data_ref.current = {
            ...current_filter_data,
            ...update_filter_data,
        }
    }, [])

    return (
        <SearchResultPage id="SearchResultPage">

            <Heading />

            <Stack
                flexDirection="row"
                columnGap="20px"
                marginTop="30px"
                padding="0 10px"
                paddingTop="10px"
            >
                <Filter
                    filterDataRef={filter_data_ref}
                    handleSetFilterData={handleSetFilterData}
                />

                <Stack width="100%" paddingRight="15px">

                    <Pagination
                        filterDataRef={filter_data_ref}
                        handleSetFilterData={handleSetFilterData}
                    />

                    <Products />

                </Stack>
            </Stack>

            <Typography
                color="gray"
                fontSize="0.8em"
                fontFamily="inherit"
                textAlign="center"
                width="100%"
                marginTop="50px"
                padding="10px"
                boxSizing="border-box"
                bgcolor="rgba(0,0,0,.05)"
            >
                If you are looking for the pagination then scroll up you can find them
            </Typography>

            <ScrollToTopBtn />

        </SearchResultPage>
    )
}

export default SearchResult

const SearchResultPage = styled('div')(({ theme }) => ({
    fontFamily: theme.fontFamily.nunito,
    paddingBottom: '30px',
}))