import React from "react"
import Header from "./header/header"
import Footer from "./footer/footer"

const PageLayoutChildren = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default PageLayoutChildren