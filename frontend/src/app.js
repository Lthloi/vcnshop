import { ToastContainer } from 'react-toastify'
import Home from './pages/home'
import { Route, Routes } from "react-router-dom"
import NotFound404 from './pages/not_found_404'
import Cart from './pages/cart'
import PageLayoutOutlet from './components/layouts/page_layout_outlet.js'
import Product from './pages/product'
import SearchResult from './pages/search_result'
import PageLayoutChildren from './components/layouts/page_layout_children.js'
import Auth from './pages/auth'
import Account from './pages/account'
import { BrowserRouter } from "react-router-dom"
import ProtectedRoute from './utils/protected_route'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from './store/actions/user_actions'
import Checkout from './pages/checkout'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <div id="VCN-Shop-React-App">
      <BrowserRouter>
        <Routes>

          {/*Put routes is not protected*/}
          <Route path='/' element={<PageLayoutOutlet />}>
            <Route index element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/productDetail/:productId' element={<Product />} />
            <Route path='/search/:keyword' element={<SearchResult />} />
          </Route>


          {/*Put routes want to be protected*/}
          <Route path='/' element={<ProtectedRoute />}>
            <Route
              path='/account/*'
              element={
                <PageLayoutChildren>
                  <Account />
                </PageLayoutChildren>
              }
            />
          </Route>


          {/*Put other routes*/}
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/auth/*' element={<Auth />} />

          <Route path='*' element={<NotFound404 />} />

        </Routes>
      </BrowserRouter>

      <ToastContainer limit={3} autoClose={2000} pauseOnHover={true} draggable={false} />
    </div>
  )
}

export default App
