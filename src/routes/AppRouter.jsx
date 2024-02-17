import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import LoginForm from "../layout/LoginForm"
import RegisterForm from "../layout/RegisterForm"
import useAuth from "../hooks/useAuth"
// import Header from "../layout/Header"
import Header from "../layout/HeaderWithDropdown"
import UserHome from "../layout/UserHome"
import ProductDetail from "../layout/ProductDetail"
import ProductLanding from "../layout/ProductLanding"
import AdminProduct from "../layout/AdminProduct"

const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
          <Header />
          <Outlet />
        </>,
        children: [
          { index: true, element: <UserHome /> },
          { path: '/login', element: <LoginForm /> },
          { path: '/register', element: <RegisterForm />},
          { path: '/product/:productId', element: <ProductDetail /> },
          { path: '/category/:categoryName', element: <ProductLanding /> },
        ]
      }
]);

const userRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
          <Header />
          <Outlet />
        </>,
        children : [
          { index: true, element: <UserHome /> },
          { path: true? '/login':'/', element: <UserHome /> },
          { path: '/product/:productId', element: <ProductDetail /> },
          { path: '/category/:categoryName', element: <ProductLanding /> },
        ]
      }
]);

const adminRouter = createBrowserRouter([
  {
      path: '/',
      element: <>
        <Header />
        <Outlet />
      </>,
      children : [
        { index: true, element: <UserHome /> },
        { path: true? '/login':'/', element: <UserHome /> },
        { path: '/product/:productId', element: <ProductDetail /> },
        { path: '/category/:categoryName', element: <ProductLanding /> },
        { path: '/myproduct', element: <AdminProduct /> },
      ]
    }
]);

export default function AppRouter() {
    const { user } = useAuth();
    const finalRouter = user?.id ? user?.role === 'ADMIN' ? adminRouter : userRouter : guestRouter

  return (
    <RouterProvider router={finalRouter} />
  )
}
