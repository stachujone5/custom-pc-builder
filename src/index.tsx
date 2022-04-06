import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { App } from './App'
import { CartProvider } from './contexts/CartContext'

ReactDOM.render(
	<React.StrictMode>
		<CartProvider>
			<App />
		</CartProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
