import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import VerifyEmail from './components/auth/VerifyEmail'
import HomepageLayout from './components/Homepage/HomepageLayout'
import HeroSection from './components/Homepage/HeroSection'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage/SearchPage'
import RestaurantDetails from './RestaurantDetails/RestaurantDetails'
import Cart from './components/cart/Cart'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomepageLayout/>,
    children: [
      {
        path: '/',
        element: <HeroSection/>
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/search/:text',
        element: <SearchPage/>
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantDetails/>
      },
      {
        path: '/cart',
        element: <Cart/>
      },
    //   {
    //     path: '/orders',
    //     element: <Orders/>
    //   },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword/>
  },
  {
    path: '/reset-password',
    element: <ResetPassword/>
  },
  {
    path: '/verify-email',
    element: <VerifyEmail/>
  }

])
function App() {
  return (
    <>
      <RouterProvider router={appRouter}>

      </RouterProvider>
    </>
  )
}

export default App
