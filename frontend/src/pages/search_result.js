import React, { useEffect, useRef } from "react"
import { styled } from '@mui/material/styles'
import { useParams } from "react-router-dom"
import { getProducts } from '../store/actions/product_actions'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from '@mui/material/Skeleton'
import Filter from "../components/search_result/filter"
import ScrollToTopBtn from '../components/scroll_top_top_btn'
import { Grid } from "@mui/material"
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import Pagination from '../components/search_result/pagination'
import ProductCard from "../components/search_result/product_card"
import { LIMIT_GET_PRODUCTS_DEFAULT } from "../utils/constants"

const SearchResult = () => {
    const { products, loading, error } = useSelector(({ product }) => product.search)
    const { countProduct } = useSelector(({ product }) => product)
    const { keyword } = useParams()
    const dispatch = useDispatch()
    const productsArea_ref = useRef()

    const filterData_ref = useRef({
        limit: undefined,
        category: undefined,
        keyword: keyword,
        rating: undefined,
        price: undefined,
        pagination: undefined,
        for: undefined,
        type: undefined,
    })

    useEffect(() => {
        dispatch(getProducts(LIMIT_GET_PRODUCTS_DEFAULT, undefined, keyword))
    }, [dispatch])

    return (
        <SearchResultPage id="SearchResultPage">
            <HeaderArea id="HeaderArea">
                <Container>
                    <Title>Your Search Results For:</Title>
                    <KeywordResult>{keyword}</KeywordResult>
                </Container>
                <ResultCount>
                    {countProduct + (countProduct > 1 ? ' Results Found' : ' Result Found')}
                </ResultCount>
            </HeaderArea>

            <ResultArea ref={productsArea_ref}>
                <Filter
                    productsLoading={loading}
                    filterDataRef={filterData_ref}
                />

                <ProductsArea>
                    <Grid
                        container
                        columns={{ xs: 12 }}
                        columnSpacing={{ xs: 1.5 }}
                        rowSpacing={{ xs: 2 }}
                    >
                        {
                            loading ? (
                                [1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                                    <Grid item key={value} xs={3}>
                                        <ProductLoading animation="wave" />
                                    </Grid>
                                ))
                            ) : error ? (
                                <Error>{error.message}</Error>
                            ) : products && products.length > 0 ?
                                products.map((product) => (
                                    <Grid
                                        key={product._id}
                                        item
                                        xs={3}
                                    >
                                        <ProductCard product={product} />
                                    </Grid>
                                ))
                                :
                                <EmptyProductsContainer>
                                    <HeartBrokenIcon sx={{ fontSize: '3.8em' }} />
                                    <EmptyProductsText>
                                        Oops!! No Result For Your Search...
                                    </EmptyProductsText>
                                </EmptyProductsContainer>
                        }
                    </Grid>

                    <Pagination
                        countProduct={countProduct}
                        productsAreaRef={productsArea_ref}
                        filterDataRef={filterData_ref}
                    />
                </ProductsArea>
            </ResultArea>

            <ScrollToTopBtn />
        </SearchResultPage>
    )
}

export default SearchResult

const SearchResultPage = styled('div')(({ theme }) => ({
    margin: '0',
}))

const HeaderArea = styled('div')({
    rowGap: '5px',
    marginTop: '20px',
})

const Container = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ededed',
    width: '100%',
    padding: '15px',
    boxSizing: 'border-box',
})

const Title = styled('div')({
    fontFamily: '"Roboto", "sans-serif"',
    color: '#858585',
})

const KeywordResult = styled('h2')({
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
})

const ResultCount = styled('div')({
    fontFamily: '"Lato", "sans-serif"',
    fontSize: '0.9em',
    marginTop: '10px',
    color: 'gray',
    backgroundColor: '#ededed',
    padding: '5px',
    textAlign: 'center',
})

const ResultArea = styled('div')({
    display: 'flex',
    columnGap: '20px',
    marginTop: '20px',
    paddingTop: '10px',
})

const ProductsArea = styled('div')({
    width: '100%',
    paddingRight: '15px',
})

const ProductLoading = styled(Skeleton)({
    width: '100%',
    height: '333px',
    transform: 'unset',
})

const Error = styled('div')({
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.2em',
    color: 'red',
    width: '100%',
    textAlign: 'center',
})

const EmptyProductsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    rowGap: '15px',
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    border: '5px #dddddd solid',
    boxSizing: 'border-box',
    margin: '16px 15px',
})

const EmptyProductsText = styled('p')({
    margin: '0',
    fontFamily: '"Nunito", "sans-serif"',
    fontWeight: 'bold',
    fontSize: '1.2em',
})