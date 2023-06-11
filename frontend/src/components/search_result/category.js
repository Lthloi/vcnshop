import React, { useRef } from "react"
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import Collapse from "@mui/material/Collapse"
import { Radio } from "@mui/material"
import RadioGroup from '@mui/material/RadioGroup'

const category_data = {
    clothing: ['Shirt', 'Pants',],
    accessories: ['Necklace', 'Ring',],
    shoes: ['Sneaker',],
    for: ['Male', 'Female', 'Unisex',],
}

const Category = ({ submitFilter, RenderFilterTitle, openCategoryCollapse }) => {
    const types = useRef(new Set())
    const forWho = useRef(null)

    const handleSubmit = (type, e) => {
        if (type) {
            if (e.target.checked) types.current.add(type)
            else types.current.delete(type)
        } else
            forWho.current = e.target.value
        
        submitFilter({
            type: Array.from(types.current),
            for: forWho.current,
        })
    }

    const RenderCategoryItemWithCheckBox = (type) => (
        <CatgoryItem key={type}>
            <Checkbox
                color="default"
                onChange={(e) => handleSubmit(type, e)}
                sx={{ padding: '0', color: 'black' }}
                id={'for' + type}
            />
            <label htmlFor={'for' + type} style={{ cursor: 'pointer' }}>
                {type}
            </label>
        </CatgoryItem>
    )

    const RenderCategoryItemWithRadio = (forWho) => (
        <CatgoryItem key={forWho}>
            <Radio
                color="default"
                onChange={(e) => handleSubmit(null, e)}
                sx={{ padding: '0', color: 'black' }}
                id={'for' + forWho}
                value={forWho}
            />
            <label htmlFor={'for' + forWho} style={{ cursor: 'pointer' }}>
                {forWho}
            </label>
        </CatgoryItem>
    )

    return (
        <CategoryFilter>
            {RenderFilterTitle('Category')}
            <CategoryCollapse in={openCategoryCollapse}>
                <CategoryItemTitle>Clothing</CategoryItemTitle>
                {category_data.clothing.map((text) => (
                    RenderCategoryItemWithCheckBox(text)
                ))}
                <CategoryItemTitle>Accessories</CategoryItemTitle>
                {category_data.accessories.map((text) => (
                    RenderCategoryItemWithCheckBox(text)
                ))}
                <CategoryItemTitle>Sneaker</CategoryItemTitle>
                {category_data.shoes.map((text) => (
                    RenderCategoryItemWithCheckBox(text)
                ))}
                <CategoryItemTitle>For</CategoryItemTitle>
                <RadioGroup name="forCategory">
                    {category_data.for.map((text) => (
                        RenderCategoryItemWithRadio(text)
                    ))}
                </RadioGroup>
            </CategoryCollapse>
        </CategoryFilter>
    )
}

export default Category

const CatgoryItem = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    fontFamily: '"Nunito","sans-serif"',
    paddingLeft: '5px',
    marginTop: '3px',
})

const CategoryFilter = styled('div')({

})

const CategoryCollapse = styled(Collapse)({
    padding: '0 15px',
    paddingLeft: '25px',
})

const CategoryItemTitle = styled('h2')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0',
    fontSize: '1em',
    fontFamily: '"Nunito","sans-serif"',
    marginTop: '3px',
})