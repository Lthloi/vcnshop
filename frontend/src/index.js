import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import reportWebVitals from './reportWebVitals'
import './styles/body.scss'
import './styles/toastify.scss'
import { Provider } from 'react-redux'
import store from './store/store'
import ErrorBoundary from './utils/error_boundary'
import ErrorPage from './pages/error_page'
import { ThemeProvider } from '@mui/material/styles'
import global_theme from './styles/themes'

import './configs/i18n'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={global_theme}>
        <ErrorBoundary fallback={<ErrorPage />}>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
