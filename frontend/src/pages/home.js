import React, { useRef } from "react"
import { styled } from '@mui/material/styles'
import TopWeek from "../components/home/top_week/top_week"
import BestSelling from "../components/home/best_selling/best_selling"
import NewsLetter from "../components/home/new_letter"
import SalesAndCoupons from "../components/home/sales_coupons"
import ScrollToTopBtn from "../components/scroll_top_top_btn"
import Introduce from "../components/home/introduce"

const Home = () => {
    const scrollRef = useRef()
    return (
        <HomePage id="Home">
            <Introduce scrollRef={scrollRef} />
            <SalesAndCoupons />
            <TopWeek ref={scrollRef} />
            <BestSelling />
            <NewsLetter />

            <ScrollToTopBtn />
        </HomePage>
    )
}

export default Home

const HomePage = styled('div')({
    width: '100%',
})