import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const NotFound = Loadable(lazy(() => import('./NotFound')))
const Home = Loadable(lazy(() => import('./Home')))
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')))
const JwtLogin = Loadable(lazy(() => import('./login/JwtLogin')))
const Tech_Login = Loadable(lazy(() => import('./login/Tech_Login')))
const FN_MBBS_Login = Loadable(lazy(() => import('./login/FN_MBBS_Login')))
const EMP_Login = Loadable(lazy(() => import('./login/EMP_Login')))
const Vendor_Login = Loadable(lazy(() => import('./login/Vendor_Login')))
const Tech_Register = Loadable(lazy(() => import('./register/Tech_Register')))
const JwtRegister = Loadable(lazy(() => import('./register/JwtRegister')))
const FN_MBBS_Register = Loadable(
    lazy(() => import('./register/FN_MBBS_Register'))
)
const EMP_Register = Loadable(lazy(() => import('./register/EMP_Register')))
const Vendor_Register = Loadable(
    lazy(() => import('./register/Vendor_Register'))
)

const sessionRoutes = [
    {
        path: '/session/Home',
        element: <Home />,
    },
    {
        path: '/session/signup',
        element: <JwtRegister />,
    },
    {
        path: '/session/tech-signup',
        element: <Tech_Register />,
    },
    {
        path: '/session/FN_MBBS_Register',
        element: <FN_MBBS_Register />,
    },
    {
        path: '/session/emp_signup',
        element: <EMP_Register />,
    },
    {
        path: '/session/vendor_signup',
        element: <Vendor_Register />,
    },
    {
        path: '/session/signin',
        element: <JwtLogin />,
    },
    {
        path: '/session/tech-signin',
        element: <Tech_Login />,
    },
    {
        path: '/session/fnmbbs_signin',
        element: <FN_MBBS_Login />,
    },
    {
        path: '/session/emp_signin',
        element: <EMP_Login />,
    },
    {
        path: '/session/vendor_signin',
        element: <Vendor_Login />,
    },
    {
        path: '/session/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/session/404',
        element: <NotFound />,
    },
]

export default sessionRoutes
