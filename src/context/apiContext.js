/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useReducer, useContext, useState, useEffect } from 'react'
import { useWallet } from './walletContext'
import { w3cwebsocket as W3CWebSocket } from "websocket"

const ApiContext = createContext(null)


const initialState = {
   jwt_token: ''
}


const reducer = (state, action) => {

    switch (action.type) {
        case 'USER_TOKEN':
            let new_token = action.payload.e.token

            return { ...state, jwt_token: new_token }

        default:
            return state
    }
}


export const ApiProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const { account } = useWallet()
    const [wsClient, setWsClient] = useState(W3CWebSocket)

    useEffect(() => {
      setWsClient(new W3CWebSocket('wss://nodeapi.projectx.financial/ws/' + account))
      console.log(wsClient)

    }, [])

    return (
        <ApiContext.Provider
            value={{
                ...state,
                dispatch,
                wsClient
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}


export const useApi = () => useContext(ApiContext)