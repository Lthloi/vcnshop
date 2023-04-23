import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import CategoryIcon from '@mui/icons-material/Category'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import DropdownMenuCategory from "./dropdown_menu_category"
import HomeIcon from '@mui/icons-material/Home'

const non_dropdown_options = [
    { icon: <ConfirmationNumberIcon />, title: 'Coupon', action: '/#' },
    { icon: <FavoriteBorderIcon />, title: 'My Wishlist', action: '/#' },
    { icon: <ShoppingCartIcon />, title: 'Cart', action: '/cart' },
    { icon: <LiveHelpIcon />, title: 'Help Center', action: '/#' },
]

const MenuBar = () => {
    const [showDropdownMenu, setShowDropdownMenu] = useState(false)
    return (
        <MenuBarArea id="MenuBarArea">
            <HomeOption href="/">
                <IconOption>
                    <HomeIcon />
                </IconOption>
                <Title>
                    Home
                </Title>
            </HomeOption>
            <DropdownOption
                className="drop_down_menu_wrapper"
                onMouseOver={() => setShowDropdownMenu(true)}
                onMouseOut={() => setShowDropdownMenu(false)}
            >
                <DropdownOptionContent>
                    <IconOption>
                        <CategoryIcon />
                    </IconOption>
                    <Title>
                        Category
                    </Title>
                    <ArrowForwardIosSharpIconWrapper>
                        <StyledArrowForwardIosSharpIcon />
                    </ArrowForwardIosSharpIconWrapper>
                    {
                        showDropdownMenu &&
                        <DropdownMenuCategory />
                    }
                </DropdownOptionContent>
                <HoverAnimationBar className="HoverAnimationBar" />
            </DropdownOption>
            {
                non_dropdown_options.map(({ title, icon, action }) => (
                    <Option key={title} href={action}>
                        <IconOption>
                            {icon}
                        </IconOption>
                        <Title>
                            {title}
                        </Title>
                    </Option>
                ))
            }
        </MenuBarArea>
    )
}

export default MenuBar

const MenuBarArea = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '40px',
    background: 'black',
    borderTop: `1px white solid`,
    borderBottom: `1px white solid`,
    width: '100%',
    position: 'relative',
    zIndex: '9',
})

const Option = styled('a')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '0 3px',
    cursor: 'pointer',
    position: 'relative',
    textDecoration: 'unset',
    color: 'black',
    '&::after': {
        content: '""',
        height: '4px',
        backgroundColor: 'pink',
        width: '0',
        position: 'absolute',
        bottom: '0',
        transition: 'width 0.2s',
    },
    '&:hover::after': {
        width: '100%',
    }
})

const HomeOption = styled(Option)({})

const DropdownOption = styled('div')({
    display: 'block',
    position: 'static',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '0 3px',
    cursor: 'pointer',
    '&:hover ::after': {
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

const DropdownOptionContent = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
})

const HoverAnimationBar = styled('div')({
    width: '100%',
    background: 'grey',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    '&::after': {
        content: '""',
        height: '4px',
        backgroundColor: 'pink',
        width: '0',
        position: 'absolute',
        bottom: '0',
        transition: 'width 0.2s',
    },
})

const StyledArrowForwardIosSharpIcon = styled(ArrowForwardIosSharpIcon)({
    color: 'white',
    fontSize: '1rem',
})