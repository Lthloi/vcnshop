import React, { forwardRef, useEffect, useMemo, useState } from "react"
import { styled } from "@mui/material"
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown'
import Pagination from '@mui/material/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getTopWeek } from "../../../store/actions/product_actions"
import TopWeekProduct from "./top_week_product"
import CircularProgress from "@mui/material/CircularProgress"
import LoadingApp from "../../loading_app"

const TopWeek = forwardRef((props, scrollRef) => {
    const { products, error, loading } = useSelector(({ product }) => product.topWeek)
    const { loading: addToCartLoading } = useSelector(({ cart }) => cart)
    const dispatch = useDispatch()
    const [translateX, setTranslateX] = useState(0)

    useEffect(() => {
        dispatch(getTopWeek(9))
    }, [dispatch])

    const top_week_products = useMemo(() => {
        if (products.length > 0) {
            let top_week_products_temp = []
            for (let i = 0; i < 3; i++) //divide product into three array for set frontend top week
                top_week_products_temp.push(products.slice(i * 3, i * 3 + 3))

            return top_week_products_temp
        }
        return []
    }, [products])

    const clickArrow = (direction) => {
        if (direction === 'left') {
            setTranslateX(translateX < 1 ? 2 : translateX > 1 ? 1 : 0)
        } else {
            setTranslateX(translateX > 1 ? 0 : translateX < 1 ? 1 : 2)
        }
    }

    const paginate = (e, page) => {
        setTranslateX(page - 1)
    }

    return (
        <TopWeekSection>
            {addToCartLoading && <LoadingApp />}

            <TopWeekTitleContainer id="TopWeekTitleContainer" ref={scrollRef}>
                <TopWeekTitle>TOP WEEK</TopWeekTitle>
                <StackWrapper>
                    <StyledPagination
                        count={top_week_products.length > 0 ? top_week_products.length : 0}
                        variant="outlined"
                        page={translateX + 1}
                        onChange={paginate}
                        color="primary"
                    />
                </StackWrapper>
            </TopWeekTitleContainer>

            <SliderArea id="SliderArea">
                <ArrowIconWrapper className="arrow_icon_hover left">
                    <StyledExpandCircleDownIcon
                        className="left"
                        onClick={() => clickArrow('left')}
                    />
                </ArrowIconWrapper>
                <ArrowIconWrapper className="arrow_icon_hover right">
                    <StyledExpandCircleDownIcon
                        className="right"
                        onClick={() => clickArrow('right')}
                    />
                </ArrowIconWrapper>
                {
                    loading ? (
                        <Loading>
                            <CircularProgress
                                thickness={6}
                                size={40}
                                sx={{ margin: 'auto', color: 'black' }}
                            />
                        </Loading>
                    ) : error ? (
                        <Error>
                            {error.message}
                        </Error>
                    ) : top_week_products.length > 0 &&
                    top_week_products.map((items, index) => (
                        <SlidesContainer
                            key={index}
                            className="SlidesContainer"
                            translateX={translateX}
                        >
                            {
                                items.map((product_item) => (
                                    <React.Fragment key={product_item._id}>
                                        <TopWeekProduct product={product_item} />
                                    </React.Fragment>
                                ))
                            }
                        </SlidesContainer>
                    ))
                }
            </SliderArea>
        </TopWeekSection>
    )
})

export default TopWeek

const TopWeekSection = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
})

const TopWeekTitleContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
    position: 'relative',
    backgroundColor: 'black',
    borderRadius: '10px',
    width: '97.5%',
})

const TopWeekTitle = styled('h2')({
    fontSize: '2.3rem',
    fontWeight: 'bold',
    fontFamily: '"Russo One", "sans-serif"',
    padding: '5px 15px',
    borderRadius: '15px',
    backgroundColor: 'white',
    margin: '0',
})

const StackWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: '10px',
    height: '100%',
})

const StyledPagination = styled(Pagination)({
    '& button.MuiPaginationItem-root': {
        color: 'black',
        border: '1.5px black solid',
        backgroundColor: 'white',
        '&.Mui-selected': {
            border: '2px white solid',
            backgroundColor: 'black',
            color: 'white',
        }
    }
})

const SliderArea = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '90vh',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '3px',
    '&:hover .arrow_icon_hover': {
        opacity: '1',
    },
})

const ArrowIconWrapper = styled('div')({
    height: 'fit-content',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    opacity: '0.2',
    transition: 'opacity 0.4s',
    zIndex: '10',
    '&.right': {
        right: '0',
    },
})

const StyledExpandCircleDownIcon = styled(ExpandCircleDownIcon)({
    width: 'auto',
    height: '55px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
    '&.left': {
        marginLeft: '15px',
        transform: 'rotate(90deg)',
        '&:hover': {
            transform: 'rotate(90deg) scale(1.2)',
        }
    },
    '&.right': {
        marginRight: '15px',
        transform: 'rotate(270deg)',
        '&:hover': {
            transform: 'rotate(270deg) scale(1.2)',
        }
    },
})

const SlidesContainer = styled('div')(({ theme, translateX }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    minWidth: '100%',
    height: '100%',
    transform: `translateX(${translateX * -100}%)`,
    transition: 'transform 0.7s',
}))

const Loading = styled('div')({
    display: 'flex',
    width: '100%',
    height: '100%',
})

const Error = styled('div')({
    fontWeight: 'bold',
    fontFamily: '"Nunito", "sans-serif"',
    fontSize: '1.2em',
    color: 'red',
    margin: 'auto',
})