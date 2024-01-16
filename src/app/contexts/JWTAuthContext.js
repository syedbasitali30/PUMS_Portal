import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import { useDispatch } from 'react-redux'
import {
    authLogin,
    authLoginEmp,
    authLoginVendor,
    authLoginFN_MBBS,
    saveSession,
} from 'app/redux/action'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (email, password) => {
        const response = await axios.post('/api/auth/login', {
            email,
            password,
        })
        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
        localStorage.removeItem('authData')
        // dispatchAuth(authLogin(undefined))
    }

    const dispatchAuth = useDispatch()

    useEffect(() => {
        ;(async () => {
            try {
                //
                const loginSesion = window.sessionStorage.getItem('checkLogin')

                if (loginSesion !== 'Login') {
                    setSession(null)
                    dispatch({ type: 'LOGOUT' })
                    localStorage.removeItem('authData')
                }

                const accessToken = window.localStorage.getItem('accessToken')
                const authData = window.localStorage.getItem('authData')
                const authDataVendor =
                    window.localStorage.getItem('authDataVendor')
                const authDataEmp = window.localStorage.getItem('authDataEmp')
                const authDataFN_MBBS =
                    window.localStorage.getItem('authDataFN_MBBS')
                //
                const sessionData = window.localStorage.getItem('Session')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    const response = await axios.get('/api/auth/profile')
                    const { user } = response.data

                    //
                    dispatchAuth(authLogin(JSON.parse(authData)))
                    dispatchAuth(authLoginVendor(JSON.parse(authDataVendor)))
                    dispatchAuth(authLoginEmp(JSON.parse(authDataEmp)))
                    dispatchAuth(authLoginFN_MBBS(JSON.parse(authDataFN_MBBS)))
                    //
                    dispatchAuth(saveSession(JSON.parse(sessionData)))
                    //

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
