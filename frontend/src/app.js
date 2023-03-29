import { ToastContainer } from 'react-toastify'
import Home from './pages/home'
import { Route, Routes } from "react-router-dom"
import NotFound404 from './pages/not_found_404'
import Cart from './pages/cart'
import PageLayout from './components/layouts/page_layout'
import Product from './pages/product'
import SearchResult from './pages/search_result'
import LoadingApp from './components/loading_app'
import Auth from './pages/auth'
import LoginSection from './components/auth/login'
import RegisterSection from './components/auth/sign_up/register'
import ForgotPasswordSection from './components/auth/forgot_password'
import NewPasswordSection from './components/auth/new_password'
import ProvideInfoSection from './components/auth/provide_info/provide_info'

function App() {
  return (
    <div id="React-App">
      <Routes>

        <Route path='/' element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/productDetail/:productId' element={<Product />} />
          <Route path='/search/:keyword' element={<SearchResult />} />
        </Route>

        <Route path='/auth' element={<Auth />}>
          <Route index element={<LoginSection />} />
          <Route path='/auth/login' element={<LoginSection />} />
          <Route path='/auth/register' element={<RegisterSection />} />
          <Route path='/auth/forgotPassword' element={<ForgotPasswordSection />} />
          <Route path='/auth/newPassword' element={<NewPasswordSection />} />
          <Route path='/auth/provideInfo' element={<ProvideInfoSection />} />
        </Route>

        <Route path='*' element={<NotFound404 />} />

      </Routes>

      <ToastContainer limit={3} autoClose={2000} pauseOnHover={true} draggable={false} />
      <LoadingApp />
    </div>
  )
}

export default App
