import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'
import { hot } from 'react-hot-loader'
import { CssBaseline } from '@material-ui/core';
import CookieConsent from './core/CookieConsent';
import { CookiesProvider } from 'react-cookie';

const App = () => {
    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }, [])
    return (
        <BrowserRouter>
            <CssBaseline />
            <CookiesProvider>
                <ThemeProvider theme={theme}>
                    <MainRouter />
                    <CookieConsent />
                </ThemeProvider>
            </CookiesProvider>
        </BrowserRouter>
    )
}

export default hot(module)(App)
