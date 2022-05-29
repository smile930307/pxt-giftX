/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { createContext, useReducer, useContext, useState, useEffect } from 'react'
import uniqid from 'uniqid'
import { cardsData } from './data'
import axios from 'axios'

const CartContext = createContext(null)


const initialState = {
    jwt_token: '',
    cart: [],
    cards: cardsData
}


const reducer = (state, action) => {
    let newCart = []
    let uid, amount, pricing_in

    switch (action.type) {

        case 'ADD':
            const item = action.payload
            item.uid = uniqid()
            item.amount = 1
            return { ...state, cart: [...state.cart, item] }

        case 'REMOVE':
            newCart = state.cart.filter(item => item.uid !== action.payload)
            return { ...state, cart: newCart }

        case 'CLEAR':
            return { ...state, cart: [] }

        case 'ADD_AMOUNT':
            uid = action.payload.uid
            amount = action.payload.amount

            newCart = state.cart.map(item => {
                if (item.uid === uid) {
                    return { ...item, amount }
                }
                return item
            })

            return { ...state, cart: newCart }

        case 'CHANGE_PRICING':
            let pricing = action.payload.pricing

            newCart = state.cart.map(item => {
                return { ...item, pricing: { ...item.pricing, in: pricing } }
            })

            return { ...state, cart: newCart }
        case 'USER_TOKEN':
            let new_token = action.payload.e.token

            return { ...state, jwt_token: new_token }

        default:
            return state
    }
}


export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const [currencies, setCurrencies] = useState({ usdt: 1 })

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/simple/price?ids=project-x-nodes%2Cavalanche-2&vs_currencies=usd')
            .then(res => res.json())
            .then(data => setCurrencies({
                ...currencies,
                avax: data['avalanche-2'].usd,
                pxt: data['project-x-nodes'].usd
            }))

    }, [])


    const convertToUsd = async (currency, value) => {
        const { data } = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}/usd.json`)
        return value * data.usd

    }

    return (
        <CartContext.Provider
            value={{
                ...state,
                dispatch,
                currencies,
                convertToUsd
            }}
        >
            {children}
        </CartContext.Provider>
    )
}


export const useShop = () => useContext(CartContext)