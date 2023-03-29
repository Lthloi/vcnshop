import React from "react"
import Header from "./header/header"
import Footer from "./footer/footer"
import { Outlet } from "react-router-dom"

const PageLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default PageLayout