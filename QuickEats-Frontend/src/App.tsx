import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from './store/themStore'
import HomePage from './components/Homepage/HomePage'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import VerifyEmail from './components/auth/VerifyEmail'
import HomepageLayout from './components/Homepage/HomepageLayout'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage/SearchPage'
import RestaurantDetails from './components/RestaurantDetails/RestaurantDetails'
import Cart from './components/cart/Cart'
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes'
import AuthenticatedUser from './components/protectedRoutes/AuthenticatedUser'
import AdminRoute from './components/protectedRoutes/AdminRoute'
import Restaurant from './components/admin/Restaurant'
import AddMenu from './components/admin/AddMenu'
import Orders from './components/admin/Orders'
import Success from './components/Success'
import OrderStatus from './components/OrderStatus'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoutes><HomepageLayout/></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <HomePage/>
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
      {
        path: "/order/status",
        element: <OrderStatus />,
      },
      {
        path: "/success",
        element: <Success />,
      },

       // admin routes
      {
        path: "/admin/restaurant",
        element:<Restaurant/>,
      },
      {
        path: "/admin/menu",
        element:<AdminRoute><AddMenu /></AdminRoute>,
      },
      {
        path: "/admin/orders",
        element:<AdminRoute><Orders /></AdminRoute>,
      },
    ]
  },
  {
    path: '/login',
    element: <AuthenticatedUser><Login/></AuthenticatedUser>
  },
  {
    path: '/signup',
    element: <AuthenticatedUser><Signup/></AuthenticatedUser>
  },
  {
    path: '/forgot-password',
    element: <AuthenticatedUser><ForgotPassword/></AuthenticatedUser>
  },
  {
    path: '/reset-password/:resetCode',
    element: <ResetPassword/>
  },
  {
    path: '/verify-email',
    element: <VerifyEmail/>
  },

])
function App() {
  const initializeTheme = useThemeStore((state:any) => state.initializeTheme);
  useEffect(()=>{
    initializeTheme();
  },[])

  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  )
}

export default App
