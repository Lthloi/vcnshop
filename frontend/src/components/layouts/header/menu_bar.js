import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import CategoryIcon from '@mui/icons-material/Category'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import HomeIcon from '@mui/icons-material/Home'
import { NavLink } from "react-router-dom"

const category_dropdown = [
    {
        background: 'https://i.pinimg.com/564x/0e/c5/59/0ec55917a6abc08f7c5cedc91fe997b8.jpg',
        title: 'CLOTHING',
        names: [
            'Jacket',
            'Sweater',
            'Hoodie',
        ]
    }, {
        background: 'https://cdn.shopify.com/s/files/1/1124/8462/products/Andreas-Mens-Leather-Shoes-Brown--Model-JULKE_600x.jpg?v=1625743714',
        title: 'SHOES',
        names: [
            'Nike',
            'Adidas',
            'Sneakers',
        ]
    }, {
        background: 'https://i.pinimg.com/564x/1d/41/b9/1d41b9971da2bae667c25baafd14df03.jpg',
        title: 'ACCESSORIES',
        names: [
            'Glass',
            'Necklace',
        ]
    }
]

const non_dropdown_options = [
    {
        icon: <HomeIcon />,
        title: 'Home',
        action: '/#'
    }, {

        icon: <CategoryIcon />,
        title: 'Category',
        action: '/#',
        dropdown_list: category_dropdown
    }, {

        icon: <ConfirmationNumberIcon />,
        title: 'Coupon',
        action: '/#'
    }, {

        icon: <FavoriteBorderIcon />,
        title: 'My Wishlist',
        action: '/#'
    }, {

        icon: <ShoppingCartIcon />,
        title: 'Cart',
        action: '/cart'
    }, {

        icon: <LiveHelpIcon />,
        title: 'Help Center',
        action: '/#'
    },
]

const MenuBar = () => {
    const [categoryDropdown, setcategoryDropdown] = useState(null)

    return (
        <MenuBarArea id="MenuBarArea">
            {
                non_dropdown_options.map(({ title, icon, action, dropdown_list }) => (
                    <Option
                        key={title}
                        to={action}
                        className="drop_down_menu_wrapper"
                        onMouseOver={() => dropdown_list && setcategoryDropdown(dropdown_list)}
                        onMouseOut={() => dropdown_list && setcategoryDropdown(null)}
                    >
                        <IconOption>{icon}</IconOption>
                        <Title>{title}</Title>
                        {
                            dropdown_list &&
                            <ArrowForwardIosSharpIconWrapper>
                                <ArrowForwardIosSharpIcon sx={{ color: 'white', fontSize: '1em' }} />
                            </ArrowForwardIosSharpIconWrapper>
                        }
                    </Option>
                ))
            }
            {
                categoryDropdown &&
                <DropdownSectionWrapper>
                    <DropdownSection
                        id="DropdownSection"
                        onMouseOver={() => category_dropdown && setcategoryDropdown(category_dropdown)}
                        onMouseOut={() => setcategoryDropdown(null)}
                    >
                        {category_dropdown.map(({ title, names, background }) => (
                            <Category key={title}>
                                <CategoryImgWrapper>
                                    <CategoryImgModalBase className="CategoryImgModalBase">
                                        {title}
                                    </CategoryImgModalBase>
                                    <CategoryImg src={background} />
                                </CategoryImgWrapper>
                                <CategoryTextArea>
                                    <CategoryTitle>
                                        {title}
                                    </CategoryTitle>
                                    <CategoryNamesContainer>
                                        {
                                            names.map((items) => (
                                                <CategoryNames key={items}>
                                                    {items}
                                                </CategoryNames>
                                            ))
                                        }
                                    </CategoryNamesContainer>
                                </CategoryTextArea>
                            </Category>
                        ))}
                    </DropdownSection>
                </DropdownSectionWrapper>
            }
        </MenuBarArea>
    )
}

export default MenuBar

const MenuBarArea = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    border: `1px white solid`,
    borderLeft: 'none',
    borderRight: 'none',
    position: 'relative',
    width: '100%',
})

const Option = styled(NavLink)({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    height: '100%',
    padding: '10px 5px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    position: 'relative',
    textDecoration: 'unset',
    color: 'black',
    '&::after': {
        content: '""',
        height: '4px',
        backgroundColor: '#51fff6',
        width: '0',
        position: 'absolute',
        bottom: '0',
        left: '0',
        transition: 'width 0.2s',
    },
    '&:hover::after': {
        width: '100%',
    }
})

const IconOption = styled('div')({
    display: 'flex',
    alignContent: 'center',
    color: 'white',
    marginRight: '5px',
    '& svg': {
        fontSize: '1.3rem',
    }
})

const Title = styled('div')({
    fontFamily: '"Roboto", "sans-serif"',
    fontSize: '1.2rem',
    color: 'white',
})

const ArrowForwardIosSharpIconWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '10px',
    marginLeft: '12px',
    transform: 'rotate(90deg)',
})

const DropdownSectionWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: '10',
    top: '100%',
    left: '0',
    width: '100%',
    height: '0',
    overflowY: 'visible',
})

const DropdownSection = styled('div')({
    display: 'flex',
    backgroundColor: 'black',
    padding: '10px',
    height: '300px',
    border: '1px white solid',
})

const Category = styled('div')({
    display: 'flex',
    width: 'fit-content',
    height: '100%',
    flex: '1',
})

const CategoryImgWrapper = styled('div')({
    height: 'fit-content',
    position: 'relative',
    '&:hover .CategoryImgModalBase': {
        backgroundColor: '#00000078',
        fontSize: '1.3rem',
    }
})

const CategoryImgModalBase = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    height: '100%',
    color: 'white',
    cursor: 'pointer',
    fontFamily: '"Lato", sans-serif',
    fontSize: '0',
    transition: 'font-size 0.2s',
})

const CategoryImg = styled('img')({
    width: '100%',
    maxHeight: '300px',
})

const CategoryTextArea = styled('div')({
    height: '100%',
    marginLeft: '10px',
    padding: '10px',
})

const CategoryTitle = styled('h2')({
    display: 'block',
    color: 'white',
    fontFamily: '"Roboto", "sans-serif"',
    fontSize: '1.3rem',
    padding: '0 5px 5px 5px',
    margin: '0',
    textAlign: 'center',
    borderBottom: '2px white solid',
})

const CategoryNamesContainer = styled('div')({
    padding: '5px 10px',
    fontFamily: '"Roboto", "sans-serif"',
})

const CategoryNames = styled('div')({
    padding: '10px 5px',
    borderRadius: '5px',
    cursor: 'pointer',
    color: 'white',
    '&:hover': {
        backgroundColor: 'white',
        color: 'black',
    }
})