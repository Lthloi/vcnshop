import React, { useRef } from "react"
import { styled } from '@mui/material/styles'
import TopWeek from "../components/home/top_week/top_week"
import BestSelling from "../components/home/best_selling/best_selling"
import NewsLetter from "../components/home/new_letter"
import SalesAndCoupons from "../components/home/sales_coupons"
import ScrollToTopBtn from "../components/scroll_top_top_btn"
import Introduce from "../components/home/introduce"
import HelpChat from "../components/help_chat"

const Home = () => {
    const scrollRef = useRef()
    return (
        <HomeComponents id="Home">
            <Introduce scrollRef={scrollRef} />
            <SalesAndCoupons />
            <TopWeek ref={scrollRef} />
            <BestSelling />
            <NewsLetter />

            <ScrollToTopBtn />
            <HelpChat />
        </HomeComponents>
    )
}

export default Home

const HomeComponents = styled('div')({
    width: '100%',
})