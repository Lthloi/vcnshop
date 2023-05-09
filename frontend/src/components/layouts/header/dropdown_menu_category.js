import React from "react"
import { styled } from '@mui/material/styles'

const Clothing = 'https://i.pinimg.com/564x/0e/c5/59/0ec55917a6abc08f7c5cedc91fe997b8.jpg'
const Shoes = 'https://cdn.shopify.com/s/files/1/1124/8462/products/Andreas-Mens-Leather-Shoes-Brown--Model-JULKE_600x.jpg?v=1625743714'
const Accessories = 'https://i.pinimg.com/564x/1d/41/b9/1d41b9971da2bae667c25baafd14df03.jpg'

const dropdown_menu_categories = [
    {
        img: Clothing,
        title: 'CLOTHING',
        names: [
            'Jacket',
            'Sweater',
            'Hoodie',
            'Shorts',
            'Skirt',
            'Dress',
        ]
    }, {
        img: Shoes,
        title: 'SHOES',
        names: [
            'Nike',
            'Adidas',
            'Filla',
            'Sneakers',
        ]
    }, {
        img: Accessories,
        title: 'ACCESSORIES',
        names: [
            'Glass',
            'Necklace',
            'Ring',
            'Bag',
        ]
    }
]

const DropdownMenuCategory = () => {
    return (
        <DropDownMenuCategorySection id="DropDownMenuCategorySection">
            {dropdown_menu_categories.map(({ title, names, img }, index) => (
                <React.Fragment key={title}>
                    <CategoryContent id="CategoryContent">
                        <CategoryImgWrapper>
                            <CategoryImgModalBase className="CategoryImgModalBase">
                                {title}
                            </CategoryImgModalBase>
                            <CategoryImg src={img} />
                        </CategoryImgWrapper>
                        <CategoryTextArea id="CategoryTextArea">
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
                    </CategoryContent>

                    <VerticalLineSeperate />

                </React.Fragment>
            ))}
        </DropDownMenuCategorySection>
    )
}

export default DropdownMenuCategory

const DropDownMenuCategorySection = styled('div')({
    display: 'flex',
    background: 'black',
    padding: '10px',
    height: '300px',
    position: 'absolute',
    zIndex: '10',
    top: '100%',
    left: '50px',
    cursor: 'auto',
    border: '1px white solid',
})

const CategoryContent = styled('div')({
    display: 'flex',
    width: 'fit-content',
    height: '100%',
    flex: '1',
})

const CategoryImgWrapper = styled('div')({
    width: '17vw',
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
    width: 'calc(100% + 2px)',
    height: 'calc(100% + 2px)',
    cursor: 'pointer',
    color: 'white',
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

const VerticalLineSeperate = styled('div')({
    height: '100%',
    width: '1px',
    backgroundColor: 'white',
    margin: '0 10px',
    '&:last-child': {
        display: 'none',
    }
})