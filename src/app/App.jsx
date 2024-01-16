import '../fake-db'
import React from 'react'
import { Store } from './redux/Store'
import { Provider } from 'react-redux'
import { AllPages } from './routes/routes'
import { MatxTheme } from 'app/components'
import { useRoutes } from 'react-router-dom'
import { AuthProvider } from 'app/contexts/JWTAuthContext'
import { SettingsProvider } from 'app/contexts/SettingsContext'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const App = () => {
    const all_pages = useRoutes(AllPages())

    const theme = createTheme({
        typography: {
            fontFamily: 'Poppins, sans-serif',
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <Provider store={Store}>
                <SettingsProvider>
                    <MatxTheme>
                        <AuthProvider>{all_pages}</AuthProvider>
                    </MatxTheme>
                </SettingsProvider>
            </Provider>
        </ThemeProvider>
    )
}

export default App
