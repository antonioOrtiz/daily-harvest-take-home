import React from 'react'
import ReactDOM from 'react-dom'
import Head from 'next/head'
import App from 'next/app'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Provider } from 'react-redux'
import { useStore } from '../store/store.js'

import { useState, useEffect } from 'react'

export default function MyApp({ Component, pageProps }) {
	useEffect(() => {
		if (process.env.NODE_ENV !== 'production') {
			const axe = require('react-axe')
			axe(React, ReactDOM, 1000)
		}
	})

	const store = useStore(pageProps.initialReduxState)

	const theme = createMuiTheme({
		palette: {
			background: {
				default: '#EEE',
			},
			primary: {
				main: '#673ab7',
			},
		},
	})

	return (
		<>
			<Provider store={store}>
				<Head>
					<title>Daily Harvest Take home test</title>
				</Head>
				<ThemeProvider theme={theme}>
					<CssBaseline>
						<Component {...pageProps} />
					</CssBaseline>
				</ThemeProvider>
			</Provider>
		</>
	)
}
