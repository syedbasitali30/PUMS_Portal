import useAuth from 'app/hooks/useAuth'
import { authLogin } from 'app/redux/action'
import { flat } from 'app/utils/utils'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { AllPages } from '../routes/routes'

const getUserRoleAuthStatus = (pathname, user, routes) => {
    if (!user) {
        return false
    }
    const matched = routes.find((r) => r.path === pathname)

    const authenticated =
        matched && matched.auth && matched.auth.length
            ? matched.auth.includes(user.role)
            : true
    console.log(matched, user)
    return authenticated
}

const AuthGuard = ({ children }) => {
    const userData = useSelector((data) => data.loginReducer.LoginData)
    //
    const { isAuthenticated, user } = useAuth()

    // return <>{isAuthenticated ? children : <Navigate to="/session/signin" />}</>

    const [previouseRoute, setPreviousRoute] = useState(null)
    const { pathname } = useLocation()
    const routes = flat(AllPages())

    // console.log(user, 'user')

    const isUserRoleAuthenticated = getUserRoleAuthStatus(
        pathname,
        user,
        routes
    )
    let authenticated = isAuthenticated && isUserRoleAuthenticated

    // IF YOU NEED ROLE BASED AUTHENTICATION,
    // UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
    // AND COMMENT OUT BELOW LINE

    // let authenticated = isAuthenticated

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    const dispatchAuth = useDispatch()

    if (authenticated) return <>{children}</>
    else {
        const loginType = window.localStorage.getItem('loginType')
        //
        if (loginType === 'Employee') {
            return (
                <Navigate
                    to={'/session/emp_signin'}
                    state={{ redirectUrl: previouseRoute }}
                />
            )
        } else if (loginType === 'Vendor') {
            return (
                <Navigate
                    to={'/session/vendor_signin'}
                    state={{ redirectUrl: previouseRoute }}
                />
            )
        } else if (loginType === 'Student') {
            return (
                <Navigate
                    to={'/session/signin'}
                    state={{ redirectUrl: previouseRoute }}
                />
            )
        } else if (loginType === 'TechStudent') {
            return (
                <Navigate
                    to={'/session/tech-signin'}
                    state={{ redirectUrl: previouseRoute }}
                />
            )
        } else if (loginType === 'FN_MBBS_Student') {
            return (
                <Navigate
                    to={'/session/fnmbbs_signin'}
                    state={{ redirectUrl: previouseRoute }}
                />
            )
        } else {
            return (
                <Navigate
                    to={'/session/Home'}
                    state={{ redirectUrl: previouseRoute }}
                />
            )
        }
        // to={'/session/Home'} INITIAL

        // return (
        //     <Navigate
        //         to={'/session/Home'}
        //         state={{ redirectUrl: previouseRoute }}
        //     />
        //     // <Redirect
        //     //     to={{
        //     //         pathname: '/session/signin',
        //     //         state: { redirectUrl: previouseRoute },
        //     //     }}
        //     // />
        // )
    }
}

export default AuthGuard
