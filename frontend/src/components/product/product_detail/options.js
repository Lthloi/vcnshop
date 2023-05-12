import React, { useState } from "react"
import { styled } from '@mui/material/styles'
import StraightenIcon from '@mui/icons-material/Straighten'

const nunito_font = {
    fontFamily: '"Nunito", "sans-serif"',
}

const Options = ({ colors, sizes, choicesSetting }) => {
    const colors_list = colors || []
    const [colorPicked, setColorPicked] = useState()

    const changeColorOption = (color) => {
        setColorPicked(color)
        choicesSetting('color', color)
    }

    const changeSizeOption = (e) => {
        let size_name = e.target.value
        if (size_name === 'none') {
            e.target.value = ''
            choicesSetting('size', undefined)
        } else {
            e.target.value = size_name
            choicesSetting('size', size_name)
        }
    }

    return (
        <OptionsArea id="Options">
            <ColorsContainer>
                <DetailTitles>Color:</DetailTitles>
                <ColorsList>
                    {colors_list.length > 5 ?
                        <ColorsOptions onClick={changeColorOption}>
                            <option value="none">
                                Please choose one!
                            </option>
                            {colors_list.map((color) => (
                                <option
                                    value={color}
                                    key={color}
                                >
                                    {color}
                                </option>
                            ))}
                        </ColorsOptions>
                        :
                        colors_list.length > 0 &&
                        colors_list.map((color) => (
                            <Color
                                key={color}
                                title={color}
                                onClick={() => changeColorOption(color)}
                                className={color === colorPicked ? 'active' : ''}
                            >
                                {color}
                            </Color>
                        ))}
                </ColorsList>
            </ColorsContainer>
            <SizesContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <DetailTitles>Size:</DetailTitles>
                    <FindYourSizeContainer>
                        <StraightenIcon />
                        <FindYourSize>
                            Find your size exactly.
                        </FindYourSize>
                    </FindYourSizeContainer>
                </div>
                <SizesOptions onClick={changeSizeOption}>
                    <option value="none">
                        Please choose one!
                    </option>
                    {sizes.map((size) => (
                        <option
                            value={size}
                            key={size}
                        >
                            {size}
                        </option>
                    ))}
                </SizesOptions>
            </SizesContainer>
        </OptionsArea>
    )
}

export default Options

const OptionsArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '12px',
})

const ColorsContainer = styled('div')({

})

const DetailTitles = styled('h2')({
    ...nunito_font,
    fontSize: '1.1em',
    margin: '0',
    fontWeight: 'bold',
})

const ColorsList = styled('div')({
    display: 'flex',
    columnGap: '10px',
    marginTop: '5px',
})

const ColorsOptions = styled('select')({
    marginTop: '5px',
    padding: '5px',
    fontSize: '1em',
    border: '2px gray solid',
    width: '100%',
})

const Color = styled('button')({
    border: '1.5px black solid',
    backgroundColor: 'white',
    padding: '5px 15px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.2s',
    boxSizing: 'border-box',
    '&.active': {
        backgroundColor: 'black',
        color: 'white',
    },
    '&:hover': {
        outline: '3px pink solid',
        borderColor: 'pink',
    }
})

const SizesContainer = styled('div')({

})

const FindYourSizeContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    width: 'fit-content',
})

const FindYourSize = styled('div')({
    ...nunito_font,
    fontSize: '0.9em',
    color: 'red',
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    }
})

const SizesOptions = styled(ColorsOptions)({

})