import React, { useState } from "react"
import { styled } from '@mui/material/styles'

const titles = ['Shirt', 'Pants', 'Shoes']

const CategoryStallBar = () => {
    const [title, setTitle] = useState('Clothes')

    return (
        <CategoryStallArea id="CategoryStallArea">
            <CategoryContainer>
                <Title>
                    {'Most Sold ' + title}
                </Title>
                <TitleOptionsContainer>
                    {
                        titles.map((items) => (
                            <Options onClick={() => setTitle(items)} key={items}>
                                {items}
                            </Options>
                        ))
                    }
                </TitleOptionsContainer>
            </CategoryContainer>
        </CategoryStallArea>
    )
}

export default CategoryStallBar

const CategoryStallArea = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    backgroundColor: 'pink',
})

const CategoryContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px 50px 10px 60px',
})

const Title = styled('h2')({
    fontFamily: '"Russo One", "sans-serif"',
    fontWeight: 'normal',
    fontSize: '2rem',
    margin: '0',
})

const TitleOptionsContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
})

const Options = styled('div')({
    border: '1.5px #b74040 solid',
    borderRadius: '5px',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    margin: '0 5px',
    padding: '3px 8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: '#f79cac',
    }
})