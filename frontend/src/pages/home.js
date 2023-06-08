import React, { useRef } from "react"
import TopWeek from "../components/home/top_week/top_week"
import BestSelling from "../components/home/best_selling/best_selling"
import NewsLetter from "../components/home/new_letter"
import SalesAndCoupons from "../components/home/sales_coupons"
import ScrollToTopBtn from "../components/scroll_top_top_btn"
import Introduce from "../components/home/introduce"

const Home = () => {
    const scrollRef = useRef()
    return (
        <div id="Home" style={{ width: '100%' }}>
            <Introduce scrollRef={scrollRef} />
            <SalesAndCoupons />
            <TopWeek ref={scrollRef} />
            <BestSelling />
            <NewsLetter />

            <ScrollToTopBtn />
        </div>
    )
}

export default Home