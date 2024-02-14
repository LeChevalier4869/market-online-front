import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import LoginForm from "../layout/LoginForm"
import RegisterForm from "../layout/RegisterForm"
import useAuth from "../hooks/useAuth"
import Header from "../layout/Header"
import UserHome from "../layout/UserHome"

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
          { path: '/register', element: <RegisterForm />}
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
        ]
      }
]);

export default function AppRouter() {
    const { user } = useAuth();
    const finalRouter = user?.id ? userRouter : guestRouter

  return (
    <RouterProvider router={finalRouter} />
  )
}
