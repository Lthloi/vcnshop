import React, { useEffect, useState } from "react"
import Badge from '@mui/material/Badge'
import { styled } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import foxLogo from '../../../../assets/images/logo_app.svg'
import SearchIcon from '@mui/icons-material/Search'
import MenuBar from "./menu_bar"
import SearchDialog from "./search_dialog"
import { useSelector } from "react-redux"

const Navigation = () => {
    const { cartItems } = useSelector(({ cart }) => cart)
    const [openSearchDialog, setOpenSearchDialog] = useState(false)

    useEffect(() => {
        if (openSearchDialog) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [openSearchDialog])

    const handleOpenSearchDialog = open => {
        setOpenSearchDialog(open)
    }

    return (

        <NavigationArea>

            {
                openSearchDialog &&
                <SearchDialog
                    handleOpenSearchDialog={handleOpenSearchDialog}
                />
            }

            <NavigationBar id="NavigationBar" >
                <LeftArea className="LeftArea" >
                    <Language> EN </Language>
                    <SearchContainer
                        id="SearchContainerNavigation"
                        onClick={() => handleOpenSearchDialog(true)}
                    >
                        <SearchIcon />
                        <SearchText> Enter Brands, Names... </SearchText>
                    </SearchContainer>
                </LeftArea>

                <CenterArea className="CenterArea" href="/">
                    <Logo src={foxLogo} alt="Can't load logo" />
                    <TitleArea>
                        <Title>
                            <span>VCN SHOP -</span>
                            <span> FOX COR</span>
                        </Title>
                        <Subtitle> Kingdom of fashion </Subtitle>
                    </TitleArea>
                </CenterArea>

                <RightArea className="RightArea" >
                    <AuthBtn href="/auth/login">
                        Sign In
                    </AuthBtn>
                    <AuthBtn href="/auth/register">
                        Sign Up
                    </AuthBtn>
                    <a href="/cart">
                        <StyledBadge
                            badgeContent={cartItems.length}
                            color="secondary" showZero
                        >
                            <StyledShoppingCartIcon titleAccess="Cart" />
                        </StyledBadge>
                    </a>
                </RightArea>
            </NavigationBar>

            <MenuBar />

        </NavigationArea>
    )
}

export default Navigation

const text_style = {
    color: 'white',
    fontFamily: 'nunito',
    fontSize: '1em',
    fontWeight: 'bold',
    textDecoration: 'unset',
}

const NavigationArea = styled('div')({
    width: '100%'
})

const NavigationBar = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 20px',
    backgroundColor: 'black',
})

const LeftArea = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
    minHeight: '100%',
    width: '19.7%',
    justifyContent: 'space-between',
})

const Language = styled('div')({
    ...text_style,
    cursor: 'pointer',
    '&:hover': {
        color: 'pink',
    },
})

const SearchContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    padding: '5px 8px',
    columnGap: '10px',
    cursor: 'pointer',
    border: '2px black solid',
    borderRadius: '5px',
    overflow: 'hidden',
    backgroundColor: 'white',
    '&:hover': {
        outline: '3px pink solid',
    }
})

const SearchText = styled('div')({
    fontSize: '0.9em',
    color: 'rgba(0,0,0,0.8)',
    fontFamily: '"Roboto", "sans-serif"',
})

const CenterArea = styled('a')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '5px',
    textDecoration: 'unset',
    color: 'black',
})

const TitleArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})

const Title = styled('div')({
    ...text_style,
    lineHeight: '1em',
    fontSize: '1.3em',
    fontWeight: 'bold',
    wordSpacing: '5px',
    cursor: 'pointer',
    '& span': {
        fontFamily: '"Kalam", "cursive"',
        wordSpacing: '0px',
    }
})

const Subtitle = styled('div')({
    ...text_style,
    wordSpacing: '3px',
    letterSpacing: '1px',
    cursor: 'pointer',
})

const Logo = styled('img')({
    height: '5em',
    cursor: 'pointer',
})

const RightArea = styled(LeftArea)({
    paddingLeft: '55px',
    boxSizing: 'border-box',
})

const AuthBtn = styled('a')({
    ...text_style,
    cursor: 'pointer',
    textDecoration: 'unset',
    '&:hover': {
        color: '#d28dff',
    },
})

const StyledBadge = styled(Badge)({
    marginRight: '10px',
    cursor: 'pointer',
    '& svg': {
        transition: 'transform 0.2s',
    },
    '&:hover svg': {
        transform: 'scale(1.2)',
    },
})

const StyledShoppingCartIcon = styled(ShoppingCartIcon)({
    fill: 'white',
})