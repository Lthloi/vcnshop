import { ToastContainer } from 'react-toastify'
import Home from './pages/home'
import { Route, Routes } from "react-router-dom"
import NotFound404 from './pages/not_found_404'
import Cart from './pages/cart'
import PageLayout from './components/layouts/page_layout.js'
import Product from './pages/product'
import SearchResult from './pages/search_result'
import Auth from './pages/auth'
import Account from './pages/account'
import { BrowserRouter } from "react-router-dom"
import ProtectedRoute from './utils/protected_route'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from './store/actions/user_actions'
import Checkout from './pages/checkout'
import { ThemeProvider } from '@mui/material/styles'
import global_theme from './styles/theme'
import Admin from './pages/admin'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <div id="VCN-Shop-React-App">
      <ThemeProvider theme={global_theme}>
        <BrowserRouter>
          <Routes>

            {/*Put routes is not protected with outlet layout*/}
            <Route path='/' element={<PageLayout />}>
              <Route index element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/productDetail/:productId' element={<Product />} />
              <Route path='/search/:keyword' element={<SearchResult />} />
              <Route path='/account/*' element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path='/admin/*' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            </Route>

            {/*Put other routes with no layout*/}
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/auth/*' element={<Auth />} />

            <Route path='/*' element={<NotFound404 />} />

          </Routes>
        </BrowserRouter>
      </ThemeProvider>

      <ToastContainer limit={3} autoClose={2000} pauseOnHover={true} draggable={false} />
    </div>
  )
}

export default App
