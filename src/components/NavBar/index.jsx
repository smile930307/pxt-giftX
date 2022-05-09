import React, { useEffect } from 'react'
import { Container, Navbar, Nav, Image, Badge } from 'react-bootstrap'
import Logo from '../../assets/imgs/Logo.png'
import metamask from '../../assets/imgs/metamask.svg'
import { BsTwitter, BsDiscord } from 'react-icons/bs'
import { MdLogout } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../../context/shopContext'
import { useWallet } from '../../context/walletContext'
import { auth } from "../../api/auth"
import './style.scss'



export default function NavBar({ scrollToShop }) {
    const { dispatch } = useShop()
    const navigate = useNavigate()

    const handleShop = () => {
        navigate('/')

        scrollToShop()

    }

    const { cart } = useShop()

    const count = cart.length

    const { account, metamaskConnect, walletConnect, disconnect } = useWallet()

    const connectApi = async (wallet) => {
        return await auth(wallet)
    }

    useEffect(() => {
        if (account !== '') {
            connectApi(account).then(e => dispatch({ type: 'USER_TOKEN', payload: { e } }))
        }
    }, [account])

    return (
        <div className='navbar_'>
            <Navbar collapseOnSelect expand='xl' variant='dark' >
                <Container className='d-flex justify-content-between'>
                    <Link to='/'>
                        <Navbar.Brand>
                            <Image src={Logo} style={{ maxWidth: '14rem' }} />
                        </Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='nav_ m-auto'>
                            <Link to='/' className='nav-link'>Home</Link>
                            <a
                                href='https://app.bogged.finance/avax/swap?tokenIn=AVAX&tokenOut=0x9ADCbba4b79eE5285E891512b44706F41F14CAFd'
                                target='_blank'
                                className='nav-link'
                            >
                                Buy $PXT
                            </a>

                            <span style={{ cursor: 'pointer' }} onClick={handleShop} className='nav-link'>SHOP</span>


                            <div className="nav-cart">
                                <Link to='/cart' className='nav-link'>CART</Link>
                                <Badge bg="dark">{count}</Badge>
                            </div>

                            <a
                                href='https://twitter.com/projectxfinance?s=21&t=hM6jKhgUaYQbk95XLNm-9A'
                                target='_blank'
                                className='nav-link'
                            >
                                <BsTwitter size={20} />
                            </a>
                            <a
                                href='https://discord.gg/projectxfinance'
                                target='_blank'
                                className='nav-link'
                            >
                                <BsDiscord size={20} />
                            </a>
                        </Nav>
                        <Nav className=''>
                            <button onClick={metamaskConnect} className='primary text-truncate connect-btn box-shadow-sm'>
                                {
                                    account
                                        ? <div className='logout'>
                                            <span>
                                                {
                                                    account.substring(0, 4) + '...' + account.substring(account.length - 3, account.length)
                                                }
                                            </span>
                                            <Image
                                                src={metamask}
                                                alet='metamask'
                                                id='metamask'
                                            />
                                            <div className="svg" onClick={disconnect} >
                                                <MdLogout size={17} />
                                            </div>
                                        </div>
                                        : 'Metamask Connect'
                                }
                            </button>
                            {
                                !account && <button
                                    className='primary text-truncate connect-btn box-shadow-sm'
                                    onClick={walletConnect}
                                >
                                    Wallet Connect
                                </button>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}
