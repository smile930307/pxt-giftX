import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/shopContext'
import { ApiProvider } from './context/apiContext'
import WalletProvider from './context/walletContext'
import App from './App'


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <WalletProvider>
            <App />
        </WalletProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
)


