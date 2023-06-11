import React, { useEffect, useRef, useState } from "react"
import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import debounce from '../../../utils/debounce'
import { toast } from 'react-toastify'
import { EXPRESS_SERVER } from '../../../utils/constants'
import axios from 'axios'

const SearchDialog = ({ handleOpenSearchDialog }) => {
    const [suggestions, setSuggestions] = useState([].includes('oke'))
    const search_input_ref = useRef()
    const data_ref = useRef()

    const getSuggestions = async () => {
        try {
            let response = await axios.get(EXPRESS_SERVER + '/api/product/getProductsName')
            data_ref.current = response.data.list
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getSuggestions()
    }, [])

    const searching = (e) => {
        let keywrod = e.target.value.toLowerCase()
        if (keywrod === '') return setSuggestions([])
        let result_list = []
        let match = true
        let lower_case
        for (let product_name of data_ref.current) {
            lower_case = product_name.toLowerCase()
            match = true
            for (let i = 0; i < keywrod.length; i++)
                if (keywrod[i] !== lower_case[i] && i < keywrod.length)
                    match = false
            if (match) result_list.push(product_name)
            if (result_list.length === 10) break
        }
        setSuggestions(result_list)
    }

    const catchEnterKeyboard = (e) => e.key === 'Enter' && submitSearch()

    const submitSearch = () => {
        let keyword = search_input_ref.current.value
        if (keyword === '')
            return toast.warning('Please enter the product name you want to search')

        window.open('/search/' + keyword, '_self')
    }

    return (
        <>
            <SearchDialogModalBase onClick={() => handleOpenSearchDialog(false)} />
            <SearchDialogArea>
                <SearchDialogTitle htmlFor="SearchDialogInput">
                    Search for brand and product name...
                </SearchDialogTitle>
                <SearchDialogContainer>
                    <SearchDialogInput
                        ref={search_input_ref}
                        id="SearchDialogInput"
                        type="text"
                        placeholder="Find Products By Name..."
                        onChange={debounce((e) => searching(e), 300)}
                        onKeyDown={catchEnterKeyboard}
                        maxLength={80}
                    />
                    <SearchIconWrapper onClick={submitSearch}>
                        <StyledSearchIcon />
                    </SearchIconWrapper>
                    <CloseSearchDialogIcon onClick={() => handleOpenSearchDialog(false)} />
                </SearchDialogContainer>

                {
                    suggestions && suggestions.length > 0 &&
                    <SuggestionsContainer>
                        {
                            suggestions.map((suggestion) => (
                                <Suggestion
                                    href={'/search/' + suggestion}
                                    key={suggestion}
                                >
                                    <span>{suggestion}</span>
                                    <HoverAnimation>
                                        <SuggestionIcon className="SuggestionIcon" />
                                    </HoverAnimation>
                                </Suggestion>
                            ))
                        }
                    </SuggestionsContainer>
                }
            </SearchDialogArea>
        </>
    )
}

export default SearchDialog

const SearchDialogModalBase = styled('div')({
    backgroundColor: 'rgba(0,0,0,0.8)',
    position: 'fixed',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    zIndex: '100',
})

const SearchDialogArea = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    justifyContent: 'center',
    width: '100%',
    position: 'fixed',
    zIndex: '101',
    top: '50px',
    padding: '0 100px',
    paddingRight: '150px',
    boxSizing: 'border-box',
})

const SearchDialogTitle = styled('label')({
    margin: '0',
    padding: '0',
    paddingLeft: '10px',
    color: 'white',
    fontSize: '1.5em',
    fontWeight: 'normal',
    fontFamily: '"Roboto", "sans-serif"',
    width: 'fit-content',
})

const SearchDialogContainer = styled('div')({
    display: 'flex',
    width: '100%',
    height: '45px',
    position: 'relative',
})

const SearchDialogInput = styled('input')({
    fontFamily: '"Nunito", "sans-serif"',
    outline: 'unset',
    width: '100%',
    height: '100%',
    padding: '5px 15px',
    border: '1.5px black solid',
    boxSizing: 'border-box',
    fontSize: '1.1em',
})

const SearchIconWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    boxSizing: 'border-box',
    border: '1.5px black solid',
    borderLeft: 'unset',
    padding: '10px 15px',
    cursor: 'pointer',
    backgroundColor: 'pink',
    '&:hover svg.MuiSvgIcon-root': {
        transform: 'rotateY(0deg)',
    }
})

const StyledSearchIcon = styled(SearchIcon)({
    transform: 'rotateY(180deg)',
    transition: 'transform 0.5s',
})

const CloseSearchDialogIcon = styled(CancelIcon)({
    width: '1.8em',
    height: '1.8em',
    color: 'white',
    position: 'absolute',
    top: '-50px',
    left: '102%',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.2)',
    }
})

const SuggestionsContainer = styled('div')({
    border: '1px white solid',
    width: '99.5%',
    boxSizing: 'border-box',
    margin: '0 auto',
    backgroundColor: 'white',
})

const Suggestion = styled('a')({
    display: 'block',
    textDecoration: 'unset',
    color: 'black',
    fontFamily: '"Nunito", "sans-serif"',
    padding: '8px 20px',
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
        backgroundColor: '#e5e5e5',
        fontWeight: 'bold',
        '& svg.SuggestionIcon': {
            opacity: '1',
        }
    },
})

const HoverAnimation = styled('div')({
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    right: '0',
    height: '100%',
})

const SuggestionIcon = styled(SearchIcon)({
    opacity: '0',
    marginRight: '10px',
    fontSize: '1.3em',
})