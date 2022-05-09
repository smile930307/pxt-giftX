import React, { createContext, useContext, useEffect, useState } from 'react'
import { ethers } from "ethers"
import nodeRewardContract from '../blockchain/nodeRewardContract'
import nodeRewardAbi from '../blockchain/NODERewardManagement.json'
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";


const WalletContext = createContext(null)
let contractNodeManager

export default function WalletProvider({ children }) {
    const [account, setAccount] = useState(localStorage.getItem('account'))
    const [loading, setLoading] = useState(true)

    const metamaskConnect = () => {
        if (!window.ethereum) return
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                setAccount(accounts[0])
                localStorage.setItem('account', accounts[0])
                setLoading(false)
            })
            .then(() => loadContracts())
    }

    const disconnect = async (e) => {
        e.stopPropagation()
        if (!window.ethereum) return
        window.location.reload()
        setAccount(null)
        localStorage.removeItem('account')
    }

    const walletConnect = async () => {
        const bridge = "https://bridge.walletconnect.org";

        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

        if (!connector.connected) {
            await connector.createSession();
        }

    }


    const loadContracts = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        contractNodeManager = new ethers.Contract(nodeRewardContract, nodeRewardAbi, provider)
        console.log(contractNodeManager)
        console.log('loaded')
    }

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', accounts => setAccount(accounts[0]))
        }
    }, [])

    return (
        <WalletContext.Provider
            value={{
                account,
                metamaskConnect,
                disconnect,
                walletConnect,
                loading,
                contractNodeManager
            }}
        >
            {children}
        </WalletContext.Provider>
    )
}


export const useWallet = () => {
    return useContext(WalletContext)
}