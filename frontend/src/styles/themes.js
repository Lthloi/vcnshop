import { createTheme } from '@mui/material/styles'

const global_theme = createTheme({
    fontFamily: {
        kanit: '"Kanit", "sans-serif"',
        nunito: '"Nunito", "sans-serif"',
        arial: '"Arial", "Helvetica", "sans-serif"',
        gillSans: '"Gill Sans", sans-serif',
    },
})

const auth_theme = createTheme({
    auth_background: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '40%',
        height: '100%',
        padding: '20px 40px 30px',
        boxSizing: 'border-box',
        backgroundColor: '#242424',
    },
})

export {
    auth_theme,
}

export default global_theme