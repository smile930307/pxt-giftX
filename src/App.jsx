import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home, Card, Cart, Checkout, Confirmation } from './views'
import './style.scss'
import { useEffect } from 'react'
//import Websocket from './components/Websocket/index'


export default function App() {

  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])


  useEffect(() => {


 });


  return (
    <div className='app'>
      {/* <Websocket/> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/card' element={<Card />} />
        <Route path='/confirmation' element={<Confirmation />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </div>
  )
}
